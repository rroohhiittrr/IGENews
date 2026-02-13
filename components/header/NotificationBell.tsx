"use client";

import { useState } from "react";
import { Bell } from "lucide-react";

export default function NotificationBell() {
  const [count] = useState(3);

  return (
    <button className="relative flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-neutral-dark)] hover:bg-[var(--color-neutral-light)]">
      <Bell className="h-[18px] w-[18px]" />
      {count > 0 && (
        <span className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--color-breaking)] text-[9px] font-bold text-white">
          {count}
        </span>
      )}
    </button>
  );
}
