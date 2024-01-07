import io from 'socket.io-client';

export const socket = io.connect('https://server.blaineyilmaz.tech', {
  withCredentials: true
});