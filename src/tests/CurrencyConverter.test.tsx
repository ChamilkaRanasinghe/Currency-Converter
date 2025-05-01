import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import CurrencyConverter from '../components/converter/CurrencyConverter';
import { CurrencyProvider } from '../context/CurrencyContext';

// Mock the service file
vi.mock('../services/currencyService', () => ({
  fetchExchangeRates: vi.fn().mockResolvedValue({
    base: 'USD',
    date: '2025-01-01',
    rates: {
      EUR: 0.91,
      GBP: 0.78,
      JPY: 146.32
    }
  })
}));

describe('CurrencyConverter', () => {
  beforeEach(() => {
    // Setup the component with providers
    render(
      <BrowserRouter>
        <CurrencyProvider>
          <CurrencyConverter />
        </CurrencyProvider>
      </BrowserRouter>
    );
  });

  it('should render the currency converter form', () => {
    expect(screen.getByText('Currency Converter')).toBeInTheDocument();
    expect(screen.getByLabelText('Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('From')).toBeInTheDocument();
    expect(screen.getByLabelText('To')).toBeInTheDocument();
    expect(screen.getByText('Convert')).toBeInTheDocument();
  });

  it('should validate the amount input', async () => {
    const amountInput = screen.getByLabelText('Amount');
    const convertButton = screen.getByText('Convert');
    
    // Test empty amount
    userEvent.clear(amountInput);
    fireEvent.click(convertButton);
    await waitFor(() => {
      expect(screen.getByText('Amount is required')).toBeInTheDocument();
    });
    
    // Test invalid amount
    userEvent.type(amountInput, 'abc');
    fireEvent.click(convertButton);
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid positive number')).toBeInTheDocument();
    });
    
    // Test negative amount
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '-10');
    fireEvent.click(convertButton);
    await waitFor(() => {
      expect(screen.getByText('Please enter a valid positive number')).toBeInTheDocument();
    });
    
    // Test valid amount
    userEvent.clear(amountInput);
    userEvent.type(amountInput, '100');
    fireEvent.click(convertButton);
    await waitFor(() => {
      expect(screen.queryByText('Amount is required')).not.toBeInTheDocument();
      expect(screen.queryByText('Please enter a valid positive number')).not.toBeInTheDocument();
    });
  });

  it('should allow swapping currencies', async () => {
    // TODO: Implement a test to verify the swap functionality
    // This would check if the from/to currencies are swapped when the button is clicked
  });

  it('should add to favorites when button is clicked', async () => {
    // TODO: Implement a test to verify the favorites functionality
    // This would check if the currency pair is added to favorites when the button is clicked
  });
});