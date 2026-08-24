# IGEN-Brain · Knowledge Library

> **IGEN World Ecosystem** — Structured intelligence library for India Global Expo (50 sectors, 1,350+ industries) and India Global News (10 modules, 195 countries).

---

## Directory Structure

```
IGEN-Brain/
├── objects/
│   └── Module/
│       └── IGN_modules.json        ← India Global News: all 10 modules + submenus
│
├── books/
│   ├── PRD/                        ← Product Requirements Documents
│   │   ├── IGN-001_India_Global_News_Master_PRD.md   ← Master PRD (iGEN News)
│   │   ├── IGN-M01_Feed_PRD.md
│   │   ├── IGN-M02_Headlines_PRD.md
│   │   ├── IGN-M03_Sector_News_PRD.md
│   │   ├── IGN-M04_Company_Pages_PRD.md
│   │   ├── IGN-M05_Country_News_PRD.md
│   │   ├── IGN-M06_Leader_News_PRD.md
│   │   ├── IGN-M07_Expert_News_PRD.md
│   │   ├── IGN-M08_Communities_PRD.md
│   │   ├── IGN-M09_Trending_PRD.md
│   │   └── IGN-M10_My_News_PRD.md
│   └── UX/                         ← UX Design Specs & Mockups
│       └── pages/                  ← UI mockups (.png) and source documents (.docx)
│
└── README.md                       ← Library guide
```

---

## Products in this Library

### 1. India Global Expo (IGE)
Structured intelligence library for 50 sectors, 1,350+ industries, and all GoI ministry-aligned taxonomy.

### 2. India Global News (iGEN News) ← **NEW**
B2B trade & business news platform with 10 core modules, revenue-focused UI/UX, and AI-powered intelligence.

---

## ── INDIA GLOBAL EXPO ──

### Key Stats

| Metric | Value |
|--------|-------|
| **Total Sectors** | 50 |
| **Total Industries** | 1,350+ |
| **GoI Ministry Coverage** | 23 Ministries |
| **Sector Codes** | S01 – S50 |
| **Industry ID Format** | S01-I01 through S50-I26 |

---

### Taxonomy Overview (All 50 Sectors)

| Code | Sector | Ministry | # Industries |
|------|--------|----------|-------------|
| S01 | Agriculture | Ministry of Agriculture & Farmers Welfare | 28 |
| S02 | AI & Cyber Security | Ministry of Electronics & IT | 30 |
| S03 | Animal Husbandry, Dairying & Fisheries | Ministry of Fisheries, Animal Husbandry & Dairying | 28 |
| S04 | Atomic Energy | Department of Atomic Energy | 27 |
| S05 | Ayush & Ayurveda & Herbal Medicine | Ministry of Ayush | 31 |
| S06 | Biotechnology | Ministry of Science & Technology | 30 |
| S07 | Chemicals & Fertilizers & Minerals | Ministry of Chemicals & Fertilizers | 35 |
| S08 | Petrochemicals | Ministry of Chemicals & Fertilizers | 27 |
| S09 | Civil Aviation | Ministry of Civil Aviation | 29 |
| S10 | Coal | Ministry of Coal | 25 |
| S11 | Communications | Ministry of Communications | 35 |
| S12 | Consumer Brands | Ministry of Commerce & Industry | 30 |
| S13 | Defence & Aerospace | Ministry of Defence | 25 |
| S14 | Earth Sciences | Ministry of Earth Sciences | 25 |
| S15 | Education | Ministry of Education | 25 |
| S16 | Electronics & IT & Components | Ministry of Electronics & IT | 35 |
| S17 | Energy & Sustainability | Ministry of New & Renewable Energy | 28 |
| S18 | Environment, Forest & Climate Change | Ministry of Environment, Forest & Climate Change | 25 |
| S19 | Fertilizers | Ministry of Chemicals & Fertilizers | 25 |
| S20 | Fisheries, Animal Husbandry & Dairying | Ministry of Fisheries, Animal Husbandry & Dairying | 25 |
| S21 | FMCG | Ministry of Consumer Affairs | 25 |
| S22 | Food Processing Industries | Ministry of Food Processing Industries | 25 |
| S23 | Health & Family Welfare | Ministry of Health & Family Welfare | 25 |
| S24 | Heavy Industries | Ministry of Heavy Industries | 25 |
| S25 | Information & Broadcasting | Ministry of Information & Broadcasting | 25 |
| S26 | Infrastructure & Construction | Ministry of Housing & Urban Affairs | 25 |
| S27 | Labour & Employment | Ministry of Labour & Employment | 25 |
| S28 | Manufacturing | Ministry of Commerce & Industry | 25 |
| S29 | Mines | Ministry of Mines | 25 |
| S30 | New & Renewable Energy | Ministry of New & Renewable Energy | 25 |
| S31 | Petroleum & Natural Gas | Ministry of Petroleum & Natural Gas | 30 |
| S32 | Pharmaceutical | Ministry of Chemicals & Fertilizers | 30 |
| S33 | Ports, Shipping & Waterways | Ministry of Ports, Shipping & Waterways | 26 |
| S34 | Power | Ministry of Power | 28 |
| S35 | Services | Ministry of Commerce & Industry | 25 |
| S36 | Space | Department of Space / ISRO | 25 |
| S37 | Steel | Ministry of Steel | 26 |
| S38 | Technology | Ministry of Electronics & IT | 30 |
| S39 | Textiles | Ministry of Textiles | 27 |
| S40 | Tourism | Ministry of Tourism | 25 |
| S41 | Banking & Financial Services | Ministry of Finance | 26 |
| S42 | FinTech & Digital Payments | Reserve Bank of India | 26 |
| S43 | Logistics & Supply Chain | Ministry of Commerce & Industry | 26 |
| S44 | Railways & Metro | Ministry of Railways | 26 |
| S45 | Automotive & Electric Vehicles | Ministry of Heavy Industries | 26 |
| S46 | Semiconductors | Ministry of Electronics & IT | 26 |
| S47 | Startups & Innovation | DPIIT | 26 |
| S48 | Retail & E-Commerce | Ministry of Commerce & Industry | 26 |
| S49 | Water Resources & Management | Ministry of Jal Shakti | 26 |
| S50 | Waste Management & Circular Economy | Ministry of Environment, Forest & Climate Change | 26 |

