import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock, KeyRound, Users, Copy, Check, AlertCircle } from 'lucide-react';
import { useRooms } from '../contexts/RoomsContext';
import { EncryptionStatus } from '../types';
import MessageList from '../components/MessageList';
import MessageInput from '../components/MessageInput';
import KeyInputModal from '../components/KeyInputModal';
import PasswordModal from '../components/PasswordModal';

const RoomPage: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();
  const { getRoom, addMessage, messages } = useRooms();

  const [room, setRoom] = useState(getRoom(roomId || ''));
  const [encryptionStatus, setEncryptionStatus] = useState<EncryptionStatus>({
    isEncrypted: true,
    hasKey: false,
  });
  const [showKeyModal, setShowKeyModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(!!room?.password);
  const [passwordVerified, setPasswordVerified] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  const roomMessages = roomId ? messages[roomId] || [] : [];

  useEffect(() => {
    if (roomId) {
      const foundRoom = getRoom(roomId);
      if (!foundRoom) {
        navigate('/');
        return;
      }
      setRoom(foundRoom);

      // Restore encryption status from localStorage
      const savedKey = localStorage.getItem(`room_key_${roomId}`);
      if (savedKey) {
        setEncryptionStatus({
          isEncrypted: false,
          hasKey: true,
          key: savedKey,
        });
      }
    }
  }, [roomId, getRoom, navigate]);

  useEffect(() => {
    if (room && !room.password) {
      setPasswordVerified(true);
    }
  }, [room]);

  if (!room || !roomId) {
    return null;
  }

  const handleCopyPublicKey = () => {
    if (room.publicKey) {
      navigator.clipboard.writeText(room.publicKey);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    }
  };

  const handleSubmitKey = (key: string) => {
    setEncryptionStatus({
      isEncrypted: false,
      hasKey: true,
      key,
    });

    localStorage.setItem(`room_key_${roomId}`, key);
    setShowKeyModal(false);
  };

  const handleRemoveKey = () => {
    setEncryptionStatus({
      isEncrypted: true,
      hasKey: false,
    });

    localStorage.removeItem(`room_key_${roomId}`);
  };

  const handleVerifyPassword = (password: string) => {
    if (password === room.password) {
      setPasswordVerified(true);
      setShowPasswordModal(false);
    } else {
      // Handle incorrect password
      // You could show an error message here
    }
  };

  const handleSendMessage = (roomId: string, content: string, type: string, file?: File) => {
    addMessage(roomId, content, type, file);
  };

  if (!passwordVerified) {
    return (
      <PasswordModal
        isOpen={showPasswordModal}
        onClose={() => navigate('/')}
        onSubmit={handleVerifyPassword}
        roomName={room.name}
      />
    );
  }

  return (
    <div className="flex flex-col h-[calc(100vh-9rem)]">
      <div className="border-b border-slate-700 pb-4 mb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-teal-400 mb-1 flex items-center">
              {room.name}
              {room.password && (
                <Lock size={16} className="ml-2 text-amber-400" aria-label="Password protected" />
              )}
            </h1>
            <p className="text-slate-300">{room.description}</p>
          </div>

          <div className="flex items-center mt-3 md:mt-0">
            <div className="flex items-center mr-4 text-slate-400">
              <Users size={16} className="mr-1" />
              <span className="text-sm">{room.userCount || 1}/10</span>
            </div>

            {encryptionStatus.isEncrypted ? (
              <button
                onClick={() => setShowKeyModal(true)}
                className="btn btn-primary flex items-center"
              >
                <KeyRound size={16} className="mr-1" />
                Enter Key
              </button>
            ) : (
              <button
                onClick={handleRemoveKey}
                className="btn btn-outline flex items-center"
              >
                <AlertCircle size={16} className="mr-1" />
                Remove Key
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center p-3 bg-slate-800 rounded-md">
          <div className="flex-grow">
            <div className="flex items-center mb-1">
              <KeyRound size={14} className="text-teal-500 mr-1" />
              <span className="text-sm text-teal-400 font-medium">Public Key:</span>
            </div>
            <div className="flex items-center">
              <code className="text-sm bg-slate-900 px-2 py-1 rounded font-mono text-slate-300">
                {room.publicKey}
              </code>
              <button
                onClick={handleCopyPublicKey}
                className="ml-2 p-1 text-slate-400 hover:text-teal-400 transition-colors"
                title="Copy public key"
              >
                {copySuccess ? <Check size={16} className="text-success" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
          <div className="hidden md:block text-sm text-slate-400">
            <span>Share this key with room participants to decrypt messages</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col flex-grow bg-slate-900 rounded-md border border-slate-700 overflow-hidden">
        <MessageList
          messages={roomMessages}
          encryptionStatus={encryptionStatus}
        />

        <MessageInput
          roomId={roomId}
          publicKey={room.publicKey}
          onSendMessage={handleSendMessage}
        />
      </div>

      <KeyInputModal
        isOpen={showKeyModal}
        onClose={() => setShowKeyModal(false)}
        onSubmit={handleSubmitKey}
        publicKey={room.publicKey}
      />
    </div>
  );
};

export default RoomPage;