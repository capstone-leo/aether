const Promise = require('bluebird');
const { forOwn, size, pickBy, random, find } = require('lodash');
const { Player, Room } = require('../../db');
const store = require('../../store.js');
const roomNames = require('../../roomnames');
const { addRoom } = require('../../reducers/rooms');
const { addPlayer, playerLeaves } = require('../../reducers/players');
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
  socket.on('get_all_instruments', (data) => {
    const { instrument } = store.getState();
    socket.emit('spawn_all_instruments', instrument);
  });
  socket.on('add_instrument', (data) => {
    store.dispatch(receiveInstrument(data));
    const { instrument } = store.getState();
    const { id, position, type, soundIndex } = instrument.slice(-1)[0];
    io.sockets.emit('spawn_instrument', {
      id,
      position,
      type,
      soundIndex,
    });
  });
  socket.on('drag_instrument', (data) => {
    store.dispatch(
      dragInstrument(data.id, data.position, data.type, data.soundIndex)
    );
    io.sockets.emit('update_instrument', {
      id: data.id,
      position: data.position,
      type: data.type,
      soundIndex: data.soundIndex,
    });
  });
  socket.on('remove_instrument', (id) => {
    store.dispatch(removeInstrument(id));
    io.sockets.emit('delete_instrument', id);
  });
};

module.exports = setUpListeners;
