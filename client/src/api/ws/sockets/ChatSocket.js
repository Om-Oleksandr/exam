import WebSocket from './WebSocket';
import CONSTANTS from '../../../constants';
import {
  addMessage,
  changeBlockStatusInStore,
} from '../../../store/slices/chatSlice';

class ChatSocket extends WebSocket {

  anotherSubscribes = () => {
    this.onNewMessage();
    this.onChangeBlockStatus();
  };

  onChangeBlockStatus = () => {
    this.socket.on(CONSTANTS.CHANGE_BLOCK_STATUS, data => {
      this.dispatch(changeBlockStatusInStore(data.message));
    });
  };

  onNewMessage = () => {
    this.socket.on('newMessage', data => {
      this.dispatch(addMessage(data.message));
    });
  };

  subscribeChat = id => {
    this.socket.emit('subscribeChat', id);
  };

  unsubscribeChat = id => {
    this.socket.emit('unsubscribeChat', id);
  };
}

export default ChatSocket;
