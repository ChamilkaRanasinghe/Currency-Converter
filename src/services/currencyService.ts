import { ExchangeRatesResponse } from '../types';

// This is a placeholder API endpoint
// In a real application, you would use a real currency API
const API_URL = 'https://api.exchangerate-api.com/v4/latest';

// Function to fetch current exchange rates
export const fetchExchangeRates = async (base = 'USD'): Promise<ExchangeRatesResponse> => {
  // In a real application, replace this with actual API call
  // For development/testing, return mock data
  
  try {
    // Uncomment below to use real API
    // const response = await fetch(`${API_URL}/${base}`);
    // return await response.json();
    
    // For now, return mock data
    return getMockExchangeRates(base);
  } catch (error) {
    console.error('Error fetching exchange rates:', error);
    throw new Error('Failed to fetch exchange rates');
  }
};

// Function to fetch historical exchange rates
export const fetchHistoricalRates = async (
  date: string,
  base = 'USD'
): Promise<ExchangeRatesResponse> => {
  // In a real application, replace with actual historical API call
  // For now, return slightly modified mock data to simulate historical rates
  
  try {
    // Uncomment below to use real API (if it supports historical data)
    // const response = await fetch(`${API_URL}/historical/${date}?base=${base}`);
    // return await response.json();
    
    // Mock historical data with slight variations
    const mockCurrent = getMockExchangeRates(base);
    return {
      ...mockCurrent,
      date,
      rates: Object.entries(mockCurrent.rates).reduce((acc, [currency, rate]) => {
        // Add random variation to simulate historical difference
        const variation = 0.95 + Math.random() * 0.1; // Between 0.95 and 1.05
        return { ...acc, [currency]: Number((rate * variation).toFixed(4)) };
      }, {} as Record<string, number>)
    };
  } catch (error) {
    console.error('Error fetching historical rates:', error);
    throw new Error('Failed to fetch historical exchange rates');
  }
};

// Mock data for development and testing
const getMockExchangeRates = (base: string): ExchangeRatesResponse => {
  const mockRates: Record<string, number> = {
    USD: 1,
    EUR: 0.91,
    GBP: 0.78,
    JPY: 146.32,
    AUD: 1.51,
    CAD: 1.36,
    CHF: 0.88,
    CNY: 7.23,
    INR: 83.42,
    BRL: 5.05,
    MXN: 16.72,
    KRW: 1338.24,
    SGD: 1.34,
    NZD: 1.62,
    THB: 35.80
  };

  // If base is not USD, recalculate all rates relative to the new base
  if (base !== 'USD') {
    const baseRate = mockRates[base];
    if (!baseRate) throw new Error(`Invalid base currency: ${base}`);
    
    const adjustedRates = Object.entries(mockRates).reduce((acc, [currency, rate]) => {
      return { ...acc, [currency]: Number((rate / baseRate).toFixed(4)) };
    }, {} as Record<string, number>);
    
    return {
      base,
      date: new Date().toISOString().split('T')[0],
      rates: adjustedRates
    };
  }

  return {
    base,
    date: new Date().toISOString().split('T')[0],
    rates: mockRates
  };
};