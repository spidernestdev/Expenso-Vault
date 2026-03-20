"use client";

import { useMemo } from "react";
import { useCurrency } from "@/app/hooks/useCurrency";
import { TrendingUp, Calendar } from "lucide-react";

interface DailyTotal {
  _id: string;
  income: number;
  expense: number;
  count: number;
}

interface Props {
  dailyTotals: DailyTotal[];
}

const BAR_HEIGHT = 144; // h-36 in px

export default function MonthlyBarChart({ dailyTotals }: Props) {
  const { format } = useCurrency();

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
      .slice(-6);
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
      <div className="flex items-center justify-between mb-4">
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

      {/* Chart area */}
      <div className="relative" style={{ height: BAR_HEIGHT }}>
        {/* Grid lines */}
        {[0, 25, 50, 75, 100].map((pct) => (
          <div key={pct} className="absolute w-full border-t border-gray-100" style={{ bottom: `${pct}%` }} />
        ))}

        {/* Bars */}
        <div className="absolute inset-0 flex items-end justify-around gap-2 px-2">
          {chartData.map((d, i) => {
            const incomeH = Math.max((d.income / maxValue) * BAR_HEIGHT, d.income > 0 ? 4 : 0);
            const expenseH = Math.max((d.expense / maxValue) * BAR_HEIGHT, d.expense > 0 ? 4 : 0);

            return (
              <div key={i} className="flex items-end gap-1 flex-1" style={{ height: BAR_HEIGHT }}>
                {/* Income bar */}
                <div className="relative flex-1 group flex items-end h-full">
                  <div
                    className="w-full bg-linear-to-t from-green-500 to-green-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                    style={{ height: `${incomeH}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                      {format(d.income)}
                    </div>
                  </div>
                </div>
                {/* Expense bar */}
                <div className="relative flex-1 group flex items-end h-full">
                  <div
                    className="w-full bg-linear-to-t from-red-500 to-red-400 rounded-t-lg transition-all duration-500 group-hover:opacity-80"
                    style={{ height: `${expenseH}px` }}
                  >
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 pointer-events-none">
                      {format(d.expense)}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* X-axis labels */}
      <div className="flex justify-around px-2 mt-2">
        {chartData.map((d, i) => (
          <div key={i} className="flex flex-col items-center flex-1">
            <span className="text-xs font-medium text-gray-600">{d.month}</span>
            <span className="text-[10px] text-gray-400">{d.year}</span>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-6 mt-3 pt-3 border-t border-gray-100">
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