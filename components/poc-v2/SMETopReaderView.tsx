"use client";

import Link from "next/link";
import {
  TrendingUp,
  Award,
  Users,
  MessageSquare,
  Calendar,
  Lock,
  Mail,
  ThumbsUp,
  Bookmark,
  Check,
  Compass,
  Zap,
  Globe,
  Star,
  Info,
  ChevronRight,
  TrendingDown,
  ArrowRight
} from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

// Mock Data
const MOCK_TOP_CONTRIBUTORS = [
  { rank: 1, name: "Rajesh Sharma", role: "Semicon Industry Analyst", country: "India 🇮🇳", points: 4210, badge: "Community Expert", interests: ["Technology", "Semiconductors"] },
  { rank: 2, name: "Elena Petrova", role: "Clean Energy Infrastructure Expert", country: "Germany 🇩🇪", points: 3840, badge: "Knowledge Contributor", interests: ["Energy", "ESG Compliance"] },
  { rank: 3, name: "Sultan Ahmed bin Sulayem", role: "DP World Executive", country: "UAE 🇦🇪", points: 3620, badge: "Discussion Leader", interests: ["Global Trade", "Logistics"] },
  { rank: 4, name: "Lin Xiao", role: "Structured Finance Specialist", country: "Singapore 🇸🇬", points: 3410, badge: "Active Reader", interests: ["Finance", "Trade Corridor"] },
  { rank: 5, name: "Michael Vance", role: "Bilateral Trade Compliance Consultant", country: "USA 🇺🇸", points: 3120, badge: "Active Reader", interests: ["Compliance", "Customs"] },
  { rank: 6, name: "Aria Thorne", role: "AI & Sovereign Datacenters Lead", company: "Apex Tech Labs", country: "India 🇮🇳", points: 2950, badge: "Rising Reader", interests: ["AI", "Sovereign Cloud"] }
];

const MOCK_ENGAGED_READERS = [
  { name: "Carlos Menendez", role: "Logistics Director", country: "Spain 🇪🇸", saves: 98, polls: 42, events: 15 },
  { name: "Yuki Tanaka", role: "SME Supply Chain Manager", country: "Japan 🇯🇵", saves: 86, polls: 38, events: 12 }
];

const MOCK_HELPFUL_READERS = [
  { name: "Dr. Ananya Varma", role: "Compliance Advisor", country: "India 🇮🇳", acceptedAnswers: 47, feedbackScore: "98%" },
  { name: "Kamil Al-Mansoori", role: "CEPA Legal Consultant", country: "UAE 🇦🇪", acceptedAnswers: 39, feedbackScore: "96%" }
];

const MOCK_RISING_READERS = [
  { name: "Sofia Dupont", role: "Energy Transition Researcher", country: "France 🇫🇷", growth: "+68%", pointsThisWeek: 850 },
  { name: "Vikram Malhotra", role: "Hardware Systems Designer", country: "India 🇮🇳", growth: "+54%", pointsThisWeek: 640 }
];

const MOCK_TOP_DISCUSSIONS = [
  { id: "disc-1", title: "Should India accelerate semiconductor equipment import tariff exemptions?", replies: 124, saves: 48, category: "Trade Policy" },
  { id: "disc-2", title: "Impact of new GoI Phytochemical export benchmarks on small scale units", replies: 86, saves: 32, category: "Compliance" }
];

