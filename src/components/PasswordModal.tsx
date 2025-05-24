import React, { useState } from 'react';
import { Lock, Eye, EyeOff, X } from 'lucide-react';

interface PasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (password: string) => void;
  roomName: string;
}

const PasswordModal: React.FC<PasswordModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  roomName,
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!password.trim()) {
      setError('Please enter a password');
      return;
    }

    onSubmit(password);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-slate-900 rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-fade-in">
        <div className="flex justify-between items-center p-4 border-b border-slate-700">
          <h2 className="text-xl font-semibold text-slate-100 flex items-center">
            <Lock size={20} className="text-amber-500 mr-2" />
            Password Protected Room
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
            Enter the password to access <span className="font-semibold text-teal-400">{roomName}</span>
          </p>

          <div className="mb-4">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter room password"
                className="input pr-10 w-full"
                autoFocus
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
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
              className="btn btn-primary"
            >
              Enter Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PasswordModal;