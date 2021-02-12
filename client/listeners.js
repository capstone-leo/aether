import { receiveMessage } from './reducer/messages';
import { hoverHighlight } from './reducer/dragndrop';
import {
  receiveInstrument,
  receiveAllInstruments,
  dragInstrument,
  removeInstrument,
} from './reducer/instruments';
import Instrument from './components/Instruments/Instrument';
import { instruments } from './engine/main';
import store from './store';

export default (socket) => {
  socket.on('new_message', (message) => {
    console.log('YOOO', message);
    store.dispatch(receiveMessage(message));
  });
  socket.on('hover', (hoverHighlight) => {
    store.dispatch(highlight(hoverHighlight));
  });
  socket.on('spawn_all_instruments', (instruments) => {
    store.dispatch(receiveAllInstruments(instruments));
    instruments.forEach((instrument) => {
      let newInstrument = new Instrument(
        instrument.id,
        instrument.position,
        instrument.soundType,
        instrument.soundIndex
      );
      newInstrument.init();
      store.dispatch(
        receiveInstrument({
          id: instrument.id,
          position: instrument.position,
          soundType: instrument.soundType,
          soundIndex: instrument.soundIndex,
        })
      );
    });
  });
  socket.on('spawn_instrument', (data) => {
    const instrument = new Instrument(
      data.id,
      data.position,
      data.soundType,
      data.soundIndex
    );
    instrument.init();
    store.dispatch(receiveInstrument(data));
  });
  socket.on('update_instrument', (instrument) => {
    const { id, position, soundType, soundIndex } = instrument;
    store.dispatch(dragInstrument(id, position, soundType, soundIndex));
    instruments.forEach((sceneInstrument) => {
      if (sceneInstrument.mesh.reduxid === instrument.id) {
        sceneInstrument.updatePosition(
          instrument.position[0],
          instrument.position[1]
        );
      }
    });
  });
  socket.on('delete_instrument', (id) => {
    store.dispatch(removeInstrument(id));
    instruments.forEach((sceneInstrument) => {
      if (sceneInstrument.mesh.reduxid === id) {
        sceneInstrument.smash(id);
      }
    });
  });
};
