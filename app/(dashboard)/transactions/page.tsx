"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Plus, Download } from "lucide-react";
import { useRouter } from "next/navigation";
import { transactionAPI, categoryAPI } from "@/app/lib/api";
import TransactionList from "@/app/components/transactions/TransactionList";
import TransactionForm from "@/app/components/transactions/TransactionForm";
import TransactionFilters from "@/app/components/transactions/TransactionFilters";

interface Transaction {
  _id: string;
  amount: number;
  type: "income" | "expense";
  description: string;
  category: { _id: string; name: string; icon: string; color: string };
  date: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

export default function TransactionsPage() {
  const router = useRouter();
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showExportModal, setShowExportModal] = useState(false);
  const [filters, setFilters] = useState({ type: "", category: "", startDate: "", endDate: "", search: "" });
  const [debouncedFilters, setDebouncedFilters] = useState(filters);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 5, total: 0, pages: 0 });

  useEffect(() => {
    categoryAPI.getAll().then(res => setCategories(res.data.data)).catch(() => {});
  }, []);

  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  useEffect(() => {
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      setDebouncedFilters(filters);
      setPagination(prev => ({ ...prev, page: 1 }));
    }, 400);
    return () => clearTimeout(debounceRef.current);
  }, [filters]);

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      const activeFilters = Object.fromEntries(
        Object.entries(debouncedFilters).filter(([_, v]) => v !== "")
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
  }, [pagination.page, debouncedFilters]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

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

  const handleWriteReview = () => {
    setShowExportModal(false);
    router.push("/#reviews");
    setTimeout(() => {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Transactions</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowExportModal(true)}
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

      <TransactionFilters filters={filters} setFilters={setFilters} categories={categories} />

      <TransactionList
        transactions={transactions}
        loading={loading}
        onDelete={handleDeleteTransaction}
        onUpdate={fetchTransactions}
        pagination={pagination}
        onPageChange={(page) => setPagination(prev => ({ ...prev, page }))}
      />

      {/* Add Transaction Form */}
      {showAddForm && (
        <TransactionForm
          onSubmit={handleAddTransaction}
          onClose={() => setShowAddForm(false)}
          categories={categories}
        />
      )}

      {/* Export Coming Soon Modal */}
      {showExportModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-indigo-600" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Coming in v2.0.0</h3>
            <p className="text-sm text-gray-500 mb-6">
              Export is under development. Have suggestions or want more features? Leave a review — we read every one.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowExportModal(false)}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleWriteReview}
                className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-medium transition-colors"
              >
                Write a Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}