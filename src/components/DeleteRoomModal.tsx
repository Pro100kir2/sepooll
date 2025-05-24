import React, { useState } from 'react';
import { Trash2, Eye, EyeOff, X } from 'lucide-react';

interface DeleteRoomModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDelete: (privateKey: string) => void;
  roomName: string;
}

const DeleteRoomModal: React.FC<DeleteRoomModalProps> = ({
  isOpen,
  onClose,
  onDelete,
  roomName,
}) => {
  const [privateKey, setPrivateKey] = useState('');
  const [showKey, setShowKey] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!privateKey.trim()) {
      setError('Please enter the private key');
      return;
    }

    onDelete(privateKey);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 flex items-center">
            <Trash2 size={20} className="text-error mr-2" />
            Delete Room
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-300 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <p className="text-slate-300 mb-4">
            Enter the private key to delete <span className="font-semibold text-error">{roomName}</span>
          </p>

          <div className="mb-4">
            <div className="relative">
              <input
                type={showKey ? 'text' : 'password'}
                value={privateKey}
                onChange={(e) => setPrivateKey(e.target.value)}
                placeholder="Enter private key"
                className="input pr-10 w-full"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {error && <p className="text-error mt-1 text-sm">{error}</p>}
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn bg-error hover:bg-error/80 text-white"
            >
              Delete Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DeleteRoomModal;