import { receiveMessage } from './reducer/messages';
import { hoverHighlight } from './reducer/dragndrop';
import store from './store';

export default (socket) => {
  socket.on('add_message', (message) => {
    store.dispatch(receiveMessage(message));
  });
  socket.on('hover', (hoverHighlight) => {
    store.dispatch(highlight(hoverHighlight));
  });
};
