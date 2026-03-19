import { useState, useEffect } from 'react';
import { authAPI } from '@/app/lib/api';
import { formatCurrency, getCurrencySymbol } from '@/app/lib/currency';

export const useCurrency = () => {
  const [currency, setCurrency] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserCurrency = async () => {
      try {
        const response = await authAPI.getProfile();
        const userCurrency = response?.data?.data?.currency;

        if (userCurrency) {
          setCurrency(userCurrency);
        }
      } catch (error) {
        console.error('Failed to fetch currency', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserCurrency();
  }, []);

  const format = (amount: number) =>
    currency ? formatCurrency(amount, currency) : '';

  const symbol = currency ? getCurrencySymbol(currency) : '';

  return { currency, format, symbol, loading };
};