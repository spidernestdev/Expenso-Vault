import Link from "next/link";
import { Wallet, ArrowLeft, Rocket, Sparkles, Bug, Shield, Zap, Trash2 } from "lucide-react";
import { changelog, ChangeType, Version } from "./data";

export const metadata = {
  title: "Changelog - Expenso Vault",
  description: "See what's new, improved, and fixed in Expenso Vault.",
};

const typeConfig: Record<ChangeType, { label: string; color: string; bg: string; icon: any }> = {
  new:         { label: "New",         color: "text-green-700",  bg: "bg-green-100",  icon: Rocket },
  improved:    { label: "Improved",    color: "text-blue-700",   bg: "bg-blue-100",   icon: Sparkles },
  fixed:       { label: "Fixed",       color: "text-red-700",    bg: "bg-red-100",    icon: Bug },
  security:    { label: "Security",    color: "text-purple-700", bg: "bg-purple-100", icon: Shield },
  performance: { label: "Performance", color: "text-orange-700", bg: "bg-orange-100", icon: Zap },
  removed:     { label: "Removed",     color: "text-gray-600",   bg: "bg-gray-100",   icon: Trash2 },
};

const badgeConfig = {
  major: { label: "Major", color: "bg-indigo-600 text-white" },
  minor: { label: "Minor", color: "bg-blue-500 text-white" },
  patch: { label: "Patch", color: "bg-gray-500 text-white" },
};

function groupChanges(changes: Version["changes"]) {
  const order: ChangeType[] = ["new", "improved", "performance", "security", "fixed", "removed"];
  const grouped: Partial<Record<ChangeType, string[]>> = {};
  changes.forEach(({ type, text }) => {
    if (!grouped[type]) grouped[type] = [];
    grouped[type]!.push(text);
  });
  return order.filter(t => grouped[t]).map(t => ({ type: t, items: grouped[t]! }));
}

export default function ChangelogPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="p-2 bg-linear-to-br from-indigo-600 to-indigo-700 rounded-xl shadow-lg shadow-indigo-200 group-hover:scale-105 transition-all">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <span className="text-base font-bold bg-linear-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
              Expenso Vault
            </span>
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pt-16 pb-8 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <Sparkles className="w-4 h-4" />
          What's new
        </div>
        <h1 className="text-4xl md:text-5xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 pb-2">
          Changelog
        </h1>
        <p className="text-gray-500 text-lg max-w-xl mx-auto">
          Every update, improvement, and fix — all in one place.
        </p>
      </div>

      {/* Timeline */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-24">
        <div className="relative">
          {/* Vertical line — visible on all screens */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-linear-to-b from-indigo-300 to-transparent" />

          <div className="space-y-12">
            {changelog.map((version) => {
              const badge = badgeConfig[version.badge];
              const grouped = groupChanges(version.changes);

              return (
                <div key={version.version} className="relative pl-16">
                  {/* Timeline dot — visible on all screens */}
                  <div className="absolute left-3.5 top-1 w-5 h-5 bg-indigo-600 rounded-full ring-4 ring-indigo-100 flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full" />
                  </div>

                  {/* Version card */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
                    {/* Card header */}
                    <div className="px-6 py-5 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="text-2xl font-bold text-gray-900">v{version.version}</span>
                        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}>
                          {badge.label}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400">{version.date}</span>
                    </div>

                    {/* Summary */}
                    <div className="px-6 py-4 bg-indigo-50/50 border-b border-gray-100">
                      <p className="text-sm text-gray-600 leading-relaxed">{version.summary}</p>
                    </div>

                    {/* Changes grouped by type */}
                    <div className="px-6 py-5 space-y-5">
                      {grouped.map(({ type, items }) => {
                        const config = typeConfig[type];
                        const Icon = config.icon;
                        return (
                          <div key={type}>
                            <div className="flex items-center gap-2 mb-3">
                              <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full ${config.bg} ${config.color}`}>
                                <Icon className="w-3 h-3" />
                                {config.label}
                              </span>
                            </div>
                            <ul className="space-y-2">
                              {items.map((text, i) => (
                                <li key={i} className="flex items-start gap-2.5 text-sm text-gray-700">
                                  <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${config.bg.replace("100", "400")}`} />
                                  {text}
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-500 mb-4">Have a feature request or found a bug?</p>
          <Link href="/#reviews" className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition-all shadow-md hover:shadow-lg">
            Write a Review
          </Link>
        </div>
      </div>
    </div>
  );
}