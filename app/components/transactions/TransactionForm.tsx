"use client";

import { useState, useEffect } from "react";
import { X, ChevronDown } from "lucide-react";

interface TransactionFormProps {
  transaction?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
  categories: any[];
}

interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
}

// Fix timezone issue — get local date not UTC date
const getLocalDateString = () => {
  const today = new Date();
  return new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split("T")[0];
};

export default function TransactionForm({ transaction, onSubmit, onClose, categories }: TransactionFormProps) {
  const [formData, setFormData] = useState({
    amount: transaction?.amount || "",
    type: transaction?.type || "expense",
    category: transaction?.category?._id || "",
    description: transaction?.description || "",
    date: transaction?.date ? new Date(transaction.date).toISOString().split("T")[0] : getLocalDateString()
  });
  const [loading, setLoading] = useState(false);

  const filteredCategories = categories.filter((c: Category) => c.type === formData.type);

  useEffect(() => {
    const first = filteredCategories[0];
    if (first && !filteredCategories.find((c: Category) => c._id === formData.category)) {
      setFormData(prev => ({ ...prev, category: first._id }));
    }
  }, [formData.type, categories]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return; // prevent double submit
    setLoading(true);
    onSubmit({ ...formData, amount: parseFloat(formData.amount) });
    // loading stays true — parent closes form, no flicker
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-50 p-0 sm:p-4">
      <div className="bg-white sm:rounded-2xl rounded-t-2xl shadow-2xl sm:max-w-md w-full flex flex-col max-h-[85vh] sm:max-h-[90vh]">

        {/* Header with action button */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 rounded-t-2xl shrink-0">
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-600" />
          </button>
          <h2 className="text-base font-bold text-gray-900">
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button
            type="submit"
            form="transaction-form"
            disabled={loading}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
          >
            {loading ? "Saving..." : transaction ? "Update" : "Add"}
          </button>
        </div>

        {/* Scrollable form */}
        <div className="overflow-y-auto flex-1 p-4 pb-30">
          <form id="transaction-form" onSubmit={handleSubmit} className="space-y-4">

            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Transaction Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${formData.type === "expense" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 border border-gray-200"}`}>
                  Expense
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`py-2.5 px-4 rounded-xl text-sm font-medium transition-all ${formData.type === "income" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 border border-gray-200"}`}>
                  Income
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} step="0.01" min="0.01" required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base"
                placeholder="0.00" />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
              <div className="relative">
                <select name="category" value={formData.category} onChange={handleChange} required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-base appearance-none">
                  <option value="">Select a category</option>
                  {filteredCategories.map((cat: Category) => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
              <input type="text" name="description" value={formData.description} onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-base"
                placeholder="Enter description" />
            </div>

            {/* Date — no max, future dates allowed */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
              <input type="date" name="date" value={formData.date} onChange={handleChange} required
  max={getLocalDateString()}
  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 text-base" />
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}