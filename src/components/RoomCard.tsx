import React from 'react';
import { Link } from 'react-router-dom';
import { Users, Lock, Unlock, Calendar } from 'lucide-react';
import { Room } from '../types';

interface RoomCardProps {
  room: Room;
}

const RoomCard: React.FC<RoomCardProps> = ({ room }) => {
  const formattedDate = new Date(room.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <Link
      to={`/room/${room.id}`}
      className="block bg-slate-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-200 hover:bg-slate-700 p-5 border border-slate-700"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-xl font-semibold text-teal-400 mb-2">{room.name}</h3>
        {room.password ? (
            <span title="Password protected">
                  <Lock size={18} className="text-amber-400"/>
            </span>
        ) : (
            <span title="No password required">
                  <Unlock size={18} className="text-green-400"/>
            </span>
        )}
      </div>

      <p className="text-slate-300 mb-4 line-clamp-2">{room.description}</p>

      <div className="flex items-center justify-between text-slate-400 text-sm">
        <div className="flex items-center space-x-1">
          <Users size={16} />
          <span>{room.userCount || 0}/10</span>
        </div>

        <div className="flex items-center space-x-1">
          <Calendar size={16} />
          <span>{formattedDate}</span>
        </div>
      </div>
    </Link>
  );
};

export default RoomCard;