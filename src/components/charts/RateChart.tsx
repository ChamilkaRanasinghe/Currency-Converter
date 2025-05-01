import React, { useState, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { fetchHistoricalRates } from '../../services/currencyService';
import { format, subDays } from 'date-fns';
import { ChevronDown } from 'lucide-react';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

interface RateChartProps {
  fromCurrency: string;
  toCurrency: string;
}

const RateChart: React.FC<RateChartProps> = ({ fromCurrency, toCurrency }) => {
  const [chartData, setChartData] = useState<{
    labels: string[];
    datasets: any[];
  }>({
    labels: [],
    datasets: [],
  });
  
  const [timeRange, setTimeRange] = useState<'7d' | '1m' | '3m' | '1y'>('7d');
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      try {
        // Get date range based on selection
        const numDays = 
          timeRange === '7d' ? 7 :
          timeRange === '1m' ? 30 :
          timeRange === '3m' ? 90 : 365;
        
        const endDate = new Date();
        const dates = [];
        
        // Generate dates and fetch historical data for each
        for (let i = numDays; i >= 0; i -= Math.max(1, Math.floor(numDays / 10))) {
          const date = format(subDays(endDate, i), 'yyyy-MM-dd');
          dates.push(date);
        }
        
        // Simulate fetching data for each date (in reality, this might be a batch API call)
        const rates = await Promise.all(
          dates.map(date => fetchHistoricalRates(date, fromCurrency))
        );
        
        // Extract rates for the target currency
        const rateValues = rates.map(data => data.rates[toCurrency]);
        
        // Format dates for labels (e.g., "Jan 5")
        const labels = dates.map(date => {
          const parts = date.split('-');
          return format(new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2])), 'MMM d');
        });
        
        // Set chart data
        setChartData({
          labels,
          datasets: [
            {
              label: `${fromCurrency} to ${toCurrency} Exchange Rate`,
              data: rateValues,
              borderColor: '#3b82f6',
              backgroundColor: 'rgba(59, 130, 246, 0.1)',
              tension: 0.4,
              fill: true,
              pointBackgroundColor: '#3b82f6',
              pointBorderColor: '#fff',
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
            },
          ],
        });
        
        setLoading(false);
      } catch (error) {
        console.error('Error fetching historical rates:', error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, [fromCurrency, toCurrency, timeRange]);
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        titleColor: '#333',
        bodyColor: '#666',
        borderColor: '#ddd',
        borderWidth: 1,
        padding: 10,
        displayColors: false,
        callbacks: {
          title: (tooltipItems: any) => {
            return tooltipItems[0].label;
          },
          label: (context: any) => {
            return `1 ${fromCurrency} = ${context.raw.toFixed(6)} ${toCurrency}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: (value: any) => {
            return value.toFixed(4);
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
  };
  
  const timeRanges = [
    { value: '7d', label: '7 Days' },
    { value: '1m', label: '1 Month' },
    { value: '3m', label: '3 Months' },
    { value: '1y', label: '1 Year' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {fromCurrency}/{toCurrency} Rate History
        </h2>
        
        <div className="mt-4 sm:mt-0 relative">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value as any)}
            className="block appearance-none w-full bg-white border border-gray-300 hover:border-gray-400 px-4 py-2 pr-8 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
          >
            {timeRanges.map((range) => (
              <option key={range.value} value={range.value}>
                {range.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <ChevronDown className="h-5 w-5" />
          </div>
        </div>
      </div>
      
      <div className="h-80 relative">
        {loading ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
          </div>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>
      
      <div className="mt-4 text-xs text-gray-500">
        <p>
          Data shown is simulated for demonstration purposes. In a production environment,
          this would use real historical exchange rate data from a financial API.
        </p>
      </div>
    </div>
  );
};

export default RateChart;