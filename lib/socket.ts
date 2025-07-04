// lib/socket.ts
import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

interface Message {
  id: string;
  text: string;
  userId: string;
  programId: string;
  username: string;
  createdAt: Date;
}

export const initializeSocket = (url: string) => {
  if (!socket) {
    socket = io(url);

    socket.on('connect', () => {
      console.log('Socket connected');
    });

    socket.on('disconnect', () => {
      console.log('Socket disconnected');
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    throw new Error('Socket not initialized. Call initializeSocket first.');
  }
  return socket;
};

export const joinProgram = (programId: string) => {
  const socket = getSocket();
  socket.emit('joinProgram', programId);
};

export const leaveProgram = (programId: string) => {
  const socket = getSocket();
  socket.emit('leaveProgram', programId);
};

export const sendMessage = (message: Message) => {
  const socket = getSocket();
  socket.emit('sendMessage', message);
};

export const subscribeToMessages = (programId: string, callback: (message: Message) => void) => {
  const socket = getSocket();
  socket.on('newMessage', (message: Message) => {
    if (message.programId === programId) {
      callback(message);
    }
  });

  // Return cleanup function
  return () => {
    socket.off('newMessage');
  };
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
