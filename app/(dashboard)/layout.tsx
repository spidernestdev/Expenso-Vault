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
      <div className="flex flex-col items-center gap-6">
        {/* Branded animated loader */}
        <div className="relative w-16 h-16">
          <style>{`
            @keyframes before8 {
              0%   { width: 0.5em; box-shadow: 1em -0.5em rgba(99,102,241,0.8), -1em 0.5em rgba(139,92,246,0.8); }
              35%  { width: 2.5em; box-shadow: 0 -0.5em rgba(99,102,241,0.8), 0 0.5em rgba(139,92,246,0.8); }
              70%  { width: 0.5em; box-shadow: -1em -0.5em rgba(99,102,241,0.8), 1em 0.5em rgba(139,92,246,0.8); }
              100% { box-shadow: 1em -0.5em rgba(99,102,241,0.8), -1em 0.5em rgba(139,92,246,0.8); }
            }
            @keyframes after6 {
              0%   { height: 0.5em; box-shadow: 0.5em 1em rgba(79,70,229,0.8), -0.5em -1em rgba(167,139,250,0.8); }
              35%  { height: 2.5em; box-shadow: 0.5em 0 rgba(79,70,229,0.8), -0.5em 0 rgba(167,139,250,0.8); }
              70%  { height: 0.5em; box-shadow: 0.5em -1em rgba(79,70,229,0.8), -0.5em 1em rgba(167,139,250,0.8); }
              100% { box-shadow: 0.5em 1em rgba(79,70,229,0.8), -0.5em -1em rgba(167,139,250,0.8); }
            }
            .ev-loader { position: relative; width: 2.5em; height: 2.5em; transform: rotate(165deg); }
            .ev-loader:before, .ev-loader:after { content: ""; position: absolute; top: 50%; left: 50%; display: block; width: 0.5em; height: 0.5em; border-radius: 0.25em; transform: translate(-50%, -50%); }
            .ev-loader:before { animation: before8 2s infinite; }
            .ev-loader:after  { animation: after6  2s infinite; }
          `}</style>
          <div className="ev-loader" />
        </div>

        <div className="text-center">
          <p className="text-sm font-bold text-gray-800">Expenso Vault</p>
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