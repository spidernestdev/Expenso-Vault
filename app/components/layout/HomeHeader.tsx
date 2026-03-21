"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Wallet } from "lucide-react";

const navItems = [
  { label: "Features", id: "features" },
  { label: "How it works", id: "how-it-works" },
  { label: "Benefits", id: "benefits" },
  { label: "Currencies", id: "currencies" },
  { label: "Screenshots", id: "screenshots" },
  { label: "Reviews", id: "reviews" },
];

export default function HomeHeader() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [animating, setAnimating] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem("token"));
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    if (animating) return;
    setAnimating(true);
    if (menuOpen) {
      // closing — animate out then hide
      menuRef.current?.classList.remove("animate-menu-in");
      menuRef.current?.classList.add("animate-menu-out");
      setTimeout(() => {
        setMenuOpen(false);
        setAnimating(false);
      }, 200);
    } else {
      setMenuOpen(true);
      setTimeout(() => {
        menuRef.current?.classList.remove("animate-menu-out");
        menuRef.current?.classList.add("animate-menu-in");
        setAnimating(false);
      }, 10);
    }
  };

  const scrollTo = (id: string) => {
    toggleMenu();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    }, 250);
  };

  return (
    <>
      <style>{`
        @keyframes menuIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes menuOut {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(-8px) scale(0.97); }
        }
        .animate-menu-in  { animation: menuIn  0.2s ease forwards; }
        .animate-menu-out { animation: menuOut 0.2s ease forwards; }

        @keyframes lineTop {
          0%   { transform: translateY(0) rotate(0); }
          50%  { transform: translateY(6px) rotate(0); }
          100% { transform: translateY(6px) rotate(45deg); }
        }
        @keyframes lineTopRev {
          0%   { transform: translateY(6px) rotate(45deg); }
          50%  { transform: translateY(6px) rotate(0); }
          100% { transform: translateY(0) rotate(0); }
        }
        @keyframes lineMid {
          0%   { opacity: 1; transform: scaleX(1); }
          100% { opacity: 0; transform: scaleX(0); }
        }
        @keyframes lineMidRev {
          0%   { opacity: 0; transform: scaleX(0); }
          100% { opacity: 1; transform: scaleX(1); }
        }
        @keyframes lineBot {
          0%   { transform: translateY(0) rotate(0); }
          50%  { transform: translateY(-6px) rotate(0); }
          100% { transform: translateY(-6px) rotate(-45deg); }
        }
        @keyframes lineBotRev {
          0%   { transform: translateY(-6px) rotate(-45deg); }
          50%  { transform: translateY(-6px) rotate(0); }
          100% { transform: translateY(0) rotate(0); }
        }

        .ham-open  .line-top { animation: lineTop 0.3s ease forwards; }
        .ham-close .line-top { animation: lineTopRev 0.3s ease forwards; }
        .ham-open  .line-mid { animation: lineMid 0.2s ease forwards; }
        .ham-close .line-mid { animation: lineMidRev 0.2s ease forwards; }
        .ham-open  .line-bot { animation: lineBot 0.3s ease forwards; }
        .ham-close .line-bot { animation: lineBotRev 0.3s ease forwards; }
      `}</style>

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100" : "bg-transparent"}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="p-2 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200 group-hover:shadow-xl transition-all group-hover:scale-105">
                <Wallet className="w-5 h-5 text-white" />
              </div>
              <span className="text-base font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                Expenso Vault
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-5 text-sm font-medium text-gray-600">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => { document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" }); }} className="hover:text-indigo-600 transition-colors whitespace-nowrap">
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3 shrink-0">
              {isLoggedIn ? (
                <Link href="/dashboard" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-200">
                  Go to Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors px-3 py-2">Login</Link>
                  <Link href="/register" className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-xl text-sm font-semibold transition-all shadow-md shadow-indigo-200">
                    Get Started
                  </Link>
                </>
              )}
            </div>

            {/* Animated Hamburger */}
            <button
              onClick={toggleMenu}
              className={`lg:hidden p-2 rounded-xl hover:bg-gray-100 transition-colors ${menuOpen ? "ham-open" : "ham-close"}`}
              aria-label="Toggle menu"
            >
              <div className="w-5 h-4 flex flex-col justify-between">
                <span className="line-top block h-0.5 w-full bg-gray-700 rounded-full origin-center" />
                <span className="line-mid block h-0.5 w-full bg-gray-700 rounded-full origin-center" />
                <span className="line-bot block h-0.5 w-full bg-gray-700 rounded-full origin-center" />
              </div>
            </button>
          </div>

          {/* Mobile dropdown */}
          {menuOpen && (
            <div ref={menuRef} className="lg:hidden animate-menu-in bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-gray-100 mt-2 p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="w-full text-left px-4 py-3 text-sm font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <div className="pt-2 border-t border-gray-100 space-y-2">
                {isLoggedIn ? (
                  <Link href="/dashboard" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors">
                    Go to Dashboard
                  </Link>
                ) : (
                  <>
                    <Link href="/login" className="block w-full text-center border border-gray-200 text-gray-700 px-4 py-3 rounded-xl text-sm font-medium hover:border-indigo-300 transition-colors">
                      Login
                    </Link>
                    <Link href="/register" className="block w-full text-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-3 rounded-xl text-sm font-semibold transition-colors">
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
}