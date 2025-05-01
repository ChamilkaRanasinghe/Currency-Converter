import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, ArrowRight, Star, Loader2 } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import CurrencySelect from './CurrencySelect';
import ResultDisplay from './ResultDisplay';

const CurrencyConverter: React.FC = () => {
  const {
    currencies,
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    loading,
    error,
    setFromCurrency,
    setToCurrency,
    setAmount,
    swapCurrencies,
    convert,
    addToFavorites,
    favorites
  } = useCurrency();

  const [amountError, setAmountError] = useState<string | null>(null);

  // Auto-convert when currencies change if amount is valid
  useEffect(() => {
    if (amount && !isNaN(Number(amount)) && Number(amount) > 0) {
      convert();
    }
  }, [fromCurrency, toCurrency]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setAmount(value);
    
    // Validate amount
    if (!value) {
      setAmountError('Amount is required');
    } else if (isNaN(Number(value))) {
      setAmountError('Please enter a valid number');
    } else if (Number(value) <= 0) {
      setAmountError('Amount must be greater than zero');
    } else {
      setAmountError(null);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!amount) {
      setAmountError('Amount is required');
      return;
    }
    
    if (isNaN(Number(amount)) || Number(amount) <= 0) {
      setAmountError('Please enter a valid positive number');
      return;
    }
    
    setAmountError(null);
    convert();
  };

  const handleAddToFavorites = () => {
    addToFavorites(fromCurrency, toCurrency);
  };

  const isInFavorites = favorites.some(
    fav => fav.from === fromCurrency && fav.to === toCurrency
  );

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Currency Converter</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          {/* Amount input */}
          <div>
            <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              value={amount}
              onChange={handleAmountChange}
              className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 ${
                amountError ? 'border-error-500' : 'border-gray-300'
              }`}
              placeholder="Enter amount"
            />
            {amountError && (
              <p className="mt-1 text-sm text-error-500">{amountError}</p>
            )}
          </div>
          
          {/* Currency selection */}
          <div className="grid grid-cols-1 md:grid-cols-7 gap-4 items-center">
            <div className="md:col-span-3">
              <label htmlFor="fromCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <CurrencySelect
                id="fromCurrency"
                value={fromCurrency}
                onChange={setFromCurrency}
                currencies={currencies}
              />
            </div>
            
            <div className="hidden md:flex md:col-span-1 justify-center items-center pt-6">
              <button
                type="button"
                onClick={swapCurrencies}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft className="h-5 w-5 text-gray-600" />
              </button>
            </div>
            
            <div className="md:col-span-3">
              <label htmlFor="toCurrency" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <CurrencySelect
                id="toCurrency"
                value={toCurrency}
                onChange={setToCurrency}
                currencies={currencies}
              />
            </div>
            
            {/* Mobile swap button */}
            <div className="md:hidden flex justify-center my-2">
              <button
                type="button"
                onClick={swapCurrencies}
                className="p-2 border border-gray-300 rounded-full hover:bg-gray-100 transition-colors"
                aria-label="Swap currencies"
              >
                <ArrowRightLeft className="h-5 w-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg flex items-center justify-center transition-colors"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin h-5 w-5 mr-2" />
                Converting...
              </>
            ) : (
              <>
                Convert
                <ArrowRight className="ml-2 h-5 w-5" />
              </>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleAddToFavorites}
            className={`flex items-center px-4 py-2 rounded-lg border transition-colors ${
              isInFavorites
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-white text-gray-600 border-gray-300 hover:bg-gray-50'
            }`}
            disabled={isInFavorites}
          >
            <Star
              className={`h-5 w-5 mr-2 ${
                isInFavorites ? 'fill-amber-500 text-amber-500' : 'text-gray-400'
              }`}
            />
            {isInFavorites ? 'Saved to Favorites' : 'Save to Favorites'}
          </button>
        </div>
      </form>
      
      {/* Results display */}
      {error ? (
        <div className="mt-6 p-4 bg-error-50 text-error-700 rounded-lg">
          {error}
        </div>
      ) : (
        convertedAmount !== null && (
          <ResultDisplay
            fromCurrency={fromCurrency}
            toCurrency={toCurrency}
            amount={parseFloat(amount)}
            convertedAmount={convertedAmount}
          />
        )
      )}
    </div>
  );
};

export default CurrencyConverter;