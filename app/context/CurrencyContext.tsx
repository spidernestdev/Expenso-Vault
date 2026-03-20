"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { formatCurrency, getCurrencySymbol } from "@/app/lib/currency";

interface CurrencyContextType {
  currency: string;
  format: (amount: number) => string;
  symbol: string;
  loading: boolean;
  setCurrency: (currency: string) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  format: (n) => formatCurrency(n, "INR"),
  symbol: "₹",
  loading: false,
  setCurrency: () => {},
});

export function CurrencyProvider({
  children,
  initialCurrency = "INR",
  loading = false,
}: {
  children: React.ReactNode;
  initialCurrency?: string;
  loading?: boolean;
}) {
  const [currency, setCurrencyState] = useState(initialCurrency);

  const setCurrency = useCallback((c: string) => {
    setCurrencyState(c);
  }, []);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        format: (n) => formatCurrency(n, currency),
        symbol: getCurrencySymbol(currency),
        loading,
        setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);