# IGEN Company Pages Mega Menu — Implementation PRD
**Version:** 2.0 (Implementation-Ready)  
**Date:** 2026-08-03  
**Author:** Aditya Tirakapdi (audit + synthesis)  
**Sources:** Original PRD, POC Changes v1.1, Master Strategy Deck, Existing POC Codebase  
**Target:** antigravity demo build  
**Status:** READY FOR DEVELOPMENT

---

## 0. Document Purpose & Scope

This document replaces the generic marketing PRD with a **complete engineering specification** for the Company Pages Mega Menu surface on `indiaglobalnews.com`. It covers:

| Dimension | Coverage |
|-----------|----------|
| **UX & IA** | Complete user flows, screen states, responsive breakpoints, accessibility |
| **Functional** | Every feature with acceptance criteria, edge cases, tier gating |
| **Technical** | TypeScript interfaces, API contracts (OpenAPI), component architecture, state management, mock data factory |

**Out of Scope:** Leader Pages, Expert News, Communities, My News — separate PRDs.

---

## 1. Information Architecture (Final)

### 1.1 Mega Menu Position
**Company News** = Mega Menu Item #4 (revenue-generating, tied to Company Pages product)

### 1.2 Sub-Menu Structure (Per POC v1.1 + Founder Voice Note)

```
Company News (Mega Menu Item)
├── Registered Companies (Free Tier)
│   ├── Company Pages → /company-news/registered/pages
│   ├── Company News  → /company-news/registered/news
│   ├── By Sector     → /company-news/registered/sector
│   └── All Sector    → /company-news/registered/all
├── Verified Companies (Pro Tier)
│   ├── Company Pages → /company-news/verified/pages
│   ├── Company News  → /company-news/verified/news
│   ├── By Sector     → /company-news/verified/sector
│   └── All Sector    → /company-news/verified/all
└── Top Companies / Corporates (Enterprise Tier)
    ├── Company Pages → /company-news/top/pages
    ├── Company News  → /company-news/top/news
    ├── By Sector     → /company-news/top/sector
    └── All Sector    → /company-news/top/all
```

### 1.3 URL Schema (Canonical)

| Route | Params | Description |
|-------|--------|-------------|
| `/company-news/{tier}/pages` | `tier ∈ {registered, verified, top}` | Company directory with profiles |
| `/company-news/{tier}/news` | `tier ∈ {registered, verified, top}` | News feed for that tier |
| `/company-news/{tier}/sector` | `tier`, `sectorId?` | Sector-filtered view |
| `/company-news/{tier}/all` | `tier` | Full repository (paginated) |

**Query Parameters (all list views):**
```
?q=search-term
&sector=sector-id (multi: comma-separated)
&country=country-code (multi)
&sort=relevance|newest|most_viewed|most_followed|verified_first
&page=1
&pageSize=24
```

**Example:** `/company-news/verified/pages?q=tata&sector=steel,auto&sort=most_followed&page=2`

---

## 2. Data Models (TypeScript + Zod)

### 2.1 Core Entities

```typescript
// packages/shared/src/types/company.ts
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
  logoInitials: z.string().length(2).uppercase(), // fallback
  tagline: z.string().max(200).nullable(),
  industry: z.string().min(1).max(80),
  industryId: z.string().min(1),
  location: z.string().min(1).max(100),
  countryCode: z.string().length(2).uppercase(), // ISO 3166-1 alpha-2
  tier: CompanyTierSchema,
  followerCount: z.number().int().nonnegative(),
  isFollowing: z.boolean(),
  verificationDate: z.string().datetime().nullable(), // ISO 8601
  profileCompletion: z.number().int().min(0).max(100),
  // Computed for sorting
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
    initials: z.string().length(2).uppercase(),
  })).max(10).default([]),
  galleryImages: z.array(z.string().url()).max(10).default([]),
  // Tier-gated fields
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
  code: z.string().length(2).uppercase(), // ISO 3166-1 alpha-2
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
    code: z.string().length(2).uppercase(),
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
    code: z.string().length(2).uppercase(),
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
// TIER GATING LOGIC (Pure functions — testable, no React)
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

export function getGalleryAccess(tier: CompanyTier): TIER_LIMITS[CompanyTier]['galleryAccess'] {
  return TIER_LIMITS[tier].galleryAccess;
}

export function getPressKitAccess(tier: CompanyTier): TIER_LIMITS[CompanyTier]['pressKitAccess'] {
  return TIER_LIMITS[tier].pressKitAccess;
}
```

---

## 3. API Contracts (OpenAPI 3.1)

### 3.1 Endpoints Summary

| Method | Path | Purpose |
|--------|------|---------|
| `GET` | `/api/companies/search` | Primary directory search with filters, facets, pagination |
| `GET` | `/api/companies/featured` | Featured companies for hero (tier-filtered) |
| `GET` | `/api/companies/{id}` | Company detail (profile + gated fields) |
| `GET` | `/api/companies/{id}/news` | Company's news feed (paginated) |
| `GET` | `/api/news/latest` | Latest company news (cross-tier) |
| `GET` | `/api/news/trending` | Trending news (engagement-based) |
| `GET` | `/api/sectors` | All 50 sectors with counts |
| `GET` | `/api/sectors/{id}/companies` | Companies in a sector |
| `GET` | `/api/countries` | 195 bilateral countries |
| `GET` | `/api/filters/meta` | Filter options for Hero/Directory |
| `POST` | `/api/companies/{id}/follow` | Follow/unfollow company |
| `POST` | `/api/news/{id}/bookmark` | Bookmark/unbookmark article |
| `GET` | `/api/user/tier` | Current user's subscription tier |

### 3.2 Full OpenAPI Spec (Key Endpoints)

