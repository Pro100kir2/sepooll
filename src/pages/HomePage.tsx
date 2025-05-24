import React, { useState, useEffect } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import RoomCard from '../components/RoomCard';
import { useRooms } from '../contexts/RoomsContext';

const HomePage: React.FC = () => {
  const { rooms } = useRooms();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredRooms, setFilteredRooms] = useState(rooms);

  useEffect(() => {
    if (searchTerm) {
      const filtered = rooms.filter(
        room =>
          room.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          room.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRooms(filtered);
    } else {
      setFilteredRooms(rooms);
    }
  }, [searchTerm, rooms]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-50 mb-2">Active Rooms</h1>
        <p className="text-slate-400">
          Browse and join secure information exchange rooms
        </p>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 space-y-4 sm:space-y-0">
        <div className="relative w-full sm:w-96">
          <input
            type="text"
            placeholder="Search rooms..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input pl-10 w-full"
          />
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        </div>

        <Link to="/create" className="btn btn-primary w-full sm:w-auto flex items-center justify-center">
          <PlusCircle size={18} className="mr-2" />
          Create New Room
        </Link>
      </div>

      {filteredRooms.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fade-in">
          {filteredRooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-slate-800/50 rounded-lg border border-slate-700">
          {searchTerm ? (
            <div>
              <p className="text-xl text-slate-300 mb-2">No rooms match your search</p>
              <p className="text-slate-400 mb-4">Try different keywords or clear your search</p>
              <button
                onClick={() => setSearchTerm('')}
                className="btn btn-secondary"
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xl text-slate-300 mb-2">No active rooms</p>
              <p className="text-slate-400 mb-4">Be the first to create a secure information exchange room</p>
              <Link to="/create" className="btn btn-primary">
                Create Room
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;