"use client";

import { useState, useEffect } from "react";
import { Star, MessageSquare } from "lucide-react";
import { reviewAPI } from "@/app/lib/api";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

export default function ReviewSection() {
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState<any>(null);
  const [currentUserId, setCurrentUserId] = useState<string | undefined>();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [hasReviewed, setHasReviewed] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.id);
      } catch {}
    }
  }, []);

  useEffect(() => {
    fetchReviews(1);
  }, []);

  const fetchReviews = async (p: number) => {
    try {
      setLoading(true);
      const res = await reviewAPI.getAll({ page: p, limit: 6 });
      const data = res.data.data;
      if (p === 1) {
        setReviews(data.data);
      } else {
        setReviews(prev => [...prev, ...data.data]);
      }
      setPagination(data.pagination);
      setPage(p);
    } catch {} finally {
      setLoading(false);
    }
  };

  const handleReviewAdded = (review: any) => {
    setReviews(prev => [review, ...prev]);
    setHasReviewed(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this review?")) return;
    try {
      await reviewAPI.delete(id);
      setReviews(prev => prev.filter(r => r._id !== id));
      setHasReviewed(false);
    } catch {}
  };

  const handleUpdate = (id: string, updated: { text: string; rating: number }) => {
    setReviews(prev => prev.map(r => r._id === id ? { ...r, ...updated } : r));
  };

  const avgRating = reviews.length
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
    : null;

  return (
    <section className="py-5 px-10 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-yellow-50 px-4 py-2 rounded-full mb-4">
            <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
            <span className="text-sm font-medium text-yellow-700">User Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">What our users say</h2>
          {avgRating && (
            <div className="flex items-center justify-center gap-2 mt-3">
              <span className="text-4xl font-bold text-gray-900">{avgRating}</span>
              <div className="flex flex-col items-start">
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} className={`w-4 h-4 ${s <= Math.round(Number(avgRating)) ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
                  ))}
                </div>
                <span className="text-xs text-gray-500">{reviews.length} reviews</span>
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            {isLoggedIn && !hasReviewed && !reviews.some(r => r.user._id === currentUserId) ? (
              <ReviewForm onReviewAdded={handleReviewAdded} />
            ) : isLoggedIn && (hasReviewed || reviews.some(r => r.user._id === currentUserId)) ? (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-7 h-7 text-green-600 fill-green-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Thanks for your review!</p>
                <p className="text-xs text-gray-500">You can only submit one review per account.</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MessageSquare className="w-7 h-7 text-indigo-600" />
                </div>
                <p className="text-sm font-semibold text-gray-900 mb-1">Share your experience</p>
                <p className="text-xs text-gray-500 mb-4">Login to write a review</p>
                <a href="/login" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-5 py-2.5 rounded-xl font-medium transition-colors">
                  Login to Review
                </a>
              </div>
            )}
          </div>

          <div className="lg:col-span-2 space-y-4">
            {loading && reviews.length === 0 ? (
              [...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-full" />
                    <div className="space-y-1.5">
                      <div className="h-3 bg-gray-200 rounded w-24" />
                      <div className="h-3 bg-gray-200 rounded w-16" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="h-3 bg-gray-200 rounded w-full" />
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                  </div>
                </div>
              ))
            ) : reviews.length === 0 ? (
              <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
                <p className="text-gray-500">No reviews yet. Be the first!</p>
              </div>
            ) : (
              reviews.map(review => (
                <ReviewCard
                  key={review._id}
                  review={review}
                  currentUserId={currentUserId}
                  onDelete={handleDelete}
                  onUpdate={handleUpdate}
                />
              ))
            )}

            {pagination?.hasNext && (
              <button
                onClick={() => fetchReviews(page + 1)}
                disabled={loading}
                className="w-full py-3 border border-gray-200 rounded-xl text-sm text-gray-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
              >
                {loading ? "Loading..." : "Load more reviews"}
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}