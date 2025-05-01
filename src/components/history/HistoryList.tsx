import React, { useState } from 'react';
import { format } from 'date-fns';
import { DownloadIcon, TrashIcon, SearchIcon } from 'lucide-react';
import { useCurrency } from '../../context/CurrencyContext';
import { ConversionHistory } from '../../types';

const HistoryList: React.FC = () => {
  const { history } = useCurrency();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Filter history based on search term
  const filteredHistory = history.filter(item => {
    const searchString = `${item.fromCurrency} ${item.toCurrency}`.toLowerCase();
    return searchString.includes(searchTerm.toLowerCase());
  });
  
  // Format currency amounts
  const formatCurrency = (amount: number, currencyCode: string) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 6
    }).format(amount);
  };
  
  // Format date from ISO string
  const formatDate = (dateString: string) => {
    return format(new Date(dateString), 'MMM d, yyyy, h:mm a');
  };
  
  // Export history to CSV
  const exportToCSV = () => {
    if (history.length === 0) return;
    
    // Create CSV content
    const headers = ['Date', 'From Currency', 'Amount', 'To Currency', 'Converted Amount', 'Rate'];
    const csvRows = [
      headers.join(','),
      ...history.map(item => [
        formatDate(item.timestamp),
        item.fromCurrency,
        item.amount,
        item.toCurrency,
        item.result,
        item.rate
      ].join(','))
    ];
    const csvContent = csvRows.join('\n');
    
    // Create download link
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `currency_conversion_history_${format(new Date(), 'yyyy-MM-dd')}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Conversion History</h2>
        
        <div className="mt-4 sm:mt-0 flex space-x-2">
          <button
            onClick={exportToCSV}
            disabled={history.length === 0}
            className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <DownloadIcon className="h-4 w-4 mr-2" />
            Export
          </button>
        </div>
      </div>
      
      {/* Search */}
      <div className="relative mb-6">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <SearchIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          placeholder="Search by currency..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        />
      </div>
      
      {filteredHistory.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">
            {history.length === 0 
              ? 'No conversion history yet. Try converting some currencies!' 
              : 'No results found for your search.'}
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  From
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  To
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rate
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredHistory.map((item: ConversionHistory) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {formatDate(item.timestamp)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(item.amount, item.fromCurrency)} {item.fromCurrency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">
                      {formatCurrency(item.result, item.toCurrency)} {item.toCurrency}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    1 {item.fromCurrency} = {item.rate.toFixed(6)} {item.toCurrency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default HistoryList;