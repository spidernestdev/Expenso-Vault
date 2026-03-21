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
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-gray-500">Loading...</div>
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