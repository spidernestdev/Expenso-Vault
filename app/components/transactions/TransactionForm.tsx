"use client";

import { useState, useEffect } from "react";
import { categoryAPI } from "@/app/lib/api";
import { 
  X, 
  Wallet, 
  Calendar, 
  Tag, 
  Type, 
  ChevronDown,
  Utensils,
  Car,
  ShoppingBag,
  Film,
  FileText,
  Laptop,
  TrendingUp,
  Home,
  Zap,
  Book,
  HeartPulse,
  Plane,
  Gamepad2,
  Coffee,
  Beer
} from "lucide-react";

interface TransactionFormProps {
  transaction?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

interface Category {
  _id: string;
  name: string;
  icon: string;
  color: string;
  type: string;
}

const iconComponents: { [key: string]: any } = {
  Utensils, Car, ShoppingBag, Film, FileText,
  Wallet, Laptop, TrendingUp, Home, Zap,
  Book, HeartPulse, Plane, Gamepad2, Coffee, Beer
};

export default function TransactionForm({ transaction, onSubmit, onClose }: TransactionFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    amount: transaction?.amount || "",
    type: transaction?.type || "expense",
    category: transaction?.category?._id || "",
    description: transaction?.description || "",
    date: transaction?.date ? new Date(transaction.date).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryAPI.getAll({ type: formData.type });
        setCategories(response.data.data);
        
        if (!formData.category && response.data.data.length > 0) {
          setFormData(prev => ({ ...prev, category: response.data.data[0]._id }));
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    if (formData.type) {
      fetchCategories();
    }
  }, [formData.type]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      amount: parseFloat(formData.amount)
    });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-100 p-0 sm:p-4">
      <div className="bg-white w-full sm:rounded-2xl rounded-t-2xl shadow-2xl max-w-md flex flex-col" style={{ maxHeight: '90vh' }}>
        {/* Header - Curved top */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">
            {transaction ? "Edit Transaction" : "Add Transaction"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content - with padding for button */}
        <div className="overflow-y-auto flex-1 p-4" style={{ paddingBottom: '80px' }}>
          <form id="transaction-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Transaction Type
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.type === "expense" 
                      ? "bg-red-500 text-white" 
                      : "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  Expense
                </button>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${
                    formData.type === "income" 
                      ? "bg-green-500 text-white" 
                      : "bg-gray-100 text-gray-700 border border-gray-200"
                  }`}
                >
                  Income
                </button>
              </div>
            </div>

            {/* Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                step="0.01"
                min="0.01"
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base"
                placeholder="0.00"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base appearance-none"
                >
                  <option value="">Select a category</option>
                  {categories.map((cat: Category) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base"
                placeholder="Enter description"
              />
            </div>

            {/* Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base"
              />
            </div>
          </form>
        </div>

        {/* Fixed Button at Bottom - ALWAYS VISIBLE */}
        <div className="sticky bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg p-4">
          <button
            type="submit"
            form="transaction-form"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-4 rounded-xl transition-all text-base disabled:opacity-50"
          >
            {loading ? "Processing..." : (transaction ? "Update Transaction" : "Add Transaction")}
          </button>
        </div>
      </div>
    </div>
  );
}