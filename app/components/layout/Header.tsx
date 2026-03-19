"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bell, User, LogOut, Settings, Wallet, ChevronDown } from "lucide-react";
import { authAPI } from "@/app/lib/api";

export default function Header() {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await authAPI.getProfile();
        setUser(response.data.data);
      } catch (error) {
        console.error("Failed to fetch user", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30">
      <div className="px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Brand */}
          <Link href="/dashboard" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-xl transition-all group-hover:scale-105">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Expenso Vault
            </span>
          </Link>

          {/* Right Actions */}
          <div className="flex items-center gap-1">
            {/* Notifications */}
            <button className="p-2.5 rounded-xl hover:bg-gray-100 transition-all relative group">
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-[8px] text-white font-bold">3</span>
              </div>
              <Bell className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" />
              <div className="absolute -bottom-10 right-0 bg-gray-900 text-white text-[10px] px-2 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
                Notifications
              </div>
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 pl-2 pr-1 py-1 rounded-xl hover:bg-gray-100 transition-all group"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-9 h-9 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center ring-2 ring-white shadow-lg">
                    <span className="text-sm font-medium text-white">
                      {user?.name?.charAt(0) || 'U'}
                    </span>
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full ring-2 ring-white"></div>
                </div>
                
                {/* User Info - Desktop only */}
                <div className="hidden lg:block text-left">
                  <p className="text-xs font-medium text-gray-900">
                    {loading ? "Loading..." : user?.name || "User"}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {user?.currency || "USD"}
                  </p>
                </div>
                
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${showProfileMenu ? 'rotate-180' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {showProfileMenu && (
                <>
                  <div 
                    className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                    onClick={() => setShowProfileMenu(false)}
                  />
                  
                  <div className="absolute right-0 mt-2 w-72 lg:w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 animate-in fade-in slide-in-from-top-2">
                    {/* User Info Header */}
                    <div className="px-4 py-4 bg-linear-to-r from-indigo-600 to-purple-600 mb-2">
                      <p className="text-sm font-medium text-white">{user?.name || "User"}</p>
                      <p className="text-xs text-indigo-100">{user?.email || "user@example.com"}</p>
                      <div className="mt-2 flex gap-2">
                        <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                          {user?.currency || "USD"}
                        </span>
                        <span className="text-[8px] bg-white/20 text-white px-2 py-0.5 rounded-full">
                          {user?.language || "EN"}
                        </span>
                      </div>
                    </div>

                    {/* Menu Items */}
                    <Link
                      href="/profile"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-indigo-50 transition-all"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <div className="p-1.5 bg-indigo-50 rounded-lg">
                        <User className="w-4 h-4 text-indigo-600" />
                      </div>
                      <span className="flex-1">Profile</span>
                    </Link>
                    
                    <Link
                      href="/settings"
                      className="flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 transition-all"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <div className="p-1.5 bg-gray-50 rounded-lg">
                        <Settings className="w-4 h-4 text-gray-600" />
                      </div>
                      <span className="flex-1">Settings</span>
                    </Link>

                    <div className="my-2 border-t border-gray-100"></div>

                    {/* Logout */}
                    <button
                      onClick={() => {
                        localStorage.removeItem("token");
                        window.location.href = "/login";
                      }}
                      className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-all"
                    >
                      <div className="p-1.5 bg-red-50 rounded-lg">
                        <LogOut className="w-4 h-4 text-red-600" />
                      </div>
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
  );
}