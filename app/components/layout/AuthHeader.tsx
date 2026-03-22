"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Wallet } from "lucide-react";

export default function AuthHeader() {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-xl transition-all group-hover:scale-105">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Expenso Vault
            </span>
          </Link>

          {/* Single CTA */}
          {isLogin ? (
            <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-200">
              Register
            </Link>
          ) : (
            <Link href="/login" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-200">
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}