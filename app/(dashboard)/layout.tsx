"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authAPI } from "@/app/lib/api";
import { CurrencyProvider } from "@/app/context/CurrencyContext";
import Header from "@/app/components/layout/Header";
import Sidebar from "@/app/components/layout/Sidebar";
import MobileNav from "@/app/components/layout/MobileNav";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authLoading, setAuthLoading] = useState(true);
  const [currency, setCurrency] = useState("INR");
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { router.push("/login"); return; }

    authAPI.getProfile()
      .then((res) => {
        const data = res?.data?.data;
        if (data?.currency) setCurrency(data.currency);
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => setAuthLoading(false));
  }, [router]);

if (authLoading) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="flex flex-col items-center gap-4">
        {/* Branded spinner */}
        <div className="relative">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" strokeWidth="2" strokeLinecap="round" d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10"/>
            </svg>
          </div>
          <div className="absolute inset-0 rounded-2xl border-4 border-indigo-200 border-t-indigo-600 animate-spin" />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-700">Expenso Vault</p>
          <p className="text-xs text-gray-400 mt-0.5">Loading your workspace...</p>
        </div>
      </div>
    </div>
  );
}

  return (
    <CurrencyProvider initialCurrency={currency} initialUser={user} loading={false}>
      <div className="min-h-screen bg-gray-50">
        <Sidebar />
        <div className="lg:ml-64 min-h-screen flex flex-col">
          <Header />
          <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
            {children}
          </main>
        </div>
        <MobileNav />
      </div>
    </CurrencyProvider>
  );
}