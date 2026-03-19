"use client";

import { useEffect, useState } from "react";
import { useCurrency } from "@/app/hooks/useCurrency";
import { categoryAPI, transactionAPI } from "@/app/lib/api";

export default function CategoryPie() {
  const { format } = useCurrency();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const categoriesRes = await categoryAPI.getAll();
        const transactionsRes = await transactionAPI.getAll({ 
          type: "expense", 
          limit: 1000 
        });

        const spendingByCategory: any = {};
        transactionsRes.data.data.data.forEach((t: any) => {
          const catId = t.category._id;
          if (!spendingByCategory[catId]) {
            spendingByCategory[catId] = {
              ...t.category,
              total: 0
            };
          }
          spendingByCategory[catId].total += t.amount;
        });

        setCategories(Object.values(spendingByCategory));
      } catch (error) {
        console.error("Failed to fetch category data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, []);

  // Calculate total for percentages
  const totalSpent = categories.reduce((sum, cat) => sum + cat.total, 0);

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 h-64 animate-pulse">
        <div className="h-5 bg-gradient-to-r from-gray-200 to-gray-100 rounded-lg w-1/3 mb-6"></div>
        <div className="space-y-4">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-24"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Spending by Category</h2>
        {categories.length > 0 && (
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Total: {format(totalSpent)}
          </span>
        )}
      </div>
      
      {categories.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No expense data yet</p>
          <p className="text-sm text-gray-400 mt-1">Add expenses to see breakdown</p>
        </div>
      ) : (
        <div className="space-y-4">
          {categories.slice(0, 5).map((cat, index) => {
            const percentage = ((cat.total / totalSpent) * 100).toFixed(1);
            
            return (
              <div key={cat._id} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-3 h-3 rounded-full ring-2 ring-offset-2 transition-all group-hover:scale-110"
                      style={{ 
                        backgroundColor: cat.color,
                        boxShadow: `0 0 0 2px ${cat.color}20`
                      }}
                    ></div>
                    <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                      {cat.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-semibold text-gray-900">{format(cat.total)}</span>
                    <span className="text-xs font-medium text-gray-500 min-w-[45px] text-right">
                      {percentage}%
                    </span>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full transition-all duration-500 group-hover:opacity-80"
                    style={{ 
                      width: `${percentage}%`,
                      backgroundColor: cat.color
                    }}
                  ></div>
                </div>
              </div>
            );
          })}
          
          {categories.length > 5 && (
            <div className="pt-3 mt-2 border-t border-gray-100">
              <p className="text-xs text-gray-500 text-center">
                +{categories.length - 5} more categories • 
                <span className="font-medium ml-1">
                  {format(categories.slice(5).reduce((sum, cat) => sum + cat.total, 0))}
                </span>
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}