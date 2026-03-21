"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, Wallet, LogIn, ShieldCheck, ArrowRight, RefreshCw } from "lucide-react";
import { authAPI } from "@/app/lib/api";

const currencies = [
  { value: "USD", label: "USD - US Dollar ($)" },
  { value: "EUR", label: "EUR - Euro (€)" },
  { value: "GBP", label: "GBP - British Pound (£)" },
  { value: "JPY", label: "JPY - Japanese Yen (¥)" },
  { value: "INR", label: "INR - Indian Rupee (₹)" },
  { value: "CNY", label: "CNY - Chinese Yuan (¥)" },
  { value: "CAD", label: "CAD - Canadian Dollar (C$)" },
  { value: "AUD", label: "AUD - Australian Dollar (A$)" },
  { value: "CHF", label: "CHF - Swiss Franc (Fr)" },
  { value: "HKD", label: "HKD - Hong Kong Dollar (HK$)" },
  { value: "SGD", label: "SGD - Singapore Dollar (S$)" },
  { value: "SEK", label: "SEK - Swedish Krona (kr)" },
  { value: "KRW", label: "KRW - South Korean Won (₩)" },
  { value: "NOK", label: "NOK - Norwegian Krone (kr)" },
  { value: "NZD", label: "NZD - New Zealand Dollar (NZ$)" },
  { value: "MXN", label: "MXN - Mexican Peso ($)" },
  { value: "BRL", label: "BRL - Brazilian Real (R$)" },
  { value: "ZAR", label: "ZAR - South African Rand (R)" },
  { value: "RUB", label: "RUB - Russian Ruble (₽)" },
  { value: "TRY", label: "TRY - Turkish Lira (₺)" },
  { value: "SAR", label: "SAR - Saudi Riyal (﷼)" },
  { value: "AED", label: "AED - UAE Dirham (د.إ)" },
  { value: "ARS", label: "ARS - Argentine Peso ($)" },
  { value: "CLP", label: "CLP - Chilean Peso ($)" },
  { value: "COP", label: "COP - Colombian Peso ($)" },
  { value: "EGP", label: "EGP - Egyptian Pound (£)" },
  { value: "IDR", label: "IDR - Indonesian Rupiah (Rp)" },
  { value: "ILS", label: "ILS - Israeli Shekel (₪)" },
  { value: "MYR", label: "MYR - Malaysian Ringgit (RM)" },
  { value: "NGN", label: "NGN - Nigerian Naira (₦)" },
  { value: "PKR", label: "PKR - Pakistani Rupee (₨)" },
  { value: "PHP", label: "PHP - Philippine Peso (₱)" },
  { value: "PLN", label: "PLN - Polish Złoty (zł)" },
  { value: "THB", label: "THB - Thai Baht (฿)" },
  { value: "VND", label: "VND - Vietnamese Đồng (₫)" }
];

// OTP input component — 6 boxes
function OTPInput({ value, onChange }: { value: string; onChange: (val: string) => void }) {
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (i: number, val: string) => {
    if (!/^\d*$/.test(val)) return;
    const arr = value.split("");
    arr[i] = val.slice(-1);
    const next = arr.join("").padEnd(6, "").slice(0, 6);
    onChange(next.trimEnd());
    if (val && i < 5) inputs.current[i + 1]?.focus();
  };

  const handleKeyDown = (i: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !value[i] && i > 0) inputs.current[i - 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    onChange(pasted);
    inputs.current[Math.min(pasted.length, 5)]?.focus();
    e.preventDefault();
  };

  return (
    <div className="flex gap-2 justify-center">
      {[0,1,2,3,4,5].map(i => (
        <input
          key={i}
          ref={el => { inputs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={value[i] || ""}
          onChange={e => handleChange(i, e.target.value)}
          onKeyDown={e => handleKeyDown(i, e)}
          onPaste={handlePaste}
          className="w-11 h-12 text-center text-lg font-bold border-2 border-gray-200 rounded-xl focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all"
        />
      ))}
    </div>
  );
}

export default function RegisterForm() {
  const router = useRouter();
  const [step, setStep] = useState<"form" | "otp">("form");
  const [formData, setFormData] = useState({ name: "", email: "", password: "", currency: "USD" });
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  // Countdown timer for resend
  useEffect(() => {
    if (resendTimer <= 0) return;
    const t = setTimeout(() => setResendTimer(prev => prev - 1), 1000);
    return () => clearTimeout(t);
  }, [resendTimer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await authAPI.sendOTP({ email: formData.email, name: formData.name });
      setStep("otp");
      setResendTimer(60);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    if (resendTimer > 0) return;
    setError("");
    setLoading(true);
    try {
      await authAPI.sendOTP({ email: formData.email, name: formData.name });
      setResendTimer(60);
      setOtp("");
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to resend OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyAndRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length < 6) { setError("Please enter the 6-digit OTP"); return; }
    setError("");
    setLoading(true);
    try {
      await authAPI.verifyOTP({ email: formData.email, otp });
      const response = await authAPI.register(formData);
      localStorage.setItem("token", response.data.data.token);
      router.push("/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {step === "form" ? (
        <>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Create Account</h2>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">{error}</div>}

          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
                  placeholder="Your Name" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
                  placeholder="yourmail@gmail.com" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input type="password" name="password" value={formData.password} onChange={handleChange} required minLength={6}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-gray-900"
                  placeholder="••••••" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currency</label>
              <div className="relative">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 z-10" />
                <select name="currency" value={formData.currency} onChange={handleChange} required
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none appearance-none bg-white text-gray-900">
                  {currencies.map(curr => <option key={curr.value} value={curr.value}>{curr.label}</option>)}
                </select>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? "Sending OTP..." : <><ArrowRight className="w-5 h-5" />Continue</>}
            </button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-medium">Login</Link>
          </p>
        </>
      ) : (
        <>
          {/* OTP Step */}
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-8 h-8 text-indigo-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Verify your email</h2>
            <p className="text-sm text-gray-500 mt-1">
              We sent a 6-digit OTP to <span className="font-medium text-gray-700">{formData.email}</span>
            </p>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm text-center">{error}</div>}

          <form onSubmit={handleVerifyAndRegister} className="space-y-6">
            <OTPInput value={otp} onChange={setOtp} />

            <button type="submit" disabled={loading || otp.length < 6}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2.5 px-4 rounded-lg transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50">
              {loading ? "Verifying..." : <><LogIn className="w-5 h-5" />Verify & Create Account</>}
            </button>
          </form>

          <div className="mt-4 text-center">
            <button onClick={handleResendOTP} disabled={resendTimer > 0 || loading}
              className="text-sm text-indigo-600 hover:text-indigo-700 disabled:text-gray-400 flex items-center gap-1.5 mx-auto transition-colors">
              <RefreshCw className="w-4 h-4" />
              {resendTimer > 0 ? `Resend OTP in ${resendTimer}s` : "Resend OTP"}
            </button>
          </div>

          <button onClick={() => { setStep("form"); setError(""); setOtp(""); }}
            className="mt-3 w-full text-sm text-gray-500 hover:text-gray-700 transition-colors">
            ← Back to form
          </button>
        </>
      )}
    </>
  );
}