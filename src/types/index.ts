// Currency type
export interface Currency {
  code: string;
  name: string;
}

// Exchange rates response from API
export interface ExchangeRatesResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

// Conversion history entry
export interface ConversionHistory {
  id: string;
  timestamp: string;
  fromCurrency: string;
  toCurrency: string;
  amount: number;
  result: number;
  rate: number;
}

// Chart data structure
export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    borderColor: string;
    backgroundColor: string;
    tension: number;
  }[];
}