```yaml
# openapi.yaml
openapi: 3.1.0
info:
  title: IGEN Company Pages API
  version: 1.0.0
  description: API for Company News Mega Menu - Company Directory, News, Search
servers:
  - url: https://api.indiaglobalnews.com/v1
    description: Production
  - url: http://localhost:3000/api
    description: Local development

components:
  securitySchemes:
    BearerAuth:
      type: http
      scheme: bearer
      bearerFormat: JWT
  schemas:
    CompanyCard:
      type: object
      required: [id, name, logoUrl, logoInitials, tagline, industry, industryId, location, countryCode, tier, followerCount, isFollowing, verificationDate, profileCompletion]
      properties:
        id: { type: string, format: uuid }
        name: { type: string, maxLength: 120 }
        logoUrl: { type: string, format: uri, nullable: true }
        logoInitials: { type: string, pattern: '^[A-Z]{2}$' }
        tagline: { type: string, maxLength: 200, nullable: true }
        industry: { type: string, maxLength: 80 }
        industryId: { type: string }
        location: { type: string, maxLength: 100 }
        countryCode: { type: string, pattern: '^[A-Z]{2}$' }
        tier: { type: string, enum: [registered, verified, top] }
        followerCount: { type: integer, minimum: 0 }
        isFollowing: { type: boolean }
        verificationDate: { type: string, format: date-time, nullable: true }
        profileCompletion: { type: integer, minimum: 0, maximum: 100 }
        viewCount30d: { type: integer, minimum: 0, default: 0 }
        newsCount30d: { type: integer, minimum: 0, default: 0 }

    CompanyDetail:
      allOf:
        - $ref: '#/components/schemas/CompanyCard'
        - type: object
          required: [about, foundedYear, employees, revenue, website, phone, email, products, leadership, galleryImages, analytics, crmIntegration]
          properties:
            about: { type: string, maxLength: 5000 }
            mission: { type: string, maxLength: 1000, nullable: true }
            vision: { type: string, maxLength: 1000, nullable: true }
            foundedYear: { type: integer, minimum: 1800, maximum: 2026 }
            employees: { type: string, maxLength: 20 }
            revenue: { type: string, maxLength: 30 }
            website: { type: string, format: uri, nullable: true }
            phone: { type: string, maxLength: 30, nullable: true }
            email: { type: string, format: email, nullable: true }
            products: { type: array, items: { type: string, maxLength: 60 }, maxItems: 20 }
            leadership:
              type: array
              maxItems: 10
              items:
                type: object
                required: [name, role, initials]
                properties:
                  name: { type: string }
                  role: { type: string }
                  initials: { type: string, pattern: '^[A-Z]{2}$' }
            galleryImages: { type: array, items: { type: string, format: uri }, maxItems: 10 }
            analytics:
              type: object
              nullable: true
              required: [profileViews, newsViews, leadCount, topCountries, topReferrers]
              properties:
                profileViews: { type: integer }
                newsViews: { type: integer }
                leadCount: { type: integer }
                topCountries: { type: array, items: { type: string } }
                topReferrers: { type: array, items: { type: string } }
            crmIntegration: { type: boolean, default: false }

    NewsCard:
      type: object
      required: [id, title, summary, thumbnailUrl, company, industry, publishedAt, readingTimeMinutes, viewCount, shareCount, commentCount, isBookmarked, isSponsored, category, trendingVariant]
      properties:
        id: { type: string, format: uuid }
        title: { type: string, maxLength: 180 }
        summary: { type: string, maxLength: 350 }
        thumbnailUrl: { type: string, format: uri, nullable: true }
        company:
          type: object
          required: [id, name, logoUrl, tier]
          properties:
            id: { type: string, format: uuid }
            name: { type: string }
            logoUrl: { type: string, format: uri, nullable: true }
            tier: { type: string, enum: [registered, verified, top] }
        industry: { type: string }
        publishedAt: { type: string, format: date-time }
        readingTimeMinutes: { type: integer, minimum: 1 }
        viewCount: { type: integer, minimum: 0 }
        shareCount: { type: integer, minimum: 0 }
        commentCount: { type: integer, minimum: 0 }
        isBookmarked: { type: boolean }
        isSponsored: { type: boolean, default: false }
        category: { type: string, enum: [Product Launch, Deal Announcement, Financial Update, Milestone, Partnership, Investment, ESG, Announcement] }
        trendingVariant: { type: string, enum: [most-viewed, most-shared, most-commented, editors-pick], nullable: true }

    Sector:
      type: object
      required: [id, name, companyCount, growthRate, topCompany, icon, isTrending, description, parentSectorId]
      properties:
        id: { type: string }
        name: { type: string, maxLength: 60 }
        companyCount: { type: integer, minimum: 0 }
        growthRate: { type: string, nullable: true }
        topCompany: { type: string, nullable: true }
        icon: { type: string, maxLength: 4 }
        isTrending: { type: boolean, default: false }
        description: { type: string, maxLength: 500, nullable: true }
        parentSectorId: { type: string, nullable: true }

    Country:
      type: object
      required: [code, name, companyCount, flagEmoji, isBilateral]
      properties:
        code: { type: string, pattern: '^[A-Z]{2}$' }
        name: { type: string, maxLength: 80 }
        companyCount: { type: integer, minimum: 0 }
        flagEmoji: { type: string, maxLength: 4 }
        isBilateral: { type: boolean, default: true }

    FilterMeta:
      type: object
      required: [industries, countries, tiers]
      properties:
        industries:
          type: array
          items:
            type: object
            required: [id, name, companyCount]
            properties:
              id: { type: string }
              name: { type: string }
              companyCount: { type: integer }
        countries:
          type: array
          items:
            type: object
            required: [code, name, companyCount]
            properties:
              code: { type: string, pattern: '^[A-Z]{2}$' }
              name: { type: string }
              companyCount: { type: integer }
        tiers:
          type: array
          items:
            type: object
            required: [value, label, companyCount]
            properties:
              value: { type: string, enum: [registered, verified, top] }
              label: { type: string }
              companyCount: { type: integer }

    Pagination:
      type: object
      required: [page, pageSize, total, totalPages, hasNext, hasPrev]
      properties:
        page: { type: integer, minimum: 1 }
        pageSize: { type: integer, minimum: 1, maximum: 100 }
        total: { type: integer, minimum: 0 }
        totalPages: { type: integer, minimum: 0 }
        hasNext: { type: boolean }
        hasPrev: { type: boolean }

    SearchFacets:
      type: object
      properties:
        industries:
          type: array
          items:
            type: object
            required: [id, name, count]
            properties:
              id: { type: string }
              name: { type: string }
              count: { type: integer }
        countries:
          type: array
          items:
            type: object
            required: [code, name, count]
            properties:
              code: { type: string, pattern: '^[A-Z]{2}$' }
              name: { type: string }
              count: { type: integer }
        tiers:
          type: array
          items:
            type: object
            required: [value, count]
            properties:
              value: { type: string, enum: [registered, verified, top] }
              count: { type: integer }

    ErrorResponse:
      type: object
      required: [code, message]
      properties:
        code: { type: string }
        message: { type: string }
        details: { type: object }

    ApiResponse:
      type: object
      properties:
        data: { type: object }
        meta:
          type: object
          properties:
            timestamp: { type: string, format: date-time }
            requestId: { type: string, format: uuid }
            version: { type: string }
        error: { $ref: '#/components/schemas/ErrorResponse' }

  parameters:
    searchQuery:
      name: q
      in: query
      schema: { type: string, maxLength: 200 }
      description: Full-text search across name, tagline, industry, location
    sectorFilter:
      name: sector
      in: query
      schema: { type: string, pattern: '^([a-z0-9-]+)(,[a-z0-9-]+)*$' }
      description: Comma-separated sector IDs
    countryFilter:
      name: country
      in: query
      schema: { type: string, pattern: '^([A-Z]{2})(,[A-Z]{2})*$' }
      description: Comma-separated ISO 3166-1 alpha-2 country codes
    tierFilter:
      name: tier
      in: query
      schema: { type: string, pattern: '^(registered|verified|top)(,(registered|verified|top))*$' }
      description: Comma-separated tier values
    sortParam:
      name: sort
      in: query
      schema: { type: string, enum: [relevance, newest, most_viewed, most_followed, verified_first] }
      description: Sort order
    pageParam:
      name: page
      in: query
      schema: { type: integer, minimum: 1, default: 1 }
    pageSizeParam:
      name: pageSize
      in: query
      schema: { type: integer, minimum: 1, maximum: 100, default: 24 }

paths:
  /api/companies/search:
    get:
      summary: Search companies with filters, facets, pagination
      operationId: searchCompanies
      security: [{ BearerAuth: [] }]
      parameters:
        - $ref: '#/components/parameters/searchQuery'
        - $ref: '#/components/parameters/sectorFilter'
        - $ref: '#/components/parameters/countryFilter'
        - $ref: '#/components/parameters/tierFilter'
        - $ref: '#/components/parameters/sortParam'
        - $ref: '#/components/parameters/pageParam'
        - $ref: '#/components/parameters/pageSizeParam'
      responses:
        '200':
          description: Search results with facets
          content:
            application/json:
              schema:
                type: object
                required: [data, pagination, facets]
                properties:
                  data:
                    type: array
                    items: { $ref: '#/components/schemas/CompanyCard' }
                  pagination: { $ref: '#/components/schemas/Pagination' }
                  facets: { $ref: '#/components/schemas/SearchFacets' }
        '400': { description: Invalid query parameters, content: { application/json: { schema: { $ref: '#/components/schemas/ErrorResponse' } } } }
        '401': { description: Unauthorized }
        '500': { description: Server error }

  /api/companies/featured:
    get:
      summary: Get featured companies for hero banner (tier-weighted)
      operationId: getFeaturedCompanies
      security: [{ BearerAuth: [] }]
      parameters:
        - name: limit
          in: query
          schema: { type: integer, minimum: 1, maximum: 20, default: 8 }
        - name: tier
          in: query
          schema: { type: string, pattern: '^(registered|verified|top)(,(registered|verified|top))*$', default: 'verified,top' }
          description: Comma-separated tiers to include
      responses:
        '200':
          description: Featured company cards
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/CompanyCard' }

  /api/companies/{id}:
    get:
      summary: Get company detail (profile + gated fields by tier/auth)
      operationId: getCompanyDetail
      security: [{ BearerAuth: [] }]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        '200':
          description: Company detail
          content:
            application/json:
              schema:
                type: object
                required: [data]
                properties:
                  data: { $ref: '#/components/schemas/CompanyDetail' }
        '404': { description: Company not found }
        '403': { description: Tier-gated content (analytics, gallery, etc.) }

  /api/companies/{id}/news:
    get:
      summary: Get company's news feed
      operationId: getCompanyNews
      security: [{ BearerAuth: [] }]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string, format: uuid }
        - $ref: '#/components/parameters/pageParam'
        - $ref: '#/components/parameters/pageSizeParam'
      responses:
        '200':
          description: Company news with pagination
          content:
            application/json:
              schema:
                type: object
                required: [data, pagination]
                properties:
                  data:
                    type: array
                    items: { $ref: '#/components/schemas/NewsCard' }
                  pagination: { $ref: '#/components/schemas/Pagination' }

  /api/news/latest:
    get:
      summary: Latest company news across all tiers
      operationId: getLatestNews
      security: [{ BearerAuth: [] }]
      parameters:
        - name: limit
          in: query
          schema: { type: integer, minimum: 1, maximum: 50, default: 10 }
        - name: industry
          in: query
          schema: { type: string }
        - name: since
          in: query
          schema: { type: string, format: date-time }
      responses:
        '200':
          description: Latest news cards
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/NewsCard' }

  /api/news/trending:
    get:
      summary: Trending news by engagement
      operationId: getTrendingNews
      security: [{ BearerAuth: [] }]
      parameters:
        - name: variant
          in: query
          schema: { type: string, enum: [most-viewed, most-shared, most-commented, editors-pick] }
        - name: limit
          in: query
          schema: { type: integer, minimum: 1, maximum: 20, default: 10 }
      responses:
        '200':
          description: Trending news cards
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/NewsCard' }

  /api/sectors:
    get:
      summary: All 50 sectors with company counts
      operationId: getAllSectors
      security: [{ BearerAuth: [] }]
      responses:
        '200':
          description: Sector list
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/Sector' }

  /api/sectors/{id}/companies:
    get:
      summary: Companies in a sector (paginated, filterable)
      operationId: getSectorCompanies
      security: [{ BearerAuth: [] }]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string }
        - $ref: '#/components/parameters/tierFilter'
        - $ref: '#/components/parameters/sortParam'
        - $ref: '#/components/parameters/pageParam'
        - $ref: '#/components/parameters/pageSizeParam'
      responses:
        '200':
          description: Sector companies
          content:
            application/json:
              schema:
                type: object
                required: [data, pagination]
                properties:
                  data:
                    type: array
                    items: { $ref: '#/components/schemas/CompanyCard' }
                  pagination: { $ref: '#/components/schemas/Pagination' }

  /api/countries:
    get:
      summary: All 195 bilateral countries
      operationId: getAllCountries
      security: [{ BearerAuth: [] }]
      responses:
        '200':
          description: Country list
          content:
            application/json:
              schema:
                type: array
                items: { $ref: '#/components/schemas/Country' }

  /api/filters/meta:
    get:
      summary: Filter metadata for Hero/Directory (industries, countries, tiers with counts)
      operationId: getFilterMeta
      security: [{ BearerAuth: [] }]
      responses:
        '200':
          description: Filter metadata
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/FilterMeta'

  /api/companies/{id}/follow:
    post:
      summary: Follow/unfollow a company
      operationId: toggleFollowCompany
      security: [{ BearerAuth: [] }]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        '200':
          description: Follow status toggled
          content:
            application/json:
              schema:
                type: object
                required: [isFollowing, followerCount]
                properties:
                  isFollowing: { type: boolean }
                  followerCount: { type: integer }

  /api/news/{id}/bookmark:
    post:
      summary: Bookmark/unbookmark an article
      operationId: toggleBookmarkNews
      security: [{ BearerAuth: [] }]
      parameters:
        - name: id
          in: path
          required: true
          schema: { type: string, format: uuid }
      responses:
        '200':
          description: Bookmark status toggled
          content:
            application/json:
              schema:
                type: object
                required: [isBookmarked]
                properties:
                  isBookmarked: { type: boolean }

  /api/user/tier:
    get:
      summary: Get current user's subscription tier
      operationId: getUserTier
      security: [{ BearerAuth: [] }]
      responses:
        '200':
          description: User tier
          content:
            application/json:
              schema:
                type: object
                required: [tier, companyId]
                properties:
                  tier: { type: string, enum: [registered, verified, top, none] }
                  companyId: { type: string, format: uuid, nullable: true }
```

