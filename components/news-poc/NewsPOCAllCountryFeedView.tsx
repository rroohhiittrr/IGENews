"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Sparkles, TrendingUp, Search, ArrowLeft, ChevronRight,
  Clock, Calendar, Flame, Lock, Mail, FileText, CheckCircle,
  ThumbsUp, Bookmark, Share2, MessageSquare, Globe, Cpu, Zap, Car,
  Layers, Scale, Users, BarChart3, ArrowUpRight, Heart,
  Play, Tag, Award, Target, Bell
} from "lucide-react";

interface NewsPOCAllCountryFeedViewProps {
  onBack?: () => void;
}

const BILATERAL_COUNTRIES = [
  { name: "Global (All)", count: 195, code: "all" },
  { name: "India-USA", count: 32, flag: "🇮🇳 🇺🇸", code: "India-USA" },
  { name: "India-Germany", count: 24, flag: "🇮🇳 🇩🇪", code: "India-Germany" },
  { name: "India-Japan", count: 18, flag: "🇮🇳 🇯🇵", code: "India-Japan" },
  { name: "India-UAE", count: 28, flag: "🇮🇳 🇦🇪", code: "India-UAE" },
  { name: "India-Singapore", count: 15, flag: "🇮🇳 🇸🇬", code: "India-Singapore" },
  { name: "India-UK", count: 21, flag: "🇮🇳 🇬🇧", code: "India-UK" }
];

const MOCK_BILATERAL_FEED = [
  { 
    id: "cn-1", 
    title: "India-USA Critical Tech Trade Accord Secures Direct Defense Semiconductor Sourcing", 
    excerpt: "Strategic partnership under iCET initiates raw materials supply guarantees, eliminating semiconductor supply chain vulnerability for commercial and military manufacturing hubs.",
    country: "India-USA", 
    flag: "🇮🇳 🇺🇸", 
    category: "TECHNOLOGY", 
    date: "30m ago", 
    views: "3.8K", 
    readTime: "5 min read", 
    premium: false,
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    whyItMatters: "Bypasses East Asian packaging backlogs and secures raw material silicon substrates under military-grade supply agreements."
  },
  { 
    id: "cn-2", 
    title: "India-Germany €2 Billion Clean Hydrogen Shipping Corridor Accord Finalized", 
    excerpt: "New green energy corridor maps direct liquefaction container lines from Kochi port to Hamburg, securing zero-emission logistics pipelines and customs tariff exemptions.",
    country: "India-Germany", 
    flag: "🇮🇳 🇩🇪", 
    category: "ENERGY", 
    date: "1h ago", 
    views: "2.4K", 
    readTime: "4 min read", 
    premium: true,
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    whyItMatters: "Opens first direct hydrogen import gates in Northern Europe, exempting Indian exporters from carbon border adjustment taxes (CBAM)."
  },
  { 
    id: "cn-3", 
    title: "India-Japan Bilateral Industrial Township Expansion Commences in Rajasthan", 
    excerpt: "Automotive and heavy machinery production facilities lease direct development zones, increasing FDI injection indices and generating 15,000 localized industrial roles.",
    country: "India-Japan", 
    flag: "🇮🇳 🇯🇵", 
    category: "MANUFACTURING", 
    date: "2h ago", 
    views: "1.9K", 
    readTime: "6 min read", 
    premium: false,
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&auto=format&fit=crop&q=80",
    whyItMatters: "Expands precision heavy machinery tooling plants, boosting local engineering output indexes."
  },
  { 
    id: "cn-4", 
    title: "India-Singapore PayNow-UPI Digital Payment Volume Crosses 15 Million Transactions", 
    excerpt: "Bilateral micro-payment tunnel integration achieves rapid retail adoption benchmarks, reducing remittance processing fees by 60% for cross-border families.",
    country: "India-Singapore", 
    flag: "🇮🇳 🇸🇬", 
    category: "FINTECH", 
    date: "4h ago", 
    views: "3.1K", 
    readTime: "4 min read", 
    premium: false,
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&auto=format&fit=crop&q=80",
    whyItMatters: "Eliminates high-cost payment gate delays, enabling micro-exporters to receive instant payments."
  },
  { 
    id: "cn-5", 
    title: "India-UK Free Trade Agreement Negotiations Enter Final Regulatory Review Stage", 
    excerpt: "Final tariff tables and intellectual property compliance drafts enter final checks, opening up legal, financial, and educational services flow corridors.",
    country: "India-UK", 
    flag: "🇮🇳 🇬🇧", 
    category: "TRADE ACCORDS", 
    date: "5h ago", 
    views: "2.8K", 
    readTime: "5 min read", 
    premium: true,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=600&auto=format&fit=crop&q=80",
    whyItMatters: "Reduces whiskey import duties and removes restrictions on Indian technology and engineering professionals seeking local work permits."
  },
  { 
    id: "cn-6", 
    title: "India-UAE CEPA Bilateral Cargo Shipments Cross $100 Billion Milestone", 
    excerpt: "New shipping terminal integrations between Mundra and Jebel Ali reduce transit time by 48 hours, facilitating accelerated cargo clearances.",
    country: "India-UAE", 
    flag: "🇮🇳 🇦🇪", 
    category: "LOGISTICS", 
    date: "8h ago", 
    views: "4.5K", 
    readTime: "6 min read", 
    premium: false,
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=600&auto=format&fit=crop&q=80",
    whyItMatters: "Cuts shipping delays for agricultural and gold products, enabling near-instant customs clearances."
  }
];

