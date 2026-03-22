"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Receipt, PlusCircle, ChevronLeft, ChevronRight } from "lucide-react";
import TransactionItem from "../transactions/TransactionItem";

interface RecentTransactionsProps {
  transactions: any[];
  onDelete: (id: string) => void;
}

const PAGE_SIZE = 5;

export default function RecentTransactions({ transactions, onDelete }: RecentTransactionsProps) {
  const [page, setPage] = useState(1);
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Lazy load — only render when section is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const totalPages = Math.ceil(transactions.length / PAGE_SIZE);
  const paginated = transactions.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div ref={ref} className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        <Link href="/transactions" className="flex items-center gap-1 text-indigo-600 text-xs sm:text-sm font-medium hover:gap-2 transition-all">
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* Content */}
      {!visible ? (
        // Skeleton while not in view
        <div className="space-y-3">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="animate-pulse flex items-center justify-between p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full" />
                <div>
                  <div className="h-3 bg-gray-200 rounded w-28 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-16" />
                </div>
              </div>
              <div className="h-3 bg-gray-200 rounded w-14" />
            </div>
          ))}
        </div>
      ) : transactions.length === 0 ? (
        <div className="text-center py-8 sm:py-10">
          <div className="w-16 h-16 mx-auto mb-3 bg-indigo-50 rounded-full flex items-center justify-center">
            <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
          </div>
          <p className="text-sm text-gray-500 mb-3">No transactions yet</p>
          <Link href="/transactions?add=true" className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors">
            <PlusCircle className="w-4 h-4" />
            Add Transaction
          </Link>
        </div>
      ) : (
        <>
          <div className="space-y-1">
            {paginated.map((transaction) => (
              <TransactionItem
                key={transaction._id}
                transaction={transaction}
                onDelete={onDelete}
                onUpdate={() => {}}
                categories={[]}
              />
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => setPage(p => Math.max(1, p - 1))}
                disabled={page === 1}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              <span className="text-xs text-gray-500">
                {page} / {totalPages}
              </span>

              <button
                onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}