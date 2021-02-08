const store = require('../store');

const broadcastScene = (io) => {
  setInterval(() => {
    io.sockets.emit('load_scene');
  }, 1000 / 30);
};

module.exports = { broadcastScene };
