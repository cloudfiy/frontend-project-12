import { toast } from 'react-toastify';

const removeChannel = async (id, removeChannelMutation, messages, removeMessageMutation, t) => {
  try {
    const messagesToBeRemoved = messages.filter((message) => message.channelId === id);

    await removeChannelMutation(id).unwrap();

    const deletePromises = messagesToBeRemoved.map((message) => removeMessageMutation(message.id));
    await Promise.all(deletePromises);

    toast.success(t('channelRemoved'));
  } catch (error) {
    toast.error(t('channelRemoveError'));
    console.error('Ошибка при удалении канала', error);
  }
};

export default removeChannel;
