import { Suspense } from "react";
import TopHeader from "@/components/header/TopHeader";
import MegaMenu from "@/components/mega-menu/MegaMenu";
import BreakingNewsTicker from "@/components/layout/BreakingNewsTicker";
import Footer from "@/components/layout/Footer";
import MobileNavBar from "@/components/layout/MobileNavBar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Desktop Header — hidden on mobile */}
      <div className="hidden md:block">
        <TopHeader />
        <Suspense fallback={null}>
          <MegaMenu />
        </Suspense>
        <BreakingNewsTicker />
      </div>

      {/* Main Content */}
      <main className="min-h-screen pb-16 md:pb-0">{children}</main>

      {/* Desktop Footer — hidden on mobile */}
      <div className="hidden md:block">
        <Footer />
      </div>

      {/* Mobile Bottom Nav — hidden on desktop */}
      <MobileNavBar />
    </>
  );
}