const TELEMETRY_DATA: Record<string, { gdp: string; growth: string; tradeValue: string; balance: string; accord: string }> = {
  "India-USA": { gdp: "$3.75T & $27.9T", growth: "+7.3% & +2.5%", tradeValue: "$191.8 Billion", balance: "-$28.4 Billion", accord: "iCET & Trade Policy Forum" },
  "India-Germany": { gdp: "$3.75T & $4.46T", growth: "+7.3% & +1.2%", tradeValue: "$30.8 Billion", balance: "+$3.2 Billion", accord: "India-EU FTA (Pending)" },
  "India-Japan": { gdp: "$3.75T & $4.21T", growth: "+7.3% & +1.4%", tradeValue: "$22.5 Billion", balance: "-$6.1 Billion", accord: "CEPA Partnership Agreement" },
  "India-UAE": { gdp: "$3.75T & $507B", growth: "+7.3% & +3.8%", tradeValue: "$87.2 Billion", balance: "+$10.5 Billion", accord: "CEPA Accord (Active)" },
  "India-Singapore": { gdp: "$3.75T & $501B", growth: "+7.3% & +3.1%", tradeValue: "$35.6 Billion", balance: "+$1.8 Billion", accord: "CECA Agreement" },
  "India-UK": { gdp: "$3.75T & $3.34T", growth: "+7.3% & +1.1%", tradeValue: "$20.3 Billion", balance: "-$2.4 Billion", accord: "FTA (Negotiations Stage)" },
  "all": { gdp: "$3.75T Domestic GDP", growth: "+7.3% YoY Growth", tradeValue: "$1.1 Trillion Total", balance: "-$240B Net Position", accord: "Multiple Accords Active" }
};