---

## 4. Component Architecture (React/Next.js 15)

### 4.1 Page Composition

```tsx
// app/[locale]/(main)/company-news/page.tsx
import { CompanyMegaMenuPage } from '@/components/company-pages/CompanyMegaMenuPage';

export default function CompanyNewsPage() {
  return <CompanyMegaMenuPage />;
}
```

```tsx
// components/company-pages/CompanyMegaMenuPage.tsx
'use client';

import { Suspense } from 'react';
import { CompanyHeroBanner } from './CompanyHeroBanner';
import { FeaturedCompanies } from './FeaturedCompanies';
import { LatestCompanyNews } from './LatestCompanyNews';
import { TrendingCompanyNews } from './TrendingCompanyNews';
import { CompanyDirectory } from './CompanyDirectory';
import { BrowseByIndustry } from './BrowseByIndustry';
import { TrendingCompanies } from './TrendingCompanies';
import { CompanySpotlight } from './CompanySpotlight';
import { UpgradeBanner } from './UpgradeBanner';
import { NewsletterSignup } from './NewsletterSignup';
import { CompanySkeleton } from './skeletons';

export function CompanyMegaMenuPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#070b12]">
      {/* Each section independently fetchable + suspense boundary */}
      <CompanyHeroBanner />
      
      <Suspense fallback={<CompanySkeleton variant="featured" />}>
        <FeaturedCompanies />
      </Suspense>
      
      <Suspense fallback={<CompanySkeleton variant="news" />}>
        <LatestCompanyNews />
      </Suspense>
      
      <Suspense fallback={<CompanySkeleton variant="trending" />}>
        <TrendingCompanyNews />
      </Suspense>
      
      <Suspense fallback={<CompanySkeleton variant="directory" />}>
        <CompanyDirectory />
      </Suspense>
      
      <Suspense fallback={<CompanySkeleton variant="industry" />}>
        <BrowseByIndustry />
      </Suspense>
      
      <Suspense fallback={<CompanySkeleton variant="trending-companies" />}>
        <TrendingCompanies />
      </Suspense>
      
      <Suspense fallback={<CompanySkeleton variant="spotlight" />}>
        <CompanySpotlight />
      </Suspense>
      
      <UpgradeBanner />
      <NewsletterSignup />
    </div>
  );
}
```

### 4.2 State Management (URL-Synced Filters)

```typescript
// hooks/useCompanyFilters.ts
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { useCallback, useMemo } from 'react';
import { CompanyTier } from '@/types/company';

export interface CompanyFilters {
  q: string;
  sector: string[];      // sector IDs
  country: string[];     // ISO country codes
  tier: CompanyTier[];   // registered | verified | top
  sort: 'relevance' | 'newest' | 'most_viewed' | 'most_followed' | 'verified_first';
  page: number;
  pageSize: number;
}

const DEFAULT_FILTERS: CompanyFilters = {
  q: '',
  sector: [],
  country: [],
  tier: [],
  sort: 'relevance',
  page: 1,
  pageSize: 24,
};

export function useCompanyFilters() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // Parse URL → filters
  const filters = useMemo((): CompanyFilters => ({
    q: searchParams.get('q') || '',
    sector: searchParams.get('sector')?.split(',').filter(Boolean) || [],
    country: searchParams.get('country')?.split(',').filter(Boolean) || [],
    tier: (searchParams.get('tier')?.split(',').filter(Boolean) as CompanyTier[]) || [],
    sort: (searchParams.get('sort') as CompanyFilters['sort']) || 'relevance',
    page: parseInt(searchParams.get('page') || '1', 10),
    pageSize: parseInt(searchParams.get('pageSize') || '24', 10),
  }), [searchParams]);

  // Update URL (replace to avoid history spam)
  const setFilters = useCallback((updates: Partial<CompanyFilters>) => {
    const params = new URLSearchParams(searchParams.toString());
    
    Object.entries({ ...filters, ...updates }).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length) params.set(key, value.join(','));
        else params.delete(key);
      } else if (value !== undefined && value !== '') {
        params.set(key, String(value));
      } else {
        params.delete(key);
      }
    });

    // Reset page on filter change (except explicit page updates)
    if (updates.page === undefined && (updates.q !== undefined || updates.sector !== undefined || updates.country !== undefined || updates.tier !== undefined || updates.sort !== undefined)) {
      params.set('page', '1');
    }

    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }, [searchParams, filters, router, pathname]);

  return { filters, setFilters };
}
```

