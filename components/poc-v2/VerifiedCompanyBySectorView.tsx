"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Search, CheckCircle, TrendingUp, Bookmark, BookmarkCheck, Bell, BellRing,
  Eye, Building2, Globe, MapPin, Clock, Calendar, Flame, Zap, Rocket,
  Star, Award, Crown, Lock, Sparkles, ChevronRight, ArrowRight, Filter,
  SlidersHorizontal, Plus, Newspaper, BarChart2, BarChart3, Users, Target,
  Briefcase, Mail, MessageSquare, ExternalLink, Package, Handshake,
  DollarSign, Factory, ShieldCheck, PieChart, FileText, Activity,
  Trophy, Medal, ArrowUpRight, RefreshCw, X, ChevronDown, Info,
  Layers, HelpCircle, GitCompare,
} from "lucide-react";
import { IGEN_50_SECTORS, SectorTaxonomyItem } from "./igenTaxonomyData";

// ─── Colour tokens (verified = emerald) ──────────────────────────────────────
const V = {
  grad:    "from-emerald-500 to-teal-600",
  gradDk:  "from-emerald-600 to-teal-700",
  bg:      "bg-emerald-600",
  bgSoft:  "bg-emerald-50 dark:bg-emerald-950/20",
  border:  "border-emerald-200 dark:border-emerald-900",
  text:    "text-emerald-600 dark:text-emerald-400",
  btn:     "bg-emerald-600 hover:bg-emerald-700 text-white",
  btnOut:  "border border-emerald-300 dark:border-emerald-700 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30",
};

// ─── Quick discovery tabs ─────────────────────────────────────────────────────
const QUICK_FILTERS = ["Top Companies", "Trending", "Emerging", "Recently Verified", "Most Followed", "Most Active"];

// ─── Featured sectors (first 8 from taxonomy, 2 marked sponsored) ────────────
const FEATURED_SECTORS = IGEN_50_SECTORS.slice(0, 8).map((s, i) => ({
  ...s,
  companyCount: s.count * 12 + Math.floor(i * 47),
  countriesCount: 18 + i * 3,
  activity: i < 2 ? "Very High" : i < 5 ? "High" : "Medium",
  topCompany: ["NexusTech Solutions", "Solara Pharma", "GreenWave Tech", "CloudForge DC", "AxisCargo", "BioFresh", "PrimeCast", "Infovera"][i],
  isSponsored: i === 2,
  isFeatured: i === 0 || i === 3,
}));

// ─── Sectors for the top-companies selector (first 12) ───────────────────────
const SELECTOR_SECTORS = IGEN_50_SECTORS.slice(0, 12);

// ─── Top companies per sector (keyed by sector code) ─────────────────────────
const TOP_COMPANIES_BY_SECTOR: Record<string, any[]> = {
  S01: [
    { id: "tc-1a", name: "BioFresh Agri Exports", initials: "BF", country: "India", rank: 1, followers: "8.2K", views: 42000, industry: "Organic Agri-Products", products: ["Organic Spices", "Fresh Produce", "Export Fruits"], rankChange: "up" },
    { id: "tc-1b", name: "AgroGreen Pvt. Ltd.", initials: "AG", country: "India", rank: 2, followers: "5.6K", views: 28000, industry: "Agriculture", products: ["Pesticide-Free Vegetables", "Grain Exports"], rankChange: "same" },
    { id: "tc-1c", name: "HarvestKing Exports", initials: "HK", country: "India", rank: 3, followers: "3.4K", views: 18000, industry: "Agri-Processing", products: ["Spice Blends", "Packaged Foods"], rankChange: "up" },
  ],
  S16: [
    { id: "tc-2a", name: "Infovera Systems", initials: "IS", country: "India", rank: 1, followers: "14.2K", views: 92000, industry: "Enterprise Software", products: ["Cloud ERP", "AI Analytics", "SaaS"], rankChange: "up" },
    { id: "tc-2b", name: "CloudForge Data Centres", initials: "CF", country: "India", rank: 2, followers: "9.8K", views: 68000, industry: "Data Infrastructure", products: ["Hyperscale DC", "Colocation"], rankChange: "same" },
    { id: "tc-2c", name: "TechNova Solutions", initials: "TN", country: "India", rank: 3, followers: "7.1K", views: 45000, industry: "IT Services", products: ["Custom Software", "Cloud Migration"], rankChange: "down" },
  ],
  S17: [
    { id: "tc-3a", name: "GreenWave Technologies", initials: "GW", country: "India", rank: 1, followers: "18.4K", views: 124000, industry: "Renewable Energy", products: ["Solar PV", "EV Charging", "Energy Storage"], rankChange: "up" },
    { id: "tc-3b", name: "SolarEdge India", initials: "SE", country: "India", rank: 2, followers: "11.2K", views: 78000, industry: "Solar Energy", products: ["BIPV Solutions", "Micro-Inverters"], rankChange: "up" },
    { id: "tc-3c", name: "WindPower Dynamics", initials: "WP", country: "India", rank: 3, followers: "7.6K", views: 52000, industry: "Wind Energy", products: ["Turbine Services", "Wind Monitoring"], rankChange: "same" },
  ],
  S43: [
    { id: "tc-4a", name: "NexusTech Logistics", initials: "NL", country: "India", rank: 1, followers: "12.8K", views: 86000, industry: "Logistics & SCM", products: ["Last-Mile", "AI Route Opt.", "Cold Chain"], rankChange: "up" },
    { id: "tc-4b", name: "AxisCargo International", initials: "AC", country: "India", rank: 2, followers: "8.4K", views: 58000, industry: "Freight & Cargo", products: ["JNPT Cold-Chain", "3PL Warehousing"], rankChange: "same" },
    { id: "tc-4c", name: "Mahindra Logistics", initials: "ML", country: "India", rank: 3, followers: "6.2K", views: 44000, industry: "Supply Chain", products: ["Fleet Management", "Tech Logistics"], rankChange: "down" },
  ],
  S32: [
    { id: "tc-5a", name: "Solara Pharma Ltd.", initials: "SP", country: "India", rank: 1, followers: "9.4K", views: 64000, industry: "Pharmaceuticals", products: ["API Manufacturing", "Formulations", "CDMO"], rankChange: "up" },
    { id: "tc-5b", name: "BioSynth Labs", initials: "BS", country: "India", rank: 2, followers: "6.8K", views: 42000, industry: "Biotech Pharma", products: ["Biosimilars", "API Exports"], rankChange: "up" },
    { id: "tc-5c", name: "PharmaCraft India", initials: "PC", country: "India", rank: 3, followers: "4.2K", views: 28000, industry: "Generic Drugs", products: ["Generic APIs", "Bulk Drugs"], rankChange: "same" },
  ],
};
const DEFAULT_TOP_COMPANIES = TOP_COMPANIES_BY_SECTOR["S43"];