const FEATURED_BRIEFS: Record<string, { title: string; excerpt: string; category: string; image: string; link: string }> = {
  "India-USA": {
    title: "India-US Bilateral Trade volume peaks at record $191.8 Billion",
    excerpt: "Strategic cooperation in critical defense tech and AI partnerships drives bilateral commerce flows, narrowing trade deficits.",
    category: "AI & Cyber Security (S02)",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-1"
  },
  "India-Germany": {
    title: "India-Germany Green Hydrogen Logistics Hub Deployed at Hamburg Port",
    excerpt: "New green energy corridor maps direct liquefaction container lines from Kochi port to Hamburg, securing zero-emission logistics pipelines.",
    category: "RENEWABLE ENERGY (S04)",
    image: "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-2"
  },
  "India-Japan": {
    title: "India-Japan Bilateral Industrial Township Expansion Commences in Rajasthan",
    excerpt: "Automotive and heavy machinery production facilities lease direct development zones, increasing FDI injection indices.",
    category: "MANUFACTURING & AUTOMOTIVE (S06)",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-3"
  },
  "India-UAE": {
    title: "India-UAE CEPA Bilateral Cargo Shipments Cross $100 Billion Milestone",
    excerpt: "New shipping terminal integrations between Mundra and Jebel Ali reduce transit time by 48 hours, facilitating accelerated cargo clearances.",
    category: "LOGISTICS (S08)",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-6"
  },
  "India-Singapore": {
    title: "India-Singapore PayNow-UPI Digital Payment Volume Crosses 15 Million Transactions",
    excerpt: "Bilateral micro-payment tunnel integration achieves rapid retail adoption benchmarks, reducing remittance processing fees by 60%.",
    category: "FINTECH (S03)",
    image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-4"
  },
  "India-UK": {
    title: "India-UK Free Trade Agreement Negotiations Enter Final Regulatory Review Stage",
    excerpt: "Final tariff tables and intellectual property compliance drafts enter final checks, opening up legal, financial, and educational services flow corridors.",
    category: "TRADE ACCORDS (S01)",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-5"
  },
  "all": {
    title: "India-US Bilateral Trade volume peaks at record $191.8 Billion",
    excerpt: "Strategic cooperation in critical defense tech and AI partnerships drives bilateral commerce flows, narrowing trade deficits.",
    category: "AI & Cyber Security (S02)",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659?w=1200&auto=format&fit=crop&q=80",
    link: "/en/news-poc/article/cn-1"
  }
};

