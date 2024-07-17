import { toast } from 'react-toastify';

const addChannel = async (name, addChannelMutation, t) => {
  try {
    await addChannelMutation(name).unwrap();
    toast.success(t('channelCreated'));
  } catch (error) {
    toast.error(t('channelCreateError'));
    console.error('Ошибка при добавлении канала', error);
  }
};

export default addChannel;
