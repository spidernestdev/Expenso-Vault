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
  const [currencyLoading, setCurrencyLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login");
      return;
    }

    // Single profile call — auth check + currency in one shot
    authAPI.getProfile()
      .then((res) => {
        const userCurrency = res?.data?.data?.currency;
        if (userCurrency) setCurrency(userCurrency);
      })
      .catch(() => {
        localStorage.removeItem("token");
        router.push("/login");
      })
      .finally(() => {
        setAuthLoading(false);
        setCurrencyLoading(false);
      });
  }, [router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <CurrencyProvider initialCurrency={currency} loading={currencyLoading}>
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