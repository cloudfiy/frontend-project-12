import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import io from 'socket.io-client';
import { useGetChannelsQuery } from '../../../../redux/services/channelsApi';
import { setActiveChannel } from '../../../../redux/slices/channelsSlice';
import { useChannelModal, useSocketListeners } from './hooks';
import { ChannelModal, AddChannelButton, ChannelsList } from './components';

const socket = io('/');

const Channels = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { data: channelsList, refetch: refetchChannels } = useGetChannelsQuery();
  useSocketListeners(socket, refetchChannels);
  const activeChannelId = useSelector((state) => state.channels.activeChannelId);

  const handleClickChannel = (name, id) => {
    dispatch(setActiveChannel(name, id));
  };

  const {
    modalShow, modalType, channelData, handleShowModal, handleClose, handleSave,
  } = useChannelModal();

  return (
    <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <AddChannelButton handleShowModal={handleShowModal} />
      </div>
      {channelsList && (
        <ChannelsList
          channelsList={channelsList}
          activeChannelId={activeChannelId}
          handleClickChannel={handleClickChannel}
          handleShowModal={handleShowModal}
        />
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
  );
};

export default Channels;
