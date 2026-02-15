"use client";

import React, { createContext, useContext, useState } from "react";

export interface Notification {
  id: string;
  type: "breaking" | "update" | "trend" | "alert";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationContextType {
  notifications: Notification[];
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

// Sample notifications
const initialNotifications: Notification[] = [
  {
    id: "1",
    type: "breaking",
    title: "Breaking News",
    message: "India signs major trade deal with UAE",
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 mins ago
    read: false,
    link: "/news/india-uae-trade-deal",
  },
  {
    id: "2",
    type: "trend",
    title: "Trending Topic",
    message: "Automobile sector exports reach new high",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
    read: false,
    link: "/sector/automobile",
  },
  {
    id: "3",
    type: "update",
    title: "Market Update",
    message: "Textile exports to EU increase by 23%",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
    read: false,
    link: "/sector/textile",
  },
  {
    id: "4",
    type: "alert",
    title: "Policy Alert",
    message: "New export incentive scheme announced",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24), // 1 day ago
    read: true,
  },
];

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>(initialNotifications);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notif) => (notif.id === id ? { ...notif, read: true } : notif))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((notif) => ({ ...notif, read: true })));
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAsRead, markAllAsRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error("useNotifications must be used within a NotificationProvider");
  }
  return context;
}
