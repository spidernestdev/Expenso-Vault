import type { Metadata } from "next";
import Link from "next/link";
import { Shield, ArrowLeft } from "lucide-react";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy - Expenso",
  description: "Read Expenso's privacy policy to understand how we collect, use, and protect your personal data and financial information.",
};

export default function PrivacyPolicyPage() {
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
            <Shield className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
          <p className="text-gray-500 text-sm">Last updated: March 2025</p>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            At Expenso, we take your privacy seriously. This policy explains what data we collect, how we use it, and how we protect it.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Who We Are</h2>
          <p className="text-gray-600 leading-relaxed">
            Expenso is a free personal finance and expense tracking web application available at{" "}
            <a href="https://expenso-vault.vercel.app" className="text-indigo-600 hover:underline">
              https://expenso-vault.vercel.app
            </a>. We are committed to protecting your personal information and your right to privacy.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
          <p className="text-gray-600 leading-relaxed mb-3">We collect the following types of information when you use Expenso:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Account Information:</strong> Your name and email address when you register.</li>
            <li><strong>Financial Data:</strong> Transactions, categories, and budget data you enter into the app.</li>
            <li><strong>Usage Data:</strong> Pages visited, features used, and time spent on the app (via Vercel Analytics).</li>
            <li><strong>Device Information:</strong> Browser type, operating system, and IP address for security purposes.</li>
          </ul>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
          <p className="text-gray-600 leading-relaxed mb-3">We use your information to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Provide and maintain the Expenso service</li>
            <li>Authenticate your account and keep it secure</li>
            <li>Improve and optimize the app experience</li>
            <li>Analyze usage patterns to fix bugs and add new features</li>
            <li>Respond to your support requests</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            We do <strong>not</strong> sell, rent, or share your personal data with any third parties for marketing purposes.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Cookies & Tracking</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Expenso uses the following types of cookies and tracking technologies:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Essential Cookies:</strong> Required for login sessions and authentication to keep you signed in.</li>
            <li><strong>Analytics Cookies:</strong> We use Vercel Analytics to understand how users interact with our app. This data is anonymous and aggregated.</li>
            <li><strong>Performance Cookies:</strong> Vercel Speed Insights to monitor and improve app performance.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            We do <strong>not</strong> use advertising or marketing cookies.
          </p>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Storage & Security</h2>
          <p className="text-gray-600 leading-relaxed">
            Your data is stored securely on our servers. We use industry-standard security measures including encrypted connections (HTTPS), secure authentication, and regular security audits to protect your information. However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Third-Party Services</h2>
          <p className="text-gray-600 leading-relaxed mb-3">Expenso uses the following third-party services:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li><strong>Vercel:</strong> Hosting and deployment platform. <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:underline">Vercel Privacy Policy</a></li>
            <li><strong>Vercel Analytics:</strong> Anonymous usage analytics.</li>
            <li><strong>Vercel Speed Insights:</strong> Performance monitoring.</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            Each of these services has their own privacy policies and we encourage you to review them.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
          <p className="text-gray-600 leading-relaxed mb-3">You have the right to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your account and all associated data</li>
            <li>Export your financial data at any time (CSV export)</li>
            <li>Withdraw consent for data processing at any time</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            To exercise any of these rights, please contact us at the email below.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Children's Privacy</h2>
          <p className="text-gray-600 leading-relaxed">
            Expenso is not intended for use by children under the age of 13. We do not knowingly collect personal information from children under 13. If you believe we have inadvertently collected such information, please contact us immediately.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update this Privacy Policy from time to time. We will notify you of any significant changes by updating the date at the top of this page. We encourage you to review this policy periodically to stay informed about how we protect your information.
          </p>
        </section>

        {/* Bottom nav */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/terms" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            View Terms & Conditions →
          </Link>
        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}