### 4.3 Data Fetching (TanStack Query / SWR Pattern)

```typescript
// lib/api/company.ts
import { CompanyCard, CompanyDetail, NewsCard, Pagination, SearchFacets, FilterMeta, Sector, Country } from '@/types/company';

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '/api';

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url, {
    headers: { 'Accept': 'application/json' },
    next: { revalidate: 60 }, // ISR for demo
  });
  if (!res.ok) throw new Error(`API ${res.status}: ${res.statusText}`);
  const json = await res.json();
  return json.data ?? json; // Handle both wrapped and direct responses
}

export const companyApi = {
  search: (params: URLSearchParams) => 
    fetchJson<{ data: CompanyCard[]; pagination: Pagination; facets: SearchFacets }>(
      `${API_BASE}/companies/search?${params.toString()}`
    ),
  
  featured: (tier: string[], limit: number) =>
    fetchJson<CompanyCard[]>(
      `${API_BASE}/companies/featured?tier=${tier.join(',')}&limit=${limit}`
    ),
  
  detail: (id: string) =>
    fetchJson<{ data: CompanyDetail }>(`${API_BASE}/companies/${id}`),
  
  news: (id: string, page: number, pageSize: number) =>
    fetchJson<{ data: NewsCard[]; pagination: Pagination }>(
      `${API_BASE}/companies/${id}/news?page=${page}&pageSize=${pageSize}`
    ),
  
  latestNews: (limit: number, industry?: string) =>
    fetchJson<NewsCard[]>(
      `${API_BASE}/news/latest?limit=${limit}${industry ? `&industry=${industry}` : ''}`
    ),
  
  trendingNews: (variant: string, limit: number) =>
    fetchJson<NewsCard[]>(
      `${API_BASE}/news/trending?variant=${variant}&limit=${limit}`
    ),
  
  sectors: () => fetchJson<Sector[]>(`${API_BASE}/sectors`),
  
  sectorCompanies: (sectorId: string, params: URLSearchParams) =>
    fetchJson<{ data: CompanyCard[]; pagination: Pagination }>(
      `${API_BASE}/sectors/${sectorId}/companies?${params.toString()}`
    ),
  
  countries: () => fetchJson<Country[]>(`${API_BASE}/countries`),
  
  filterMeta: () => fetchJson<FilterMeta>(`${API_BASE}/filters/meta`),
  
  follow: (id: string) =>
    fetch(`${API_BASE}/companies/${id}/follow`, { method: 'POST', credentials: 'include' })
      .then(r => r.json()),
  
  bookmark: (id: string) =>
    fetch(`${API_BASE}/news/${id}/bookmark`, { method: 'POST', credentials: 'include' })
      .then(r => r.json()),
  
  userTier: () =>
    fetchJson<{ tier: 'registered' | 'verified' | 'top' | 'none'; companyId: string | null }>(
      `${API_BASE}/user/tier`
    ),
};
```

---

## 5. UX Specification (Screen States, Breakpoints, Accessibility)

### 5.1 Responsive Breakpoints

| Breakpoint | Width | Hero | Featured | Directory | News Cards | Industry Cards |
|------------|-------|------|----------|-----------|------------|----------------|
| Mobile | < 640px | Stacked search, single CTA column | 1-col carousel, swipe | List view only, bottom-sheet filters | 1-col, truncated summary (2 lines) | 2-col grid |
| Tablet | 640–1023px | 2-col (search + filters), 2 CTA rows | 2-col grid | Grid 2-col, collapsible sidebar | 2-col carousel | 3-col grid |
| Desktop | 1024–1439px | Full inline, 3 CTAs inline | 4-col grid | Grid 3-col, sticky sidebar | 3-col carousel | 4-col grid |
| Wide | ≥ 1440px | Max-width 1400px centered | 5-col grid | Grid 4-col, sticky sidebar | 4-col carousel | 5-col grid |

### 5.2 Component State Matrix (Every Section)

| Section | Loading | Empty | Error | Partial | Success |
|---------|---------|-------|-------|---------|---------|
| Hero Banner | Skeleton (shimmer) | N/A (static) | Toast + retry | N/A | Full interactive |
| Featured Companies | 4-6 card skeletons | "No featured companies yet" | Inline error + retry | Show cached | Full grid |
| Latest News | 6 card skeletons | "No recent news" | Inline error | Show cached | Full list |
| Trending News | 4 card skeletons | "Trending data unavailable" | Inline error | Show cached | Carousel |
| Company Directory | Table/grid skeletons | "No companies match filters" + clear filters | Toast + retry | Progressive load | Full paginated grid |
| Browse Industry | Card skeletons | "No sectors configured" | Inline error | Show cached | Full grid |
| Trending Companies | Row skeletons | "No trending data" | Inline error | Show cached | Ranked list |
| Company Spotlight | Full skeleton | Fallback to 2nd company | Inline error | Show cached | Full spotlight |
| Upgrade Banner | N/A | N/A | N/A | N/A | Tier-aware CTAs |
| Newsletter | N/A | N/A | Inline validation | Submitting state | Success toast |

### 5.3 Accessibility Checklist (WCAG 2.1 AA)

- [ ] **Skip link** to main content (first focusable element)
- [ ] **Heading hierarchy**: h1 (Hero) → h2 (Sections) → h3 (Cards) → h4 (Card details)
- [ ] **Focus visible** on all interactive elements (3px outline, offset 2px, brand color)
- [ ] **ARIA labels** on icon-only buttons: Share, Bookmark, Follow, Filter chips
- [ ] **Live region** for search results count ("12 companies found")
- [ ] **Carousel**: Pause on hover/focus, keyboard nav (Prev/Next), aria-roledescription="slide"
- [ ] **Color contrast**: Badges 4.5:1, tier colors 3:1 (large text), focus 3:1
- [ ] **Reduced motion**: `prefers-reduced-motion` disables auto-rotate, parallax
- [ ] **Keyboard navigation**: Tab order logical, Escape closes modals/dropdowns, Enter activates
- [ ] **Screen reader**: Filter chips announce "selected" state, pagination "page 2 of 5"
- [ ] **Form labels**: All inputs have associated `<label>`, error messages via `aria-describedby`

### 5.4 User Flows (Critical Paths)

#### Flow 1: Visitor → Company Discovery → Profile View
```
1. Lands on /company-news (Hero)
2. Types "steel" in search → URL updates to ?q=steel
3. Clicks "Steel & Metallurgy" filter chip → URL ?q=steel&sector=steel-metallurgy
4. Sees filtered directory (paginated, 24/page)
5. Clicks "Tata Steel" card → Navigates to /company-news/top/pages/uuid (detail)
6. Detail page shows: Overview, Products, Leadership, Gallery (tier-gated)
7. Clicks "Follow" → POST /api/companies/{id}/follow → badge updates
8. Clicks "Contact" → Opens lead form (tier-gated fields)
```

#### Flow 2: Verified Company User → Publish News
```
1. User with verified tier logs in
2. Navigates to /company-news/verified/news
3. Sees "Publish News" CTA (only for verified+)
4. Fills form: Title, Summary, Category, Thumbnail, Content
5. Submits → POST /api/news → Returns news ID
6. Redirects to news detail page
7. News appears in Latest News + Company's news feed
```

#### Flow 3: Filter State Sharing
```
1. User applies: q=renewable, sector=renewable-energy, country=IN,AE, sort=most_followed
2. URL: /company-news?verified&sector=renewable-energy&country=IN,AE&sort=most_followed
3. Copies URL → Shares with colleague
4. Colleague opens → Same filtered view loads instantly (no auth required for public data)
```

---

## 6. Tier-Gating Rules (Implementation)

### 6.1 UI Visibility by Tier

