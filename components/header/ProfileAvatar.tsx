import { User } from "lucide-react";

export default function ProfileAvatar() {
  return (
    <button className="flex h-8 w-8 items-center justify-center rounded-full bg-[var(--color-primary-light)] text-white text-xs font-semibold">
      <User className="h-4 w-4" />
    </button>
  );
}
