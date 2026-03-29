import type { Metadata } from "next";
import Link from "next/link";
import { FileText, ArrowLeft } from "lucide-react";
import Footer from "@/app/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms & Conditions - Expenso",
  description: "Read Expenso's terms and conditions to understand the rules, responsibilities, and agreements for using our free expense tracker and budget manager app.",
};

export default function TermsPage() {
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
            <FileText className="w-8 h-8 text-indigo-600" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Terms & Conditions</h1>
          <p className="text-gray-500 text-sm">Last updated: March 2025</p>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Please read these terms carefully before using Expenso. By using our app, you agree to these terms and conditions.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12 space-y-10">

        {/* 1 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            By accessing or using Expenso at{" "}
            <a href="https://expenso-vault.vercel.app" className="text-indigo-600 hover:underline">
              https://expenso-vault.vercel.app
            </a>
            , you agree to be bound by these Terms & Conditions. If you do not agree with any part of these terms, you may not use our service.
          </p>
        </section>

        {/* 2 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">2. Description of Service</h2>
          <p className="text-gray-600 leading-relaxed">
            Expenso is a free personal finance web application that allows users to track income and expenses, manage budgets, categorize transactions, view financial charts, and export data. The service is provided free of charge and is intended for personal, non-commercial use.
          </p>
        </section>

        {/* 3 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">3. User Accounts</h2>
          <p className="text-gray-600 leading-relaxed mb-3">When you create an account on Expenso, you agree to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Provide accurate and complete information during registration</li>
            <li>Keep your password secure and confidential</li>
            <li>Be responsible for all activity that occurs under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>Not share your account credentials with any third party</li>
          </ul>
          <p className="text-gray-600 leading-relaxed mt-3">
            We reserve the right to terminate accounts that violate these terms or are found to be engaging in abusive or fraudulent activity.
          </p>
        </section>

        {/* 4 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">4. Acceptable Use</h2>
          <p className="text-gray-600 leading-relaxed mb-3">You agree not to use Expenso to:</p>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Violate any applicable laws or regulations</li>
            <li>Upload or transmit malicious code, viruses, or harmful content</li>
            <li>Attempt to gain unauthorized access to our systems or other users' accounts</li>
            <li>Use the service for any commercial purpose without prior written consent</li>
            <li>Scrape, crawl, or extract data from the platform in an automated manner</li>
            <li>Impersonate any person or entity</li>
          </ul>
        </section>

        {/* 5 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">5. Your Data</h2>
          <p className="text-gray-600 leading-relaxed">
            You retain full ownership of all financial data you enter into Expenso. We do not claim any rights over your personal or financial information. You can export or delete your data at any time. Please refer to our{" "}
            <Link href="/privacy-policy" className="text-indigo-600 hover:underline">
              Privacy Policy
            </Link>{" "}
            for full details on how we handle your data.
          </p>
        </section>

        {/* 6 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">6. Financial Disclaimer</h2>
          <p className="text-gray-600 leading-relaxed">
            Expenso is a personal finance tracking tool and is <strong>not</strong> a financial advisory service. The information and insights provided by the app are for informational and organizational purposes only. We do not provide financial, investment, tax, or legal advice. Always consult a qualified financial professional before making financial decisions.
          </p>
        </section>

        {/* 7 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">7. Availability & Uptime</h2>
          <p className="text-gray-600 leading-relaxed">
            We strive to keep Expenso available 24/7, but we do not guarantee uninterrupted access to the service. We may occasionally perform maintenance, updates, or experience downtime beyond our control. We are not liable for any losses resulting from service interruptions or outages.
          </p>
        </section>

        {/* 8 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">8. Intellectual Property</h2>
          <p className="text-gray-600 leading-relaxed">
            All content, design, code, logos, and branding on Expenso are the intellectual property of Expenso and are protected by applicable copyright and trademark laws. You may not copy, reproduce, modify, or distribute any part of the service without our prior written permission.
          </p>
        </section>

        {/* 9 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">9. Limitation of Liability</h2>
          <p className="text-gray-600 leading-relaxed">
            To the maximum extent permitted by law, Expenso shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of data, loss of profits, or any other losses arising out of or in connection with your use of the service. Our total liability shall not exceed the amount you paid us in the past 12 months (which for free users is zero).
          </p>
        </section>

        {/* 10 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">10. Termination</h2>
          <p className="text-gray-600 leading-relaxed">
            You may delete your account and stop using Expenso at any time. We reserve the right to suspend or terminate your access to the service at our discretion, without notice, if we believe you have violated these terms or engaged in harmful activity.
          </p>
        </section>

        {/* 11 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">11. Changes to Terms</h2>
          <p className="text-gray-600 leading-relaxed">
            We may update these Terms & Conditions from time to time. We will notify users of significant changes by updating the date at the top of this page. Continued use of the service after any changes constitutes your acceptance of the new terms.
          </p>
        </section>

        {/* 12 */}
        <section>
          <h2 className="text-xl font-bold text-gray-900 mb-3">12. Governing Law</h2>
          <p className="text-gray-600 leading-relaxed">
            These Terms & Conditions shall be governed by and construed in accordance with the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts of India.
          </p>
        </section>


        {/* Bottom nav */}
        <div className="border-t border-gray-200 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors text-sm font-medium">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link href="/privacy-policy" className="text-sm text-gray-500 hover:text-indigo-600 transition-colors">
            ← View Privacy Policy
          </Link>
        </div>

      </div>

      {/* Footer */}
      <Footer />

    </div>
  );
}