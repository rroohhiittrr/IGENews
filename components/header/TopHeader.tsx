import Logo from "@/components/header/Logo";
import SearchBar from "@/components/header/SearchBar";
import LanguageSelector from "@/components/header/LanguageSelector";
import NotificationBell from "@/components/header/NotificationBell";
import DarkModeToggle from "@/components/header/DarkModeToggle";
import PlanBadge from "@/components/header/PlanBadge";
import ProfileAvatar from "@/components/header/ProfileAvatar";
import UpgradeButton from "@/components/header/UpgradeButton";

export default function TopHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-[var(--color-neutral-light)] bg-white px-4 shadow-sm lg:px-6">
      <Logo />
      <SearchBar />
      <div className="flex items-center gap-1 sm:gap-2">
        <LanguageSelector />
        <NotificationBell />
        <DarkModeToggle />
        <PlanBadge />
        <ProfileAvatar />
        <UpgradeButton />
      </div>
    </header>
  );
}
