import React from 'react';
import { Trash2Icon, ArrowRightIcon } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { useNavigate } from 'react-router-dom';

const FavoritesList: React.FC = () => {
  const { favorites, removeFromFavorites, setFromCurrency, setToCurrency } = useCurrency();
  const navigate = useNavigate();
  
  const handleSelectPair = (from: string, to: string) => {
    setFromCurrency(from);
    setToCurrency(to);
    navigate('/converter');
  };
  
  if (favorites.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Saved Pairs</h3>
        <div className="text-center py-8">
          <p className="text-gray-500">You haven't saved any currency pairs yet.</p>
          <p className="text-gray-500 mt-2">
            Save your frequent conversions to access them quickly!
          </p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h3 className="text-xl font-semibold text-gray-800 mb-4">Saved Pairs</h3>
      <div className="space-y-2">
        {favorites.map((pair, index) => (
          <div 
            key={`${pair.from}-${pair.to}-${index}`}
            className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50"
          >
            <button
              onClick={() => handleSelectPair(pair.from, pair.to)}
              className="flex items-center text-gray-800 hover:text-primary-600 flex-grow"
            >
              <span className="font-medium">{pair.from}</span>
              <ArrowRightIcon className="mx-2 h-4 w-4 text-gray-400" />
              <span className="font-medium">{pair.to}</span>
            </button>
            
            <button
              onClick={() => removeFromFavorites(pair.from, pair.to)}
              className="p-1 text-gray-400 hover:text-error-500 transition-colors"
              aria-label={`Remove ${pair.from} to ${pair.to} from favorites`}
            >
              <Trash2Icon className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FavoritesList;