"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ReviewSection from "./components/reviews/ReviewSection";
import HomeHeader from "./components/layout/HomeHeader";
import HomeMobileNav from "./components/layout/HomeMobileNav";
import {
  ArrowRight, CheckCircle, TrendingUp, LayoutDashboard, PieChart,
  Download, PlusCircle, Eye, Smartphone, Wallet, BarChart3,
  Sparkles, Target, Shield
} from "lucide-react";
import { motion } from "framer-motion";

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };

const features = [
  { icon: TrendingUp, title: "Track income & expenses", desc: "Record every transaction effortlessly", color: "from-green-500 to-green-600" },
  { icon: LayoutDashboard, title: "Dashboard insights", desc: "Visualize your spending habits", color: "from-blue-500 to-blue-600" },
  { icon: PieChart, title: "Categories & charts", desc: "Organize by categories, see breakdown", color: "from-purple-500 to-purple-600" },
  { icon: Download, title: "Export data", desc: "Download CSV reports anytime", color: "from-orange-500 to-orange-600" },
];

const steps = [
  { icon: PlusCircle, title: "Add transactions", desc: "Enter your income and expenses in seconds", number: "01" },
  { icon: Eye, title: "Track spending", desc: "See where your money goes at a glance", number: "02" },
  { icon: BarChart3, title: "Analyze & save", desc: "Get insights and start saving more", number: "03" },
];

const benefits = [
  { icon: Wallet, title: "Save money", desc: "Identify wasteful spending" },
  { icon: LayoutDashboard, title: "Stay organized", desc: "All finances in one place" },
  { icon: Sparkles, title: "No confusion", desc: "Simple, intuitive interface" },
];

