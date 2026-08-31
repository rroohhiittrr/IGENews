"use client";

import Link from "next/link";
import {
  Search,
  Check,
  Sparkles,
  Plus,
  Lock,
  Mail,
  HelpCircle,
  Award,
  TrendingUp,
  Users,
  MessageSquare,
  Briefcase,
  Calendar,
  Zap,
  Globe,
  Star,
  ThumbsUp,
  Bookmark,
  Share2,
  LockKeyhole
} from "lucide-react";
import { useState, type Dispatch, type SetStateAction } from "react";

// Mock Data
const MOCK_RECOMMENDED_ARTICLES = [
  { id: "art-1", title: "EU Updates Phytochemical Screening Protocols for Botanical Imports", summary: "New heavy metal limits set to disrupt traditional import corridors starting next month.", category: "Compliance", readTime: "5 min read", industry: "Pharmaceuticals", country: "Germany" },
  { id: "art-2", title: "IMEC Multimodal Corridor: Emerging Shipping Hubs & Rail Links", summary: "How rail connectivity through Middle East aims to offset recent maritime rate spikes.", category: "Global Trade", readTime: "8 min read", industry: "Logistics & Supply Chain", country: "India" },
  { id: "art-3", title: "AI Adoption Trends in Middle Market Manufacturing Units", summary: "A review of sovereign datacenter setups and custom robotics controllers in Q3 2026.", category: "Technology", readTime: "6 min read", industry: "Industrial Automation", country: "UAE" }
];

const MOCK_DISCUSSIONS = [
  { id: "disc-1", title: "Should India accelerate semiconductor equipment import tariff exemptions?", category: "Trade Policy", replies: 124, saves: 48, author: "Rajesh Sharma", location: "India 🇮🇳", lastActive: "10m ago" },
  { id: "disc-2", title: "Impact of new GoI Phytochemical export benchmarks on small scale units", category: "Compliance", replies: 86, saves: 32, author: "Dr. Ananya Varma", location: "India 🇮🇳", lastActive: "2h ago" },
  { id: "disc-3", title: "Navigating GCC CEPA Corridors: Opportunities for Tech Founders", category: "Expansion", replies: 64, saves: 29, author: "Kamil Al-Mansoori", location: "UAE 🇦🇪", lastActive: "4h ago" }
];

const MOCK_READERS = [
  { name: "Sultan Ahmed bin Sulayem", role: "DP World Executive", country: "UAE 🇦🇪", interests: ["Global Trade", "Logistics", "Customs"] },
  { name: "Rajesh Sharma", role: "Semicon Industry Analyst", country: "India 🇮🇳", interests: ["Technology", "Semiconductors", "Sovereign AI"] },
  { name: "Elena Petrova", role: "Clean Energy Infrastructure Expert", country: "Germany 🇩🇪", interests: ["Energy", "ESG Compliance", "Logistics"] },
  { name: "Lin Xiao", role: "Structured Finance Specialist", country: "Singapore 🇸🇬", interests: ["Finance", "Trade Corridor", "Legal"] }
];

const MOCK_EVENTS = [
  { id: "evt-1", title: "Global Trade Webinar: CEPA Corridor Tariffs AMA", date: "Sep 12 · 6:00 PM (IST)", speaker: "Meera Deshmukh (Trade Specialist)", type: "Webinar" },
  { id: "evt-2", title: "AI Automation Masterclass for manufacturing SMEs", date: "Sep 18 · 4:30 PM (GST)", speaker: "Dr. Aris Thorne (AI Consultant)", type: "Workshop" }
];

