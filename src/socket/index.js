import io from 'socket.io-client';

export const socket = io.connect('http://3.79.244.125:3001', {
  withCredentials: true
});