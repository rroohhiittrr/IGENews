# 🌍 IGEN NEWS PLATFORM — MEGA MENU ARCHITECTURE
## Complete Build Instructions for AI Coding Assistants
### (Claude Code · Cursor · Replit · Antigravity · Codex · All AI Dev Tools)

---

> **Document Type:** Full-Stack Web Platform Build Instructions  
> **Platform:** www.indiaglobalnews.com  
> **Scope:** Header · Navigation · 12 Mega Menus · Submenus · Folder Structure · About IGEN Page  
> **Format:** Instructions for AI Coding Assistants  

---

## 📋 TABLE OF CONTENTS

1. [Platform Overview](#1-platform-overview)
2. [Tech Stack Recommendation](#2-tech-stack-recommendation)
3. [Header & Navigation Instructions](#3-header--navigation-instructions)
4. [All 12 Mega Menus — Complete List](#4-all-12-mega-menus--complete-list)
5. [Full Submenu Breakdown (All C1–C5)](#5-full-submenu-breakdown-all-c1c5)
6. [Folder Structure (Nested)](#6-folder-structure-nested)
7. [About IGEN Page Instructions](#7-about-igen-page-instructions)
8. [Step-by-Step AI Coding Instructions](#8-step-by-step-ai-coding-instructions)
9. [Component Code Prompts](#9-component-code-prompts)

---

## 1. PLATFORM OVERVIEW

```
Platform Name   : IGEN NEWS
Website         : www.indiaglobalnews.com
Architecture    : 12 Mega Menus
Coverage        : 20 Sectors · 1000+ Industries · 195 Countries · 25 Leader Designations
Community       : FPC · FLC · FCC (Prestige Circles)
Revenue Model   : Free → Pro → Emerging Leader → Corporate
AI Layer        : AI Plus (Smart Monitoring + Predictive Signals)
```

### Platform Design Philosophy
- **Structure = Authority** (mirroring exhibition hall layout)
- **Navigation = Retention** (mega menus are digital exhibition halls)
- **Depth = Credibility** (40,000+ structured articles)
- **Premium Positioning** (trade intelligence, not mass news)

---

## 2. TECH STACK RECOMMENDATION

```
Frontend    : Next.js 14+ (App Router) OR React 18+
Styling     : Tailwind CSS + shadcn/ui
Database    : PostgreSQL (via Supabase or PlanetScale)
CMS         : Sanity.io OR Contentful
Auth        : NextAuth.js OR Clerk
AI Layer    : OpenAI API / Anthropic API
Search      : Algolia OR Typesense
Deployment  : Vercel (recommended) OR AWS Amplify
Icons       : Lucide React OR Heroicons
```

---

## 3. HEADER & NAVIGATION INSTRUCTIONS

### 3.1 Header Structure

```
[LOGO] [SEARCH BAR] [LANGUAGE] [LOGIN] [UPGRADE TO PRO]
─────────────────────────────────────────────────────────
[FEED] [HEADLINES] [TRENDING] [SECTOR NEWS] [COUNTRY NEWS]
[LEADER NEWS] [READER PLANS] [AI PLUS] [TOP NEWS]
[TRADE INTELLIGENCE LAB] [COMMUNITY] [MY TRADENEWS]
─────────────────────────────────────────────────────────
```

### 3.2 Header Design Rules

- **Position:** Fixed/sticky top header
- **Height:** 64px primary bar + 48px navigation bar
- **Logo:** Left-aligned, links to homepage
- **Search:** Center-positioned, full-text trade news search
- **CTA Buttons:** Right-aligned — `Login` (ghost) + `Upgrade to Pro` (solid primary color)
- **Mega Menu Trigger:** Hover (desktop) + Tap (mobile)
- **Mobile:** Hamburger → Slide-in drawer with accordion menus

### 3.3 Mega Menu Behavior

```
Trigger         : Hover on desktop / Tap on mobile
Animation       : Fade-in + slide-down (300ms ease)
Layout          : Full-width panel below header (100vw)
Columns         : 4–5 columns (C1, C2, C3, C4, C5)
Close Trigger   : Mouse leave / Click outside / Escape key
Backdrop        : Semi-transparent overlay behind menu panel
Active State    : Underline + bold on active menu item
```

### 3.4 About IGEN Button (Existing Button Integration)

```
Button Label    : "About IGEN"
Location        : Header navigation bar (existing)
Click Action    : Opens /about-igen page OR modal overlay
Content         : Full 12 Mega Menu Architecture Page (see Section 7)
```

---

## 4. ALL 12 MEGA MENUS — COMPLETE LIST

| # | Menu Name | Type | Icon |
|---|-----------|------|------|
| 1 | **Feed** | Volume Engine – Real-Time Trade Pulse | 🔵 |
| 2 | **Headlines** | Authority Engine – What Matters Today | 🟢 |
| 3 | **Trending** | Momentum Engine – Engagement & Social Signals | 🔥 |
| 4 | **Sector News** | 20 Sector Intelligence Hubs | 🏭 |
| 5 | **Country News** | 195 Bilateral Trade Architecture | 🌍 |
| 6 | **Leader News** | 25 Leadership Designation Monitoring | 👔 |
| 7 | **Reader Plans** | Revenue Ladder – Free → Pro → Corporate | 💎 |
| 8 | **AI Plus** | Premium Intelligence & Predictive Trade Tools | 🤖 |
| 9 | **Top News** | Podcast + Top Companies + Leaders + Countries | 🏆 |
| 10 | **Trade Intelligence Lab** | Reports · Rankings · Whitepapers | 📊 |
| 11 | **Community** | FPC – FLC – FCC Founding Prestige Circles | 🆕 |
| 12 | **My TradeNews** | Personal Dashboard | 🆕 |

---

## 5. FULL SUBMENU BREAKDOWN (All C1–C5)

---

### 🔵 MEGA MENU 1 — FEED
> *Volume Engine – Real-Time Trade Pulse*

#### C1 — By Sector
- All 20 Sectors
- Sector Heat Map (Live Activity View)
- My Followed Sectors
- Sector Gap Alerts
- Sector Activity Rank

#### C2 — By Industry Depth
- All Industries (1000+)
- Industry Search
- My Followed Industries
- Fastest Growing Industries
- Under-Covered Industries (Opportunity View)

#### C3 — By Country & Bilateral Trade
- All 195 Countries
- Bilateral Trade Map (India + Country)
- My Followed Countries
- Trade Zone View (ASEAN / EU / GCC / Africa etc.)
- Country Momentum Score

#### C4 — By Content Stream
- RSS AI Articles
- Manual AI Authority Articles
- Breaking Trade Updates
- QC Verified Articles
- Most Discussed Today

#### C5 — Social Signals
- Most Liked Today
- Most Commented
- Most Shared
- Articles with Leader Quotes
- Community Picks (FPC Curated)

> **Upgrade Hook:** *"Follow more sectors. Upgrade to Pro."*

---

### 🟢 MEGA MENU 2 — HEADLINES
> *Authority Engine – What Matters Today*

#### C1 — Editor's Desk (Priyanshi-Curated)
- Top Industry Stories
- Policy Impact Headlines
- Export-Import Signals
- Industry Risk Alerts
- Regulatory Highlights

#### C2 — Leader Mentions
- CEO Headlines
- CFO Headlines
- Founder Headlines
- CXO Movements
- Government Trade Officials

#### C3 — Corporate Spotlight
- Major Corporate Announcements
- Corporate Expansion Moves
- M&A Highlights
- Corporate Earnings Signals
- Industry Entry / Exit

#### C4 — Trade Intelligence Highlights
- Top 10 Today
- Weekly Strategic Signals
- High Impact Trade Developments
- Industry Disruption Alerts
- Strategic Long Reads

> **Upgrade Hook:** *"Download industry briefs. Upgrade to Pro."*

---

### 🔥 MEGA MENU 3 — TRENDING
> *Momentum Engine – What Trade World is Talking About*

#### C1 — By Engagement Signals
- Most Read Today
- Most Liked
- Most Bookmarked
- Most Commented
- Fastest Rising Article

#### C2 — By Sector Momentum
- Sector Heat Map
- Fastest Growing Sector
- Sector Engagement Index
- Weekly Sector Competition
- Quietest Sector (Opportunity View)

#### C3 — By Search Behavior
- Rising Keywords
- Bilateral Buzz
- Leader Name Trending
- Industry Search Spikes
- Export Trend Keywords

#### C4 — Time Filters
- Trending Now
- Today
- This Week
- This Month
- All Time

> **Upgrade Hook:** *"See full engagement analytics with Pro."*

---

### 🏭 MEGA MENU 4 — SECTOR NEWS
> *Aligned with IGEN EXPO – 20 Sector Model*

#### C1 — 20 Sector Hubs
- Each sector landing page (20 individual sector pages)

#### C2 — Sector Intelligence
- Sector Overview Page
- Top Industries in Sector
- Export Leaders
- Import Signals
- Sector Ranking Index

#### C3 — Sector Engagement
- Most Engaged Articles
- Leader Voices in Sector
- Corporate Presence
- Sector Polls
- FLC Insights

#### C4 — Sector Reports
- Quarterly Sector Report (Pro+)
- Industry Depth Brief
- Risk Dashboard
- Sector Outlook
- Sector Leader Directory

> **Upgrade Hook:** *"Access full sector reports."*

---

### 🌍 MEGA MENU 5 — COUNTRY NEWS
> *195 Bilateral Trade Architecture*

#### C1 — 195 Bilateral Pages
- Country–India structured pages (195 individual country pages)

#### C2 — Trade Insights
- Export Signals
- Import Trends
- Bilateral Policy Updates
- Trade Agreements
- Investment Activity

#### C3 — Country Ranking
- Most Active Trade Partners
- Fastest Growing Countries
- Sector-wise Country Map
- Trade Deficit Watch
- Opportunity Countries

#### C4 — Country Leaders
- Country-wise CEOs
- Trade Secretaries
- Embassy Mentions
- Diplomatic Signals
- Bilateral Events

> **Upgrade Hook:** *"Follow unlimited countries."*

---

### 👔 MEGA MENU 6 — LEADER NEWS
> *25 Leadership Designation Monitoring System*

#### C1 — By Designation (25 Categories)
- CEO News
- CFO News
- CTO News
- Founder News
- Chairman News
- Trade Secretary News
- CHRO / CIO / CSO etc.

#### C2 — Leader Profiles
- Emerging Leaders
- Charter Leaders (FLC)
- Most Active Leaders
- Leader Rankings
- Leader Spotlight

#### C3 — Leader Insights
- Monthly Published Insights
- Most Discussed Leader Articles
- Leader Interviews
- Podcast Features
- AMA Sessions

#### C4 — Leader Reputation Tools
- Claim Your Profile
- Build SEO Presence
- Publish Your Insight
- Leader Verification
- Upgrade to Emerging Leader

---

### 💎 MEGA MENU 7 — READER PLANS
> *Free → Pro → Emerging Leader → Corporate Revenue Ladder*

#### C1 — Free Plan
- What You Get
- Feature Limits
- Upgrade Comparison
- Community Access
- FAQs

#### C2 — Pro Reader
- Structured Follow Limits
- Download Briefs
- Advanced Filters
- Bookmark Library
- Upgrade CTA

#### C3 — Emerging Leader
- Leader Profile
- Monthly Insight
- Verified Badge
- SEO Advantage
- Charter Leader Access

#### C4 — Corporate Plan
- Corporate Profile
- Multi-user Access
- Corporate Visibility
- Founding Corporate Partner
- Schedule Consultation

---

### 🤖 MEGA MENU 8 — AI PLUS
> *Premium Intelligence Layer*

#### C1 — Smart Monitoring
- AI Industry Tracker
- Country Watch Alerts
- Leader Activity Monitor
- Custom Alerts
- Smart Digest

#### C2 — Predictive Signals
- Industry Momentum Index
- Sector Growth Forecast
- Trade Sentiment Score
- Risk Indicator
- Early Disruption Alerts

#### C3 — Smart Research Tools
- AI Industry Summary
- Country Trade Snapshot
- Leader Summary Generator
- Article Summary Tool
- Comparative Analysis Tool

#### C4 — AI Personalisation
- My AI Feed
- Auto Curated Daily Digest
- Smart Recommendations
- Predictive Interest Mapping
- AI Bookmark Suggestions

---

### 🏆 MEGA MENU 9 — TOP NEWS
> *Future #1 Revenue Engine*

#### C1 — Podcast
- Weekly Trade Podcast
- Leader Interviews
- Sector Focus Series
- Corporate Voices
- FLC Special Episodes

#### C2 — Top Company News
- Top Corporate Moves
- Fastest Growing Companies
- Corporate Spotlight
- Earnings Highlights
- Industry Dominators

#### C3 — Top Leader News
- Most Influential Leaders
- Leader Momentum Index
- Leader of the Month
- Rising Industry Voices
- FLC Highlights

#### C4 — Top Country News
- Most Active Trade Country
- Country Spotlight of the Month
- Bilateral Growth Leader
- Strategic Trade Region
- Investment Focus Country

---

### 📊 MEGA MENU 10 — TRADE INTELLIGENCE LAB
> *Research-Driven Authority Engine*

#### C1 — Industry Reports
- Quarterly Reports
- Sector Reports
- Country Intelligence
- Risk Analysis
- Export Opportunity Maps

#### C2 — Rankings
- Industry Growth Ranking
- Leader Ranking
- Corporate Ranking
- Sector Activity Ranking
- Country Trade Ranking

#### C3 — Surveys & Polls
- Industry Sentiment Poll
- Export Outlook Survey
- Leader Confidence Index
- Corporate Outlook
- Annual Trade Survey

#### C4 — Whitepapers
- Sponsored Reports
- Corporate Whitepapers
- Trade Outlook Books
- Annual Intelligence Book
- Download Centre

---

### 🆕 MEGA MENU 11 — COMMUNITY
> *Prestige & Retention Engine – FPC · FLC · FCC*

#### C1 — FPC (Founding Professionals)
- Founding Wall
- FPC Directory
- Top FPC Contributors
- Quarterly Meet Info
- Recognition Certificates

#### C2 — FLC (Founding Leaders)
- Charter Leaders
- Leader Spotlight
- Leader Roundtable
- Podcast Guests
- Public Recognition Posts

#### C3 — FCC (Founding Corporate)
- Founding Corporate Partners
- Corporate Spotlight
- Corporate Roundtable
- Co-Branded Briefs
- Recognition Seal

#### C4 — Discussions
- Industry Discussion Threads
- Country Discussion
- Leader AMA
- Corporate Announcements
- Suggest Industry Coverage

---

### 🆕 MEGA MENU 12 — MY TRADENEWS
> *Personal Dashboard – My Follows · My Activity · My Insights*

#### C1 — My Dashboard
- My Followed Sectors
- My Industries
- My Countries
- My Leaders
- My Alerts

#### C2 — My Activity
- My Likes
- My Comments
- My Shares
- My Bookmarks
- My Reading History

#### C3 — My Contributions
- My Published Insights
- My Drafts
- My Leader Page
- My Corporate Page
- My Engagement Score

#### C4 — My Analytics (Pro+)
- Engagement Stats
- Article Reach
- Follower Count
- Sector Influence
- Reputation Score

---

## 6. FOLDER STRUCTURE (NESTED)

> **Instructions for AI:** Create this exact folder and file structure in your project.

```
src/
├── app/
│   ├── about-igen/
│   │   └── page.tsx                          ← About IGEN full page
│   │
│   ├── feed/
│   │   ├── page.tsx
│   │   ├── by-sector/
│   │   │   ├── page.tsx
│   │   │   ├── all-20-sectors/page.tsx
│   │   │   ├── sector-heat-map/page.tsx
│   │   │   ├── my-followed-sectors/page.tsx
│   │   │   ├── sector-gap-alerts/page.tsx
│   │   │   └── sector-activity-rank/page.tsx
│   │   ├── by-industry-depth/
│   │   │   ├── page.tsx
│   │   │   ├── all-industries/page.tsx
│   │   │   ├── industry-search/page.tsx
│   │   │   ├── my-followed-industries/page.tsx
│   │   │   ├── fastest-growing-industries/page.tsx
│   │   │   └── under-covered-industries/page.tsx
│   │   ├── by-country/
│   │   │   ├── page.tsx
│   │   │   ├── all-195-countries/page.tsx
│   │   │   ├── bilateral-trade-map/page.tsx
│   │   │   ├── my-followed-countries/page.tsx
│   │   │   ├── trade-zone-view/page.tsx
│   │   │   └── country-momentum-score/page.tsx
│   │   ├── by-content-stream/
│   │   │   ├── page.tsx
│   │   │   ├── rss-ai-articles/page.tsx
│   │   │   ├── manual-ai-articles/page.tsx
│   │   │   ├── breaking-trade-updates/page.tsx
│   │   │   ├── qc-verified-articles/page.tsx
│   │   │   └── most-discussed-today/page.tsx
│   │   └── social-signals/
│   │       ├── page.tsx
│   │       ├── most-liked-today/page.tsx
│   │       ├── most-commented/page.tsx
│   │       ├── most-shared/page.tsx
│   │       ├── articles-with-leader-quotes/page.tsx
│   │       └── community-picks/page.tsx
│   │
│   ├── headlines/
│   │   ├── page.tsx
│   │   ├── editors-desk/
│   │   │   ├── page.tsx
│   │   │   ├── top-industry-stories/page.tsx
│   │   │   ├── policy-impact-headlines/page.tsx
│   │   │   ├── export-import-signals/page.tsx
│   │   │   ├── industry-risk-alerts/page.tsx
│   │   │   └── regulatory-highlights/page.tsx
│   │   ├── leader-mentions/
│   │   │   ├── page.tsx
│   │   │   ├── ceo-headlines/page.tsx
│   │   │   ├── cfo-headlines/page.tsx
│   │   │   ├── founder-headlines/page.tsx
│   │   │   ├── cxo-movements/page.tsx
│   │   │   └── government-trade-officials/page.tsx
│   │   ├── corporate-spotlight/
│   │   │   ├── page.tsx
│   │   │   ├── major-corporate-announcements/page.tsx
│   │   │   ├── corporate-expansion-moves/page.tsx
│   │   │   ├── ma-highlights/page.tsx
│   │   │   ├── corporate-earnings-signals/page.tsx
│   │   │   └── industry-entry-exit/page.tsx
│   │   └── trade-intelligence-highlights/
│   │       ├── page.tsx
│   │       ├── top-10-today/page.tsx
│   │       ├── weekly-strategic-signals/page.tsx
│   │       ├── high-impact-trade-developments/page.tsx
│   │       ├── industry-disruption-alerts/page.tsx
│   │       └── strategic-long-reads/page.tsx
│   │
│   ├── trending/
│   │   ├── page.tsx
│   │   ├── by-engagement-signals/
│   │   │   ├── page.tsx
│   │   │   ├── most-read-today/page.tsx
│   │   │   ├── most-liked/page.tsx
│   │   │   ├── most-bookmarked/page.tsx
│   │   │   ├── most-commented/page.tsx
│   │   │   └── fastest-rising-article/page.tsx
│   │   ├── by-sector-momentum/
│   │   │   ├── page.tsx
│   │   │   ├── sector-heat-map/page.tsx
│   │   │   ├── fastest-growing-sector/page.tsx
│   │   │   ├── sector-engagement-index/page.tsx
│   │   │   ├── weekly-sector-competition/page.tsx
│   │   │   └── quietest-sector/page.tsx
│   │   ├── by-search-behavior/
│   │   │   ├── page.tsx
│   │   │   ├── rising-keywords/page.tsx
│   │   │   ├── bilateral-buzz/page.tsx
│   │   │   ├── leader-name-trending/page.tsx
│   │   │   ├── industry-search-spikes/page.tsx
│   │   │   └── export-trend-keywords/page.tsx
│   │   └── time-filters/
│   │       ├── page.tsx
│   │       ├── trending-now/page.tsx
│   │       ├── today/page.tsx
│   │       ├── this-week/page.tsx
│   │       ├── this-month/page.tsx
│   │       └── all-time/page.tsx
│   │
│   ├── sector-news/
│   │   ├── page.tsx
│   │   ├── 20-sector-hubs/
│   │   │   └── [sector]/page.tsx             ← Dynamic route for each sector
│   │   ├── sector-intelligence/
│   │   │   ├── page.tsx
│   │   │   ├── sector-overview/page.tsx
│   │   │   ├── top-industries/page.tsx
│   │   │   ├── export-leaders/page.tsx
│   │   │   ├── import-signals/page.tsx
│   │   │   └── sector-ranking-index/page.tsx
│   │   ├── sector-engagement/
│   │   │   ├── page.tsx
│   │   │   ├── most-engaged-articles/page.tsx
│   │   │   ├── leader-voices/page.tsx
│   │   │   ├── corporate-presence/page.tsx
│   │   │   ├── sector-polls/page.tsx
│   │   │   └── flc-insights/page.tsx
│   │   └── sector-reports/
│   │       ├── page.tsx
│   │       ├── quarterly-sector-report/page.tsx
│   │       ├── industry-depth-brief/page.tsx
│   │       ├── risk-dashboard/page.tsx
│   │       ├── sector-outlook/page.tsx
│   │       └── sector-leader-directory/page.tsx
│   │
│   ├── country-news/
│   │   ├── page.tsx
│   │   ├── 195-bilateral-pages/
│   │   │   └── [country]/page.tsx            ← Dynamic route for each country
│   │   ├── trade-insights/
│   │   │   ├── page.tsx
│   │   │   ├── export-signals/page.tsx
│   │   │   ├── import-trends/page.tsx
│   │   │   ├── bilateral-policy-updates/page.tsx
│   │   │   ├── trade-agreements/page.tsx
│   │   │   └── investment-activity/page.tsx
│   │   ├── country-ranking/
│   │   │   ├── page.tsx
│   │   │   ├── most-active-trade-partners/page.tsx
│   │   │   ├── fastest-growing-countries/page.tsx
│   │   │   ├── sector-wise-country-map/page.tsx
│   │   │   ├── trade-deficit-watch/page.tsx
│   │   │   └── opportunity-countries/page.tsx
│   │   └── country-leaders/
│   │       ├── page.tsx
│   │       ├── country-wise-ceos/page.tsx
│   │       ├── trade-secretaries/page.tsx
│   │       ├── embassy-mentions/page.tsx
│   │       ├── diplomatic-signals/page.tsx
│   │       └── bilateral-events/page.tsx
│   │
│   ├── leader-news/
│   │   ├── page.tsx
│   │   ├── by-designation/
│   │   │   ├── page.tsx
│   │   │   ├── ceo/page.tsx
│   │   │   ├── cfo/page.tsx
│   │   │   ├── cto/page.tsx
│   │   │   ├── founder/page.tsx
│   │   │   ├── chairman/page.tsx
│   │   │   ├── trade-secretary/page.tsx
│   │   │   └── chro-cio-cso/page.tsx
│   │   ├── leader-profiles/
│   │   │   ├── page.tsx
│   │   │   ├── emerging-leaders/page.tsx
│   │   │   ├── charter-leaders-flc/page.tsx
│   │   │   ├── most-active-leaders/page.tsx
│   │   │   ├── leader-rankings/page.tsx
│   │   │   └── leader-spotlight/page.tsx
│   │   ├── leader-insights/
│   │   │   ├── page.tsx
│   │   │   ├── monthly-published-insights/page.tsx
│   │   │   ├── most-discussed-leader-articles/page.tsx
│   │   │   ├── leader-interviews/page.tsx
│   │   │   ├── podcast-features/page.tsx
│   │   │   └── ama-sessions/page.tsx
│   │   └── leader-reputation-tools/
│   │       ├── page.tsx
│   │       ├── claim-your-profile/page.tsx
│   │       ├── build-seo-presence/page.tsx
│   │       ├── publish-your-insight/page.tsx
│   │       ├── leader-verification/page.tsx
│   │       └── upgrade-to-emerging-leader/page.tsx
│   │
│   ├── reader-plans/
│   │   ├── page.tsx
│   │   ├── free-plan/
│   │   │   ├── page.tsx
│   │   │   ├── what-you-get/page.tsx
│   │   │   ├── feature-limits/page.tsx
│   │   │   ├── upgrade-comparison/page.tsx
│   │   │   ├── community-access/page.tsx
│   │   │   └── faqs/page.tsx
│   │   ├── pro-reader/
│   │   │   ├── page.tsx
│   │   │   ├── structured-follow-limits/page.tsx
│   │   │   ├── download-briefs/page.tsx
│   │   │   ├── advanced-filters/page.tsx
│   │   │   ├── bookmark-library/page.tsx
│   │   │   └── upgrade-cta/page.tsx
│   │   ├── emerging-leader/
│   │   │   ├── page.tsx
│   │   │   ├── leader-profile/page.tsx
│   │   │   ├── monthly-insight/page.tsx
│   │   │   ├── verified-badge/page.tsx
│   │   │   ├── seo-advantage/page.tsx
│   │   │   └── charter-leader-access/page.tsx
│   │   └── corporate-plan/
│   │       ├── page.tsx
│   │       ├── corporate-profile/page.tsx
│   │       ├── multi-user-access/page.tsx
│   │       ├── corporate-visibility/page.tsx
│   │       ├── founding-corporate-partner/page.tsx
│   │       └── schedule-consultation/page.tsx
│   │
│   ├── ai-plus/
│   │   ├── page.tsx
│   │   ├── smart-monitoring/
│   │   │   ├── page.tsx
│   │   │   ├── ai-industry-tracker/page.tsx
│   │   │   ├── country-watch-alerts/page.tsx
│   │   │   ├── leader-activity-monitor/page.tsx
│   │   │   ├── custom-alerts/page.tsx
│   │   │   └── smart-digest/page.tsx
│   │   ├── predictive-signals/
│   │   │   ├── page.tsx
│   │   │   ├── industry-momentum-index/page.tsx
│   │   │   ├── sector-growth-forecast/page.tsx
│   │   │   ├── trade-sentiment-score/page.tsx
│   │   │   ├── risk-indicator/page.tsx
│   │   │   └── early-disruption-alerts/page.tsx
│   │   ├── smart-research-tools/
│   │   │   ├── page.tsx
│   │   │   ├── ai-industry-summary/page.tsx
│   │   │   ├── country-trade-snapshot/page.tsx
│   │   │   ├── leader-summary-generator/page.tsx
│   │   │   ├── article-summary-tool/page.tsx
│   │   │   └── comparative-analysis-tool/page.tsx
│   │   └── ai-personalisation/
│   │       ├── page.tsx
│   │       ├── my-ai-feed/page.tsx
│   │       ├── auto-curated-daily-digest/page.tsx
│   │       ├── smart-recommendations/page.tsx
│   │       ├── predictive-interest-mapping/page.tsx
│   │       └── ai-bookmark-suggestions/page.tsx
│   │
│   ├── top-news/
│   │   ├── page.tsx
│   │   ├── podcast/
│   │   │   ├── page.tsx
│   │   │   ├── weekly-trade-podcast/page.tsx
│   │   │   ├── leader-interviews/page.tsx
│   │   │   ├── sector-focus-series/page.tsx
│   │   │   ├── corporate-voices/page.tsx
│   │   │   └── flc-special-episodes/page.tsx
│   │   ├── top-company-news/
│   │   │   ├── page.tsx
│   │   │   ├── top-corporate-moves/page.tsx
│   │   │   ├── fastest-growing-companies/page.tsx
│   │   │   ├── corporate-spotlight/page.tsx
│   │   │   ├── earnings-highlights/page.tsx
│   │   │   └── industry-dominators/page.tsx
│   │   ├── top-leader-news/
│   │   │   ├── page.tsx
│   │   │   ├── most-influential-leaders/page.tsx
│   │   │   ├── leader-momentum-index/page.tsx
│   │   │   ├── leader-of-the-month/page.tsx
│   │   │   ├── rising-industry-voices/page.tsx
│   │   │   └── flc-highlights/page.tsx
│   │   └── top-country-news/
│   │       ├── page.tsx
│   │       ├── most-active-trade-country/page.tsx
│   │       ├── country-spotlight-of-the-month/page.tsx
│   │       ├── bilateral-growth-leader/page.tsx
│   │       ├── strategic-trade-region/page.tsx
│   │       └── investment-focus-country/page.tsx
│   │
│   ├── trade-intelligence-lab/
│   │   ├── page.tsx
│   │   ├── industry-reports/
│   │   │   ├── page.tsx
│   │   │   ├── quarterly-reports/page.tsx
│   │   │   ├── sector-reports/page.tsx
│   │   │   ├── country-intelligence/page.tsx
│   │   │   ├── risk-analysis/page.tsx
│   │   │   └── export-opportunity-maps/page.tsx
│   │   ├── rankings/
│   │   │   ├── page.tsx
│   │   │   ├── industry-growth-ranking/page.tsx
│   │   │   ├── leader-ranking/page.tsx
│   │   │   ├── corporate-ranking/page.tsx
│   │   │   ├── sector-activity-ranking/page.tsx
│   │   │   └── country-trade-ranking/page.tsx
│   │   ├── surveys-and-polls/
│   │   │   ├── page.tsx
│   │   │   ├── industry-sentiment-poll/page.tsx
│   │   │   ├── export-outlook-survey/page.tsx
│   │   │   ├── leader-confidence-index/page.tsx
│   │   │   ├── corporate-outlook/page.tsx
│   │   │   └── annual-trade-survey/page.tsx
│   │   └── whitepapers/
│   │       ├── page.tsx
│   │       ├── sponsored-reports/page.tsx
│   │       ├── corporate-whitepapers/page.tsx
│   │       ├── trade-outlook-books/page.tsx
│   │       ├── annual-intelligence-book/page.tsx
│   │       └── download-centre/page.tsx
│   │
│   ├── community/
│   │   ├── page.tsx
│   │   ├── fpc/
│   │   │   ├── page.tsx
│   │   │   ├── founding-wall/page.tsx
│   │   │   ├── fpc-directory/page.tsx
│   │   │   ├── top-fpc-contributors/page.tsx
│   │   │   ├── quarterly-meet-info/page.tsx
│   │   │   └── recognition-certificates/page.tsx
│   │   ├── flc/
│   │   │   ├── page.tsx
│   │   │   ├── charter-leaders/page.tsx
│   │   │   ├── leader-spotlight/page.tsx
│   │   │   ├── leader-roundtable/page.tsx
│   │   │   ├── podcast-guests/page.tsx
│   │   │   └── public-recognition-posts/page.tsx
│   │   ├── fcc/
│   │   │   ├── page.tsx
│   │   │   ├── founding-corporate-partners/page.tsx
│   │   │   ├── corporate-spotlight/page.tsx
│   │   │   ├── corporate-roundtable/page.tsx
│   │   │   ├── co-branded-briefs/page.tsx
│   │   │   └── recognition-seal/page.tsx
│   │   └── discussions/
│   │       ├── page.tsx
│   │       ├── industry-discussion-threads/page.tsx
│   │       ├── country-discussion/page.tsx
│   │       ├── leader-ama/page.tsx
│   │       ├── corporate-announcements/page.tsx
│   │       └── suggest-industry-coverage/page.tsx
│   │
│   └── my-tradenews/
│       ├── page.tsx
│       ├── my-dashboard/
│       │   ├── page.tsx
│       │   ├── my-followed-sectors/page.tsx
│       │   ├── my-industries/page.tsx
│       │   ├── my-countries/page.tsx
│       │   ├── my-leaders/page.tsx
│       │   └── my-alerts/page.tsx
│       ├── my-activity/
│       │   ├── page.tsx
│       │   ├── my-likes/page.tsx
│       │   ├── my-comments/page.tsx
│       │   ├── my-shares/page.tsx
│       │   ├── my-bookmarks/page.tsx
│       │   └── my-reading-history/page.tsx
│       ├── my-contributions/
│       │   ├── page.tsx
│       │   ├── my-published-insights/page.tsx
│       │   ├── my-drafts/page.tsx
│       │   ├── my-leader-page/page.tsx
│       │   ├── my-corporate-page/page.tsx
│       │   └── my-engagement-score/page.tsx
│       └── my-analytics/
│           ├── page.tsx
│           ├── engagement-stats/page.tsx
│           ├── article-reach/page.tsx
│           ├── follower-count/page.tsx
│           ├── sector-influence/page.tsx
│           └── reputation-score/page.tsx
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── MegaMenu.tsx
│   │   ├── MegaMenuPanel.tsx
│   │   ├── Footer.tsx
│   │   └── Sidebar.tsx
│   ├── mega-menus/
│   │   ├── FeedMenu.tsx
│   │   ├── HeadlinesMenu.tsx
│   │   ├── TrendingMenu.tsx
│   │   ├── SectorNewsMenu.tsx
│   │   ├── CountryNewsMenu.tsx
│   │   ├── LeaderNewsMenu.tsx
│   │   ├── ReaderPlansMenu.tsx
│   │   ├── AIPlusMenu.tsx
│   │   ├── TopNewsMenu.tsx
│   │   ├── TradeLabMenu.tsx
│   │   ├── CommunityMenu.tsx
│   │   └── MyTradeNewsMenu.tsx
│   ├── about-igen/
│   │   ├── AboutIGENPage.tsx
│   │   ├── MenuArchitectureSection.tsx
│   │   └── FounderPhilosophySection.tsx
│   └── ui/
│       ├── UpgradeHook.tsx
│       ├── MenuColumn.tsx
│       └── MenuLink.tsx
│
└── data/
    ├── mega-menu-data.ts                     ← All menu data in one file
    ├── sectors.ts                            ← 20 sectors list
    ├── countries.ts                          ← 195 countries list
    └── leader-designations.ts               ← 25 designations list
```

---

## 7. ABOUT IGEN PAGE INSTRUCTIONS

> **Trigger:** Clicking the existing **"About IGEN"** button on the website.

### 7.1 Page Route
```
URL: /about-igen
File: src/app/about-igen/page.tsx
```

### 7.2 Page Sections (in order)

```
1. Hero Section
   - Headline: "IGEN NEWS — India's Institutional Trade Intelligence Platform"
   - Subheadline: "Built on 30+ years of exhibition structuring experience"
   - Stats Bar: 20 Sectors | 1000+ Industries | 195 Countries | 25 Leader Designations

2. Founder's Philosophy Section
   - 5 Core Truths (Structure · Navigation · Depth · Engagement · Premium)

3. 12 Mega Menu Architecture Grid
   - Visual card grid showing all 12 menus
   - Each card: Icon + Name + Description + Link

4. Platform Architecture Table
   - 3 Discovery Engines
   - 3 Structural Architecture Layers
   - 3 Revenue & Upgrade Engines
   - 3 Retention & Authority Engines

5. Community Prestige Section
   - FPC · FLC · FCC explanation

6. Revenue Ladder Section
   - Free → Pro → Emerging Leader → Corporate

7. CTA Section
   - "Explore Platform" + "Upgrade to Pro"
```

### 7.3 Page Design Rules
- **Full-width layout**, no sidebar
- **Dark navy + gold accent** color scheme (premium positioning)
- **Smooth scroll** between sections
- **Animated counters** for stats (20, 1000, 195, 25)
- **Responsive**: Desktop (3-col grid) → Tablet (2-col) → Mobile (1-col)

---

## 8. STEP-BY-STEP AI CODING INSTRUCTIONS

> **Paste these instructions directly into Claude Code, Cursor, Replit, Antigravity, Codex, or any AI coding assistant.**

---

### STEP 1 — Project Setup

```
Prompt to AI:
"Create a new Next.js 14 project with TypeScript, Tailwind CSS, and shadcn/ui.
Name it igen-news. Set up the App Router. Install lucide-react for icons."
```

---

### STEP 2 — Create Data File

```
Prompt to AI:
"Create src/data/mega-menu-data.ts with a complete TypeScript data structure
for 12 mega menus. Each menu has:
- id (number 1-12)
- name (string)
- slug (URL-friendly string)
- icon (emoji)
- description (string)
- type (string)
- upgradeHook (string, optional)
- categories: array of { id, name, slug, items: string[] }

Include ALL data from the IGEN NEWS mega menu architecture document.
All 12 menus, all C1-C5 categories, all submenus."
```

---

### STEP 3 — Create Header Component

```
Prompt to AI:
"Create src/components/layout/Header.tsx with:
- Fixed sticky header
- Logo on left (IGEN NEWS text logo)
- Search bar in center
- Login + Upgrade to Pro buttons on right
- Navigation bar below with all 12 mega menu triggers
- About IGEN button that links to /about-igen
- On hover: show MegaMenuPanel
- Mobile: hamburger menu with accordion
- Use Tailwind CSS for all styling
- TypeScript interfaces for all props"
```

---

### STEP 4 — Create Mega Menu Panel Component

```
Prompt to AI:
"Create src/components/layout/MegaMenuPanel.tsx with:
- Full-width dropdown panel triggered on hover
- 4-column grid layout (one column per category C1-C4)
- Each column shows category title + list of submenu links
- Upgrade Hook banner at bottom of panel (gold/amber background)
- Smooth fade-in animation (300ms)
- Close on mouse leave or Escape key
- Semi-transparent backdrop overlay
- Responsive: collapses on mobile
- Use mega-menu-data.ts for all content
- TypeScript fully typed"
```

---

### STEP 5 — Create Individual Mega Menu Components

```
Prompt to AI:
"For each of the 12 mega menus, create a dedicated component in
src/components/mega-menus/. For example FeedMenu.tsx.
Each component should accept the menu data as props and render
the appropriate columns and links. Use Next.js Link component for
all navigation links."
```

---

### STEP 6 — Create Folder Structure (Automated)

```
Prompt to AI (Cursor or Claude Code):
"Create the complete folder and file structure for the IGEN NEWS platform
as defined below. For each page.tsx file, create a minimal placeholder
with the page title, breadcrumb, and a 'Coming Soon' section.

[Paste the full folder structure from Section 6 above]

Use this pattern for each placeholder page:
export default function PageName() {
  return (
    <main>
      <h1>Page Title</h1>
      <p>Content coming soon</p>
    </main>
  )
}"
```

---

### STEP 7 — Create About IGEN Page

```
Prompt to AI:
"Create src/app/about-igen/page.tsx — a full marketing page about the
IGEN NEWS platform. Include these sections:

1. Hero with animated stats counter (20 Sectors, 1000+ Industries,
   195 Countries, 25 Leader Designations)

2. Founder Philosophy section — 5 core truths as icon cards:
   Structure creates authority, Navigation drives retention,
   Depth builds credibility, Engagement builds memory,
   Premium positioning filters seriousness

3. 12 Mega Menu Architecture — card grid, each card shows:
   icon, name, type, short description, link to that section

4. Community Prestige — FPC, FLC, FCC as 3 columns

5. Revenue Ladder — horizontal steps: Free → Pro → Emerging Leader → Corporate

6. Final CTA — 'Explore Platform' and 'Upgrade to Pro' buttons

Use navy blue (#0A1628) background, gold (#D4AF37) accents,
white text. Add smooth scroll animations. Fully responsive."
```

---

### STEP 8 — Connect About IGEN Button

```
Prompt to AI:
"Find the existing 'About IGEN' button in the header/navigation component.
Update it to link to /about-igen using Next.js Link component.
If it was previously an <a> tag or <button>, replace with:
<Link href='/about-igen'>About IGEN</Link>"
```

---

### STEP 9 — Dynamic Routes for Sectors & Countries

```
Prompt to AI:
"Create dynamic routes for:
1. src/app/sector-news/20-sector-hubs/[sector]/page.tsx
   - generateStaticParams() returning all 20 sector slugs
   - Display sector name, latest articles, sector intelligence

2. src/app/country-news/195-bilateral-pages/[country]/page.tsx
   - generateStaticParams() returning all 195 country slugs
   - Display country name, bilateral trade info, country leaders

Import sector and country data from src/data/sectors.ts
and src/data/countries.ts respectively."
```

---

### STEP 10 — Mobile Responsive Navigation

```
Prompt to AI:
"Update the Header component to handle mobile navigation:
- Add hamburger menu button (visible on screens < 768px)
- Create slide-in drawer from left side
- Drawer contains all 12 mega menus as accordion items
- Each accordion item expands to show categories and submenus
- Close button at top of drawer
- Overlay backdrop when drawer is open
- Use React useState for open/close state
- Smooth slide animation with CSS transitions"
```

---

### STEP 11 — Upgrade Hook Components

```
Prompt to AI:
"Create src/components/ui/UpgradeHook.tsx:
- A banner component that shows at the bottom of mega menu panels
- Props: message (string), plan (string), ctaText (string)
- Styling: amber/gold background, dark text, arrow icon
- Links to /reader-plans page
- Used in Feed, Headlines, Trending, Sector News, Country News menus"
```

---

### STEP 12 — Final QA Checklist

```
Ask AI to verify:
☐ All 12 mega menus appear in header navigation
☐ Each mega menu panel shows all C1-C4/C5 categories
☐ All submenus link to correct routes
☐ About IGEN button opens /about-igen page
☐ Mobile hamburger menu works
☐ Upgrade hooks appear in correct menus
☐ Dynamic sector and country routes work
☐ All folder structure created correctly
☐ TypeScript has no errors
☐ Responsive design works on mobile, tablet, desktop
```

---

## 9. COMPONENT CODE PROMPTS

### Mega Menu Data Structure (TypeScript)

```typescript
// Prompt: "Create this TypeScript interface and populate with all IGEN data"

interface MenuItem {
  id: string;
  label: string;
  href: string;
  badge?: string;
}

interface MenuCategory {
  id: string;
  title: string;
  items: MenuItem[];
}

interface MegaMenu {
  id: number;
  name: string;
  slug: string;
  icon: string;
  description: string;
  type: string;
  upgradeHook?: string;
  categories: MenuCategory[];
}
```

### Quick Scaffold Command (for Claude Code or Terminal AI)

```bash
# Prompt to Claude Code or terminal AI assistant:
"Run this bash script to create all the folder structure for IGEN NEWS:"

mkdir -p src/app/{feed,headlines,trending,sector-news,country-news,leader-news,reader-plans,ai-plus,top-news,trade-intelligence-lab,community,my-tradenews,about-igen}

# Then for each main folder, create C1-C4 subfolders
# Feed subfolders:
mkdir -p src/app/feed/{by-sector,by-industry-depth,by-country,by-content-stream,social-signals}

# Continue pattern for all 12 mega menus...
```

---

## 📌 QUICK REFERENCE SUMMARY

| Mega Menu | Categories | Total Submenus |
|-----------|-----------|---------------|
| 1. Feed | C1–C5 | 25 |
| 2. Headlines | C1–C4 | 20 |
| 3. Trending | C1–C4 | 20 |
| 4. Sector News | C1–C4 | 20 |
| 5. Country News | C1–C4 | 20 |
| 6. Leader News | C1–C4 | 22 |
| 7. Reader Plans | C1–C4 | 20 |
| 8. AI Plus | C1–C4 | 20 |
| 9. Top News | C1–C4 | 20 |
| 10. Trade Intelligence Lab | C1–C4 | 20 |
| 11. Community | C1–C4 | 20 |
| 12. My TradeNews | C1–C4 | 20 |
| **TOTAL** | **47 categories** | **247 submenus** |

---

## ⚠️ IMPORTANT NOTES FOR AI CODING ASSISTANTS

1. **Use Next.js App Router** — not Pages Router
2. **All navigation links** must use `<Link>` from `next/link`
3. **Mega menu data** must come from a single source of truth: `src/data/mega-menu-data.ts`
4. **About IGEN page** is a static page — no dynamic data needed at first
5. **Pro-gated content** — pages marked `(Pro+)` should redirect to `/reader-plans` if user is not Pro
6. **Dynamic routes** for sectors (`[sector]`) and countries (`[country]`) need `generateStaticParams()`
7. **Mobile first** — build responsive from 375px up
8. **Upgrade Hooks** are components, not just text — make them clickable CTAs

---

*Document generated from: IGEN NEWS 12 Mega Menu Architecture Vision Document*  
*Platform: www.indiaglobalnews.com*  
*Version: 1.0 | Build Instructions for AI Coding Assistants*
