const store = require('../../store.js');
const { receiveMessage, deleteMessage } = require('../../reducers/messages');
const {
  receiveInstrument,
  receiveAllInstrument,
  dragInstrument,
  removeInstrument,
} = require('../../reducers/instruments');

const getRoom = () => {
  let { rooms, players } = store.getState();
  for (let room of rooms) {
    let playerCount = size(
      pickBy(players, (player) => player.room === room.id)
    );
    if (playerCount < 5) {
      return [room, false];
    }
  }
  return [roomNames[random(roomNames.length - 1)], true];
};

const setUpListeners = (io, socket) => {
  socket.on('get_all_instruments', () => {
    const { instrument } = store.getState();
    socket.emit('spawn_all_instruments', instrument);
  });
  socket.on('add_instrument', (data) => {
    store.dispatch(receiveInstrument(data));
    const { instrument } = store.getState();
    console.log(instrument);
    const { id, position, soundType, soundIndex } = instrument.slice(-1)[0];
    io.sockets.emit('spawn_instrument', {
      id,
      position,
      soundType,
      soundIndex,
    });
  });
  socket.on('drag_instrument', (data) => {
    store.dispatch(
      dragInstrument(data.id, data.position, data.soundType, data.soundIndex)
    );
    io.sockets.emit('update_instrument', {
      id: data.id,
      position: data.position,
      soundType: data.soundType,
      soundIndex: data.soundIndex,
    });
  });
  socket.on('add_message', (data) => {
    store.dispatch(receiveMessage(data));
    io.sockets.emit(
      'new_message',
      store.getState().messageReducer.slice(-1)[0]
    );
    console.log('yooo', store.getState().messageReducer);
  });
  socket.on('remove_message', (id) => {
    console.log('backend before', store.getState().messageReducer);
    store.dispatch(deleteMessage(id.slice(-1)[0].id));
    console.log('backend after', store.getState().messageReducer);
    io.sockets.emit('delete_message', id);
  });
  socket.on('remove_instrument', (id) => {
    store.dispatch(removeInstrument(id));
    io.sockets.emit('delete_instrument', id);
  });
};

module.exports = setUpListeners;
