import { useDispatch, useSelector } from 'react-redux'
import { useGetChannelsQuery } from '../../../../redux/services/channelsApi'
import { setActiveChannel } from '../../../../redux/slices/channelsSlice'
import cn from 'clsx'
import ChannelModal from './ChannelModal'
import Dropdown from 'react-bootstrap/Dropdown'
import useChannelModal from './useChannelModal'
import io from 'socket.io-client'
import useSocketListeners from './useSocketListeners'
import { useTranslation } from 'react-i18next'

const socket = io('/')

const Channels = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const { data: channelsList, refetch: refetchChannels } = useGetChannelsQuery()
  useSocketListeners(socket, refetchChannels)

  const activeChannelId = useSelector((state) => state.channels.activeChannelId)

  const handleClickChannel = (name, id) => {
    dispatch(setActiveChannel(name, id))
  }

  const { modalShow, modalType, channelData, handleShowModal, handleClose, handleSave } =
    useChannelModal()

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => handleShowModal('add')}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            width="20"
            height="20"
            fill="currentColor"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
          </svg>
          <span className="visually-hidden">+</span>
        </button>
      </div>
      {channelsList && (
        <ul
          id="channels-box"
          className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
        >
          {channelsList.map((channel) => (
            <li className="nav-item w-100" key={channel.id}>
              {channel.removable ? (
                <Dropdown as="div" className="d-flex btn-group w-100">
                  <button
                    type="button"
                    className={cn('w-100 rounded-0 text-start btn', {
                      'btn-secondary': channel.id === activeChannelId,
                    })}
                    onClick={() => handleClickChannel({ id: channel.id, name: channel.name })}
                  >
                    <span className="me-1">#</span>
                    {channel.name}
                  </button>

                  <Dropdown.Toggle
                    split
                    variant={channel.id === activeChannelId ? 'secondary' : 'light'}
                    id={`dropdown-split-${channel.id}`}
                    className="flex-grow-0"
                  >
                    <span className="visually-hidden">Управление каналом</span>
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item onClick={() => handleShowModal('delete', { id: channel.id })}>
                      {t('delete')}
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() =>
                        handleShowModal('rename', { name: channel.name, id: channel.id })
                      }
                    >
                      {t('rename')}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <button
                  type="button"
                  className={cn('w-100 rounded-0 text-start btn', {
                    'btn-secondary': channel.id === activeChannelId,
                  })}
                  onClick={() => handleClickChannel({ id: channel.id, name: channel.name })}
                >
                  <span className="me-1">#</span>
                  {channel.name}
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
      <ChannelModal
        show={modalShow}
        handleClose={handleClose}
        handleSave={handleSave}
        modalType={modalType}
        channelData={channelData}
        channelsList={channelsList}
      />
    </div>
  )
}
export default Channels