| Element | Free/Anonymous | Registered | Verified (Pro) | Enterprise (Top) |
|---------|---------------|------------|----------------|------------------|
| Hero Search/Filter | ✅ | ✅ | ✅ | ✅ |
| Register Company CTA | ✅ | ✅ | ✅ | ❌ (shows "Manage") |
| Verify Company CTA | ✅ | ✅ | ❌ | ❌ |
| Upgrade to Enterprise CTA | ✅ | ✅ | ✅ | ❌ |
| Featured Companies | Top 8 (all tiers) | Top 8 | Top 8 | Top 8 |
| Company Directory | All tiers | All tiers | All tiers | All tiers |
| Company Profiles (Basic) | ✅ | ✅ | ✅ | ✅ |
| Company Analytics | ❌ | ❌ | ✅ Basic | ✅ Advanced |
| Gallery | ❌ | ❌ | ✅ Full | ✅ Premium |
| Press Kit | ❌ | ❌ | ✅ Basic | ✅ Advanced |
| Lead Form (Basic) | ✅ | ✅ | ✅ | ✅ |
| Lead Form (Advanced) | ❌ | ❌ | ✅ | ✅ |
| CRM Integration | ❌ | ❌ | ❌ | ✅ |
| Publish News (monthly) | 5/mo | 5/mo | Unlimited | Unlimited + Sponsored |
| Featured Placement | ❌ | ❌ | 2 slots | 10 slots (homepage) |
| Search Rank Boost | 1.0x | 1.0x | 1.5x | 2.0x |

### 6.2 Tier Detection (Client + Server)

```typescript
// lib/auth/tier.ts
import { CompanyTier } from '@/types/company';

export async function getUserTier(): Promise<{ tier: CompanyTier | 'none'; companyId: string | null }> {
  // Server-side: read from JWT/session
  // Client-side: call /api/user/tier
  const res = await fetch('/api/user/tier', { credentials: 'include' });
  if (!res.ok) return { tier: 'none', companyId: null };
  return res.json();
}

export function getTierFromCompany(companyTier: CompanyTier): CompanyTier {
  return companyTier; // Direct mapping
}

export function canAccessFeature(userTier: CompanyTier | 'none', requiredTier: CompanyTier): boolean {
  const tierOrder: Record<CompanyTier | 'none', number> = {
    none: 0,
    registered: 1,
    verified: 2,
    top: 3,
  };
  return tierOrder[userTier] >= tierOrder[requiredTier];
}
```

---

## 7. Mock Data Factory (Demo-Ready, Seeded)

```typescript
// lib/mock/factory.ts
import { faker } from '@faker-js/faker';
import { CompanyCard, CompanyDetail, NewsCard, Sector, Country, FilterMeta, CompanyTier } from '@/types/company';

// ─────────────────────────────────────────────────────────────────────────────
// SEEDED RNG FOR CONSISTENT DEMO DATA
// ─────────────────────────────────────────────────────────────────────────────
const SEED = 42;
let seed = SEED;
function seededRandom(): number {
  seed = (seed * 1664525 + 1013904223) % 4294967296;
  return seed / 4294967296;
}
function seededChoice<T>(arr: T[]): T {
  return arr[Math.floor(seededRandom() * arr.length)];
}

// ─────────────────────────────────────────────────────────────────────────────
// TAXONOMY (Fixed for demo)
// ─────────────────────────────────────────────────────────────────────────────
const SECTORS_DATA = [
  { id: 'steel-metallurgy', name: 'Steel & Metallurgy', icon: '⚙️', growth: '+12%', top: 'Tata Steel' },
  { id: 'automotive-ev', name: 'Automotive & EV', icon: '🚗', growth: '+28%', top: 'Mahindra Electric' },
  { id: 'pharmaceuticals', name: 'Pharmaceuticals', icon: '💊', growth: '+8%', top: 'Cipla Ltd.' },
  { id: 'renewable-energy', name: 'Renewable Energy', icon: '⚡', growth: '+42%', top: 'Adani Green' },
  { id: 'logistics', name: 'Logistics & Supply Chain', icon: '🚢', growth: '+19%', top: 'Mahindra Logistics' },
  { id: 'it-technology', name: 'IT & Technology', icon: '💻', growth: '+35%', top: 'Infosys BPM' },
  { id: 'agriculture', name: 'Agriculture & Food Processing', icon: '🌾', growth: '+7%', top: 'ITC Agri' },
  { id: 'chemicals', name: 'Chemicals', icon: '🧪', growth: '+11%', top: 'Deepak Nitrite' },
  { id: 'textiles', name: 'Textiles', icon: '🧵', growth: '+5%', top: 'Welspun India' },
  { id: 'defence-aerospace', name: 'Defence & Aerospace', icon: '✈️', growth: '+22%', top: 'HAL India' },
  { id: 'fmcg', name: 'FMCG', icon: '🛒', growth: '+14%', top: 'HUL India' },
  { id: 'healthcare', name: 'Healthcare', icon: '🏥', growth: '+16%', top: 'Apollo Hospitals' },
  // ... 38 more to reach 50
];

const COUNTRIES_DATA = [
  { code: 'IN', name: 'India', flag: '🇮🇳' },
  { code: 'US', name: 'United States', flag: '🇺🇸' },
  { code: 'CN', name: 'China', flag: '🇨🇳' },
  { code: 'AE', name: 'UAE', flag: '🇦🇪' },
  { code: 'SG', name: 'Singapore', flag: '🇸🇬' },
  { code: 'DE', name: 'Germany', flag: '🇩🇪' },
  { code: 'JP', name: 'Japan', flag: '🇯🇵' },
  { code: 'GB', name: 'United Kingdom', flag: '🇬🇧' },
  // ... 187 more
];

const TIER_DISTRIBUTION: Record<CompanyTier, number> = {
  registered: 12000,
  verified: 3200,
  top: 420,
};

// ─────────────────────────────────────────────────────────────────────────────
// COMPANY GENERATORS
// ─────────────────────────────────────────────────────────────────────────────
const COMPANY_NAMES = [
  'Tata Steel Ltd.', 'Mahindra Logistics', 'Adani Green Energy', 'Cipla Pharmaceuticals',
  'Reliance Industries', 'Infosys BPM', 'Sunrise Agro Exports', 'NexusTech Logistics',
  'Bharat Forge', 'Larsen & Toubro', 'Mahindra & Mahindra', 'Bajaj Auto',
  'Sun Pharma', 'Dr Reddy\'s Laboratories', 'Glenmark Pharma', 'Torrent Pharma',
  'Adani Ports', 'JSW Steel', 'Hindalco Industries', 'Vedanta Ltd.',
  // ... 200+ more names
];

function generateCompanyCard(override: Partial<CompanyCard> = {}): CompanyCard {
  const tier = override.tier || (seededRandom() < 0.78 ? 'registered' : seededRandom() < 0.97 ? 'verified' : 'top');
  const sector = seededChoice(SECTORS_DATA);
  const country = seededChoice(COUNTRIES_DATA);
  const name = override.name || seededChoice(COMPANY_NAMES);
  const initials = name.match(/\b\w/g)?.slice(0, 2).join('').toUpperCase() || 'CO';
  
  return {
    id: override.id || crypto.randomUUID(),
    name,
    logoUrl: null, // Use initials fallback
    logoInitials: initials,
    tagline: override.tagline || faker.company.catchPhrase(),
    industry: sector.name,
    industryId: sector.id,
    location: `${faker.location.city()}, ${faker.location.state()}`,
    countryCode: country.code,
    tier,
    followerCount: Math.floor(seededRandom() * 50000),
    isFollowing: false,
    verificationDate: tier !== 'registered' ? faker.date.recent({ years: 3 }).toISOString() : null,
    profileCompletion: tier === 'top' ? 100 : tier === 'verified' ? 85 + Math.floor(seededRandom() * 15) : 60 + Math.floor(seededRandom() * 25),
    viewCount30d: Math.floor(seededRandom() * 10000),
    newsCount30d: tier === 'top' ? 15 + Math.floor(seededRandom() * 20) : tier === 'verified' ? 5 + Math.floor(seededRandom() * 10) : Math.floor(seededRandom() * 5),
  };
}

function generateCompanyDetail(card: CompanyCard): CompanyDetail {
  const tier = card.tier;
  const isTop = tier === 'top';
  const isVerified = tier === 'verified' || isTop;
  
  return {
    ...card,
    about: faker.lorem.paragraphs(3),
    mission: faker.company.buzzPhrase(),
    vision: faker.company.buzzPhrase(),
    foundedYear: 1990 + Math.floor(seededRandom() * 35),
    employees: isTop ? `${(1000 + Math.floor(seededRandom() * 5000)).toLocaleString()}+` : `${(50 + Math.floor(seededRandom() * 5000)).toLocaleString()}+`,
    revenue: isTop ? `$${(1 + Math.floor(seededRandom() * 50))}B+` : `₹${(10 + Math.floor(seededRandom() * 5000))} Cr`,
    website: faker.internet.url(),
    phone: faker.phone.number(),
    email: faker.internet.email(),
    products: Array.from({ length: 4 + Math.floor(seededRandom() * 6) }, () => faker.commerce.productName()),
    leadership: Array.from({ length: 2 + Math.floor(seededRandom() * 4) }, () => ({
      name: faker.person.fullName(),
      role: seededChoice(['CEO', 'CTO', 'CFO', 'COO', 'VP Sales', 'VP Operations', 'Managing Director', 'Chairman']),
      initials: faker.person.fullName().match(/\b\w/g)?.slice(0, 2).join('').toUpperCase() || 'XX',
    })),
    galleryImages: isVerified ? Array.from({ length: 3 + Math.floor(seededRandom() * 4) }, () => 
      `https://picsum.photos/seed/${crypto.randomUUID()}/800/600`
    ) : [],
    analytics: isVerified ? {
      profileViews: Math.floor(seededRandom() * 50000),
      newsViews: Math.floor(seededRandom() * 100000),
      leadCount: Math.floor(seededRandom() * 500),
      topCountries: ['IN', 'US', 'AE', 'SG', 'DE'].slice(0, 3 + Math.floor(seededRandom() * 2)),
      topReferrers: ['Google', 'Direct', 'LinkedIn', 'Referral', 'Email'].slice(0, 3),
    } : null,
    crmIntegration: isTop,
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// NEWS GENERATORS
// ─────────────────────────────────────────────────────────────────────────────
const NEWS_CATEGORIES = ['Product Launch', 'Deal Announcement', 'Financial Update', 'Milestone', 'Partnership', 'Investment', 'ESG', 'Announcement'] as const;

