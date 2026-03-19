import { useState } from "react";
import { categoryAPI } from "@/app/lib/api";
import CategoryItem from "./CategoryItem";
import CategoryForm from "./CategoryForm";
import { Category } from "@/app/types/category";
import { FolderOpen, PlusCircle } from "lucide-react";

interface CategoryListProps {
  categories: Category[];
  loading: boolean;
  onDelete: (id: string) => void;
  onRefresh: () => void;
}

export default function CategoryList({ categories, loading, onDelete, onRefresh }: CategoryListProps) {
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const handleEdit = async (id: string, data: any) => {
    try {
      await categoryAPI.update(id, data);
      setEditingCategory(null);
      onRefresh();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  // Premium Loading Skeletons
  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i} 
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 animate-pulse"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {/* Color bar skeleton */}
            <div className="h-2 w-full bg-gray-200 rounded-t-lg -mt-5 mb-4"></div>
            
            <div className="flex items-center gap-4">
              {/* Icon skeleton */}
              <div className="w-14 h-14 bg-gray-200 rounded-xl"></div>
              
              <div className="flex-1">
                {/* Title skeleton */}
                <div className="h-5 bg-gray-200 rounded-lg w-3/4 mb-2"></div>
                {/* Badge skeleton */}
                <div className="h-4 bg-gray-200 rounded-full w-16"></div>
              </div>
            </div>
            
            {/* Budget skeleton */}
            <div className="mt-4 pt-4 border-t border-gray-100">
              <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
              <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Premium Empty State
  if (categories.length === 0) {
    return (
      <div className="bg-linear-to-br from-gray-50 to-white rounded-3xl shadow-sm border border-gray-100 p-16 text-center">
        <div className="relative w-32 h-32 mx-auto mb-6">
          {/* Animated background */}
          <div className="absolute inset-0 bg-indigo-100 rounded-full animate-pulse"></div>
          <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
            <FolderOpen className="w-12 h-12 text-indigo-600" />
          </div>
        </div>
        
        <h3 className="text-2xl font-bold text-gray-900 mb-3">No categories yet</h3>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Create your first category to start organizing your transactions and tracking your spending better.
        </p>
        
        <button
          onClick={() => document.querySelector('[data-add-category]')?.dispatchEvent(new Event('click'))}
          className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-600 to-indigo-700 text-white px-6 py-3 rounded-xl font-medium shadow-lg shadow-indigo-200 hover:shadow-xl hover:scale-105 transition-all"
        >
          <PlusCircle className="w-5 h-5" />
          Create Category
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Category Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category, index) => (
          <div
            key={category._id}
            className="animate-in fade-in slide-in-from-bottom-4"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <CategoryItem
              category={category}
              onEdit={setEditingCategory}
              onDelete={onDelete}
            />
          </div>
        ))}
      </div>

      {/* Stats Summary - Optional Premium Addition */}
      {categories.length > 0 && (
        <div className="mt-8 bg-linear-to-r from-indigo-50 to-transparent rounded-2xl p-4 border border-indigo-100">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-600 rounded-full"></span>
              <span className="text-gray-600">Total Categories</span>
            </div>
            <span className="font-bold text-indigo-600 text-lg">{categories.length}</span>
          </div>
          <div className="mt-2 w-full bg-indigo-100 rounded-full h-1.5">
            <div 
              className="bg-indigo-600 h-1.5 rounded-full transition-all duration-500"
              style={{ width: `${Math.min((categories.length / 20) * 100, 100)}%` }}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-2">
            {categories.filter(c => c.budget?.amount).length} categories have budgets
          </p>
        </div>
      )}

      {/* Edit Modal */}
      {editingCategory && (
        <CategoryForm
          category={editingCategory}
          onSubmit={(data) => handleEdit(editingCategory._id, data)}
          onClose={() => setEditingCategory(null)}
        />
      )}
    </>
  );
}