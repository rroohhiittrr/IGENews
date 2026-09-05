# LinkedIn Premium Company Admin Panel & Analytics Hub — Walkthrough

## Summary of Completed Work

### 1. LinkedIn Admin Panel & 6 Analytics Sub-Tabs Fully Implemented
All 6 Analytics sub-tabs have been crafted with high fidelity matching LinkedIn Company Premium Admin aesthetics, pastel and royal executive tones, and zero mentions of job functions or titles:

1. **Content Analytics**:
   - Highlight KPIs (Impressions, Unique Viewers, Clicks, Reactions).
   - Dynamic SVG Trend Chart with selectable metric dropdown (`Impressions`, `Unique viewers`, `Clicks`, `Reactions`, `Comments`, `Reposts`).
   - Content Engagement data table categorized by `All`, `Articles`, `Media`, `Documents` with full-screen per-post drilldown modal.

2. **Visitors Analytics**:
   - Total Page Views & Unique Visitors KPI cards.
   - Dual-series SVG interactive graph with desktop vs. mobile toggles.
   - Page Filter Modal supporting `All pages`, `Overview`, `Our Vision`, `Offerings`, `Updates & Insights`, `Team`.
   - "Who's visited your Page" cards with blurred viewer gating for lower tiers.
   - Visitor Demographics (`Company size`, `Industry`, `Location`, `Seniority`).

3. **Followers Analytics**:
   - Total Followers, 30-Day Growth KPIs, and "Grow your audience" banner.
   - 3-Series SVG Line Chart (`Sponsored`, `Organic`, `Auto-invited`) with interactive date point inspection popovers.
   - Follower Demographics with "Show all" expandable ranking breakdown.
   - "All Followers" directory roster with segmented `People` and `Pages` tabs.

4. **Search Appearances Analytics**:
   - Total Search Appearances KPI and "Reach more audience" banner with 1-click Boostable Post selector modal.
   - "Who's visited your Page" search referral cards.
   - Top Search Keywords list with search icons and percentages.
   - Search Demographics filtered by `Company` (with custom logos) and `Industry`.

5. **Competitors Analytics**:
   - Competitor Highlights KPIs (`7 comments`, `1,410 new followers`).
   - Interactive **Edit Competitors Modal** enabling dynamic search, add, and remove of tracked rivals within plan quota (Startup: 3, Company: 10, Corporate: 25).
   - "Compare Growth" benchmark table across Gartner, World Economic Forum, CXO Lanes, FICCI, and ASSOCHAM.
   - Trending Competitor Posts feed & 3 Actionable Tips cards.

6. **Leads Analytics**:
   - Header with 1-click CSV leads export.
   - Interactive Leads Roster (Karan Johar, Shreya Venkat, Rohan Singhania) with lead metadata and download actions.
   - Empty state preview toggle with custom boost illustration.

---

### 2. Standardized 4-Tier Plan Architecture
- **Free Profile**: Basic listings, single administrator, standard public profile tabs, zero competitor tracking.
- **Startup Plan (₹2,999/mo)**: 1 Leader seat, 100 invite credits, 3 competitor benchmarks, standard demographics.
- **Company Plan (₹7,999/mo)**: 2 Leader seats, 300 invite credits, 10 competitor benchmarks, full visitor and search demography, XLS/CSV export.
- **Corporate Plan (₹19,999/mo)**: 5 Leader seats, 500 invite credits, 25 competitor benchmarks, real-time leads download, API access.

---

