import { ArrowUpRight, ArrowDownRight, Trash2, Edit } from "lucide-react";
import { useState } from "react";
import { transactionAPI } from "@/app/lib/api";
import { useCurrency } from "@/app/hooks/useCurrency";
import TransactionForm from "./TransactionForm";

interface TransactionItemProps {
  transaction: {
    _id: string;
    description: string;
    amount: number;
    type: "income" | "expense";
    category: { _id: string; name: string; icon: string; color: string };
    date: string;
  };
  onDelete: (id: string) => void;
  onUpdate: () => void; // ← refetch callback instead of reload
}

export default function TransactionItem({ transaction, onDelete, onUpdate }: TransactionItemProps) {
  const [showEdit, setShowEdit] = useState(false);
  const { format } = useCurrency();
  const isIncome = transaction.type === "income";

  const date = new Date(transaction.date);
  const formattedDate = `${date.getDate().toString().padStart(2, "0")}/${(date.getMonth() + 1).toString().padStart(2, "0")}/${date.getFullYear()}`;

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this transaction?")) {
      onDelete(transaction._id);
    }
  };

  const handleEdit = async (data: any) => {
    try {
      await transactionAPI.update(transaction._id, data);
      setShowEdit(false);
      onUpdate(); // ← refetch, no full reload
    } catch (error) {
      console.error("Failed to update transaction", error);
    }
  };

  return (
    <>
      <div className="flex items-center justify-between py-3 px-2 hover:bg-gray-50 rounded-xl group">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${transaction.category.color}20` }}
          >
            {isIncome ? (
              <ArrowUpRight className="w-5 h-5" style={{ color: transaction.category.color }} />
            ) : (
              <ArrowDownRight className="w-5 h-5" style={{ color: transaction.category.color }} />
            )}
          </div>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-medium text-gray-900 truncate">
              {transaction.description || "No description"}
            </span>
            <span className="text-xs text-gray-500 truncate">{transaction.category.name}</span>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <p className={`text-sm font-semibold ${isIncome ? "text-green-600" : "text-red-600"}`}>
              {isIncome ? "+" : "-"}{format(Math.abs(transaction.amount))}
            </p>
            <p className="text-xs text-gray-500">{formattedDate}</p>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => setShowEdit(true)}
              className="p-1.5 hover:bg-gray-200 rounded-lg text-gray-600 transition-colors"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-1.5 hover:bg-red-50 rounded-lg text-gray-600 hover:text-red-600 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {showEdit && (
        <TransactionForm
          transaction={transaction}
          onSubmit={handleEdit}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}