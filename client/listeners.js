import { receiveMessage } from './reducer/messages';
import { hoverHighlight } from './reducer/dragndrop';
import store from './store';
import { receiveInstrument } from './reducer/instruments';

export default (socket) => {
  socket.on('add_message', (message) => {
    store.dispatch(receiveMessage(message));
  });
  socket.on('hover', (hoverHighlight) => {
    store.dispatch(highlight(hoverHighlight));
  });
  socket.on('spawn_instrument', (data) => {
    store.dispatch(receiveInstrument(data));
  });
};
