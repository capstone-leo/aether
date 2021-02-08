const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const { pickBy, size } = require('lodash')

const socket = require('socket.io');
//require('../secrets');
app.use(morgan('dev'));

//static stuff
app.use(express.static(path.join(__dirname, '..', 'public')));
//sends HTML no matter what
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
const server = app.listen(PORT, () => {
  console.log('listening on 5000');
});

// Socket setup
const io = socket(server);
require('./socket')(io);


const broadcastState = (io) => {
  let start = Date.now();
  setInterval(() => {
    // On set interval, emit all player positions to all players in each world
    let { players, rooms } = store.getState();
    if (size(players) && (Date.now() - start > 1000 * 10)) {
      start = Date.now();
    }
    for (let currentRoom of rooms) {
      let roomPlayers = pickBy(players, ({ room }) => room === currentRoom.id);
      io.sockets.in(currentRoom.id).emit('player_data', roomPlayers);
      if (!size(roomPlayers)) {
        store.dispatch(destroyRoom(currentRoom.id));
      }
    }
  }, (1000 / 30));
};

