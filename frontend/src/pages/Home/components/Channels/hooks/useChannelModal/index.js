import { useState } from 'react';

import { useTranslation } from 'react-i18next';
import saveChannel from './saveChannel';
import closeModal from './closeModal';
import {
  useAddChannelMutation,
  useRemoveChannelMutation,
  useRenameChannelMutation,
} from '../../../../../../redux/services/channelsApi';
import {
  useGetMessagesQuery,
  useRemoveMessageMutation,
} from '../../../../../../redux/services/messagesApi';

const useChannelModal = () => {
  const [modalShow, setModalShow] = useState(false);
  const [modalType, setModalType] = useState('');
  const [channelData, setChannelData] = useState(null);

  const [addChannel] = useAddChannelMutation();
  const [renameChannel] = useRenameChannelMutation();
  const [removeChannel] = useRemoveChannelMutation();
  const { data: messages } = useGetMessagesQuery();
  const [removeMessage] = useRemoveMessageMutation();
  const { t } = useTranslation();

  const handleShowModal = (type, channel = null) => {
    setModalType(type);
    setChannelData(channel);
    setModalShow(true);
  };

  const handleClose = () => closeModal(setModalShow);

  const handleSave = async (type, nameChannel, id) => {
    await saveChannel(
      type,
      nameChannel,
      id,
      setModalShow,
      addChannel,
      renameChannel,
      removeChannel,
      messages,
      removeMessage,
      t
    );
  };

  return {
    modalShow,
    modalType,
    channelData,
    handleShowModal,
    handleClose,
    handleSave,
  };
};

export default useChannelModal;
