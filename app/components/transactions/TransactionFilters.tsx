"use client";

import { Filter, X, Calendar, Tag, Type, Search, ChevronDown, ArrowUp, ArrowDown, Trash2 } from "lucide-react";
import { useState } from "react";

interface TransactionFiltersProps {
  filters: {
    type: string;
    category: string;
    startDate: string;
    endDate: string;
    search: string;
  };
  setFilters: (filters: any) => void;
  categories: any[];
}

export default function TransactionFilters({ filters, setFilters, categories }: TransactionFiltersProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const clearFilters = () => {
    setFilters({ type: "", category: "", startDate: "", endDate: "", search: "" });
  };

  const activeFilterCount = Object.values(filters).filter(Boolean).length;

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            name="search"
            value={filters.search}
            onChange={handleChange}
            placeholder="Search transactions..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 placeholder-gray-400"
          />
          {filters.search && (
            <button onClick={() => setFilters({ ...filters, search: "" })} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filter Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden w-full px-4 py-4 flex items-center justify-between bg-linear-to-r from-indigo-50 to-transparent hover:from-indigo-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 rounded-xl"><Filter className="w-5 h-5 text-indigo-600" /></div>
          <span className="font-medium text-gray-900">Filters</span>
        </div>
        <div className="flex items-center gap-3">
          {activeFilterCount > 0 && (
            <span className="bg-indigo-600 text-white px-2.5 py-1 rounded-full text-xs font-medium">{activeFilterCount}</span>
          )}
          <ChevronDown className={`w-5 h-5 text-indigo-600 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
        </div>
      </button>

      {/* Filter Options */}
      <div className={`p-5 border-t border-gray-100 bg-gray-50/50 ${isOpen ? "block" : "hidden lg:block"}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Type */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Type className="w-4 h-4 text-indigo-600" /><span>Type</span>
            </label>
            <div className="relative">
              <select name="type" value={filters.type} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 appearance-none">
                <option value="">All</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Tag className="w-4 h-4 text-indigo-600" /><span>Category</span>
            </label>
            <div className="relative">
              <select name="category" value={filters.category} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900 appearance-none">
                <option value="">All Categories</option>
                {categories.map((cat: any) => (
                  <option key={cat._id} value={cat._id}>{cat.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>

          {/* Date From */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-indigo-600" /><span>From</span>
            </label>
            <input type="date" name="startDate" value={filters.startDate} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900" />
          </div>

          {/* Date To */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
              <Calendar className="w-4 h-4 text-indigo-600" /><span>To</span>
            </label>
            <input type="date" name="endDate" value={filters.endDate} onChange={handleChange} className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none text-gray-900" />
          </div>
        </div>

        {activeFilterCount > 0 && (
          <div className="mt-5 pt-4 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-medium text-gray-500">Active:</span>
              <div className="flex gap-1 flex-wrap">
                {filters.type && <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full">{filters.type === "income" ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />}{filters.type}</span>}
                {filters.category && <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"><Tag className="w-3 h-3" />Category</span>}
                {filters.startDate && <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"><Calendar className="w-3 h-3" />From</span>}
                {filters.endDate && <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"><Calendar className="w-3 h-3" />To</span>}
                {filters.search && <span className="inline-flex items-center gap-1 text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full"><Search className="w-3 h-3" />Search</span>}
              </div>
            </div>
            <button onClick={clearFilters} className="flex items-center justify-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl transition-colors text-sm font-medium">
              <Trash2 className="w-4 h-4" />Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}