function generateNewsCard(company: CompanyCard, override: Partial<NewsCard> = {}): NewsCard {
  const category = seededChoice(NEWS_CATEGORIES);
  const daysAgo = Math.floor(seededRandom() * 30);
  const publishedAt = new Date(Date.now() - daysAgo * 86400000).toISOString();
  
  return {
    id: crypto.randomUUID(),
    title: override.title || generateNewsTitle(company.name, category),
    summary: faker.lorem.sentences(2),
    thumbnailUrl: seededRandom() < 0.6 ? `https://picsum.photos/seed/${crypto.randomUUID()}/400/250` : null,
    company: {
      id: company.id,
      name: company.name,
      logoUrl: company.logoUrl,
      tier: company.tier,
    },
    industry: company.industry,
    publishedAt,
    readingTimeMinutes: 2 + Math.floor(seededRandom() * 6),
    viewCount: Math.floor(seededRandom() * 50000) * (company.tier === 'top' ? 10 : company.tier === 'verified' ? 3 : 1),
    shareCount: Math.floor(seededRandom() * 1000),
    commentCount: Math.floor(seededRandom() * 200),
    isBookmarked: false,
    isSponsored: company.tier === 'top' && seededRandom() < 0.15,
    category,
    trendingVariant: null,
  };
}

function generateNewsTitle(companyName: string, category: string): string {
  const templates: Record<string, string[]> = {
    'Product Launch': [
      `${companyName} Launches Next-Gen ${faker.commerce.product()} for Global Markets`,
      `New ${faker.commerce.product()} Line from ${companyName} Targets ${seededChoice(['APAC', 'EMEA', 'North America', 'Global'])}`,
    ],
    'Deal Announcement': [
      `${companyName} Signs ${seededChoice(['Multi-Year', 'Strategic', 'Landmark'])} Deal with ${seededChoice(['Maruti Suzuki', 'Volkswagen', 'Siemens', 'TotalEnergies', 'BPCL'])}`,
      `${seededChoice(['$500M', '$1.2B', '₹2,000 Cr', '€800M'])} Contract Secured by ${companyName}`,
    ],
    'Financial Update': [
      `${companyName} Reports ${seededChoice(['15%', '28%', '42%', '35%'])} YoY Revenue Growth in Q${seededChoice(['1', '2', '3', '4'])}`,
      `Strong Quarterly Performance: ${companyName} Beats Analyst Estimates`,
    ],
    'Milestone': [
      `${companyName} Achieves ${seededChoice(['20 GW', '50 GW', '1M Units', '100 Countries'])} Milestone`,
      `${seededChoice(['World Record', 'Industry First', 'Historic'])}: ${companyName} Reaches New Heights`,
    ],
    'Partnership': [
      `${companyName} Partners with ${seededChoice(['Google', 'Microsoft', 'Amazon', 'Tesla', 'Toyota'])} for ${seededChoice(['AI Integration', 'Clean Energy', 'Digital Transformation', 'Supply Chain'])}`,
      `Joint Venture Announced: ${companyName} + ${seededChoice(['TotalEnergies', 'BP', 'Shell', 'Equinor'])}`,
    ],
    'Investment': [
      `${companyName} Announces ${seededChoice(['₹45,000 Cr', '$5B', '€3B', '¥500B'])} Greenfield Investment`,
      `Board Approves Major Capacity Expansion for ${companyName}`,
    ],
    'ESG': [
      `${companyName} Ranked Among Top 10 ESG Performers in ${seededChoice(['Asia', 'Global', 'Emerging Markets'])}`,
      `Sustainability Milestone: ${companyName} Achieves ${seededChoice(['Net Zero', 'Carbon Neutral', 'Water Positive'])} Status`,
    ],
    'Announcement': [
      `${companyName} Appoints New ${seededChoice(['CEO', 'CFO', 'CTO', 'COO'])} to Drive Next Phase`,
      `${companyName} Expands Operations to ${seededChoice(['Vietnam', 'Indonesia', 'Mexico', 'Poland', 'Saudi Arabia'])}`,
    ],
  };
  return seededChoice(templates[category] || templates['Announcement']);
}

