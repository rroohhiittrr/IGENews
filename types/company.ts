import { z } from 'zod';

// ─────────────────────────────────────────────────────────────────────────────
// TIER & BADGE SYSTEM
// ─────────────────────────────────────────────────────────────────────────────
export const CompanyTierSchema = z.enum(['registered', 'verified', 'top']);
export type CompanyTier = z.infer<typeof CompanyTierSchema>;

export const TierLabelMap: Record<CompanyTier, { label: string; short: string; color: string }> = {
  registered: { label: 'Registered', short: 'Free', color: 'blue' },
  verified:   { label: 'Verified',   short: 'Pro',  color: 'emerald' },
  top:        { label: 'Enterprise', short: 'Top',  color: 'amber' },
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY PROFILE (Card + Detail)
// ─────────────────────────────────────────────────────────────────────────────
export const CompanyCardSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(120),
  logoUrl: z.string().url().nullable(),
  logoInitials: z.string().length(2).toUpperCase(), // fallback
  tagline: z.string().max(200).nullable(),
  industry: z.string().min(1).max(80),
  industryId: z.string().min(1),
  location: z.string().min(1).max(100),
  countryCode: z.string().length(2).toUpperCase(), // ISO 3166-1 alpha-2
  tier: CompanyTierSchema,
  followerCount: z.number().int().nonnegative(),
  isFollowing: z.boolean(),
  verificationDate: z.string().datetime().nullable(), // ISO 8601
  profileCompletion: z.number().int().min(0).max(100),
  viewCount30d: z.number().int().nonnegative().default(0),
  newsCount30d: z.number().int().nonnegative().default(0),
});
export type CompanyCard = z.infer<typeof CompanyCardSchema>;

export const CompanyDetailSchema = CompanyCardSchema.extend({
  about: z.string().max(5000),
  mission: z.string().max(1000).nullable(),
  vision: z.string().max(1000).nullable(),
  foundedYear: z.number().int().min(1800).max(new Date().getFullYear()),
  employees: z.string().max(20), // "5,200+" format
  revenue: z.string().max(30),   // "$1.8B+" format
  website: z.string().url().nullable(),
  phone: z.string().max(30).nullable(),
  email: z.string().email().nullable(),
  products: z.array(z.string().max(60)).max(20).default([]),
  leadership: z.array(z.object({
    name: z.string(),
    role: z.string(),
    initials: z.string().length(2).toUpperCase(),
  })).max(10).default([]),
  galleryImages: z.array(z.string().url()).max(10).default([]),
  analytics: z.object({
    profileViews: z.number().int(),
    newsViews: z.number().int(),
    leadCount: z.number().int(),
    topCountries: z.array(z.string()),
    topReferrers: z.array(z.string()),
  }).nullable(),
  crmIntegration: z.boolean().default(false),
});
export type CompanyDetail = z.infer<typeof CompanyDetailSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// NEWS / ARTICLE
// ─────────────────────────────────────────────────────────────────────────────
export const NewsCardSchema = z.object({
  id: z.string().uuid(),
  title: z.string().min(1).max(180),
  summary: z.string().max(350),
  thumbnailUrl: z.string().url().nullable(),
  company: z.object({
    id: z.string().uuid(),
    name: z.string(),
    logoUrl: z.string().url().nullable(),
    tier: CompanyTierSchema,
  }),
  industry: z.string(),
  publishedAt: z.string().datetime(), // ISO 8601
  readingTimeMinutes: z.number().int().positive(),
  viewCount: z.number().int().nonnegative(),
  shareCount: z.number().int().nonnegative(),
  commentCount: z.number().int().nonnegative(),
  isBookmarked: z.boolean(),
  isSponsored: z.boolean().default(false),
  category: z.enum(['Product Launch', 'Deal Announcement', 'Financial Update', 'Milestone', 'Partnership', 'Investment', 'ESG', 'Announcement']),
  trendingVariant: z.enum(['most-viewed', 'most-shared', 'most-commented', 'editors-pick']).nullable(),
});
export type NewsCard = z.infer<typeof NewsCardSchema>;

export const NewsDetailSchema = NewsCardSchema.extend({
  content: z.string(), // HTML/markdown
  seo: z.object({
    metaTitle: z.string().max(60),
    metaDescription: z.string().max(155),
    ogImage: z.string().url().nullable(),
    canonicalUrl: z.string().url(),
  }),
  relatedCompanies: z.array(CompanyCardSchema).max(5).default([]),
  relatedNews: z.array(NewsCardSchema).max(5).default([]),
});
export type NewsDetail = z.infer<typeof NewsDetailSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// SECTOR / INDUSTRY / COUNTRY TAXONOMY
// ─────────────────────────────────────────────────────────────────────────────
export const SectorSchema = z.object({
  id: z.string().min(1), // slug: "steel-metallurgy"
  name: z.string().min(1).max(60),
  companyCount: z.number().int().nonnegative(),
  growthRate: z.string().nullable(), // "+12%" or null
  topCompany: z.string().nullable(),
  icon: z.string().max(4), // emoji
  isTrending: z.boolean().default(false),
  description: z.string().max(500).nullable(),
  parentSectorId: z.string().nullable(), // for hierarchy
});
export type Sector = z.infer<typeof SectorSchema>;

export const CountrySchema = z.object({
  code: z.string().length(2).toUpperCase(), // ISO 3166-1 alpha-2
  name: z.string().min(1).max(80),
  companyCount: z.number().int().nonnegative(),
  flagEmoji: z.string().max(4),
  isBilateral: z.boolean().default(true),
});
export type Country = z.infer<typeof CountrySchema>;

