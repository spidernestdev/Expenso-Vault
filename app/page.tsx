import HomeClient from "./HomeClient";

export const metadata = {
  title: "Expenso - Free Expense Tracker & Budget Manager",
  description: "Track your expenses, manage your budget, and control your money easily with Expenso. Free forever, mobile friendly, supports all currencies.",
  keywords: "expense tracker, budget manager, money tracker, personal finance, free expense tracker",
  metadataBase: new URL("https://expenso-vault.vercel.app"),
  openGraph: {
    title: "Expenso - Free Expense Tracker & Budget Manager",
    description: "Track your expenses, manage your budget, and control your money easily with Expenso.",
    url: "https://expenso-vault.vercel.app",
    siteName: "Expenso",
    type: "website",
    images: [{ url: "/home-images/dashboard.webp", width: 720, height: 399 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Expenso - Free Expense Tracker",
    description: "Track your expenses and manage your budget for free.",
    images: ["/home-images/dashboard.webp"],
  },
  alternates: {
    canonical: "https://expenso-vault.vercel.app",
  },
};

export default function HomePage() {
  return <HomeClient />;
}