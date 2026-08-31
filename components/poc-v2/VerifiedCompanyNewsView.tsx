"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Search, CheckCircle, TrendingUp, Bookmark, BookmarkCheck, Share2,
  Bell, BellRing, Eye, Building2, Globe, MapPin, Clock, Calendar,
  Flame, Zap, Rocket, Star, Award, Crown, Lock, Sparkles,
  ChevronRight, ArrowRight, Filter, SlidersHorizontal, Plus,
  Newspaper, Activity, BarChart2, BarChart3, Users, Target,
  Briefcase, Mail, MessageSquare, ExternalLink, AlertTriangle,
  Package, Handshake, TrendingDown, DollarSign, Factory, Shield,
  PieChart, FileText, Play, RefreshCw, X,
} from "lucide-react";

// ─── Colour tokens (verified = emerald) ───────────────────────────────────────
const V = {
  grad:   "from-emerald-500 to-teal-600",
  bg:     "bg-emerald-600",
  bgSoft: "bg-emerald-50 dark:bg-emerald-950/20",
  border: "border-emerald-200 dark:border-emerald-900",
  text:   "text-emerald-600 dark:text-emerald-400",
  btn:    "bg-emerald-600 hover:bg-emerald-700 text-white",
  btnOut: "border border-emerald-300 text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
  badge:  "bg-emerald-600 text-white",
};

// ─── Mock data (real platform would source from APIs) ─────────────────────────

const FEATURED_STORIES = [
  {
    id: "fs-1",
    companyName: "NexusTech Logistics Solutions",
    companyInitials: "NL",
    headline: "NexusTech Signs 3-Year Pan-India Contract with Maruti Suzuki",
    summary: "Strategic logistics partnership covers 24 manufacturing plants and 1,800 dealer outlets across India, targeting same-day delivery for 82 key corridors.",
    category: "Partnership",
    industry: "Logistics & Supply Chain",
    country: "India",
    publishedAt: "1 hr ago",
    readMinutes: 4,
    isSponsored: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fs-2",
    companyName: "Solara Pharma Ltd.",
    companyInitials: "SP",
    headline: "Solara Receives USFDA Approval for Key API Manufacturing Plant",
    summary: "The Hyderabad-based facility will now serve 14 US-market formulations, expanding the company's export revenues by an estimated ₹420 Cr annually.",
    category: "Milestone",
    industry: "Pharmaceuticals",
    country: "India",
    publishedAt: "3 hrs ago",
    readMinutes: 3,
    isSponsored: false,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1563213126-a4273aed2016?w=600&auto=format&fit=crop&q=80",
  },
  {
    id: "fs-3",
    companyName: "GreenWave Technologies",
    companyInitials: "GW",
    headline: "GreenWave Secures ₹280 Cr Series C to Scale EV Charging Infrastructure",
    summary: "Funding round led by Motilal Oswal PE will deploy 4,000 fast-charging stations across Tier-2 cities by Q3 2026.",
    category: "Investment",
    industry: "Renewable Energy",
    country: "India",
    publishedAt: "5 hrs ago",
    readMinutes: 5,
    isSponsored: true,
    isFeatured: true,
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=600&auto=format&fit=crop&q=80",
  },
];

const LATEST_NEWS = [
  { id: "ln-1", companyName: "NexusTech Logistics", companyInitials: "NL", headline: "AI-Powered Route Optimisation Reduces Delivery Times by 22%", category: "Product Launch", industry: "Logistics", country: "India", publishedAt: "45 min ago", readMinutes: 3, isSponsored: false, saved: false, following: false },
  { id: "ln-2", companyName: "Solara Pharma Ltd.", companyInitials: "SP", headline: "Q2 Revenue Grows 28% YoY Driven by Export API Demand", category: "Financial Update", industry: "Pharmaceuticals", country: "India", publishedAt: "2 hrs ago", readMinutes: 4, isSponsored: false, saved: false, following: false },
  { id: "ln-3", companyName: "GreenWave Technologies", companyInitials: "GW", headline: "Landmark MoU Signed with NTPC for 500 MW Solar Procurement", category: "Partnership", industry: "Renewable Energy", country: "India", publishedAt: "4 hrs ago", readMinutes: 5, isSponsored: false, saved: false, following: false },
  { id: "ln-4", companyName: "Infovera Systems", companyInitials: "IS", headline: "Enterprise SaaS Platform Achieves ISO 27001 Certification", category: "Milestone", industry: "Technology", country: "India", publishedAt: "6 hrs ago", readMinutes: 3, isSponsored: false, saved: false, following: false },
  { id: "ln-5", companyName: "AxisCargo International", companyInitials: "AC", headline: "New Cold-Chain Facility Opens in JNPT, Adding 18,000 MT Capacity", category: "Expansion", industry: "Logistics", country: "India", publishedAt: "8 hrs ago", readMinutes: 4, isSponsored: false, saved: false, following: false },
  { id: "ln-6", companyName: "PrimeCast Steel Works", companyInitials: "PS", headline: "Company Appoints Former SAIL Director as Chief Operating Officer", category: "Leadership Change", industry: "Steel & Metallurgy", country: "India", publishedAt: "10 hrs ago", readMinutes: 2, isSponsored: false, saved: false, following: false },
  { id: "ln-7", companyName: "BioFresh Agri Exports", companyInitials: "BF", headline: "Organic Produce Export Volume Crosses 12,000 MT in H1 FY26", category: "Milestone", industry: "Agriculture", country: "India", publishedAt: "1 day ago", readMinutes: 3, isSponsored: false, saved: false, following: false },
  { id: "ln-8", companyName: "CloudForge Data Centres", companyInitials: "CF", headline: "₹1,200 Cr Investment Planned for 40 MW Hyperscale Data Centre in Pune", category: "Investment", industry: "Technology", country: "India", publishedAt: "1 day ago", readMinutes: 5, isSponsored: true, saved: false, following: false },
];

const TRENDING_NEWS = {
  today: [
    { rank: 1, companyName: "NexusTech Logistics", headline: "AI Route Optimisation Reduces Delivery Times by 22%", category: "Product Launch", reads: 4820 },
    { rank: 2, companyName: "GreenWave Technologies", headline: "Series C Funding of ₹280 Cr to Deploy 4,000 EV Charging Stations", category: "Investment", reads: 3940 },
    { rank: 3, companyName: "Solara Pharma Ltd.", headline: "USFDA Approval for Key API Manufacturing Plant", category: "Milestone", reads: 3210 },
    { rank: 4, companyName: "Infovera Systems", headline: "Enterprise SaaS Platform Achieves ISO 27001 Certification", category: "Milestone", reads: 2680 },
    { rank: 5, companyName: "CloudForge Data Centres", headline: "₹1,200 Cr Hyperscale Data Centre Investment in Pune", category: "Investment", reads: 2140 },
  ],
  week: [
    { rank: 1, companyName: "AxisCargo International", headline: "New Cold-Chain Facility Opens at JNPT", category: "Expansion", reads: 18400 },
    { rank: 2, companyName: "NexusTech Logistics", headline: "3-Year Maruti Suzuki Pan-India Contract", category: "Partnership", reads: 15200 },
    { rank: 3, companyName: "BioFresh Agri Exports", headline: "Organic Export Volume Crosses 12,000 MT in H1 FY26", category: "Milestone", reads: 11800 },
    { rank: 4, companyName: "PrimeCast Steel Works", headline: "Former SAIL Director Appointed as COO", category: "Leadership Change", reads: 9600 },
    { rank: 5, companyName: "Solara Pharma Ltd.", headline: "Q2 Revenue Grows 28% YoY", category: "Financial Update", reads: 7900 },
  ],
  month: [
    { rank: 1, companyName: "GreenWave Technologies", headline: "₹280 Cr Series C Closes with Motilal Oswal PE", category: "Investment", reads: 54200 },
    { rank: 2, companyName: "Infovera Systems", headline: "Strategic Acquisition of AnalytiQ for ₹320 Cr", category: "M&A", reads: 42800 },
    { rank: 3, companyName: "NexusTech Logistics", headline: "Pan-India Maruti Suzuki Logistics Contract", category: "Partnership", reads: 38600 },
    { rank: 4, companyName: "CloudForge Data Centres", headline: "40 MW Hyperscale Data Centre Greenlit", category: "Investment", reads: 31200 },
    { rank: 5, companyName: "AxisCargo International", headline: "New JNPT Cold-Chain Facility Launch", category: "Expansion", reads: 24900 },
  ],
};