const currencies = [
  { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
  { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  { code: "CNY", name: "Chinese Yuan", symbol: "¥", flag: "🇨🇳" },
  { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", symbol: "Fr", flag: "🇨🇭" },
  { code: "HKD", name: "Hong Kong Dollar", symbol: "HK$", flag: "🇭🇰" },
  { code: "SGD", name: "Singapore Dollar", symbol: "S$", flag: "🇸🇬" },
  { code: "SEK", name: "Swedish Krona", symbol: "kr", flag: "🇸🇪" },
  { code: "KRW", name: "South Korean Won", symbol: "₩", flag: "🇰🇷" },
  { code: "NOK", name: "Norwegian Krone", symbol: "kr", flag: "🇳🇴" },
  { code: "NZD", name: "New Zealand Dollar", symbol: "NZ$", flag: "🇳🇿" },
  { code: "MXN", name: "Mexican Peso", symbol: "$", flag: "🇲🇽" },
  { code: "BRL", name: "Brazilian Real", symbol: "R$", flag: "🇧🇷" },
  { code: "ZAR", name: "South African Rand", symbol: "R", flag: "🇿🇦" },
  { code: "RUB", name: "Russian Ruble", symbol: "₽", flag: "🇷🇺" },
  { code: "TRY", name: "Turkish Lira", symbol: "₺", flag: "🇹🇷" },
  { code: "SAR", name: "Saudi Riyal", symbol: "﷼", flag: "🇸🇦" },
  { code: "AED", name: "UAE Dirham", symbol: "د.إ", flag: "🇦🇪" },
  { code: "ARS", name: "Argentine Peso", symbol: "$", flag: "🇦🇷" },
  { code: "CLP", name: "Chilean Peso", symbol: "$", flag: "🇨🇱" },
  { code: "COP", name: "Colombian Peso", symbol: "$", flag: "🇨🇴" },
  { code: "EGP", name: "Egyptian Pound", symbol: "£", flag: "🇪🇬" },
  { code: "IDR", name: "Indonesian Rupiah", symbol: "Rp", flag: "🇮🇩" },
  { code: "ILS", name: "Israeli Shekel", symbol: "₪", flag: "🇮🇱" },
  { code: "MYR", name: "Malaysian Ringgit", symbol: "RM", flag: "🇲🇾" },
  { code: "NGN", name: "Nigerian Naira", symbol: "₦", flag: "🇳🇬" },
  { code: "PKR", name: "Pakistani Rupee", symbol: "₨", flag: "🇵🇰" },
  { code: "PHP", name: "Philippine Peso", symbol: "₱", flag: "🇵🇭" },
  { code: "PLN", name: "Polish Złoty", symbol: "zł", flag: "🇵🇱" },
  { code: "THB", name: "Thai Baht", symbol: "฿", flag: "🇹🇭" },
  { code: "VND", name: "Vietnamese Đồng", symbol: "₫", flag: "🇻🇳" },
];

function WordReveal({ text }: { text: string }) {
  const words = text.split(" ");
  return (
    <span>
      <style>{`
        @keyframes wordReveal {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .word-reveal {
          display: inline-block;
          opacity: 0;
          animation: wordReveal 0.6s cubic-bezier(0.22,1,0.36,1) forwards;
          background: linear-gradient(to right, #4f46e5, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          padding-bottom: 4px;
          line-height: 1.2;
        }
      `}</style>
      {words.map((word, i) => (
        <span
          key={i}
          className="word-reveal"
          style={{ animationDelay: `${i * 0.1}s` }}
        >
          {word}&nbsp;
        </span>
      ))}
    </span>
  );
}

export default function HomeClient() {
  return (
    <div className="bg-white text-gray-900 overflow-hidden">

      {/* Fixed Header */}
      <HomeHeader />

      {/* Offset for fixed header */}
      <div className="pt-16">

        {/* ── HERO ── */}
        <section id="hero" className="relative flex items-center justify-center py-10 px-4 overflow-hidden">
          <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50" />
          <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000" />

          <div className="relative max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              Best free expense tracker
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 pb-4">
              <WordReveal text="Free Expense Tracker & Budget Manager" />
            </h1>

            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Track your expenses, manage your money, and stay in control with Expenso.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/register" className="group bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center justify-center gap-2">
                Get Started
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/login" className="border-2 border-gray-300 hover:border-indigo-600 px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-md">
                Login
              </Link>
            </div>

            <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
              <div className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-green-500" />Free forever</div>
              <div className="flex items-center gap-2"><Shield className="w-4 h-4 text-indigo-500" />Secure & private</div>
              <div className="flex items-center gap-2"><Smartphone className="w-4 h-4 text-purple-500" />Mobile friendly</div>
            </div>
          </div>
        </section>

        {/* ── FEATURES ── */}
        <section id="features" className="py-10 px-4 bg-gray-50 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage money</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">Powerful features that make expense tracking simple and effective</p>
            </motion.div>
            <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => (
                <motion.div key={i} variants={fadeUp} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1">
                  <div className={`w-12 h-12 bg-linear-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-500 text-sm">{feature.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section id="how-it-works" className="py-10 px-4 scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-gray-600">Simple 3-step process to financial clarity</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="relative text-center">
                  <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                    <step.icon className="w-10 h-10 text-indigo-600" />
                    <span className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">{step.number}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-500">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── BENEFITS ── */}
        <section id="benefits" className="py-10 px-4 bg-linear-to-br from-indigo-50 to-purple-50 scroll-mt-20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12">Why choose Expenso?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {benefits.map((benefit, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white rounded-2xl p-6 shadow-sm hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-500">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CURRENCY ── */}
        <section id="currencies" className="py-10 px-4 bg-white scroll-mt-20">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-4">
                <Wallet className="w-4 h-4 text-emerald-600" />
                <span className="text-sm font-medium text-emerald-700">Global Support</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">All Currencies Supported</h2>
              <p className="text-gray-600 mt-2 max-w-2xl mx-auto">Track your finances in any currency. Expenso supports all major world currencies.</p>
            </motion.div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {currencies.map((currency) => (
                <div key={currency.code} className="bg-white border border-gray-200 rounded-xl p-3 text-center hover:shadow-lg hover:border-indigo-200 transition-all hover:-translate-y-1">
                  <div className="text-2xl mb-1">{currency.flag}</div>
                  <div className="font-bold text-gray-900 text-sm">{currency.code}</div>
                  <div className="text-xs text-gray-500 truncate">{currency.name}</div>
                  <div className="text-indigo-600 text-xs font-medium mt-1">{currency.symbol}</div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <p className="text-sm text-gray-500">+ 30+ more currencies supported • Auto-conversion • Real-time rates</p>
            </div>
          </div>
        </section>

        {/* ── SCREENSHOTS ── */}
        <section id="screenshots" className="py-5 px-4 bg-linear-to-b from-white to-gray-50 scroll-mt-20">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-100 to-purple-100 px-5 py-2.5 rounded-full mb-5 shadow-sm">
                <LayoutDashboard className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Live Preview</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-5 bg-linear-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent">See it in action</h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">Simple, beautiful, and powerful interface designed for you</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
              {[
                { src: "/home-images/dashboard.webp", title: "Dashboard", desc: "Overview & analytics", bg: "from-indigo-50 to-purple-50" },
                { src: "/home-images/transactions.webp", title: "Transactions", desc: "Track income & expenses", bg: "from-emerald-50 to-teal-50" },
                { src: "/home-images/categories.webp", title: "Categories", desc: "Organize spending", bg: "from-purple-50 to-pink-50" },
                { src: "/home-images/profile.webp", title: "Profile", desc: "Personal settings", bg: "from-orange-50 to-amber-50" },
              ].map((item, i) => (
                <motion.div key={item.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.5 }} className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-gray-100">
                  <div className={`relative overflow-hidden bg-linear-to-br ${item.bg}`} style={{ aspectRatio: "720/399" }}>
                    <img src={item.src} alt={item.title} width={720} height={399} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" loading="lazy" decoding="async" />
                  </div>
                  <div className="p-5 text-center">
                    <h3 className="font-bold text-gray-900 text-lg mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-500">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 bg-gray-100/80 backdrop-blur-sm px-5 py-2 rounded-full">
                <Smartphone className="w-4 h-4 text-indigo-500" />
                <span className="text-sm text-gray-600">Available on all devices • Web & Mobile</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── REVIEWS ── */}
        <section id="reviews" className="scroll-mt-20">
          <ReviewSection />
        </section>

        {/* ── CTA ── */}
        <section className="py-20 px-4 bg-linear-to-r from-indigo-600 to-indigo-700">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start tracking your expenses now</h2>
            <p className="text-indigo-100 mb-8 text-lg">Join thousands of users who are already saving money</p>
            <Link href="/register" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105">
              Get Started Free
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </section>

        {/* ── SEO CONTENT ── */}
        <section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
                <Sparkles className="w-4 h-4 text-indigo-600" />
                <span className="text-sm font-medium text-indigo-700">Resources</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Everything You Need to Know</h2>
              <p className="text-gray-500 mt-2">Expert insights on managing your finances</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: TrendingUp, color: "from-indigo-500 to-purple-500", title: "Best Free Expense Tracker", content: <>Looking for the <strong className="text-indigo-600">best free expense tracker</strong> to manage your money? Expenso is the ultimate <strong className="text-indigo-600">budget manager</strong> that helps you take control of your finances. Whether you're saving for a big purchase, tracking daily expenses, or planning your monthly budget, our <strong className="text-indigo-600">money tracker</strong> makes it simple and effective.</> },
                { icon: LayoutDashboard, color: "from-emerald-500 to-teal-500", title: "Smart Money Management", content: <>With Expenso, you can easily track income and expenses, create custom categories, view detailed charts, and export your data. Our <strong className="text-emerald-600">expense tracking app</strong> is designed for simplicity and power, giving you the insights you need to make better financial decisions.</> },
                { icon: Target, color: "from-amber-500 to-orange-500", title: "How to Manage Money", content: <><strong className="text-amber-600">How to manage money effectively?</strong> Start by tracking every expense, categorize your spending, set budgets, and review your progress regularly. Expenso automates this process, giving you clear visuals and actionable insights. Start your journey to financial freedom today with the <strong className="text-amber-600"> best budget planning app</strong> available.</> },
              ].map((card, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
                  <div className={`w-12 h-12 bg-linear-to-br ${card.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{card.content}</p>
                </motion.div>
              ))}
            </div>
            <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
              <p className="text-sm text-gray-600 mb-4">Popular topics to help you manage finances</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["expense tracker", "budget manager", "money tracker", "personal finance", "budget planning", "spending tracker", "finance app", "money management", "savings tips", "financial freedom"].map((keyword, i) => (
                  <span key={i} className="text-sm bg-white hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer">#{keyword}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Mobile bottom padding for nav */}
        <div className="md:hidden h-24" />

      </div>

      {/* Mobile Nav */}
      <HomeMobileNav />

    </div>
  );
}