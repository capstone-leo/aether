import { receiveMessage } from './reducer/messages';
import store from './store';

console.log(store);

export default (socket) => {
  socket.on('add_message', (message) => {
    store.dispatch(receiveMessage(message));
  });
};
