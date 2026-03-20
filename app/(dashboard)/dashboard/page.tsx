"use client";

import { useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { transactionAPI } from "@/app/lib/api";
import { useCurrency } from "@/app/hooks/useCurrency";
import BalanceCard from "@/app/components/dashboard/BalanceCard";
import RecentTransactions from "@/app/components/dashboard/RecentTransactions";
import Link from "next/link";

// Lazy load heavy charts
const MonthlyChart = dynamic(() => import("@/app/components/dashboard/MonthlyChart"), {
  ssr: false,
  loading: () => <ChartSkeleton />
});
const CategoryPie = dynamic(() => import("@/app/components/dashboard/CategoryPie"), {
  ssr: false,
  loading: () => <ChartSkeleton />
});

// Fixed-height skeleton — prevents CLS
function ChartSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 h-80 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-40 mb-6" />
      <div className="h-48 bg-gray-100 rounded-xl" />
    </div>
  );
}

interface Transaction {
  _id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: { _id: string; name: string; icon: string; color: string };
  date: string;
}

interface StatsData {
  totalIncome: number;
  totalExpense: number;
  balance: number;
  transactionCount: number;
  byCategory: any[];
  dailyTotals: any[];
}

export default function DashboardPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  const { currency, loading: currencyLoading } = useCurrency();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Single Promise.all — one round trip for everything
        const [txRes, statsRes] = await Promise.all([
          transactionAPI.getAll({ limit: 10 }), // only need recent 10 for display
          transactionAPI.getStats({})            // stats endpoint for charts
        ]);

        setTransactions(txRes.data.data.data || []);
        setStats(statsRes.data.data);
console.log("dailyTotals", statsRes.data.data?.dailyTotals);
        
      } catch (error) {
        console.error("Failed to fetch dashboard data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await transactionAPI.delete(id);
      setTransactions(prev => prev.filter(t => t._id !== id));
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  if (loading || currencyLoading || !currency) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-40" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-24 bg-gray-200 rounded-2xl" />
          <div className="h-24 bg-gray-200 rounded-2xl" />
          <div className="h-24 bg-gray-200 rounded-2xl" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
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

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BalanceCard title="Balance" amount={stats?.balance ?? 0} icon={Wallet} color="indigo" />
        <BalanceCard title="Income" amount={stats?.totalIncome ?? 0} icon={TrendingUp} color="green" />
        <BalanceCard title="Expense" amount={stats?.totalExpense ?? 0} icon={TrendingDown} color="red" />
      </div>

      {/* Charts — fixed height containers prevent CLS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="min-h-80">
          <MonthlyChart dailyTotals={stats?.dailyTotals ?? []} />
        </div>
        <div className="min-h-80">
          <CategoryPie byCategory={stats?.byCategory ?? []} />
        </div>
      </div>

      {/* Recent Transactions */}
      <RecentTransactions
        transactions={transactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}