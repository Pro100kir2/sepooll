import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff } from 'lucide-react';
import { useRooms } from '../contexts/RoomsContext';

const CreateRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { createRoom } = useRooms();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    description: '',
    password: '',
  });

  const validate = () => {
    let isValid = true;
    const newErrors = {
      name: '',
      description: '',
      password: '',
    };

    if (!name.trim()) {
      newErrors.name = 'Room name is required';
      isValid = false;
    }

    if (!description.trim()) {
      newErrors.description = 'Description is required';
      isValid = false;
    }

    if (password && password.length > 16) {
      newErrors.password = 'Password must be 16 characters or less';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    const room = createRoom(
      name.trim(),
      description.trim(),
      password.trim() || undefined
    );

    navigate(`/room/${room.id}`);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-slate-50 mb-2">Create a New Room</h1>
        <p className="text-slate-400">
          Set up a secure space to exchange encrypted information
        </p>
      </div>

      <div className="bg-slate-800 rounded-lg border border-slate-700 p-6 animate-slide-in">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              Room Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter room name"
              className="input w-full"
            />
            {errors.name && <p className="mt-1 text-sm text-error">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-slate-300 mb-1">
              Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter room description"
              rows={3}
              className="input w-full"
            />
            {errors.description && <p className="mt-1 text-sm text-error">{errors.description}</p>}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password (Optional)
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter room password (optional)"
                className="input w-full pr-10"
                maxLength={16}
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="mt-1 text-sm text-error">{errors.password}</p>}
            <p className="mt-1 text-xs text-slate-400">
              Leave blank for no password, or enter up to 16 characters
            </p>
          </div>

          <div className="flex flex-col mb-6 p-4 bg-slate-900 rounded-md border border-slate-700">
            <div className="flex items-center mb-2">
              <KeyRound size={18} className="text-teal-500 mr-2" />
              <h3 className="font-medium text-teal-400">Security Information</h3>
            </div>
            <p className="text-sm text-slate-300 mb-2">
              A unique public key will be automatically generated when you create the room.
            </p>
            <p className="text-sm text-slate-400">
              This key will be required to decrypt messages in the room.
              Anyone with the key can read messages, so share it only with trusted participants.
            </p>
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Create Room
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateRoomPage;