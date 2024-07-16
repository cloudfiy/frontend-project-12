import { useState } from 'react'
import {
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from '../../../../redux/services/channelsApi'
import { io } from 'socket.io-client'
import {
  useGetMessagesQuery,
  useRemoveMessageMutation,
} from '../../../../redux/services/messagesApi'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

const socket = io('/')

const useChannelModal = () => {
  const [addChannel] = useAddChannelMutation()
  const [renameChannel] = useRenameChannelMutation()
  const [removeChannel] = useRemoveChannelMutation()
  const { data: messages } = useGetMessagesQuery()
  const [removeMessage] = useRemoveMessageMutation()

  const [modalShow, setModalShow] = useState(false)
  const [modalType, setModalType] = useState('')
  const [channelData, setChannelData] = useState(null)

  const { t } = useTranslation()

  const handleShowModal = (type, channel = null) => {
    setModalType(type)
    setChannelData(channel)
    setModalShow(true)
  }

  const handleClose = () => {
    setModalShow(false)
  }

  const handleAddChannel = async (name) => {
    try {
      await addChannel(name).unwrap()
      toast.success(t('channelCreated'))
    } catch (error) {
      toast.error(t('channelCreateError'))
      console.error('Ошибка при добавлении канала', error)
    }
  }

  const handleRenameChannel = async (newName, id) => {
    try {
      await renameChannel({ newName, id }).unwrap()
      toast.success(t('channelRenamed'))
    } catch (error) {
      toast.error(t('channelRenameError'))
      console.error('Ошибка при переименовании канала', error)
    }
  }

  const handleRemoveChannel = async (id) => {
    try {
      const messagesToBeRemoved = messages.filter((message) => message.channelId === id)

      await removeChannel(id).unwrap()

      const deletePromises = messagesToBeRemoved.map((message) => removeMessage(message.id))
      await Promise.all(deletePromises)

      toast.success(t('channelRemoved'))
    } catch (error) {
      toast.error(t('channelRemoveError'))
      console.error('Ошибка при удалении канала', error)
    }
  }

  const handleSave = async (type, nameChannel, id) => {
    console.log(type)
    try {
      switch (type) {
        case 'add':
          await handleAddChannel(nameChannel)
          break
        case 'rename':
          await handleRenameChannel(nameChannel, id)
          break
        case 'delete':
          await handleRemoveChannel(id)
          break
        default:
          console.log('Unknown type')
      }
    } catch (error) {
      console.error('Ошибка при сохранении изменений', error)
    } finally {
      setModalShow(false)
    }
  }

  return {
    modalShow,
    modalType,
    channelData,
    handleShowModal,
    handleClose,
    handleSave,
  }
}

export default useChannelModal
