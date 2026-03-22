"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, LogOut, Wallet, ChevronDown, Star, FileText } from "lucide-react";
import { useCurrency } from "@/app/context/CurrencyContext";
import NotificationDropdown from "@/app/components/layout/NotificationDropdown";

// Inline full-screen loader overlay
function NavigationLoader() {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-9999 flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
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
        <div className="relative w-16 h-16"><div className="ev-loader" /></div>
        <p className="text-xs text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [navigating, setNavigating] = useState(false);
  const { user } = useCurrency();
  const router = useRouter();

  const navigate = async (action: () => Promise<void>) => {
    setShowProfileMenu(false);
    setNavigating(true);
    await action();
    setNavigating(false);
  };

  const handleReviewClick = () => navigate(async () => {
    await router.push("/");
    let attempts = 0;
    await new Promise<void>((resolve) => {
      const tryScroll = () => {
        const el = document.getElementById("reviews");
        if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); resolve(); }
        else if (attempts < 20) { attempts++; setTimeout(tryScroll, 100); }
        else resolve();
      };
      setTimeout(tryScroll, 300);
    });
  });

  const handleChangelogClick = () => navigate(async () => {
    await router.push("/changelog");
  });

  return (
    <>
      {navigating && <NavigationLoader />}

      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-2">
          <div className="flex items-center justify-between">
            {/* Brand */}
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="p-2 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-xl transition-all group-hover:scale-105">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent leading-tight">
                  Expenso Vault
                </span>
                <div className="lg:hidden flex items-center gap-1">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                  </span>
                  <span className="text-[9px] font-semibold text-green-600">v1.0.0</span>
                </div>
              </div>
            </Link>

            {/* Right Actions */}
            <div className="flex items-center gap-1">
              <NotificationDropdown />

              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-100 transition-all group"
                >
                  <div className="relative">
                    <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                      <span className="text-sm font-medium text-white">
                        {user?.name?.charAt(0) || 'U'}
                      </span>
                    </div>
                    <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white" />
                  </div>

                  <div className="hidden lg:block text-left">
                    <p className="text-xs font-medium text-gray-900">{user?.name || "User"}</p>
                    <p className="text-[10px] text-gray-500">{user?.currency || "USD"}</p>
                  </div>

                  <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
                </button>

                {showProfileMenu && (
                  <>
                    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden" onClick={() => setShowProfileMenu(false)} />
                    <div className="absolute right-0 mt-2 w-72 lg:w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50">
                      <div className="px-4 py-4 bg-linear-to-r from-indigo-600 to-purple-600 mb-2">
                        <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                        <p className="text-xs text-indigo-100">{user?.email || "user@example.com"}</p>
                        <div className="mt-2 flex gap-2">
                          <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full">{user?.currency || "USD"}</span>
                          <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full">{user?.language?.toUpperCase() || "EN"}</span>
                        </div>
                      </div>

                      <Link href="/profile" className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-all" onClick={() => setShowProfileMenu(false)}>
                        <div className="p-1.5 bg-indigo-50 rounded-lg"><User className="w-4 h-4 text-indigo-600" /></div>
                        <span className="flex-1">Profile</span>
                      </Link>

                      <button onClick={handleReviewClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-yellow-50 transition-all">
                        <div className="p-1.5 bg-yellow-50 rounded-lg"><Star className="w-4 h-4 text-yellow-500" /></div>
                        <span className="flex-1 text-left">Write a Review</span>
                      </button>

                      <button onClick={handleChangelogClick} className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all">
                        <div className="p-1.5 bg-gray-50 rounded-lg"><FileText className="w-4 h-4 text-gray-600" /></div>
                        <span className="flex-1 text-left">Changelog</span>
                      </button>

                      <div className="my-2 border-t border-gray-100" />

                      <button
                        onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all"
                      >
                        <div className="p-1.5 bg-red-50 rounded-lg"><LogOut className="w-4 h-4 text-red-600" /></div>
                        <span className="flex-1 text-left">Logout</span>
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}