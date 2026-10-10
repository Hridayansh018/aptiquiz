import { io } from 'socket.io-client';

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL || '';

const socket = io(SOCKET_URL, {
  autoConnect: false,
  transports: ['polling', 'websocket'], // HTTP polling handshake first, upgrade to WSS
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
});

export default socket;
