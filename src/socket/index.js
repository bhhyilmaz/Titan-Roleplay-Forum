import io from 'socket.io-client';

export const socket = io.connect('https://3.79.244.125:3001', {
  withCredentials: true
});