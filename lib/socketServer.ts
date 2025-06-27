// lib/socketServer.ts
import type { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';

let io: IOServer | null = null;

export const initSocket = (server: HTTPServer) => {
  if (io) return io;

  io = new IOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log(`Socket connected: ${socket.id}`);

    socket.on('disconnect', () => {
      console.log(`Socket disconnected: ${socket.id}`);
    });
  });

  return io;
};

export const getIO = () => {
  if (!io) throw new Error('Socket.IO not initialized');
  return io;
};
