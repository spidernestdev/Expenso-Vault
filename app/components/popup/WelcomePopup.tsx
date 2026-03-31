"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, Star, Lightbulb } from "lucide-react";

export default function WelcomePopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsClosing(false);
    }, 300);
  };

  const handleWriteReview = () => {
    handleClose();
    setTimeout(() => {
      const reviewSection = document.getElementById("reviews");
      if (reviewSection) {
        reviewSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 400);
  };

  if (!isVisible) return null;

  return (
    <>
      <style>{`
        @keyframes backdropIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes backdropOut {
          from { opacity: 1; }
          to   { opacity: 0; }
        }
        @keyframes popupIn {
          from { opacity: 0; transform: scale(0.85) translateY(30px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes popupOut {
          from { opacity: 1; transform: scale(1) translateY(0); }
          to   { opacity: 0; transform: scale(0.85) translateY(30px); }
        }
        .backdrop-in  { animation: backdropIn  0.3s ease forwards; }
        .backdrop-out { animation: backdropOut 0.3s ease forwards; }
        .popup-in     { animation: popupIn  0.35s cubic-bezier(0.22,1,0.36,1) forwards; }
        .popup-out    { animation: popupOut 0.3s ease forwards; }
      `}</style>

      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center px-4 ${isClosing ? "backdrop-out" : "backdrop-in"}`}
        onClick={handleClose}
      >
        {/* Popup */}
        <div
          className={`bg-white rounded-3xl shadow-2xl w-full max-w-sm md:max-w-md p-5 md:p-8 relative ${isClosing ? "popup-out" : "popup-in"}`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 w-7 h-7 md:w-8 md:h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
          >
            <X className="w-3 h-3 md:w-4 md:h-4 text-gray-500" />
          </button>

          {/* Icon */}
          <div className="w-12 h-12 md:w-16 md:h-16 bg-indigo-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-6 h-6 md:w-8 md:h-8 text-indigo-600" />
          </div>

          {/* Title */}
          <h2 className="text-lg md:text-2xl font-bold text-gray-900 text-center mb-1">
            🎉 Welcome to Expenso v1.0.0!
          </h2>

          {/* Subtitle */}
          <p className="text-gray-500 text-center text-xs md:text-sm mb-4 md:mb-6">
            We're excited to have you here!
          </p>

          {/* Messages */}
          <div className="space-y-3 mb-4 md:mb-6">

            <div className="flex items-start gap-3 bg-indigo-50 rounded-2xl p-3 md:p-4">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-indigo-100 rounded-xl flex items-center justify-center shrink-0">
                <Star className="w-3 h-3 md:w-4 md:h-4 text-indigo-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">Found a bug or issue?</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Drop a review and let us know. We'll fix it as soon as possible! 🛠️
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 bg-purple-50 rounded-2xl p-3 md:p-4">
              <div className="w-7 h-7 md:w-8 md:h-8 bg-purple-100 rounded-xl flex items-center justify-center shrink-0">
                <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-purple-600" />
              </div>
              <div>
                <p className="text-xs md:text-sm font-semibold text-gray-900 mb-1">Have a feature idea?</p>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Mention it in your review and we'll consider it in <strong className="text-purple-600">v2.0.0</strong>! 🚀
                </p>
              </div>
            </div>

          </div>

          {/* Thank you note */}
          <p className="text-center text-xs text-gray-400 mb-4 md:mb-5">
            Thank you for being an early supporter! ❤️
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3">
            <button
              onClick={handleWriteReview}
              className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all hover:shadow-lg flex items-center justify-center gap-2"
            >
              <Star className="w-3 h-3 md:w-4 md:h-4" />
              Write a Review
            </button>
            <button
              onClick={handleClose}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2.5 md:py-3 rounded-xl font-semibold text-xs md:text-sm transition-all flex items-center justify-center"
            >
              Got it, Let&apos;s Go!
            </button>
          </div>

        </div>
      </div>
    </>
  );
}