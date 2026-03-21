"use client";

import { useState } from "react";
import { 
  X, 
  Utensils, Car, ShoppingBag, Film, FileText, Wallet, 
  Laptop, TrendingUp, Home, Zap, Book, HeartPulse, 
  Plane, Gamepad2, Coffee, Beer, ChevronDown
} from "lucide-react";

interface CategoryFormProps {
  category?: any;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

const COLORS = [
  "#FF5722", "#2196F3", "#9C27B0", "#FF9800", "#F44336",
  "#4CAF50", "#009688", "#8BC34A", "#673AB7", "#3F51B5",
  "#00BCD4", "#CDDC39", "#FFC107", "#FF69B4", "#795548"
];

const iconComponents = {
  Utensils, Car, ShoppingBag, Film, FileText,
  Wallet, Laptop, TrendingUp, Home, Zap,
  Book, HeartPulse, Plane, Gamepad2, Coffee, Beer
};

export default function CategoryForm({ category, onSubmit, onClose }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    name: category?.name || "",
    type: category?.type || "expense",
    icon: category?.icon || "Wallet",
    color: category?.color || COLORS[0],
    budget: {
      amount: category?.budget?.amount ?? "",
      period: category?.budget?.period ?? "",
      alert: category?.budget?.alert ?? false
    }
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("budget.")) {
      const budgetField = name.split(".")[1];
      setFormData({ ...formData, budget: { ...formData.budget, [budgetField]: value } });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Always send budget object so backend can clear values
const budget = {
  amount: formData.budget.amount !== "" && formData.budget.amount !== null
    ? Number(formData.budget.amount)
    : undefined,
  period: formData.budget.period || undefined,
  alert: formData.budget.alert
};

    onSubmit({ ...formData, budget });
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-end sm:items-center justify-center z-100 p-0 sm:p-4">
      <div className="bg-white w-full sm:rounded-2xl rounded-t-2xl shadow-2xl max-w-md max-h-[95vh] sm:max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold text-gray-900">
            {category ? "Edit Category" : "Create Category"}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-4">
          <form id="category-form" onSubmit={handleSubmit} className="space-y-5">
            {/* Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button type="button" onClick={() => setFormData({ ...formData, type: "expense" })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${formData.type === "expense" ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700 border border-gray-200"}`}>
                  Expense
                </button>
                <button type="button" onClick={() => setFormData({ ...formData, type: "income" })}
                  className={`py-3 px-4 rounded-xl font-medium transition-all ${formData.type === "income" ? "bg-green-500 text-white" : "bg-gray-100 text-gray-700 border border-gray-200"}`}>
                  Income
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleChange} required
                className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base"
                placeholder="e.g., Groceries, Salary" />
            </div>

            {/* Icon */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
              <div className="grid grid-cols-6 gap-2 max-h-32 overflow-y-auto p-3 bg-gray-50 rounded-xl border border-gray-200">
                {Object.entries(iconComponents).map(([name, Icon]) => (
                  <button key={name} type="button" onClick={() => setFormData({ ...formData, icon: name })}
                    className={`p-2 rounded-lg transition-all ${formData.icon === name ? "bg-indigo-600 text-white" : "bg-white text-gray-600 border border-gray-200"}`}
                    title={name}>
                    <Icon className="w-5 h-5 mx-auto" />
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div className="grid grid-cols-6 gap-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                {COLORS.map((color) => (
                  <button key={color} type="button" onClick={() => setFormData({ ...formData, color })}
                    className={`w-8 h-8 rounded-lg transition-all ${formData.color === color ? "ring-2 ring-offset-2 ring-indigo-600" : ""}`}
                    style={{ backgroundColor: color }} />
                ))}
              </div>
            </div>

            {/* Budget */}
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Wallet className="w-4 h-4 text-indigo-600" />
                Budget (Optional)
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Amount</label>
                  <input type="number" name="budget.amount" value={formData.budget.amount}
                    onChange={handleChange} step="0.01" min="0"
                    className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base"
                    placeholder="Enter amount" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-600 mb-1">Period</label>
                  <div className="relative">
                    <select name="budget.period" value={formData.budget.period} onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base appearance-none">
                      <option value="">No period</option>
                      <option value="monthly">Monthly</option>
                      <option value="yearly">Yearly</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
                  </div>
                </div>

                <label className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer">
                  <input type="checkbox" name="budget.alert" checked={formData.budget.alert}
                    onChange={(e) => setFormData({ ...formData, budget: { ...formData.budget, alert: e.target.checked } })}
                    className="w-5 h-5 text-indigo-600 rounded" />
                  <span className="text-sm text-gray-700">Alert when approaching limit</span>
                </label>
              </div>
            </div>
          </form>
        </div>

        {/* Submit */}
        <div className="sticky bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
          <button type="submit" form="category-form"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-4 px-4 rounded-xl transition-all text-base">
            {category ? "Update Category" : "Create Category"}
          </button>
        </div>
      </div>
    </div>
  );
}