// ─── Rankings ─────────────────────────────────────────────────────────────────
const RANKINGS = {
  global: [
    { rank: 1, name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", followers: "18.4K", rankChange: "up" },
    { rank: 2, name: "NexusTech Logistics", initials: "NL", sector: "Logistics & SCM", country: "India", followers: "12.8K", rankChange: "up" },
    { rank: 3, name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", country: "India", followers: "14.2K", rankChange: "same" },
    { rank: 4, name: "Solara Pharma Ltd.", initials: "SP", sector: "Pharmaceuticals", country: "India", followers: "9.4K", rankChange: "down" },
    { rank: 5, name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", country: "India", followers: "9.8K", rankChange: "up" },
  ],
  byCountry: [
    { rank: 1, name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", followers: "18.4K", rankChange: "up" },
    { rank: 2, name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", country: "India", followers: "11.2K", rankChange: "up" },
    { rank: 3, name: "BioFresh Agri Exports", initials: "BF", sector: "Agriculture", country: "India", followers: "8.2K", rankChange: "same" },
    { rank: 4, name: "PrimeCast Steel Works", initials: "PS", sector: "Steel & Metallurgy", country: "India", followers: "6.4K", rankChange: "down" },
    { rank: 5, name: "AxisCargo International", initials: "AC", sector: "Logistics", country: "India", followers: "8.4K", rankChange: "up" },
  ],
  mostFollowed: [
    { rank: 1, name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", followers: "18.4K", rankChange: "up" },
    { rank: 2, name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", country: "India", followers: "14.2K", rankChange: "same" },
    { rank: 3, name: "NexusTech Logistics", initials: "NL", sector: "Logistics", country: "India", followers: "12.8K", rankChange: "up" },
    { rank: 4, name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", country: "India", followers: "9.8K", rankChange: "same" },
    { rank: 5, name: "Solara Pharma Ltd.", initials: "SP", sector: "Pharmaceuticals", country: "India", followers: "9.4K", rankChange: "down" },
  ],
  mostActive: [
    { rank: 1, name: "NexusTech Logistics", initials: "NL", sector: "Logistics", country: "India", followers: "12.8K", rankChange: "up" },
    { rank: 2, name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", followers: "18.4K", rankChange: "same" },
    { rank: 3, name: "BioFresh Agri Exports", initials: "BF", sector: "Agriculture", country: "India", followers: "8.2K", rankChange: "up" },
    { rank: 4, name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", country: "India", followers: "14.2K", rankChange: "down" },
    { rank: 5, name: "Solara Pharma Ltd.", initials: "SP", sector: "Pharmaceuticals", country: "India", followers: "9.4K", rankChange: "up" },
  ],
  fastestRising: [
    { rank: 1, name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", country: "India", followers: "9.8K", rankChange: "up" },
    { rank: 2, name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", country: "India", followers: "11.2K", rankChange: "up" },
    { rank: 3, name: "BioSynth Labs", initials: "BS", sector: "Pharmaceuticals", country: "India", followers: "6.8K", rankChange: "up" },
    { rank: 4, name: "TechNova Solutions", initials: "TN", sector: "Electronics & IT", country: "India", followers: "7.1K", rankChange: "up" },
    { rank: 5, name: "WindPower Dynamics", initials: "WP", sector: "Renewable Energy", country: "India", followers: "7.6K", rankChange: "up" },
  ],
};

// ─── Trending ─────────────────────────────────────────────────────────────────
const TRENDING = {
  today: [
    { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", signal: "4 news stories in 24h", views: 8420 },
    { name: "NexusTech Logistics", initials: "NL", sector: "Logistics", signal: "+342 new followers", views: 6180 },
    { name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", signal: "Product launch today", views: 4920 },
    { name: "Solara Pharma Ltd.", initials: "SP", sector: "Pharmaceuticals", signal: "USFDA approval news", views: 3840 },
    { name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", signal: "₹1,200 Cr investment news", views: 2980 },
  ],
  week: [
    { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", signal: "Series C closed + NTPC MoU", views: 42800 },
    { name: "NexusTech Logistics", initials: "NL", sector: "Logistics", signal: "Maruti Suzuki deal published", views: 31600 },
    { name: "AxisCargo International", initials: "AC", sector: "Logistics", signal: "JNPT cold-chain launch", views: 24800 },
    { name: "Solara Pharma Ltd.", initials: "SP", sector: "Pharmaceuticals", signal: "Q2 revenue +28% YoY", views: 18200 },
    { name: "BioFresh Agri Exports", initials: "BF", sector: "Agriculture", signal: "12,000 MT organic exports H1", views: 12400 },
  ],
  month: [
    { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", signal: "3 major deals + funding closed", views: 124000 },
    { name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", signal: "AnalytiQ acquisition + Microsoft deal", views: 96000 },
    { name: "NexusTech Logistics", initials: "NL", sector: "Logistics", signal: "Top logistics partner in APAC", views: 78000 },
    { name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", signal: "Greenfield 40 MW Pune DC announced", views: 58000 },
    { name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", signal: "New microinverter product line", views: 42000 },
  ],
};

// ─── Emerging companies ───────────────────────────────────────────────────────
const EMERGING = [
  { name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", country: "India", label: "Rising Company", labelColor: "text-orange-500 bg-orange-50 dark:bg-orange-950/20 border-orange-200", reason: "+68% follower growth in 30 days after launching Gen-2 EV chargers" },
  { name: "BioSynth Labs", initials: "BS", sector: "Pharmaceuticals", country: "India", label: "New Entrant", labelColor: "text-blue-500 bg-blue-50 dark:bg-blue-950/20 border-blue-200", reason: "Newly verified with USFDA-compliant biosimilars facility operational" },
  { name: "TechNova Solutions", initials: "TN", sector: "Electronics & IT", country: "India", label: "Innovative Company", labelColor: "text-purple-500 bg-purple-50 dark:bg-purple-950/20 border-purple-200", reason: "AI-driven supply chain product received 3 awards at TechSummit 2026" },
  { name: "WindPower Dynamics", initials: "WP", sector: "Renewable Energy", country: "India", label: "High Activity", labelColor: "text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200", reason: "12 news stories and 2 MoUs signed in the past 30 days" },
  { name: "PharmaCraft India", initials: "PC", sector: "Pharmaceuticals", country: "India", label: "New Verified", labelColor: "text-teal-500 bg-teal-50 dark:bg-teal-950/20 border-teal-200", reason: "Just received Verified status — 100% audit-passed" },
  { name: "HarvestKing Exports", initials: "HK", sector: "Agriculture", country: "India", label: "Rising Company", labelColor: "text-orange-500 bg-orange-50 dark:bg-orange-950/20 border-orange-200", reason: "Organic export volumes up 44% this quarter, expanding to 6 new markets" },
];

// ─── Sector snapshot (for selected sector) ───────────────────────────────────
const SECTOR_SNAPSHOT: Record<string, any> = {
  S43: { verifiedCos: 312, newCos: 18, newsStories: 124, productLaunches: 28, partnerships: 14, investments: 8, countries: 42, activity: "High" },
  S17: { verifiedCos: 336, newCos: 24, newsStories: 214, productLaunches: 48, partnerships: 22, investments: 14, countries: 54, activity: "Very High" },
  S16: { verifiedCos: 420, newCos: 32, newsStories: 312, productLaunches: 74, partnerships: 38, investments: 22, countries: 62, activity: "Very High" },
  S32: { verifiedCos: 360, newCos: 14, newsStories: 186, productLaunches: 34, partnerships: 16, investments: 10, countries: 38, activity: "High" },
  S01: { verifiedCos: 336, newCos: 20, newsStories: 128, productLaunches: 22, partnerships: 12, investments: 6, countries: 34, activity: "Medium" },
};
const DEFAULT_SNAPSHOT = SECTOR_SNAPSHOT["S43"];

// ─── Industry directory per sector ───────────────────────────────────────────
const INDUSTRY_DIRECTORY: Record<string, any[]> = {
  S16: [
    { name: "Artificial Intelligence & ML", companies: 84, topCo: "Infovera Systems" },
    { name: "Cloud Computing & Infrastructure", companies: 72, topCo: "CloudForge DC" },
    { name: "Cybersecurity & Data Protection", companies: 58, topCo: "ShieldTech" },
    { name: "Enterprise Software (SaaS/ERP)", companies: 94, topCo: "TechNova Solutions" },
    { name: "Semiconductors & OSAT", companies: 46, topCo: "OSAT India" },
    { name: "IT Services & Consulting", companies: 112, topCo: "HCL BPM" },
  ],
  S17: [
    { name: "Solar Power", companies: 102, topCo: "GreenWave Technologies" },
    { name: "Wind Energy", companies: 64, topCo: "WindPower Dynamics" },
    { name: "Energy Storage & Batteries", companies: 48, topCo: "BattTech India" },
    { name: "EV Charging Infrastructure", companies: 56, topCo: "ChargeGrid" },
    { name: "Green Hydrogen", companies: 28, topCo: "H2Nexus" },
    { name: "Smart Grids", companies: 38, topCo: "GridTech" },
  ],
  S43: [
    { name: "Last-Mile Delivery", companies: 84, topCo: "NexusTech Logistics" },
    { name: "Cold Chain Logistics", companies: 46, topCo: "AxisCargo International" },
    { name: "Freight & Cargo", companies: 68, topCo: "Mahindra Logistics" },
    { name: "Warehousing & 3PL", companies: 58, topCo: "WareCore India" },
    { name: "Supply Chain Technology", companies: 38, topCo: "SCMTech" },
    { name: "Customs & Trade Compliance", companies: 28, topCo: "TradeDox" },
  ],
};
const DEFAULT_DIRECTORY = INDUSTRY_DIRECTORY["S43"];

// ─── Business types ───────────────────────────────────────────────────────────
const BUSINESS_TYPES = [
  { label: "Manufacturers", icon: Factory, count: 284 },
  { label: "Exporters", icon: Globe, count: 196 },
  { label: "Importers", icon: Package, count: 148 },
  { label: "Suppliers", icon: Layers, count: 218 },
  { label: "Distributors", icon: Handshake, count: 132 },
  { label: "Service Providers", icon: Briefcase, count: 312 },
  { label: "Technology Providers", icon: Zap, count: 168 },
  { label: "Consultants", icon: Users, count: 94 },
];

// ─── Products & services ──────────────────────────────────────────────────────
const PRODUCTS_SERVICES: Record<string, any[]> = {
  "Logistics & SCM": [
    { name: "Last-Mile Delivery Solutions", companies: 84, topCo: "NexusTech" },
    { name: "Cold Chain Management", companies: 46, topCo: "AxisCargo" },
    { name: "AI Route Optimisation", companies: 28, topCo: "NexusTech" },
    { name: "Freight Forwarding", companies: 68, topCo: "TradeLane" },
    { name: "3PL Warehousing", companies: 58, topCo: "WareCore" },
    { name: "Supply Chain Analytics", companies: 38, topCo: "SCMTech" },
  ],
  "Renewable Energy": [
    { name: "Solar PV Systems", companies: 102, topCo: "GreenWave" },
    { name: "EV Fast Charging Stations", companies: 56, topCo: "GreenWave" },
    { name: "Wind Turbine Services", companies: 48, topCo: "WindPower" },
    { name: "Battery Energy Storage", companies: 38, topCo: "BattTech" },
    { name: "Green Hydrogen Production", companies: 22, topCo: "H2Nexus" },
    { name: "Smart Grid Solutions", companies: 32, topCo: "GridTech" },
  ],
  "Electronics & IT": [
    { name: "Enterprise SaaS / ERP", companies: 94, topCo: "Infovera" },
    { name: "AI & Machine Learning", companies: 84, topCo: "Infovera" },
    { name: "Cloud Infrastructure", companies: 72, topCo: "CloudForge" },
    { name: "Cybersecurity Solutions", companies: 58, topCo: "ShieldTech" },
    { name: "IT Services & Consulting", companies: 112, topCo: "HCL BPM" },
    { name: "Semiconductor Components", companies: 46, topCo: "OSAT India" },
  ],
};

// ─── Sector news ──────────────────────────────────────────────────────────────
const SECTOR_NEWS = [
  { companyName: "NexusTech Logistics", companyInitials: "NL", headline: "AI Route Optimisation Cuts Delivery Times by 22% in Pan-India Roll-Out", category: "Product Launch", industry: "Logistics", country: "India", publishedAt: "45 min ago" },
  { companyName: "GreenWave Technologies", companyInitials: "GW", headline: "500 MW Solar MoU Signed with NTPC; Delivery Scheduled for FY26-27", category: "Partnership", industry: "Renewable Energy", country: "India", publishedAt: "2 hrs ago" },
  { companyName: "Solara Pharma Ltd.", companyInitials: "SP", headline: "Q2 Revenue Grows 28% YoY Driven by API Export Demand to US & EU", category: "Financial Update", industry: "Pharmaceuticals", country: "India", publishedAt: "4 hrs ago" },
  { companyName: "Infovera Systems", companyInitials: "IS", headline: "AnalytiQ Acquisition Completed; Integration to Power AI Forecasting Suite", category: "M&A", industry: "Electronics & IT", country: "India", publishedAt: "6 hrs ago" },
];

// ─── Sector activity ──────────────────────────────────────────────────────────
const SECTOR_ACTIVITY = [
  { type: "New Verification", icon: ShieldCheck, color: "text-emerald-500", company: "PharmaCraft India", detail: "Newly verified — audit passed 100%", time: "2 hrs ago" },
  { type: "Product Launch", icon: Rocket, color: "text-blue-500", company: "GreenWave Technologies", detail: "FastCharge Station Gen 2 — 150 kW DC", time: "4 hrs ago" },
  { type: "Partnership", icon: Handshake, color: "text-purple-500", company: "Infovera Systems", detail: "Microsoft Azure joint infrastructure deal", time: "1 day ago" },
  { type: "Investment", icon: DollarSign, color: "text-amber-500", company: "CloudForge Data Centres", detail: "₹1,200 Cr greenfield data centre greenlit", time: "1 day ago" },
  { type: "Expansion", icon: Globe, color: "text-teal-500", company: "NexusTech Logistics", detail: "Southeast Asia markets entry announced", time: "2 days ago" },
  { type: "M&A", icon: Briefcase, color: "text-pink-500", company: "Infovera Systems", detail: "AnalytiQ acquired for ₹320 Cr", time: "3 days ago" },
];

// ─── Companies to watch ───────────────────────────────────────────────────────
const COMPANIES_TO_WATCH = [
  { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", reason: "Series C + 2 government MoUs in 30 days", signal: "+68% engagement" },
  { name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", country: "India", reason: "₹1,200 Cr Greenfield investment + Jio MoU", signal: "+51% followers" },
  { name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", country: "India", reason: "New Gen-2 charger launch + export contracts", signal: "+44% activity" },
];

// ─── Leaderboard tabs ─────────────────────────────────────────────────────────
const LEADERBOARD_SECTORS = IGEN_50_SECTORS.slice(0, 6);
const LEADERBOARD_DATA: Record<string, any[]> = {
  S43: [
    { rank: 1, medal: "🥇", name: "NexusTech Logistics", initials: "NL", score: "12.8K followers" },
    { rank: 2, medal: "🥈", name: "AxisCargo International", initials: "AC", score: "8.4K followers" },
    { rank: 3, medal: "🥉", name: "Mahindra Logistics", initials: "ML", score: "6.2K followers" },
  ],
  S17: [
    { rank: 1, medal: "🥇", name: "GreenWave Technologies", initials: "GW", score: "18.4K followers" },
    { rank: 2, medal: "🥈", name: "SolarEdge India", initials: "SE", score: "11.2K followers" },
    { rank: 3, medal: "🥉", name: "WindPower Dynamics", initials: "WP", score: "7.6K followers" },
  ],
  S16: [
    { rank: 1, medal: "🥇", name: "Infovera Systems", initials: "IS", score: "14.2K followers" },
    { rank: 2, medal: "🥈", name: "CloudForge Data Centres", initials: "CF", score: "9.8K followers" },
    { rank: 3, medal: "🥉", name: "TechNova Solutions", initials: "TN", score: "7.1K followers" },
  ],
};

// ─── Recently verified ────────────────────────────────────────────────────────
const RECENTLY_VERIFIED = [
  { name: "PharmaCraft India", initials: "PC", sector: "Pharmaceuticals", country: "India", verifiedDate: "Today" },
  { name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", country: "India", verifiedDate: "2 days ago" },
  { name: "BioSynth Labs", initials: "BS", sector: "Pharmaceuticals", country: "India", verifiedDate: "4 days ago" },
  { name: "TechNova Solutions", initials: "TN", sector: "Electronics & IT", country: "India", verifiedDate: "1 week ago" },
  { name: "WindPower Dynamics", initials: "WP", sector: "Renewable Energy", country: "India", verifiedDate: "1 week ago" },
  { name: "HarvestKing Exports", initials: "HK", sector: "Agriculture", country: "India", verifiedDate: "10 days ago" },
];

// ─── Most followed ────────────────────────────────────────────────────────────
const MOST_FOLLOWED = [
  { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", followers: "18.4K" },
  { name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", country: "India", followers: "14.2K" },
  { name: "NexusTech Logistics", initials: "NL", sector: "Logistics", country: "India", followers: "12.8K" },
  { name: "SolarEdge India", initials: "SE", sector: "Renewable Energy", country: "India", followers: "11.2K" },
  { name: "CloudForge Data Centres", initials: "CF", sector: "Electronics & IT", country: "India", followers: "9.8K" },
  { name: "Solara Pharma Ltd.", initials: "SP", sector: "Pharmaceuticals", country: "India", followers: "9.4K" },
];

// ─── Recommended (personalised) ──────────────────────────────────────────────
const RECOMMENDED = [
  { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", reason: "Because you follow Energy & Sustainability" },
  { name: "NexusTech Logistics", initials: "NL", sector: "Logistics", country: "India", reason: "Because you follow Logistics & Supply Chain" },
  { name: "Infovera Systems", initials: "IS", sector: "Electronics & IT", country: "India", reason: "Based on your reading history" },
];

// ─── Featured/sponsored companies ────────────────────────────────────────────
const FEATURED_COMPANIES = [
  { name: "GreenWave Technologies", initials: "GW", sector: "Renewable Energy", country: "India", tagline: "Leading India's EV Charging & Solar Revolution", products: ["Solar PV", "EV Chargers", "Energy Storage"], isSponsored: true, isFeatured: false },
  { name: "NexusTech Logistics", initials: "NL", sector: "Logistics & SCM", country: "India", tagline: "AI-Driven Logistics for Enterprise Clients Across APAC", products: ["Last-Mile", "Cold Chain", "AI Route Opt."], isSponsored: false, isFeatured: true },
];

// ─── Comparison state ─────────────────────────────────────────────────────────
const ALL_COMPANIES_FOR_COMPARE = [
  { id: "c1", name: "GreenWave Technologies", sector: "Renewable Energy", country: "India", size: "1,200 employees", followers: "18.4K", newsThisMonth: 12, rank: "#1 Renewable Energy" },
  { id: "c2", name: "NexusTech Logistics", sector: "Logistics", country: "India", size: "1,240 employees", followers: "12.8K", newsThisMonth: 9, rank: "#1 Logistics" },
  { id: "c3", name: "Infovera Systems", sector: "Electronics & IT", country: "India", size: "3,400 employees", followers: "14.2K", newsThisMonth: 6, rank: "#1 IT & Software" },
  { id: "c4", name: "Solara Pharma Ltd.", sector: "Pharmaceuticals", country: "India", size: "2,100 employees", followers: "9.4K", newsThisMonth: 8, rank: "#1 Pharmaceuticals" },
];

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

const RankArrow = ({ dir }: { dir: string }) => {
  if (dir === "up") return <span className="text-[9px] font-bold text-emerald-500">↑</span>;
  if (dir === "down") return <span className="text-[9px] font-bold text-red-500">↓</span>;
  return <span className="text-[9px] font-bold text-gray-400">→</span>;
};

function SectionHeader({ title, cta, ctaHref, hint }: { title: string; cta?: string; ctaHref?: string; hint?: string }) {
  return (
    <div className="flex items-start justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-5 gap-3">
      <div>
        <h2 className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">{title}</h2>
        {hint && <p className="text-[9px] text-gray-400 mt-0.5">{hint}</p>}
      </div>
      {cta && ctaHref && (
        <Link href={ctaHref} className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-0.5 shrink-0 mt-0.5">
          {cta} <ChevronRight className="h-3 w-3" />
        </Link>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function VerifiedCompanyBySectorView() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuickFilter, setActiveQuickFilter] = useState("Top Companies");
  const [selectedSectorCode, setSelectedSectorCode] = useState("S43");
  const [rankingTab, setRankingTab] = useState<keyof typeof RANKINGS>("global");
  const [trendingTab, setTrendingTab] = useState<"today" | "week" | "month">("today");
  const [leaderboardSector, setLeaderboardSector] = useState("S43");
  const [followedSectors, setFollowedSectors] = useState<string[]>([]);
  const [followedCompanies, setFollowedCompanies] = useState<string[]>([]);
  const [compareSelected, setCompareSelected] = useState<string[]>([]);
  const [alertEmail, setAlertEmail] = useState("");
  const [alertCreated, setAlertCreated] = useState(false);
  const [showHowRankings, setShowHowRankings] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [activeProductSector, setActiveProductSector] = useState("Logistics & SCM");

  const selectedSector = IGEN_50_SECTORS.find(s => s.code === selectedSectorCode) || IGEN_50_SECTORS[0];
  const topCompanies = TOP_COMPANIES_BY_SECTOR[selectedSectorCode] || DEFAULT_TOP_COMPANIES;
  const snapshot = SECTOR_SNAPSHOT[selectedSectorCode] || DEFAULT_SNAPSHOT;
  const directory = INDUSTRY_DIRECTORY[selectedSectorCode] || DEFAULT_DIRECTORY;
  const leaderboard = LEADERBOARD_DATA[leaderboardSector] || LEADERBOARD_DATA["S43"];

  const toggleFollowSector = (code: string) =>
    setFollowedSectors(prev => prev.includes(code) ? prev.filter(x => x !== code) : [...prev, code]);

  const toggleFollowCompany = (name: string) =>
    setFollowedCompanies(prev => prev.includes(name) ? prev.filter(x => x !== name) : [...prev, name]);

  const toggleCompare = (id: string) => {
    if (compareSelected.includes(id)) {
      setCompareSelected(prev => prev.filter(x => x !== id));
    } else if (compareSelected.length < 4) {
      setCompareSelected(prev => [...prev, id]);
    }
  };

  const handleCreateAlert = () => {
    if (!alertEmail) return;
    setAlertCreated(true);
  };

  const filteredFeaturedSectors = useMemo(() =>
    FEATURED_SECTORS.filter(s =>
      !searchQuery || s.name.toLowerCase().includes(searchQuery.toLowerCase())
    ), [searchQuery]);

  const rankingTabLabels: Record<keyof typeof RANKINGS, string> = {
    global: "Global",
    byCountry: "By Country",
    mostFollowed: "Most Followed",
    mostActive: "Most Active",
    fastestRising: "Fastest Rising",
  };

  return (
    <div className="bg-gray-50 dark:bg-[#070b12] min-h-screen text-gray-900 dark:text-gray-100 pb-20">

      {/* ── Breadcrumb ──────────────────────────────────────────────────────── */}
      <nav aria-label="Breadcrumb" className="mx-auto max-w-7xl px-4 lg:px-6 py-3">
        <ol className="flex items-center gap-1.5 text-[10px] text-gray-400 flex-wrap">
          <li><Link href="/en/poc-v2" className="hover:text-emerald-600 transition-colors">iGEN News</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/en/poc-v2/company-news" className="hover:text-emerald-600 transition-colors">Company News</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/en/poc-v2/company-news/verified/pages" className="hover:text-emerald-600 transition-colors">Verified Companies</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-bold text-emerald-600 dark:text-emerald-400">By Sector</li>
        </ol>
      </nav>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section className={`bg-gradient-to-br ${V.grad} relative overflow-hidden`} aria-labelledby="hero-heading">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 25% 60%, white 1px, transparent 1px), radial-gradient(circle at 75% 30%, white 1px, transparent 1px)", backgroundSize: "48px 48px" }} />
        <div className="relative z-10 mx-auto max-w-7xl px-4 lg:px-6 py-8">
          <div className="flex flex-col lg:flex-row lg:items-end gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="bg-white/20 border border-white/30 text-white text-[9px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <CheckCircle className="h-3 w-3" /> Verified Company Directory
                </span>
                <span className="bg-white/15 border border-white/25 text-white/80 text-[9px] font-bold px-2.5 py-1 rounded-full">
                  50 Sectors · 3,200+ Verified Companies
                </span>
              </div>
              <h1 id="hero-heading" className="font-bold text-3xl md:text-4xl text-white leading-tight">
                Explore Verified Companies by Sector
              </h1>
              <p className="text-white/80 text-sm max-w-2xl leading-relaxed">
                Discover trusted companies, industry leaders, emerging businesses and business opportunities across sectors.
              </p>
              <div className="flex flex-col sm:flex-row gap-2 max-w-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
                  <input
                    type="search"
                    id="hero-sector-search"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Search sector, industry, company, product or service..."
                    aria-label="Search verified companies by sector"
                    className="w-full pl-9 pr-4 py-3 rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-white/50 shadow-lg"
                  />
                </div>
                <button className="bg-white text-emerald-700 font-bold text-sm px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-lg shrink-0">
                  Explore Sectors
                </button>
              </div>
              <div className="flex gap-2 flex-wrap" role="group" aria-label="Quick discovery filters">
                {QUICK_FILTERS.map(f => (
                  <button
                    key={f}
                    onClick={() => setActiveQuickFilter(f)}
                    className={`text-[11px] font-bold px-3 py-1.5 rounded-full border transition-all ${activeQuickFilter === f ? "bg-white text-emerald-700 border-white shadow-sm" : "bg-white/15 border-white/30 text-white hover:bg-white/25"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-sm border border-white/25 rounded-2xl p-5 space-y-3 shrink-0 w-full lg:w-60">
              <div>
                <span className="text-white/70 text-[10px] font-bold uppercase tracking-widest">For Companies</span>
                <h3 className="text-white font-bold text-base mt-1">Register Your Business</h3>
                <p className="text-white/70 text-[11px] leading-relaxed mt-1">Get discovered by buyers, professionals and industry partners.</p>
              </div>
              <Link href="/eoi" className="w-full bg-white text-emerald-700 hover:bg-gray-50 font-bold text-xs py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all">
                <Plus className="h-3.5 w-3.5" /> Register Your Business
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Filters Bar ─────────────────────────────────────────────────────── */}
      <section className="bg-white dark:bg-[#0f172a] border-b border-gray-200 dark:border-gray-800 sticky top-28 z-30 shadow-sm" aria-label="Filter controls">
        <div className="mx-auto max-w-7xl px-4 lg:px-6 py-3">
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative flex-1 min-w-40">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input
                type="search"
                aria-label="Filter sectors"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search sectors, companies..."
                className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 outline-none focus:border-emerald-500"
              />
            </div>
            <div className="hidden md:flex items-center gap-2 flex-wrap">
              {["All Sectors", "All Countries", "All Sizes", "All Types", "All Activity", "Verified Only"].map(f => (
                <select key={f} aria-label={f} className="text-[10px] font-bold px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                  <option>{f}</option>
                </select>
              ))}
              <select aria-label="Sort by" className="text-[10px] font-bold px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 outline-none cursor-pointer">
                <option>Top</option>
                <option>Trending</option>
                <option>Most Viewed</option>
                <option>Most Followed</option>
                <option>Most Active</option>
                <option>Newest</option>
              </select>
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              aria-label="Toggle filters"
              className="flex items-center gap-1.5 text-[10px] font-bold px-3 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 hover:border-emerald-400 transition-colors md:hidden"
            >
              <SlidersHorizontal className="h-3.5 w-3.5" /> Filters
            </button>
          </div>
          {showFilters && (
            <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-800 flex flex-wrap gap-2 md:hidden">
              {["All Sectors", "All Countries", "All Sizes", "All Types", "Latest"].map(f => (
                <select key={f} aria-label={f} className="text-[10px] font-bold px-2.5 py-2 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 outline-none">
                  <option>{f}</option>
                </select>
              ))}
            </div>
          )}
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 lg:px-6 pt-8 space-y-12">

        {/* ── Featured Sectors ───────────────────────────────────────────────── */}
        <section aria-labelledby="featured-sectors-heading">
          <SectionHeader title="Featured Sectors" cta="View All 50 Sectors" ctaHref="/en/poc-v2/company-news/verified/all" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {filteredFeaturedSectors.slice(0, 8).map((sector, i) => (
              <button
                key={sector.code}
                onClick={() => setSelectedSectorCode(sector.code)}
                className={`text-left bg-white dark:bg-[#0f172a] border rounded-2xl p-4 hover:shadow-md transition-all group space-y-3 ${selectedSectorCode === sector.code ? `${V.border} shadow-md` : "border-gray-200 dark:border-gray-800"}`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-3xl">{sector.icon}</span>
                  <div className="flex gap-1 flex-wrap justify-end">
                    {sector.isFeatured && <FeaturedBadge />}
                    {sector.isSponsored && <SponsoredBadge />}
                  </div>
                </div>
                <div className="space-y-1">
                  <h3 className={`font-bold text-xs leading-snug transition-colors ${selectedSectorCode === sector.code ? "text-emerald-600" : "text-gray-900 dark:text-white group-hover:text-emerald-600"}`}>{sector.name}</h3>
                  <div className="text-[9px] text-gray-500 space-y-0.5">
                    <div>{sector.companyCount.toLocaleString()} verified companies</div>
                    <div>{sector.countriesCount} countries</div>
                    <div className={`font-bold ${sector.activity === "Very High" ? "text-emerald-600" : sector.activity === "High" ? "text-blue-500" : "text-gray-400"}`}>{sector.activity} activity</div>
                    <div>Top: <span className="font-bold text-gray-700 dark:text-gray-300">{sector.topCompany}</span></div>
                  </div>
                </div>
                <span className={`text-[10px] font-bold ${V.text} flex items-center gap-0.5`}>
                  Explore Sector <ChevronRight className="h-3 w-3" />
                </span>
              </button>
            ))}
          </div>
          {filteredFeaturedSectors.length === 0 && (
            <div className="text-center py-12 space-y-3">
              <Building2 className="h-10 w-10 text-gray-300 mx-auto" />
              <p className="text-sm font-bold text-gray-500">No sectors match your search.</p>
              <button onClick={() => setSearchQuery("")} className={`${V.btn} font-bold text-xs px-5 py-2.5 rounded-lg`}>Clear Search</button>
            </div>
          )}
        </section>

        {/* ── Top Verified Companies by Sector ────────────────────────────────── */}
        <section aria-labelledby="top-companies-heading">
          <SectionHeader title="Top Verified Companies by Sector" hint="Select a sector to explore its top companies" />
          {/* Sector selector chips */}
          <div className="flex gap-2 flex-wrap mb-5" role="group" aria-label="Select sector">
            {SELECTOR_SECTORS.map(s => (
              <button
                key={s.code}
                onClick={() => setSelectedSectorCode(s.code)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${selectedSectorCode === s.code ? `${V.bg} text-white border-transparent` : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:border-emerald-300"}`}
              >
                {s.icon} {s.name.split(" &")[0].split(" and")[0]}
              </button>
            ))}
          </div>

          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${V.grad} text-white px-5 py-3 flex items-center justify-between`}>
              <div>
                <span className="text-[9px] font-bold uppercase tracking-widest text-white/70">Sector</span>
                <h3 className="font-bold text-sm">{selectedSector.icon} {selectedSector.name}</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowHowRankings(!showHowRankings)}
                  aria-label="How rankings work"
                  className="text-[10px] font-bold bg-white/15 border border-white/25 text-white px-2.5 py-1 rounded-lg flex items-center gap-1 hover:bg-white/25 transition-colors"
                >
                  <HelpCircle className="h-3 w-3" /> How Rankings Work
                </button>
              </div>
            </div>

            {showHowRankings && (
              <div className={`${V.bgSoft} border-b ${V.border} px-5 py-3 text-[10px] text-gray-600 dark:text-gray-400 space-y-1`}>
                <p className="font-bold text-gray-800 dark:text-gray-200">Rankings Methodology</p>
                <p>Rankings are based on a weighted combination of: <strong>profile views</strong> (30%), <strong>follower count</strong> (30%), <strong>news & content activity</strong> (20%), <strong>engagement rate</strong> (10%), and <strong>product/service activity</strong> (10%).</p>
                <p className="text-[9px] text-amber-600 dark:text-amber-400">Note: Sponsored companies are clearly labeled and do not automatically receive higher organic rankings.</p>
              </div>
            )}

            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {topCompanies.length > 0 ? topCompanies.map((co, i) => (
                <div key={co.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                  <div className="flex items-center gap-1 w-8 shrink-0">
                    <span className="font-extrabold text-lg text-gray-100 dark:text-gray-800">#{co.rank}</span>
                    <RankArrow dir={co.rankChange} />
                  </div>
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{co.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-gray-900 dark:text-white truncate">{co.name}</span>
                      <VerifiedBadge />
                    </div>
                    <div className="text-[9px] text-gray-400">{co.industry} · {co.country}</div>
                    <div className="flex gap-1 flex-wrap mt-1">
                      {co.products.slice(0, 3).map((p: string) => (
                        <span key={p} className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${V.bgSoft} ${V.text} border ${V.border}`}>{p}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0 space-y-1">
                    <div className="text-[9px] text-gray-400 flex items-center gap-1 justify-end"><Users className="h-2.5 w-2.5" /> {co.followers}</div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => toggleFollowCompany(co.name)}
                        aria-label={followedCompanies.includes(co.name) ? "Unfollow" : "Follow company"}
                        className={`text-[9px] font-bold px-2 py-1 rounded-lg border transition-all flex items-center gap-0.5 ${followedCompanies.includes(co.name) ? "border-emerald-300 bg-emerald-50 text-emerald-600" : "border-gray-200 dark:border-gray-700 text-gray-400 hover:text-emerald-600"}`}
                      >
                        {followedCompanies.includes(co.name) ? <BellRing className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                      </button>
                      <Link href="/eoi" className={`text-[9px] font-bold px-2 py-1 rounded-lg ${V.btn} flex items-center gap-0.5 transition-all`}>
                        View <ChevronRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                </div>
              )) : (
                <div className="px-5 py-8 text-center space-y-2">
                  <Building2 className="h-8 w-8 text-gray-300 mx-auto" />
                  <p className="text-xs font-bold text-gray-500">No verified companies available in this sector.</p>
                  <Link href="/en/poc-v2/company-news/verified/all" className={`${V.btn} font-bold text-xs px-4 py-2 rounded-lg inline-flex items-center gap-1`}>
                    Explore All Verified Companies
                  </Link>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* ── Rankings + Trending (2 col) ──────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Rankings */}
          <section aria-labelledby="rankings-heading">
            <SectionHeader title="Verified Company Rankings" />
            <div className="flex gap-1 mb-4 flex-wrap" role="tablist" aria-label="Ranking category">
              {(Object.keys(RANKINGS) as (keyof typeof RANKINGS)[]).map(tab => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={rankingTab === tab}
                  onClick={() => setRankingTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all ${rankingTab === tab ? `${V.bg} text-white` : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700"}`}
                >
                  {rankingTabLabels[tab]}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden" role="tabpanel">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {RANKINGS[rankingTab].map(co => (
                  <div key={co.rank} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <div className="flex items-center gap-1 w-7 shrink-0">
                      <span className="font-extrabold text-base text-gray-100 dark:text-gray-800">#{co.rank}</span>
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{co.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white truncate">{co.name}</span>
                        <VerifiedBadge />
                      </div>
                      <span className="text-[9px] text-gray-400">{co.sector} · {co.country}</span>
                    </div>
                    <div className="text-right shrink-0 space-y-0.5">
                      <div className="text-[9px] text-gray-400 flex items-center gap-1 justify-end"><Users className="h-2.5 w-2.5" /> {co.followers}</div>
                      <RankArrow dir={co.rankChange} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="px-4 py-2.5 border-t border-gray-50 dark:border-gray-850 text-center">
                <button
                  onClick={() => setShowHowRankings(!showHowRankings)}
                  className="text-[10px] font-bold text-gray-400 hover:text-emerald-600 transition-colors flex items-center gap-1 mx-auto"
                >
                  <HelpCircle className="h-3 w-3" /> How Rankings Work
                </button>
              </div>
            </div>
          </section>

          {/* Trending Companies */}
          <section aria-labelledby="trending-heading">
            <SectionHeader title="Trending Companies" />
            <div className="flex gap-1 mb-4" role="tablist" aria-label="Trending period">
              {(["today", "week", "month"] as const).map(tab => (
                <button
                  key={tab}
                  role="tab"
                  aria-selected={trendingTab === tab}
                  onClick={() => setTrendingTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all capitalize ${trendingTab === tab ? `${V.bg} text-white` : "bg-gray-100 dark:bg-gray-900 text-gray-500 hover:text-gray-700"}`}
                >
                  {tab === "today" ? "Today" : tab === "week" ? "This Week" : "This Month"}
                </button>
              ))}
            </div>
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden" role="tabpanel">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {TRENDING[trendingTab].map((co, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <span className="font-extrabold text-base text-gray-100 dark:text-gray-800 w-5 shrink-0">{i + 1}</span>
                    <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{co.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white truncate">{co.name}</span>
                        <VerifiedBadge />
                      </div>
                      <span className="text-[9px] text-gray-400 block">{co.sector}</span>
                      <span className="text-[9px] font-bold text-emerald-600 flex items-center gap-0.5"><Flame className="h-2.5 w-2.5" /> {co.signal}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[9px] text-gray-400 flex items-center gap-1 justify-end"><Eye className="h-2.5 w-2.5" /> {co.views.toLocaleString()}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>

        {/* ── Emerging Companies ───────────────────────────────────────────────── */}
        <section aria-labelledby="emerging-heading">
          <SectionHeader title="Emerging Companies" hint="Rising, new entrants and high-activity verified companies" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {EMERGING.map((co, i) => (
              <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{co.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{co.name}</span>
                      <VerifiedBadge />
                    </div>
                    <span className="text-[9px] text-gray-400">{co.sector} · {co.country}</span>
                  </div>
                </div>
                <span className={`text-[8px] font-bold px-2 py-0.5 rounded-full border ${co.labelColor} inline-block`}>{co.label}</span>
                <p className="text-[10px] text-gray-500 leading-snug">{co.reason}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => toggleFollowCompany(co.name)}
                    className={`flex-1 text-[10px] font-bold py-2 rounded-lg border transition-all flex items-center justify-center gap-1 ${followedCompanies.includes(co.name) ? "border-emerald-300 bg-emerald-50 text-emerald-600" : "border-gray-200 dark:border-gray-700 text-gray-500 hover:text-emerald-600"}`}
                  >
                    {followedCompanies.includes(co.name) ? <BellRing className="h-3 w-3" /> : <Bell className="h-3 w-3" />}
                    {followedCompanies.includes(co.name) ? "Following" : "Follow"}
                  </button>
                  <Link href="/eoi" className={`flex-1 text-[10px] font-bold py-2 rounded-lg ${V.btn} flex items-center justify-center gap-1 transition-all`}>
                    Explore <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Sector Snapshot ──────────────────────────────────────────────────── */}
        <section aria-labelledby="snapshot-heading">
          <SectionHeader title="Sector Snapshot" hint={`Live metrics for ${selectedSector.name}`} />
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${V.grad} text-white px-5 py-3 flex items-center gap-3`}>
              <span className="text-2xl">{selectedSector.icon}</span>
              <div>
                <h3 className="font-bold text-sm">{selectedSector.name}</h3>
                <span className={`text-[9px] font-bold bg-white/20 px-2 py-0.5 rounded`}>{snapshot.activity} Activity</span>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-0 divide-x divide-y divide-gray-100 dark:divide-gray-800">
              {[
                { label: "Verified Companies", value: snapshot.verifiedCos?.toLocaleString(), icon: Building2 },
                { label: "New This Month", value: snapshot.newCos, icon: CheckCircle },
                { label: "News Stories", value: snapshot.newsStories, icon: Newspaper },
                { label: "Product Launches", value: snapshot.productLaunches, icon: Rocket },
                { label: "Partnerships", value: snapshot.partnerships, icon: Handshake },
                { label: "Investments", value: snapshot.investments, icon: DollarSign },
                { label: "Countries", value: snapshot.countries, icon: Globe },
              ].map((stat, i) => {
                const StatIcon = stat.icon;
                return (
                  <div key={i} className="p-4 text-center space-y-1">
                    <StatIcon className={`h-4 w-4 mx-auto ${V.text}`} aria-hidden="true" />
                    <div className="font-extrabold text-lg text-gray-900 dark:text-white">{stat.value}</div>
                    <div className="text-[9px] text-gray-400 leading-tight">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Sector → Industry Directory + Business Types (2 col) ────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Industry Directory */}
          <section aria-labelledby="industry-dir-heading">
            <SectionHeader title="Sector → Industry Directory" hint={`Industries within ${selectedSector.name}`} />
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {directory.map((ind: any, i: number) => (
                  <Link key={i} href="/eoi" className="flex items-center gap-4 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <div className="flex-1 min-w-0">
                      <span className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors block">{ind.name}</span>
                      <span className="text-[9px] text-gray-400">{ind.companies} verified companies · Top: {ind.topCo}</span>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-gray-300 shrink-0" aria-hidden="true" />
                  </Link>
                ))}
              </div>
              <div className="p-3 border-t border-gray-100 dark:border-gray-850 text-center">
                <Link href="/en/poc-v2/company-news/verified/all" className={`text-[10px] font-bold ${V.text} hover:underline flex items-center gap-0.5 justify-center`}>
                  View Full Industry Directory <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          </section>

          {/* Companies by Business Type */}
          <section aria-labelledby="biz-type-heading">
            <SectionHeader title="Companies by Business Type" />
            <div className="grid grid-cols-2 gap-3">
              {BUSINESS_TYPES.map(bt => {
                const BtIcon = bt.icon;
                return (
                  <Link key={bt.label} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group flex items-center gap-3">
                    <BtIcon className={`h-5 w-5 ${V.text} group-hover:scale-110 transition-transform shrink-0`} aria-hidden="true" />
                    <div>
                      <span className="font-bold text-xs text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors block">{bt.label}</span>
                      <span className="text-[9px] text-gray-400">{bt.count} companies</span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Products & Services ──────────────────────────────────────────────── */}
        <section aria-labelledby="products-heading">
          <SectionHeader title="Find Products & Services" hint="Discover what verified companies offer — then explore and enquire" />
          <div className="flex gap-2 mb-5 flex-wrap" role="group" aria-label="Product category sector">
            {Object.keys(PRODUCTS_SERVICES).map(cat => (
              <button
                key={cat}
                onClick={() => setActiveProductSector(cat)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${activeProductSector === cat ? `${V.bg} text-white border-transparent` : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 hover:border-emerald-300"}`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {(PRODUCTS_SERVICES[activeProductSector] || []).map((ps: any, i: number) => (
              <Link key={i} href="/eoi" className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group space-y-1.5 text-center">
                <Package className={`h-5 w-5 mx-auto ${V.text} group-hover:scale-110 transition-transform`} aria-hidden="true" />
                <h3 className="font-bold text-[11px] text-gray-900 dark:text-white group-hover:text-emerald-600 transition-colors leading-tight">{ps.name}</h3>
                <div className="text-[9px] text-gray-400">{ps.companies} companies</div>
                <div className="text-[9px] font-bold text-gray-500">Top: {ps.topCo}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* ── Latest Sector News + Sector Activity ────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

          {/* Latest Sector News */}
          <section aria-labelledby="sector-news-heading">
            <SectionHeader title="Latest Sector News" cta="View All Sector News" ctaHref="/en/poc-v2/company-news/verified/news" />
            <div className="space-y-3">
              {SECTOR_NEWS.map((n, i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 flex items-start gap-3 hover:shadow-sm hover:border-emerald-300 transition-all group">
                  <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{n.companyInitials}</div>
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">{n.companyName}</span>
                      <VerifiedBadge />
                      <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded ${V.bgSoft} ${V.text} border ${V.border}`}>{n.category}</span>
                    </div>
                    <Link href="/eoi">
                      <p className="text-xs font-bold text-gray-900 dark:text-white leading-snug group-hover:text-emerald-600 transition-colors">{n.headline}</p>
                    </Link>
                    <span className="text-[9px] text-gray-400">{n.industry} · {n.country} · {n.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Sector Activity */}
          <section aria-labelledby="activity-heading">
            <SectionHeader title="What's Happening in This Sector" />
            <div className="space-y-3">
              {SECTOR_ACTIVITY.map((act, i) => {
                const ActIcon = act.icon;
                return (
                  <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 flex items-start gap-3 hover:shadow-sm transition-all">
                    <div className={`h-8 w-8 rounded-lg bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 flex items-center justify-center shrink-0`}>
                      <ActIcon className={`h-4 w-4 ${act.color}`} aria-hidden="true" />
                    </div>
                    <div className="flex-1 min-w-0 space-y-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[8px] font-bold text-gray-500 uppercase">{act.type}</span>
                        <span className="font-bold text-[11px] text-gray-800 dark:text-gray-200">{act.company}</span>
                      </div>
                      <p className="text-[10px] text-gray-600 dark:text-gray-400 leading-snug">{act.detail}</p>
                      <span className="text-[9px] text-gray-400">{act.time}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* ── Companies to Watch ───────────────────────────────────────────────── */}
        <section aria-labelledby="watch-heading">
          <SectionHeader title="Companies to Watch" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPANIES_TO_WATCH.map((co, i) => (
              <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-4 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all space-y-3">
                <div className="flex items-start gap-2.5">
                  <div className="h-10 w-10 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{co.initials}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="font-bold text-xs text-gray-900 dark:text-white">{co.name}</span>
                      <VerifiedBadge />
                    </div>
                    <span className="text-[9px] text-gray-400">{co.sector} · {co.country}</span>
                    <div className={`text-[8px] font-bold mt-1 ${V.text} ${V.bgSoft} px-1.5 py-0.5 rounded border ${V.border} inline-block`}>{co.signal}</div>
                  </div>
                </div>
                <p className="text-[10px] text-gray-500 leading-snug">{co.reason}</p>
                <Link href="/eoi" className={`w-full text-[10px] font-bold py-2 rounded-lg ${V.btn} flex items-center justify-center gap-1 transition-all`}>
                  Explore Company <ChevronRight className="h-3 w-3" />
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* ── Compare Verified Companies ───────────────────────────────────────── */}
        <section aria-labelledby="compare-heading">
          <SectionHeader title="Compare Verified Companies" hint="Select up to 4 companies to compare side by side" />
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl p-5 space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {ALL_COMPANIES_FOR_COMPARE.map(co => {
                const isSelected = compareSelected.includes(co.id);
                return (
                  <button
                    key={co.id}
                    onClick={() => toggleCompare(co.id)}
                    disabled={!isSelected && compareSelected.length >= 4}
                    aria-pressed={isSelected}
                    className={`text-left border rounded-xl p-3 transition-all space-y-2 ${isSelected ? `${V.border} ${V.bgSoft}` : "border-gray-200 dark:border-gray-800 hover:border-emerald-300"} ${!isSelected && compareSelected.length >= 4 ? "opacity-40 cursor-not-allowed" : ""}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px]">
                        {co.name.split(" ").map((w: string) => w[0]).join("").slice(0, 2)}
                      </div>
                      {isSelected && <CheckCircle className="h-4 w-4 text-emerald-600" />}
                    </div>
                    <div>
                      <span className="font-bold text-[11px] text-gray-900 dark:text-white block">{co.name}</span>
                      <span className="text-[9px] text-gray-400">{co.sector}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {compareSelected.length < 2 ? (
              <div className={`${V.bgSoft} border ${V.border} rounded-xl p-4 text-center space-y-1`}>
                <GitCompare className={`h-6 w-6 mx-auto ${V.text}`} aria-hidden="true" />
                <p className="text-[11px] font-bold text-gray-600 dark:text-gray-400">Select 2 to 4 companies to compare</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs" aria-label="Company comparison table">
                  <thead>
                    <tr className="border-b border-gray-100 dark:border-gray-800">
                      <th className="text-left py-2 px-3 font-bold text-gray-500 text-[10px] uppercase">Criteria</th>
                      {compareSelected.map(id => {
                        const co = ALL_COMPANIES_FOR_COMPARE.find(c => c.id === id)!;
                        return (
                          <th key={id} className="text-left py-2 px-3">
                            <div className="font-bold text-[11px] text-gray-900 dark:text-white">{co.name}</div>
                            <VerifiedBadge />
                          </th>
                        );
                      })}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 dark:divide-gray-850">
                    {["sector", "country", "size", "followers", "newsThisMonth", "rank"].map(field => (
                      <tr key={field} className="hover:bg-gray-50 dark:hover:bg-gray-955">
                        <td className="py-2 px-3 font-bold text-[10px] text-gray-500 capitalize">{field === "newsThisMonth" ? "News (Month)" : field}</td>
                        {compareSelected.map(id => {
                          const co = ALL_COMPANIES_FOR_COMPARE.find(c => c.id === id)!;
                          return (
                            <td key={id} className="py-2 px-3 text-[11px] font-semibold text-gray-800 dark:text-gray-200">
                              {(co as any)[field]}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="flex items-center justify-between flex-wrap gap-3">
              <p className="text-[10px] text-gray-400">Advanced company comparison with analytics is a <span className="font-bold text-emerald-600">Premium</span> feature.</p>
              <Link href="/eoi" className={`${V.btn} font-bold text-xs px-5 py-2 rounded-lg flex items-center gap-1.5 transition-all`}>
                <Lock className="h-3.5 w-3.5" /> Unlock Full Comparison
              </Link>
            </div>
          </div>
        </section>

        {/* ── Sector Leaderboard ───────────────────────────────────────────────── */}
        <section aria-labelledby="leaderboard-heading">
          <SectionHeader title="Sector Leaderboard" hint="Most followed companies per sector" />
          <div className="flex gap-2 mb-5 flex-wrap" role="group" aria-label="Leaderboard sector">
            {LEADERBOARD_SECTORS.map(s => (
              <button
                key={s.code}
                onClick={() => setLeaderboardSector(s.code)}
                className={`text-[10px] font-bold px-3 py-1.5 rounded-full border transition-all ${leaderboardSector === s.code ? `${V.bg} text-white border-transparent` : "bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-800 text-gray-600 hover:border-emerald-300"}`}
              >
                {s.icon} {s.name.split(" &")[0].split(" and")[0]}
              </button>
            ))}
          </div>
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
            <div className={`bg-gradient-to-r ${V.grad} text-white px-5 py-3`}>
              <h3 className="font-bold text-sm">
                {IGEN_50_SECTORS.find(s => s.code === leaderboardSector)?.icon}{" "}
                {IGEN_50_SECTORS.find(s => s.code === leaderboardSector)?.name} Leaderboard
              </h3>
            </div>
            <div className="divide-y divide-gray-50 dark:divide-gray-850">
              {leaderboard.map((co: any) => (
                <div key={co.rank} className="flex items-center gap-4 px-5 py-3.5">
                  <span className="text-2xl shrink-0">{co.medal}</span>
                  <div className="h-9 w-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-[11px] shrink-0">{co.initials}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-bold text-sm text-gray-900 dark:text-white">{co.name}</span>
                      <VerifiedBadge />
                    </div>
                    <span className="text-[9px] text-gray-400">{co.score}</span>
                  </div>
                  <Link href="/eoi" className={`text-[10px] font-bold px-3 py-1.5 rounded-lg ${V.btn} flex items-center gap-0.5 shrink-0 transition-all`}>
                    Explore <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
            </div>
            {leaderboard.length === 0 && (
              <div className="px-5 py-8 text-center">
                <Trophy className={`h-8 w-8 mx-auto ${V.text} mb-2`} />
                <p className="text-xs font-bold text-gray-500">Leaderboard data not yet available for this sector.</p>
              </div>
            )}
          </div>
        </section>

        {/* ── Recently Verified + Most Followed + Recommended (3 col) ────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Recently Verified */}
          <section aria-labelledby="recently-verified-heading">
            <SectionHeader title="Recently Verified" />
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {RECENTLY_VERIFIED.map((co, i) => (
                  <Link key={i} href="/eoi" className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors group">
                    <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{co.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white truncate group-hover:text-emerald-600 transition-colors">{co.name}</span>
                        <VerifiedBadge />
                      </div>
                      <span className="text-[9px] text-gray-400">{co.sector} · {co.verifiedDate}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Most Followed */}
          <section aria-labelledby="most-followed-heading">
            <SectionHeader title="Most Followed" />
            <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-2xl overflow-hidden">
              <div className="divide-y divide-gray-50 dark:divide-gray-850">
                {MOST_FOLLOWED.map((co, i) => (
                  <div key={i} className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-955 transition-colors">
                    <div className="h-8 w-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{co.initials}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white truncate">{co.name}</span>
                      </div>
                      <span className="text-[9px] text-gray-400">{co.sector}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="flex items-center gap-0.5 text-[10px] font-bold text-gray-700 dark:text-gray-300 justify-end">
                        <Users className="h-2.5 w-2.5 text-gray-400" /> {co.followers}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Recommended */}
          <section aria-labelledby="recommended-heading">
            <SectionHeader title="Recommended for You" />
            <div className="space-y-3">
              {RECOMMENDED.map((co, i) => (
                <div key={i} className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-xl p-3.5 hover:shadow-sm hover:border-emerald-300 dark:hover:border-emerald-800 transition-all space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="h-9 w-9 rounded-lg bg-emerald-600 flex items-center justify-center text-white font-bold text-[10px] shrink-0">{co.initials}</div>
                    <div>
                      <div className="flex items-center gap-1">
                        <span className="font-bold text-[11px] text-gray-900 dark:text-white">{co.name}</span>
                        <VerifiedBadge />
                      </div>
                      <span className="text-[9px] text-gray-400">{co.sector}</span>
                    </div>
                  </div>
                  <p className="text-[9px] text-gray-500 italic">{co.reason}</p>
                  <Link href="/eoi" className={`w-full text-[10px] font-bold py-1.5 rounded-lg ${V.btn} flex items-center justify-center gap-1 transition-all`}>
                    Explore <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              ))}
              <p className="text-[9px] text-gray-400 text-center">
                <Link href="/en/poc-v2/company-news/verified/pages" className={`${V.text} font-bold hover:underline`}>Follow more companies</Link> to improve recommendations.
              </p>
            </div>
          </section>
        </div>

        {/* ── Follow Sector + Sector Alerts (2 col) ───────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Follow Sector */}
          <section aria-labelledby="follow-sector-heading">
            <div className={`${V.bgSoft} border ${V.border} rounded-2xl p-6 flex flex-col md:flex-row md:items-center gap-5`}>
              <div className="flex items-center gap-4 flex-1">
                <div className={`h-12 w-12 rounded-2xl ${V.bg} flex items-center justify-center shrink-0`}>
                  <Bell className="h-6 w-6 text-white" aria-hidden="true" />
                </div>
                <div>
                  <h2 id="follow-sector-heading" className="font-bold text-sm text-gray-900 dark:text-white">Follow a Sector</h2>
                  <p className="text-[10px] text-gray-500 mt-0.5 leading-relaxed">Get updates about companies, news, products and activity in your chosen sector.</p>
                </div>
              </div>
              <div className="space-y-2 shrink-0">
                <select aria-label="Select sector to follow" className={`w-full text-xs px-3 py-2 rounded-lg border ${V.border} ${V.bgSoft} ${V.text} outline-none font-bold`}>
                  {IGEN_50_SECTORS.slice(0, 12).map(s => (
                    <option key={s.code} value={s.code}>{s.icon} {s.name}</option>
                  ))}
                </select>
                <button
                  onClick={() => toggleFollowSector(selectedSectorCode)}
                  className={`w-full font-bold text-xs px-5 py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition-all ${followedSectors.includes(selectedSectorCode) ? "bg-emerald-100 text-emerald-700 border border-emerald-300" : `${V.btn}`}`}
                >
                  {followedSectors.includes(selectedSectorCode) ? <BellRing className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  {followedSectors.includes(selectedSectorCode) ? "Following Sector" : "+ Follow Sector"}
                </button>
              </div>
            </div>
          </section>

          {/* Sector Alerts */}
          <section aria-labelledby="alerts-heading">
            <div className="bg-gradient-to-br from-slate-950 to-[#162d54] border border-slate-800 rounded-2xl p-6 space-y-4">
              <div>
                <Bell className="h-5 w-5 text-emerald-400 mb-2" aria-hidden="true" />
                <h2 id="alerts-heading" className="font-bold text-sm text-white">Get Sector Alerts</h2>
                <p className="text-slate-400 text-[10px] mt-1 leading-relaxed">Receive alerts for new companies, product launches, partnerships, investments and M&A.</p>
              </div>
              {!alertCreated ? (
                <div className="space-y-2">
                  <input
                    type="email"
                    id="alert-email"
                    value={alertEmail}
                    onChange={e => setAlertEmail(e.target.value)}
                    placeholder="Your email address"
                    aria-label="Email for sector alerts"
                    className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-white placeholder-slate-500 outline-none focus:border-emerald-500"
                  />
                  <select aria-label="Alert type" className="w-full px-3 py-2 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-300 outline-none">
                    <option>All Activity in Sector</option>
                    <option>New Verified Companies</option>
                    <option>Company News</option>
                    <option>Product Launches</option>
                    <option>Partnerships & Deals</option>
                    <option>Investments</option>
                    <option>Expansion & M&A</option>
                  </select>
                  <button onClick={handleCreateAlert} className={`w-full ${V.btn} font-bold text-xs py-2.5 rounded-lg flex items-center justify-center gap-1.5 transition-all`}>
                    <Bell className="h-3.5 w-3.5" /> Create Sector Alert
                  </button>
                </div>
              ) : (
                <div className="bg-emerald-900/30 border border-emerald-800 rounded-xl p-3 flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                  <span className="text-xs font-bold text-emerald-300">Sector alert created successfully!</span>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* ── Industry Intelligence CTA ────────────────────────────────────────── */}
        <section aria-labelledby="intelligence-heading">
          <div className="bg-gradient-to-r from-slate-950 to-[#162d54] border border-slate-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6">
            <div className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-emerald-400" aria-hidden="true" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-emerald-400">Go Deeper</span>
              </div>
              <h2 id="intelligence-heading" className="font-bold text-xl text-white">Go Deeper into Sector Intelligence</h2>
              <p className="text-slate-400 text-sm leading-relaxed max-w-xl">Explore market trends, research, forecasts, risk reports, M&A analysis and premium intelligence for any sector.</p>
              <div className="flex flex-wrap gap-3">
                {["Market Trends", "Forecasts", "Risk Analysis", "M&A Intelligence", "Investment Flows", "Export Data"].map(item => (
                  <span key={item} className="flex items-center gap-1 text-[10px] text-slate-300">
                    <CheckCircle className="h-3 w-3 text-emerald-400 shrink-0" />{item}
                  </span>
                ))}
              </div>
            </div>
            <div className="space-y-2 shrink-0">
              <Link href="/en/poc-v2/sector-news/intelligence" className="block bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 text-white font-bold text-sm px-7 py-3 rounded-xl text-center transition-all">
                Explore Industry Intelligence →
              </Link>
              <Link href="/eoi" className="block border border-white/20 hover:bg-white/10 text-white font-bold text-xs px-7 py-2.5 rounded-xl text-center transition-all">
                View All Reports
              </Link>
            </div>
          </div>
        </section>

        {/* ── Featured & Sponsored Companies ──────────────────────────────────── */}
        <section aria-labelledby="featured-cos-heading">
          <div className="flex items-center justify-between border-b border-gray-200 dark:border-gray-800 pb-3 mb-5">
            <div className="flex items-center gap-2">
              <h2 id="featured-cos-heading" className="font-bold text-sm text-gray-900 dark:text-white uppercase tracking-wider">Featured Companies in This Sector</h2>
              <span className="text-[8px] font-bold bg-amber-100 dark:bg-amber-950/30 text-amber-700 border border-amber-200 px-1.5 py-0.5 rounded uppercase">Paid Placement</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {FEATURED_COMPANIES.map((co, i) => (
              <article key={i} className={`bg-white dark:bg-[#0f172a] border rounded-xl p-5 space-y-4 hover:shadow-md transition-all ${co.isSponsored ? "border-amber-200 dark:border-amber-900/50" : `${V.border}`}`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-xl bg-emerald-600 flex items-center justify-center text-white font-bold text-sm shrink-0">{co.initials}</div>
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-gray-900 dark:text-white">{co.name}</span>
                        <VerifiedBadge />
                        {co.isSponsored && <SponsoredBadge />}
                        {co.isFeatured && <FeaturedBadge />}
                      </div>
                      <span className="text-[10px] text-gray-400">{co.sector} · {co.country}</span>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{co.tagline}</p>
                <div className="flex gap-1.5 flex-wrap">
                  {co.products.map(p => (
                    <span key={p} className={`text-[9px] font-bold px-2 py-0.5 rounded border ${V.bgSoft} ${V.text} ${V.border}`}>{p}</span>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-gray-50 dark:border-gray-850">
                  <span className="text-[9px] text-gray-400">
                    {co.isSponsored ? "This is a paid sponsored placement." : "This is an editorially selected featured placement."}
                  </span>
                  <Link href="/eoi" className={`text-[10px] font-bold ${V.text} hover:underline flex items-center gap-0.5`}>
                    Explore Company <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
          <p className="text-[9px] text-gray-400 mt-3 text-center">
            Featured and sponsored placements do not affect organic rankings. <Link href="/eoi" className={`${V.text} font-bold hover:underline`}>Advertise your company →</Link>
          </p>
        </section>

        {/* ── Premium Sector Discovery ─────────────────────────────────────────── */}
        <section aria-labelledby="premium-heading">
          <div className="bg-white dark:bg-[#0f172a] border border-gray-200 dark:border-gray-800 rounded-3xl p-6 md:p-8 space-y-5">
            <div className="flex flex-col md:flex-row md:items-start gap-5">
              <div className="flex-1 space-y-3">
                <div className="flex items-center gap-2">
                  <Crown className="h-5 w-5 text-amber-400" aria-hidden="true" />
                  <h2 id="premium-heading" className="font-bold text-base text-gray-900 dark:text-white">Unlock Advanced Sector Discovery</h2>
                </div>
                <p className="text-sm text-gray-500 max-w-xl leading-relaxed">Access advanced filters, in-depth company comparison, sector analytics dashboards, data export, premium rankings and sector intelligence — available for Premium members.</p>
              </div>
              <Link href="/eoi" className={`${V.btn} font-bold text-sm px-7 py-3 rounded-xl flex items-center gap-2 shrink-0 transition-all self-start`}>
                <Crown className="h-4 w-4" /> Upgrade to Premium
              </Link>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 border-t border-gray-100 dark:border-gray-850 pt-5">
              {[
                { label: "Advanced Filters", icon: SlidersHorizontal },
                { label: "Company Comparison", icon: GitCompare },
                { label: "Sector Analytics", icon: BarChart3 },
                { label: "Saved Dashboards", icon: Bookmark },
                { label: "Data Export", icon: FileText },
                { label: "Advanced Rankings", icon: Trophy },
                { label: "Premium Alerts", icon: Bell },
                { label: "Sector Intelligence", icon: Sparkles },
              ].map(f => {
                const FIcon = f.icon;
                return (
                  <div key={f.label} className="flex items-center gap-2">
                    <Lock className="h-3 w-3 text-gray-300 shrink-0" aria-hidden="true" />
                    <div className="flex items-center gap-1.5">
                      <FIcon className={`h-3.5 w-3.5 ${V.text}`} aria-hidden="true" />
                      <span className="text-[10px] font-semibold text-gray-600 dark:text-gray-400">{f.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ── Register Your Business ───────────────────────────────────────────── */}
        <section aria-labelledby="register-heading">
          <div className={`bg-gradient-to-br ${V.grad} rounded-3xl p-8 md:p-10`}>
            <div className="max-w-2xl mx-auto text-center space-y-5">
              <Building2 className="h-10 w-10 text-white/80 mx-auto" aria-hidden="true" />
              <h2 id="register-heading" className="font-bold text-2xl text-white">Get Discovered in Your Industry</h2>
              <p className="text-white/80 text-sm leading-relaxed">Register your business and get discovered by professionals, buyers and industry audiences on iGEN. Join 3,200+ verified companies already on the platform.</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-w-md mx-auto text-left">
                {["Company listing", "Verification badge", "Sector visibility", "Featured placement", "Business enquiries", "Analytics dashboard"].map(b => (
                  <div key={b} className="flex items-center gap-2 text-[11px] text-white/90">
                    <CheckCircle className="h-3.5 w-3.5 text-white shrink-0" aria-hidden="true" />
                    {b}
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3">
                <Link href="/eoi" className="bg-white text-emerald-700 hover:bg-gray-50 font-bold text-sm px-8 py-3.5 rounded-xl transition-all flex items-center gap-2 justify-center">
                  <Plus className="h-4 w-4" /> Register Your Business
                </Link>
                <Link href="/eoi" className="bg-white/15 border border-white/30 text-white hover:bg-white/25 font-bold text-sm px-7 py-3 rounded-xl transition-all text-center">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
}