---

### Data Source
**Primary:** `Master_File_50_Sectors_Duplicates_Marked.xlsx`

Sheets:
- `MASTER INDEX` — Sector list + ministry mapping
- `Sectors 01–10` through `Sectors 41–50` — Industry details per sector

---

### How to Use in the App

```js
import { IGEN_SECTORS, IGEN_INDUSTRIES, IGEN_TAXONOMY } from '@/data/igen_taxonomy.js';

// Get all sectors
IGEN_SECTORS  // Array of 50 sector objects

// Get all industries
IGEN_INDUSTRIES  // Array of 1,350 industry objects

// Get a specific sector with all its industries
IGEN_TAXONOMY.find(s => s.code === 'S01')
```

---

## ── INDIA GLOBAL NEWS (iGEN NEWS) ──

### Key Stats

| Metric | Value |
|--------|-------|
| **Total Modules** | 10 |
| **Sectors Covered** | 50 |
| **Countries Covered** | 195 |
| **Community Types** | 4 (SME, Reader, Leader, Expo) |
| **Revenue Streams** | 10+ |
| **Subscription Tiers** | 3 (Free, Pro, Enterprise) |
| **Module JSON** | `objects/Module/IGN_modules.json` |

---

### Module Overview (All 10 Modules)

| Code | Module | Purpose | PRD |
|------|--------|---------|-----|
| IGN-M01 | Feed | Personalized news by sector/industry/country/leader | [PRD](books/PRD/IGN-M01_Feed_PRD.md) |
| IGN-M02 | Headlines | Curated editorial news by editor type | [PRD](books/PRD/IGN-M02_Headlines_PRD.md) |
| IGN-M03 | Sector News | Industry intelligence hub (50 sectors) | [PRD](books/PRD/IGN-M03_Sector_News_PRD.md) |
| IGN-M04 | Company Pages | Company digital presence & B2B leads | [PRD](books/PRD/IGN-M04_Company_Pages_PRD.md) |
| IGN-M05 | Country News | Country intelligence (195 countries) | [PRD](books/PRD/IGN-M05_Country_News_PRD.md) |
| IGN-M06 | Leader News | Executive intelligence & leadership news | [PRD](books/PRD/IGN-M06_Leader_News_PRD.md) |
| IGN-M07 | Expert News | SME & ASME insights & consultation | [PRD](books/PRD/IGN-M07_Expert_News_PRD.md) |
| IGN-M08 | Communities | Trade professional community network | [PRD](books/PRD/IGN-M08_Communities_PRD.md) |
| IGN-M09 | Trending | Most-liked, shared, commented news | [PRD](books/PRD/IGN-M09_Trending_PRD.md) |
| IGN-M10 | My News | Personal workspace & contributions | [PRD](books/PRD/IGN-M10_My_News_PRD.md) |

---

### Revenue Model (iGEN News)

| Tier | Key Features |
|------|-------------|
| **Free** | Basic news, limited feed, standard search |
| **Pro / Verified** | AI insights, unlimited news, premium reports, analytics |
| **Enterprise** | Advanced dashboards, CRM, API access, custom research |

**Revenue Streams:** Premium Subscriptions · Intelligence Reports · Sponsored Content · Featured Listings · Advertising · Events · Lead Generation · Consulting · Certification

---

### How to Use iGEN News Data

```js
import IGN_MODULES from '@/data/IGN_modules.json';

// Get all modules
IGN_MODULES.modules  // Array of 10 module objects

// Get a specific module
IGN_MODULES.modules.find(m => m.code === 'IGN-M03')

// Get Feed module submenus
IGN_MODULES.modules.find(m => m.code === 'IGN-M01').submenus
```

---

*Last updated: July 2026 · IGEN-Brain v2.0*
