const setUpListeners = (io, socket) => {
  socket.on('new_message', (message) => {
    io.sockets.emit('add_message', { message });
  });
};

module.exports = setUpListeners;
