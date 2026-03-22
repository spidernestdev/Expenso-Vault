import { ReactNode } from "react";
import AuthHeader from "@/app/components/layout/AuthHeader";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      <AuthHeader />
      <div className="container mx-auto px-4 min-h-screen flex items-center justify-center pt-16">
        <div className="w-full max-w-md">
          {/* Auth Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}