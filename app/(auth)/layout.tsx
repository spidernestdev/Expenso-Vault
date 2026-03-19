import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 h-screen flex items-center justify-center">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Expense Tracker
            </h1>
            <p className="text-gray-600 mt-2">Manage your finances smartly</p>
          </div>
          
          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}