interface TopReaderProps {
  isJoined: boolean;
  setIsJoined: Dispatch<SetStateAction<boolean>>;
  followedThreads: string[];
  setFollowedThreads: Dispatch<SetStateAction<string[]>>;
  isAskDialogOpen: boolean;
  setIsAskDialogOpen: Dispatch<SetStateAction<boolean>>;
  newQuestionText: string;
  setNewQuestionText: Dispatch<SetStateAction<string>>;
  newQuestionCategory: string;
  setNewQuestionCategory: Dispatch<SetStateAction<string>>;
  userQuestions: any[];
  setUserQuestions: Dispatch<SetStateAction<any[]>>;
  isConsultDialogOpen: boolean;
  setIsConsultDialogOpen: Dispatch<SetStateAction<boolean>>;
  consultTargetExpert: string;
  setConsultTargetExpert: Dispatch<SetStateAction<string>>;
  consultMessage: string;
  setConsultMessage: Dispatch<SetStateAction<string>>;
  consultSubmitted: boolean;
  setConsultSubmitted: Dispatch<SetStateAction<boolean>>;
  registeredEventIds: string[];
  setRegisteredEventIds: Dispatch<SetStateAction<string[]>>;
  followedExperts: string[];
  setFollowedExperts: Dispatch<SetStateAction<string[]>>;
  connectedExperts: string[];
  setConnectedExperts: Dispatch<SetStateAction<string[]>>;
  newsletterEmail: string;
  setNewsletterEmail: Dispatch<SetStateAction<string>>;
  newsletterSubscribed: boolean;
  setNewsletterSubscribed: Dispatch<SetStateAction<boolean>>;
  joinedSuccessMsg: boolean;
  setJoinedSuccessMsg: Dispatch<SetStateAction<boolean>>;
}

