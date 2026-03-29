import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import InstallPWA from "@/app/components/InstallPWA";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expenso - Free Expense Tracker & Budget Manager",
  description: "Track your expenses, manage budget, and control your money easily with Expenso.",
  keywords: ["expense tracker", "budget manager", "money tracker", "finance app"],
  manifest: "/manifest.json",
  applicationName: "Expenso",
  verification: {
    google: "gwMrDsLQxw-r10QVREieh_UJ9wHbKqfQjmiz5Yn9UNo",
  },
  openGraph: {
    title: "Expenso - Free Expense Tracker & Budget Manager",
    description: "Track your expenses, manage budget, and control your money easily with Expenso.",
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