import { Spinner } from 'react-bootstrap';
import { Channels, Chat } from './components';
import { useGetMessagesQuery } from '../../redux/services/messagesApi';
import { useGetChannelsQuery } from '../../redux/services/channelsApi';

import getModal from '../../shared/components/Modals/index.js';

import useSocket from './useSocket.js';
import useModal from '../../shared/hooks/useModal.js';

const Home = () => {
  useSocket();

  const { isShow, modalType, modalProps } = useModal();

  const {
    data: channelsList = [],
    refetch: refetchChannels,
    isLoading: channelsLoading,
  } = useGetChannelsQuery();
  const {
    data: messages = [],
    refetch: refetchMessage,
    isLoading: messageLoading,
  } = useGetMessagesQuery();

  const renderModal = () => {
    if (!modalType) {
      return null;
    }

    const ModalComponent = getModal(modalType);
    return ModalComponent ? <ModalComponent isShow={isShow} modalProps={modalProps} /> : null;
  };

  if (channelsLoading || messageLoading) {
    return (
      <div className="h-100 col-12 d-flex align-items-center justify-content-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <Channels channelsList={channelsList} refetchChannels={refetchChannels} />
        <Chat messages={messages} refetchMessage={refetchMessage} />
        {renderModal()}
      </div>
    </div>
  );
};

export default Home;
