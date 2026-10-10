import { io } from 'socket.io-client';

// Always connect relative to current window origin ('') so that the client automatically
// uses the exact domain serving the page (e.g. aptiquiz-9et4.onrender.com).
// This completely prevents domain mismatches and CORS errors.
const socket = io('', {
  autoConnect: false,
  transports: ['polling', 'websocket'], // HTTP polling handshake first, then WSS upgrade
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  withCredentials: true,
});

export default socket;
