import React, { createContext, useState, useContext, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { generatePublicKey, generatePrivateKey } from '../utils/encryption';
import { Room, Message } from '../types';

interface RoomsContextType {
  rooms: Room[];
  createRoom: (name: string, description: string, password?: string) => Room;
  getRoom: (id: string) => Room | undefined;
  deleteRoom: (id: string, privateKey: string) => boolean;
  addMessage: (roomId: string, content: string, type: string, file?: File) => void;
  messages: Record<string, Message[]>;
}

const RoomsContext = createContext<RoomsContextType>({
  rooms: [],
  createRoom: () => ({ id: '', name: '', description: '', publicKey: '', privateKey: '', messages: [], createdAt: new Date() }),
  getRoom: () => undefined,
  deleteRoom: () => false,
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
    const privateKey = generatePrivateKey();
    const newRoom: Room = {
      id,
      name,
      description,
      password,
      publicKey,
      privateKey,
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

  const deleteRoom = (id: string, privateKey: string): boolean => {
    const room = getRoom(id);
    if (!room || room.privateKey !== privateKey) {
      return false;
    }

    setRooms(prevRooms => prevRooms.filter(r => r.id !== id));
    setMessages(prevMessages => {
      const newMessages = { ...prevMessages };
      delete newMessages[id];
      return newMessages;
    });

    return true;
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
    <RoomsContext.Provider value={{ rooms, createRoom, getRoom, deleteRoom, addMessage, messages }}>
      {children}
    </RoomsContext.Provider>
  );
};