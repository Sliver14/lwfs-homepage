// lib/socket.ts
import { io } from 'socket.io-client';

const socket = io(
  typeof window !== 'undefined' ? 'http://localhost:3000' : '', // adjust for production
  {
    autoConnect: true,
    transports: ['websocket'],
  }
);

export default socket;
