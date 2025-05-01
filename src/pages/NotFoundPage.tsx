import React from 'react';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from 'lucide-react';

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <h1 className="text-7xl font-bold text-primary-500 mb-4">404</h1>
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
      <p className="text-gray-600 text-center max-w-md mb-8">
        The page you are looking for might have been removed or temporarily unavailable.
      </p>
      <button
        onClick={() => navigate('/')}
        className="px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center transition-colors"
      >
        <HomeIcon className="h-5 w-5 mr-2" />
        Back to Home
      </button>
    </div>
  );
};

export default NotFoundPage;