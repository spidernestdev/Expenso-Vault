"use client";

import { useState, useEffect } from "react";
import { User, Mail, Wallet, Save, ChevronDown, Sparkles, X } from "lucide-react";
import { authAPI } from "@/app/lib/api";

interface ProfileData {
  name: string;
  email: string;
  currency: string;
  language: string;
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await authAPI.getProfile();
      setProfile(response.data.data);
    } catch (error) {
      console.error("Failed to fetch profile", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!profile) return;
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
    // Blur the select to close dropdown after selection
    e.target.blur();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;
    
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      await authAPI.updateProfile({
        name: profile.name,
        email: profile.email,
        currency: profile.currency,
        language: profile.language || "en"
      });
      setMessage({ type: "success", text: "Profile updated successfully" });
    } catch (error: any) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to update profile" 
      });
    } finally {
      setSaving(false);
    }
  };

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

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="text-gray-500 animate-pulse">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-red-500" />
          </div>
          <p className="text-red-600 font-medium">Failed to load profile</p>
          <button 
            onClick={fetchProfile}
            className="mt-4 text-indigo-600 hover:text-indigo-700 text-sm"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
      {/* Premium Header */}
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-2xl shadow-lg shadow-indigo-200">
          <User className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
            Profile Settings
          </h1>
          <p className="text-sm text-gray-500 mt-1">Manage your account information</p>
        </div>
        <div className="ml-auto hidden sm:block">
          <Sparkles className="w-5 h-5 text-indigo-400" />
        </div>
      </div>

      {/* Message Alert */}
      {message.text && (
        <div className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
          message.type === "success" 
            ? "bg-green-50 text-green-800 border border-green-200" 
            : "bg-red-50 text-red-800 border border-red-200"
        }`}>
          <div className={`w-2 h-2 rounded-full ${message.type === "success" ? "bg-green-500" : "bg-red-500"}`}></div>
          <p className="text-sm font-medium flex-1">{message.text}</p>
          <button onClick={() => setMessage({ type: "", text: "" })} className="text-gray-400 hover:text-gray-600">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
        {/* Decorative header bar */}
        <div className="h-2 bg-linear-to-r from-indigo-600 via-purple-600 to-indigo-600"></div>
        
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6 sm:space-y-8">
          {/* Name Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Full Name
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <User className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <input
                type="text"
                name="name"
                value={profile.name}
                onChange={handleChange}
                required
                className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white outline-none text-gray-900 text-base transition-all"
                placeholder="John Doe"
              />
            </div>
          </div>

          {/* Email Field - Disabled */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="email"
                name="email"
                value={profile.email}
                disabled
                className="w-full pl-10 pr-4 py-3 bg-gray-100 border border-gray-200 rounded-xl text-gray-500 cursor-not-allowed text-base"
              />
            </div>
            <p className="text-xs text-gray-400 ml-2">Email cannot be changed</p>
          </div>

          {/* Currency Field - Fixed dropdown */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700">
              Currency
            </label>
            <div className="relative group">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10">
                <Wallet className="w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
              </div>
              <select
                name="currency"
                value={profile.currency}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900 text-base appearance-none cursor-pointer"
              >
                {currencies.map(curr => (
                  <option key={curr.value} value={curr.value} className="py-2">
                    {curr.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>
            <p className="text-xs text-gray-400 mt-1">Select your preferred currency</p>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={saving}
              className="w-full bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-200 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-base"
            >
              {saving ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Saving...
                </>
              ) : (
                <>
                  <Save className="w-5 h-5" />
                  Save Changes
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Account Info Footer */}
      <div className="mt-6 text-center">
        <p className="text-xs text-gray-400">
          Member since {new Date().toLocaleDateString()} • Secure connection
        </p>
      </div>
    </div>
  );
}