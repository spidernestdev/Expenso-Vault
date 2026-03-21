"use client";

import { useEffect, useState, useRef } from "react";
import { Bell, Check, CheckCheck, Trash2, TrendingUp, AlertTriangle, X } from "lucide-react";
import { notificationAPI } from "@/app/lib/api";

interface Notification {
  _id: string;
  type: "approaching" | "exceeded";
  title: string;
  message: string;
  percentage: number;
  isRead: boolean;
  createdAt: string;
  category: { name: string; icon: string; color: string };
}

export default function NotificationDropdown() {
  const [open, setOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch unread count on mount and every 30s
  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 30 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationAPI.getUnreadCount();
      setUnreadCount(res.data.data.count);
    } catch {}
  };

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await notificationAPI.getAll({ limit: 20 });
      setNotifications(res.data.data.notifications);
      setUnreadCount(res.data.data.unreadCount);
    } catch {} finally {
      setLoading(false);
    }
  };

  const handleOpen = () => {
    setOpen(!open);
    if (!open) fetchNotifications();
  };

  const handleMarkRead = async (id: string) => {
    try {
      await notificationAPI.markRead(id);
      setNotifications(prev => prev.map(n => n._id === id ? { ...n, isRead: true } : n));
      setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const handleMarkAllRead = async () => {
    try {
      await notificationAPI.markAllRead();
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
      setUnreadCount(0);
    } catch {}
  };

  const handleDelete = async (id: string, wasUnread: boolean) => {
    try {
      await notificationAPI.delete(id);
      setNotifications(prev => prev.filter(n => n._id !== id));
      if (wasUnread) setUnreadCount(prev => Math.max(0, prev - 1));
    } catch {}
  };

  const handleDeleteAll = async () => {
    try {
      await notificationAPI.deleteAll();
      setNotifications([]);
      setUnreadCount(0);
    } catch {}
  };

  const formatTime = (date: string) => {
    const diff = Date.now() - new Date(date).getTime();
    const mins = Math.floor(diff / 60000);
    if (mins < 60) return `${mins}m ago`;
    const hrs = Math.floor(mins / 60);
    if (hrs < 24) return `${hrs}h ago`;
    return `${Math.floor(hrs / 24)}d ago`;
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={handleOpen}
        className="p-2.5 rounded-xl hover:bg-gray-100 transition-all relative group"
      >
        {unreadCount > 0 && (
          <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-[9px] text-white font-bold">{unreadCount > 99 ? "99+" : unreadCount}</span>
          </div>
        )}
        <Bell className={`w-5 h-5 transition-colors ${open ? "text-indigo-600" : "text-gray-600 group-hover:text-indigo-600"}`} />
      </button>

      {/* Dropdown */}
      {open && (
        <>
          {/* Mobile backdrop */}
          <div className="fixed inset-0 bg-black/20 z-40 sm:hidden" onClick={() => setOpen(false)} />

          <div className="
            fixed left-2 right-2 top-16 z-50
            sm:absolute sm:left-auto sm:right-0 sm:top-auto sm:mt-2 sm:w-96
            bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden
          ">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 bg-linear-to-r from-indigo-600 to-purple-600">
              <div className="flex items-center gap-2">
                <Bell className="w-4 h-4 text-white" />
                <h3 className="text-sm font-semibold text-white">Notifications</h3>
                {unreadCount > 0 && (
                  <span className="text-xs bg-white/20 text-white px-2 py-0.5 rounded-full">{unreadCount} new</span>
                )}
              </div>
              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button onClick={handleMarkAllRead} title="Mark all read" className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                    <CheckCheck className="w-4 h-4 text-white" />
                  </button>
                )}
                {notifications.length > 0 && (
                  <button onClick={handleDeleteAll} title="Clear all" className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                )}
                <button onClick={() => setOpen(false)} className="p-1.5 hover:bg-white/20 rounded-lg transition-colors">
                  <X className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="max-h-80 sm:max-h-96 overflow-y-auto">
              {loading ? (
                <div className="p-4 space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="animate-pulse flex gap-3">
                      <div className="w-9 h-9 bg-gray-200 rounded-xl shrink-0" />
                      <div className="flex-1 space-y-2">
                        <div className="h-3 bg-gray-200 rounded w-3/4" />
                        <div className="h-3 bg-gray-200 rounded w-full" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifications.length === 0 ? (
                <div className="py-12 text-center">
                  <Bell className="w-10 h-10 text-gray-300 mx-auto mb-3" />
                  <p className="text-sm text-gray-500 font-medium">No notifications</p>
                  <p className="text-xs text-gray-400 mt-1">Budget alerts will appear here</p>
                </div>
              ) : (
                notifications.map((n) => (
                  <div
                    key={n._id}
                    className={`flex items-start gap-3 px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!n.isRead ? "bg-indigo-50/50" : ""}`}
                  >
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${n.type === "exceeded" ? "bg-red-100" : "bg-yellow-100"}`}>
                      {n.type === "exceeded"
                        ? <AlertTriangle className="w-4 h-4 text-red-600" />
                        : <TrendingUp className="w-4 h-4 text-yellow-600" />
                      }
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-xs font-semibold text-gray-900 leading-tight ${!n.isRead ? "font-bold" : ""}`}>
                          {n.title}
                        </p>
                        {!n.isRead && <div className="w-2 h-2 bg-indigo-600 rounded-full shrink-0 mt-1" />}
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.message}</p>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-[10px] text-gray-400">{formatTime(n.createdAt)}</span>
                        <div className="flex items-center gap-1">
                          {!n.isRead && (
                            <button onClick={() => handleMarkRead(n._id)} className="p-1 hover:bg-indigo-100 rounded-lg transition-colors" title="Mark read">
                              <Check className="w-3 h-3 text-indigo-600" />
                            </button>
                          )}
                          <button onClick={() => handleDelete(n._id, !n.isRead)} className="p-1 hover:bg-red-100 rounded-lg transition-colors" title="Delete">
                            <Trash2 className="w-3 h-3 text-red-500" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}