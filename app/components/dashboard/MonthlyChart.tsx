"use client";

import { useMemo } from "react";
import { useCurrency } from "@/app/hooks/useCurrency";
import { TrendingUp, Calendar } from "lucide-react";

interface DailyTotal {
  _id: string; // "YYYY-MM-DD"
  income: number;
  expense: number;
  count: number;
}

interface Props {
  dailyTotals: DailyTotal[];
}

export default function MonthlyBarChart({ dailyTotals }: Props) {
  const { format } = useCurrency();

  // Group daily totals into monthly buckets
  const chartData = useMemo(() => {
    const monthlyMap: Record<string, { month: string; year: number; income: number; expense: number; date: number }> = {};

    dailyTotals.forEach((d) => {
      const date = new Date(d._id);
      const month = date.toLocaleString("default", { month: "short" });
      const year = date.getFullYear();
      const key = `${month} ${year}`;

      if (!monthlyMap[key]) {
        monthlyMap[key] = { month, year, income: 0, expense: 0, date: date.getTime() };
      }
      monthlyMap[key].income += Number(d.income) || 0;
      monthlyMap[key].expense += Number(d.expense) || 0;
    });

    return Object.values(monthlyMap)
      .sort((a, b) => a.date - b.date)
      .slice(-6); // last 6 months
  }, [dailyTotals]);

  const maxValue = Math.max(1, ...chartData.flatMap((d) => [d.income, d.expense]));

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center h-80 flex flex-col items-center justify-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-gray-600 font-medium mb-2">No transaction data</p>
        <p className="text-sm text-gray-400">Add transactions to see monthly overview</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow h-80">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">Monthly Overview</h2>
        </div>
        <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
          Last {chartData.length} months
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 25, 50, 75, 100].map((val) => (
            <div key={val} className="border-t border-gray-100 w-full h-0" />
          ))}
        </div>

        <div className="h-40 flex items-end justify-between gap-2 relative z-10">
          {chartData.map((d, i) => {
            const incomeHeight = (d.income / maxValue) * 100;
            const expenseHeight = (d.expense / maxValue) * 100;

            return (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="flex items-end gap-1 w-full h-36 mb-2">
                  <div className="relative w-1/2 group/bar">
                    <div
                      className="bg-linear-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 group-hover/bar:shadow-lg group-hover/bar:shadow-green-200"
                      style={{ height: `${Math.max(incomeHeight, 4)}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        {format(d.income)}
                      </div>
                    </div>
                  </div>
                  <div className="relative w-1/2 group/bar">
                    <div
                      className="bg-linear-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-300 group-hover/bar:shadow-lg group-hover/bar:shadow-red-200"
                      style={{ height: `${Math.max(expenseHeight, 4)}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover/bar:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        {format(d.expense)}
                      </div>
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">{d.month}</span>
                <span className="text-[10px] text-gray-400">{d.year}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-green-500 rounded-full" />
          <span className="text-xs font-medium text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full" />
          <span className="text-xs font-medium text-gray-600">Expense</span>
        </div>
      </div>
    </div>
  );
}