// ─────────────────────────────────────────────────────────────────────────────
// PUBLIC API
// ─────────────────────────────────────────────────────────────────────────────
export const mockData = {
  // Generate N companies with tier distribution
  companies: (count: number = 500): CompanyCard[] => {
    const companies: CompanyCard[] = [];
    // Ensure tier distribution
    Object.entries(TIER_DISTRIBUTION).forEach(([tier, targetCount]) => {
      const actualCount = Math.round((targetCount / (12000 + 3200 + 420)) * count);
      for (let i = 0; i < actualCount; i++) {
        companies.push(generateCompanyCard({ tier: tier as CompanyTier }));
      }
    });
    return companies;
  },

  // Get company by ID (deterministic)
  companyById: (id: string): CompanyDetail => {
    // In real implementation, look up from generated list
    const card = generateCompanyCard({ id });
    return generateCompanyDetail(card);
  },

  // Featured companies (top-tier weighted)
  featured: (limit: number = 8, tiers: CompanyTier[] = ['verified', 'top']): CompanyCard[] => {
    return Array.from({ length: limit }, () => {
      const tier = seededChoice(tiers);
      return generateCompanyCard({ tier });
    });
  },

  // Latest news
  latestNews: (limit: number = 10): NewsCard[] => {
    const companies = mockData.companies(200);
    return Array.from({ length: limit }, () => {
      const company = seededChoice(companies);
      return generateNewsCard(company);
    });
  },

  // Trending news
  trendingNews: (variant: string, limit: number = 10): NewsCard[] => {
    const companies = mockData.companies(100).filter(c => c.tier === 'top' || c.tier === 'verified');
    return Array.from({ length: limit }, () => {
      const company = seededChoice(companies);
      const news = generateNewsCard(company);
      return { ...news, trendingVariant: variant as NewsCard['trendingVariant'] };
    });
  },

  // Sectors
  sectors: (): Sector[] => SECTORS_DATA.map(s => ({
    id: s.id,
    name: s.name,
    companyCount: Math.floor(100 + seededRandom() * 300),
    growthRate: s.growth,
    topCompany: s.top,
    icon: s.icon,
    isTrending: seededRandom() < 0.3,
    description: faker.lorem.sentence(),
    parentSectorId: null,
  })),

  // Countries
  countries: (): Country[] => COUNTRIES_DATA.map(c => ({
    code: c.code,
    name: c.name,
    companyCount: Math.floor(50 + seededRandom() * 500),
    flagEmoji: c.flag,
    isBilateral: true,
  })),

  // Filter meta
  filterMeta: (): FilterMeta => ({
    industries: mockData.sectors().map(s => ({ id: s.id, name: s.name, companyCount: s.companyCount })),
    countries: mockData.countries().map(c => ({ code: c.code, name: c.name, companyCount: c.companyCount })),
    tiers: [
      { value: 'registered', label: 'Registered (Free)', companyCount: TIER_DISTRIBUTION.registered },
      { value: 'verified', label: 'Verified (Pro)', companyCount: TIER_DISTRIBUTION.verified },
      { value: 'top', label: 'Enterprise (Top)', companyCount: TIER_DISTRIBUTION.top },
    ],
  }),
};
```

---

## 8. Demo-Specific Enhancements (Antigravity)

These features differentiate the demo and require minimal effort:

| Feature | Implementation | Effort | Demo Impact |
|---------|----------------|--------|-------------|
| **Command Palette** (Cmd+K) | `cmdk` + search API | 3h | Power-user feel |
| **URL State Persistence** | Already in `useCompanyFilters` | 0h | Shareable filtered views |
| **Dark Mode Toggle** | `next-themes` + CSS vars | 1h | Visual variety |
| **Simulated Real-Time** | `setInterval` + optimistic UI | 1h | "Live" trending counters |
| **Keyboard Navigation** | Focus management, roving tabindex | 2h | Accessibility + polish |
| **Demo Mode Banner** | Fixed banner "Sample Data • Demo" | 30min | Honest framing |
| **Sector Availability Checker** | Mock "1 Platinum slot left in Pharma" | 1h | FOMO trigger |
| **ROI Calculator Widget** | Interactive slider component | 2h | Converts cold visitors |

### 8.1 Command Palette Implementation

```tsx
// components/ui/CommandPalette.tsx
'use client';
import { Command, CommandInput, CommandList, CommandItem, CommandGroup } from 'cmdk';
import { useCompanySearch } from '@/hooks/useCompanySearch';
import { Building2, Search, Filter } from 'lucide-react';

