import addChannel from './addChannel';
import renameChannel from './renameChannel';
import removeChannel from './removeChannel';
import closeModal from './closeModal';

const saveChannel = async (
  type,
  nameChannel,
  id,
  setModalShow,
  addChannelMutation,
  renameChannelMutation,
  removeChannelMutation,
  messages,
  removeMessageMutation,
  t
) => {
  try {
    switch (type) {
      case 'add':
        await addChannel(nameChannel, addChannelMutation, t);
        break;
      case 'rename':
        await renameChannel(nameChannel, id, renameChannelMutation, t);
        break;
      case 'delete':
        await removeChannel(id, removeChannelMutation, messages, removeMessageMutation, t);
        break;
      default:
        console.log('Unknown type');
    }
  } catch (error) {
    console.error('Ошибка при сохранении изменений', error);
  } finally {
    closeModal(setModalShow);
  }
};

export default saveChannel;
