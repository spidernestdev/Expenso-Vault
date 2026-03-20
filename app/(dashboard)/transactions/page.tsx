"use client";

import { useState, useEffect } from "react";
import { Plus, Download } from "lucide-react";
import { transactionAPI } from "@/app/lib/api";
import TransactionList from "@/app/components/transactions/TransactionList";
import TransactionForm from "@/app/components/transactions/TransactionForm";
import TransactionFilters from "@/app/components/transactions/TransactionFilters";

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

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [filters, setFilters] = useState({
    type: "",
    category: "",
    startDate: "",
    endDate: "",
    search: ""
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0
  });

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      
      const activeFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value !== "")
      );

      const response = await transactionAPI.getAll({
        page: pagination.page,
        limit: pagination.limit,
        ...activeFilters
      });

      setTransactions(response.data.data.data);
      setPagination(response.data.data.pagination);
    } catch (error) {
      console.error("Failed to fetch transactions", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [pagination.page, filters]);

  const handleAddTransaction = async (formData: any) => {
    try {
      await transactionAPI.create(formData);
      setShowAddForm(false);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to add transaction", error);
    }
  };

  const handleDeleteTransaction = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await transactionAPI.delete(id);
      fetchTransactions();
    } catch (error) {
      console.error("Failed to delete transaction", error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await transactionAPI.exportCSV();
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'transactions.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Failed to export transactions", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transactions</h1>
        
        <div className="flex items-center gap-2">
          <button
            onClick={handleExport}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export</span>
          </button>
          
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add Transaction</span>
          </button>
        </div>
      </div>

      <TransactionFilters filters={filters} setFilters={setFilters} />

      <TransactionList
        transactions={transactions}
        loading={loading}
        onDelete={handleDeleteTransaction}
        pagination={pagination}
        onPageChange={(page) => setPagination({ ...pagination, page })}
      />

      {showAddForm && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}