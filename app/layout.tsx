import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import InstallPWA from "@/app/components/InstallPWA";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenso - Free Expense Tracker & Budget Manager",
  description: "Track your expenses, manage budget, and control your money easily with Expenso. Free personal finance app for students, freelancers, and families in India.",
  keywords: [
    // Core
    "expense tracker",
    "free expense tracker",
    "budget manager",
    "money manager",
    "personal finance app",
    "expense manager",
    "budget planner",
    "spending tracker",
    "income expense tracker",
    "monthly budget tracker",
    "daily expense tracker",
    "online expense tracker",
    "expense tracker app",
    "free budget manager",
    "personal budget app",
    // Feature-based
    "track expenses online",
    "manage monthly budget",
    "expense categorization",
    "income and expense manager",
    "savings tracker",
    "financial goal tracker",
    "cash flow tracker",
    "bill tracker",
    "monthly expense planner",
    "weekly budget planner",
    "expense report",
    "budget vs actual tracker",
    // User-type
    "expense tracker for students",
    "budget app for students",
    "expense tracker for freelancers",
    "personal finance for beginners",
    "expense tracker for couples",
    "family expense tracker",
    "expense tracker for salaried person",
    "money manager for college students",
    "finance app for young adults",
    "budget planner for beginners",
    // India-specific
    "expense tracker india",
    "free expense tracker india",
    "budget manager india",
    "personal finance app india",
    "money manager india",
    "expense tracker for indian users",
    "rupee expense tracker",
    "INR budget tracker",
    "best expense tracker india",
    "finance app india free",
    // Free & No login
    "free finance app",
    "expense tracker no subscription",
    "free budget planner online",
    "expense tracker without premium",
    "free money manager app",
    "no login expense tracker",
    "free expense tracker web app",
    // Comparison / alternatives
    "expenso",
    "expenso app",
    "alternative to mint",
    "free alternative to YNAB",
    "simple expense tracker",
    "easy budget manager",
    "lightweight finance app",
    "minimalist expense tracker",
    // Long-tail
    "how to track expenses online",
    "best free budget app 2025",
    "best expense tracker app 2025",
    "track monthly spending online",
    "manage personal finances online",
    "free app to track daily expenses",
    "simple app to manage money",
    "best free personal finance app india",
    "expense tracker for android web",
    "pwa expense tracker",
    "installable expense tracker",
    "offline expense tracker",
    "expense tracker web app free",
    "budget app no credit card required",
    "free budget app no signup",
  ],
  manifest: "/manifest.json",
  applicationName: "Expenso",
  verification: {
    google: "gwMrDsLQxw-r10QVREieh_UJ9wHbKqfQjmiz5Yn9UNo",
  },
  openGraph: {
    title: "Expenso - Free Expense Tracker & Budget Manager",
    description: "Track your expenses, manage budget, and control your money easily with Expenso. Free personal finance app for students, freelancers, and families in India.",
    siteName: "Expenso",
    url: "https://expenso-vault.vercel.app",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Expenso",
              url: "https://expenso-vault.vercel.app",
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <InstallPWA />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}