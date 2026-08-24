# IGEN WORLD — EOI FORM FRONTEND
## Complete Vibe Coding AI Agent Instruction Document
### Issued by: IGEN World | India Global Expo News Platform Pvt Ltd
### Document Type: Frontend-Only Build Instructions for AI Agent
### Version: 1.0

---

## TABLE OF CONTENTS

1. [Project Overview & Purpose](#1-project-overview--purpose)
2. [Tech Stack & Architecture](#2-tech-stack--architecture)
3. [Design System & Brand Guidelines](#3-design-system--brand-guidelines)
4. [Page Architecture — Full Landing Page](#4-page-architecture--full-landing-page)
5. [Product Catalogue — All 15 Products](#5-product-catalogue--all-15-products)
6. [Stage 1 — Hero CTA & Product Selection](#6-stage-1--hero-cta--product-selection)
7. [Stage 2 — Dynamic Product Info Display](#7-stage-2--dynamic-product-info-display)
8. [Stage 3 — Multi-Stage Progressive Form Fields](#8-stage-3--multi-stage-progressive-form-fields)
9. [Per-Product Dynamic Form Fields Reference](#9-per-product-dynamic-form-fields-reference)
10. [Progress Bar — Mandatory Specification](#10-progress-bar--mandatory-specification)
11. [Stage 4 — Thank You & Next Steps (Per Product)](#11-stage-4--thank-you--next-steps-per-product)
12. [Embeddability Rules — Any Platform](#12-embeddability-rules--any-platform)
13. [UX Rules — Dos and Don'ts](#13-ux-rules--dos-and-donts)
14. [Mobile-First Specifications](#14-mobile-first-specifications)
15. [State Management & Local Storage](#15-state-management--local-storage)
16. [Component Breakdown Checklist for AI Agent](#16-component-breakdown-checklist-for-ai-agent)

---

## 1. PROJECT OVERVIEW & PURPOSE

### What You Are Building

You are building a **single-page, frontend-only EOI (Expression of Interest) Form** for **IGEN World** — India's First AI-Powered Trade Intelligence & Industry Ecosystem Platform.

This EOI form is the **pre-launch demand engine** for IGEN. It must:

- Work as a **standalone embeddable page** that can be hosted on any website, social media landing page, QR code destination, WhatsApp link, email CTA, or IGEN's own sales websites.
- Collect **Expressions of Interest** for **15 different IGEN products** through a single unified form.
- Be **mobile-first**, ultra-fast on Step 1, and progressive in depth.
- Feel like **joining a founding movement**, not filling a basic enquiry form.
- Have **zero backend dependency** — all data handling through browser localStorage and a visible JSON output or webhook-ready data object that the backend team can plug into later.

### Why This Form Exists

IGEN follows the principle: **EOI First. Platform Next.**

The MERN platform is still in development. This form captures real market demand NOW — before full tech launch — so that when the platform goes live, IGEN already has:

- A warm database of leads
- Qualified prospects by product type
- City-wise and sector-wise segmentation
- A founding-member movement with FOMO built in

### Non-Negotiable Founder Directive

> *"EOI is not just a form. EOI is our pre-launch sales engine, our demand creation engine, our lead database engine, our founding-member engine, our content engine, our network engine, our sales conversion engine."*
>
> — **Vijay Singh, Founder, India Global Expo News Platform Pvt Ltd**

---

## 2. TECH STACK & ARCHITECTURE

### Recommended Stack

```
HTML5 + CSS3 + Vanilla JavaScript (ES6+)
OR
React (Single Component, No Dependencies Except React)
```

**Primary Recommendation: HTML + CSS + Vanilla JS**

Reason: Maximum portability. Can be embedded in WordPress (Elementor), social media landing pages, Linktree-style pages, WhatsApp-linked pages, email campaigns, QR code destinations — without any framework dependency.

### File Structure

```
/igen-eoi-form/
├── index.html          ← Main entry file (entire form lives here)
├── style.css           ← All styles (or embed in <style> tag)
├── script.js           ← All logic (or embed in <script> tag)
└── README.md           ← Deployment notes
```

**Important for AI Agent:** The AI agent may also produce this as a **single self-contained HTML file** (all CSS in `<style>`, all JS in `<script>`) which is the most portable and embeddable format. Prefer single-file output.

### No Backend Required

- All form data is stored in **`localStorage`** under the key `igen_eoi_submission`.
- On final submission, the form logs a `console.log` with the full JSON object.
- A **copy-to-clipboard button** on the Thank You screen lets the user or admin copy the submission JSON.
- The form is designed so the backend team (Sanjay Shah / Rohit Singh) can later attach a webhook URL in one line:
  ```javascript
  const WEBHOOK_URL = ""; // Backend team fills this in
  ```
- If `WEBHOOK_URL` is non-empty, the form POSTs JSON to that URL on submission.

---

## 3. DESIGN SYSTEM & BRAND GUIDELINES

### Color Palette

```css
:root {
  --igen-primary: #0A2463;        /* Deep Navy Blue — primary brand */
  --igen-secondary: #E63946;      /* IGEN Red — CTA, urgency, FOMO */
  --igen-gold: #F4A261;           /* Gold — founding member highlight */
  --igen-green: #2A9D8F;          /* Teal Green — success states */
  --igen-light-bg: #F8F9FA;       /* Off-white background */
  --igen-white: #FFFFFF;
  --igen-dark-text: #1A1A2E;      /* Near-black body text */
  --igen-muted-text: #6C757D;     /* Muted secondary text */
  --igen-border: #DEE2E6;         /* Form borders */
  --igen-progress-bg: #E9ECEF;    /* Progress bar track */
  --igen-step-inactive: #CED4DA;  /* Inactive step indicator */
  --igen-overlay: rgba(10, 36, 99, 0.92); /* Hero overlay */
}
```

### Typography

```css
/* Import from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Poppins:wght@600;700;800&display=swap');

:root {
  --font-body: 'Inter', sans-serif;
  --font-heading: 'Poppins', sans-serif;
}

/* Type Scale */
h1: 36px / 700 weight / Poppins
h2: 28px / 700 weight / Poppins
h3: 22px / 600 weight / Poppins
body: 16px / 400 weight / Inter
label: 14px / 500 weight / Inter
caption/hint: 12px / 400 weight / Inter
```

### Spacing System

```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 40px;
--space-2xl: 64px;
```

### Border Radius

```css
--radius-sm: 6px;
--radius-md: 12px;
--radius-lg: 20px;
--radius-pill: 50px;
```

### Shadows

```css
--shadow-card: 0 4px 24px rgba(10, 36, 99, 0.10);
--shadow-cta: 0 8px 32px rgba(230, 57, 70, 0.30);
--shadow-active: 0 0 0 3px rgba(10, 36, 99, 0.20);
```

---

## 4. PAGE ARCHITECTURE — FULL LANDING PAGE

The full page has these sections in order:

```
[SECTION 1] — HERO BANNER (CTA + Product Selection Entry)
[SECTION 2] — WHY IGEN? (3-column trust builder)
[SECTION 3] — EOI FORM MODULE (The entire multi-step form)
[SECTION 4] — FOUNDING MEMBER FOMO STRIP
[SECTION 5] — WHAT HAPPENS AFTER EOI? (Step-by-step workflow)
[SECTION 6] — FOOTER (Brand + contact)
```

All sections except the Hero and Form are **static content sections** to build trust and FOMO **before** and **around** the form.

The **EOI Form Module (Section 3)** is the core functional build.

---

## 5. PRODUCT CATALOGUE — ALL 15 PRODUCTS

These are the 15 products for which EOI is being collected. The form must support all 15 via the product selection dropdown.

### IGEN NEWS Platform Products (5)

| # | Product ID | Display Name | Tagline |
|---|-----------|-------------|---------|
| 1 | `sme_page` | SME Page | Your Industry Authority & Discovery Engine |
| 2 | `associate_sme` | Associate SME Page | Emerging Expert Visibility Platform |
| 3 | `company_page` | Company Page | Digital Trust & Brand Infrastructure |
| 4 | `leader_page` | Leader Page | Executive Leadership Identity |
| 5 | `reader_plan` | Reader Upgrade Plan | AI-Powered Industry Intelligence |

### IGEN EXPO Platform Products (5)

| # | Product ID | Display Name | Tagline |
|---|-----------|-------------|---------|
| 6 | `indian_exporter` | Indian Exporters Page | Get Discovered by 195 Countries |
| 7 | `global_importer` | Global Importers Page | Discover India's Best Suppliers |
| 8 | `global_exporter` | Global Exporters Page | Enter India's Fastest-Growing Market |
| 9 | `indian_importer` | Indian Importers Page | Global Sourcing Made Intelligent |
| 10 | `service_provider` | Service Providers Page | Trade Services Lead Generation |

### Common Products (5)

| # | Product ID | Display Name | Tagline |
|---|-----------|-------------|---------|
| 11 | `igen_awards` | IGEN Awards | India's Most Prestigious Industry Recognition |
| 12 | `viksit_bharat_conf` | Viksit Bharat Conference | India's Vision 2047 Industry Summit |
| 13 | `affiliate_partner` | Affiliate Partner | Earn by Growing IGEN |
| 14 | `reseller_partner` | Reseller Partner | Build Your Business on IGEN |
| 15 | `founding_stakeholder` | Founding Stakeholder | Be Part of India's Industry Intelligence Revolution |

---

## 6. STAGE 1 — HERO CTA & PRODUCT SELECTION

### Hero Banner Specifications

**Background:** Full-width, dark navy gradient overlay on a subtle abstract pattern or India map silhouette graphic. Color: `--igen-overlay` over a dark textured background.

**Hero Content Structure:**

```
[TOP BADGE]
🇮🇳  India's First AI-Powered Trade Intelligence & Industry Ecosystem Platform

[MAIN HEADLINE — h1]
Become a Founding Member of IGEN World
Before Everyone Else Joins.

[SUBHEADLINE — p]
IGEN News | IGEN Expo | IGEN Awards | Viksit Bharat Conference
15 Products. One Ecosystem. Unlimited Opportunity.

[COUNTER STRIP]
🔴 LIVE  |  [XXX] EOIs Submitted  |  [XX] Cities  |  [X] Countries

[PRIMARY CTA BUTTON — Large, Red, Pill-shaped]
→ Express Your Interest Now — It's Free

[MICRO-COPY BELOW BUTTON]
Takes less than 60 seconds. No payment. No commitment. Just your interest.
```

**Counter Strip:** Show placeholder numbers: `847 EOIs Submitted | 42 Cities | 8 Countries`. These are mock numbers for the frontend. The backend team will wire these up.

**CTA Button Behavior:** Clicking the CTA button smoothly scrolls the page down to **Section 3 — The EOI Form Module** and auto-focuses the **Product Selection dropdown**.

---

### Product Selection — The Gateway Interaction

This is the **most important UX interaction** on the entire page.

**Placement:** Top of the EOI Form Module, before Step 1 of the form begins.

**Label:**
```
What are you interested in?
Select a product to see your benefits and begin your application.
```

**Dropdown / Card Grid Design:**

Option A (recommended for desktop): A **visual card grid** showing all 15 products as clickable tiles grouped by platform. Each tile has:
- Platform badge (IGEN NEWS / IGEN EXPO / Common)
- Product icon (emoji or SVG icon)
- Product name (bold)
- One-line tagline
- "Select →" link

Option B (mobile fallback): A styled `<select>` dropdown with `<optgroup>` for each platform group.

**Both options must exist** — show card grid on desktop (`min-width: 768px`), dropdown on mobile.

**After Selection:**
- Selected product is highlighted with a border in `--igen-primary`
- A product info panel slides/fades in below the selection (see Section 7)
- The Step 1 form section becomes visible

---

## 7. STAGE 2 — DYNAMIC PRODUCT INFO DISPLAY

After the user selects a product, before they fill the form, show a **dynamic info panel** that:

1. Reinforces their decision
2. Lists key benefits of the selected product
3. Creates FOMO (founding member language)

### Info Panel Structure Per Product

**Component Layout:**

```
[PRODUCT ICON]  [PRODUCT NAME]  [PLATFORM BADGE]

[HEADLINE — Product-specific emotional hook]

[BENEFITS LIST — 5–6 bullet points]

[FOMO STRIP]
🔴 Only [X] Founding Member Slots Available in Your City

[PROCEED CTA]
→ Begin My Application
```

### Product Info Data — All 15 Products

Build a JavaScript object `PRODUCT_INFO` with this data:

```javascript
const PRODUCT_INFO = {

  sme_page: {
    name: "SME Page",
    platform: "IGEN NEWS",
    icon: "🏆",
    headline: "Your 20 Years of Experience Deserves a National Stage.",
    benefits: [
      "Get Discovered by Companies, Investors & Industry Leaders",
      "Thought Leadership Articles — Build Your Authority",
      "Consulting Marketplace — Earn from Your Expertise",
      "Sector Business Report Writing — ₹10K–₹25K per page",
      "Opportunity to Become an Industry Awards Judge",
      "Top SME Ranking — Daily Visibility on Platform"
    ],
    fomo: "Only 100 Founding SME Slots — Year 1 Membership is FREE for the first 100.",
    cta: "Apply as a Founding SME"
  },

  associate_sme: {
    name: "Associate SME Page",
    platform: "IGEN NEWS",
    icon: "🌱",
    headline: "Build Your Industry Identity Before You Become the Top SME.",
    benefits: [
      "Visibility as an Emerging Industry Expert",
      "Entry into the Consulting Marketplace",
      "Association with Top SMEs in Your Sector",
      "City-Level Networking & Partnership Opportunities",
      "Path to Full SME Status as Your Profile Grows",
      "Founding Member Badge — Be First in Your City"
    ],
    fomo: "Associate SME applications are being screened carefully. First 100 spots go through due diligence.",
    cta: "Apply as Associate SME"
  },

  company_page: {
    name: "Company Page",
    platform: "IGEN NEWS",
    icon: "🏢",
    headline: "Build India's Most Trusted Digital Company Identity.",
    benefits: [
      "Verified Company Profile — Blue Tick Trust Credential",
      "Google-Indexed Company Page with SEO Schema",
      "Investor, Employee, Stakeholder & Brand Sub-tabs",
      "Bundled Free Leader Pages for Your Executives",
      "Sector Ranking Visibility — Be Discovered by Buyers",
      "Award Badges — Win and Display on Your Page"
    ],
    fomo: "Founding Company Pages get permanent front-page discovery advantage in their sector.",
    cta: "Register Company Interest"
  },

  leader_page: {
    name: "Leader Page",
    platform: "IGEN NEWS",
    icon: "👔",
    headline: "Your Leadership Profile Must Work as Hard as You Do.",
    benefits: [
      "Executive Identity Page — CEO, CFO, CTO, Founder, MD",
      "Discoverable by Investors, Board Committees & Executive Search",
      "Thought Leadership Publishing on India's Industry Platform",
      "Page Portability — Your Page Travels With You",
      "Speaking Authority on IGEN Events & Conferences",
      "Leadership Awards Nomination — Permanent Credential"
    ],
    fomo: "Founding Leader Pages get priority nomination in the inaugural IGEN Awards cycle.",
    cta: "Claim Your Leader Page"
  },

  reader_plan: {
    name: "Reader Upgrade Plan",
    platform: "IGEN NEWS",
    icon: "📰",
    headline: "Stop Being Overwhelmed. Start Making Smarter Industry Decisions.",
    benefits: [
      "AI-Curated News Across 50 Sectors — No Noise",
      "Trade Intelligence Reports — Country & Sector Level",
      "SME Consulting Access — Book Industry Experts",
      "Founding Member Recognition — First 500 Readers",
      "Early Access to IGEN Awards & Conference Programs",
      "Sector Discovery — Find Companies, Leaders & SMEs"
    ],
    fomo: "First 500 Founding Readers get permanent Founding Member recognition badge.",
    cta: "Join as Founding Reader"
  },

  indian_exporter: {
    name: "Indian Exporters Page",
    platform: "IGEN EXPO",
    icon: "🚢",
    headline: "Get Discovered by Buyers in 195 Countries.",
    benefits: [
      "Verified Indian Exporter Profile — Global Discoverability",
      "195-Country Trade Intelligence — Know Your Best Markets",
      "Bilateral Trade Insights — Sector-Wise Export Data",
      "Government Policy Alerts — Stay Ahead of Regulations",
      "Export Opportunity Alerts — Real-Time Buyer Signals",
      "Sector Ranking — Be the First Exporter Buyers Find"
    ],
    fomo: "Founding Exporter pages get top-ranked discovery in their sector at launch.",
    cta: "Register Exporter Interest"
  },

  global_importer: {
    name: "Global Importers Page",
    platform: "IGEN EXPO",
    icon: "🌐",
    headline: "Discover India's Most Verified Suppliers — All in One Place.",
    benefits: [
      "India Sourcing Intelligence — 50 Sectors, 1200 Industries",
      "Verified Indian Supplier Discovery — Trust First",
      "Bilateral Trade Data — Make Data-Driven Sourcing Decisions",
      "SME Expert Consultation — Book India Sector Specialists",
      "Quality Verification Signals — Blue-Tick Suppliers",
      "Direct Connection to Indian Exporters on Platform"
    ],
    fomo: "Register early to get first-mover supplier matching when the platform launches.",
    cta: "Register Importer Interest"
  },

  global_exporter: {
    name: "Global Exporters Page",
    platform: "IGEN EXPO",
    icon: "✈️",
    headline: "Enter India's Fastest-Growing Market with Intelligence.",
    benefits: [
      "India Market Entry Intelligence — Regulations, Tariffs, Buyers",
      "Indian Buyer Discovery — 50 Sectors, Verified Importers",
      "Compliance & Regulatory Intelligence — Export-Ready",
      "Sector-Wise Indian Market Demand Data",
      "Direct Access to Indian Importer Profiles",
      "Trade Zone Intelligence — ASEAN, EU, GCC Cross-Border Data"
    ],
    fomo: "Early registrations get priority matching with Indian importers at platform launch.",
    cta: "Register Global Export Interest"
  },

  indian_importer: {
    name: "Indian Importers Page",
    platform: "IGEN EXPO",
    icon: "📦",
    headline: "Source Globally. Import Intelligently.",
    benefits: [
      "Global Supplier Discovery — 195-Country Coverage",
      "Import Intelligence — Tariffs, Duties, Compliance Alerts",
      "Verified Global Supplier Profiles",
      "Bilateral Trade Data — Best Source Countries by Sector",
      "EXIM Compliance Alerts — Never Miss a Policy Change",
      "Sector Expert Consultation — Import Strategy Sessions"
    ],
    fomo: "Founding Indian Importer profiles get early access to global supplier matching engine.",
    cta: "Register Importer Interest"
  },

  service_provider: {
    name: "Service Providers Page",
    platform: "IGEN EXPO",
    icon: "🤝",
    headline: "Be the First Service Provider Exporters & Importers Find.",
    benefits: [
      "Lead Generation Engine — Buyers Find YOU",
      "Verified Service Profile — EXIM-Focused Trust Signal",
      "Industry Networking — Connect with Exporters & Importers",
      "Sector-Specific Discovery — Appear in Right Industry Context",
      "IGEN Expo Event Participation Priority",
      "Awards & Recognition — Service Excellence Category"
    ],
    fomo: "Service Provider pages at launch get maximum sector visibility before competition joins.",
    cta: "Register Service Provider Interest"
  },

  igen_awards: {
    name: "IGEN Awards",
    platform: "IGEN COMMON",
    icon: "🏅",
    headline: "India's Most Comprehensive AI-Hosted Industry Recognition.",
    benefits: [
      "6 Award Categories Per Sector — Leadership, Innovation, Brand, Export, MSME, ESG",
      "City-Wise Award Events Across India",
      "Permanent Award Badge on Your IGEN Page",
      "Verified SME Jury System — Most Credible Recognition",
      "Indexed in Trade Intelligence Lab — Permanent Discovery",
      "Nomination Open First to IGEN Founding Page Holders"
    ],
    fomo: "Founding Members participate in the Inaugural IGEN Awards — the most prestigious first-edition recognition.",
    cta: "Register Awards Interest"
  },

  viksit_bharat_conf: {
    name: "Viksit Bharat Conference",
    platform: "IGEN COMMON",
    icon: "🇮🇳",
    headline: "India's Vision 2047 Industry Summit. Be There at the Beginning.",
    benefits: [
      "National Industry Conference — Aligned with Viksit Bharat 2047 Mission",
      "Delegate | Speaker | Partner | Sponsor Opportunities",
      "Government Officials, Industry Leaders & Trade Associations",
      "50-Sector Industry Representation",
      "Media Coverage — IGEN News Platform",
      "Networking with India's Top Industry Decision-Makers"
    ],
    fomo: "Founding Conference delegates get reserved seating and inaugural session recognition.",
    cta: "Register Conference Interest"
  },

  affiliate_partner: {
    name: "Affiliate Partner",
    platform: "IGEN COMMON",
    icon: "🔗",
    headline: "Earn by Introducing India's Biggest Industry Ecosystem to Your Network.",
    benefits: [
      "Commission on Every Successful Referral",
      "IGEN-Branded Affiliate Tools & Collateral",
      "Real-Time Referral Tracking Dashboard",
      "Access to All IGEN Brochures & Sales Material",
      "Training & Onboarding by IGEN Team",
      "Scale Unlimited — The Larger Your Network, the Higher Your Earnings"
    ],
    fomo: "Founding Affiliates get priority onboarding and higher commission rates in Year 1.",
    cta: "Apply as Affiliate Partner"
  },

  reseller_partner: {
    name: "Reseller Partner",
    platform: "IGEN COMMON",
    icon: "💼",
    headline: "Build Your Business on India's Industry Intelligence Infrastructure.",
    benefits: [
      "Resell IGEN Products in Your City / Region",
      "White-Label or Co-Branded Sales Collateral",
      "Revenue Share on All Products Sold",
      "Dedicated Account Manager from IGEN Team",
      "City Exclusivity Possible for First Resellers",
      "Be Part of India's Largest Industry Ecosystem from Day One"
    ],
    fomo: "Founding Resellers in Tier 1 and Tier 2 cities may get city-level exclusivity — very limited slots.",
    cta: "Apply as Reseller Partner"
  },

  founding_stakeholder: {
    name: "Founding Stakeholder",
    platform: "IGEN COMMON",
    icon: "🌟",
    headline: "Be Part of Building India's Most Ambitious Industry Intelligence Company.",
    benefits: [
      "Founding Stakeholder Status — Lifetime Recognition",
      "Early Investor or Strategic Partner Consideration",
      "Platform Advisory Input — Shape the IGEN Roadmap",
      "Priority Access to All IGEN Products & Events",
      "Founding Stakeholder Badge — Permanent Platform Identity",
      "Direct Access to Founder Vijay Singh for Strategic Discussion"
    ],
    fomo: "Founding Stakeholder conversations are strictly limited. Request a meeting now.",
    cta: "Express Founding Stakeholder Interest"
  }

};
```

---

## 8. STAGE 3 — MULTI-STAGE PROGRESSIVE FORM FIELDS

### Form Architecture Overview

The form is divided into **4 steps**. Steps are shown one at a time. The progress bar updates after each step.

```
[STEP 1 — QUICK INTEREST]     → Under 20 seconds. Ultra-fast entry.
[STEP 2 — BUSINESS PROFILE]   → Company/business details
[STEP 3 — PRODUCT DEEP DIVE]  → Product-specific fields (dynamic per selection)
[STEP 4 — INTENT & GOALS]     → Why joining, goals, referral source
[THANK YOU SCREEN]            → Confirmation + next steps (per product)
```

### Step 1 — Quick Interest (Universal for All Products)

**Headline:** "Step 1 of 4 — Let's Start. Just 20 Seconds."

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Full Name | Text input | ✅ Yes | Placeholder: "Your Full Name" |
| Mobile Number | Tel input | ✅ Yes | India format: +91 prefix shown, 10-digit number |
| Email Address | Email input | ✅ Yes | Placeholder: "your@email.com" |
| City | Text input | ✅ Yes | Placeholder: "Your City" — optionally add city autocomplete |
| Interested In | Dropdown (pre-filled) | ✅ Yes | Pre-filled with selected product. User can change. |

**Submit Button Label:** `Continue →  (Step 1 of 4)`

**After Step 1 Submit:**
- Save Step 1 data to `localStorage`
- Auto-show a toast: ✅ "You're in! Your application has been saved. Continue to Step 2."
- Immediately slide to Step 2

**Important:** After Step 1 is submitted, even if the user abandons, the lead is captured. Show a message on Step 2 onwards:
```
💾 Your progress is auto-saved. You can return anytime to complete your application.
```

---

### Step 2 — Business Profile (Universal for All Products)

**Headline:** "Step 2 of 4 — Tell Us About Your Business"

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Company / Organisation Name | Text input | ✅ Yes | For reader plan: "Company or Institution (if applicable)" |
| Industry Sector | Dropdown | ✅ Yes | See Sector List below |
| Your Role / Designation | Text input | ✅ Yes | Placeholder: "Founder / CEO / Director / Manager" |
| Website URL | URL input | ❌ No | Placeholder: "www.yourcompany.com" |
| Business Category | Radio buttons | ✅ Yes | Options: Startup | SME / MSME | Large Enterprise | Individual Professional | Government Body |
| Years in Business / Industry | Dropdown | ✅ Yes | Options: Less than 1 year | 1–3 years | 3–5 years | 5–10 years | 10–20 years | 20+ years |

**Sector Dropdown — 15 Priority Sectors (expandable):**

```
Agriculture & Food Processing
Automotive & EV
Banking & Financial Services
Chemicals & Petrochemicals
Defence & Aerospace
Education & Ed-Tech
Energy & Renewables
Engineering & Capital Goods
Healthcare & Pharma
IT & Technology
Infrastructure & Real Estate
Logistics & Supply Chain
Manufacturing & MSME
Retail & E-Commerce
Textiles & Apparel
Other (specify)
```

**Submit Button Label:** `Continue →  (Step 2 of 4)`

---

### Step 3 — Product-Specific Fields (Dynamic Per Product)

**Headline:** `Step 3 of 4 — Your [PRODUCT NAME] Details`

This step's fields **change dynamically** based on the product selected.

See **Section 9** for the complete per-product field specification.

**Submit Button Label:** `Continue →  (Step 3 of 4)`

---

### Step 4 — Intent & Goals (Universal for All Products)

**Headline:** "Step 4 of 4 — Almost Done! Tell Us Your Goals."

**Fields:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| Why are you interested in IGEN? | Textarea | ✅ Yes | Min 20 chars. Placeholder: "Tell us what excites you about IGEN..." |
| What do you hope to achieve? | Textarea | ❌ No | Placeholder: "What business outcome are you looking for?" |
| How did you hear about IGEN? | Dropdown | ✅ Yes | Options: WhatsApp | LinkedIn | Google Search | Friend / Colleague Referral | IGEN Team Member | Event / Exhibition | Email Campaign | Other |
| Referral Name (if any) | Text input | ❌ No | Only show if "Friend / Colleague Referral" or "IGEN Team Member" is selected |
| Are you interested in more than one IGEN product? | Checkbox group | ❌ No | Show all 15 products as checkboxes. Pre-check the product already selected. |
| Any questions or comments? | Textarea | ❌ No | Placeholder: "Anything you'd like us to know?" |
| I agree to be contacted by the IGEN team | Checkbox | ✅ Yes | Required to submit |

**Final Submit Button:**
```
[Large, Red, Full-Width Button]
🎉  Submit My IGEN Application
```

**Below button micro-copy:**
```
By submitting, you agree to be contacted by the IGEN team.
Your information is safe. No spam. No payment required.
```

---

## 9. PER-PRODUCT DYNAMIC FORM FIELDS REFERENCE

### Step 3 Fields for Each Product

---

#### 9.1 SME Page (`sme_page`)

| Field | Type | Required |
|-------|------|----------|
| Your Primary Industry / Sector of Expertise | Dropdown (same sector list) | ✅ Yes |
| Years of Professional Experience | Dropdown: 5–10 yrs / 10–15 yrs / 15–20 yrs / 20–25 yrs / 25+ yrs | ✅ Yes |
| Your Top Areas of Expertise (Consulting Topics) | Textarea | ✅ Yes |
| Do you currently offer consulting services? | Radio: Yes / No / Planning to | ✅ Yes |
| LinkedIn Profile URL | URL input | ❌ No |
| Have you written industry articles or reports? | Radio: Yes / No | ✅ Yes |
| Are you interested in joining the IGEN Awards Jury? | Radio: Yes / Maybe / No | ❌ No |
| Preferred SME Plan | Radio: Founding SME (Free Year 1) / Standard SME | ✅ Yes |

---

#### 9.2 Associate SME Page (`associate_sme`)

| Field | Type | Required |
|-------|------|----------|
| Your Primary Sector of Work | Dropdown | ✅ Yes |
| Years of Industry Experience | Dropdown: 5–10 yrs / 10–15 yrs / 15+ yrs | ✅ Yes |
| Current Role / Designation | Text input | ✅ Yes |
| What expertise do you want to be known for? | Textarea | ✅ Yes |
| LinkedIn Profile URL | URL input | ❌ No |
| Are you interested in growing to Full SME status? | Radio: Yes / Not Sure | ❌ No |
| City — are you an active professional networker in your city? | Radio: Yes / Growing My Network | ✅ Yes |

---

#### 9.3 Company Page (`company_page`)

| Field | Type | Required |
|-------|------|----------|
| Company Legal Name | Text input | ✅ Yes |
| Company Type | Dropdown: Startup / Private Ltd / Public Ltd / LLP / Proprietorship / Other | ✅ Yes |
| Year of Founding | Number input (year) | ✅ Yes |
| Primary Sector | Dropdown | ✅ Yes |
| Number of Employees | Dropdown: 1–10 / 11–50 / 51–200 / 201–500 / 500+ | ✅ Yes |
| Do you have existing Leader Pages to bundle? | Radio: Yes / No / Not Sure | ❌ No |
| Preferred Company Page Tier | Radio: Silver / Gold / Platinum / Not Sure Yet | ❌ No |
| What do you want buyers/investors to discover about your company? | Textarea | ✅ Yes |

---

#### 9.4 Leader Page (`leader_page`)

| Field | Type | Required |
|-------|------|----------|
| Leader Full Name | Text input | ✅ Yes |
| Designation | Dropdown: CEO / CFO / CTO / CIO / CHRO / CSO / Founder / Co-Founder / Managing Director / Board Director / Government Official / Trade Official / Other | ✅ Yes |
| Current Company Name | Text input | ✅ Yes |
| Primary Industry / Sector | Dropdown | ✅ Yes |
| LinkedIn Profile URL | URL input | ❌ No |
| Is this a self-application or company-sponsored? | Radio: Self / Company-Sponsored | ✅ Yes |
| What is the primary goal for your Leader Page? | Checkbox (multi-select): Investor Visibility / Board Opportunities / Executive Search / Thought Leadership / Speaking Engagements / Personal Brand | ✅ Yes |

---

#### 9.5 Reader Upgrade Plan (`reader_plan`)

| Field | Type | Required |
|-------|------|----------|
| Sectors of Interest (select up to 5) | Multi-checkbox with sector list | ✅ Yes |
| How do you currently consume industry news? | Checkbox: Google News / LinkedIn / Industry Newsletters / WhatsApp Groups / Other | ✅ Yes |
| Primary reason for upgrading | Dropdown: Stay informed on sector / Find industry experts / Business intelligence for decisions / Investment research / General knowledge | ✅ Yes |
| Are you interested in booking SME consultations? | Radio: Yes / Maybe / No | ❌ No |
| Preferred Plan | Radio: Basic Reader / Professional Reader / Pro Plus Reader / Not Sure | ❌ No |

---

#### 9.6 Indian Exporters Page (`indian_exporter`)

| Field | Type | Required |
|-------|------|----------|
| Company Legal Name | Text input | ✅ Yes |
| Primary Export Product / Service Category | Textarea | ✅ Yes |
| Primary Export Destination Countries | Text input | ✅ Yes |
| Annual Export Turnover (approx.) | Dropdown: Under ₹1 Cr / ₹1–5 Cr / ₹5–25 Cr / ₹25–100 Cr / ₹100 Cr+ / Prefer not to say | ✅ Yes |
| IEC (Importer Exporter Code) — Do you have one? | Radio: Yes / Applied / No | ✅ Yes |
| Export Sector | Dropdown (sector list) | ✅ Yes |
| Target Markets you want to expand into | Textarea | ❌ No |
| Are you government-certified / award-winning exporter? | Radio: Yes / No | ❌ No |

---

#### 9.7 Global Importers Page (`global_importer`)

| Field | Type | Required |
|-------|------|----------|
| Company Name / Organisation | Text input | ✅ Yes |
| Country of Origin | Text input | ✅ Yes |
| Primary Product Categories You Want to Import from India | Textarea | ✅ Yes |
| Sectors of Interest for Indian Sourcing | Dropdown (sector list) | ✅ Yes |
| Annual Import Volume (approx.) | Dropdown: Under USD 100K / USD 100K–500K / USD 500K–2M / USD 2M+ / Not Specified | ❌ No |
| How do you currently find Indian suppliers? | Checkbox: Trade Fairs / Directories / Cold Outreach / Referrals / Other | ✅ Yes |
| Are you looking for verified, audited Indian suppliers? | Radio: Yes / Partially / Just Exploring | ✅ Yes |

---

#### 9.8 Global Exporters Page (`global_exporter`)

| Field | Type | Required |
|-------|------|----------|
| Company Name | Text input | ✅ Yes |
| Country of Origin | Text input | ✅ Yes |
| Primary Products / Services You Export | Textarea | ✅ Yes |
| Target Sector in India | Dropdown | ✅ Yes |
| Do you currently export to India? | Radio: Yes / Exploring / Not Yet | ✅ Yes |
| Main challenge entering India market | Dropdown: Finding Buyers / Regulations / Tariffs / Distribution / Other | ✅ Yes |
| Preferred India Market Entry Mode | Dropdown: Direct B2B / Distributor / Agent / Joint Venture / Other | ❌ No |

---

#### 9.9 Indian Importers Page (`indian_importer`)

| Field | Type | Required |
|-------|------|----------|
| Company Name | Text input | ✅ Yes |
| Primary Products You Import | Textarea | ✅ Yes |
| Countries You Currently Import From | Text input | ✅ Yes |
| Sector | Dropdown | ✅ Yes |
| Annual Import Value (approx.) | Dropdown: Under ₹1 Cr / ₹1–10 Cr / ₹10–50 Cr / ₹50 Cr+ / Not Specified | ❌ No |
| Biggest challenge in current importing? | Dropdown: Finding Verified Suppliers / Tariff Intelligence / Compliance / Quality Assurance / Logistics / Other | ✅ Yes |
| IEC Available? | Radio: Yes / Applied / No | ✅ Yes |

---

#### 9.10 Service Providers Page (`service_provider`)

| Field | Type | Required |
|-------|------|----------|
| Company / Practice Name | Text input | ✅ Yes |
| Type of EXIM Service | Checkbox (multi-select): Freight Forwarding / Customs Clearance / Trade Finance / Export Documentation / Regulatory Consulting / Logistics / Insurance / Other | ✅ Yes |
| Primary Sectors Served | Dropdown (sector list, multi-select) | ✅ Yes |
| How many exporter/importer clients do you currently serve? | Dropdown: 1–10 / 11–50 / 51–200 / 200+ | ✅ Yes |
| Are you licensed / registered? | Radio: Yes / In Process | ✅ Yes |
| Main goal on IGEN Expo | Dropdown: Lead Generation / Brand Visibility / Network Expansion / All of the Above | ✅ Yes |

---

#### 9.11 IGEN Awards (`igen_awards`)

| Field | Type | Required |
|-------|------|----------|
| Nominating as | Radio: Self / On Behalf of Company / On Behalf of Leader | ✅ Yes |
| Award Category Interest | Checkbox: Leadership Excellence / Innovation & Technology / Brand of the Year / Export Achievement / Startup & MSME / Sustainability & ESG | ✅ Yes |
| Sector for Nomination | Dropdown | ✅ Yes |
| Company / Individual Name for Nomination | Text input | ✅ Yes |
| Brief description of achievement / why nominating | Textarea | ✅ Yes |
| Are you also interested in Sponsoring an Award Category? | Radio: Yes / No / Maybe | ❌ No |

---

#### 9.12 Viksit Bharat Conference (`viksit_bharat_conf`)

| Field | Type | Required |
|-------|------|----------|
| Interested as | Checkbox (multi-select): Delegate / Speaker / Partner / Sponsor | ✅ Yes |
| Organisation / Company Name | Text input | ✅ Yes |
| Sector Represented | Dropdown | ✅ Yes |
| If Speaker: Topic you'd like to speak on | Textarea | Only if Speaker checked |
| If Sponsor: Sponsorship budget range | Dropdown: Under ₹5L / ₹5–20L / ₹20–50L / ₹50L+ / TBD | Only if Sponsor checked |
| City preference for attending | Text input | ✅ Yes |
| Government affiliation (if any) | Text input | ❌ No |

---

#### 9.13 Affiliate Partner (`affiliate_partner`)

| Field | Type | Required |
|-------|------|----------|
| Your Network Description | Textarea | ✅ Yes |
| Type of Network | Checkbox: Industry Professionals / SMEs / Business Owners / Government Contacts / Media & Press / Online Community / Other | ✅ Yes |
| Estimated Network Size | Dropdown: Under 100 / 100–500 / 500–2000 / 2000–10000 / 10000+ | ✅ Yes |
| Sectors your network is strongest in | Dropdown (sector list, multi-select) | ✅ Yes |
| Do you currently promote any B2B platforms? | Radio: Yes / No | ❌ No |
| How do you plan to promote IGEN? | Checkbox: WhatsApp / LinkedIn / Events / Direct Calling / Email / Other | ✅ Yes |

---

#### 9.14 Reseller Partner (`reseller_partner`)

| Field | Type | Required |
|-------|------|----------|
| Business / Agency Name | Text input | ✅ Yes |
| City / Region you want to resell in | Text input | ✅ Yes |
| Current Business Type | Dropdown: Digital Agency / Consulting Firm / Event Company / Media Company / Individual Entrepreneur / Other | ✅ Yes |
| B2B Sales Experience | Dropdown: Less than 1 year / 1–3 years / 3–5 years / 5+ years | ✅ Yes |
| What products do you want to resell first? | Checkbox (show all 15 products) | ✅ Yes |
| Monthly revenue target you're expecting from IGEN reselling | Dropdown: ₹10K–₹50K / ₹50K–₹2L / ₹2L–₹5L / ₹5L+ / Not Sure | ❌ No |

---

#### 9.15 Founding Stakeholder (`founding_stakeholder`)

| Field | Type | Required |
|-------|------|----------|
| Full Name | Text input | ✅ Yes |
| Organisation / Fund / Firm | Text input | ✅ Yes |
| Nature of Interest | Dropdown: Strategic Investment / Co-Building / Advisory Role / Partnership / Media / Government Collaboration / Other | ✅ Yes |
| Brief description of what you bring to IGEN | Textarea | ✅ Yes |
| Preferred way to connect with Founder | Radio: Video Call / In-Person Meeting / Phone Call | ✅ Yes |
| LinkedIn or Website | URL input | ❌ No |

---

## 10. PROGRESS BAR — MANDATORY SPECIFICATION

The progress bar must be **always visible** at the top of the form module, above the form step.

### Visual Design

```
STEP INDICATORS (4 circles with labels)

  ●——————●——————●——————●
  1        2        3        4
Quick   Business  Product   Intent
Entry   Profile   Details   & Goals

Current active step: filled circle with --igen-primary
Completed steps: filled circle with --igen-green + checkmark icon
Upcoming steps: outlined circle with --igen-step-inactive

Below indicators: percentage text + filled bar

"Step 1 of 4 — 25% Complete"
████████░░░░░░░░░░░░░░░░░░░░  25%
```

### Progress Bar States

```
Step 1 active:   25%  — bar width: 25%
Step 2 active:   50%  — bar width: 50%
Step 3 active:   75%  — bar width: 75%
Step 4 active:   90%  — bar width: 90%
Submitted:       100% — bar width: 100% — color changes to --igen-green
```

### CSS for Progress Bar

```css
.progress-container {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
  padding: 16px 24px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.progress-bar-track {
  height: 8px;
  background: var(--igen-progress-bg);
  border-radius: 50px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--igen-primary), var(--igen-secondary));
  border-radius: 50px;
  transition: width 0.4s ease;
}
```

---

## 11. STAGE 4 — THANK YOU & NEXT STEPS (PER PRODUCT)

### Thank You Screen Structure

After final submission, replace the form with the Thank You screen. Do NOT navigate away. Keep on the same page.

**Universal Thank You Header:**

```
[Large Checkmark Animation — Green]

🎉 Thank You, [First Name]!

Your IGEN Application Has Been Submitted Successfully.

[Submission Reference ID: IGEN-[TIMESTAMP]-[RANDOM 4 DIGITS]]

Your application has been saved. Our team will contact you within 24 hours.
```

**Below universal header: Dynamic Per-Product Next Steps Block**

Build a `THANK_YOU_CONTENT` JavaScript object:

```javascript
const THANK_YOU_CONTENT = {

  sme_page: {
    headline: "Welcome to India's Industry Intelligence Platform",
    next_steps: [
      "Our SME Onboarding Team will call you within 24 hours.",
      "You'll receive your Founding SME Application form on WhatsApp + Email.",
      "Your profile will be created and reviewed by our team.",
      "Once approved — your SME Page goes live at launch."
    ],
    cta_label: "Download SME Brochure",
    cta_url: "https://igensme.com/brochure",
    share_message: "I just applied to become a Founding SME on IGEN World! India's first AI-powered industry intelligence platform. Join me → www.igenworld.com"
  },

  associate_sme: {
    headline: "Your Associate SME Application is Received",
    next_steps: [
      "Our team will review your application within 48 hours.",
      "First 100 applications go through a city-validation and due diligence process.",
      "You'll receive a call from our onboarding team.",
      "Approved applicants get their Associate SME Page created at launch."
    ],
    cta_label: "Learn More About Associate SME",
    cta_url: "https://igensme.com",
    share_message: "I just applied as a Founding Associate SME on IGEN World! Be part of India's industry ecosystem → www.igenworld.com"
  },

  company_page: {
    headline: "Your Company Page Application is In",
    next_steps: [
      "An IGEN Account Manager will contact you within 24 hours.",
      "You'll receive the Company Pages brochure with pricing and tier details.",
      "Document requirements will be shared for Blue Tick verification.",
      "Your Company Page will be built and reviewed before platform launch."
    ],
    cta_label: "View Company Page Benefits",
    cta_url: "https://igennews.com",
    share_message: "My company just registered for a Founding Company Page on IGEN World! Digital trust for India's industry → www.igenworld.com"
  },

  leader_page: {
    headline: "Your Leader Page Application is Confirmed",
    next_steps: [
      "Our Leader Page team will reach out within 24 hours.",
      "You'll receive the Leader Pages brochure on WhatsApp + Email.",
      "Profile creation requirements (headshot, bio, LinkedIn) will be shared.",
      "Your Leader Page goes live at platform launch."
    ],
    cta_label: "View Leader Page Benefits",
    cta_url: "https://igennews.com",
    share_message: "I just claimed my Founding Leader Page on IGEN World. Executive identity for India's leaders → www.igenworld.com"
  },

  reader_plan: {
    headline: "You're on the Founding Reader Waitlist!",
    next_steps: [
      "You are among the first to join IGEN as a Founding Reader.",
      "Platform access will be granted when IGEN News goes live.",
      "You'll get a Founding Member badge for being in the first 500.",
      "Watch your inbox for platform launch updates."
    ],
    cta_label: "Explore IGEN News Platform",
    cta_url: "https://igennews.com",
    share_message: "I'm a Founding Reader on IGEN World — India's AI-powered industry intelligence platform! Join me → www.igenworld.com"
  },

  indian_exporter: {
    headline: "Your Exporter Profile Application is Submitted",
    next_steps: [
      "Our Expo team will contact you within 24 hours.",
      "You'll receive the Indian Exporters brochure with platform details.",
      "IEC and company documents will be requested for verified profile creation.",
      "Your Exporter Page goes live on the IGEN Expo platform at launch."
    ],
    cta_label: "View IGEN Expo Platform",
    cta_url: "https://igenexpo.com",
    share_message: "My company just registered on IGEN World's Expo Platform — India's Digital Trade Infrastructure → www.igenworld.com"
  },

  global_importer: {
    headline: "Your Importer Discovery Registration is Confirmed",
    next_steps: [
      "Our global trade team will reach you within 48 hours.",
      "We will share IGEN Expo platform capabilities and timeline.",
      "You'll be matched with verified Indian suppliers in your sector at launch.",
      "Access to India's supplier discovery engine will be granted."
    ],
    cta_label: "Learn About IGEN Expo",
    cta_url: "https://igenexpo.com",
    share_message: "Just registered to discover Indian suppliers on IGEN World's Expo Platform → www.igenworld.com"
  },

  global_exporter: {
    headline: "Your India Market Entry Interest is Registered",
    next_steps: [
      "Our EXIM team will contact you within 48 hours.",
      "India market intelligence overview will be shared.",
      "Indian buyer matching will begin when the platform goes live.",
      "You'll receive IGEN Expo platform details and timeline."
    ],
    cta_label: "Explore IGEN Expo Platform",
    cta_url: "https://igenexpo.com",
    share_message: "Registered for India market entry on IGEN World's Expo Platform → www.igenworld.com"
  },

  indian_importer: {
    headline: "Your Importer Application is Confirmed",
    next_steps: [
      "Our Expo team will contact you within 24 hours.",
      "Global supplier matching capabilities will be shared.",
      "Your Importer Page requirements and docs will be discussed.",
      "Profile goes live on IGEN Expo at launch."
    ],
    cta_label: "View IGEN Expo Platform",
    cta_url: "https://igenexpo.com",
    share_message: "Just registered on IGEN World's Expo Platform for global sourcing intelligence → www.igenworld.com"
  },

  service_provider: {
    headline: "Your Service Provider Application is In",
    next_steps: [
      "Our Expo team will contact you within 24 hours.",
      "Service Provider page requirements and pricing will be shared.",
      "Your profile will be built and reviewed before launch.",
      "Leads from exporters and importers will start flowing at launch."
    ],
    cta_label: "View IGEN Expo Benefits",
    cta_url: "https://igenexpo.com",
    share_message: "My EXIM services business just registered on IGEN World's Expo Platform → www.igenworld.com"
  },

  igen_awards: {
    headline: "Your IGEN Awards Application is Received",
    next_steps: [
      "Our Awards team will contact you within 48 hours.",
      "Award categories, criteria and nomination form will be shared.",
      "City-wise award event schedule will be shared.",
      "Nomination review process will begin."
    ],
    cta_label: "View IGEN Awards",
    cta_url: "https://igenawards.com",
    share_message: "Just registered for the IGEN Awards — India's most comprehensive AI-platform industry recognition → www.igenworld.com"
  },

  viksit_bharat_conf: {
    headline: "You're Registered for the Viksit Bharat Conference",
    next_steps: [
      "Our Conference team will contact you within 48 hours.",
      "Conference schedule, city details and participation packs will be shared.",
      "Speaker slot or sponsorship deck will be sent if applicable.",
      "Delegate confirmation and registration kit follows."
    ],
    cta_label: "Learn More About the Conference",
    cta_url: "https://igenworld.com/conference",
    share_message: "Just registered for the IGEN Viksit Bharat Conference — India's Vision 2047 Industry Summit → www.igenworld.com"
  },

  affiliate_partner: {
    headline: "Your Affiliate Partner Application is Submitted",
    next_steps: [
      "Our Partnerships team will contact you within 24 hours.",
      "Affiliate program details, commission structure and tools will be shared.",
      "Training and onboarding call will be scheduled.",
      "You'll receive your affiliate tracking link after onboarding."
    ],
    cta_label: "Learn About Partnerships",
    cta_url: "https://igenpartners.com",
    share_message: "Just applied to become an IGEN Affiliate Partner — earning by growing India's industry ecosystem → www.igenworld.com"
  },

  reseller_partner: {
    headline: "Your Reseller Application is Confirmed",
    next_steps: [
      "Our Partnerships team will contact you within 24 hours.",
      "Reseller program deck, revenue share model and city exclusivity will be discussed.",
      "Onboarding call will be scheduled.",
      "Sales training and collateral will be provided."
    ],
    cta_label: "View Partnership Opportunities",
    cta_url: "https://igenpartners.com",
    share_message: "Just applied as an IGEN Reseller Partner — building my business on India's industry intelligence infrastructure → www.igenworld.com"
  },

  founding_stakeholder: {
    headline: "Your Founding Stakeholder Interest is Registered",
    next_steps: [
      "Founder Vijay Singh's office will personally review your application.",
      "A direct meeting request will be sent within 48 hours.",
      "IGEN World company deck and vision document will be shared.",
      "Strategic discussion will follow based on your area of interest."
    ],
    cta_label: "Learn About IGEN World",
    cta_url: "https://igenworld.com",
    share_message: "Exploring a Founding Stakeholder opportunity with IGEN World — India's most ambitious industry intelligence company → www.igenworld.com"
  }

};
```

### Thank You Screen Bottom Actions

After the product-specific next steps, show these universal actions:

```
[BUTTON 1 — Primary]
📲  Save My Application to WhatsApp
(opens: https://wa.me/?text=[URL-ENCODED share_message])

[BUTTON 2 — Secondary]
🔗  Share on LinkedIn
(opens: https://www.linkedin.com/sharing/share-offsite/?url=www.igenworld.com)

[BUTTON 3 — Outline]
📋  Copy My Submission Data
(copies the full JSON submission to clipboard)

[LINK]
← Fill Another EOI for a Different Product
(resets form, keeps Step 1 data pre-filled)
```

---

## 12. EMBEDDABILITY RULES — ANY PLATFORM

### Core Requirement

This form must work as a **self-contained embed** on:

- WordPress (Elementor) pages — via HTML block
- Any static HTML page
- WhatsApp bio links (via free hosting like Netlify, GitHub Pages)
- QR code destination URLs
- Email campaign CTA landing pages
- Social media link-in-bio pages (Linktree alternative)
- Any iframe-capable platform

### Implementation Rules

**1. Single File:** Deliver the entire form as a single `index.html` with CSS in `<style>` tag and JS in `<script>` tag. Zero external JS dependencies except Google Fonts (optional — fallback to system fonts if offline).

**2. No iframe required:** The form is a standalone page. It does not need to be iframed — though iframing should also work if needed.

**3. URL Parameter Pre-fill:** The form must accept URL parameters to pre-select a product. This is critical for deep-linked campaigns.

```javascript
// URL: https://yoursite.com/eoi?product=sme_page
// Should auto-select the SME Page product and skip the product picker

const urlParams = new URLSearchParams(window.location.search);
const preSelectedProduct = urlParams.get('product');
if (preSelectedProduct && PRODUCT_INFO[preSelectedProduct]) {
  selectProduct(preSelectedProduct);
}
```

**Supported URL Params:**

| Param | Example Value | Effect |
|-------|--------------|--------|
| `product` | `sme_page` | Pre-selects product |
| `source` | `whatsapp_campaign` | Saved to submission JSON as `traffic_source` |
| `team` | `meghna` | Saves which IGEN team member's campaign brought this lead |
| `city` | `Mumbai` | Pre-fills city field |
| `sector` | `IT` | Pre-selects sector in Step 2 |

**4. Responsive Breakpoints:**

```css
/* Mobile first */
/* Base styles are for mobile: max-width 420px */

@media (min-width: 768px) { /* Tablet */ }
@media (min-width: 1024px) { /* Desktop */ }
@media (min-width: 1280px) { /* Wide desktop */ }
```

**5. Webhook Configuration (one-line plug-in for backend):**

```javascript
// Line 1 of script.js — backend team edits this
const WEBHOOK_URL = "";  // e.g., "https://api.igen.com/eoi/submit"
const CRM_WEBHOOK = "";  // e.g., CRM webhook URL

// If these are empty, data is only stored locally.
// If filled, POST request is sent on final submission.
```

---

## 13. UX RULES — DOS AND DON'TS

### MANDATORY DOs

| Rule | Why |
|------|-----|
| Step 1 MUST be submittable in under 20 seconds | Capture lead even if user abandons |
| Show progress bar at all times on the form | Motivates completion |
| Auto-save to localStorage on every step submit | Never lose a partial fill |
| Show a "Your progress is saved" message | Reassures user |
| Pre-fill product in form after product card selection | Reduces friction |
| Mobile-first design — test at 375px first | Majority users on mobile |
| Show FOMO language — "Founding Member", "Limited Slots" | Urgency creation |
| Show product benefits BEFORE the form fields | Reinforce decision |
| CTA buttons must be large, full-width on mobile | Easy tapping |
| Show WhatsApp share on Thank You screen | Viral referral mechanic |
| Accept URL parameters for product pre-selection | Deep linking for campaigns |

### MANDATORY DON'Ts

| Rule | Why Avoid |
|------|----------|
| NEVER show all form fields on one screen | Drop-off increases dramatically |
| NEVER ask for payment on EOI form | This is pre-payment interest form |
| NEVER use more than 8 fields per step | Cognitive overload |
| NEVER skip the progress bar | Users won't feel motivated to continue |
| NEVER make email the only contact method | WhatsApp + email both needed |
| NEVER navigate away on submission | Replace form with Thank You in-place |
| NEVER use technical jargon in field labels | Use simple, warm language |
| NEVER show a wall of text before the form | Keep it visual and benefit-focused |
| NEVER use generic "Submit" button text | Use product-specific action CTAs |

---

## 14. MOBILE-FIRST SPECIFICATIONS

### Layout Rules at 375px (iPhone SE / Small Android)

```css
/* Form container */
.eoi-form-container {
  width: 100%;
  max-width: 680px;
  margin: 0 auto;
  padding: 16px;
}

/* Product selection — stack vertically on mobile */
.product-grid {
  display: grid;
  grid-template-columns: 1fr;          /* 1 col on mobile */
  gap: 12px;
}

@media (min-width: 480px) {
  .product-grid { grid-template-columns: 1fr 1fr; }  /* 2 cols */
}

@media (min-width: 768px) {
  .product-grid { grid-template-columns: repeat(3, 1fr); }  /* 3 cols */
}

@media (min-width: 1024px) {
  .product-grid { grid-template-columns: repeat(5, 1fr); }  /* 5 cols desktop */
}

/* All form inputs — large touch targets */
input, select, textarea {
  width: 100%;
  min-height: 48px;   /* Minimum tap target */
  font-size: 16px;    /* Prevents iOS zoom on focus */
  padding: 12px 16px;
  border: 1.5px solid var(--igen-border);
  border-radius: var(--radius-md);
}

/* CTA buttons — full width mobile */
.btn-primary {
  width: 100%;
  min-height: 56px;
  font-size: 18px;
  font-weight: 700;
}
```

### Mobile-Specific UX

- **Sticky progress bar** — stays at top even when scrolling inside the form
- **Auto-scroll to first error field** on validation failure
- **Keyboard type optimization** — `type="tel"` for phone, `type="email"` for email, `inputmode="numeric"` for year fields
- **iOS font-size 16px** — always 16px or larger on inputs to prevent unwanted zoom
- **Tap targets** — minimum 44x44px for all interactive elements
- **WhatsApp deep link** on Thank You screen — `https://wa.me/?text=...`

---

## 15. STATE MANAGEMENT & LOCAL STORAGE

### Data Schema — Full Submission Object

```javascript
const submissionSchema = {
  meta: {
    submission_id: "IGEN-1716902400-4721",  // IGEN-[timestamp]-[random]
    submitted_at: "2025-05-28T10:30:00Z",
    product_id: "sme_page",
    product_name: "SME Page",
    platform: "IGEN NEWS",
    traffic_source: "",     // from URL param ?source=
    team_member: "",        // from URL param ?team=
    form_version: "1.0"
  },
  step1: {
    full_name: "",
    mobile: "",
    email: "",
    city: "",
    interested_in: ""
  },
  step2: {
    company_name: "",
    industry_sector: "",
    designation: "",
    website: "",
    business_category: "",
    years_in_business: ""
  },
  step3: {
    // product-specific fields — key-value pairs
    // populated dynamically based on product_id
  },
  step4: {
    why_interested: "",
    goals: "",
    referral_source: "",
    referral_name: "",
    additional_products: [],
    comments: "",
    consent: true
  },
  status: {
    step1_completed: false,
    step2_completed: false,
    step3_completed: false,
    step4_completed: false,
    fully_submitted: false,
    completion_percentage: 0
  }
};
```

### localStorage Keys

```javascript
const STORAGE_KEYS = {
  CURRENT_SUBMISSION: "igen_eoi_current",
  ALL_SUBMISSIONS: "igen_eoi_all_submissions",  // Array of all submissions
  PRODUCT_SELECTED: "igen_eoi_product",
  STEP_PROGRESS: "igen_eoi_step"
};
```

### Auto-Save Logic

```javascript
// Call this after every step submission
function saveProgress(step, data) {
  const current = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_SUBMISSION) || '{}');
  current[step] = data;
  current.status[`${step}_completed`] = true;
  current.status.completion_percentage = calculateCompletion(current);
  localStorage.setItem(STORAGE_KEYS.CURRENT_SUBMISSION, JSON.stringify(current));
}

// Call on final submit
function finalSubmit() {
  const submission = JSON.parse(localStorage.getItem(STORAGE_KEYS.CURRENT_SUBMISSION));
  submission.status.fully_submitted = true;
  submission.meta.submitted_at = new Date().toISOString();

  // Save to all submissions log
  const allSubmissions = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_SUBMISSIONS) || '[]');
  allSubmissions.push(submission);
  localStorage.setItem(STORAGE_KEYS.ALL_SUBMISSIONS, JSON.stringify(allSubmissions));

  // Console log for debugging
  console.log("IGEN EOI SUBMISSION:", JSON.stringify(submission, null, 2));

  // Webhook send if configured
  if (WEBHOOK_URL) {
    fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(submission)
    });
  }

  // Show thank you screen
  showThankYouScreen(submission);
}
```

---

## 16. COMPONENT BREAKDOWN CHECKLIST FOR AI AGENT

The AI agent must build all of the following components. Check each off as you build:

### Page-Level Components

- [ ] **`<HeroBanner>`** — Full-width hero with headline, subheadline, counter strip, CTA button
- [ ] **`<TrustStrip>`** — 3 columns: "15 Products", "50+ Sectors", "India's First AI Platform"
- [ ] **`<EOIFormModule>`** — The entire form module wrapper
- [ ] **`<FOMAStrip>`** — Red background strip: "X Founding Slots Remaining. Join Before Launch."
- [ ] **`<NextStepsSection>`** — 5-step horizontal process showing what happens after EOI
- [ ] **`<Footer>`** — IGEN logo, website links, copyright

### Form Module Sub-Components

- [ ] **`<ProductSelector>`** — Card grid + dropdown fallback for mobile. All 15 products grouped by platform.
- [ ] **`<ProductInfoPanel>`** — Dynamic panel showing selected product's benefits and FOMO strip
- [ ] **`<ProgressBar>`** — Sticky 4-step progress indicator with percentage fill
- [ ] **`<FormStep1>`** — Quick Interest: name, mobile, email, city, product
- [ ] **`<FormStep2>`** — Business Profile: company, sector, role, category, years
- [ ] **`<FormStep3>`** — Dynamic per-product fields (switches based on `product_id`)
- [ ] **`<FormStep4>`** — Intent & Goals: why, goals, referral, additional products, consent
- [ ] **`<ThankYouScreen>`** — Dynamic per-product confirmation with next steps, share buttons, copy JSON

### Utility Functions

- [ ] **`selectProduct(productId)`** — Sets active product, renders info panel, initializes step 3 fields
- [ ] **`validateStep(stepNumber)`** — Field validation for each step, returns errors array
- [ ] **`saveProgress(step, data)`** — Saves step data to localStorage
- [ ] **`calculateCompletion(submission)`** — Returns 0–100 completion percentage
- [ ] **`finalSubmit()`** — Assembles full object, saves, sends webhook if configured, shows thanks
- [ ] **`showThankYouScreen(submission)`** — Renders thank you with product-specific content
- [ ] **`handleURLParams()`** — Reads URL params on load, pre-fills product/city/sector/source
- [ ] **`copyToClipboard(text)`** — Copies JSON submission to clipboard
- [ ] **`generateSubmissionId()`** — Returns `IGEN-[timestamp]-[random 4 digits]`

---

## FINAL NOTE TO AI AGENT

### Non-Negotiable Quality Bar

- The form must **feel premium** — not like a Google Form. Think Apple-level UX meets India startup energy.
- Every micro-interaction (hover states, focus rings, button animations) must be polished.
- Loading / transition animations between steps must be smooth (`opacity + translateY` transitions, 300ms).
- Error states must be friendly: red border + inline error message below the field. No alert boxes.
- The entire experience — from landing on the page to hitting the Thank You screen — must feel like **joining a movement**, not filling a form.
- Test at 375px (mobile), 768px (tablet), and 1280px (desktop).
- The output must be a **single self-contained HTML file** that can be uploaded anywhere and works immediately.

### Core Emotional Journey of the User

```
Land on page → Feel FOMO ("Something big is being built")
       ↓
Select product → Feel excited ("This is exactly for me")
       ↓
Read product info → Feel validated ("Yes, I need this")
       ↓
Fill Step 1 → Feel relief ("That was easy")
       ↓
See progress bar → Feel motivated ("Only 3 more steps")
       ↓
Fill Steps 2–4 → Feel invested ("I've put effort in")
       ↓
Submit → Feel proud ("I'm a Founding Member")
       ↓
Thank You screen → Feel belonging ("IGEN is calling me within 24 hours")
```

**If the user feels ALL of these emotions in sequence, the form has succeeded.**

---

*Document prepared for IGEN World internal AI development team.*
*All product information, brand language, and strategic direction is as per Founder Vijay Singh's directives.*
*India Global Expo News Platform Pvt Ltd — Confidential Internal Use Only.*