const TRENDING_COUNTRIES = [
  { name: "United States", flag: "🇺🇸", code: "US", status: "↑ Trending", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "United Arab Emirates", flag: "🇦🇪", code: "AE", status: "↑ High", color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Germany", flag: "🇩🇪", code: "DE", status: "↑ Rising", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Singapore", flag: "🇸🇬", code: "SG", status: "↑ Rising", color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Japan", flag: "🇯🇵", code: "JP", status: "→ Stable", color: "text-gray-400", bg: "bg-gray-400/10" }
];

const MOST_READ_COUNTRY_NEWS = [
  { id: "cn-1", title: "India-USA Critical Tech Trade Accord Secures Direct Defense Semiconductor Sourcing", count: "14.2k views", flag: "🇺🇸", country: "USA" },
  { id: "cn-2", title: "India-Germany €2 Billion Clean Hydrogen Shipping Corridor Accord Finalized", count: "11.8k views", flag: "🇩🇪", country: "Germany" },
  { id: "cn-6", title: "India-UAE CEPA Bilateral Cargo Shipments Cross $100 Billion Milestone", count: "9.5k views", flag: "🇦🇪", country: "UAE" },
  { id: "cn-4", title: "India-Singapore PayNow-UPI Digital Payment Volume Crosses 15 Million Transactions", count: "8.1k views", flag: "🇸🇬", country: "Singapore" },
  { id: "cn-3", title: "India-Japan Bilateral Industrial Township Expansion Commences in Rajasthan", count: "6.4k views", flag: "🇯🇵", country: "Japan" }
];

export default function NewsPOCAllCountryFeedView({ onBack }: NewsPOCAllCountryFeedViewProps) {
  const [selectedCountry, setSelectedCountry] = useState<string>("Global (All)");
  const [activeTab, setActiveTab] = useState<"Latest" | "Trending">("Latest");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedArticles, setLikedArticles] = useState<string[]>([]);
  const [savedArticles, setSavedArticles] = useState<string[]>([]);
  const [openCommentId, setOpenCommentId] = useState<string | null>(null);
  const [commentInput, setCommentInput] = useState("");
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [askInput, setAskInput] = useState("");
  const [askedQuestions, setAskedQuestions] = useState([
    { id: 1, question: "Will the new shipping corridors bypass GCC tariffs?", votes: 12, voted: false },
    { id: 2, question: "What is the expected import delay for silicon components under iCET?", votes: 19, voted: false }
  ]);

  const activeCountryData = selectedCountry === "Global (All)" ? "all" : selectedCountry;
  const telemetry = TELEMETRY_DATA[activeCountryData] || TELEMETRY_DATA["all"];
  const featuredBrief = FEATURED_BRIEFS[activeCountryData] || FEATURED_BRIEFS["all"];

  const handleLike = (id: string) => {
    setLikedArticles(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleSave = (id: string) => {
    setSavedArticles(prev => prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]);
  };

  const handleVote = (id: number) => {
    setAskedQuestions(prev => prev.map(q => {
      if (q.id === id) {
        return { ...q, votes: q.voted ? q.votes - 1 : q.votes + 1, voted: !q.voted };
      }
      return q;
    }));
  };

  const handleAskQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!askInput.trim()) return;
    setAskedQuestions(prev => [
      ...prev,
      { id: Date.now(), question: askInput.trim(), votes: 1, voted: true }
    ]);
    setAskInput("");
  };

  // Filter feed items based on selected country and search query
  const filteredFeed = MOCK_BILATERAL_FEED.filter(item => {
    const matchesCountry = selectedCountry === "Global (All)" || item.country === selectedCountry;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCountry && matchesSearch;
  });

  const sortedFeed = activeTab === "Trending"
    ? [...filteredFeed].sort((a, b) => parseFloat(b.views) - parseFloat(a.views))
    : filteredFeed;

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] text-gray-900 dark:text-gray-100 min-h-screen pb-16 transition-colors duration-300">
      
      {/* ── PROFESSIONAL HEADER NAVIGATION (MATCHING SCREENSHOT) ── */}
      <div className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 transition-colors">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          
          {/* Left Title and Eyebrow */}
          <div className="flex items-center gap-3">
            {onBack && (
              <button 
                onClick={onBack}
                className="h-10 w-10 rounded-full border border-gray-200 dark:border-gray-800 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-700 dark:text-white transition-all shadow-xs shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-550 uppercase tracking-widest block font-mono">
                FEED SUB-MODULE
              </span>
              <h1 className="font-serif text-3xl font-bold text-gray-950 dark:text-white tracking-tight mt-0.5">
                Country Feed
              </h1>
            </div>
          </div>

          {/* Right Selector Switcher (Pills) */}
          <div className="flex items-center gap-1.5 bg-gray-100 dark:bg-gray-950 p-1.5 rounded-full border border-gray-200 dark:border-gray-855 shadow-xs">
            <Link 
              href="/en/news-poc/feed/country/my"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-655 dark:text-gray-350 hover:bg-gray-200/50 dark:hover:bg-gray-900 transition-all"
            >
              My Country
            </Link>
            <span 
              className="px-4 py-1.5 rounded-full text-xs font-bold bg-blue-600 text-white shadow-xs cursor-default"
            >
              All Country
            </span>
            <Link 
              href="/en/news-poc/feed/country/intelligence"
              className="px-4 py-1.5 rounded-full text-xs font-bold text-gray-655 dark:text-gray-350 hover:bg-gray-200/50 dark:hover:bg-gray-900 transition-all"
            >
              Country Intelligence
            </Link>
          </div>

        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 pt-6 lg:px-6 space-y-6">
        
        {/* Search & Filter Header Strip */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search bilateral feed..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-sm outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>
        
        {/* ── HORIZONTAL COUNTRY CORRIDOR SELECTOR ── */}
        <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-3 overflow-x-auto scrollbar-none flex gap-2">
          {BILATERAL_COUNTRIES.map((country) => (
            <button
              key={country.name}
              onClick={() => setSelectedCountry(country.name)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
                selectedCountry === country.name
                  ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                  : "bg-gray-50 dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-gray-850 text-gray-700 dark:text-gray-300"
              }`}
            >
              {country.flag && <span>{country.flag}</span>}
              <span>{country.name}</span>
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                selectedCountry === country.name
                  ? "bg-white/20 text-white"
                  : "bg-gray-200 dark:bg-gray-800 text-gray-500"
              }`}>
                {country.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── MAIN CONTENT GRID ── */}
        <div className="grid grid-cols-12 gap-6 items-stretch">
          
          {/* LEFT 8-COLUMN MAIN FEED */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            
            {/* ── FEATURED BRIEF BANNER (MATCHING SCREENSHOT) ── */}
            {featuredBrief && (
              <div className="relative rounded-3xl overflow-hidden min-h-[340px] flex flex-col justify-end p-6 md:p-8 text-white shadow-lg group">
                {/* Background Image with Dark Overlay */}
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 transition-all duration-500 scale-100 group-hover:scale-103" 
                  style={{ 
                    backgroundImage: `url('${featuredBrief.image}')`,
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 z-10" />

                {/* Card Content */}
                <div className="relative z-20 space-y-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="bg-blue-600 text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      Featured Brief
                    </span>
                    <span className="bg-white/20 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
                      {featuredBrief.category}
                    </span>
                  </div>

                  <h2 className="font-serif text-2xl md:text-3xl font-bold leading-tight max-w-2xl text-white">
                    {featuredBrief.title}
                  </h2>

                  <p className="text-xs md:text-sm text-gray-300 max-w-xl font-normal leading-relaxed">
                    {featuredBrief.excerpt}
                  </p>

                  <div className="pt-2">
                    <Link
                      href={featuredBrief.link}
                      className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-750 text-white font-bold text-xs px-5 py-3 rounded-xl transition-all shadow-md shadow-blue-500/20"
                    >
                      READ FULL BRIEFING
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Header controls for feed */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-4 flex items-center justify-between gap-4">
              <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                Displaying {sortedFeed.length} Bilateral Bulletins
              </span>

              {/* Feed view tabs */}
              <div className="flex bg-gray-100 dark:bg-gray-900 p-0.5 rounded-xl border border-gray-200 dark:border-gray-800">
                {["Latest", "Trending"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as any)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      activeTab === tab
                        ? "bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles Stack */}
            <div className="space-y-4">
              {sortedFeed.length > 0 ? (
                sortedFeed.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden p-5 md:p-6 flex flex-col md:flex-row gap-6 shadow-xs hover:shadow-sm transition-all duration-200 group"
                  >
                    {/* Left text section */}
                    <div className="flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-2 text-[10px]">
                          <span className="bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-lg border border-blue-100 dark:border-blue-900/30 font-bold">
                            {item.flag} {item.country}
                          </span>
                          <span className="bg-gray-100 dark:bg-gray-900 text-gray-500 px-2 py-0.5 rounded-lg font-bold">
                            {item.category}
                          </span>
                          {item.premium && (
                            <span className="flex items-center gap-1 bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-lg font-bold">
                              <Lock className="h-3 w-3 text-amber-500" />
                              PREMIUM
                            </span>
                          )}
                          <span className="text-gray-400 font-medium ml-auto">
                            {item.date} · {item.readTime}
                          </span>
                        </div>

                        <Link href={`/en/news-poc/article/${item.id}`} className="block">
                          <h3 className="text-base md:text-lg font-bold text-gray-950 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-405 transition-colors leading-snug">
                            {item.title}
                          </h3>
                        </Link>

                        <p className="text-xs md:text-sm text-gray-600 dark:text-gray-400 leading-relaxed font-normal">
                          {item.excerpt}
                        </p>
                      </div>

                      {/* Expandable Why It Matters block */}
                      <div className="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-3 border border-gray-100 dark:border-gray-800 text-xs">
                        <span className="font-bold text-blue-500 dark:text-blue-400 block uppercase text-[8px] tracking-wider">Why It Matters</span>
                        <p className="text-gray-600 dark:text-slate-300 mt-0.5">{item.whyItMatters}</p>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap items-center justify-between gap-3 text-xs text-gray-500 font-semibold">
                        <div className="flex items-center gap-3">
                          <Link
                            href={`/en/news-poc/article/${item.id}`}
                            className="bg-[#1E3A5F] hover:bg-[#152e4f] text-white font-bold text-[9px] px-3.5 py-1.5 rounded-lg transition-colors shadow-xs"
                          >
                            READ ARTICLE
                          </Link>
                          <span className="text-[10px] font-medium text-gray-450">
                            Views: <span className="font-bold text-gray-800 dark:text-gray-250">{item.views}</span>
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <button 
                            onClick={() => handleLike(item.id)}
                            className={`flex items-center gap-1 hover:text-red-500 transition-colors ${likedArticles.includes(item.id) ? "text-red-500" : ""}`}
                          >
                            <ThumbsUp className="h-3.5 w-3.5" /> <span>{likedArticles.includes(item.id) ? "Liked" : "Like"}</span>
                          </button>
                          <button 
                            onClick={() => setOpenCommentId(openCommentId === item.id ? null : item.id)}
                            className="flex items-center gap-1 hover:text-blue-500 transition-colors"
                          >
                            <MessageSquare className="h-3.5 w-3.5" /> <span>Comment</span>
                          </button>
                          <button 
                            onClick={() => handleSave(item.id)}
                            className={`flex items-center gap-1 hover:text-amber-500 transition-colors ${savedArticles.includes(item.id) ? "text-amber-500" : ""}`}
                          >
                            <Bookmark className="h-3.5 w-3.5" /> <span>{savedArticles.includes(item.id) ? "Saved" : "Save"}</span>
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right Image section */}
                    <Link
                      href={`/en/news-poc/article/${item.id}`}
                      className="w-full md:w-52 h-36 md:h-auto min-h-[120px] rounded-xl overflow-hidden relative shrink-0 block"
                    >
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-200"
                      />
                    </Link>
                  </div>
                ))
              ) : (
                <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-10 text-center space-y-3">
                  <Globe className="h-8 w-8 text-gray-300 mx-auto" />
                  <h4 className="font-bold text-gray-700 dark:text-slate-300 text-sm">No bulletins matched your filters</h4>
                  <p className="text-xs text-gray-400 max-w-md mx-auto">Try clearing your search query or choosing another bilateral country pair.</p>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT 4-COLUMN SIDEBAR (MATCHING SCREENSHOT) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            
            {/* ── TRENDING TOPICS ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                🔥 Trending Topics
              </h4>
              
              <div className="space-y-3.5">
                {[
                  { tag: "#ViksitBharat2047", reads: "1.2k reads" },
                  { tag: "#SemiconductorIncentives", reads: "984 reads" },
                  { tag: "#BilateralCorridors", reads: "512 reads" }
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between py-1.5 border-b border-gray-50 dark:border-gray-900/50 last:border-0 last:pb-0">
                    <span className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer">
                      {item.tag}
                    </span>
                    <span className="text-[10px] text-gray-400 dark:text-gray-500">
                      {item.reads}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── RECOMMENDED REPORTS ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-widest flex items-center gap-1.5 font-mono">
                📄 Recommended Reports
              </h4>
              
              <div className="space-y-3">
                {[
                  { title: "India-US Critical Tech Bilateral Briefing", code: "REP-BILA-US", price: "$249" },
                  { title: "Bilateral Trade tariff tables: India-EU", code: "REP-TARIFF-EU", price: "$199" }
                ].map((rep, idx) => (
                  <div 
                    key={idx} 
                    className="p-3.5 bg-gray-50 dark:bg-gray-900 rounded-2xl border border-gray-150/60 dark:border-gray-850 flex items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5 min-w-0">
                      <h5 className="font-bold text-xs text-gray-900 dark:text-white truncate" title={rep.title}>
                        {rep.title}
                      </h5>
                      <span className="text-[9px] font-mono text-gray-400 dark:text-gray-550 block">
                        {rep.code}
                      </span>
                    </div>
                    <Link
                      href="/en/eoi"
                      className="bg-blue-600 hover:bg-blue-750 text-white font-bold text-[10px] px-3.5 py-2 rounded-lg transition-all shrink-0 whitespace-nowrap"
                    >
                      Get {rep.price}
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            {/* ── MOST READ COUNTRY NEWS ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-3">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                  <Flame className="h-3.5 w-3.5 text-red-600" />
                  Most Read Country News
                </span>
              </div>

              <div className="space-y-3.5">
                {MOST_READ_COUNTRY_NEWS.map((art, idx) => (
                  <Link
                    key={art.id}
                    href={`/en/news-poc/article/${art.id}`}
                    className="flex gap-3 items-start group"
                  >
                    <span className="font-mono font-bold text-lg text-gray-300 dark:text-slate-700 w-5 text-right shrink-0">
                      {idx + 1}.
                    </span>
                    <div className="space-y-0.5 min-w-0">
                      <div className="flex items-center gap-1.5 text-[9px] font-bold text-blue-600 font-mono">
                        <span>{art.flag} {art.country}</span>
                        <span className="text-gray-400 font-normal">· {art.count}</span>
                      </div>
                      <h4 className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 leading-snug line-clamp-2 transition-colors">
                        {art.title}
                      </h4>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* ── TRENDING COUNTRIES ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-5 shadow-xs space-y-4">
              <div className="border-b border-gray-200/60 dark:border-gray-800 pb-3 flex items-center justify-between">
                <span className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5 font-display">
                  <TrendingUp className="h-3.5 w-3.5 text-blue-500" />
                  Trending Countries
                </span>
                <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 px-2 py-0.5 rounded">
                  High Traffic
                </span>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {TRENDING_COUNTRIES.map((trend) => (
                  <button
                    key={trend.name}
                    onClick={() => setSelectedCountry(trend.name)}
                    className="p-2.5 bg-gray-55 dark:bg-gray-900/60 rounded-xl border border-gray-200 dark:border-gray-800 hover:border-blue-400 transition-all flex items-center justify-between group text-left w-full cursor-pointer"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">{trend.flag}</span>
                      <div className="min-w-0">
                        <span className="text-xs font-bold text-gray-900 dark:text-white group-hover:text-blue-600 transition-colors block">
                          {trend.name}
                        </span>
                        <span className="text-[9px] text-gray-400 block font-normal">{trend.code} Corridor</span>
                      </div>
                    </div>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${trend.bg} ${trend.color} shrink-0`}>
                      {trend.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* ── BILATERAL TELEMETRY / METRICS ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between border-b border-gray-100 dark:border-gray-800 pb-2.5">
                <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                  <BarChart3 className="h-4 w-4 text-blue-600" />
                  Bilateral Telemetry
                </h4>
                <span className="text-[9px] text-gray-400 font-mono font-bold">Active</span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-850">
                  <span className="text-[8px] text-gray-400 font-bold block uppercase">GDP (Combined)</span>
                  <span className="font-bold text-gray-900 dark:text-white block mt-0.5">{telemetry.gdp}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-850">
                  <span className="text-[8px] text-gray-400 font-bold block uppercase">Annual Trade Value</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 block mt-0.5">{telemetry.tradeValue}</span>
                </div>
                <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-100 dark:border-gray-850">
                  <span className="text-[8px] text-gray-400 font-bold block uppercase">Growth and Balance</span>
                  <span className="font-bold text-emerald-500 block mt-0.5">{telemetry.growth} ({telemetry.balance})</span>
                </div>
              </div>
            </div>

            {/* ── OPPORTUNITIES & RISKS ── */}
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 shadow-xs space-y-4">
              <h4 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                <Target className="h-4 w-4 text-emerald-600" />
                Opportunities & Risks
              </h4>

              <div className="space-y-3 text-xs">
                <div className="p-3 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/20 border border-emerald-100 dark:border-emerald-900/30 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    🚀 Key Opportunities
                  </span>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-snug">
                    Duty deductions under FTA/CEPA frameworks open high-margin pathways for electrical and machinery exporters.
                  </p>
                </div>
                <div className="p-3 rounded-2xl bg-red-50/60 dark:bg-red-950/20 border border-red-100 dark:border-red-900/30 space-y-1.5">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400">
                    ⚠️ Critical Risks
                  </span>
                  <p className="text-[11px] text-gray-700 dark:text-gray-300 leading-snug">
                    Non-tariff barriers and carbon border taxes (CBAM) require carbon footprint offset certifications.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