export default function SMETopReaderView({
  isJoined,
  setIsJoined,
  followedThreads,
  setFollowedThreads,
  isAskDialogOpen,
  setIsAskDialogOpen,
  newQuestionText,
  setNewQuestionText,
  newQuestionCategory,
  setNewQuestionCategory,
  userQuestions,
  setUserQuestions,
  isConsultDialogOpen,
  setIsConsultDialogOpen,
  consultTargetExpert,
  setConsultTargetExpert,
  consultMessage,
  setConsultMessage,
  consultSubmitted,
  setConsultSubmitted,
  registeredEventIds,
  setRegisteredEventIds,
  followedExperts,
  setFollowedExperts,
  connectedExperts,
  setConnectedExperts,
  newsletterEmail,
  setNewsletterEmail,
  newsletterSubscribed,
  setNewsletterSubscribed,
  joinedSuccessMsg,
  setJoinedSuccessMsg
}: TopReaderProps) {

  // Category Tab Filter
  const [activeCategory, setActiveCategory] = useState("All");
  const [showMethodology, setShowMethodology] = useState(false);
  const [followedReaders, setFollowedReaders] = useState<string[]>([]);

  const handleFollowReader = (name: string) => {
    if (followedReaders.includes(name)) {
      setFollowedReaders(followedReaders.filter(n => n !== name));
    } else {
      setFollowedReaders([...followedReaders, name]);
    }
  };

  const handleJoinCommunity = () => {
    setIsJoined(true);
    setJoinedSuccessMsg(true);
    setTimeout(() => setJoinedSuccessMsg(false), 4000);
  };

  return (
    <>
      {/* 01. TOP READERS HERO */}
      <section className="bg-gradient-to-br from-[#0c1a30] via-[#0f2444] to-[#070b13] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8 justify-between lg:items-center">
            
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold bg-amber-500 text-gray-950 px-2.5 py-0.5 rounded uppercase tracking-wider">
                  READER COMMUNITY
                </span>
                <span className="text-[9px] text-slate-350 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                  B2B Recognition Panel
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Top Readers
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Discover the readers who are making meaningful contributions, leading conversations and shaping the Reader Community.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <a
                  href="#contributors"
                  className="bg-amber-500 text-gray-950 hover:bg-amber-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer shadow-xs"
                >
                  Explore Top Readers →
                </a>
                <button
                  onClick={handleJoinCommunity}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer ${
                    isJoined 
                      ? "bg-emerald-600 text-white border-emerald-500" 
                      : "bg-white/5 text-slate-250 border-white/10 hover:bg-white/10"
                  }`}
                >
                  {isJoined ? "Joined Community ✓" : "Join the Community"}
                </button>
              </div>

              {joinedSuccessMsg && (
                <div className="text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 p-2.5 rounded-lg max-w-md animate-pulse">
                  Welcome to the Reader Community. Your profile is now set to active community participation mode.
                </div>
              )}
            </div>

            {/* Quick Metrics */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:w-72 shrink-0 backdrop-blur-xs">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3.5 pb-2 border-b border-white/5">
                Community Activity
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-bold text-white">1,480+</div>
                  <div className="text-[10px] text-slate-400 font-medium">Verified Contributors</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">42</div>
                  <div className="text-[10px] text-slate-400 font-medium">Daily Active Threads</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">28</div>
                  <div className="text-[10px] text-slate-400 font-medium">Badges Claimed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">98.2%</div>
                  <div className="text-[10px] text-slate-400 font-medium">Engagement Rate</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. ALL READERS / TOP READERS NAVIGATION */}
      <section className="bg-white dark:bg-[#0b101c] border-b border-gray-205 py-2">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-4">
            <Link
              href="/en/poc-v2/communities/reader/all"
              className="text-xs font-bold text-gray-400 hover:text-gray-600 pb-1"
            >
              All Readers (Discovery Feed)
            </Link>
            <span className="text-xs font-bold border-b-2 border-amber-500 text-amber-600 dark:text-amber-400 pb-1 cursor-default">
              Top Readers Board (Rankings)
            </span>
          </div>
        </div>
      </section>

      {/* MAIN BODY LAYOUT */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">

        {/* 03. RANKING CATEGORIES */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-8 space-y-4 shadow-2xs">
          <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
            <div className="flex gap-2 items-center flex-wrap">
              <span className="text-[9px] font-bold text-gray-405 uppercase mr-2">Ranking View:</span>
              {["All", "Top Contributors", "Most Engaged", "Most Helpful", "Discussion Leaders", "Rising Readers"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-amber-500 text-gray-950 border-amber-500 shadow-xs"
                      : "bg-gray-50 dark:bg-gray-900 text-gray-550 border-gray-200 dark:border-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <button
              onClick={() => setShowMethodology(!showMethodology)}
              className="text-[9px] font-bold text-gray-400 hover:text-gray-600 flex items-center gap-1.5 cursor-pointer"
            >
              <Info className="h-3.5 w-3.5" /> How rankings work
            </button>
          </div>

          {showMethodology && (
            <div className="p-3.5 bg-gray-50 dark:bg-gray-950 border border-gray-150 dark:border-gray-850 rounded-xl text-[11px] text-gray-500 leading-relaxed animate-in slide-in-from-top-2 duration-200">
              <strong className="text-gray-700 dark:text-gray-300">Methodology:</strong> Reader rankings are computed from verified contributions, accepted compliance answers in public threads, saved articles, and active participation in community briefs and events. Paid promotions or follower count metrics do not influence organic scores.
            </div>
          )}
        </section>

        {/* 04. TOP READER CONTRIBUTORS */}
        {(activeCategory === "All" || activeCategory === "Top Contributors") && (
          <section id="contributors" className="mb-8 space-y-4">
            <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
              <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Award className="h-4.5 w-4.5 text-amber-500" />
                Top Reader Contributors
              </h2>
              <p className="text-[10px] text-gray-500">Recognizing readers who consistently contribute valuable knowledge and meaningful conversations.</p>
            </div>

            {/* Premium Podium for Top 3 */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pt-4">
              
              {/* Rank 2 */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-center space-y-3 relative hover:border-amber-500 transition-all duration-300 md:order-1">
                <div className="absolute top-3 left-3 text-sm font-extrabold text-gray-300">#2</div>
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-350 flex items-center justify-center mx-auto text-sm font-bold border-2 border-slate-300">
                  EP
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">{MOCK_TOP_CONTRIBUTORS[1].name}</h3>
                  <p className="text-[9px] text-gray-400">{MOCK_TOP_CONTRIBUTORS[1].role}</p>
                  <p className="text-[9px] text-gray-500 font-semibold">{MOCK_TOP_CONTRIBUTORS[1].country}</p>
                </div>
                <span className="text-[8px] bg-slate-100 dark:bg-slate-900 text-slate-655 dark:text-slate-300 px-2 py-0.5 rounded font-mono font-bold block mx-auto w-max">
                  {MOCK_TOP_CONTRIBUTORS[1].badge}
                </span>
                <div className="text-xs font-bold text-amber-600">{MOCK_TOP_CONTRIBUTORS[1].points} pts</div>
                <button
                  onClick={() => handleFollowReader(MOCK_TOP_CONTRIBUTORS[1].name)}
                  className={`w-full text-[9px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                    followedReaders.includes(MOCK_TOP_CONTRIBUTORS[1].name)
                      ? "bg-amber-500 text-gray-950 border-amber-500 shadow-xs"
                      : "bg-gray-50 dark:bg-gray-900 text-gray-655 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {followedReaders.includes(MOCK_TOP_CONTRIBUTORS[1].name) ? "Following ✓" : "Follow"}
                </button>
              </div>

              {/* Rank 1 (Tallest) */}
              <div className="bg-white dark:bg-[#0f172a] border-2 border-amber-500 rounded-2xl p-6 text-center space-y-3 relative hover:shadow-md transition-all duration-300 md:order-2 md:-translate-y-2">
                <div className="absolute top-3 left-3 text-sm font-extrabold text-amber-500">#1</div>
                <div className="h-14 w-14 rounded-full bg-amber-500/10 text-amber-550 flex items-center justify-center mx-auto text-base font-bold border-2 border-amber-500">
                  RS
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-950 dark:text-white">{MOCK_TOP_CONTRIBUTORS[0].name}</h3>
                  <p className="text-[9px] text-gray-400 font-semibold">{MOCK_TOP_CONTRIBUTORS[0].role}</p>
                  <p className="text-[9px] text-gray-500 font-semibold">{MOCK_TOP_CONTRIBUTORS[0].country}</p>
                </div>
                <span className="text-[8px] bg-amber-500 text-gray-950 px-2 py-0.5 rounded font-mono font-bold block mx-auto w-max">
                  {MOCK_TOP_CONTRIBUTORS[0].badge}
                </span>
                <div className="text-sm font-extrabold text-amber-600">{MOCK_TOP_CONTRIBUTORS[0].points} pts</div>
                <button
                  onClick={() => handleFollowReader(MOCK_TOP_CONTRIBUTORS[0].name)}
                  className={`w-full text-[9px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                    followedReaders.includes(MOCK_TOP_CONTRIBUTORS[0].name)
                      ? "bg-amber-500 text-gray-950 border-amber-500 shadow-xs"
                      : "bg-gray-50 dark:bg-gray-900 text-gray-655 dark:text-gray-300 border-gray-200 dark:border-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {followedReaders.includes(MOCK_TOP_CONTRIBUTORS[0].name) ? "Following ✓" : "Follow"}
                </button>
              </div>

              {/* Rank 3 */}
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 text-center space-y-3 relative hover:border-amber-500 transition-all duration-300 md:order-3">
                <div className="absolute top-3 left-3 text-sm font-extrabold text-gray-300">#3</div>
                <div className="h-12 w-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-650 dark:text-slate-350 flex items-center justify-center mx-auto text-sm font-bold border-2 border-amber-600/30">
                  SS
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white">{MOCK_TOP_CONTRIBUTORS[2].name}</h3>
                  <p className="text-[9px] text-gray-400">{MOCK_TOP_CONTRIBUTORS[2].role}</p>
                  <p className="text-[9px] text-gray-500 font-semibold">{MOCK_TOP_CONTRIBUTORS[2].country}</p>
                </div>
                <span className="text-[8px] bg-slate-100 dark:bg-slate-900 text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded font-mono font-bold block mx-auto w-max">
                  {MOCK_TOP_CONTRIBUTORS[2].badge}
                </span>
                <div className="text-xs font-bold text-amber-600">{MOCK_TOP_CONTRIBUTORS[2].points} pts</div>
                <button
                  onClick={() => handleFollowReader(MOCK_TOP_CONTRIBUTORS[2].name)}
                  className={`w-full text-[9px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                    followedReaders.includes(MOCK_TOP_CONTRIBUTORS[2].name)
                      ? "bg-amber-500 text-gray-950 border-amber-500 shadow-xs"
                      : "bg-gray-50 dark:bg-gray-900 text-gray-655 dark:text-gray-300 border-gray-205 dark:border-gray-800 hover:bg-gray-100"
                  }`}
                >
                  {followedReaders.includes(MOCK_TOP_CONTRIBUTORS[2].name) ? "Following ✓" : "Follow"}
                </button>
              </div>

            </div>

            {/* List Table for ranks 4-6 */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-2xs mt-4">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50 dark:bg-gray-900 text-[9px] font-bold text-gray-450 uppercase tracking-wider border-b border-gray-200 dark:border-gray-800">
                    <th className="p-3">Rank</th>
                    <th className="p-3">Name</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Country</th>
                    <th className="p-3">Points</th>
                    <th className="p-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-gray-850">
                  {MOCK_TOP_CONTRIBUTORS.slice(3).map((r) => (
                    <tr key={r.rank} className="hover:bg-gray-50/50 dark:hover:bg-gray-900/20 text-xs">
                      <td className="p-3 font-bold text-gray-400">#{r.rank}</td>
                      <td className="p-3 font-bold text-gray-900 dark:text-white">{r.name}</td>
                      <td className="p-3 text-gray-500 font-semibold">{r.role}</td>
                      <td className="p-3 text-gray-405">{r.country}</td>
                      <td className="p-3 text-amber-600 font-extrabold">{r.points} pts</td>
                      <td className="p-3 text-right">
                        <button
                          onClick={() => handleFollowReader(r.name)}
                          className={`text-[9px] font-bold px-2.5 py-1 rounded transition-all cursor-pointer border ${
                            followedReaders.includes(r.name)
                              ? "bg-amber-500 text-gray-950 border-amber-500"
                              : "bg-white dark:bg-gray-900 text-gray-600 border-gray-200 hover:border-amber-500"
                          }`}
                        >
                          {followedReaders.includes(r.name) ? "Following ✓" : "Follow"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TWO-COLUMN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT / MAIN COLUMN (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 05. MOST ENGAGED READERS */}
            {(activeCategory === "All" || activeCategory === "Most Engaged") && (
              <section className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="h-4.5 w-4.5 text-blue-500" />
                    Most Engaged Readers
                  </h2>
                  <p className="text-[10px] text-gray-550">Active participation across discussions, saves, and community activities.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_ENGAGED_READERS.map((r, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex justify-between items-center hover:border-blue-500 transition-all duration-300 shadow-2xs">
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{r.name}</h4>
                        <p className="text-[9px] text-gray-400 font-semibold">{r.role} · {r.country}</p>
                        <div className="flex gap-3 text-[10px] text-gray-500 pt-1.5">
                          <span>Saves: <strong>{r.saves}</strong></span>
                          <span>Polls: <strong>{r.polls}</strong></span>
                          <span>Events: <strong>{r.events}</strong></span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFollowReader(r.name)}
                        className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          followedReaders.includes(r.name)
                            ? "bg-blue-600 text-white border-blue-500"
                            : "bg-gray-50 dark:bg-gray-900 text-gray-600 border-gray-200 hover:border-blue-500"
                        }`}
                      >
                        {followedReaders.includes(r.name) ? "Following ✓" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 06. MOST HELPFUL READERS */}
            {(activeCategory === "All" || activeCategory === "Most Helpful") && (
              <section className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Check className="h-4.5 w-4.5 text-emerald-500" />
                    Most Helpful Readers
                  </h2>
                  <p className="text-[10px] text-gray-550">Recognizing readers whose answers are helping others across compliance and advisory logs.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_HELPFUL_READERS.map((r, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex justify-between items-center hover:border-emerald-500 transition-all duration-300 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{r.name}</h4>
                          <span className="text-[7px] bg-emerald-500/10 text-emerald-500 px-1 rounded uppercase tracking-wider">Help Expert</span>
                        </div>
                        <p className="text-[9px] text-gray-405 font-semibold">{r.role} · {r.country}</p>
                        <div className="flex gap-3 text-[10px] text-gray-550 pt-1.5">
                          <span>Accepted Answers: <strong className="text-emerald-600">{r.acceptedAnswers}</strong></span>
                          <span>Score: <strong className="text-emerald-650">{r.feedbackScore}</strong></span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFollowReader(r.name)}
                        className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          followedReaders.includes(r.name)
                            ? "bg-emerald-600 text-white border-emerald-500"
                            : "bg-gray-50 dark:bg-gray-900 text-gray-655 border-gray-205 hover:border-emerald-500"
                        }`}
                      >
                        {followedReaders.includes(r.name) ? "Following ✓" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 07. TOP DISCUSSION PARTICIPANTS */}
            {(activeCategory === "All" || activeCategory === "Discussion Leaders") && (
              <section className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
                  <div>
                    <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <MessageSquare className="h-4.5 w-4.5 text-indigo-500" />
                      Top Discussion Participants
                    </h2>
                    <p className="text-[10px] text-gray-500">Readers with high contribution frequency inside bilateral discussions.</p>
                  </div>
                  <Link href="/en/poc-v2/discussions" className="text-[10px] font-bold text-indigo-650 hover:underline">
                    View Top Discussions →
                  </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: "Kamil Al-Mansoori", role: "Legal Advisor", country: "UAE", posts: 86 },
                    { name: "Rajesh Sharma", role: "Analyst", country: "India", posts: 74 },
                    { name: "Yuki Tanaka", role: "Manager", country: "Japan", posts: 62 }
                  ].map((r, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 space-y-3 hover:border-indigo-500 transition-all duration-300">
                      <div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white">{r.name}</h4>
                        <p className="text-[9px] text-gray-400">{r.role} · {r.country}</p>
                      </div>
                      <div className="text-xs font-bold text-indigo-600">{r.posts} meaningful posts</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 08. RISING READERS */}
            {(activeCategory === "All" || activeCategory === "Rising Readers") && (
              <section className="space-y-4">
                <div className="border-b border-gray-200 dark:border-gray-800 pb-3">
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                    <TrendingUp className="h-4.5 w-4.5 text-purple-500" />
                    Rising Readers
                  </h2>
                  <p className="text-[10px] text-gray-550">Strong recent participation growth and activity momentum.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {MOCK_RISING_READERS.map((r, idx) => (
                    <div key={idx} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex justify-between items-center hover:border-purple-500 transition-all duration-300 shadow-2xs">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-xs font-bold text-gray-900 dark:text-white">{r.name}</h4>
                          <span className="text-[8px] font-bold text-purple-500 font-mono">Rising ↑</span>
                        </div>
                        <p className="text-[9px] text-gray-400">{r.role} · {r.country}</p>
                        <div className="flex gap-3 text-[10px] text-gray-500 pt-1">
                          <span>Growth: <strong className="text-purple-650">{r.growth}</strong></span>
                          <span>Pts this week: <strong>{r.pointsThisWeek}</strong></span>
                        </div>
                      </div>
                      <button
                        onClick={() => handleFollowReader(r.name)}
                        className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                          followedReaders.includes(r.name)
                            ? "bg-purple-650 text-white border-purple-500"
                            : "bg-gray-50 dark:bg-gray-900 text-gray-655 border-gray-205 hover:border-purple-500"
                        }`}
                      >
                        {followedReaders.includes(r.name) ? "Following ✓" : "Follow"}
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 09. TOP COMMUNITY DISCUSSIONS */}
            <section className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex justify-between items-center">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="h-4.5 w-4.5 text-indigo-505" />
                  Top discussions
                </h2>
                <span className="text-[10px] text-gray-400">Total comments ranking</span>
              </div>

              <div className="space-y-3">
                {MOCK_TOP_DISCUSSIONS.map((disc) => (
                  <div key={disc.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 rounded-2xl shadow-xs p-4 flex justify-between items-center hover:border-indigo-500 transition-all duration-300">
                    <div className="space-y-1">
                      <span className="text-[8px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{disc.category}</span>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{disc.title}</h4>
                      <p className="text-[10px] text-gray-405">{disc.replies} replies · {disc.saves} saves</p>
                    </div>
                    <button
                      onClick={() => alert(`Entering discussion: ${disc.title}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-[9px] px-3.5 py-2 rounded-xl transition-all cursor-pointer shrink-0"
                    >
                      View Discussion →
                    </button>
                  </div>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT SIDEBAR COLUMN (1/3) */}
          <div className="space-y-8">
            
            {/* 10. TRENDING READER TOPICS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <TrendingUp className="h-4.5 w-4.5 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Trending Reader Topics</h4>
              </div>
              
              <div className="space-y-2.5">
                {[
                  { name: "AI Adoption", status: "Rising ↑", count: "124 posts this week" },
                  { name: "Global Trade Corridors", status: "Rising ↑", count: "98 posts this week" },
                  { name: "Customs Tariff Laws", status: "Steady →", count: "64 posts this week" }
                ].map((topic) => (
                  <div key={topic.name} className="p-3 rounded-xl border border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/30 flex justify-between items-center">
                    <div>
                      <h5 className="text-[11px] font-bold text-gray-955 dark:text-white">{topic.name}</h5>
                      <p className="text-[9px] text-gray-400">{topic.count}</p>
                    </div>
                    <span className="text-[9px] font-bold text-amber-600">{topic.status}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 11. READER RECOGNITION */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Star className="h-4.5 w-4.5 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Reader Recognition</h4>
              </div>
              
              <div className="space-y-3">
                {[
                  { name: "Dr. Ananya Varma", role: "Community Expert", desc: "Recognized for providing 47 accepted answers to compliance logs." },
                  { name: "Elena Petrova", role: "Knowledge Contributor", desc: "Consistently posts high quality shipping corridor case files." }
                ].map((r, idx) => (
                  <div key={idx} className="p-3 rounded-xl border border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/30 space-y-1">
                    <h5 className="text-[11px] font-bold text-gray-955 dark:text-white">{r.name}</h5>
                    <span className="text-[8px] bg-amber-500/10 text-amber-600 px-2 py-0.5 rounded font-mono font-bold block w-max uppercase mb-1.5">{r.role}</span>
                    <p className="text-[10px] text-gray-405 leading-relaxed">{r.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 12. COMMUNITY ACTIVITY INSIGHTS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-3 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Globe className="h-4.5 w-4.5 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Reader Community Insights</h4>
              </div>
              <p className="text-[10px] text-gray-500">Weekly forum topic heatmaps inside public B2B discussion boards.</p>
              
              <div className="space-y-2.5 pt-2">
                <div className="p-3 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-100 dark:border-gray-850">
                  <div className="text-[10px] font-bold text-emerald-600 uppercase">AI Grid Optimization</div>
                  <p className="text-[10px] text-gray-400 pt-0.5">Discussions surrounding custom robotics controllers and hardware designs show a 42% volume growth.</p>
                </div>
              </div>
              <Link href="/en/about-igen/reader-plans" className="text-[10px] font-bold text-emerald-600 hover:underline pt-2 block text-center">
                Explore Reader Intelligence →
              </Link>
            </div>

            {/* 14. READER PRO CTA */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl shadow-xs p-5 border-l-4 border-purple-600 space-y-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-purple-650 uppercase tracking-widest">Upgrade Option</span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Go Further With Reader Pro</h4>
              </div>

              <div className="space-y-2 text-[10px] text-gray-500">
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-emerald-500" /> Premium Discussions
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-emerald-500" /> Advanced Community Insights
                </div>
                <div className="flex items-center gap-1">
                  <Check className="h-3 w-3 text-emerald-500" /> Premium Analyst Reports
                </div>
              </div>

              <button
                onClick={() => alert("Redirecting to upgrade checkout form...")}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                Upgrade to Reader Pro
              </button>
            </div>

          </div>
        </div>

        {/* 13. PREMIUM READER INTELLIGENCE */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-8 mt-8 relative overflow-hidden shadow-2xs">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-1.5">
              <Lock className="h-4.5 w-4.5 text-purple-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Unlock Advanced Reader Community Insights 🔒</h4>
            </div>
            <p className="text-[10px] text-gray-500">Compare historical participation metrics, trending topics, and contribution quality graphs.</p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 filter blur-xs opacity-40 select-none">
              {[
                { label: "Historical Trends", val: "Locked" },
                { label: "Reader Analytics", val: "Locked" },
                { label: "Custom Filters", val: "Locked" },
                { label: "Premium Reports", val: "Locked" }
              ].map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 border rounded-xl text-center">
                  <div className="text-[9px] font-bold text-gray-400 uppercase">{item.label}</div>
                  <div className="text-xs font-extrabold">{item.val}</div>
                </div>
              ))}
            </div>

            <div className="bg-purple-950/40 border border-purple-900/30 p-4 rounded-xl text-center max-w-2xl mx-auto space-y-1.5">
              <h5 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">🔒 PRO INTEL PREVIEW</h5>
              <p className="text-[9px] text-purple-300 leading-normal">
                Historical grid charts comparing compliance log accepted answer percentages by corridor location.
              </p>
              <button
                onClick={() => alert("Redirecting to checkout plan panel...")}
                className="bg-purple-600 hover:bg-purple-700 text-white font-bold text-[10px] px-4 py-1.5 rounded-lg mt-1 cursor-pointer"
              >
                Unlock Reader Pro →
              </button>
            </div>
          </div>
        </section>

        {/* 15. BECOME A TOP READER CTA */}
        <section className="bg-gradient-to-r from-amber-900/10 via-amber-900/15 to-gray-900/20 border border-amber-900/30 rounded-2xl p-8 text-center mb-8 space-y-4">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Want to Become a Top Reader?</h3>
            <p className="text-xs text-gray-550 leading-relaxed max-w-xl mx-auto font-normal">
              Share knowledge, participate in discussions and help others across the Reader Community. Follow the progression steps to get recognized.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-6 gap-3.5 max-w-4xl mx-auto text-center pt-2">
            {[
              { step: "1. READ", desc: "Access recommended compliance articles" },
              { step: "2. PARTICIPATE", desc: "Vote in polls and attend webinars" },
              { step: "3. CONTRIBUTE", desc: "Log compliance queries in the feed" },
              { step: "4. HELP OTHERS", desc: "Answer logistics corridor queries" },
              { step: "5. BUILD REPUTATION", desc: "Earn verified expert status badges" },
              { step: "6. GET RECOGNIZED", desc: "Appear on the Top Reader list" }
            ].map((p, idx) => (
              <div key={idx} className="p-3 bg-white dark:bg-gray-950 border border-gray-200 dark:border-gray-800 rounded-xl space-y-1 relative group">
                <h5 className="text-[9px] font-bold text-amber-600 uppercase font-mono">{p.step}</h5>
                <p className="text-[9px] text-gray-400 font-medium leading-tight">{p.desc}</p>
                {idx < 5 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 -translate-y-1/2 z-20 text-gray-300">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-2.5 pt-3">
            <Link
              href="/en/poc-v2/communities/reader/all"
              className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Start Contributing
            </Link>
            <Link
              href="/en/poc-v2/communities/reader/all"
              className="bg-white/5 border border-white/10 text-slate-700 dark:text-slate-300 hover:bg-white/10 font-bold text-xs px-5 py-2.5 rounded-xl transition-all"
            >
              Explore All Readers
            </Link>
          </div>
        </section>

        {/* 16. READER COMMUNITY NEWSLETTER */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 text-center space-y-4">
          <div className="max-w-md mx-auto space-y-2">
            <Mail className="h-6 w-6 text-amber-500 mx-auto" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Top Reader & Community Brief</h3>
            <p className="text-[11px] text-gray-500">Get the latest community leaders, trending discussions, rising topics and important reader conversations.</p>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-emerald-500/15 border border-emerald-500/20 p-2.5 rounded-xl max-w-sm mx-auto text-xs font-semibold text-emerald-600 dark:text-emerald-450 animate-pulse">
              ✓ Subscribed successfully to the Top Reader & Community Brief!
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (newsletterEmail.trim().includes("@")) {
                  setNewsletterSubscribed(true);
                  setNewsletterEmail("");
                }
              }}
              className="flex gap-2 max-w-md mx-auto"
            >
              <input
                type="email"
                required
                placeholder="Enter work email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-hidden dark:text-white"
              />
              <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold text-xs px-4 rounded-xl cursor-pointer">
                Subscribe
              </button>
            </form>
          )}
        </section>

        {/* 17. SPONSORED RECOGNITION / CONTENT */}
        <section className="bg-gray-50 dark:bg-gray-900/45 border border-gray-200 dark:border-gray-808 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-550/20">Sponsored Recognition</span>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white pt-1">Featured Community Knowledge Session: Exporter Corridors</h4>
            <p className="text-[10px] text-gray-405">Presented by Standard Chartered B2B Advisory Group</p>
          </div>
          <button
            onClick={() => alert("Redirecting to sponsored advisory session information...")}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-955 hover:bg-black font-bold text-xs px-4 py-2 rounded-xl shrink-0 transition-all cursor-pointer"
          >
            Learn More →
          </button>
        </section>

      </main>
    </>
  );
}
