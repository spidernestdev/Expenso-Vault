"use client";

import { createContext, useContext, useState, useCallback } from "react";
import { formatCurrency, getCurrencySymbol } from "@/app/lib/currency";

interface User {
  _id: string;
  name: string;
  email: string;
  currency: string;
  language: string;
  role: string;
  avatar?: string;
}

interface CurrencyContextType {
  currency: string;
  format: (amount: number) => string;
  symbol: string;
  loading: boolean;
  setCurrency: (currency: string) => void;
  user: User | null;
  setUser: (user: User | null) => void;
}

export const CurrencyContext = createContext<CurrencyContextType>({
  currency: "INR",
  format: (n) => formatCurrency(n, "INR"),
  symbol: "₹",
  loading: false,
  setCurrency: () => {},
  user: null,
  setUser: () => {},
});

export function CurrencyProvider({
  children,
  initialCurrency = "INR",
  initialUser = null,
  loading = false,
}: {
  children: React.ReactNode;
  initialCurrency?: string;
  initialUser?: User | null;
  loading?: boolean;
}) {
  const [currency, setCurrencyState] = useState(initialCurrency);
  const [user, setUser] = useState<User | null>(initialUser);

  const setCurrency = useCallback((c: string) => setCurrencyState(c), []);

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        format: (n) => formatCurrency(n, currency),
        symbol: getCurrencySymbol(currency),
        loading,
        setCurrency,
        user,
        setUser,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export const useCurrency = () => useContext(CurrencyContext);