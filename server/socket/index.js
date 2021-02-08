const setUpListeners = require('./listeners')

module.exports = (io) => {
  io.on('connection', (socket) => {
    setUpListeners(io, socket);
  });
};


// broadcastState(io);