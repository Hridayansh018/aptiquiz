import { io } from 'socket.io-client';

// Determine socket URL: if NEXT_PUBLIC_SOCKET_URL is empty, Socket.IO connects to window.location.origin automatically
const getSocketUrl = (): string => {
  if (typeof window !== 'undefined') {
    const envUrl = process.env.NEXT_PUBLIC_SOCKET_URL;
    // Only use envUrl if explicitly provided and non-empty; otherwise default to window origin ('')
    if (envUrl && envUrl.trim() !== '') {
      return envUrl.trim();
    }
    return ''; // Same origin
  }
  return process.env.NEXT_PUBLIC_SOCKET_URL || '';
};

const socket = io(getSocketUrl(), {
  autoConnect: false,
  transports: ['polling', 'websocket'], // HTTP polling handshake first, then WSS upgrade
  reconnection: true,
  reconnectionAttempts: 10,
  reconnectionDelay: 1000,
  withCredentials: true,
});

export default socket;
