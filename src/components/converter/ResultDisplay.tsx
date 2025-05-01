import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { format } from 'date-fns';

interface ResultDisplayProps {
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  convertedAmount: number;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  fromCurrency,
  toCurrency,
  amount,
  convertedAmount,
}) => {
  const { rates } = useCurrency();
  const [showDetails, setShowDetails] = useState(false);
  const [animateResult, setAnimateResult] = useState(false);
  
  // Format numbers with proper decimal places
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { 
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(num);
  };
  
  // Calculate exchange rate
  const exchangeRate = rates[toCurrency] / rates[fromCurrency];
  
  // Trigger animation when convertedAmount changes
  useEffect(() => {
    setAnimateResult(true);
    const timer = setTimeout(() => setAnimateResult(false), 300);
    return () => clearTimeout(timer);
  }, [convertedAmount]);

  return (
    <div className={`mt-8 p-6 bg-primary-50 border border-primary-100 rounded-lg ${animateResult ? 'animate-slide-up' : ''}`}>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">
            {format(new Date(), 'MMMM d, yyyy, h:mm a')}
          </p>
          <h3 className="text-3xl font-bold text-gray-900 mt-2">
            {formatNumber(convertedAmount)} {toCurrency}
          </h3>
          <p className="text-gray-600 mt-1">
            {formatNumber(amount)} {fromCurrency} = {formatNumber(convertedAmount)} {toCurrency}
          </p>
        </div>
        
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="mt-4 sm:mt-0 text-primary-600 hover:text-primary-700 text-sm font-medium"
        >
          {showDetails ? 'Hide' : 'Show'} details
        </button>
      </div>
      
      {showDetails && (
        <div className="mt-4 pt-4 border-t border-primary-100 animate-fade-in">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Exchange Rate</p>
              <p className="text-lg font-medium text-gray-900">
                1 {fromCurrency} = {formatNumber(exchangeRate)} {toCurrency}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Inverse Rate</p>
              <p className="text-lg font-medium text-gray-900">
                1 {toCurrency} = {formatNumber(1 / exchangeRate)} {fromCurrency}
              </p>
            </div>
          </div>
          
          <div className="mt-4">
            <p className="text-xs text-gray-500">
              This data is for informational purposes only. While we strive to provide accurate data,
              please confirm rates with financial institutions before making significant transactions.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultDisplay;