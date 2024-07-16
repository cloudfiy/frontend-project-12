import { useSelector } from 'react-redux'
import {
  useAddMessageMutation,
  useGetMessagesQuery,
  useRemoveMessageMutation,
} from '../../../../redux/services/messagesApi'

import io from 'socket.io-client'
import { useEffect, useState } from 'react'
import { USER } from '../../../../shared/constants'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

import leoProfanity from 'leo-profanity'
leoProfanity.loadDictionary('ru')

const socket = io('/')

const Chat = () => {
  const { data: messages = [], refetch: refetchMessage } = useGetMessagesQuery()
  const [addMessage] = useAddMessageMutation()
  const { username } = JSON.parse(localStorage.getItem(USER))

  const { t } = useTranslation()

  const activeChannel = useSelector((state) => state.channels)
  const activeChannelMessages = messages.filter(
    (message) => message.channelId === activeChannel.activeChannelId
  )

  const [input, setInput] = useState('')

  useEffect(() => {
    socket.on('newMessage', () => {
      refetchMessage()
    })

    return () => {
      socket.off('newMessage')
    }
  }, [refetchMessage])

  const handleSendMessage = async (e) => {
    e.preventDefault()

    const cleanInput = leoProfanity.clean(input)

    const newMessage = { body: cleanInput, channelId: activeChannel.activeChannelId, username }

    try {
      await addMessage(newMessage).unwrap()
      setInput('')
    } catch (error) {
      toast.error(t('messageSendError'))
      console.error('Ошибка отправки сообщения:', error)
    }
  }
  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b># {activeChannel.activeChannelName}</b>
          </p>
          <span className="text-muted">{activeChannelMessages.length ?? 0} сообщений</span>
        </div>
        {activeChannelMessages && (
          <div className="chat-messages overflow-auto px-5" id="messages-box">
            {activeChannelMessages.map((msg) => (
              <div className="text-break mb-2" key={msg.id}>
                <b>{msg.username}</b>: {msg.body}
              </div>
            ))}
          </div>
        )}
        <div className="mt-auto px-5 py-3">
          <form noValidate="" className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <input
                name="body"
                aria-label="Новое сообщение"
                placeholder="Введите сообщение..."
                className="border-0 p-0 ps-2 form-control"
                onChange={(e) => setInput(e.target.value)}
                value={input}
              />
              <button
                type="submit"
                disabled={!input}
                className="btn btn-group-vertical"
                onClick={(e) => handleSendMessage(e)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  width="20"
                  height="20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"
                  ></path>
                </svg>
                <span className="visually-hidden">Отправить</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Chat