const IMPORTANT_UPDATES = [
  { id: "iu-1", label: "Major Announcement", labelColor: "bg-red-100 text-red-700 dark:bg-red-950/30 dark:text-red-400", companyName: "GreenWave Technologies", companyInitials: "GW", headline: "GreenWave Signs Landmark 500 MW Solar MoU with NTPC for FY26-27 Delivery", industry: "Renewable Energy", publishedAt: "4 hrs ago" },
  { id: "iu-2", label: "Product Launch", labelColor: "bg-blue-100 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400", companyName: "NexusTech Logistics", companyInitials: "NL", headline: "NexusTech Launches AI-First Logistics Platform Covering 24 Plant Operations", industry: "Logistics", publishedAt: "6 hrs ago" },
  { id: "iu-3", label: "Strategic Partnership", labelColor: "bg-purple-100 text-purple-700 dark:bg-purple-950/30 dark:text-purple-400", companyName: "Infovera Systems", companyInitials: "IS", headline: "Infovera and Microsoft Azure Sign Joint Cloud Infrastructure Partnership", industry: "Technology", publishedAt: "1 day ago" },
  { id: "iu-4", label: "Investment", labelColor: "bg-emerald-100 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400", companyName: "CloudForge Data Centres", companyInitials: "CF", headline: "₹1,200 Cr Data Centre Investment: Board Approves Greenfield Pune Campus", industry: "Technology", publishedAt: "2 days ago" },
];

const NEWS_CATEGORIES = [
  { label: "Product Launches", icon: Rocket, count: 284, color: "text-blue-500" },
  { label: "Partnerships", icon: Handshake, count: 196, color: "text-purple-500" },
  { label: "Investments", icon: DollarSign, count: 152, color: "text-emerald-500" },
  { label: "M&A", icon: Briefcase, count: 68, color: "text-amber-500" },
  { label: "Expansion", icon: Globe, count: 118, color: "text-teal-500" },
  { label: "Leadership Changes", icon: Crown, count: 94, color: "text-pink-500" },
  { label: "Awards", icon: Award, count: 76, color: "text-yellow-500" },
  { label: "Events", icon: Calendar, count: 142, color: "text-indigo-500" },
  { label: "Corporate Announcements", icon: Newspaper, count: 312, color: "text-gray-500" },
  { label: "Funding", icon: BarChart3, count: 88, color: "text-cyan-500" },
  { label: "Contracts & Deals", icon: FileText, count: 134, color: "text-orange-500" },
  { label: "Research & Innovation", icon: Sparkles, count: 62, color: "text-violet-500" },
];

const INDUSTRIES = [
  { name: "Technology", icon: "💻", newsCount: 312, topStory: "AI SaaS expansions surge in Q2" },
  { name: "Healthcare", icon: "🏥", newsCount: 203, topStory: "USFDA approval wave drives exports" },
  { name: "Logistics", icon: "🚢", newsCount: 231, topStory: "AI route optimisation adoption rises" },
  { name: "Renewable Energy", icon: "⚡", newsCount: 174, topStory: "Solar MoU signings accelerate" },
  { name: "Pharmaceuticals", icon: "💊", newsCount: 195, topStory: "API manufacturing gains momentum" },
  { name: "Agriculture", icon: "🌾", newsCount: 158, topStory: "Organic export volumes peak in H1" },
];

const COUNTRIES = [
  { name: "India", flag: "🇮🇳", storyCount: 1842, activity: "High" },
  { name: "USA", flag: "🇺🇸", storyCount: 486, activity: "High" },
  { name: "UK", flag: "🇬🇧", storyCount: 214, activity: "Medium" },
  { name: "UAE", flag: "🇦🇪", storyCount: 312, activity: "High" },
  { name: "Germany", flag: "🇩🇪", storyCount: 186, activity: "Medium" },
  { name: "Singapore", flag: "🇸🇬", storyCount: 248, activity: "Medium" },
];

const COMPANIES_MAKING_NEWS = [
  { name: "NexusTech Logistics Solutions", initials: "NL", industry: "Logistics", recentStories: 12, followers: "2.4K" },
  { name: "GreenWave Technologies", initials: "GW", industry: "Renewable Energy", recentStories: 9, followers: "5.1K" },
  { name: "Solara Pharma Ltd.", initials: "SP", industry: "Pharmaceuticals", recentStories: 8, followers: "3.2K" },
  { name: "CloudForge Data Centres", initials: "CF", industry: "Technology", recentStories: 7, followers: "1.8K" },
  { name: "Infovera Systems", initials: "IS", industry: "Technology", recentStories: 6, followers: "4.0K" },
  { name: "AxisCargo International", initials: "AC", industry: "Logistics", recentStories: 5, followers: "1.2K" },
];

const MOST_ACTIVE_PUBLISHERS = [
  { rank: 1, name: "NexusTech Logistics Solutions", initials: "NL", storiesThisMonth: 28, industry: "Logistics" },
  { rank: 2, name: "GreenWave Technologies", initials: "GW", storiesThisMonth: 24, industry: "Renewable Energy" },
  { rank: 3, name: "Infovera Systems", initials: "IS", storiesThisMonth: 19, industry: "Technology" },
  { rank: 4, name: "Solara Pharma Ltd.", initials: "SP", storiesThisMonth: 17, industry: "Pharmaceuticals" },
  { rank: 5, name: "CloudForge Data Centres", initials: "CF", storiesThisMonth: 14, industry: "Technology" },
];

const COMPANIES_TO_WATCH = [
  { name: "NexusTech Logistics", initials: "NL", reason: "3 major partnerships signed in 30 days", industry: "Logistics", signal: "+42% news velocity" },
  { name: "GreenWave Technologies", initials: "GW", reason: "Series C closed + 2 government MoUs", industry: "Renewable Energy", signal: "+68% engagement" },
  { name: "CloudForge Data Centres", initials: "CF", reason: "₹1,200 Cr investment greenlit + MoU with Jio", industry: "Technology", signal: "+51% follower growth" },
];

const LEADERSHIP_MOVES = [
  { companyName: "PrimeCast Steel Works", companyInitials: "PS", personName: "Suresh Bajpai", role: "Chief Operating Officer", type: "New Appointment", publishedAt: "10 hrs ago" },
  { companyName: "Infovera Systems", companyInitials: "IS", personName: "Meera Krishnan", role: "Chief Technology Officer", type: "Promotion", publishedAt: "2 days ago" },
  { companyName: "BioFresh Agri Exports", companyInitials: "BF", personName: "Harinder Singh", role: "Board Director", type: "Board Change", publishedAt: "3 days ago" },
];

