import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Currency } from '../../types';

interface CurrencySelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  currencies: Currency[];
}

const CurrencySelect: React.FC<CurrencySelectProps> = ({
  id,
  value,
  onChange,
  currencies,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  // Get top currencies to display first
  const topCurrencyCodes = ['USD', 'EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CHF', 'CNY'];
  
  const topCurrencies = currencies.filter(
    currency => topCurrencyCodes.includes(currency.code)
  );
  
  const otherCurrencies = currencies.filter(
    currency => !topCurrencyCodes.includes(currency.code)
  );

  return (
    <div className="relative">
      <select
        id={id}
        value={value}
        onChange={handleChange}
        className="block w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white"
      >
        {/* Display top currencies first */}
        {topCurrencies.length > 0 && (
          <optgroup label="Popular Currencies">
            {topCurrencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </optgroup>
        )}
        
        {/* Then display other currencies */}
        {otherCurrencies.length > 0 && (
          <optgroup label="Other Currencies">
            {otherCurrencies.map(currency => (
              <option key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </option>
            ))}
          </optgroup>
        )}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
        <ChevronDown className="h-5 w-5" />
      </div>
    </div>
  );
};

export default CurrencySelect;