import { LucideIcon } from "lucide-react";
import { useCurrency } from "@/app/hooks/useCurrency";

interface BalanceCardProps {
  title: string;
  amount: number;
  icon: LucideIcon;
  color: "indigo" | "green" | "red";
}

const colorClasses = {
  indigo: { bg: "bg-indigo-50", text: "text-indigo-600", icon: "text-indigo-600" },
  green: { bg: "bg-green-50", text: "text-green-600", icon: "text-green-600" },
  red: { bg: "bg-red-50", text: "text-red-600", icon: "text-red-600" }
};

export default function BalanceCard({ title, amount, icon: Icon, color }: BalanceCardProps) {
  const { format } = useCurrency();
  const classes = colorClasses[color];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 ${classes.bg} rounded-lg`}>
          <Icon className={`w-6 h-6 ${classes.icon}`} />
        </div>
      </div>
      <p className="text-sm text-gray-600 mb-1">{title}</p>
      <p className={`text-2xl font-bold ${classes.text}`}>
        {format(amount)}
      </p>
    </div>
  );
}