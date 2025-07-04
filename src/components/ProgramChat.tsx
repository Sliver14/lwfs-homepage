'use client';

import React, { useEffect, useState } from 'react';
import { useSocket } from '@/context/SocketContext';
import { joinProgram, leaveProgram, sendMessage, subscribeToMessages } from '../../lib/socket';

interface Message {
  id: string;
  text: string;
  userId: string;
  programId: string;
  username: string;
  createdAt: Date;
}

interface ProgramChatProps {
  programId: string;
  userId: string;
  username: string;
}

export default function ProgramChat({ programId, userId, username }: ProgramChatProps) {
  const { isConnected } = useSocket();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    if (isConnected) {
      // Join the program room
      joinProgram(programId);

      // Subscribe to new messages
      const unsubscribe = subscribeToMessages(programId, (message) => {
        setMessages((prev) => [...prev, message]);
      });

      // Cleanup: leave room and unsubscribe
      return () => {
        unsubscribe();
        leaveProgram(programId);
      };
    }
  }, [programId, isConnected]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(), // You might want to generate this on the server
      text: newMessage,
      userId,
      programId,
      username,
      createdAt: new Date(),
    };

    sendMessage(message);
    setNewMessage('');
  };

  if (!isConnected) {
    return <div>Connecting to chat...</div>;
  }

  return (
    <div className="flex flex-col h-[500px] border rounded-lg">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex flex-col ${
              message.userId === userId ? 'items-end' : 'items-start'
            }`}
          >
            <div className="text-sm text-gray-500">{message.username}</div>
            <div
              className={`rounded-lg p-3 max-w-[70%] ${
                message.userId === userId
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-black'
              }`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>
      <form onSubmit={handleSendMessage} className="border-t p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 border rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
} 