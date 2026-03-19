import { useState, useEffect } from 'react';
import { authAPI } from '@/app/lib/api';
import { formatCurrency, getCurrencySymbol } from '@/app/lib/currency';

export const useCurrency = () => {
  const [currency, setCurrency] = useState('USD');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        const response = await authAPI.getProfile();
        setCurrency(response.data.data.currency);
      } catch (error) {
        console.error('Failed to fetch currency', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCurrency();
  }, []);

  const format = (amount: number) => formatCurrency(amount, currency);
  const symbol = getCurrencySymbol(currency);

  return { currency, format, symbol, loading };
};