"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Star, Pencil, ChevronDown, ChevronUp, Send, Check, X } from "lucide-react";
import { reviewAPI } from "@/app/lib/api";

interface Reply {
  _id: string;
  text: string;
  user: { _id: string; name: string; avatar?: string };
  likeCount: number;
  dislikeCount: number;
  createdAt: string;
}

interface Review {
  _id: string;
  text: string;
  rating: number;
  user: { _id: string; name: string; avatar?: string };
  likeCount: number;
  dislikeCount: number;
  replyCount: number;
  createdAt: string;
}

interface Props {
  review: Review;
  currentUserId?: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updated: { text: string; rating: number }) => void;
}

function StarDisplay({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star key={s} className={`w-3.5 h-3.5 ${s <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`} />
      ))}
    </div>
  );
}

export default function ReviewCard({ review, currentUserId, onDelete, onUpdate }: Props) {
  const [likeCount, setLikeCount] = useState(review.likeCount);
  const [dislikeCount, setDislikeCount] = useState(review.dislikeCount);
  const [showReplies, setShowReplies] = useState(false);
  const [replies, setReplies] = useState<Reply[]>([]);
  const [repliesLoaded, setRepliesLoaded] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [replyLikes, setReplyLikes] = useState<Record<string, { like: number; dislike: number }>>({});

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(review.text);
  const [editRating, setEditRating] = useState(review.rating);
  const [editHover, setEditHover] = useState(0);
  const [editLoading, setEditLoading] = useState(false);
  const [editError, setEditError] = useState("");

  const isOwner = currentUserId === review.user._id;

  const handleLike = async () => {
    try {
      const res = await reviewAPI.toggleLike(review._id);
      setLikeCount(res.data.data.likeCount);
      setDislikeCount(res.data.data.dislikeCount);
    } catch {}
  };

  const handleDislike = async () => {
    try {
      const res = await reviewAPI.toggleDislike(review._id);
      setLikeCount(res.data.data.likeCount);
      setDislikeCount(res.data.data.dislikeCount);
    } catch {}
  };

  const handleEditSave = async () => {
    if (editText.trim().length < 5) { setEditError("Review must be at least 5 characters"); return; }
    setEditLoading(true);
    setEditError("");
    try {
      await reviewAPI.update(review._id, { text: editText, rating: editRating });
      onUpdate(review._id, { text: editText, rating: editRating });
      setIsEditing(false);
    } catch (err: any) {
      setEditError(err?.response?.data?.message || "Failed to update review");
    } finally {
      setEditLoading(false);
    }
  };

  const handleEditCancel = () => {
    setEditText(review.text);
    setEditRating(review.rating);
    setEditError("");
    setIsEditing(false);
  };

  const loadReplies = async () => {
    if (!repliesLoaded) {
      try {
        const res = await reviewAPI.getReplies(review._id);
        setReplies(res.data.data.data);
        setRepliesLoaded(true);
      } catch {}
    }
    setShowReplies(!showReplies);
  };

  const handleAddReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    setReplyLoading(true);
    try {
      const res = await reviewAPI.addReply(review._id, replyText);
      setReplies(prev => [...prev, res.data.data]);
      setReplyText("");
      setRepliesLoaded(true);
      setShowReplies(true);
    } catch {} finally {
      setReplyLoading(false);
    }
  };

  const handleReplyLike = async (replyId: string) => {
    try {
      const res = await reviewAPI.toggleReplyLike(review._id, replyId);
      setReplyLikes(prev => ({ ...prev, [replyId]: res.data.data }));
    } catch {}
  };

  const handleReplyDislike = async (replyId: string) => {
    try {
      const res = await reviewAPI.toggleReplyDislike(review._id, replyId);
      setReplyLikes(prev => ({ ...prev, [replyId]: res.data.data }));
    } catch {}
  };

  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-br from-indigo-500 to-purple-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-white">{review.user.name?.charAt(0) || "U"}</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-900">{review.user.name}</p>
            <div className="flex items-center gap-2">
              {isEditing ? (
                <div className="flex items-center gap-0.5">
                  {[1,2,3,4,5].map(s => (
                    <button key={s} type="button" onClick={() => setEditRating(s)} onMouseEnter={() => setEditHover(s)} onMouseLeave={() => setEditHover(0)}>
                      <Star className={`w-4 h-4 transition-colors ${s <= (editHover || editRating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              ) : (
                <StarDisplay rating={review.rating} />
              )}
              <span className="text-xs text-gray-400">{formatDate(review.createdAt)}</span>
            </div>
          </div>
        </div>
        {isOwner && !isEditing && (
          <button onClick={() => setIsEditing(true)} className="p-1.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors">
            <Pencil className="w-4 h-4" />
          </button>
        )}
        {isOwner && isEditing && (
          <div className="flex items-center gap-1">
            <button onClick={handleEditSave} disabled={editLoading} className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors disabled:opacity-50">
              <Check className="w-4 h-4" />
            </button>
            <button onClick={handleEditCancel} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-lg transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Review text / edit mode */}
      {isEditing ? (
        <div className="mb-4">
          <textarea
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            rows={3}
            maxLength={500}
            className="w-full border border-indigo-200 rounded-xl px-4 py-3 text-sm text-gray-700 resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <div className="flex items-center justify-between mt-1">
            <p className="text-xs text-red-500">{editError}</p>
            <p className="text-xs text-gray-400">{editText.length}/500</p>
          </div>
        </div>
      ) : (
        <p className="text-sm text-gray-700 leading-relaxed mb-4">{review.text}</p>
      )}

      {/* Actions */}
      <div className="flex items-center gap-3">
        <button onClick={handleLike} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-green-600 transition-colors group">
          <ThumbsUp className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{likeCount}</span>
        </button>
        <button onClick={handleDislike} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-red-500 transition-colors group">
          <ThumbsDown className="w-4 h-4 group-hover:scale-110 transition-transform" />
          <span>{dislikeCount}</span>
        </button>
        <button onClick={loadReplies} className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-indigo-600 transition-colors ml-auto">
          <MessageCircle className="w-4 h-4" />
          <span>{review.replyCount} {review.replyCount === 1 ? "reply" : "replies"}</span>
          {showReplies ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
        </button>
      </div>

      {/* Replies */}
      {showReplies && (
        <div className="mt-4 space-y-3 pl-4 border-l-2 border-gray-100">
          {replies.map((reply) => {
            const rCounts = replyLikes[reply._id];
            return (
              <div key={reply._id} className="bg-gray-50 rounded-xl p-3">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-7 h-7 bg-linear-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-xs font-semibold text-white">{reply.user.name?.charAt(0) || "U"}</span>
                  </div>
                  <p className="text-xs font-semibold text-gray-900">{reply.user.name}</p>
                  <span className="text-[10px] text-gray-400 ml-auto">{formatDate(reply.createdAt)}</span>
                </div>
                <p className="text-xs text-gray-700 mb-2">{reply.text}</p>
                <div className="flex items-center gap-3">
                  <button onClick={() => handleReplyLike(reply._id)} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-green-600 transition-colors">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{rCounts?.like ?? reply.likeCount}</span>
                  </button>
                  <button onClick={() => handleReplyDislike(reply._id)} className="flex items-center gap-1 text-[10px] text-gray-400 hover:text-red-500 transition-colors">
                    <ThumbsDown className="w-3 h-3" />
                    <span>{rCounts?.dislike ?? reply.dislikeCount}</span>
                  </button>
                </div>
              </div>
            );
          })}

          {currentUserId && (
            <form onSubmit={handleAddReply} className="flex items-center gap-2 mt-2">
              <input
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                maxLength={300}
                className="flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button type="submit" disabled={replyLoading || !replyText.trim()} className="p-2 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white rounded-xl transition-colors">
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}
        </div>
      )}
    </div>
  );
}