export function CommandPalette() {
  const { data: companies, isLoading } = useCompanySearch({ limit: 20 });
  
  return (
    <Command>
      <CommandInput placeholder="Search companies, sectors, news... (⌘K)" />
      <CommandList>
        <CommandGroup heading="Companies">
          {companies?.map(c => (
            <CommandItem key={c.id} onSelect={() => window.location.href = `/company-news/${c.tier}/pages/${c.id}`}>
              <Building2 className="h-4 w-4 mr-2" />
              <span>{c.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">{c.industry}</span>
            </CommandItem>
          ))}
        </CommandGroup>
        <CommandGroup heading="Actions">
          <CommandItem onSelect={() => document.getElementById('hero-search')?.focus()}>
            <Search className="h-4 w-4 mr-2" /> Focus Hero Search
          </CommandItem>
          <CommandItem onSelect={() => document.getElementById('filter-panel')?.scrollIntoView()}>
            <Filter className="h-4 w-4 mr-2" /> Open Filters
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
```

---

## 9. Acceptance Criteria (Definition of Done)

### 9.1 Hero Banner
- [ ] Search debounced at 300ms, updates URL
- [ ] Industry/Country filter chips from `/api/filters/meta`
- [ ] Three CTAs: Register (Free), Verify (Pro), Upgrade (Enterprise) — all route to `/eoi`
- [ ] Stats strip: Registered, Verified, Enterprise counts from API
- [ ] Responsive: Mobile stacks, Desktop inline
- [ ] Accessible: Labels, focus order, ARIA live for results count

### 9.2 Featured Companies
- [ ] Loads 8 companies from `/api/companies/featured?tier=verified,top`
- [ ] Tier filter tabs (All/Enterprise/Verified/Registered) update URL
- [ ] Card shows: Logo/initials, tier badge, name, sector, location, desc, mini-stats (employees, revenue, followers)
- [ ] View Profile → detail page; Follow → optimistic UI + API call
- [ ] Skeleton loading, empty state, error retry

### 9.3 Latest Company News
- [ ] Loads 6-10 cards from `/api/news/latest`
- [ ] Card: Thumbnail, company logo+badge, headline, summary, industry, time, reading time, view/share counts
- [ ] "View All" → `/news-poc/company-news/all` (or similar)
- [ ] Bookmark button (auth-gated)

### 9.4 Trending Company News
- [ ] Carousel with 3 variants: Most Viewed, Most Shared, Editor's Pick
- [ ] Auto-rotate 5s, pause on hover/focus
- [ ] Keyboard nav (Prev/Next)
- [ ] Trending badge on cards

### 9.5 Company Directory
- [ ] Grid/List view toggle (persisted in localStorage)
- [ ] URL-synced filters: search, sector (multi), country (multi), tier (multi), sort
- [ ] Faceted counts update on filter change
- [ ] Pagination: page, pageSize (24 default), total pages
- [ ] Sticky filter sidebar on desktop, bottom sheet on mobile
- [ ] Infinite scroll option (toggle)
- [ ] Server-side sorting for verified_first, most_followed

### 9.6 Browse by Industry
- [ ] 50 sector cards from `/api/sectors`
- [ ] Card: icon, name, company count, growth badge, top company
- [ ] Click → `/company-news/{tier}/sector?sector={id}`
- [ ] Trending indicator (pulse animation)

### 9.7 Trending Companies
- [ ] Ranked list: #1-10 with rank badge
- [ ] Columns: Rank, Name, Sector, Views, Change %
- [ ] "View Full Rankings" → directory with sort=most_viewed

### 9.8 Company Spotlight
- [ ] Single enterprise company (CMS-driven or top-ranked)
- [ ] Large banner + stats grid (Revenue, Employees, Countries, Sectors)
- [ ] CTAs: View Profile, Contact Company (lead form)

### 9.9 Upgrade Banner
- [ ] Shows current user tier (from `/api/user/tier`)
- [ ] Comparison: Current vs Next tier benefits
- [ ] CTA → `/eoi` with tier pre-selected
- [ ] Hidden for Enterprise users

### 9.10 Newsletter Signup
- [ ] Email + honeypot field
- [ ] POST `/api/newsletter/subscribe`
- [ ] Success toast, error handling
- [ ] No duplicate submissions

---

## 10. Performance Budget

| Metric | Target | Strategy |
|--------|--------|----------|
| **Hero Paint (FCP)** | < 1.2s | Static generation + edge caching |
| **TTI (Time to Interactive)** | < 3.5s | Critical CSS, defer non-hero JS |
| **Directory First Paint** | < 2s | Streaming SSR + Suspense boundaries |
| **Trending Carousels** | < 500ms | Client hydrate after hero |
| **Total JS (gz)** | < 170kb | Code-split by section, dynamic imports |
| **API Latency (p95)** | < 300ms | Edge caching, Redis, read replicas |
| **CLS** | < 0.1 | Explicit dimensions, font-display: swap |

---

## 11. SEO & Analytics

### 11.1 Meta Tags (Per Page)

| Page | Title Template | Description |
|------|---------------|-------------|
| `/company-news` | "Company News & Verified Business Pages \| India Global News" | "Discover 16,000+ verified companies across 50 sectors. Search, follow, and connect with trusted Indian businesses." |
| `/company-news/{tier}/pages` | "{Tier} Company Pages \| {Sector} \| India Global News" | "Browse {tier} company profiles in {sector}. Verified businesses with contact details, products, and leadership." |
| `/company-news/{tier}/pages/{id}` | "{Company Name} \| {Tier} Company Page \| India Global News" | Company tagline + first 155 chars of about |
| `/company-news/{tier}/news` | "Latest {Tier} Company News \| {Sector} \| India Global News" | "Real-time business updates from {tier} companies in {sector}." |

### 11.2 Structured Data (JSON-LD)

```json
// Company Page
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Tata Steel Ltd.",
  "url": "https://indiaglobalnews.com/topcompany/tata-steel",
  "logo": "https://cdn.igenworld.com/logos/tata-steel.png",
  "sameAs": ["https://linkedin.com/company/tata-steel"],
  "address": { "@type": "PostalAddress", "addressCountry": "IN" },
  "knowsAbout": ["Steel Manufacturing", "Metallurgy"],
  "numberOfEmployees": { "@type": "QuantitativeValue", "value": 65000 }
}

// Article (News)
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Tata Steel Signs 5-Year Green Steel Supply Agreement with Volkswagen",
  "datePublished": "2026-08-03T10:30:00+05:30",
  "author": { "@type": "Organization", "name": "Tata Steel Ltd." },
  "publisher": { "@type": "Organization", "name": "India Global News", "logo": { "@type": "ImageObject", "url": "https://cdn.igenworld.com/logo.png" } },
  "mainEntityOfPage": "https://indiaglobalnews.com/news/steel-metallurgy/tata-steel-green-steel-volkswagen-abc123"
}
```

### 11.3 Analytics Events (Data Layer)

```typescript
// lib/analytics/events.ts
export const ANALYTICS_EVENTS = {
  hero_search_submitted: { query: 'string', filters: 'object' },
  hero_cta_click: { cta: 'register' | 'verify' | 'upgrade' },
  company_card_click: { companyId: 'string', source: 'featured' | 'directory' | 'trending' | 'spotlight' },
  company_follow: { companyId: 'string', tier: 'registered' | 'verified' | 'top' },
  company_profile_view: { companyId: 'string', tab: 'overview' | 'products' | 'leadership' | 'gallery' },
  lead_form_submit: { companyId: 'string', tier: 'string', formType: 'basic' | 'advanced' },
  news_read_more: { articleId: 'string', source: 'latest' | 'trending' | 'company' },
  news_bookmark: { articleId: 'string', action: 'add' | 'remove' },
  newsletter_subscribe: { email: 'string', source: 'footer' | 'banner' },
  upgrade_banner_click: { fromTier: 'string', toTier: 'string' },
  industry_card_click: { industryId: 'string' },
  filter_applied: { filterType: 'sector' | 'country' | 'tier' | 'sort', value: 'string' },
  filter_cleared: { filterType: 'string' },
  pagination_change: { page: 'number', pageSize: 'number' },
  view_toggle: { view: 'grid' | 'list' },
  command_palette_open: { trigger: 'keyboard' | 'button' },
  command_palette_select: { type: 'company' | 'action', id: 'string' },
} as const;
```

---

## 12. File Structure (Implementation)

```
src/
├── app/
│   └── [locale]/
│       └── (main)/
│           └── company-news/
│               ├── page.tsx                    # Main page (CompanyMegaMenuPage)
│               ├── layout.tsx                  # Section layout
│               ├── loading.tsx                 # Route-level loading
│               ├── error.tsx                   # Route-level error
│               ├── [tier]/
│               │   ├── pages/
│               │   │   ├── page.tsx            # Directory (filtered by tier)
│               │   │   └── [id]/
│               │   │       └── page.tsx        # Company detail
│               │   ├── news/
│               │   │   ├── page.tsx            # News feed (filtered by tier)
│               │   │   └── [id]/
│               │   │       └── page.tsx        # News detail
│               │   ├── sector/
│               │   │   └── page.tsx            # Sector-filtered view
│               │   └── all/
│               │       └── page.tsx            # Full repository
├── components/
│   └── company-pages/
│       ├── CompanyMegaMenuPage.tsx             # Page composition
│       ├── CompanyHeroBanner.tsx
│       ├── FeaturedCompanies.tsx
│       ├── LatestCompanyNews.tsx
│       ├── TrendingCompanyNews.tsx
│       ├── CompanyDirectory.tsx
│       ├── BrowseByIndustry.tsx
│       ├── TrendingCompanies.tsx
│       ├── CompanySpotlight.tsx
│       ├── UpgradeBanner.tsx
│       ├── NewsletterSignup.tsx
│       ├── skeletons/
│       │   ├── HeroSkeleton.tsx
│       │   ├── CompanyCardSkeleton.tsx
│       │   ├── NewsCardSkeleton.tsx
│       │   ├── DirectorySkeleton.tsx
│       │   └── IndustryCardSkeleton.tsx
│       └── ui/
│           ├── CompanyCard.tsx
│           ├── CompanyCardDetail.tsx
│           ├── NewsCard.tsx
│           ├── IndustryCard.tsx
│           ├── FilterChips.tsx
│           ├── FilterSidebar.tsx
│           ├── Pagination.tsx
│           ├── SortSelect.tsx
│           ├── ViewToggle.tsx
│           ├── TierBadge.tsx
│           ├── FollowButton.tsx
│           ├── BookmarkButton.tsx
│           ├── LeadForm.tsx
│           └── CommandPalette.tsx
├── hooks/
│   ├── useCompanyFilters.ts
│   ├── useCompanySearch.ts
│   ├── useCompanyDetail.ts
│   ├── useCompanyNews.ts
│   ├── useTrendingNews.ts
│   ├── useSectors.ts
│   ├── useCountries.ts
│   ├── useFilterMeta.ts
│   ├── useFollowCompany.ts
│   ├── useBookmarkNews.ts
│   └── useUserTier.ts
├── lib/
│   ├── api/
│   │   └── company.ts
│   ├── auth/
│   │   └── tier.ts
│   ├── analytics/
│   │   └── events.ts
│   ├── mock/
│   │   └── factory.ts
│   └── utils/
│       ├── url.ts
│       └── format.ts
├── types/
│   └── company.ts
├── styles/
│   └── company-pages.css          # Component-specific CSS vars
└── middleware.ts                   # Auth, locale, tier detection
```

---

## 13. Migration Checklist (From POC to Implementation)

| POC Component | New Implementation | Status |
|---------------|-------------------|--------|
| `NewsPOCCompanyNewsHome` | `CompanyHeroBanner` + `FeaturedCompanies` + `CompanyDirectory` + `BrowseByIndustry` + `TrendingCompanies` + `CompanySpotlight` | 🔄 Split |
| `NewsPOCCompanyNewsSubmenu` | `CompanyDirectory` (tier-filtered) + `CompanyDetail` page | 🔄 Split |
| `newsPOCData.ts` types | `types/company.ts` (Zod + pure functions) | ✅ Done |
| `NewsPOCMegaMenu` | Header mega menu (separate PRD) | ⏭️ Separate |
| Hardcoded mock data | `lib/mock/factory.ts` (seeded, typed) | ✅ Done |
| Inline tier config | `TIER_LIMITS` + pure gating functions | ✅ Done |
| No URL state | `useCompanyFilters` (URL-synced) | ✅ Designed |
| No loading/empty/error | State matrix + skeletons | ✅ Specified |
| No analytics | `ANALYTICS_EVENTS` + data layer | ✅ Specified |
| No SEO meta | Per-page templates + JSON-LD | ✅ Specified |
| No accessibility | WCAG 2.1 AA checklist | ✅ Specified |

---

## 14. Risks & Mitigations

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| API not ready for demo | High | High | Mock factory complete; swap `lib/api/company.ts` to mock mode via env flag |
| Tier gating logic bugs | Medium | High | Pure functions + unit tests; integration test matrix |
| Filter URL sync breaks navigation | Medium | Medium | Cypress tests for back/forward, deep links |
| Performance on 100k+ companies | Low | High | Pagination + cursor; virtualized list; search debounce |
| SEO canonical issues | Medium | Medium | Self-canonical on every page; `robots.txt` for paginated pages |
| Accessibility regressions | Medium | High | axe-core in CI; manual keyboard audit per release |

---