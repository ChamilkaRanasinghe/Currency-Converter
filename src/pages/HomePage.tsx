import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BarChart2Icon, TrendingUpIcon, LineChartIcon, ClockIcon } from 'lucide-react';
import FavoritesList from '../components/favorites/FavoritesList';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="space-y-8">
      <section className="text-center max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-4">
          Currency Conversion <span className="text-primary-600">Made Simple</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Fast, accurate currency conversion with real-time exchange rates
        </p>
        <button
          onClick={() => navigate('/converter')}
          className="px-8 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-md transition-colors"
        >
          Start Converting
        </button>
      </section>
      
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-primary-500">
          <div className="flex items-center mb-4">
            <BarChart2Icon className="h-6 w-6 text-primary-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Real-Time Rates</h3>
          </div>
          <p className="text-gray-600">
            Access up-to-date exchange rates for accurate currency conversions.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-accent-500">
          <div className="flex items-center mb-4">
            <LineChartIcon className="h-6 w-6 text-accent-600" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Historical Data</h3>
          </div>
          <p className="text-gray-600">
            Track exchange rate trends with interactive historical charts.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-warning-500">
          <div className="flex items-center mb-4">
            <TrendingUpIcon className="h-6 w-6 text-warning-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Multiple Currencies</h3>
          </div>
          <p className="text-gray-600">
            Support for all major world currencies in a single platform.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-error-500">
          <div className="flex items-center mb-4">
            <ClockIcon className="h-6 w-6 text-error-500" />
            <h3 className="ml-2 text-lg font-semibold text-gray-800">Conversion History</h3>
          </div>
          <p className="text-gray-600">
            Keep track of your previous conversions for reference and reporting.
          </p>
        </div>
      </section>
      
      <section>
        <FavoritesList />
      </section>
    </div>
  );
};

export default HomePage;