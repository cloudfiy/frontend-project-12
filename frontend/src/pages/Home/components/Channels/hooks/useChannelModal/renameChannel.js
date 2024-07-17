import { toast } from 'react-toastify';

const renameChannel = async (newName, id, renameChannelMutation, t) => {
  try {
    await renameChannelMutation({ newName, id }).unwrap();
    toast.success(t('channelRenamed'));
  } catch (error) {
    toast.error(t('channelRenameError'));
    console.error('Ошибка при переименовании канала', error);
  }
};

export default renameChannel;
