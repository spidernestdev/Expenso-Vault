import TransactionItem from "./TransactionItem";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface TransactionListProps {
  transactions: any[];
  loading: boolean;
  onDelete: (id: string) => void;
  onUpdate: () => void; // ← added
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  onPageChange: (page: number) => void;
}

export default function TransactionList({
  transactions,
  loading,
  onDelete,
  onUpdate,
  pagination,
  onPageChange
}: TransactionListProps) {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="animate-pulse flex items-center justify-between p-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-200 rounded-full" />
              <div>
                <div className="h-4 bg-gray-200 rounded w-32 mb-2" />
                <div className="h-3 bg-gray-200 rounded w-20" />
              </div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-16" />
          </div>
        ))}
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-100 text-center">
        <p className="text-gray-500 mb-4">No transactions found</p>
        <p className="text-sm text-gray-400">Add your first transaction to get started</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100">
      <div className="divide-y divide-gray-100">
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction._id}
            transaction={transaction}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
      </div>

      {pagination.pages > 1 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 py-4 border-t border-gray-100 bg-gray-50/50">
          <div className="sm:hidden text-sm text-gray-500">
            Page {pagination.page} of {pagination.pages}
          </div>

          <div className="flex items-center justify-between w-full sm:w-auto gap-3">
            <button
              onClick={() => onPageChange(pagination.page - 1)}
              disabled={pagination.page === 1}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:inline">Previous</span>
            </button>

            <div className="hidden sm:flex items-center gap-1.5">
              {(() => {
                const pages: (number | string)[] = [];
                const added = new Set<number>();
                const currentPage = pagination.page;
                const totalPages = pagination.pages;

                const addPage = (p: number) => {
                  if (!added.has(p)) { added.add(p); pages.push(p); }
                };

                addPage(1);
                if (currentPage > 3) pages.push('...');
                for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                  addPage(i);
                }
                if (currentPage < totalPages - 2) pages.push('...');
                if (totalPages > 1) addPage(totalPages);

                return pages.map((page, idx) =>
                  page === '...' ? (
                    <span key={`ellipsis-${idx}`} className="px-2 text-gray-400">...</span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => onPageChange(Number(page))}
                      className={`min-w-9 h-9 px-3 rounded-lg text-sm font-medium transition-all duration-200 ${
                        pagination.page === page
                          ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                          : 'bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                );
              })()}
            </div>

            <button
              onClick={() => onPageChange(pagination.page + 1)}
              disabled={pagination.page === pagination.pages}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:border-indigo-300 disabled:opacity-40 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
            >
              <span className="text-sm font-medium hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="hidden sm:block text-sm text-gray-500">
            Page {pagination.page} of {pagination.pages}
          </div>
        </div>
      )}
    </div>
  );
}