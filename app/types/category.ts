export interface Category {
  _id: string;
  name: string;
  type: "income" | "expense";
  icon: string;
  color: string;
  isDefault?: boolean;
  user?: string;
  budget?: {
    amount: number;
    period?: string;
    alert?: boolean;
  };
  transactionCount?: number;
  createdAt?: string;
  updatedAt?: string;
}