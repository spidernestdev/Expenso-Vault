"use client";

import { useEffect, useState } from "react";
import { transactionAPI } from "@/app/lib/api";
import { useCurrency } from "@/app/hooks/useCurrency";
import { TrendingUp, TrendingDown, Calendar } from "lucide-react";

export default function MonthlyBarChart() {
  const { format } = useCurrency();
  const [chartData, setChartData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMonthlyData = async () => {
      try {
        const res = await transactionAPI.getAll({ limit: 1000 }); // ✅ increased limit
        const transactions = res?.data?.data?.data || [];

        const monthlyTotals: any = {};

        transactions.forEach((t: any) => {
          if (!t.date || !t.amount) return;

          const date = new Date(t.date);
          const month = date.toLocaleString("default", { month: "short" });
          const year = date.getFullYear();
          const key = `${month} ${year}`;

          if (!monthlyTotals[key]) {
            monthlyTotals[key] = {
              month,
              year,
              income: 0,
              expense: 0,
              date: date.getTime(),
            };
          }

          if (t.type === "income") {
            monthlyTotals[key].income += Number(t.amount) || 0;
          } else {
            monthlyTotals[key].expense += Number(t.amount) || 0;
          }
        });

        const sorted = Object.values(monthlyTotals)
          .sort((a: any, b: any) => a.date - b.date)
          .map((item: any) => ({
            month: item.month,
            year: item.year,
            income: item.income,
            expense: item.expense,
          }));

        setChartData(sorted);
      } catch (err) {
        console.error("Chart error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyData();
  }, []);

  const maxValue = Math.max(
    1,
    ...chartData.flatMap((d) => [
      Number(d.income) || 0,
      Number(d.expense) || 0,
    ])
  );

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-5 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-5 bg-gray-200 rounded w-36 animate-pulse"></div>
        </div>
        <div className="h-48 flex items-end justify-between gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full h-32 bg-gray-200 rounded-t-lg animate-pulse"></div>
              <div className="w-8 h-3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (chartData.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Calendar className="w-8 h-8 text-indigo-600" />
        </div>
        <p className="text-gray-600 font-medium mb-2">No transaction data</p>
        <p className="text-sm text-gray-400">
          Add transactions to see monthly overview
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
          </div>
          <h2 className="text-lg font-semibold text-gray-900">
            Monthly Overview
          </h2>
        </div>
        {chartData.length > 0 && (
          <div className="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full">
            Last {chartData.length} months
          </div>
        )}
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
          {[0, 25, 50, 75, 100].map((val) => (
            <div key={val} className="border-t border-gray-100 w-full h-0"></div>
          ))}
        </div>

        <div className="h-56 flex items-end justify-between gap-2 relative z-10">
          {chartData.map((d, i) => {
            const incomeHeight = maxValue
              ? (Number(d.income) / maxValue) * 100
              : 0;

            const expenseHeight = maxValue
              ? (Number(d.expense) / maxValue) * 100
              : 0;

            return (
              <div key={i} className="flex flex-col items-center flex-1 group">
                <div className="flex items-end gap-1 w-full h-44 mb-2">
                  
                  <div className="relative w-1/2 group">
                    <div
                      className="bg-linear-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-green-200"
                      style={{ height: `${Math.max(incomeHeight, 4)}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        Income: {format(d.income)}
                      </div>
                    </div>
                  </div>

                  <div className="relative w-1/2 group">
                    <div
                      className="bg-linear-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-300 group-hover:shadow-lg group-hover:shadow-red-200"
                      style={{ height: `${Math.max(expenseHeight, 4)}%` }}
                    >
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                        Expense: {format(d.expense)}
                      </div>
                    </div>
                  </div>

                </div>

                <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-600 transition-colors">
                  {d.month}
                </span>
                <span className="text-[10px] text-gray-400">{d.year}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 mt-6 pt-4 border-t border-gray-100">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-linear-to-br from-green-500 to-green-400 rounded-full shadow-sm"></div>
          <span className="text-xs font-medium text-gray-600">Income</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-linear-to-br from-red-500 to-red-400 rounded-full shadow-sm"></div>
          <span className="text-xs font-medium text-gray-600">Expense</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-gray-200 rounded-full"></div>
          <span className="text-xs font-medium text-gray-400">
            Balance:{" "}
            {format(
              chartData.reduce(
                (sum, d) => sum + ((Number(d.income) || 0) - (Number(d.expense) || 0)),
                0
              )
            )}
          </span>
        </div>
      </div>
    </div>
  );
}