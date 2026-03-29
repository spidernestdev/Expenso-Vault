import Link from "next/link";
import { Wallet, Mail, Github, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Top Row */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                <Wallet className="w-4 h-4 text-white" />
              </div>
              <span className="text-white font-bold text-lg">Expenso</span>
            </div>
            <p className="text-sm leading-relaxed">
              Free expense tracker and budget manager for everyone. Track your income, manage expenses, and take control of your personal finances — all in one place.
            </p>
            <p className="text-xs mt-4 text-gray-600">Made with ❤️ in India 🇮🇳</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-indigo-400 transition-colors">Home</Link></li>
              <li><Link href="/login" className="hover:text-indigo-400 transition-colors">Login</Link></li>
              <li><Link href="/register" className="hover:text-indigo-400 transition-colors">Register — It&apos;s Free</Link></li>
              <li><Link href="/changelog" className="hover:text-indigo-400 transition-colors">Changelog</Link></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-sm">
              <li className="hover:text-indigo-400 transition-colors cursor-default">Expense Tracking</li>
              <li className="hover:text-indigo-400 transition-colors cursor-default">Budget Manager</li>
              <li className="hover:text-indigo-400 transition-colors cursor-default">Category-wise Charts</li>
              <li className="hover:text-indigo-400 transition-colors cursor-default">CSV Export</li>
              <li className="hover:text-indigo-400 transition-colors cursor-default">Multi-currency Support</li>
              <li className="hover:text-indigo-400 transition-colors cursor-default">Mobile Friendly (PWA)</li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-white font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
              <li><Link href="/cookie-policy" className="hover:text-indigo-400 transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <a
href="mailto:contactspidernestdev@gmail.com"
  className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
>
  <Mail className="w-4 h-4 shrink-0" />
  Contact via Email
</a>
              </li>
              <li>
                <a
                  href="https://github.com/spidernestdev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  GitHub
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">

          {/* Copyright */}
          <p className="text-xs text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-white font-medium">Expenso</span> — Free Expense Tracker & Budget Manager. All rights reserved.
          </p>

          {/* SEO keywords as subtle text */}
          <p className="text-xs text-gray-600 text-center">
            Free expense tracker · Budget manager · Money tracker · Personal finance app
          </p>

        </div>

      </div>
    </footer>
  );
}