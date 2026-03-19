"use client";

import { useEffect, useState } from "react";
import { Wallet, TrendingUp, TrendingDown, Plus } from "lucide-react";
import { transactionAPI } from "@/app/lib/api";
import BalanceCard from "@/app/components/dashboard/BalanceCard";
import RecentTransactions from "@/app/components/dashboard/RecentTransactions";
import MonthlyChart from "@/app/components/dashboard/MonthlyChart";
import CategoryPie from "@/app/components/dashboard/CategoryPie";
import Link from "next/link";

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

interface Stats {
  balance: number;
  income: number;
  expense: number;
  transactionCount: number;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats>({
    balance: 0,
    income: 0,
    expense: 0,
    transactionCount: 0
  });
  const [loading, setLoading] = useState(true);
  const [recentTransactions, setRecentTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const response = await transactionAPI.getAll({ limit: 5 });
        const transactions = response.data.data.data;
        
        setRecentTransactions(transactions);

        const income = transactions
          .filter((t: Transaction) => t.type === "income")
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
        const expense = transactions
          .filter((t: Transaction) => t.type === "expense")
          .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

        setStats({
          balance: income - expense,
          income,
          expense,
          transactionCount: transactions.length
        });
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
      const response = await transactionAPI.getAll({ limit: 5 });
      setRecentTransactions(response.data.data.data);
      
      const transactions = response.data.data.data;
      const income = transactions
        .filter((t: Transaction) => t.type === "income")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);
      const expense = transactions
        .filter((t: Transaction) => t.type === "expense")
        .reduce((sum: number, t: Transaction) => sum + t.amount, 0);

      setStats({
        balance: income - expense,
        income,
        expense,
        transactionCount: transactions.length
      });
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <BalanceCard
          title="Balance"
          amount={stats.balance}
          icon={Wallet}
          color="indigo"
        />
        <BalanceCard
          title="Income"
          amount={stats.income}
          icon={TrendingUp}
          color="green"
        />
        <BalanceCard
          title="Expense"
          amount={stats.expense}
          icon={TrendingDown}
          color="red"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart />
        <CategoryPie />
      </div>

      <RecentTransactions 
        transactions={recentTransactions}
        onDelete={handleDeleteTransaction}
      />
    </div>
  );
}