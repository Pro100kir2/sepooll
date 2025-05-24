import React from 'react';
import { Link } from 'react-router-dom';
import { Home, AlertTriangle } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="text-amber-500 mb-6">
        <AlertTriangle size={64} />
      </div>

      <h1 className="text-4xl font-bold text-slate-50 mb-2">404 - Page Not Found</h1>
      <p className="text-slate-400 mb-8 text-center max-w-md">
        The page you're looking for doesn't exist or may have been moved.
      </p>

      <Link to="/" className="btn btn-primary flex items-center">
        <Home size={18} className="mr-2" />
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;