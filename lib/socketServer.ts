// lib/socketServer.ts
import type { Server as HTTPServer } from 'http';
import { Server as IOServer } from 'socket.io';

let io: IOServer | null = null;

interface Message {
  id: string;
  text: string;
  userId: string;
  programId: string;
  username: string;
  createdAt: Date;
}

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

    // Join a program room
    socket.on('joinProgram', (programId: string) => {
      socket.join(`program:${programId}`);
      console.log(`Socket ${socket.id} joined program ${programId}`);
    });

    // Leave a program room
    socket.on('leaveProgram', (programId: string) => {
      socket.leave(`program:${programId}`);
      console.log(`Socket ${socket.id} left program ${programId}`);
    });

    // Handle new messages
    socket.on('sendMessage', (message: Message) => {
      // Broadcast the message to all clients in the program room
      io?.to(`program:${message.programId}`).emit('newMessage', message);
      console.log(`New message in program ${message.programId}: ${message.text}`);
    });

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

// Helper function to emit messages to a specific program
export const emitToProgramRoom = (programId: string, event: string, data: any) => {
  const socket = getIO();
  socket.to(`program:${programId}`).emit(event, data);
};
