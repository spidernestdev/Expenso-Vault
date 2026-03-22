"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Sparkles, Star, LayoutDashboard, LogIn } from "lucide-react";

export default function HomeMobileNav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));

    const sections = ["hero", "features", "how-it-works", "benefits", "currencies", "screenshots", "reviews"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 80;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  const navItems = [
    { id: "hero", label: "Home", icon: Home, action: () => scrollTo("hero") },
    { id: "features", label: "Features", icon: Sparkles, action: () => scrollTo("features") },
    { id: "reviews", label: "Reviews", icon: Star, action: () => scrollTo("reviews") },
    isLoggedIn
      ? { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, action: () => { window.location.href = "/dashboard"; } }
      : { id: "login", label: "Login", icon: LogIn, action: () => { window.location.href = "/login"; } },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-200 shadow-2xl z-50">
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-indigo-600 rounded-full shadow-lg shadow-indigo-300" />

      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={item.action}
              className="relative flex flex-col items-center justify-center flex-1 h-full transition-all duration-200 group"
            >
              {isActive && (
                <div className="absolute inset-x-2 -top-4 h-12 bg-linear-to-b from-indigo-50 to-transparent rounded-t-2xl" />
              )}
              <div className={`relative p-1.5 rounded-xl transition-all duration-200 ${
                isActive
                  ? "bg-linear-to-br from-indigo-600 to-indigo-700 text-white shadow-lg shadow-indigo-200 scale-110 -translate-y-1"
                  : "text-gray-500 group-hover:text-indigo-600 group-hover:-translate-y-0.5"
              }`}>
                <Icon className={`w-5 h-5 ${isActive ? "text-white" : ""}`} />
              </div>
              <span className={`text-[10px] font-medium mt-1 transition-all duration-200 ${
                isActive ? "text-indigo-700 font-semibold" : "text-gray-500 group-hover:text-indigo-600"
              }`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute -bottom-1 w-1 h-1 bg-indigo-600 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="h-5 bg-transparent" />
    </nav>
  );
}