## 🎯 Overview
Implemented the complete **LinkedIn Premium Analytics Architecture** in the Company Admin Panel ([`CompanyDashboard.tsx`](file:///c:/Users/adity/Downloads/IGENews/components/profile/company/free/CompanyDashboard.tsx)) with full interactive support for all 6 analytics sub-tabs:
1. **Content Analytics** (Sub-Tab 1)
2. **Visitors Analytics** (Sub-Tab 2)
3. **Followers Analytics** (Sub-Tab 3)
4. **Search Appearances Analytics** (Sub-Tab 4)
5. **Competitors Analytics** (Sub-Tab 5)
6. **Leads Analytics** (Sub-Tab 6)

---

## 🛠️ Key Implementation Highlights

### 1. Tab 5: Competitors Analytics Module
- **Header & Edit Competitors Action**:
  - `Learn from other pages` banner + `Edit competitors` action with tier limit enforcement (Startup: 3, Company: 10, Corporate: 25).
- **Competitor Highlights Card**:
  - `7` comments on competitor posts (▼ `99.9%`).
  - `1,410` new followers across competitor set (▼ `81.4%`).
- **Interactive Competitors Benchmark Table**:
  - Direct comparative metrics against peer leaders: **Gartner** (2.25M), **World Economic Forum** (5.61M), **CXO Lanes** (508K), **FICCI** (243K), **ASSOCHAM** (113K).
  - Columns: `Competitors`, `New followers`, `Posts`, `Comments`, `Comments per day`, `Reactions`.
- **Trending Competitor Posts Feed**:
  - Live preview of top viral content from competitors with reactions, comments, and timestamps.
- **Tips to Stay Competitive**:
  - 3 action cards: `Grow your audience` (Invite connections), `Drive more engagement` (Create post), `Follow peer Pages` (Discover industry leaders).

---

### 2. Tab 6: Leads Analytics Module
- **Leads Header & Permission Notice**:
  - Title: **Download leads**
  - Subtext: *"Leads are available 1 year after submission. Not seeing lead data? Make sure you have the right permissions. [Learn more]"*
  - Interactive actions: `[Download All (.CSV)]` and toggle between `[View Captured Leads]` & `[Preview Empty State]`.
- **Zero-State Graphic & Call to Action**:
  - Custom SVG illustration of office desk workstation and mail/package delivery cart.
  - Headline: **No leads yet**
  - Subtext: *"You can start collecting leads by boosting your posts with a goal to get more leads."*
  - CTA Button: `[Boost a post for leads]`.
- **Active Inbound Leads Roster (Real-time synchronization)**:
  - Table showing real-time captured leads submitted via the public profile inquiry form.
  - Columns: `Lead Name`, `Organization`, `Email Address`, `Inquired Offering`, `Submission Date`, `Status`, `Action`.

## 🚀 Phase 1 & Strategic Stakeholder Perspectives Delivery

We have integrated the strategic modules from the 20-slide Master Strategy Blueprint into both the **Public Profile** ([`CompanyPublicProfile.tsx`](file:///c:/Users/adity/Downloads/IGENews/components/profile/company/CompanyPublicProfile.tsx)) and the **Plans & Pricing Experience** ([`profile/plans/company`](file:///c:/Users/adity/Downloads/IGENews/app/[locale]/(main)/profile/plans/company/page.tsx)) with 100% preservation of all existing LinkedIn Admin Panel tabs:

### 1. **Strategic Stakeholder Perspectives Hub (`Our Vision` Tab)**
- Built inside the **`Our Vision`** (`about`) tab on the public company page with 4 interactive lenses:
  - 📈 **Capital & Expansion Vision**: Showcases macro CapEx roadmap, facility expansion milestones, profitable operating stage, and a 1-click **"🔒 Request Corporate Pitch Deck & Growth Brief"** CTA (dispatches high-intent investor inquiries to the Admin Inbox without exposing confidential P&L spreadsheets).
  - 👥 **Culture & Talent Ethos**: Showcases engineering-first leadership philosophy, workplace policy, 94% senior retention rate, and university research partnerships.
  - 🤝 **Supply Chain & Strategic Partners**: Showcases Tier-1 approved vendor accreditations, multi-hub sourcing resilience, and prime banking standing.
  - 📢 **Brand, Media & Awards**: Showcases curated Top 10 sector authority, national media features, and verified canonical URL property.

### 2. **Global Trade Corridors & International Certifications Grid (Corporate Plan)**
- **Interactive Trade Route Gateways**: GCC (Port Jebel Ali), European Union (Port of Rotterdam), North America (Port of Houston), and ASEAN (Singapore Maritime Hub).
- **International Compliance Standards**: `BIS Certified (Valid 2028)`, `CE Mark (EU Verified)`, `US FDA Registered`, `AS9100D (Aerospace)`, and `ISO 9001:2015`.

### 3. **Definitive Competitor Comparison Table (`Slide 9`)**
- Head-to-head matrix contrasting **iGEN Company Page** vs. **LinkedIn Premium (₹14k–20k/mo)** vs. **X / Twitter Blue (₹16,790/mo)** vs. **IndiaMart (₹5k–15k/mo)**.
- Highlights: **Bundled Leader Profiles**, **1 in 10 Curated Sector Ranking**, and **SME-written editorial authority from ₹9,999/mo**.

### 4. **Scarcity & 48-Hour Sector Slot Reservation Engine (`Slide 15 & 17`)**
- Interactive **"Check Sector Availability & Reserve Slot"** widget across India's 50 GDP sectors with instant 48-hour hold.

### 5. **Pre-Handled Objection FAQs (`Slide 19`)**
- 6 high-conversion objection accordions addressing: *Platform novelty / 30-year ICE heritage*, *LinkedIn 1-in-900M noise*, *IndiaMart product SKU vs. trust asset*, *Blue Tick KYC value*, *Zero-maintenance turnkey onboarding*, and *Competitor already listed / 48-hr hold*.

---

## 🔒 Tier Separation Matrix (All 6 Sub-Tabs)

| Feature | **Free Profile** | **Startup Plan** | **Company Plan** | **Corporate Plan** |
| :--- | :--- | :--- | :--- | :--- |
| **Content Analytics** | Top 3 posts impressions | Full list (30 days) | **Full list (365 days)** + Real-time Real-world CTR | All-time history + Advanced export |
| **Visitors Analytics** | Overall page views | 30-day views + Basic demographics | **Desktop vs Mobile chart** + Custom button clicks | Full drill-down + Export |
| **Followers Analytics** | Total follower count | Total + 30-Day Growth + Organic | **All 3 series** (`Organic`, `Sponsored`, `Auto-invited`) | All 3 series + Attribution |
| **Search Appearances** | ❌ Locked | Top 2 keywords + Top 2 companies | **Full keyword list & searching orgs** | Full list + Competitor overlap |
| **Competitors Analytics** | ❌ Locked | Up to 3 tracked competitors | **Up to 10 tracked competitors** + Trending posts feed | **Up to 25 competitors** + Custom alerts |
| **Leads Analytics** | Empty state preview only | Up to 25 leads/mo (90-day retention) | **Unlimited leads** (1-year retention + .CSV export) | Unlimited + CRM Webhook sync |
| **Industry Feed & Following** | Read & Like feed | Follow up to 25 pages + Comment as Company | **Follow up to 100 pages** + Highlighted Verified Company badge | **Unlimited following** + Priority sector radar |
| **Activity & Notifications Hub** | 7-day activity stream | **30-day activity stream** + Direct `[Respond]` & `[Comment]` | **90-day activity stream** + Priority Mention notifications | **Unlimited archive** + Push webhook alerts & Sentiment tagging |
| **Services Hub & RFP Management** | Basic listing (3 services) | **Up to 10 services** + 5 Proposal submissions/mo | **Unlimited services & media** + 25 Proposal submissions/mo | **Unlimited services, proposals, custom RFP escrow & CRM contract pipeline** |
| **Invite Credits & Growth** | 0 credits | **100 credits/mo** | **300 credits/mo** + Auto-Invite Engagers | **500 credits/mo** + Auto-Invite + Automated Campaign Webhooks |
| **Admin Management & Roles** | 1 Admin (Owner) | **Up to 3 Admins** (Content Admin, Analyst) | **Up to 5 Admins** + Role permissions | **Unlimited Admins & Custom Audit Logging** |

---

## ⚙️ Main Tab: Settings Architecture (Interactive Modals)
- **Settings Rows (Exact Screenshot 1 Layout)**:
  1. **Manage admins** (`Control who manages your page`): Interactive admin roster with roles (`Super admin`, `Content admin`, `Analyst`) + `[+ Add admin]` prompt.
  2. **Manage restricted members** (`See all the restricted members`): Restricted user directory with reasons & `[Unrestrict]` action.
  3. **Manage following** (`See all the pages your page follows`): Follow/unfollow toggle list with search.
  4. **Inbox settings** (`Choose whether members can message the page and select conversation topics`): Toggle inbound commercial inquiries + custom topic tags (`Trade Expo Partnerships`, `Commercial Offerings & RFPs`, `Media & Press Inquiries`, `Speaker & Panel Opportunities`).
  5. **Manage content sharing [NEW]** (`Add your external content sources or make changes to your current sources`): Connected RSS / WordPress / Medium feeds + `[+ Connect new source]`.
  6. **Profile visibility & verified badges** (`Manage search appearances, verified blue checkmark, and public directory indexing`): Active plan indicator + Verification status.

---

## 🚀 Alternative Solution: Invite to Follow Hub
- **Executive Single-Pane Architecture** replacing the clunky 2-pane empty-column layout from LinkedIn:
  - **Credit Status**: Real-time counter (`300 / 300 credits available`).
  - **⚡ Auto-Invite Content Engagers (Premium Switch)**: One-click switch to automatically send invitations to 1st-degree connections who like or comment on posts.
  - **Quick Segment Chips**: `⭐ All Contacts`, `📍 Bengaluru`, `📍 Mumbai`, `📍 Delhi NCR`, `🏢 Tech & IT`, `🏭 Industry`.
  - **Batch Selection**: `[Select All Matching]` & `[Clear]`.
  - **Clean Contact Cards**: Compact row cards with avatar, headline, location tag, and quick select checkbox.
  - **Sticky Action Footer**: Live credit consumption counter + `[Send X Invites 🚀]` action with feedback toast.

---

## 💼 Main Tab: Services Architecture (3 Dedicated Sub-Tabs)
- **Left Services Sub-Navigation Rail**:
  - `Admin view` badge with company identity.
  - Sub-tabs: `Service page`, `Requests` (with counter badge), `Client projects`.
  - Questions? Help & Support link.
- **Sub-Tab 1: `Service page`**:
  - Top header with **`[Edit page]`** and **`[More]`** action buttons.
  - **Grow your services**: `Add info to your page` & `Upload work samples` cards.
  - **Overview**: Availability (`Remote or in person (Bengaluru South)`) and Pricing (`Contact for pricing`).
  - **Services provided**: Interactive category tag roster (*Trade Shows*, *Brand Marketing*, *Advertising*, *Digital Marketing*, *Growth Marketing*, *Lead Generation*, *Product Marketing*, *Search Engine Marketing*, *Social Media Marketing*, *Public Relations*).
  - **Media**: Showcase gallery with **`[+ Add media]`** action.
- **Sub-Tab 2: `Requests`**:
  - 2-Column Master-Detail client proposal manager.
  - **Left Rail**: Inbound `Premium requests` list (*Priyanshu Mani tripathi*, *virendra kumar*, *Anshul .*, *Lohith Raj*, *Kashi Ram*, *sahib chauhan*).
  - **Right Detail Pane**: Full client profile, channels, project scope goals, estimated budget, and **`[Submit proposal]`** / **`[No thanks]`** actions.
- **Sub-Tab 3: `Client projects`**:
  - Filter pill: `Active`.
  - Custom vector artwork illustrating client work management.
## ✍️ Create Modal Workspace (Screenshots 1, 2, 3, 4, 5)
- **Screenshot 1: Create Menu**:
  - `Start a post` (`Share content to connect with your followers`)
  - `Create an event` (`Host an event to grow your Page's community`)
  - `Share that you're hiring` (`Reach candidates outside your network with a job post`)
  - `Publish an article` (`Connect with followers through long-form content`)
  - `Create a newsletter` (`Publish articles about a specific topic to build a subscriber base`)
  - `Create an Ad` (`Generate leads, drive website traffic, and build brand awareness`)
  - `Add a product` (`Spotlight your organization's products`)
- **Publish an Article Canvas (Screenshot 1)**:
  - Sticky navigation bar: Company avatar + Name (`Individual article`), `Manage ▾` settings dropdown, and `Next →` publish action.
  - Rich formatting toolbar: `Style ▾`, `B` (Bold), `I` (Italic), bullet/numbered lists, blockquotes (`""`), code blocks (`{}`), horizontal divider (`—`), links (`🔗`), embed code (`</>`), and image attachments (`🖼️`).
  - Cover banner: `Add a cover image or video to your article` + `[ ⤒ Upload from computer ]`.
  - Large title header + body editor (`Write here. You can also include @mentions.`).
  - Bottom indicator: `● Draft auto-saved`.
- **Create a Newsletter Modal (Screenshot 2)**:
  - Header with `✕` close button & educational intro callout.
  - Form fields: `Newsletter title*`, `How often do you want to publish?*` (`Daily`, `Weekly`, `Biweekly`, `Monthly`), `Newsletter description*`.
  - Logo / Image uploader (`300x300 pixels`).
  - Subscriber announcement banner (`Your page followers will be invited to subscribe`).
  - Actions: `[Cancel]` & `[Done]`.
- **Create an Ad Campaign Builder (Executive Solution)**:
  - Objective selector: `Brand Awareness`, `Website Traffic`, `Lead Generation`, `Event Attendance`.
  - Ad copy & creative manager: Headline, Primary text, CTA selector (`Contact Sales`, `Request Quote`, `Learn More`, `Download Brochure`).
  - Budget & Duration calculator with live ROI projection (`24,500 - 65,000 Impressions`, `720 - 1,480 CXO clicks`).
  - Action: `[Launch Campaign 🚀]`.
- **Spotlight a Product / Solution (Executive Solution)**:
  - Product Name, Category (*Industrial Robotics, AI Vision, Sorting Conveyors, Automation Software*), Tagline, Technical Specifications & ERP APIs, Pricing Model, and CTA (`Request Demo`, `Download Spec Sheet`, `Contact Sales`).
  - Action: `[Add Product ✨]`.
- **Share That You're Hiring**:
  - Role title, Workplace policy (Hybrid/Remote/On-site), Employment type, Requirements & Skills.
  - Action: `[Post Opportunity 💼]`.

