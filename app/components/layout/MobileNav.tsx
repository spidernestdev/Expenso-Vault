"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, List, Tags, User, Star, Home } from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();
  const router = useRouter();

  const handleHomeClick = () => {
    router.push("/");
  };

  const handleReviewClick = async () => {
    if (pathname === "/") {
      const el = document.getElementById("reviews");
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); return; }
    }
    await router.push("/");
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById("reviews");
      if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); }
      else if (attempts < 20) { attempts++; setTimeout(tryScroll, 100); }
    };
    setTimeout(tryScroll, 300);
  };

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: List },
    { href: "/categories", label: "Categories", icon: Tags },
    { href: "/profile", label: "Profile", icon: User },
  ];

  const isHome = pathname === "/";

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-300" />

      <div className="flex justify-around items-center h-16 px-1">

        {/* Home */}
        <button
          onClick={handleHomeClick}
          className="relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 group"
        >
          {isHome && <div className="absolute inset-x-2 -top-4 h-12 bg-linear-to-b from-indigo-50 to-transparent rounded-t-2xl" />}
          <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
            isHome
              ? "bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 scale-110 -translate-y-1"
              : "text-gray-500 group-hover:text-indigo-600 group-hover:-translate-y-0.5"
          }`}>
            <Home className={`w-5 h-5 ${isHome ? "text-white" : ""}`} />
          </div>
          <span className={`text-[10px] font-medium mt-1 transition-all duration-200 ${
            isHome ? "text-indigo-700 font-semibold" : "text-gray-500 group-hover:text-indigo-600"
          }`}>Home</span>
          {isHome && <div className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full" />}
        </button>

        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className="relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 group"
            >
              {isActive && <div className="absolute inset-x-2 -top-4 h-12 bg-linear-to-b from-indigo-50 to-transparent rounded-t-2xl" />}
              <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 scale-110 -translate-y-1"
                  : "text-gray-500 group-hover:text-indigo-600 group-hover:-translate-y-0.5"
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
              </div>
              <span className={`text-[10px] font-medium mt-1 transition-all duration-200 ${
                isActive ? "text-indigo-700 font-semibold" : "text-gray-500 group-hover:text-indigo-600"
              }`}>{item.label}</span>
              {isActive && <div className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full" />}
            </Link>
          );
        })}

        {/* Review */}
        <button
          onClick={handleReviewClick}
          className="relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 group"
        >
          <div className="relative p-1.5 rounded-xl transition-all duration-200 text-gray-500 group-hover:text-indigo-600 group-hover:-translate-y-0.5">
            <Star className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-medium mt-1 text-gray-500 group-hover:text-indigo-600 transition-colors">Review</span>
        </button>

      </div>

      <div className="h-5 bg-transparent" />
    </nav>
  );
}