const PRODUCT_LAUNCHES = [
  { companyName: "NexusTech Logistics", companyInitials: "NL", product: "SmartRoute AI Platform v3.0", industry: "Logistics", launchDate: "Aug 2026", summary: "AI-driven logistics optimisation covering 24 plant operations." },
  { companyName: "Infovera Systems", companyInitials: "IS", product: "InfCloud Enterprise Suite", industry: "Technology", launchDate: "Jul 2026", summary: "End-to-end SaaS infrastructure for enterprise procurement teams." },
  { companyName: "GreenWave Technologies", companyInitials: "GW", product: "FastCharge Station Gen 2", industry: "Renewable Energy", launchDate: "Aug 2026", summary: "150 kW DC fast-charging stations for highway and urban deployment." },
];

const PARTNERSHIPS_DEALS = [
  { companyA: "NexusTech Logistics", companyAInitials: "NL", companyB: "Maruti Suzuki", type: "Strategic Partnership", summary: "3-year pan-India logistics contract covering 24 plants.", publishedAt: "1 hr ago" },
  { companyA: "GreenWave Technologies", companyAInitials: "GW", companyB: "NTPC", type: "MoU", summary: "500 MW solar procurement agreement for FY26-27.", publishedAt: "4 hrs ago" },
  { companyA: "Infovera Systems", companyAInitials: "IS", companyB: "Microsoft Azure", type: "Joint Cloud Partnership", summary: "Hybrid cloud infrastructure co-selling deal for enterprise market.", publishedAt: "1 day ago" },
];

const GLOBAL_EXPANSION = [
  { companyName: "AxisCargo International", companyInitials: "AC", expansion: "New Cold-Chain Facility at JNPT", markets: "West India", publishedAt: "8 hrs ago" },
  { companyName: "NexusTech Logistics", companyInitials: "NL", expansion: "Expanding into Southeast Asia Markets", markets: "ASEAN", publishedAt: "3 days ago" },
  { companyName: "Solara Pharma Ltd.", companyInitials: "SP", expansion: "New API Manufacturing Plant — Hyderabad Phase 2", markets: "India + US Export", publishedAt: "5 days ago" },
];

const INVESTMENTS_FUNDING = [
  { companyName: "GreenWave Technologies", companyInitials: "GW", amount: "₹280 Cr", type: "Series C", investor: "Motilal Oswal PE", publishedAt: "5 hrs ago" },
  { companyName: "CloudForge Data Centres", companyInitials: "CF", amount: "₹1,200 Cr", type: "Greenfield Capex", investor: "Internal + PE", publishedAt: "1 day ago" },
  { companyName: "BioFresh Agri Exports", companyInitials: "BF", amount: "₹85 Cr", type: "Series B", investor: "Lok Capital", publishedAt: "1 week ago" },
];

const MOST_READ = {
  today: [
    { rank: 1, companyName: "NexusTech Logistics", headline: "AI Route Optimisation Platform Cuts Delivery Times by 22%", reads: 4820 },
    { rank: 2, companyName: "GreenWave Technologies", headline: "Series C Funding Closed at ₹280 Cr", reads: 3940 },
    { rank: 3, companyName: "Solara Pharma", headline: "USFDA Approval for Hyderabad API Plant", reads: 3210 },
  ],
  week: [
    { rank: 1, companyName: "AxisCargo International", headline: "New Cold-Chain Facility at JNPT Adds 18,000 MT Capacity", reads: 18400 },
    { rank: 2, companyName: "NexusTech Logistics", headline: "3-Year Maruti Suzuki Contract Signed", reads: 15200 },
    { rank: 3, companyName: "BioFresh Agri Exports", headline: "Organic Export Volumes Cross 12,000 MT in H1", reads: 11800 },
  ],
  month: [
    { rank: 1, companyName: "GreenWave Technologies", headline: "Series C Closes; ₹280 Cr to Deploy 4,000 Stations", reads: 54200 },
    { rank: 2, companyName: "Infovera Systems", headline: "AnalytiQ Acquired for ₹320 Cr in All-Cash Deal", reads: 42800 },
    { rank: 3, companyName: "CloudForge Data Centres", headline: "40 MW Hyperscale Data Centre Greenlit for Pune", reads: 38600 },
  ],
};

const RELATED_STORIES = [
  { type: "Industry News", title: "India Logistics Sector Sees 19% Growth in Verified Company Activity", publishedAt: "2 hrs ago", href: "/en/poc-v2/sector-news/all" },
  { type: "Leader News", title: "CEOs of Verified Logistics Companies Discuss AI Adoption at Trade Summit", publishedAt: "1 day ago", href: "/en/poc-v2/leader-news/verified/news" },
  { type: "Intelligence Report", title: "Verified Company News Trends: Q2 2026 Sector Analysis", publishedAt: "3 days ago", href: "/en/poc-v2/sector-news/intelligence" },
];

const QUICK_FILTERS = ["Latest", "Trending", "Featured", "Product Launches", "Partnerships", "Investments", "Expansion", "Leadership"];

// ─── Sub-components ───────────────────────────────────────────────────────────

const VerifiedBadge = () => (
  <span className="inline-flex items-center gap-0.5 bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800 shrink-0">
    <CheckCircle className="h-2.5 w-2.5" /> Verified
  </span>
);

const SponsoredBadge = () => (
  <span className="text-[7px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded uppercase tracking-wider">
    Sponsored
  </span>
);

const FeaturedBadge = () => (
  <span className="text-[7px] font-bold bg-blue-100 dark:bg-blue-950/30 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800 px-1.5 py-0.5 rounded uppercase tracking-wider">
    Featured
  </span>
);

