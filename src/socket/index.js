import io from 'socket.io-client';

export const socket = io.connect('https://express-server-hara.onrender.com', {
  withCredentials: true
});