import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ConversionHistory, Currency } from '../types';
import { fetchExchangeRates } from '../services/currencyService';

interface CurrencyContextType {
  currencies: Currency[];
  rates: Record<string, number>;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  convertedAmount: number | null;
  loading: boolean;
  error: string | null;
  history: ConversionHistory[];
  setFromCurrency: (currency: string) => void;
  setToCurrency: (currency: string) => void;
  setAmount: (amount: string) => void;
  swapCurrencies: () => void;
  convert: () => void;
  addToFavorites: (from: string, to: string) => void;
  removeFromFavorites: (from: string, to: string) => void;
  favorites: { from: string; to: string }[];
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
};

interface CurrencyProviderProps {
  children: ReactNode;
}

export const CurrencyProvider: React.FC<CurrencyProviderProps> = ({ children }) => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('1');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [history, setHistory] = useState<ConversionHistory[]>([]);
  const [favorites, setFavorites] = useState<{ from: string; to: string }[]>([]);

  useEffect(() => {
    const loadInitialData = async () => {
      try {
        setLoading(true);
        const data = await fetchExchangeRates();
        
        // Create list of currencies
        const currencyList = Object.keys(data.rates).map(code => ({
          code,
          name: getCurrencyName(code)
        }));
        
        // Add base currency which might not be in rates
        currencyList.push({
          code: data.base,
          name: getCurrencyName(data.base)
        });
        
        // Sort currencies alphabetically by code
        currencyList.sort((a, b) => a.code.localeCompare(b.code));
        
        setCurrencies(currencyList);
        setRates({ ...data.rates, [data.base]: 1 });
        setLoading(false);
      } catch (err) {
        setError('Failed to load currency data. Please try again later.');
        setLoading(false);
      }
    };

    // Load saved data from localStorage
    const loadSavedData = () => {
      const savedHistory = localStorage.getItem('conversionHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }

      const savedFavorites = localStorage.getItem('conversionFavorites');
      if (savedFavorites) {
        setFavorites(JSON.parse(savedFavorites));
      }
    };

    loadInitialData();
    loadSavedData();
  }, []);

  // Save history and favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('conversionHistory', JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    localStorage.setItem('conversionFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const convert = () => {
    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid amount');
      return;
    }

    try {
      const numAmount = parseFloat(amount);
      const fromRate = rates[fromCurrency];
      const toRate = rates[toCurrency];
      
      if (!fromRate || !toRate) {
        setError('Exchange rate not available for selected currencies');
        return;
      }

      // Convert through base currency
      const result = (numAmount * toRate) / fromRate;
      setConvertedAmount(result);

      // Add to history
      const newConversion: ConversionHistory = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        fromCurrency,
        toCurrency,
        amount: numAmount,
        result,
        rate: toRate / fromRate
      };

      setHistory(prev => [newConversion, ...prev.slice(0, 19)]);
      setError(null);
    } catch (err) {
      setError('Conversion failed. Please try again.');
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const addToFavorites = (from: string, to: string) => {
    // Check if already in favorites
    const exists = favorites.some(fav => fav.from === from && fav.to === to);
    if (!exists) {
      setFavorites(prev => [...prev, { from, to }]);
    }
  };

  const removeFromFavorites = (from: string, to: string) => {
    setFavorites(prev => 
      prev.filter(fav => !(fav.from === from && fav.to === to))
    );
  };

  // Helper function to get currency names
  const getCurrencyName = (code: string): string => {
    const currencyNames: Record<string, string> = {
      USD: 'US Dollar',
      EUR: 'Euro',
      GBP: 'British Pound',
      JPY: 'Japanese Yen',
      AUD: 'Australian Dollar',
      CAD: 'Canadian Dollar',
      CHF: 'Swiss Franc',
      CNY: 'Chinese Yuan',
      INR: 'Indian Rupee',
      // Add more as needed
    };
    return currencyNames[code] || code;
  };

  const value = {
    currencies,
    rates,
    fromCurrency,
    toCurrency,
    amount,
    convertedAmount,
    loading,
    error,
    history,
    favorites,
    setFromCurrency,
    setToCurrency,
    setAmount,
    swapCurrencies,
    convert,
    addToFavorites,
    removeFromFavorites
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};