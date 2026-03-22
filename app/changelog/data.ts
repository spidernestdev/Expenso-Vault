export type ChangeType = "new" | "improved" | "fixed" | "security" | "performance" | "removed";

export interface Change {
  type: ChangeType;
  text: string;
}

export interface Version {
  version: string;
  date: string;
  badge: "major" | "minor" | "patch";
  summary: string;
  changes: Change[];
}

export const changelog: Version[] = [
  {
    version: "1.0.0",
    date: "March 22, 2026",
    badge: "major",
    summary: "Initial public release of Expenso Vault — your free, secure, and smart expense tracker.",
    changes: [
      // New Features
      { type: "new", text: "Dashboard with real-time income, expense, and balance overview" },
      { type: "new", text: "Transaction management — add, edit, and delete transactions" },
      { type: "new", text: "Category system with custom icons, colors, and budget limits" },
      { type: "new", text: "Budget alert notifications at 80% and 100% threshold" },
      { type: "new", text: "User reviews and replies system with like/dislike" },
      { type: "new", text: "Multi-currency support with 35+ world currencies" },
      { type: "new", text: "Monthly and yearly budget tracking per category" },
      { type: "new", text: "Recent transactions on dashboard with pagination" },
      { type: "new", text: "Category pie chart and monthly trend chart on dashboard" },
      { type: "new", text: "Transaction filters — by type, category, date range, and search" },
      { type: "new", text: "Profile settings — name, currency, language preferences" },
      { type: "new", text: "Responsive design — works on mobile, tablet, and desktop" },
      { type: "new", text: "PWA support — installable on mobile devices" },
      { type: "new", text: "Home page with features, how it works, benefits, and currency sections" },

      // Performance
      { type: "performance", text: "Redis caching for dashboard stats, transactions, and notifications" },
      { type: "performance", text: "Single MongoDB aggregation pipeline for all dashboard data" },
      { type: "performance", text: "Lazy loaded charts — only render when visible on screen" },
      { type: "performance", text: "Debounced search — no API call on every keystroke" },
      { type: "performance", text: "Categories fetched once per page — no duplicate API calls" },
      { type: "performance", text: "Optimized images with WebP format and lazy loading" },

      // Security
      { type: "security", text: "AES-256-GCM encryption for all user personal data" },
      { type: "security", text: "HMAC-SHA256 email hashing for secure lookups" },
      { type: "security", text: "JWT authentication with secure token handling" },
      { type: "security", text: "Rate limiting on all auth, review, and API endpoints" },
      { type: "security", text: "NoSQL injection prevention with mongo-sanitize" },
      { type: "security", text: "CORS restricted to frontend domain only" },

      // Coming Soon
      { type: "removed", text: "Export to CSV — coming in v2.0.0" },
    ]
  }
  // Add new versions above this line
  // {
  //   version: "1.1.0",
  //   date: "April 2026",
  //   badge: "minor",
  //   summary: "...",
  //   changes: []
  // }
];