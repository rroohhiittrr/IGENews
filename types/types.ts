// ==========================================
// India Global News — Core Types
// ==========================================

export enum Plan {
  FREE = "FREE",
  READER = "READER",
  LEADER = "LEADER",
  CORPORATE = "CORPORATE",
}

export enum ContentType {
  RSS_AI = "RSS_AI",
  MANUAL_AI = "MANUAL_AI",
  SPONSORED = "SPONSORED",
  PR = "PR",
  PODCAST = "PODCAST",
}

export enum ArticleStatus {
  DRAFT = "DRAFT",
  REVIEW = "REVIEW",
  PUBLISHED = "PUBLISHED",
  ARCHIVED = "ARCHIVED",
}

export type FeedTab = "sector" | "country" | "leader";

export type NewsCardVariant = "spotlight" | "list" | "compact" | "sidebar";

export interface Sector {
  id: string;
  name: string;
  slug: string;
  articleCount: number;
  icon?: string;
  trendingIndicator?: "up" | "stable" | "down";
}

export interface Industry {
  id: string;
  name: string;
  sectorId: string;
  articleCount: number;
}

export interface Country {
  id: string;
  name: string;
  pairName: string; // e.g., "USA–India"
  flagEmoji: string;
  tradeVolume: number;
  articleCount: number;
}

export interface LeaderDesignation {
  id: string;
  title: string;
  priority: number;
  articleCount: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  summary: string;
  body?: string;
  heroImage: string;
  readTime: number;
  type: ContentType;
  status: ArticleStatus;
  publishedAt: string;
  sector?: Sector;
  country?: Country;
  leaderDesignation?: LeaderDesignation;
  sourceName: string;
  sourceAvatar?: string;
  authorName?: string;
  likeCount: number;
  commentCount: number;
  shareCount: number;
  isTrending: boolean;
  isBreaking: boolean;
  isSponsored: boolean;
  isLocked?: boolean;
  isBookmarked?: boolean;
  isLiked?: boolean;
  tags: string[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  plan: Plan;
  avatar?: string;
  createdAt: string;
  selectedSectors: Sector[];
  selectedCountries: Country[];
  selectedLeaders: LeaderDesignation[];
}

export interface MegaMenuItem {
  label: string;
  href: string;
  subItems: MegaMenuSubItem[];
}

export interface MegaMenuSubItem {
  label: string;
  href: string;
  external?: boolean;
}

export interface BreakingNews {
  id: string;
  headline: string;
  articleSlug: string;
}
