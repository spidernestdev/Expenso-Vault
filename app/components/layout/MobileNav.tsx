"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  List,
  Tags,
  User,
  Wallet
} from "lucide-react";

export default function MobileNav() {
  const pathname = usePathname();

  const menuItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: List },
    { href: "/categories", label: "Categories", icon: Tags },
    { href: "/profile", label: "Profile", icon: User },
  ];

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
      {/* Premium curved indicator */}
      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-300"></div>
      
      <div className="flex justify-around items-center h-16 px-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`
                relative flex flex-col items-center justify-center flex-1 h-full
                transition-all duration-200 group
              `}
            >
              {/* Active background indicator */}
              {isActive && (
                <div className="absolute inset-x-2 -top-4 h-12 bg-linear-to-b from-indigo-50 to-transparent rounded-t-2xl"></div>
              )}
              
              {/* Icon with gradient when active */}
              <div className={`
                relative p-1.5 rounded-xl transition-all duration-200
                ${isActive 
                  ? 'bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 scale-110 -translate-y-1' 
                  : 'text-gray-500 group-hover:text-indigo-600 group-hover:-translate-y-0.5'
                }
              `}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
              </div>
              
              {/* Label */}
              <span className={`
                text-[10px] font-medium mt-1 transition-all duration-200
                ${isActive 
                  ? 'text-indigo-700 font-semibold' 
                  : 'text-gray-500 group-hover:text-indigo-600'
                }
              `}>
                {item.label}
              </span>

              {/* Active dot indicator */}
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full"></div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Safe area for iPhone */}
      <div className="h-5 bg-transparent"></div>
    </nav>
  );
}