"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { transactionAPI } from "@/app/lib/api";
import { useCurrency } from "@/app/hooks/useCurrency";
import BalanceCard from "@/app/components/dashboard/BalanceCard";
import RecentTransactions from "@/app/components/dashboard/RecentTransactions";
import Link from "next/link";

// 🔥 Lazy load heavy charts
const MonthlyChart = dynamic(() => import("@/app/components/dashboard/MonthlyChart"), { ssr: false });
const CategoryPie = dynamic(() => import("@/app/components/dashboard/CategoryPie"), { ssr: false });

interface Transaction {
  _id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: {
    _id: string;
    name: string;
    icon: string;
    color: string;
  };
  date: string;
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  const { currency, loading: currencyLoading } = useCurrency();

  // 🔥 Fetch data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await transactionAPI.getAll({ limit: 50 });
        const data = response.data.data.data;

        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // 😏 Delete handler (no refetch = fast)
  const handleDeleteTransaction = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await transactionAPI.delete(id);

      // 💣 Update UI instantly
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  // 🔥 Memoized stats
  const stats = useMemo(() => {
    const income = transactions
      .filter(t => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expense = transactions
      .filter(t => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      balance: income - expense,
      income,
      expense,
      transactionCount: transactions.length
    };
  }, [transactions]);

  // 😏 Memoized recent
  const recentTransactions = useMemo(
    () => transactions.slice(0, 5),
    [transactions]
  );

  // 💖 Loading skeleton (better LCP)
  if (loading || currencyLoading || !currency) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-40" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
          <div className="h-24 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Dashboard</h1>

        <Link
          href="/transactions?add=true"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center justify-center gap-2 w-full sm:w-auto"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </Link>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BalanceCard title="Balance" amount={stats.balance} icon={Wallet} color="indigo" />
        <BalanceCard title="Income" amount={stats.income} icon={TrendingUp} color="green" />
        <BalanceCard title="Expense" amount={stats.expense} icon={TrendingDown} color="red" />
      </div>

      {/* Charts (lazy loaded) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart />
        <CategoryPie />
      </div>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={recentTransactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}