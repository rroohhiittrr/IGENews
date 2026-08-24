"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Search, Clock, RefreshCw, XCircle, ShieldAlert, ArrowRight } from "lucide-react";
import ProfileHeader from "@/components/profile/ProfileHeader";
import InterestsCard from "@/components/profile/InterestsCard";
import ActivityStats from "@/components/profile/ActivityStats";
import AuthorityCard from "@/components/profile/AuthorityCard";
import UpgradeJourneyCard from "@/components/profile/UpgradeJourneyCard";
import Link from "next/link";
import { useParams } from "next/navigation";
import ReaderOnboarding from "@/components/profile/reader/free/ReaderOnboarding";
import ReaderDashboard from "@/components/profile/reader/free/ReaderDashboard";

export default function ProfileHome() {
  const { user } = useAuth();
  const params = useParams();
  const locale = (params?.locale as string) || "en";

  if (!user) return null;

  // Determine if the user is a Reader
  const isReader = !user.onboardingRole || user.onboardingRole === "none" || (user.onboardingRole as string) === "reader";

  if (isReader) {
    const isCompleted = user.onboardingForm?.readerOnboardingComplete === true;
    if (!isCompleted) {
      return <ReaderOnboarding />;
    }
    return <ReaderDashboard />;
  }

  const hasActiveOnboarding = user.onboardingRole && user.onboardingRole !== "none" && user.onboardingStatus !== "Approved";

  const renderOnboardingProgress = () => {
    const roleLabels: Record<string, string> = {
      sme: "SME",
      "associate-sme": "Associate SME",
      company: "Company Page",
      leader: "Leader Page"
    };
    const roleLabel = roleLabels[user.onboardingRole || ""] || "Expert Profile";
    const status = user.onboardingStatus || "Draft";

    let statusColor = "text-amber-500 bg-amber-50/50 border-amber-200 dark:bg-amber-950/15 dark:border-amber-900/30";
    let StatusIcon = Clock;
    let desc = "Complete your application details and upload credentials.";
    let ctaLabel = "Resume Onboarding";

    if (status === "Submitted") {
      statusColor = "text-blue-600 bg-blue-50/50 border-blue-200 dark:bg-blue-950/15 dark:border-blue-900/30";
      StatusIcon = Clock;
      desc = "Form submitted successfully. Document indexing complete.";
      ctaLabel = "Check Progress";
    } else if (status === "Under Review") {
      statusColor = "text-indigo-600 bg-indigo-50/50 border-indigo-200 dark:bg-indigo-950/15 dark:border-indigo-900/30";
      StatusIcon = RefreshCw;
      desc = "Compliance team is validating experience and legal records.";
      ctaLabel = "Check Progress";
    } else if (status === "Need More Information") {
      statusColor = "text-orange-600 bg-orange-50/50 border-orange-200 dark:bg-orange-950/15 dark:border-orange-900/30";
      StatusIcon = ShieldAlert;
      desc = `Correction needed: "${user.onboardingFeedback || "Check updates."}"`;
      ctaLabel = "Provide Information";
    } else if (status === "Rejected") {
      statusColor = "text-red-600 bg-red-50/50 border-red-200 dark:bg-red-950/15 dark:border-red-900/30";
      StatusIcon = XCircle;
      desc = "Application declined due to criteria misfit. See details.";
      ctaLabel = "Review Rejection";
    }

    return (
      <div className="bg-white dark:bg-[#122238] rounded-[32px] p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 dark:border-white/5 space-y-6 flex flex-col relative overflow-hidden">
        <div>
          <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 block mb-1 uppercase tracking-wider">
            UPGRADE IN PROGRESS
          </span>
          <h3 className="text-xl font-bold text-[#1D1D46] dark:text-white">
            {roleLabel} Verification
          </h3>
        </div>

        <div className={`p-4 rounded-2xl flex items-start gap-3 border ${statusColor}`}>
          <StatusIcon className={`w-5 h-5 shrink-0 mt-0.5 ${status === "Under Review" ? "animate-spin" : ""}`} />
          <div>
            <span className="text-xs font-black uppercase tracking-wider block">Status: {status}</span>
            <p className="text-[11px] mt-1 leading-normal font-semibold">{desc}</p>
          </div>
        </div>

        <Link 
          href={`/${locale}/profile/plans/${user.onboardingRole}`} 
          className="w-full py-3.5 bg-[#1D1D46] hover:bg-[#0642BA] text-white text-center font-bold rounded-2xl shadow-md transition-colors flex items-center justify-center gap-2 text-xs"
        >
          {ctaLabel}
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  };

  return (
    <div className="p-5 md:p-8 lg:p-10">
      {/* Top Bar */}
      <div className="hidden md:flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-[#1D1D46]" style={{ fontFamily: "var(--font-display)" }}>
          Profile
        </h1>
        <div className="relative">
          <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="pl-11 pr-6 py-2.5 rounded-full bg-white shadow-sm text-sm w-72 border-none focus:outline-none focus:ring-2 focus:ring-[#F0652E] transition-all"
          />
        </div>
      </div>

      {/* Mobile top gap for status bar */}
      <div className="h-2 md:hidden" />

      {/* Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 lg:gap-8">
        {/* Left / Center */}
        <div className="xl:col-span-2 space-y-6 lg:space-y-8">
          <ProfileHeader user={user} />
          <AuthorityCard user={user} />
        </div>

        {/* Right column */}
        <div className="space-y-6 lg:space-y-8">
          <InterestsCard user={user} />
          {hasActiveOnboarding ? renderOnboardingProgress() : <UpgradeJourneyCard user={user} />}
        </div>
      </div>

      {/* Activity below */}
      <div className="mt-6 lg:mt-8">
        <ActivityStats />
      </div>
    </div>
  );
}
