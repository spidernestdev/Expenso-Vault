import type { Metadata } from "next";
import Link from "next/link";
import { Cookie, ArrowLeft } from "lucide-react";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Cookie Policy - Expenso",
  description: "Learn about how Expenso uses cookies and tracking technologies to improve your experience on our free expense tracker and budget manager app.",
};

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-white border-b border-gray-100 px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Cookie className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Cookie Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: March 2025</p>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            This Cookie Policy explains what cookies are, how Expenso uses them, and what choices you have regarding their use.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. What Are Cookies?</h2>
          <p className="text-gray-600 leading-relaxed">
            Cookies are small text files that are stored on your device (computer, tablet, or mobile) when you visit a website. They help websites remember information about your visit, such as your login status and preferences, making your next visit easier and the site more useful to you.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. How Expenso Uses Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Expenso uses a minimal number of cookies to provide a secure, functional, and improved experience. We do <strong>not</strong> use cookies for advertising or to track you across other websites.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. Types of Cookies We Use</h2>

          {/* Essential */}
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              <h3 className="text-lg font-semibold text-gray-900">Essential Cookies</h3>
              <span className="ml-auto text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">Always Active</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              These cookies are required for the core functionality of Expenso. They keep you logged in during your session and maintain your authentication state. Without these cookies, the app cannot function properly.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-500 list-disc list-inside">
              <li>Session authentication token</li>
              <li>Login state management</li>
              <li>Security tokens</li>
            </ul>
          </div>

          {/* Analytics */}
          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-6 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
              <h3 className="text-lg font-semibold text-gray-900">Analytics Cookies</h3>
              <span className="ml-auto text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">Anonymous</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              We use Vercel Analytics to understand how users interact with Expenso. This data is completely anonymous and aggregated — we cannot identify individual users from this data. It helps us improve the app experience.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-500 list-disc list-inside">
              <li>Pages visited</li>
              <li>Time spent on pages</li>
              <li>General location (country level only)</li>
              <li>Device and browser type</li>
            </ul>
          </div>

          {/* Performance */}
          <div className="bg-purple-50 border border-purple-100 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
              <h3 className="text-lg font-semibold text-gray-900">Performance Cookies</h3>
              <span className="ml-auto text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full font-medium">Anonymous</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed">
              We use Vercel Speed Insights to monitor and improve the performance of Expenso. This helps us identify slow pages and optimize load times for a better user experience.
            </p>
            <ul className="mt-3 space-y-1 text-sm text-gray-500 list-disc list-inside">
              <li>Page load times</li>
              <li>Performance metrics</li>
              <li>Core Web Vitals scores</li>
            </ul>
          </div>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies We Do NOT Use</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Expenso does <strong>not</strong> use:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Advertising or marketing cookies</li>
            <li>Social media tracking cookies</li>
            <li>Third-party retargeting cookies</li>
            <li>Cross-site tracking cookies</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Third-Party Cookies</h2>
          <p className="text-gray-600 leading-relaxed">
            Some cookies are set by third-party services we use. These are:
          </p>
          <div className="mt-4 space-y-3">
            <div className="flex items-start gap-3 bg-gray-100 rounded-xl p-4">
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Vercel Analytics</p>
                <p className="text-gray-500 mt-1">Anonymous usage tracking. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Vercel Privacy Policy</a>.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 bg-gray-100 rounded-xl p-4">
              <div className="text-sm">
                <p className="font-semibold text-gray-900">Vercel Speed Insights</p>
                <p className="text-gray-500 mt-1">Anonymous performance monitoring. See <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Vercel Privacy Policy</a>.</p>
              </div>
            </div>
          </div>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. How to Control Cookies</h2>
          <p className="text-gray-600 leading-relaxed mb-3">
            You can control and manage cookies in several ways:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Browser settings:</strong> Most browsers allow you to block or delete cookies through their settings menu.</li>
            <li><strong>Incognito/Private mode:</strong> Browsing in private mode limits cookie storage.</li>
            <li><strong>Opt-out tools:</strong> You can opt out of Vercel Analytics tracking via your browser's Do Not Track setting.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            Please note that disabling essential cookies may affect the functionality of Expenso, including your ability to stay logged in.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Cookie Policy from time to time. We will notify you of any significant changes by updating the date at the top of this page. We encourage you to review this policy periodically.
          </p>
        </section>

        {/* Bottom nav */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <Link href="/privacy-policy" className="hover:text-indigo-600 transition-colors">Privacy Policy</Link>
            <span>·</span>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">Terms & Conditions</Link>
          </div>
        </div>

      </div>

      <Footer />

    </div>
  );
}