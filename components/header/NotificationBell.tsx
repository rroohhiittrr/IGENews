"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check } from "lucide-react";
import { useNotifications } from "@/contexts/NotificationContext";
import Link from "next/link";

export default function NotificationBell() {
  const { notifications, unreadCount, markAsRead, markAllAsRead } = useNotifications();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getTypeColor = (type: string) => {
    switch (type) {
      case "breaking":
        return "text-[var(--color-breaking)]";
      case "trend":
        return "text-[var(--color-accent-gold)]";
      case "update":
        return "text-[var(--color-secondary)]";
      case "alert":
        return "text-[var(--color-accent-green)]";
      default:
        return "text-[var(--color-neutral-dark)]";
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)] transition-all"
      >
        <Bell className="h-[18px] w-[18px]" />
        {unreadCount > 0 && (
          <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-breaking)] text-[9px] font-bold text-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-[380px] max-h-[500px] overflow-y-auto rounded-lg bg-white dark:bg-[var(--color-neutral-white)] shadow-xl border border-[var(--color-neutral-mid)]/20 z-50">
          {/* Header */}
          <div className="sticky top-0 bg-white dark:bg-[var(--color-neutral-white)] border-b border-[var(--color-neutral-mid)]/20 px-4 py-3 flex items-center justify-between">
            <h3 className="font-semibold text-[var(--color-text-body)]">Notifications</h3>
            {unreadCount > 0 && (
              <button
                onClick={markAllAsRead}
                className="text-xs text-[var(--color-primary)] hover:underline"
              >
                Mark all read
              </button>
            )}
          </div>

          {/* Notifications List */}
          <div className="divide-y divide-[var(--color-neutral-mid)]/20">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-[var(--color-neutral-dark)]">
                No notifications
              </div>
            ) : (
              notifications.map((notif) => {
                const content = (
                  <div className="flex gap-3">
                    <div
                      className={`mt-0.5 h-2 w-2 rounded-full flex-shrink-0 ${
                        !notif.read ? "bg-[var(--color-breaking)]" : "bg-transparent"
                      }`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[10px] font-semibold uppercase ${getTypeColor(
                            notif.type
                          )}`}
                        >
                          {notif.type}
                        </span>
                        <span className="text-[10px] text-[var(--color-neutral-dark)]">
                          {formatTime(notif.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-[var(--color-text-body)] mb-0.5">
                        {notif.title}
                      </p>
                      <p className="text-xs text-[var(--color-neutral-dark)] line-clamp-2">
                        {notif.message}
                      </p>
                    </div>
                  </div>
                );

                const handleClick = () => {
                  markAsRead(notif.id);
                  if (notif.link) setIsOpen(false);
                };

                const baseClassName = `block px-4 py-3 transition-colors ${
                  notif.link ? "hover:bg-[var(--color-neutral-light)] cursor-pointer" : ""
                } ${!notif.read ? "bg-[var(--color-accent-gold-light)]/10" : ""}`;

                return notif.link ? (
                  <Link
                    key={notif.id}
                    href={notif.link}
                    onClick={handleClick}
                    className={baseClassName}
                  >
                    {content}
                  </Link>
                ) : (
                  <div key={notif.id} onClick={handleClick} className={baseClassName}>
                    {content}
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