function SectionHeader({ title, cta, ctaHref }: { title: string; cta?: string; ctaHref?: string }) {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-5">
      <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
      {cta && ctaHref && (
        <Link href={ctaHref} className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5">
          {cta} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function VerifiedCompanyNewsView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState("Latest");
  const [trendingTab, setTrendingTab] = useState<"today" | "week" | "month">("today");
  const [mostReadTab, setMostReadTab] = useState<"today" | "week" | "month">("today");
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [followedIds, setFollowedIds] = useState<string[]>([]);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertCreated, setAlertCreated] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  const toggleSave = (id: string) =>
    setSavedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const toggleFollow = (id: string) =>
    setFollowedIds((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));

  const handleCreateAlert = () => {
    if (!alertEmail) return;
    setAlertCreated(true);
  };

  const handleNewsletter = () => {
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── Breadcrumb ─────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 lg:px-6 py-3">
        <ol className="flex items-center gap-1.5 text-[10px] text-gray-400 flex-wrap">
          <li><Link href="/en/poc-v2" className="hover:text-emerald-600 transition-colors">iGEN News</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/en/poc-v2/company-news" className="hover:text-emerald-600 transition-colors">Company News</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/en/poc-v2/company-news/verified/pages" className="hover:text-emerald-600 transition-colors">Verified Companies</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-bold text-emerald-600 dark:text-emerald-400">Company News</li>
        </ol>
      </nav>

      {/* ── Hero ───────────────────────────────────────────────────────────── */}
      <section className={`bg-gradient-to-br ${V.grad} relative overflow-hidden`} aria-labelledby="hero-heading">
        {/* Subtle mesh overlay */}
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6 py-10">
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div className="flex-1 space-y-4">
              {/* Eyebrow */}
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-white/20 border border-white/30 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified Company News
                </span>
                <span className="bg-white/15 border border-white/25 text-white/80 text-[9px] font-bold px-2.5 py-1 rounded-full">
                  3,200+ Verified Companies · Live Updates
                </span>
              </div>

              {/* H1 */}
              <h1 id="hero-heading" className="font-bold text-3xl md:text-4xl text-white leading-tight">
                Verified Company News
              </h1>
              <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                Stay updated with announcements, product launches, partnerships, investments, expansions and business developments from verified companies.
              </p>

              {/* Search bar */}
              <div className="flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <input
                    type="search"
                    id="hero-search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search company news, company, industry or topic..."
                    aria-label="Search company news"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900 border border-white/20 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  />
                </div>
                <button className="bg-white text-emerald-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-lg shrink-0 flex items-center gap-1.5">
                  <Search className="h-4 w-4" /> Explore News
                </button>
              </div>

              {/* Quick filter pills */}
              <div className="flex gap-2 flex-wrap" role="group" aria-label="Quick category filters">
                {QUICK_FILTERS.map((f) => (
                  <button
                    key={f}
                    onClick={() => setActiveQuickFilter(f)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${
                      activeQuickFilter === f
                        ? "bg-white text-emerald-700 border-white shadow-sm"
                        : "bg-white/15 border-white/30 text-white hover:bg-white/25"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>

            {/* Hero CTA card */}
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-5 space-y-3 shrink-0 w-full lg:w-64">
              <div className="space-y-1">
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">For Companies</span>
                <h3 className="text-white font-bold text-base">Publish Company News</h3>
                <p className="text-white/70 text-[11px] leading-relaxed">Reach a professional B2B audience. Publish announcements, launches, partnerships and more.</p>
              </div>
              <Link href="/eoi" className="w-full bg-white text-emerald-700 hover:bg-gray-50 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all">
                <Plus className="h-3.5 w-3.5" /> Publish Company News
              </Link>
              <Link href="/eoi" className="w-full bg-transparent border border-white/30 text-white hover:bg-white/10 font-bold text-xs py-2 rounded-xl flex items-center justify-center gap-1.5 transition-all">
                <BarChart2 className="h-3.5 w-3.5" /> View Publishing Plans
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Search & Filter Bar ─────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 sticky top-28 z-30 shadow-sm" aria-label="Search and filter controls">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3">
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative flex-1 min-w-48">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" aria-hidden="true" />
              <input
                type="search"
                aria-label="Filter news"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search verified company news..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-emerald-500"
              />
            </div>

            {/* Inline filters */}
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {["All Industries", "All Countries", "All Types", "This Week"].map((f) => (
                <select key={f} aria-label={f} className="text-[10px] font-bold px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                  <option>{f}</option>
                </select>
              ))}
              <select aria-label="Sort by" className="text-[10px] font-bold px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                <option>Latest</option>
                <option>Most Read</option>
                <option>Most Saved</option>
                <option>Trending</option>
                <option>Featured</option>
              </select>
            </div>

            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-label="Toggle filters"
              className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-400 transition-colors md:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
          </div>

          {/* Mobile filter drawer */}
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2 md:hidden">
              {["All Industries", "All Countries", "All Types", "This Week", "Latest"].map((f) => (
                <select key={f} aria-label={f} className="text-[10px] font-bold px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 outline-none">
                  <option>{f}</option>
                </select>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-8 space-y-12">

        {/* ── Featured Company Stories ─────────────────────────────────────── */}
        <section aria-labelledby="featured-heading">
          <SectionHeader title="Featured Company Stories" cta="View All Featured" ctaHref="/eoi" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_STORIES.map((story) => (
              <article key={story.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group flex flex-col">
                {/* Thumbnail */}
                <div className="relative h-40 overflow-hidden bg-gray-200 dark:bg-gray-800 shrink-0">
                  <img src={story.image} alt={story.headline} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-2.5 left-3 flex gap-1.5 flex-wrap">
                    <span className="text-[8px] font-bold bg-emerald-600 text-white px-2 py-0.5 rounded uppercase">{story.category}</span>
                    {story.isFeatured && <FeaturedBadge />}
                    {story.isSponsored && <SponsoredBadge />}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col gap-2">
                  <div className="flex items-center gap-2">
                    <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[9px] shrink-0">{story.companyInitials}</div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-bold text-[11px] text-gray-900 dark:text-white truncate">{story.companyName}</span>
                      <VerifiedBadge />
                    </div>
                  </div>

                  <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors flex-1">
                    {story.headline}
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-relaxed line-clamp-2">{story.summary}</p>

                  <div className="flex items-center justify-between text-[9px] text-gray-400 pt-1 border-t border-gray-50 dark:border-gray-850">
                    <span>{story.industry} · {story.country}</span>
                    <span className="flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {story.readMinutes} min · {story.publishedAt}</span>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toggleSave(story.id)}
                        aria-label={savedIds.includes(story.id) ? "Remove bookmark" : "Bookmark this story"}
                        className={`p-1.5 rounded-lg border transition-all ${savedIds.includes(story.id) ? "border-emerald-200 bg-emerald-50 text-emerald-600" : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600"}`}
                      >
                        {savedIds.includes(story.id) ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                      </button>
                      <button aria-label="Share this story" className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600 transition-colors">
                        <Share2 className="h-3 w-3" />
                      </button>
                    </div>
                    <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                      Read Story <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* ── Main Feed + Sidebar ───────────────────────────────────────────── */}
        <div className="grid grid-cols-12 gap-8">

          {/* LEFT: Latest + Trending + Important Updates ─────────────────── */}
          <div className="col-span-12 lg:col-span-8 space-y-10">

            {/* ── Latest Verified Company News ──────────────────────────── */}
            <section aria-labelledby="latest-heading">
              <SectionHeader title="Latest Verified Company News" cta="View All Latest" ctaHref="/eoi" />
              <div className="space-y-3">
                {LATEST_NEWS.map((article) => {
                  const isSaved = savedIds.includes(article.id);
                  const isFollowing = followedIds.includes(article.id);
                  return (
                    <article
                      key={article.id}
                      className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group"
                    >
                      <div className="flex items-start gap-3">
                        {/* Company logo */}
                        <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center font-bold text-[11px] text-white shrink-0 mt-0.5">
                          {article.companyInitials}
                        </div>
                        <div className="flex-1 space-y-1.5 min-w-0">
                          {/* Company + verified + category */}
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">{article.companyName}</span>
                            <VerifiedBadge />
                            <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${V.bgSoft} ${V.text} border ${V.border}`}>{article.category}</span>
                            {article.isSponsored && <SponsoredBadge />}
                          </div>
                          {/* Headline */}
                          <Link href="/eoi" className="block">
                            <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">
                              {article.headline}
                            </h3>
                          </Link>
                          {/* Meta */}
                          <div className="flex items-center justify-between flex-wrap gap-2">
                            <span className="text-[9px] text-gray-400">{article.industry} · {article.country} · <Clock className="h-2.5 w-2.5 inline" /> {article.readMinutes} min · {article.publishedAt}</span>
                            {/* Actions */}
                            <div className="flex items-center gap-1.5">
                              <button
                                onClick={() => toggleSave(article.id)}
                                aria-label={isSaved ? "Remove bookmark" : "Save article"}
                                className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-lg border transition-all ${isSaved ? "border-emerald-200 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30" : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600"}`}
                              >
                                {isSaved ? <BookmarkCheck className="h-3 w-3" /> : <Bookmark className="h-3 w-3" />}
                                {isSaved ? "Saved" : "Save"}
                              </button>
                              <button aria-label="Share article" className="flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600 transition-colors">
                                <Share2 className="h-3 w-3" /> Share
                              </button>
                              <button
                                onClick={() => toggleFollow(article.id)}
                                aria-label={isFollowing ? "Unfollow company" : "Follow company"}
                                className={`flex items-center gap-1 text-[9px] font-bold px-2 py-1 rounded-lg border transition-all ${isFollowing ? "border-emerald-300 bg-emerald-50 text-emerald-600 dark:bg-emerald-950/30" : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600"}`}
                              >
                                {isFollowing ? <BellRing className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                                {isFollowing ? "Following" : "Follow"}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </article>
                  );
                })}

                {/* Empty state */}
                {LATEST_NEWS.length === 0 && (
                  <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-10 text-center space-y-3">
                    <Newspaper className="h-10 w-10 text-gray-300 mx-auto" aria-hidden="true" />
                    <p className="text-sm font-bold text-gray-500">No verified company news is available right now.</p>
                    <Link href="/eoi" className={`inline-flex items-center gap-1.5 ${V.btn} font-bold text-xs px-5 py-2.5 rounded-lg transition-all`}>
                      Explore All Company News <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                )}
              </div>
            </section>

            {/* ── Trending Now ──────────────────────────────────────────── */}
            <section aria-labelledby="trending-heading">
              <SectionHeader title="Trending Now" />
              {/* Tabs */}
              <div className="flex gap-1 mb-4" role="tablist" aria-label="Trending period">
                {(["today", "week", "month"] as const).map((tab) => (
                  <button
                    key={tab}
                    role="tab"
                    aria-selected={trendingTab === tab}
                    onClick={() => setTrendingTab(tab)}
                    className={`px-4 py-1.5 rounded-lg text-[10px] font-bold transition-all capitalize ${trendingTab === tab ? `${V.bg} text-white` : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700"}`}
                  >
                    {tab === "today" ? "Today" : tab === "week" ? "This Week" : "This Month"}
                  </button>
                ))}
              </div>
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
                <div role="tabpanel" className="divide-y divide-gray-50 dark:divide-gray-850">
                  {TRENDING_NEWS[trendingTab].map((item) => (
                    <Link key={item.rank} href="/eoi" className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                      <span className="font-extrabold text-xl text-gray-100 dark:text-gray-800 w-6 shrink-0">{item.rank}</span>
                      <div className="flex-1 min-w-0">
                        <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${V.bgSoft} ${V.text} border ${V.border} uppercase`}>{item.category}</span>
                        <p className="text-xs font-bold text-gray-900 dark:text-white mt-1 group-hover:text-emerald-600 transition-colors leading-snug truncate">{item.headline}</p>
                        <span className="text-[9px] text-gray-400">{item.companyName}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="flex items-center gap-1 text-[9px] text-gray-400">
                          <Eye className="h-2.5 w-2.5" />
                          <span className="font-bold text-gray-700 dark:text-gray-300">{item.reads.toLocaleString()}</span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>

            {/* ── Important Company Updates ─────────────────────────────── */}
            <section aria-labelledby="updates-heading">
              <SectionHeader title="Important Company Updates" />
              <div className="space-y-3">
                {IMPORTANT_UPDATES.map((update) => (
                  <article key={update.id} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm transition-all group">
                    <div className="flex items-start gap-3">
                      <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{update.companyInitials}</div>
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${update.labelColor} uppercase`}>{update.label}</span>
                          <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">{update.companyName}</span>
                          <VerifiedBadge />
                        </div>
                        <Link href="/eoi">
                          <h3 className="text-sm font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">{update.headline}</h3>
                        </Link>
                        <span className="text-[9px] text-gray-400">{update.industry} · {update.publishedAt}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

          </div>

          {/* RIGHT: Sidebar ─────────────────────────────────────────────── */}
          <div className="col-span-12 lg:col-span-4 space-y-6">

            {/* Explore by Category */}
            <section aria-labelledby="categories-sidebar-heading">
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
                <div className={`bg-gradient-to-r ${V.grad} text-white p-4`}>
                  <h2 id="categories-sidebar-heading" className="font-bold text-sm">Explore by Category</h2>
                  <p className="text-white/70 text-[10px] mt-0.5">Browse verified company news by type</p>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-850">
                  {NEWS_CATEGORIES.slice(0, 8).map((cat) => {
                    const CatIcon = cat.icon;
                    return (
                      <Link key={cat.label} href="/eoi" className="flex items-center gap-3 px-4 py-2.5 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                        <CatIcon className={`h-4 w-4 ${cat.color} shrink-0`} aria-hidden="true" />
                        <span className="text-xs font-semibold text-gray-700 dark:text-gray-300 group-hover:text-emerald-600 transition-colors flex-1">{cat.label}</span>
                        <span className="text-[9px] font-bold text-gray-400">{cat.count}</span>
                        <ChevronRight className="h-3 w-3 text-gray-300" />
                      </Link>
                    );
                  })}
                </div>
                <div className="p-3 border-t border-gray-100 dark:border-gray-850">
                  <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5 justify-center">
                    View All 12 Categories <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            </section>

            {/* Most Active Publishers */}
            <section aria-labelledby="active-publishers-heading">
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
                <div className="p-4 border-b border-gray-100 dark:border-gray-850">
                  <h2 id="active-publishers-heading" className="font-bold text-xs text-gray-900 dark:text-white uppercase tracking-wider">Most Active Verified Companies</h2>
                </div>
                <div className="divide-y divide-gray-50 dark:divide-gray-850">
                  {MOST_ACTIVE_PUBLISHERS.map((pub) => (
                    <div key={pub.rank} className="flex items-center gap-3 p-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                      <span className="font-extrabold text-base text-gray-100 dark:text-gray-800 w-5 shrink-0">{pub.rank}</span>
                      <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{pub.initials}</div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white block truncate">{pub.name}</span>
                        <span className="text-[9px] text-gray-400">{pub.storiesThisMonth} stories this month</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Company News Alerts */}
            <section aria-labelledby="alerts-heading">
              <div className="bg-gradient-to-br from-slate-950 to-[#162d54] border border-slate-800 rounded-2xl p-5 space-y-4">
                <div>
                  <Bell className="h-5 w-5 text-emerald-400 mb-2" aria-hidden="true" />
                  <h2 id="alerts-heading" className="font-bold text-sm text-white">Never Miss Important Company News</h2>
                  <p className="text-slate-400 text-[10px] mt-1 leading-relaxed">Get alerts when verified companies publish news matching your interests.</p>
                </div>
                {!alertCreated ? (
                  <div className="space-y-2">
                    <input
                      type="email"
                      id="alert-email"
                      value={alertEmail}
                      onChange={(e) => setAlertEmail(e.target.value)}
                      placeholder="Your email address"
                      aria-label="Email for news alerts"
                      className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                    />
                    <select aria-label="Alert topic" className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 outline-none">
                      <option>All Verified Company News</option>
                      <option>Technology Companies</option>
                      <option>Logistics & Supply Chain</option>
                      <option>Renewable Energy</option>
                      <option>Pharmaceuticals</option>
                      <option>Product Launches Only</option>
                      <option>Partnerships & Deals</option>
                    </select>
                    <button onClick={handleCreateAlert} className={`w-full ${V.btn} font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all`}>
                      <Bell className="h-3.5 w-3.5" /> Create Alert
                    </button>
                  </div>
                ) : (
                  <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-3 flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    <span className="text-xs font-bold text-emerald-300">Alert created successfully!</span>
                  </div>
                )}
              </div>
            </section>

            {/* AI News Intelligence */}
            <section aria-labelledby="ai-intelligence-heading">
              <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden shadow-xs">
                <div className={`bg-gradient-to-r ${V.grad} text-white p-4`}>
                  <div className="flex items-center gap-2">
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    <h2 id="ai-intelligence-heading" className="font-bold text-sm">AI Company News Intelligence</h2>
                  </div>
                  <p className="text-white/75 text-[10px] mt-1">AI-powered analysis of verified company news stories</p>
                </div>
                <div className="p-4 space-y-3">
                  {/* Preview locked content */}
                  <div className="space-y-2 relative">
                    <div className="space-y-1.5">
                      {["AI Summary", "Why It Matters", "Key Companies", "Key Markets", "Potential Impact"].map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 shrink-0" />
                          <span className="text-[10px] font-semibold text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                      ))}
                    </div>
                    {/* Lock overlay */}
                    <div className="absolute inset-0 backdrop-blur-xs bg-white/60 dark:bg-gray-900/60 rounded-lg flex flex-col items-center justify-center gap-2">
                      <Lock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                      <span className="text-[10px] font-bold text-gray-500 text-center">Available for Premium members</span>
                    </div>
                  </div>
                  <Link href="/eoi" className={`w-full ${V.btn} font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all`}>
                    <Sparkles className="h-3.5 w-3.5" /> Unlock Full AI Intelligence
                  </Link>
                </div>
              </div>
            </section>

          </div>
        </div>

        {/* ── News by Industry ──────────────────────────────────────────────── */}
        <section aria-labelledby="by-industry-heading">
          <SectionHeader title="Company News by Industry" cta="Explore All Industries" ctaHref="/en/poc-v2/sector-news/all" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INDUSTRIES.map((ind) => (
              <Link key={ind.name} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group space-y-2 text-center">
                <span className="text-3xl">{ind.icon}</span>
                <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{ind.name}</h3>
                <p className="text-[9px] text-gray-400 leading-snug">{ind.topStory}</p>
                <div className="text-[9px] font-bold text-emerald-600">{ind.newsCount} stories</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── News by Country ───────────────────────────────────────────────── */}
        <section aria-labelledby="by-country-heading">
          <SectionHeader title="Company News by Country" cta="Explore All Countries" ctaHref="/en/poc-v2/country-news/all" />
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {COUNTRIES.map((c) => (
              <Link key={c.name} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group text-center space-y-2">
                <span className="text-3xl">{c.flag}</span>
                <h3 className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors">{c.name}</h3>
                <div className="text-[9px] font-bold text-gray-500">{c.storyCount.toLocaleString()} stories</div>
                <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full ${c.activity === "High" ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-500"}`}>{c.activity} Activity</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Companies Making News + Companies to Watch ────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Companies Making News */}
          <section aria-labelledby="companies-news-heading">
            <SectionHeader title="Companies Making News" />
            <div className="space-y-3">
              {COMPANIES_MAKING_NEWS.map((co) => (
                <div key={co.name} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 flex items-center gap-3 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{co.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-xs text-gray-900 dark:text-white truncate">{co.name}</span>
                      <VerifiedBadge />
                    </div>
                    <div className="flex items-center gap-2 text-[9px] text-gray-400 mt-0.5">
                      <span>{co.recentStories} recent stories</span>
                      <span>·</span>
                      <span className="flex items-center gap-0.5"><Users className="h-2.5 w-2.5" /> {co.followers} followers</span>
                    </div>
                  </div>
                  <Link href="/eoi" className={`text-[9px] font-bold px-2.5 py-1.5 rounded-lg ${V.btn} transition-all shrink-0 flex items-center gap-0.5`}>
                    Explore <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Companies to Watch */}
          <section aria-labelledby="watch-heading">
            <SectionHeader title="Companies to Watch" />
            <div className="space-y-3">
              {COMPANIES_TO_WATCH.map((co) => (
                <div key={co.name} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all space-y-2">
                  <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{co.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-xs text-gray-900 dark:text-white truncate">{co.name}</span>
                        <VerifiedBadge />
                      </div>
                      <span className="text-[9px] text-gray-400">{co.industry}</span>
                    </div>
                    <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 px-1.5 py-0.5 rounded shrink-0">{co.signal}</span>
                  </div>
                  <p className="text-[10px] text-gray-500 leading-snug pl-11">{co.reason}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Product Launch Radar + Leadership Moves ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Product Launch Radar */}
          <section aria-labelledby="product-radar-heading">
            <SectionHeader title="Product Launch Radar" cta="Explore All Launches" ctaHref="/eoi" />
            <div className="space-y-3">
              {PRODUCT_LAUNCHES.map((launch, i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 transition-all space-y-2">
                  <div className="flex items-center gap-2">
                    <Rocket className="h-4 w-4 text-blue-500 shrink-0" aria-hidden="true" />
                    <span className="font-bold text-[10px] text-emerald-600">{launch.companyName}</span>
                    <VerifiedBadge />
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white">{launch.product}</h3>
                  <p className="text-[10px] text-gray-500 leading-snug">{launch.summary}</p>
                  <div className="flex items-center justify-between text-[9px] text-gray-400">
                    <span>{launch.industry}</span>
                    <span className="flex items-center gap-1"><Calendar className="h-2.5 w-2.5" /> {launch.launchDate}</span>
                  </div>
                  <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                    Explore Launch <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>

          {/* Leadership Moves */}
          <section aria-labelledby="leadership-heading">
            <SectionHeader title="Leadership Moves" cta="Explore Leadership News" ctaHref="/en/poc-v2/leader-news/verified/news" />
            <div className="space-y-3">
              {LEADERSHIP_MOVES.map((move, i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 transition-all">
                  <div className="flex items-start gap-3">
                    <div className="h-10 w-10 rounded-xl bg-pink-500 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{move.companyInitials}</div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-pink-100 dark:bg-pink-950/30 text-pink-700 dark:text-pink-400">{move.type}</span>
                        <span className="font-bold text-[11px] text-gray-700 dark:text-gray-300">{move.companyName}</span>
                      </div>
                      <p className="text-xs font-bold text-gray-900 dark:text-white">{move.personName}</p>
                      <p className="text-[9px] text-gray-400">{move.role} · {move.publishedAt}</p>
                    </div>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <Link href="/en/poc-v2/leader-news/verified/news" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5 justify-center">
                  Explore All Leadership News <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>
        </div>

        {/* ── Partnerships & Deals + Global Expansion ───────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Partnerships & Deals */}
          <section aria-labelledby="partnerships-heading">
            <SectionHeader title="Partnerships & Deals" cta="Explore All Deals" ctaHref="/eoi" />
            <div className="space-y-3">
              {PARTNERSHIPS_DEALS.map((deal, i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 transition-all space-y-2">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-purple-100 dark:bg-purple-950/30 text-purple-700 dark:text-purple-400 uppercase">{deal.type}</span>
                    <span className="font-bold text-[11px] text-emerald-600">{deal.companyA}</span>
                    <VerifiedBadge />
                    <span className="text-[9px] text-gray-400">× {deal.companyB}</span>
                  </div>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-snug">{deal.summary}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-[9px] text-gray-400">{deal.publishedAt}</span>
                    <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                      Read More <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Global Expansion */}
          <section aria-labelledby="expansion-heading">
            <SectionHeader title="Global Expansion" cta="Explore All Expansion" ctaHref="/eoi" />
            <div className="space-y-3">
              {GLOBAL_EXPANSION.map((exp, i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 transition-all space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-teal-500 shrink-0" aria-hidden="true" />
                    <span className="font-bold text-[11px] text-emerald-600">{exp.companyName}</span>
                    <VerifiedBadge />
                  </div>
                  <h3 className="font-bold text-xs text-gray-900 dark:text-white">{exp.expansion}</h3>
                  <div className="flex items-center justify-between text-[9px] text-gray-400">
                    <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> {exp.markets}</span>
                    <span>{exp.publishedAt}</span>
                  </div>
                  <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                    Explore <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ── Investment & Funding ──────────────────────────────────────────── */}
        <section aria-labelledby="investment-heading">
          <SectionHeader title="Investment & Funding" cta="Explore All Investment News" ctaHref="/eoi" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {INVESTMENTS_FUNDING.map((inv, i) => (
              <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 hover:shadow-md hover:border-emerald-300 transition-all space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{inv.companyInitials}</div>
                  <div>
                    <div className="flex items-center gap-1">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{inv.companyName}</span>
                      <VerifiedBadge />
                    </div>
                  </div>
                </div>
                <div>
                  <div className="font-extrabold text-xl text-emerald-600">{inv.amount}</div>
                  <div className="text-[9px] font-bold text-gray-500 uppercase">{inv.type}</div>
                </div>
                <div className="text-[10px] text-gray-400">Led by: <span className="font-bold text-gray-600 dark:text-gray-300">{inv.investor}</span></div>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-400">{inv.publishedAt}</span>
                  <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                    Read More <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Most Read + Most Saved ────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Most Read */}
          <section aria-labelledby="most-read-heading">
            <SectionHeader title="Most Read" />
            <div className="flex gap-1 mb-4" role="tablist" aria-label="Most read period">
              {(["today", "week", "month"] as const).map((tab) => (
                <button key={tab} role="tab" aria-selected={mostReadTab === tab} onClick={() => setMostReadTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all capitalize ${mostReadTab === tab ? `${V.bg} text-white` : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700"}`}>
                  {tab === "today" ? "Today" : tab === "week" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden" role="tabpanel">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {MOST_READ[mostReadTab].map((item) => (
                  <Link key={item.rank} href="/eoi" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <span className="font-extrabold text-xl text-gray-100 dark:text-gray-800 w-5 shrink-0">{item.rank}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">{item.headline}</p>
                      <span className="text-[9px] text-gray-400">{item.companyName}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-1 text-[9px] text-gray-400 justify-end">
                        <Eye className="h-2.5 w-2.5" />
                        <span className="font-bold text-gray-700 dark:text-gray-300">{item.reads.toLocaleString()}</span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Most Saved */}
          <section aria-labelledby="most-saved-heading">
            <SectionHeader title="Most Saved" />
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {FEATURED_STORIES.concat(FEATURED_STORIES).slice(0, 3).map((story, i) => (
                  <Link key={i} href="/eoi" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <span className="font-extrabold text-xl text-gray-100 dark:text-gray-800 w-5 shrink-0">{i + 1}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">{story.headline}</p>
                      <span className="text-[9px] text-gray-400">{story.companyName}</span>
                    </div>
                    <Bookmark className="h-3.5 w-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100 dark:border-gray-850 text-center">
                <p className="text-[9px] text-gray-400">Save articles to see your personal saved list</p>
              </div>
            </div>
          </section>
        </div>

        {/* ── Recommended News ─────────────────────────────────────────────── */}
        <section aria-labelledby="recommended-heading">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h2 id="recommended-heading" className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Recommended for You</h2>
                <p className="text-[10px] text-gray-400 mt-0.5">Recommended because you follow Technology and Logistics.</p>
              </div>
              <span className="text-[9px] font-bold bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 border border-emerald-200 dark:border-emerald-800 px-2 py-1 rounded-lg flex items-center gap-1">
                <Sparkles className="h-3 w-3" /> Personalized
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {LATEST_NEWS.slice(0, 3).map((article) => (
                <Link key={article.id} href="/eoi" className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 hover:border-emerald-300 transition-all group space-y-2">
                  <div className="flex items-center gap-1.5">
                    <div className="h-7 w-7 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[9px] shrink-0">{article.companyInitials}</div>
                    <span className="font-bold text-[10px] text-gray-700 dark:text-gray-300 truncate">{article.companyName}</span>
                    <VerifiedBadge />
                  </div>
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">{article.headline}</h3>
                  <span className="text-[9px] text-gray-400 flex items-center gap-1"><Clock className="h-2.5 w-2.5" /> {article.readMinutes} min · {article.publishedAt}</span>
                </Link>
              ))}
            </div>
            <p className="text-[10px] text-gray-400 text-center">
              <Link href="/eoi" className="text-emerald-600 font-bold hover:underline">Follow more companies</Link> to improve your recommendations.
            </p>
          </div>
        </section>

        {/* ── Related Stories ───────────────────────────────────────────────── */}
        <section aria-labelledby="related-heading">
          <SectionHeader title="Related Stories" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {RELATED_STORIES.map((story, i) => (
              <Link key={i} href={story.href} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-md hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group space-y-2">
                <span className="text-[8px] font-bold px-1.5 py-0.5 rounded bg-gray-100 dark:bg-gray-800 text-gray-500 uppercase">{story.type}</span>
                <h3 className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">{story.title}</h3>
                <span className="text-[9px] text-gray-400">{story.publishedAt}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Newsletter ────────────────────────────────────────────────────── */}
        <section aria-labelledby="newsletter-heading">
          <div className={`bg-gradient-to-br ${V.grad} rounded-3xl p-8 md:p-10`}>
            <div className="max-w-2xl mx-auto text-center space-y-5">
              <Mail className="h-8 w-8 text-white/80 mx-auto" aria-hidden="true" />
              <h2 id="newsletter-heading" className="font-bold text-2xl text-white">Get Verified Company News in Your Inbox</h2>
              <p className="text-white/80 text-sm leading-relaxed">Stay ahead with curated announcements, launches, partnerships and investments from verified companies — delivered on your schedule.</p>

              {!newsletterSubscribed ? (
                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-2 max-w-lg mx-auto">
                    <input
                      type="email"
                      id="newsletter-email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Your email address"
                      aria-label="Newsletter email address"
                      className="flex-1 px-4 py-3 rounded-xl text-sm bg-white text-gray-900 outline-none focus:ring-2 focus:ring-white/50"
                    />
                    <button onClick={handleNewsletter} className="bg-gray-900 hover:bg-gray-800 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5">
                      <Mail className="h-4 w-4" /> Subscribe
                    </button>
                  </div>
                  {/* Frequency selector */}
                  <div className="flex justify-center gap-2 flex-wrap">
                    {["Daily Digest", "Weekly Roundup", "Industry-Specific", "Company-Specific"].map((f) => (
                      <span key={f} className="bg-white/20 border border-white/30 text-white text-[10px] font-bold px-3 py-1.5 rounded-full cursor-pointer hover:bg-white/30 transition-colors">{f}</span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/20 border border-white/30 rounded-2xl p-4 flex items-center gap-3 justify-center max-w-md mx-auto">
                  <CheckCircle className="h-5 w-5 text-white shrink-0" aria-hidden="true" />
                  <span className="text-white font-bold text-sm">You&apos;re subscribed! Welcome to iGEN Company News.</span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Publish Company News CTA ──────────────────────────────────────── */}
        <section aria-labelledby="publish-heading">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-8 md:p-10 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-600">For Verified Companies</span>
                <h2 id="publish-heading" className="font-bold text-2xl text-gray-900 dark:text-white">Have Company News to Share?</h2>
                <p className="text-sm text-gray-500 max-w-xl leading-relaxed">Publish your announcement and reach a professional B2B audience on iGEN. Verified companies get unlimited publishing, priority placement, and powerful audience analytics.</p>
              </div>
              <div className="flex flex-col gap-2 shrink-0">
                <Link href="/eoi" className={`${V.btn} font-bold text-sm px-7 py-3 rounded-xl flex items-center gap-2 transition-all`}>
                  <Plus className="h-4 w-4" /> Publish Company News
                </Link>
                <Link href="/eoi" className={`${V.btnOut} font-bold text-sm px-7 py-3 rounded-xl flex items-center gap-2 transition-all text-center justify-center`}>
                  <BarChart2 className="h-4 w-4" /> View Analytics
                </Link>
              </div>
            </div>

            {/* Publishing options */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 border-t border-gray-100 dark:border-gray-850 pt-6">
              {[
                { label: "Standard Publishing", desc: "Publish news to the verified company feed.", icon: Newspaper, free: true },
                { label: "Featured Publishing", desc: "Editorial featured placement on the company news page.", icon: Star, free: false },
                { label: "Sponsored Distribution", desc: "Paid placement across feeds, newsletters, and industry pages.", icon: Zap, free: false },
                { label: "Premium Distribution", desc: "Homepage exposure + newsletter inclusion + priority search.", icon: Crown, free: false },
              ].map((opt) => {
                const OptIcon = opt.icon;
                return (
                  <div key={opt.label} className={`border rounded-xl p-4 space-y-2 ${opt.free ? "border-gray-200 dark:border-gray-800" : `${V.border} ${V.bgSoft}`}`}>
                    <div className="flex items-center gap-2">
                      <OptIcon className={`h-4 w-4 ${opt.free ? "text-gray-400" : "text-emerald-600"}`} aria-hidden="true" />
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{opt.label}</span>
                      {opt.free && <span className="text-[7px] font-bold bg-green-100 text-green-700 px-1.5 py-0.5 rounded">Included</span>}
                    </div>
                    <p className="text-[9px] text-gray-500 leading-snug">{opt.desc}</p>
                    {!opt.free && (
                      <Link href="/eoi" className="text-[9px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                        Learn More <ChevronRight className="h-2.5 w-2.5" />
                      </Link>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Premium Publishing ────────────────────────────────────────────── */}
        <section aria-labelledby="premium-heading">
          <div className="bg-gradient-to-r from-slate-950 to-[#162d54] border border-slate-800 rounded-3xl p-8 md:p-10 text-white">
            <div className="flex flex-col md:flex-row md:items-center gap-8">
              <div className="flex-1 space-y-4">
                <Crown className="h-8 w-8 text-amber-400" aria-hidden="true" />
                <h2 id="premium-heading" className="font-bold text-2xl">Increase Your News Visibility</h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xl">Get maximum exposure for your company news with featured placements, homepage exposure, newsletter inclusion, and full performance analytics.</p>
                <div className="grid grid-cols-2 gap-3">
                  {["Featured Homepage Placement", "Industry Spotlight", "Newsletter Sponsorship", "Priority Search Ranking", "Full Audience Analytics", "Performance Reporting"].map((b) => (
                    <div key={b} className="flex items-center gap-2 text-[11px] text-slate-300">
                      <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" aria-hidden="true" />
                      {b}
                    </div>
                  ))}
                </div>
              </div>
              <div className="space-y-3 shrink-0">
                <Link href="/eoi" className="block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm px-8 py-3.5 rounded-xl text-center transition-all">
                  Explore Publishing Plans
                </Link>
                <Link href="/eoi" className="block border border-white/20 hover:bg-white/10 text-white font-bold text-sm px-8 py-3 rounded-xl text-center transition-all">
                  View Pricing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Sponsored Stories ─────────────────────────────────────────────── */}
        <section aria-labelledby="sponsored-heading">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <h2 id="sponsored-heading" className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Sponsored Company Stories</h2>
              <span className="text-[8px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800 px-1.5 py-0.5 rounded uppercase">Clearly Sponsored</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_STORIES.filter((s) => s.isSponsored).map((story) => (
              <article key={story.id} className="bg-white dark:bg-[#0f172a] border border-amber-200 dark:border-amber-900/50 rounded-xl p-4 space-y-3">
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{story.companyInitials}</div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">{story.companyName}</span>
                    <VerifiedBadge />
                    <SponsoredBadge />
                  </div>
                </div>
                <h3 className="font-bold text-xs text-gray-900 dark:text-white leading-snug">{story.headline}</h3>
                <p className="text-[10px] text-gray-500 line-clamp-2">{story.summary}</p>
                <div className="flex items-center justify-between">
                  <span className="text-[9px] text-gray-400">{story.industry} · {story.publishedAt}</span>
                  <Link href="/eoi" className="text-[10px] font-bold text-emerald-600 hover:underline flex items-center gap-0.5">
                    Read Story <ArrowRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
            {FEATURED_STORIES.filter((s) => s.isSponsored).length === 0 && (
              <div className="col-span-2 bg-amber-50 dark:bg-amber-950/10 border border-amber-200 dark:border-amber-900 rounded-xl p-6 text-center space-y-2">
                <p className="text-xs font-bold text-amber-600">No sponsored stories currently active.</p>
                <Link href="/eoi" className="text-[10px] font-bold text-amber-600 hover:underline">Contact us to feature your company news →</Link>
              </div>
            )}
          </div>
        </section>

        {/* ── Publishing Analytics CTA ──────────────────────────────────────── */}
        <section aria-labelledby="analytics-heading">
          <div className={`${V.bgSoft} ${V.border} border rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5`}>
            <div className="flex items-center gap-4 flex-1">
              <div className="h-12 w-12 rounded-2xl bg-emerald-600 flex items-center justify-center shrink-0">
                <BarChart3 className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <div>
                <h2 id="analytics-heading" className="font-bold text-sm text-gray-900 dark:text-white">Measure Your News Performance</h2>
                <p className="text-[10px] text-gray-500 mt-0.5">Track views, reads, shares, saves, audience industries, countries, and engagement — available for verified publishers.</p>
              </div>
            </div>
            <div className="flex gap-2 flex-wrap shrink-0">
              <Link href="/eoi" className={`${V.btn} font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-1.5 transition-all`}>
                <BarChart3 className="h-3.5 w-3.5" /> View Publishing Analytics
              </Link>
            </div>
          </div>
        </section>

        {/* ── Business Lead Generation ──────────────────────────────────────── */}
        <section aria-labelledby="leads-heading">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-6 space-y-5">
            <div>
              <h2 id="leads-heading" className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Business Lead Generation</h2>
              <p className="text-[10px] text-gray-400 mt-1">Verified companies with news articles can receive direct business enquiries from qualified B2B readers.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { label: "Contact Company", icon: Mail, color: "text-blue-500" },
                { label: "Business Enquiry", icon: MessageSquare, color: "text-emerald-500" },
                { label: "Request Information", icon: FileText, color: "text-purple-500" },
                { label: "Schedule Meeting", icon: Calendar, color: "text-amber-500" },
              ].map((action) => {
                const ActionIcon = action.icon;
                return (
                  <Link key={action.label} href="/eoi" className="border border-gray-200 dark:border-gray-800 rounded-xl p-4 text-center hover:border-emerald-300 dark:hover:border-emerald-800 hover:shadow-sm transition-all group space-y-2">
                    <ActionIcon className={`h-5 w-5 mx-auto ${action.color} group-hover:scale-110 transition-transform`} aria-hidden="true" />
                    <span className="text-[10px] font-bold text-gray-700 dark:text-gray-300 block group-hover:text-emerald-600 transition-colors">{action.label}</span>
                  </Link>
                );
              })}
            </div>
            <p className="text-[9px] text-gray-400 text-center">Lead forms connect to your company&apos;s existing CRM. <Link href="/eoi" className="text-emerald-600 font-bold hover:underline">Configure CRM integration →</Link></p>
          </div>
        </section>

      </div>
    </div>
  );
}
