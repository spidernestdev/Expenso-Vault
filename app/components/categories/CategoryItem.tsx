import { Edit, Trash2, Wallet, Calendar, ShoppingBag, Utensils, Car, Film, FileText, Laptop, TrendingUp, Home, Zap, Book, HeartPulse, Plane, Gamepad2, Coffee, Beer } from "lucide-react";
import { useCurrency } from "@/app/hooks/useCurrency";
import { Category } from "@/app/types/category";

interface CategoryItemProps {
  category: Category;
  onEdit: (category: Category) => void;
  onDelete: (id: string) => void;
}

// Icon mapping
const iconMap: { [key: string]: any } = {
  Utensils, Car, ShoppingBag, Film, FileText,
  Wallet, Laptop, TrendingUp, Home, Zap,
  Book, HeartPulse, Plane, Gamepad2, Coffee, Beer
};

export default function CategoryItem({ category, onEdit, onDelete }: CategoryItemProps) {
  const { format } = useCurrency();
  const IconComponent = iconMap[category.icon] || Wallet;

  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 hover:scale-[1.02] hover:border-indigo-100 overflow-hidden">
      {/* Gradient Top Bar */}
      <div 
        className="h-2 w-full" 
        style={{ backgroundColor: category.color }}
      />
      
      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-4">
            {/* Icon with Premium Background */}
            <div 
              className="w-14 h-14 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
              style={{ 
                backgroundColor: `${category.color}15`,
                boxShadow: `0 4px 12px ${category.color}30`
              }}
            >
              <IconComponent className="w-7 h-7" style={{ color: category.color }} />
            </div>
            
            <div>
              <h3 className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
                {category.name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`
                  text-xs font-medium px-2 py-1 rounded-full
                  ${category.type === "income" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                  }
                `}>
                  {category.type === "income" ? "Income" : "Expense"}
                </span>
                {category.isDefault && (
                  <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    Default
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onEdit(category)}
              className="p-2 hover:bg-indigo-50 rounded-xl text-gray-500 hover:text-indigo-600 transition-all hover:scale-110"
              title="Edit"
            >
              <Edit className="w-4 h-4" />
            </button>
            {!category.isDefault && (
              <button
                onClick={() => onDelete(category._id)}
                className="p-2 hover:bg-red-50 rounded-xl text-gray-500 hover:text-red-600 transition-all hover:scale-110"
                title="Delete"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Budget Section - Premium Card */}
        {category.budget?.amount && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="bg-linear-to-r from-gray-50 to-transparent rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm font-medium text-gray-700">Budget</span>
                </div>
                <span className="text-lg font-bold text-indigo-600">
                  {format(category.budget.amount)}
                </span>
              </div>
              
              {category.budget.period && (
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Calendar className="w-3 h-3" />
                  <span className="capitalize">{category.budget.period}</span>
                  {category.budget.alert && (
                    <span className="ml-auto text-xs bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded-full">
                      Alert on
                    </span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Transaction Count Badge (if available) */}
        {category.transactionCount !== undefined && (
          <div className="mt-3 text-xs text-gray-400 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
            {category.transactionCount} transactions
          </div>
        )}
      </div>
    </div>
  );
}