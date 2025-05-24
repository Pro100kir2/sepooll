import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generatePublicKey } from '../utils/encryption';
import { Room, Message } from '../types';

interface RoomsContextType {
  rooms: Room[];
  createRoom: (name: string, description: string, password?: string) => Room;
  getRoom: (id: string) => Room | undefined;
  addMessage: (roomId: string, content: string, type: string, file?: File) => void;
  messages: Record<string, Message[]>;
}

const RoomsContext = createContext<RoomsContextType>({
  rooms: [],
  createRoom: () => ({ id: '', name: '', description: '', publicKey: '', messages: [], createdAt: new Date() }),
  getRoom: () => undefined,
  addMessage: () => {},
  messages: {},
});

export const useRooms = () => useContext(RoomsContext);

export const RoomsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [rooms, setRooms] = useState<Room[]>(() => {
    const savedRooms = localStorage.getItem('rooms');
    return savedRooms ? JSON.parse(savedRooms) : [];
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : {};
  });

  useEffect(() => {
    localStorage.setItem('rooms', JSON.stringify(rooms));
  }, [rooms]);

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const createRoom = (name: string, description: string, password?: string): Room => {
    const id = uuidv4();
    const publicKey = generatePublicKey();
    const newRoom: Room = {
      id,
      name,
      description,
      password,
      publicKey,
      userCount: 1,
      createdAt: new Date(),
    };

    setRooms((prevRooms) => [...prevRooms, newRoom]);
    setMessages((prevMessages) => ({
      ...prevMessages,
      [id]: [],
    }));

    return newRoom;
  };

  const getRoom = (id: string): Room | undefined => {
    return rooms.find(room => room.id === id);
  };

  const addMessage = (roomId: string, content: string, type: string, file?: File) => {
    const newMessage: Message = {
      id: uuidv4(),
      content,
      type,
      sender: 'user',
      timestamp: new Date(),
      file: file ? {
        name: file.name,
        type: file.type,
        size: file.size,
      } : undefined,
    };

    setMessages(prev => ({
      ...prev,
      [roomId]: [...(prev[roomId] || []), newMessage],
    }));
  };

  return (
    <RoomsContext.Provider value={{ rooms, createRoom, getRoom, addMessage, messages }}>
      {children}
    </RoomsContext.Provider>
  );
};