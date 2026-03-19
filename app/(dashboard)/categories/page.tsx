"use client";

import { useState, useEffect } from "react";
import { Plus, FolderTree, Sparkles } from "lucide-react";
import { categoryAPI } from "@/app/lib/api";
import CategoryList from "@/app/components/categories/CategoryList";
import CategoryForm from "@/app/components/categories/CategoryForm";
import { Category } from "@/app/types/category";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const response = await categoryAPI.getAll();
      setCategories(response.data.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (formData: any) => {
    try {
      await categoryAPI.create(formData);
      setShowAddForm(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category", error);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    
    try {
      await categoryAPI.delete(id);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  // Calculate stats
  const totalCategories = categories.length;
  const categoriesWithBudget = categories.filter(c => c.budget?.amount).length;
  const incomeCategories = categories.filter(c => c.type === 'income').length;
  const expenseCategories = categories.filter(c => c.type === 'expense').length;

  return (
    <div className="space-y-8">
      {/* Premium Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg shadow-indigo-200">
            <FolderTree className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Categories
            </h1>
            <p className="text-sm text-gray-500 mt-1">Organize your transactions</p>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(true)}
          className="group relative bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-6 py-3 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-indigo-200 hover:shadow-xl transition-all duration-300 hover:scale-105"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          <span className="font-medium">New Category</span>
          <Sparkles className="w-4 h-4 opacity-50 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Premium Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">Total</p>
          <p className="text-2xl font-bold text-gray-900">{totalCategories}</p>
          <p className="text-xs text-gray-400 mt-1">categories</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">With Budget</p>
          <p className="text-2xl font-bold text-indigo-600">{categoriesWithBudget}</p>
          <p className="text-xs text-gray-400 mt-1">active budgets</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">Income</p>
          <p className="text-2xl font-bold text-green-600">{incomeCategories}</p>
          <p className="text-xs text-gray-400 mt-1">categories</p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 hover:shadow-md transition-shadow">
          <p className="text-xs text-gray-500 mb-1">Expense</p>
          <p className="text-2xl font-bold text-red-600">{expenseCategories}</p>
          <p className="text-xs text-gray-400 mt-1">categories</p>
        </div>
      </div>

      {/* Category List */}
      <CategoryList
        categories={categories}
        loading={loading}
        onDelete={handleDeleteCategory}
        onRefresh={fetchCategories}
      />

      {/* Add Category Modal */}
      {showAddForm && (
        <CategoryForm
          onSubmit={handleAddCategory}
          onClose={() => setShowAddForm(false)}
        />
      )}
    </div>
  );
}