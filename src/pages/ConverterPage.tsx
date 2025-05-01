import React from 'react';
import CurrencyConverter from '../components/converter/CurrencyConverter';
import RateChart from '../components/charts/RateChart';
import FavoritesList from '../components/favorites/FavoritesList';
import { useCurrency } from '../context/CurrencyContext';

const ConverterPage: React.FC = () => {
  const { fromCurrency, toCurrency } = useCurrency();
  
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <CurrencyConverter />
        </div>
        <div className="lg:col-span-1">
          <FavoritesList />
        </div>
      </div>
      
      <div>
        <RateChart fromCurrency={fromCurrency} toCurrency={toCurrency} />
      </div>
    </div>
  );
};

export default ConverterPage;