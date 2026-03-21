"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  List,
  Tags,
  Settings,
  LogOut,
  Wallet,
  ChevronRight,
  Star
} from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: List },
    { href: "/categories", label: "Categories", icon: Tags },
    { href: "/profile", label: "Profile", icon: Settings },
  ];

  const handleReviewClick = () => {
    router.push("/");
    setTimeout(() => {
      document.getElementById("reviews")?.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  return (
    <aside className="hidden lg:block fixed left-0 top-0 w-64 h-screen bg-linear-to-b from-white to-gray-50/50 border-r border-gray-200 shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="p-2 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-xl transition-shadow">
            <Wallet className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-lg font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Expenso
            </span>
            <span className="text-xs font-medium text-gray-500 -mt-1">Vault</span>
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-3 py-6">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-indigo-50 to-indigo-100/50 text-indigo-700 shadow-sm"
                    : "text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-5 h-5 ${isActive ? "text-indigo-600" : "text-gray-500"}`} />
                  <span className={`text-sm font-medium ${isActive ? "text-indigo-700" : ""}`}>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 text-indigo-600" />}
              </Link>
            );
          })}

          {/* Review */}
          <button
            onClick={handleReviewClick}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-gray-600 hover:bg-gray-100/80 hover:text-gray-900"
          >
            <Star className="w-5 h-5 text-gray-500" />
            <span className="text-sm font-medium">Write a Review</span>
          </button>
        </div>
      </nav>

      {/* Logout */}
      <div className="absolute bottom-6 left-0 w-full px-3">
        <button
          onClick={() => { localStorage.removeItem("token"); window.location.href = "/login"; }}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group"
        >
          <div className="p-1.5 rounded-lg bg-gray-100 group-hover:bg-red-100 transition-colors">
            <LogOut className="w-4 h-4" />
          </div>
          <span className="text-sm font-medium">Logout</span>
        </button>
        <div className="mt-4 px-4">
          <p className="text-[10px] text-gray-400">v1.0.0 • Expenso</p>
        </div>
      </div>
    </aside>
  );
}