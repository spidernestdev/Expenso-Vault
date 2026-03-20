"use client";

import Link from "next/link";
import Image from "next/image";
import { 
  ArrowRight, 
  CheckCircle, 
  TrendingUp, 
  LayoutDashboard, 
  PieChart, 
  Download, 
  PlusCircle, 
  Eye, 
  Smartphone, 
  Wallet, 
  BarChart3,
  Sparkles,
  Target,
  Shield
} from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function HomeClient() {
  const featuresRef = useRef(null);
  const stepsRef = useRef(null);
  const isFeaturesInView = useInView(featuresRef, { once: true, amount: 0.3 });
  const isStepsInView = useInView(stepsRef, { once: true, amount: 0.3 });

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

  const screenshots = [
    { src: "/home-images/dashboard.png", title: "Dashboard", alt: "Dashboard preview" },
    { src: "/home-images/transactions.png", title: "Transactions", alt: "Transactions preview" },
    { src: "/home-images/charts.png", title: "Charts", alt: "Charts preview" },
  ];

  return (
    <div className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="relative flex items-center justify-center py-10 px-4 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-linear-to-br from-indigo-50 via-white to-purple-50"></div>
        <div className="absolute top-20 left-10 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        
        <div className="relative max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-6"
          >
            <Sparkles className="w-4 h-4" />
            Best free expense tracker
          </motion.div>
          
          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
          >
            Free Expense Tracker & Budget Manager
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-xl text-gray-600 max-w-2xl mx-auto mb-8"
          >
            Track your expenses, manage your money, and stay in control with Expenso.
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row justify-center gap-4"
          >
            <Link
              href="/register"
              className="group bg-linear-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 rounded-xl font-semibold shadow-lg shadow-indigo-200 hover:shadow-xl transition-all flex items-center justify-center gap-2"
            >
              Get Started
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/login"
              className="border-2 border-gray-300 hover:border-indigo-600 px-8 py-4 rounded-xl font-semibold transition-all hover:shadow-md"
            >
              Login
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-500" />
              Free forever
            </div>
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-indigo-500" />
              Secure & private
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-purple-500" />
              Mobile friendly
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} className="py-10 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isFeaturesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need to manage money</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">Powerful features that make expense tracking simple and effective</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={isFeaturesInView ? "show" : "hidden"}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all group hover:-translate-y-1"
              >
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

      {/* How it Works Section */}
      <section ref={stepsRef} className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isStepsInView ? { opacity: 1, y: 0 } : {}}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-600">Simple 3-step process to financial clarity</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={isStepsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.2 }}
                className="relative text-center"
              >
                <div className="w-20 h-20 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4 relative">
                  <step.icon className="w-10 h-10 text-indigo-600" />
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-500">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-10 px-4 bg-linear-to-br from-indigo-50 to-purple-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Why choose Expenso?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm"
              >
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

            {/* Currency Support Section */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-linear-to-r from-emerald-100 to-teal-100 px-4 py-2 rounded-full mb-4">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span className="text-sm font-medium text-emerald-700">Global Support</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              All Currencies Supported
            </h2>
            <p className="text-gray-600 mt-2 max-w-2xl mx-auto">
              Track your finances in any currency. Expenso supports all major world currencies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {[
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
            ].map((currency, i) => (
              <motion.div
                key={currency.code}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.02 }}
                className="group bg-white border border-gray-200 rounded-xl p-3 text-center hover:shadow-lg hover:border-indigo-200 transition-all hover:-translate-y-1"
              >
                <div className="text-2xl mb-1">{currency.flag}</div>
                <div className="font-bold text-gray-900 text-sm">{currency.code}</div>
                <div className="text-xs text-gray-500 truncate">{currency.name}</div>
                <div className="text-indigo-600 text-xs font-medium mt-1">{currency.symbol}</div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              + 30+ more currencies supported • Auto-conversion • Real-time rates
            </p>
          </div>
        </div>
      </section>

      {/* Screenshots Section */}
      <section className="py-10 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">See it in action</h2>
          <p className="text-gray-600 text-center mb-12">Simple, beautiful, and powerful interface</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {screenshots.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="aspect-video bg-linear-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      e.currentTarget.src = "https://placehold.co/600x400/e2e8f0/64748b?text=" + img.title;
                    }}
                  />
                </div>
                <div className="p-4 text-center">
                  <p className="font-medium">{img.title}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-linear-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Start tracking your expenses now</h2>
          <p className="text-indigo-100 mb-8 text-lg">Join thousands of users who are already saving money</p>
          <Link
            href="/register"
            className="inline-flex items-center gap-2 bg-white text-indigo-600 px-8 py-4 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
          >
            Get Started Free
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>

{/* SEO Content Section */}
<section className="py-20 px-4 bg-linear-to-b from-gray-50 to-white">
  <div className="max-w-6xl mx-auto">
    <div className="text-center mb-12">
      <div className="inline-flex items-center gap-2 bg-linear-to-r from-indigo-100 to-purple-100 px-4 py-2 rounded-full mb-4">
        <Sparkles className="w-4 h-4 text-indigo-600" />
        <span className="text-sm font-medium text-indigo-700">Resources</span>
      </div>
      <h2 className="text-3xl md:text-4xl font-bold bg-linear-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
        Everything You Need to Know
      </h2>
      <p className="text-gray-500 mt-2">Expert insights on managing your finances</p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      {/* Card 1 */}
      <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
        <div className="w-12 h-12 bg-linear-to-br from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Best Free Expense Tracker</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          Looking for the <strong className="text-indigo-600">best free expense tracker</strong> to manage your money? 
          Expenso is the ultimate <strong className="text-indigo-600">budget manager</strong> that helps you take 
          control of your finances. Whether you're saving for a big purchase, tracking daily expenses, 
          or planning your monthly budget, our <strong className="text-indigo-600">money tracker</strong> makes it simple and effective.
        </p>
      </div>

      {/* Card 2 */}
      <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
        <div className="w-12 h-12 bg-linear-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <LayoutDashboard className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">Smart Money Management</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          With Expenso, you can easily track income and expenses, create custom categories, 
          view detailed charts, and export your data. Our <strong className="text-emerald-600">expense tracking app</strong> 
          is designed for simplicity and power, giving you the insights you need to make better financial decisions.
        </p>
      </div>

      {/* Card 3 */}
      <div className="group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all hover:-translate-y-1 border border-gray-100">
        <div className="w-12 h-12 bg-linear-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
          <Target className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-xl font-semibold mb-3">How to Manage Money</h3>
        <p className="text-gray-600 text-sm leading-relaxed">
          <strong className="text-amber-600">How to manage money effectively?</strong> Start by tracking every expense, 
          categorize your spending, set budgets, and review your progress regularly. Expenso automates this process, 
          giving you clear visuals and actionable insights. Start your journey to financial freedom today with the 
          <strong className="text-amber-600"> best budget planning app</strong> available.
        </p>
      </div>
    </div>

    {/* Keywords Section */}
    <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 text-center">
      <p className="text-sm text-gray-600 mb-4">Popular topics to help you manage finances</p>
      <div className="flex flex-wrap justify-center gap-2">
        {["expense tracker", "budget manager", "money tracker", "personal finance", "budget planning", "spending tracker", "finance app", "money management", "savings tips", "financial freedom"].map((keyword, i) => (
          <span key={i} className="text-sm bg-white hover:bg-indigo-100 text-gray-700 hover:text-indigo-700 px-4 py-2 rounded-full transition-all shadow-sm hover:shadow-md cursor-pointer">
            #{keyword}
          </span>
        ))}
      </div>
    </div>
  </div>
</section>
    </div>
  );
}