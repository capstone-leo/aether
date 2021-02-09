const Promise = require('bluebird');
const { forOwn, size, pickBy, random, find } = require('lodash');
const { Player, Room } = require('../../db');
const store = require('../../store.js');
const roomNames = require('../../roomnames');
const { addRoom } = require('../../reducers/rooms');
const { addPlayer, playerLeaves } = require('../../reducers/players');
const { receiveInstrument } = require('../../reducers/instruments');

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
  socket.on('add_instrument', (data) => {
    store.dispatch(receiveInstrument(data));

    const { instruments } = store.getState();
    io.sockets.emit('spawn_instrument', instruments[data.id]);
  });
};

module.exports = setUpListeners;
