import { receiveMessage } from './reducer/messages';
import { loadScene } from './reducer/scene';
import store from './store';

export default (socket) => {
  socket.on('add_message', (message) => {
    store.dispatch(receiveMessage(message));
  });
  socket.on('load_scene', (scene) => {
    // console.log('CLIENTthescene', scene)
    store.dispatch(loadScene(scene));
  });
};