interface AllReaderProps {
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

export default function SMEAllReaderView({
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
}: AllReaderProps) {

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [filterIndustry, setFilterIndustry] = useState("All");
  const [filterCountry, setFilterCountry] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [searchTriggered, setSearchTriggered] = useState(false);

  // Interaction States
  const [likedFeeds, setLikedFeeds] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [followedReaders, setFollowedReaders] = useState<string[]>([]);
  const [followedTopics, setFollowedTopics] = useState<string[]>([]);
  const [pollVoted, setPollVoted] = useState<string | null>(null);
  
  // Custom user posts feed state (simulated)
  const [userQuestionsList, setUserQuestionsList] = useState<any[]>([]);

  // Challenges progress simulation
  const [challengeProgress1, setChallengeProgress1] = useState(1); // 1 out of 5 questions
  const [challengeProgress2, setChallengeProgress2] = useState(3); // 3 out of 7 tasks

  const handleJoinCommunity = () => {
    setIsJoined(true);
    setJoinedSuccessMsg(true);
    setTimeout(() => setJoinedSuccessMsg(false), 4000);
  };

  const handleLikeFeed = (id: string) => {
    if (likedFeeds.includes(id)) {
      setLikedFeeds(likedFeeds.filter(feedId => feedId !== id));
    } else {
      setLikedFeeds([...likedFeeds, id]);
    }
  };

  const handleSaveArticle = (id: string) => {
    if (savedArticles.includes(id)) {
      setSavedArticles(savedArticles.filter(artId => artId !== id));
    } else {
      setSavedArticles([...savedArticles, id]);
    }
  };

  const handleFollowThread = (id: string) => {
    if (followedThreads.includes(id)) {
      setFollowedThreads(followedThreads.filter(tId => tId !== id));
    } else {
      setFollowedThreads([...followedThreads, id]);
    }
  };

  const handleFollowReader = (name: string) => {
    if (followedReaders.includes(name)) {
      setFollowedReaders(followedReaders.filter(n => n !== name));
    } else {
      setFollowedReaders([...followedReaders, name]);
    }
  };

  const handleFollowTopic = (topic: string) => {
    if (followedTopics.includes(topic)) {
      setFollowedTopics(followedTopics.filter(t => t !== topic));
    } else {
      setFollowedTopics([...followedTopics, topic]);
    }
  };

  const handleRegisterEvent = (id: string) => {
    if (registeredEventIds.includes(id)) {
      setRegisteredEventIds(registeredEventIds.filter(evtId => evtId !== id));
    } else {
      setRegisteredEventIds([...registeredEventIds, id]);
    }
  };

  const handleAskSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionText.trim()) return;
    const newQ = {
      id: `q-${Date.now()}`,
      title: newQuestionText,
      category: newQuestionCategory,
      author: "You (Community Member)",
      replies: 0,
      saves: 0,
      lastActive: "Just now"
    };
    setUserQuestionsList([newQ, ...userQuestionsList]);
    setNewQuestionText("");
    setIsAskDialogOpen(false);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim().includes("@")) {
      setNewsletterSubscribed(true);
      setNewsletterEmail("");
    }
  };

  // Perform search matching
  const hasSearch = searchQuery.trim().length > 0 || filterIndustry !== "All" || filterCountry !== "All" || filterType !== "All";

  const matchedArticles = MOCK_RECOMMENDED_ARTICLES.filter(art => {
    const matchesSearch = searchQuery ? art.title.toLowerCase().includes(searchQuery.toLowerCase()) || art.summary.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesIndustry = filterIndustry === "All" || art.industry === filterIndustry;
    const matchesCountry = filterCountry === "All" || art.country === filterCountry;
    const matchesType = filterType === "All" || filterType === "Articles";
    return matchesSearch && matchesIndustry && matchesCountry && matchesType;
  });

  const matchedDiscussions = MOCK_DISCUSSIONS.filter(disc => {
    const matchesSearch = searchQuery ? disc.title.toLowerCase().includes(searchQuery.toLowerCase()) || disc.category.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesIndustry = filterIndustry === "All" || (filterIndustry === "Pharmaceuticals" && disc.category === "Compliance") || (filterIndustry === "Technology" && disc.category === "Trade Policy");
    const matchesCountry = filterCountry === "All" || (filterCountry === "India" && disc.location.includes("India")) || (filterCountry === "UAE" && disc.location.includes("UAE"));
    const matchesType = filterType === "All" || filterType === "Discussions";
    return matchesSearch && matchesIndustry && matchesCountry && matchesType;
  });

  const matchedReaders = MOCK_READERS.filter(r => {
    const matchesSearch = searchQuery ? r.name.toLowerCase().includes(searchQuery.toLowerCase()) || r.role.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesCountry = filterCountry === "All" || (filterCountry === "India" && r.country.includes("India")) || (filterCountry === "UAE" && r.country.includes("UAE")) || (filterCountry === "Germany" && r.country.includes("Germany")) || (filterCountry === "Singapore" && r.country.includes("Singapore"));
    const matchesType = filterType === "All" || filterType === "Readers";
    return matchesSearch && matchesCountry && matchesType;
  });

  const matchedEvents = MOCK_EVENTS.filter(evt => {
    const matchesSearch = searchQuery ? evt.title.toLowerCase().includes(searchQuery.toLowerCase()) || evt.speaker.toLowerCase().includes(searchQuery.toLowerCase()) : true;
    const matchesType = filterType === "All" || filterType === "Events";
    return matchesSearch && matchesType;
  });

  return (
    <>
      {/* 01. READER COMMUNITY HERO */}
      <section className="bg-gradient-to-br from-[#0c1f3b] via-[#102a50] to-[#070b13] text-white relative overflow-hidden border-b border-gray-805">
        <div className="absolute inset-0 opacity-5 bg-[radial-gradient(circle_at_1px_1px,white_1px,transparent_0)] [background-size:28px_28px]" />
        <div className="relative z-10 mx-auto max-w-7xl px-4 py-12 lg:px-6">
          <div className="flex flex-col lg:flex-row gap-8 justify-between lg:items-center">
            
            <div className="space-y-4 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="text-[9px] font-mono font-bold bg-emerald-600 text-white px-2.5 py-0.5 rounded uppercase tracking-wider">
                  READER COMMUNITY
                </span>
                <span className="text-[9px] text-slate-350 bg-white/5 border border-white/10 px-2 py-0.5 rounded">
                  B2B Knowledge Hub
                </span>
              </div>
              <h1 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                Discover. Read. Discuss.
              </h1>
              <p className="text-slate-300 text-sm md:text-base font-normal max-w-2xl leading-relaxed">
                Discover important stories, exchange ideas, participate in conversations and connect with readers across the IGEN ecosystem.
              </p>

              <div className="flex flex-wrap gap-2.5 pt-2">
                <button
                  onClick={handleJoinCommunity}
                  className={`text-xs font-bold px-4 py-2.5 rounded-xl border transition-all cursor-pointer shadow-xs ${
                    isJoined 
                      ? "bg-emerald-600 text-white border-emerald-500" 
                      : "bg-blue-600 text-white border-blue-500 hover:bg-blue-700"
                  }`}
                >
                  {isJoined ? "Joined Community ✓" : "Join the Community →"}
                </button>
                <a
                  href="#discussions"
                  className="bg-white/5 text-slate-200 border border-white/10 text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-white/10 transition-all cursor-pointer"
                >
                  Explore Discussions →
                </a>
              </div>

              {joinedSuccessMsg && (
                <div className="text-[11px] text-emerald-400 bg-emerald-950/30 border border-emerald-900/50 p-2.5 rounded-lg max-w-md animate-pulse">
                  Welcome to the Reader Community. Your profile is now set to active community participation mode.
                </div>
              )}
            </div>

            {/* Quick Pulse Cards */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-5 lg:w-72 shrink-0 backdrop-blur-xs">
              <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-3.5 pb-2 border-b border-white/5">
                Active Signals
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-lg font-bold text-white">42</div>
                  <div className="text-[10px] text-slate-400 font-medium">Discussions Active</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">12</div>
                  <div className="text-[10px] text-slate-400 font-medium">Topics Followed</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">8</div>
                  <div className="text-[10px] text-slate-400 font-medium">New Articles</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-white">2</div>
                  <div className="text-[10px] text-slate-400 font-medium">Active Challenges</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02. READER COMMUNITY NAVIGATION */}
      <section className="bg-white dark:bg-[#0b101c] border-b border-gray-205 py-2">
        <div className="mx-auto max-w-7xl px-4 lg:px-6">
          <div className="flex gap-4">
            <span className="text-xs font-bold border-b-2 border-emerald-600 text-emerald-650 dark:text-emerald-400 pb-1 cursor-default">
              All Readers (Discovery Feed)
            </span>
            <Link
              href="/en/poc-v2/communities/reader/top"
              className="text-xs font-bold text-gray-400 hover:text-gray-600 pb-1"
            >
              Top Readers Board (Rankings)
            </Link>
          </div>
        </div>
      </section>

      {/* MAIN LAYOUT BODY */}
      <main className="mx-auto max-w-7xl px-4 py-8 lg:px-6">
        
        {/* 03. COMMUNITY SEARCH & FILTERS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-8 space-y-4 shadow-2xs">
          <div className="flex items-center gap-2">
            <Search className="h-4.5 w-4.5 text-emerald-600" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">
              Community Search Desk
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="relative md:col-span-2">
              <input
                type="text"
                placeholder="Search articles, discussions, topics and readers..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSearchTriggered(true);
                }}
                className="w-full pl-9 pr-4 py-2.5 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:border-emerald-500 focus:outline-hidden dark:text-white"
              />
              <Search className="absolute left-3 top-3 h-3.5 w-3.5 text-gray-400" />
            </div>

            <div>
              <select
                value={filterIndustry}
                onChange={(e) => {
                  setFilterIndustry(e.target.value);
                  setSearchTriggered(true);
                }}
                className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 focus:outline-hidden dark:text-white font-bold"
              >
                <option value="All">All Industries</option>
                <option value="Pharmaceuticals">Pharmaceuticals</option>
                <option value="Logistics & Supply Chain">Logistics</option>
                <option value="Industrial Automation">Industrial Automation</option>
              </select>
            </div>

            <div>
              <select
                value={filterCountry}
                onChange={(e) => {
                  setFilterCountry(e.target.value);
                  setSearchTriggered(true);
                }}
                className="w-full text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2.5 focus:outline-hidden dark:text-white font-bold"
              >
                <option value="All">All Countries</option>
                <option value="India">India</option>
                <option value="Singapore">Singapore</option>
                <option value="UAE">UAE</option>
                <option value="Germany">Germany</option>
              </select>
            </div>
          </div>

          <div className="flex gap-2 items-center flex-wrap pt-1 border-t border-gray-100 dark:border-gray-850">
            <span className="text-[9px] font-bold text-gray-400 uppercase mr-2">Type Filter:</span>
            {["All", "Articles", "Discussions", "Readers", "Events"].map((t) => (
              <button
                key={t}
                onClick={() => {
                  setFilterType(t);
                  setSearchTriggered(true);
                }}
                className={`text-[9px] font-bold px-2 py-1 rounded border transition-all cursor-pointer ${
                  filterType === t
                    ? "bg-emerald-600 text-white border-emerald-500 shadow-xs"
                    : "bg-gray-50 dark:bg-gray-900 text-gray-500 border-gray-200 dark:border-gray-800 hover:bg-gray-100"
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Categorized Search Results */}
          {searchTriggered && hasSearch && (
            <div className="bg-gray-50 dark:bg-gray-950 p-4 rounded-xl border border-gray-150 dark:border-gray-850 space-y-4 animate-in fade-in duration-200">
              <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-800 pb-2">
                <span className="text-[10px] font-bold text-gray-400 uppercase">Search Results Overview</span>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setFilterIndustry("All");
                    setFilterCountry("All");
                    setFilterType("All");
                    setSearchTriggered(false);
                  }}
                  className="text-[9px] font-bold text-red-500 hover:underline cursor-pointer"
                >
                  Clear Search
                </button>
              </div>

              {/* Articles Section */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <span className="text-[8px] font-bold text-emerald-600 uppercase tracking-widest block">ARTICLES ({matchedArticles.length})</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchedArticles.map((art) => (
                      <div key={art.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{art.title}</h4>
                        <p className="text-[9px] text-gray-400">{art.industry} · {art.readTime}</p>
                        <button onClick={() => alert(`Reading article: ${art.title}`)} className="text-[9px] font-bold text-emerald-600 hover:underline pt-1 block">Read Article →</button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Discussions Section */}
              {matchedDiscussions.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-200/50 dark:border-gray-850">
                  <span className="text-[8px] font-bold text-indigo-500 uppercase tracking-widest block">DISCUSSIONS ({matchedDiscussions.length})</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchedDiscussions.map((disc) => (
                      <div key={disc.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{disc.title}</h4>
                        <p className="text-[9px] text-gray-400">{disc.replies} replies · Last active {disc.lastActive}</p>
                        <a href="#discussions" className="text-[9px] font-bold text-indigo-650 hover:underline pt-1 block">View Discussion →</a>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Readers Section */}
              {matchedReaders.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-200/50 dark:border-gray-855">
                  <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest block">READERS ({matchedReaders.length})</span>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {matchedReaders.map((r, idx) => (
                      <div key={idx} className="p-2.5 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] space-y-1">
                        <h5 className="text-[11px] font-bold text-gray-900 dark:text-white leading-tight">{r.name}</h5>
                        <p className="text-[9px] text-gray-400 font-medium">{r.role}</p>
                        <button
                          onClick={() => handleFollowReader(r.name)}
                          className="text-[9px] font-bold text-emerald-600 hover:underline pt-1 block"
                        >
                          {followedReaders.includes(r.name) ? "Following ✓" : "Follow Profile"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events Section */}
              {matchedEvents.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-gray-200/50 dark:border-gray-850">
                  <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest block">EVENTS ({matchedEvents.length})</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {matchedEvents.map((evt) => (
                      <div key={evt.id} className="p-3 rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0f172a] space-y-1">
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-tight">{evt.title}</h4>
                        <p className="text-[9px] text-gray-400">{evt.speaker} · {evt.date}</p>
                        <button
                          onClick={() => handleRegisterEvent(evt.id)}
                          className="text-[9px] font-bold text-blue-600 hover:underline pt-1 block"
                        >
                          {registeredEventIds.includes(evt.id) ? "✓ Registered" : "Register Event →"}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {matchedArticles.length === 0 && matchedDiscussions.length === 0 && matchedReaders.length === 0 && matchedEvents.length === 0 && (
                <div className="text-center py-6 text-xs text-gray-400 font-bold">
                  No records match your query. Try adjusting your parameters.
                </div>
              )}
            </div>
          )}
        </section>

        {/* 04. COMMUNITY PULSE */}
        <section className="grid grid-cols-2 md:grid-cols-5 gap-3.5 mb-8">
          {[
            { label: "Active Discussions", count: "42 threads", color: "border-indigo-500/20 bg-indigo-500/5 text-indigo-500" },
            { label: "Trending Topics", count: "12 tags active", color: "border-emerald-500/20 bg-emerald-500/5 text-emerald-500" },
            { label: "New Articles", count: "8 published", color: "border-amber-500/20 bg-amber-500/5 text-amber-500" },
            { label: "Upcoming Events", count: "2 AMA sessions", color: "border-blue-500/20 bg-blue-500/5 text-blue-500" },
            { label: "Active Challenges", count: "2 live now", color: "border-purple-500/20 bg-purple-500/5 text-purple-500" }
          ].map((pulse, idx) => (
            <div key={idx} className={`p-4 rounded-2xl border text-center space-y-1 ${pulse.color}`}>
              <h4 className="text-[10px] font-bold uppercase tracking-wider text-gray-400">{pulse.label}</h4>
              <p className="text-xs font-extrabold">{pulse.count}</p>
            </div>
          ))}
        </section>

        {/* TWO-COLUMN CONTENT GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (2/3) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 05. COMMUNITY FEED */}
            <section id="discussions" className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <MessageSquare className="h-4.5 w-4.5 text-emerald-600" />
                  Reader Community Feed
                </h2>
                <button
                  onClick={() => setIsAskDialogOpen(true)}
                  className="text-[10px] font-bold text-emerald-600 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20 flex items-center gap-1 cursor-pointer"
                >
                  <Plus className="h-3 w-3" /> New Topic
                </button>
              </div>

              <div className="space-y-4">
                {/* Custom User Questions/Announcements in Feed */}
                {userQuestionsList.map((q) => (
                  <div key={q.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-4 bg-emerald-50/5">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 px-1.5 py-0.5 rounded uppercase">
                          {q.category}
                        </span>
                        <span className="text-[10px] text-gray-400">{q.lastActive}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-relaxed">"{q.title}"</h4>
                      <p className="text-[10px] text-gray-400 font-semibold">Started by {q.author}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[10px] text-gray-400">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleLikeFeed(q.id)}
                          className={`flex items-center gap-1 cursor-pointer font-bold ${
                            likedFeeds.includes(q.id) ? "text-emerald-500" : "hover:text-emerald-500"
                          }`}
                        >
                          <ThumbsUp className="h-3.5 w-3.5" />
                          {likedFeeds.includes(q.id) ? "Liked" : "Like"}
                        </button>
                        <button
                          onClick={() => alert(`Replying to: ${q.title}`)}
                          className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
                        >
                          <MessageSquare className="h-3.5 w-3.5" /> Comment
                        </button>
                      </div>
                      <button
                        onClick={() => handleSaveArticle(q.id)}
                        className={`cursor-pointer ${
                          savedArticles.includes(q.id) ? "text-emerald-500" : "hover:text-emerald-500"
                        }`}
                      >
                        <Bookmark className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                ))}

                {/* Prepopulated Core Feed items */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/10 px-2 py-0.5 rounded uppercase">ARTICLE DISCUSSION</span>
                      <span className="text-[10px] text-gray-400">1h ago</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                      What are the direct implications of new GoI phytochemical export regulations?
                    </h4>
                    <p className="text-[11px] text-gray-600 dark:text-gray-300">
                      Exporters will face rigorous port-level screening hubs. Exporters need third-party clearances before loading cargo.
                    </p>
                  </div>
                  <div className="pt-3 border-t border-gray-100 dark:border-gray-850 flex items-center justify-between text-[10px] text-gray-450">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLikeFeed("feed-1")}
                        className={`flex items-center gap-1 cursor-pointer font-bold ${
                          likedFeeds.includes("feed-1") ? "text-emerald-500" : "hover:text-emerald-500"
                        }`}
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        {likedFeeds.includes("feed-1") ? "Liked" : "Like"}
                      </button>
                      <button
                        onClick={() => alert("Launching discussion comment dialog...")}
                        className="flex items-center gap-1 cursor-pointer hover:text-blue-500"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Join Discussion
                      </button>
                    </div>
                    <button
                      onClick={() => handleSaveArticle("feed-1")}
                      className={`cursor-pointer ${
                        savedArticles.includes("feed-1") ? "text-emerald-500" : "hover:text-emerald-500"
                      }`}
                    >
                      <Bookmark className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase">COMMUNITY POLL</span>
                      <span className="text-[10px] text-gray-400">4h ago</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">
                      Which bilateral trade corridor will display the fastest cargo volume growth in 2027?
                    </h4>
                  </div>

                  {pollVoted ? (
                    <div className="space-y-2 pt-2 text-xs">
                      {[
                        { label: "India - GCC Corridor", pct: 54 },
                        { label: "India - Singapore Link", pct: 28 },
                        { label: "India - EU Logistics route", pct: 18 }
                      ].map((opt, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between font-bold">
                            <span>{opt.label}</span>
                            <span>{opt.pct}%</span>
                          </div>
                          <div className="w-full bg-gray-100 dark:bg-gray-800 h-2 rounded-full overflow-hidden">
                            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${opt.pct}%` }} />
                          </div>
                        </div>
                      ))}
                      <p className="text-[9px] text-gray-400 text-center pt-1">Thank you for voting. Total participants: 412 readers.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      {["India - GCC Corridor", "India - Singapore Link", "India - EU Logistics route"].map((opt) => (
                        <button
                          key={opt}
                          onClick={() => setPollVoted(opt)}
                          className="w-full text-left bg-gray-50 dark:bg-gray-900 hover:border-emerald-500 border border-gray-200 dark:border-gray-800 p-2.5 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 transition-all cursor-pointer"
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* 06. TRENDING DISCUSSIONS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <TrendingUp className="h-4.5 w-4.5 text-indigo-505" />
                  Trending Discussions
                </h2>
                <span className="text-[10px] font-bold text-slate-400">Activity index ranking</span>
              </div>

              <div className="space-y-3">
                {MOCK_DISCUSSIONS.map((disc) => {
                  const followed = followedThreads.includes(disc.id);
                  return (
                    <div key={disc.id} className="bg-white dark:bg-[#0f172a] border border-gray-205 dark:border-gray-800 rounded-2xl shadow-xs p-4 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center hover:border-indigo-500 transition-all duration-300">
                      <div className="space-y-1.5">
                        <span className="text-[8px] font-bold text-indigo-500 bg-indigo-500/10 px-2 py-0.5 rounded uppercase tracking-wider">{disc.category}</span>
                        <h4 className="text-xs font-bold text-gray-905 dark:text-white leading-snug">{disc.title}</h4>
                        <div className="flex items-center gap-3 text-[10px] text-gray-400 font-medium">
                          <span>Replies: <strong>{disc.replies}</strong></span>
                          <span>·</span>
                          <span>Started by: <strong>{disc.author}</strong></span>
                          <span>·</span>
                          <span>Last active: {disc.lastActive}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 w-full md:w-auto justify-end pt-2 md:pt-0 border-t md:border-0 border-gray-105 dark:border-gray-850">
                        <button
                          onClick={() => handleFollowThread(disc.id)}
                          className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg border cursor-pointer transition-all ${
                            followed
                              ? "bg-indigo-650 text-white border-indigo-500 shadow-xs"
                              : "bg-white dark:bg-gray-900 text-gray-655 dark:text-gray-300 border-gray-205 dark:border-gray-800 hover:bg-gray-50"
                          }`}
                        >
                          {followed ? "Following ✓" : "Follow Thread"}
                        </button>
                        <button
                          onClick={() => alert(`Entering thread: ${disc.title}`)}
                          className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-[9px] font-bold px-2.5 py-1.5 rounded-lg text-gray-600 dark:text-gray-300 hover:text-blue-650 transition-all cursor-pointer"
                        >
                          Reply
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 07. RECOMMENDED ARTICLES */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Star className="h-4.5 w-4.5 text-amber-500" />
                  Recommended For You
                </h2>
                <span className="text-[10px] font-bold text-slate-400">Custom B2B matching</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {MOCK_RECOMMENDED_ARTICLES.map((art) => {
                  const saved = savedArticles.includes(art.id);
                  return (
                    <div key={art.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-4 flex flex-col justify-between hover:border-amber-500 transition-all duration-300">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-[8px] font-bold text-amber-600 uppercase">
                          <span>{art.category}</span>
                          <span>{art.readTime}</span>
                        </div>
                        <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">{art.title}</h4>
                        <p className="text-[10px] text-gray-500 leading-normal">{art.summary}</p>
                      </div>

                      <div className="pt-3.5 border-t border-gray-100 dark:border-gray-855 mt-3 flex items-center justify-between text-[9px]">
                        <button
                          onClick={() => handleSaveArticle(art.id)}
                          className={`flex items-center gap-0.5 cursor-pointer font-bold ${
                            saved ? "text-amber-600" : "text-gray-400 hover:text-gray-600"
                          }`}
                        >
                          <Bookmark className="h-3 w-3" /> {saved ? "Saved" : "Save"}
                        </button>
                        <button
                          onClick={() => alert(`Reading article: ${art.title}`)}
                          className="bg-amber-500 hover:bg-amber-600 text-gray-950 font-bold px-3 py-1 rounded-lg transition-all"
                        >
                          Read Article →
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* 08. READER QUESTIONS */}
            <section className="space-y-4">
              <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3">
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="h-4.5 w-4.5 text-blue-500" />
                  Ask the Community
                </h2>
                <span className="text-[10px] font-bold text-slate-400">Read · Think · Ask · Answer</span>
              </div>

              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-4 shadow-2xs">
                <p className="text-[11px] text-gray-500">Have a question about a trade corridor, compliance protocol, or new tariff policy? Post it below for contributor feedback.</p>
                <form onSubmit={handleAskSubmit} className="space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-3">
                      <input
                        type="text"
                        required
                        placeholder="Write your trade, logistics, or industry question here..."
                        value={newQuestionText}
                        onChange={(e) => setNewQuestionText(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-hidden dark:text-white"
                      />
                    </div>
                    <div>
                      <select
                        value={newQuestionCategory}
                        onChange={(e) => setNewQuestionCategory(e.target.value)}
                        className="w-full text-xs p-2.5 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-205 dark:border-gray-800 focus:outline-hidden dark:text-white font-bold"
                      >
                        <option value="Trade Corridor">Trade Corridor</option>
                        <option value="Compliance">Compliance</option>
                        <option value="Technology">Technology</option>
                        <option value="Customs Regulation">Customs</option>
                      </select>
                    </div>
                  </div>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-xl cursor-pointer">
                    Ask a Question
                  </button>
                </form>
              </div>
            </section>

            {/* 09. COMMUNITY POLLS */}
            <section className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center gap-2">
                <TrendingUp className="h-4.5 w-4.5 text-emerald-500" />
                <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Active Community Polls</h2>
              </div>

              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 border-l-4 border-emerald-500 space-y-3">
                <span className="text-[8px] font-bold text-emerald-600 uppercase block tracking-wider">Knowledge-Oriented Poll</span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-relaxed">
                  Which regulatory updates will have the most disruptive impact on import cargo processing inside the EU in Q4 2026?
                </h4>

                <div className="grid grid-cols-1 gap-2 pt-2.5">
                  {[
                    "New Botanical phytoclear benchmarks",
                    "Heavy metals limit inspections",
                    "Sovereign data-hosting audit limits",
                    "Customs clearance fee spikes"
                  ].map((opt) => (
                    <button
                      key={opt}
                      onClick={() => alert(`Voted option: ${opt}`)}
                      className="w-full text-left bg-gray-50 dark:bg-gray-900 hover:border-emerald-500 border border-gray-200 dark:border-gray-800 p-2.5 rounded-xl text-xs font-bold text-gray-700 dark:text-gray-300 transition-all cursor-pointer"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 10. CHALLENGES & BADGES */}
            <section className="space-y-4">
              <div className="border-b border-gray-200 dark:border-gray-800 pb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Award className="h-4.5 w-4.5 text-purple-500" />
                  <h2 className="font-display text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Reader Challenges</h2>
                </div>
                <span className="text-[10px] font-bold text-purple-500">Active Knowledge Challenges</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Challenge 1 */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-bold text-purple-650 uppercase">
                      <span>Interactive Challenge</span>
                      <span>Expires in 5 days</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">Global Trade Knowledge Challenge</h4>
                    <p className="text-[10px] text-gray-500 leading-normal">Answer 5 bilateral trade compliance questions correctly inside the forum.</p>
                    
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span>Progress: {challengeProgress1}/5 Answers</span>
                        <span>{Math.round((challengeProgress1 / 5) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-150 dark:bg-gray-850 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(challengeProgress1 / 5) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-855 mt-2 flex items-center justify-between">
                    <span className="text-[8px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded font-mono font-bold">
                      Trade Explorer Badge
                    </span>
                    <button
                      onClick={() => {
                        if (challengeProgress1 < 5) {
                          setChallengeProgress1(challengeProgress1 + 1);
                        } else {
                          alert("Challenge completed! Trade Explorer Badge awarded.");
                        }
                      }}
                      className="bg-purple-650 hover:bg-purple-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all"
                    >
                      {challengeProgress1 === 5 ? "Completed ✓" : "Continue Challenge"}
                    </button>
                  </div>
                </div>

                {/* Challenge 2 */}
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center text-[8px] font-bold text-purple-650 uppercase">
                      <span>Task Challenge</span>
                      <span>Expires in 12 days</span>
                    </div>
                    <h4 className="text-xs font-bold text-gray-900 dark:text-white leading-snug">Industry Insights Challenge</h4>
                    <p className="text-[10px] text-gray-500 leading-normal">Read 5 recommended articles and participate in 2 dynamic public discussions.</p>
                    
                    <div className="space-y-1 pt-1">
                      <div className="flex justify-between text-[10px] font-bold text-gray-400">
                        <span>Progress: {challengeProgress2}/7 Tasks</span>
                        <span>{Math.round((challengeProgress2 / 7) * 100)}%</span>
                      </div>
                      <div className="w-full bg-gray-150 dark:bg-gray-855 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-purple-600 h-full rounded-full" style={{ width: `${(challengeProgress2 / 7) * 100}%` }} />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-gray-100 dark:border-gray-855 mt-2 flex items-center justify-between">
                    <span className="text-[8px] bg-purple-500/10 text-purple-500 px-2 py-0.5 rounded font-mono font-bold">
                      Industry Contributor
                    </span>
                    <button
                      onClick={() => {
                        if (challengeProgress2 < 7) {
                          setChallengeProgress2(challengeProgress2 + 1);
                        } else {
                          alert("Challenge completed! Industry Contributor Badge awarded.");
                        }
                      }}
                      className="bg-purple-650 hover:bg-purple-700 text-white font-bold text-[9px] px-3 py-1.5 rounded-lg transition-all"
                    >
                      {challengeProgress2 === 7 ? "Completed ✓" : "Continue Challenge"}
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* 14. PREMIUM DISCUSSIONS PREVIEW */}
            <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 relative overflow-hidden shadow-2xs">
              <div className="space-y-4 relative z-10">
                <div className="flex items-center gap-1.5">
                  <Lock className="h-4.5 w-4.5 text-purple-650" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Premium Community Discussions 🔒</h4>
                </div>
                <p className="text-[10px] text-gray-500">Join exclusive discussions and expert-led conversations available to Reader Pro members.</p>

                <div className="space-y-2 filter blur-xs opacity-40 select-none">
                  <div className="h-3 w-3/4 bg-gray-300 rounded" />
                  <div className="h-2.5 w-full bg-gray-300 rounded" />
                  <div className="h-2 w-5/6 bg-gray-300 rounded" />
                </div>

                <div className="bg-purple-950/40 border border-purple-900/30 p-4 rounded-xl text-center space-y-1.5">
                  <h5 className="text-[10px] font-bold text-purple-400 uppercase tracking-widest">🔒 READER PRO ACCESS REQUIRED</h5>
                  <p className="text-[9px] text-purple-300 leading-normal">
                    Unlock private roundtables reviewing bilateral semiconductor tariffs and global logistics network corridors.
                  </p>
                </div>
              </div>
              <button
                onClick={() => {
                  setConsultTargetExpert("Reader Pro Access Desk");
                  setIsConsultDialogOpen(true);
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold text-xs py-2 rounded-xl mt-4 shadow-xs cursor-pointer relative z-10"
              >
                Unlock Reader Pro
              </button>
            </section>

          </div>

          {/* RIGHT SIDEBAR COLUMN (1/3) */}
          <div className="space-y-8">
            
            {/* 11. SUGGESTED READERS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Users className="h-4.5 w-4.5 text-emerald-600" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">People You May Want to Follow</h4>
              </div>
              
              <div className="space-y-3">
                {MOCK_READERS.map((r, idx) => {
                  const following = followedReaders.includes(r.name);
                  return (
                    <div key={idx} className="p-3 rounded-xl border border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
                      <div>
                        <h5 className="text-[11px] font-bold text-gray-955 dark:text-white">{r.name}</h5>
                        <p className="text-[9px] text-gray-400">{r.role}</p>
                        <div className="flex flex-wrap gap-1 pt-1.5">
                          {r.interests.map((t) => (
                            <span key={t} className="text-[8px] bg-gray-100 dark:bg-gray-800 text-gray-500 px-1 py-0.2 rounded">{t}</span>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleFollowReader(r.name)}
                        className={`w-full text-[9px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                          following
                            ? "bg-emerald-600 text-white border-emerald-500 shadow-xs"
                            : "bg-white dark:bg-gray-900 text-gray-655 dark:text-gray-300 border-gray-205 dark:border-gray-800 hover:bg-gray-50"
                        }`}
                      >
                        {following ? "Following ✓" : "Follow Reader"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 12. SUGGESTED TOPICS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Star className="h-4.5 w-4.5 text-amber-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Topics You May Like</h4>
              </div>
              
              <div className="flex flex-wrap gap-1.5 pt-1">
                {["AI", "Global Trade", "Manufacturing", "Technology", "Energy", "Healthcare", "Bilateral Corridor", "Compliance Policy"].map((topic) => {
                  const followed = followedTopics.includes(topic);
                  return (
                    <button
                      key={topic}
                      onClick={() => handleFollowTopic(topic)}
                      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                        followed
                          ? "bg-amber-500 text-gray-950 border-amber-500"
                          : "bg-gray-50 dark:bg-gray-900 text-gray-600 border-gray-200 dark:border-gray-800 hover:border-emerald-500"
                      }`}
                    >
                      {topic} {followed ? "✓" : "+"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 13. UPCOMING COMMUNITY EVENTS */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 space-y-3.5 shadow-2xs">
              <div className="flex items-center gap-1.5">
                <Calendar className="h-4.5 w-4.5 text-blue-500" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">Upcoming Community Events</h4>
              </div>
              
              <div className="space-y-3">
                {MOCK_EVENTS.map((evt) => {
                  const registered = registeredEventIds.includes(evt.id);
                  return (
                    <div key={evt.id} className="p-3 rounded-xl border border-gray-150 dark:border-gray-850 bg-gray-50/50 dark:bg-gray-900/30 space-y-2">
                      <div className="flex justify-between items-center text-[8px] font-mono font-bold text-blue-650 uppercase">
                        <span>{evt.type}</span>
                        <span className="text-gray-400">{evt.date.split("·")[0]}</span>
                      </div>
                      <h5 className="text-[11px] font-bold text-gray-955 dark:text-white leading-snug">{evt.title}</h5>
                      <p className="text-[9px] text-gray-400 font-semibold">Speaker: {evt.speaker}</p>
                      <button
                        onClick={() => handleRegisterEvent(evt.id)}
                        className={`w-full text-[9px] font-bold py-1.5 rounded-lg border transition-all cursor-pointer ${
                          registered
                            ? "bg-emerald-650 text-white border-emerald-500 shadow-xs"
                            : "bg-blue-600 text-white border-blue-500 hover:bg-blue-700"
                        }`}
                      >
                        {registered ? "✓ Registered" : "Register Event"}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 16. READER PRO PREVIEW */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs p-5 border-l-4 border-amber-500 space-y-4 shadow-sm">
              <div className="space-y-1">
                <span className="text-[9px] font-mono font-bold text-amber-550 uppercase tracking-widest">READER PRO PREVIEW</span>
                <h4 className="text-xs font-bold text-gray-900 dark:text-white">Unlock More From the Reader Community</h4>
              </div>

              <div className="space-y-3 pt-2">
                <div className="p-3 rounded-xl border border-gray-150 dark:border-gray-850 space-y-1 bg-white/50 dark:bg-gray-900/30">
                  <h5 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Free Tiers Include</h5>
                  <p className="text-[10px] text-gray-500">Community Discussions · Recommended Articles · Basic Challenges</p>
                </div>
                <div className="p-3 rounded-xl border border-purple-500/20 bg-purple-500/5 space-y-1.5">
                  <h5 className="text-[10px] font-bold text-purple-650 dark:text-purple-400 uppercase tracking-wider">🔒 Reader Pro Level</h5>
                  <p className="text-[10px] text-gray-500">Premium Discussions · Advanced Recommendations · AI Reading Features · Exclusive Events</p>
                </div>
              </div>

              <button
                onClick={() => {
                  setConsultTargetExpert("Reader Pro Plan Desk");
                  setIsConsultDialogOpen(true);
                }}
                className="w-full bg-amber-550 hover:bg-amber-600 text-gray-955 font-bold text-xs py-2.5 rounded-xl shadow-xs cursor-pointer"
              >
                Upgrade to Reader Pro
              </button>
            </div>

          </div>
        </div>

        {/* 15. COMMUNITY ACTIVITY INSIGHTS */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 mb-8 mt-8 space-y-3 shadow-2xs">
          <div className="flex items-center gap-1.5">
            <Globe className="h-4.5 w-4.5 text-emerald-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-900 dark:text-white">What Readers Are Discussing</h4>
          </div>
          <p className="text-[10px] text-gray-500">Real-time compilation of content discussion frequency indexes inside the forum corridors.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1.5">
            {[
              { label: "AI Adoption Insights", desc: "Heavy focus on manufacturing grid optimization discussions.", status: "High discussion activity" },
              { label: "Bilateral CEPA Policy", desc: "Frequent posts asking about custom clearances pre-approvals.", status: "Rising reader interest" },
              { label: "Energy Transition Logistics", desc: "Debates around lithium battery shipping corridors.", status: "Active conversations" }
            ].map((ins, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/50 border border-gray-150 dark:border-gray-850">
                <span className="text-[8px] font-bold text-emerald-600 bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">{ins.status}</span>
                <h5 className="text-[11px] font-bold text-gray-900 dark:text-white pt-2">{ins.label}</h5>
                <p className="text-[10px] text-gray-400 pt-1 leading-relaxed">{ins.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 17. JOIN COMMUNITY CTA */}
        <section className="bg-gradient-to-r from-emerald-900/10 via-teal-900/15 to-gray-900/20 border border-emerald-900/30 rounded-2xl p-8 text-center mb-8 mt-8 space-y-4">
          <div className="max-w-2xl mx-auto space-y-2">
            <h3 className="text-lg font-extrabold text-gray-900 dark:text-white">Be Part of the Reader Community</h3>
            <p className="text-xs text-gray-550 leading-relaxed max-w-xl mx-auto font-normal">
              Connect with readers, exchange ideas, discover important conversations and build your knowledge network.
            </p>
          </div>
          <div className="flex justify-center gap-2">
            <button
              onClick={handleJoinCommunity}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Join the Community
            </button>
            <a
              href="#discussions"
              className="bg-white/5 border border-white/10 text-slate-700 dark:text-slate-350 hover:bg-white/10 font-bold text-xs px-5 py-2.5 rounded-xl transition-all cursor-pointer"
            >
              Explore Discussions
            </a>
          </div>
        </section>

        {/* 18. READER COMMUNITY NEWSLETTER */}
        <section className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 mb-8 text-center space-y-4">
          <div className="max-w-md mx-auto space-y-2">
            <Mail className="h-6 w-6 text-emerald-600 mx-auto" />
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Reader Community Brief</h3>
            <p className="text-[11px] text-gray-500">Get the most discussed stories, trending topics, community conversations and upcoming events delivered to your inbox.</p>
          </div>

          {newsletterSubscribed ? (
            <div className="bg-emerald-500/15 border border-emerald-500/20 p-2.5 rounded-xl max-w-sm mx-auto text-xs font-semibold text-emerald-600 dark:text-emerald-450 animate-pulse">
              ✓ Subscribed successfully to the Reader Community Brief!
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2 max-w-md mx-auto">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 px-3.5 py-2 text-xs rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-hidden dark:text-white"
              />
              <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 rounded-xl cursor-pointer">
                Subscribe
              </button>
            </form>
          )}
        </section>

        {/* 19. SPONSORED COMMUNITY CONTENT */}
        <section className="bg-gray-50 dark:bg-gray-900/40 border border-gray-200 dark:border-gray-800 rounded-2xl p-5 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest bg-amber-500/10 px-2 py-0.5 rounded border border-amber-550/20">Sponsored Community Content</span>
            <h4 className="text-xs font-bold text-gray-900 dark:text-white pt-1">How Businesses Can Prepare for the Next Era of Global Trade</h4>
            <p className="text-[10px] text-gray-405">Presented by Standard Chartered B2B Advisory Group</p>
          </div>
          <button
            onClick={() => {
              setConsultTargetExpert("SC Trade Advisory Panel");
              setIsConsultDialogOpen(true);
            }}
            className="bg-gray-900 dark:bg-white text-white dark:text-gray-955 hover:bg-black font-bold text-xs px-4 py-2 rounded-xl shrink-0 transition-all cursor-pointer"
          >
            Learn More →
          </button>
        </section>

      </main>

      {/* dialogs */}
      {isAskDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl shadow-xs max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-105 dark:border-gray-805 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Start a Community Discussion Thread</h4>
              <button onClick={() => setIsAskDialogOpen(false)} className="text-gray-400 hover:text-gray-605 text-lg cursor-pointer">&times;</button>
            </div>
            <form onSubmit={handleAskSubmit} className="space-y-4">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Question Category</label>
                <select
                  value={newQuestionCategory}
                  onChange={(e) => setNewQuestionCategory(e.target.value)}
                  className="w-full text-xs rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-2 focus:outline-hidden dark:text-white"
                >
                  <option value="Trade Corridor">Trade Corridor</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Technology">Technology</option>
                  <option value="Customs Regulation">Customs</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Your Question / Thread Title</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Outline the topic or trade compliance hurdle you wish to raise for contributor input..."
                  value={newQuestionText}
                  onChange={(e) => setNewQuestionText(e.target.value)}
                  className="w-full text-xs p-3 rounded-xl bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 focus:outline-hidden dark:text-white focus:border-emerald-500"
                />
              </div>
              <div className="flex gap-2 justify-end pt-2">
                <button type="button" onClick={() => setIsAskDialogOpen(false)} className="bg-gray-100 dark:bg-gray-850 text-gray-655 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer">
                  Cancel
                </button>
                <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                  Create Thread
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isConsultDialogOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-805 rounded-2xl shadow-xs max-w-md w-full p-6 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center border-b border-gray-100 dark:border-gray-800 pb-3">
              <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wider">Reader Community Action</h4>
              <button
                onClick={() => {
                  setIsConsultDialogOpen(false);
                  setConsultSubmitted(false);
                  setConsultMessage("");
                }}
                className="text-gray-400 hover:text-gray-605 text-lg cursor-pointer"
              >
                &times;
              </button>
            </div>

            {consultSubmitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="h-12 w-12 rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto text-xl font-bold">✓</div>
                <h5 className="text-xs font-bold dark:text-white">Action logged successfully</h5>
                <p className="text-[10px] text-gray-550 px-4 font-normal leading-relaxed">
                  Your request has been routed to the <strong>{consultTargetExpert}</strong> desk. Our coordination panel will follow up via your profile contact points.
                </p>
                <button
                  onClick={() => {
                    setIsConsultDialogOpen(false);
                    setConsultSubmitted(false);
                    setConsultMessage("");
                  }}
                  className="bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 font-bold text-xs px-4 py-2 rounded-xl cursor-pointer"
                >
                  Close Window
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setConsultSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Target Action Area</label>
                  <input
                    type="text"
                    disabled
                    value={consultTargetExpert}
                    className="w-full text-xs rounded-xl bg-gray-100 dark:bg-gray-900/40 border border-gray-205 p-2.5 text-gray-600 cursor-not-allowed dark:text-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Enter request parameters / comments</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Provide details about your query or upgrade goals..."
                    value={consultMessage}
                    onChange={(e) => setConsultMessage(e.target.value)}
                    className="w-full text-xs p-3 rounded-xl bg-gray-55 dark:bg-gray-900 border border-gray-200 dark:border-gray-808 focus:outline-hidden dark:text-white focus:border-emerald-500"
                  />
                </div>
                <div className="flex gap-2 justify-end pt-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIsConsultDialogOpen(false);
                      setConsultMessage("");
                    }}
                    className="bg-gray-100 dark:bg-gray-850 text-gray-655 dark:text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-xs cursor-pointer">
                    Submit Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
