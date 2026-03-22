"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Wallet, LogIn } from "lucide-react";
import { authAPI } from "@/app/lib/api";

const currencies = [
  { value: "USD", label: "USD - US Dollar ($)" },
  { value: "EUR", label: "EUR - Euro (€)" },
  { value: "GBP", label: "GBP - British Pound (£)" },
  { value: "JPY", label: "JPY - Japanese Yen (¥)" },
  { value: "INR", label: "INR - Indian Rupee (₹)" },
  { value: "CNY", label: "CNY - Chinese Yuan (¥)" },
  { value: "CAD", label: "CAD - Canadian Dollar (C$)" },
  { value: "AUD", label: "AUD - Australian Dollar (A$)" },
  { value: "CHF", label: "CHF - Swiss Franc (Fr)" },
  { value: "HKD", label: "HKD - Hong Kong Dollar (HK$)" },
  { value: "SGD", label: "SGD - Singapore Dollar (S$)" },
  { value: "SEK", label: "SEK - Swedish Krona (kr)" },
  { value: "KRW", label: "KRW - South Korean Won (₩)" },
  { value: "NOK", label: "NOK - Norwegian Krone (kr)" },
  { value: "NZD", label: "NZD - New Zealand Dollar (NZ$)" },
  { value: "MXN", label: "MXN - Mexican Peso ($)" },
  { value: "BRL", label: "BRL - Brazilian Real (R$)" },
  { value: "ZAR", label: "ZAR - South African Rand (R)" },
  { value: "RUB", label: "RUB - Russian Ruble (₽)" },
  { value: "TRY", label: "TRY - Turkish Lira (₺)" },
  { value: "SAR", label: "SAR - Saudi Riyal (﷼)" },
  { value: "AED", label: "AED - UAE Dirham (د.إ)" },
  { value: "ARS", label: "ARS - Argentine Peso ($)" },
  { value: "CLP", label: "CLP - Chilean Peso ($)" },
  { value: "COP", label: "COP - Colombian Peso ($)" },
  { value: "EGP", label: "EGP - Egyptian Pound (£)" },
  { value: "IDR", label: "IDR - Indonesian Rupiah (Rp)" },
  { value: "ILS", label: "ILS - Israeli Shekel (₪)" },
  { value: "MYR", label: "MYR - Malaysian Ringgit (RM)" },
  { value: "NGN", label: "NGN - Nigerian Naira (₦)" },
  { value: "PKR", label: "PKR - Pakistani Rupee (₨)" },
  { value: "PHP", label: "PHP - Philippine Peso (₱)" },
  { value: "PLN", label: "PLN - Polish Złoty (zł)" },
  { value: "THB", label: "THB - Thai Baht (฿)" },
  { value: "VND", label: "VND - Vietnamese Đồng (₫)" }
];

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState({ name: "", email: "", password: "", currency: "USD" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const response = await authAPI.register(formData);
      localStorage.setItem("token", response.data.data.token);
      router.push("/dashboard");
    } catch (error: any) {
      setError(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>

      {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" name="name" value={formData.name} onChange={handleChange} required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
              placeholder="Your Name" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="email" name="email" value={formData.email} onChange={handleChange} required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
              placeholder="yourmail@gmail.com" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
              placeholder="••••••" />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
          <div className="relative">
            <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
            <select name="currency" value={formData.currency} onChange={handleChange} required
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white text-gray-900">
              {currencies.map(curr => <option key={curr.value} value={curr.value}>{curr.label}</option>)}
            </select>
          </div>
        </div>

<button
  type="submit"
  disabled={loading}
  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg hover:shadow-indigo-200"
>
  {loading ? (
    <div className="flex items-center gap-1.5">
      Creating account
      <span className="flex gap-1">
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
      </span>
    </div>
  ) : (
    <>
      <LogIn className="w-5 h-5" />
      Register
    </>
  )}
</button>
      </form>

      <p className="mt-4 text-center text-sm text-gray-600">
        Already have an account?{" "}
        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Login</Link>
      </p>
    </>
  );
}