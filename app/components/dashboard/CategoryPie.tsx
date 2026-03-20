"use client";

import { useMemo } from "react";
import { useCurrency } from "@/app/hooks/useCurrency";

interface CategoryData {
  _id: string;
  category: { _id: string; name: string; icon: string; color: string; type: string };
  total: number;
  count: number;
}

interface Props {
  byCategory: CategoryData[];
}

export default function CategoryPie({ byCategory }: Props) {
  const { format } = useCurrency();

  // Filter expenses only and sort by total
  const categories = useMemo(() => {
    return byCategory
      .filter((c) => c.category?.type === "expense")
      .sort((a, b) => b.total - a.total)
      .slice(0, 6);
  }, [byCategory]);

  const totalSpent = categories.reduce((sum, cat) => sum + cat.total, 0);

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300 h-80 flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Spending by Category</h2>
        {categories.length > 0 && (
          <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {format(totalSpent)}
          </span>
        )}
      </div>

      {categories.length === 0 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">No expense data yet</p>
          <p className="text-sm text-gray-400 mt-1">Add expenses to see breakdown</p>
        </div>
      ) : (
        <div className="flex-1 space-y-3 overflow-hidden">
          {categories.map((cat) => {
            const percentage = totalSpent ? ((cat.total / totalSpent) * 100).toFixed(1) : "0.0";
            const color = cat.category?.color || "#6366f1";

            return (
              <div key={cat._id} className="group">
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <span className="text-sm font-medium text-gray-700 truncate max-w-28">
                      {cat.category?.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-sm font-semibold text-gray-900">{format(cat.total)}</span>
                    <span className="text-xs text-gray-400 w-10 text-right">{percentage}%</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${percentage}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}