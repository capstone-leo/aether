import io from 'socket.io-client';
import listeners from './listeners';

const socket = io(window.location.origin);

socket.on('connect', () => {
  listeners(socket);
});

export default socket;