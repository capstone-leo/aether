import { receiveMessage } from './reducer/messages';
import { hoverHighlight } from './reducer/dragndrop';
import {
  receiveInstrument,
  receiveAllInstruments,
} from './reducer/instruments';
import Instrument from './components/Instrument';
import store from './store';

export default (socket) => {
  socket.on('add_message', (message) => {
    store.dispatch(receiveMessage(message));
  });
  socket.on('hover', (hoverHighlight) => {
    store.dispatch(highlight(hoverHighlight));
  });
  socket.on('spawn_all_instruments', (instruments) => {
    store.dispatch(receiveAllInstruments(instruments));
    instruments.forEach((instrument) => {
      let newInstrument = new Instrument(instrument.id, instrument.position);
      newInstrument.init();
      store.dispatch(
        receiveInstrument({ id: instrument.id, position: instrument.position })
      );
    });
  });
  socket.on('spawn_instrument', (data) => {
    const instrument = new Instrument(data.id, data.position);
    instrument.init();
    store.dispatch(receiveInstrument(data));
  });
};