// ─────────────────────────────────────────────────────────────────────────────
// FILTER METADATA (for Hero/Directory filter chips)
// ─────────────────────────────────────────────────────────────────────────────
export const FilterMetaSchema = z.object({
  industries: z.array(z.object({
    id: z.string(),
    name: z.string(),
    companyCount: z.number().int(),
  })),
  countries: z.array(z.object({
    code: z.string().length(2).toUpperCase(),
    name: z.string(),
    companyCount: z.number().int(),
  })),
  tiers: z.array(z.object({
    value: CompanyTierSchema,
    label: z.string(),
    companyCount: z.number().int(),
  })),
});
export type FilterMeta = z.infer<typeof FilterMetaSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// PAGINATION & FACETS
// ─────────────────────────────────────────────────────────────────────────────
export const PaginationSchema = z.object({
  page: z.number().int().positive(),
  pageSize: z.number().int().positive().max(100),
  total: z.number().int().nonnegative(),
  totalPages: z.number().int().nonnegative(),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});
export type Pagination = z.infer<typeof PaginationSchema>;

export const SearchFacetsSchema = z.object({
  industries: z.array(z.object({
    id: z.string(),
    name: z.string(),
    count: z.number().int(),
  })),
  countries: z.array(z.object({
    code: z.string().length(2).toUpperCase(),
    name: z.string(),
    count: z.number().int(),
  })),
  tiers: z.array(z.object({
    value: CompanyTierSchema,
    count: z.number().int(),
  })),
});
export type SearchFacets = z.infer<typeof SearchFacetsSchema>;

// ─────────────────────────────────────────────────────────────────────────────
// API RESPONSE WRAPPERS
// ─────────────────────────────────────────────────────────────────────────────
export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) => z.object({
  data: dataSchema,
  meta: z.object({
    timestamp: z.string().datetime(),
    requestId: z.string().uuid(),
    version: z.string().default('1.0'),
  }).optional(),
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.unknown()).optional(),
  }).optional(),
});

export type ApiResponse<T> = {
  data: T;
  meta?: { timestamp: string; requestId: string; version: string };
  error?: { code: string; message: string; details?: Record<string, unknown> };
};

// ─────────────────────────────────────────────────────────────────────────────
// TIER GATING LOGIC
// ─────────────────────────────────────────────────────────────────────────────
export const TIER_LIMITS: Record<CompanyTier, {
  maxNewsPerMonth: number | 'unlimited';
  canSponsorNews: boolean;
  featuredSlots: number; // homepage featured company slots
  searchRankBoost: number; // 1.0 | 1.5 | 2.0
  analyticsAccess: 'none' | 'basic' | 'advanced';
  leadExport: boolean;
  crmIntegration: boolean;
  galleryAccess: 'none' | 'limited' | 'full' | 'premium_video';
  pressKitAccess: 'none' | 'basic' | 'advanced_downloads';
  supportLevel: 'none' | 'email' | 'account_manager';
}> = {
  registered: {
    maxNewsPerMonth: 5,
    canSponsorNews: false,
    featuredSlots: 0,
    searchRankBoost: 1.0,
    analyticsAccess: 'none',
    leadExport: false,
    crmIntegration: false,
    galleryAccess: 'none',
    pressKitAccess: 'none',
    supportLevel: 'none',
  },
  verified: {
    maxNewsPerMonth: 'unlimited',
    canSponsorNews: false,
    featuredSlots: 2,
    searchRankBoost: 1.5,
    analyticsAccess: 'basic',
    leadExport: false,
    crmIntegration: false,
    galleryAccess: 'full',
    pressKitAccess: 'basic',
    supportLevel: 'email',
  },
  top: {
    maxNewsPerMonth: 'unlimited',
    canSponsorNews: true,
    featuredSlots: 10, // homepage priority
    searchRankBoost: 2.0,
    analyticsAccess: 'advanced',
    leadExport: true,
    crmIntegration: true,
    galleryAccess: 'premium_video',
    pressKitAccess: 'advanced_downloads',
    supportLevel: 'account_manager',
  },
};

export function canPublishNews(tier: CompanyTier, publishedThisMonth: number): boolean {
  const limit = TIER_LIMITS[tier].maxNewsPerMonth;
  return limit === 'unlimited' || publishedThisMonth < limit;
}

export function getSearchRankBoost(tier: CompanyTier): number {
  return TIER_LIMITS[tier].searchRankBoost;
}

export function getFeaturedSlots(tier: CompanyTier): number {
  return TIER_LIMITS[tier].featuredSlots;
}

export function getAnalyticsAccess(tier: CompanyTier): 'none' | 'basic' | 'advanced' {
  return TIER_LIMITS[tier].analyticsAccess;
}

export function canExportLeads(tier: CompanyTier): boolean {
  return TIER_LIMITS[tier].leadExport;
}

export function hasCRMIntegration(tier: CompanyTier): boolean {
  return TIER_LIMITS[tier].crmIntegration;
}

export function getGalleryAccess(tier: CompanyTier): typeof TIER_LIMITS[CompanyTier]['galleryAccess'] {
  return TIER_LIMITS[tier].galleryAccess;
}

export function getPressKitAccess(tier: CompanyTier): typeof TIER_LIMITS[CompanyTier]['pressKitAccess'] {
  return TIER_LIMITS[tier].pressKitAccess;
}
