import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import InstallPWA from "@/app/components/InstallPWA"; // 😏 added
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenso - Free Expense Tracker & Budget Manager",
  description: "Track your expenses, manage budget, and control your money easily with Expenso.",
  keywords: ["expense tracker", "budget manager", "money tracker", "finance app"],
  manifest: "/manifest.json",
  verification: {
    google: "gwMrDsLQxw-r10QVREieh_UJ9wHbKqfQjmiz5Yn9UNo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}

        <InstallPWA /> {/* 😏 bottom-right install button */}

        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}