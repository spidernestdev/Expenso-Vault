import Link from "next/link";
import { ArrowRight, Receipt, PlusCircle } from "lucide-react";
import TransactionItem from "../transactions/TransactionItem";

interface RecentTransactionsProps {
  transactions: any[];
  onDelete: (id: string) => void;
}

export default function RecentTransactions({ transactions, onDelete }: RecentTransactionsProps) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 border border-gray-100">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <Receipt className="w-4 h-4 sm:w-5 sm:h-5 text-indigo-600" />
          </div>
          <h2 className="text-sm sm:text-base font-semibold text-gray-900">Recent Transactions</h2>
        </div>
        
        <Link
          href="/transactions"
          className="flex items-center gap-1 text-indigo-600 text-xs sm:text-sm font-medium hover:gap-2 transition-all"
        >
          View All
          <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
        </Link>
      </div>

      {/* Content */}
      {transactions.length === 0 ? (
        <div className="text-center py-8 sm:py-10">
          <div className="w-16 h-16 mx-auto mb-3 bg-indigo-50 rounded-full flex items-center justify-center">
            <Receipt className="w-6 h-6 sm:w-8 sm:h-8 text-indigo-400" />
          </div>
          <p className="text-sm text-gray-500 mb-3">No transactions yet</p>
          <Link
            href="/transactions?add=true"
            className="inline-flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors"
          >
            <PlusCircle className="w-4 h-4" />
            Add Transaction
          </Link>
        </div>
      ) : (
        <div className="space-y-1">
          {transactions.map((transaction) => (
            <TransactionItem 
              key={transaction._id} 
              transaction={transaction}
              onDelete={onDelete}
              onUpdate={() => {}}
              categories={[]}
            />
          ))}
        </div>
      )}
    </div>
  );
}