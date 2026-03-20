"use client";

import { useEffect, useState } from "react";
import { Download, X } from "lucide-react";

export default function InstallPWA() {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    window.addEventListener("beforeinstallprompt", handler);

    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
    });

    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    return () => {
      window.removeEventListener("beforeinstallprompt", handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShowBanner(false);
  };

  const handleClose = () => setShowBanner(false);

  if (isInstalled || !deferredPrompt || !showBanner) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in slide-in-from-bottom-4 fade-in duration-300">
      <div className="bg-linear-to-r from-indigo-600 to-indigo-700 rounded-xl shadow-xl border border-indigo-400/30 w-64 overflow-hidden">
        <div className="p-3">
          {/* Header */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="p-1.5 bg-white/20 rounded-lg">
                <Download className="w-3.5 h-3.5 text-white" />
              </div>
              <span className="text-white font-medium text-sm">Expenso Vault</span>
            </div>
            <button onClick={handleClose} className="p-1 hover:bg-white/20 rounded-lg">
              <X className="w-3.5 h-3.5 text-white/70" />
            </button>
          </div>

          {/* Install button */}
          <button
            onClick={handleInstall}
            className="w-full bg-white text-indigo-700 text-xs font-medium py-2 px-3 rounded-lg hover:bg-indigo-50 transition-all shadow-md flex items-center justify-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Install App
          </button>
        </div>
      </div>
    </div>
  );
}