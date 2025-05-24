import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Shield as ShieldLock, Moon, Sun } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Layout: React.FC = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800 bg-slate-900">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2 text-teal-500 hover:text-teal-400 transition-colors">
            <ShieldLock size={28} />
            <span className="text-xl font-bold">SecurePool</span>
          </Link>

          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            <Link to="/create" className="btn btn-primary">
              Create Room
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-6">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-900 py-6">
        <div className="container mx-auto px-4 text-center text-slate-400 text-sm">
          <p>© {new Date().getFullYear()} SecurePool. All messages and files are encrypted end-to-end.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;