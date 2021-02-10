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
    console.log(instrument.slice(-1)[0].position);
    io.sockets.emit('spawn_instrument', {
      id: instrument.slice(-1)[0].id,
      position: instrument.slice(-1)[0].position,
    });
  });
  socket.on('drag_instrument', (data) => {
    store.dispatch(dragInstrument(data.id, data.position));
    const { instrument } = store.getState();
    io.sockets.emit('update_instrument', {id: data.id, position: data.position});
  });
};

module.exports = setUpListeners;
