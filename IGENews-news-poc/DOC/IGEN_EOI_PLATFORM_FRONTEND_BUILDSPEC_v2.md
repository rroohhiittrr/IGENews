# IGEN WORLD — EOI DISCOVERY & INTEREST CAPTURE PLATFORM
## Frontend Build Specification for Vibe Coding (Claude Code / Codex)
### Source: Saurav's EOI Platform Architecture + Meghna's UX Review & Recommendations
### Combined & Synthesized into a Single Visual Frontend Instruction Document
### Version: 2.0 — Final for Build

---

> **IMPORTANT FRAMING NOTE FOR THE AI AGENT**
>
> This is a **frontend-only build**. Tech stack, backend, and CRM wiring are already configured separately. Your job is to build the complete **visual, interactive, single-page experience** exactly as described in this document. Do not add backend calls. All state lives in memory/localStorage. Focus 100% on the user-facing visual experience.

---

## DOCUMENT PURPOSE

This spec combines **two internal team documents**:

1. **Saurav's EOI Platform Architecture** — defines the full information architecture, all sections, all products, all fields, and the complete user journey from landing to submission.
2. **Meghna's UX Review & Recommendations** — identifies gaps in Saurav's design and prescribes specific fixes: self-identification first, real-time recommendation engine, grouped goals, stronger CTAs, trust signals, better transitions, and personalised confirmation.

**The build must implement Saurav's vision with Meghna's improvements applied throughout.**

---

## PART 1: PHILOSOPHY & CORE EXPERIENCE

### The Fundamental Shift

```
OLD WAY (Do NOT build this):
  Product → Form → Submit

CORRECT WAY (Build this):
  Discover → Learn → Explore → Build Portfolio → Submit
```

The visitor must feel:
> *"I understand the IGEN ecosystem and know exactly where I fit."*

NOT:
> *"I filled a lead form."*

### The Emotional Arc of the Journey

```
LAND ON PAGE    → Feel: Curiosity + Scale ("Something big is being built")
       ↓
WHO ARE YOU?    → Feel: Recognition ("This is made for someone like me")
       ↓
WHAT DO YOU WANT? → Feel: Clarity ("I can see my opportunity here")
       ↓
EXPLORE ECOSYSTEM → Feel: Discovery ("There's even more than I expected")
       ↓
BUILD PORTFOLIO  → Feel: Investment ("I'm building something, not filling a form")
       ↓
SMART RECS       → Feel: Personalisation ("The system understands me")
       ↓
REVIEW           → Feel: Pride ("Look at what I've assembled")
       ↓
SUBMIT           → Feel: Belonging ("I am a Founding Member of IGEN")
       ↓
THANK YOU        → Feel: Anticipation ("They'll call me. Something begins.")
```

---

## PART 2: PAGE ARCHITECTURE OVERVIEW

The entire experience is a **single scrollable page** with a fixed navigation progress bar. Sections are revealed progressively — not all shown at once.

```
┌─────────────────────────────────────┐
│  FIXED TOP: PROGRESS BAR            │  (sticky, always visible during form)
├─────────────────────────────────────┤
│  SECTION 1: HERO BANNER             │  (full viewport, always visible)
├─────────────────────────────────────┤
│  SECTION 2: TRUST SIGNALS STRIP     │  (numbers, logos, social proof)
├─────────────────────────────────────┤
│  SECTION 3: FOUNDING MEMBER FOMO    │  (prominent, visible EARLY)
├─────────────────────────────────────┤
│  SECTION 4: ECOSYSTEM SNAPSHOT      │  (7 platforms, one-line each)
├─────────────────────────────────────┤
│  ════ FORM MODULE BEGINS ════        │
│  STEP 0: SELF-IDENTIFICATION        │  ← Meghna's critical add
│  STEP 1: PERSONAL PROFILE (10%)     │
│  STEP 2: COMPANY PROFILE (20%)      │  ← conditional
│  STEP 3: BUSINESS OBJECTIVES (30%)  │  ← grouped, not flat list
│  STEP 4: ECOSYSTEM INTEREST (40%)   │  ← with live recommendations
│  STEP 5: PRODUCT EXPLORER (50-70%)  │  ← deep-dive per platform
│  STEP 6: REVIEW YOUR PORTFOLIO (80%)│
│  STEP 7: FINAL SUBMISSION (90%)     │
│  ════ THANK YOU SCREEN (100%) ════   │
├─────────────────────────────────────┤
│  SECTION 5: WHAT HAPPENS NEXT?      │  (post-EOI journey, below form)
├─────────────────────────────────────┤
│  FOOTER                             │
└─────────────────────────────────────┘
```

---

## PART 3: VISUAL DESIGN SPECIFICATIONS

### Color System

```
Primary Navy:       #0A2463   (headers, primary buttons, progress bar fill)
IGEN Red:           #E63946   (CTAs, urgency badges, FOMO elements)
Gold/Founding:      #F4A261   (founding member highlights, badges)
Trust Green:        #2A9D8F   (checkmarks, confirmed states, success)
Background:         #F8F9FA   (page background)
White:              #FFFFFF   (cards, panels)
Dark Text:          #1A1A2E   (primary body)
Muted Text:         #6C757D   (secondary, placeholders)
Border:             #DEE2E6   (form inputs, card borders)
Progress Track:     #E9ECEF   (unfilled progress bar)
Overlay:            rgba(10, 36, 99, 0.92)  (hero)
```

### Typography

```
Headings:   Poppins, 700–800 weight
Body/UI:    Inter, 400–600 weight
H1 size:    42px desktop / 28px mobile
H2 size:    30px desktop / 22px mobile
H3 size:    22px desktop / 18px mobile
Body:       16px (CRITICAL: never less than 16px on inputs — prevents iOS zoom)
Labels:     14px, 500 weight
```

### Key UI Patterns

- **Cards**: White background, 12px border radius, `box-shadow: 0 4px 24px rgba(10,36,99,0.08)`
- **CTA Buttons**: Pill-shaped (50px border radius), min-height 52px, gradient `#E63946 → #C1121F`
- **Selected States**: `border: 2px solid #0A2463`, `background: rgba(10,36,99,0.04)`, checkmark badge top-right
- **Progress bar**: Gradient fill `#0A2463 → #E63946`, 8px height, sticky top
- **Form inputs**: `border: 1.5px solid #DEE2E6`, focus state `border-color: #0A2463`, `box-shadow: 0 0 0 3px rgba(10,36,99,0.15)`
- **Transitions**: All interactive elements use `transition: all 0.3s ease`
- **Section reveals**: Fade-in + slide-up (`opacity 0→1`, `translateY 20px→0`, 400ms)

---

## PART 4: SECTION-BY-SECTION BUILD INSTRUCTIONS

---

### SECTION 1: HERO BANNER

**Layout:** Full viewport height (100vh minimum), dark navy gradient background, centered content.

**Meghna's Note on Hero:** The headline should communicate **what the visitor benefits from**, not just what IGEN is. The "Explore Opportunities" CTA should be the PRIMARY CTA. "Apply for Founding Access" is secondary or sticky — visitors can't apply before knowing what they're applying for.

**Hero Content:**

```
[TOP BADGE — pill shape, gold background]
🇮🇳  Powered by Viksit Bharat 2047 Mission

[HEADLINE — h1, white, 42px, bold]
Discover Opportunities. Build Influence.
Grow Globally with IGEN.

[SUBHEADLINE — 18px, rgba(white, 0.85)]
India's AI-Powered ecosystem connecting Exporters, Importers,
SMEs, Leaders, Companies and Investors across
50 Sectors · 1,200+ Industries · 195 Countries

[LIVE COUNTER STRIP — dark card, 3 columns]
┌──────────────┬──────────────┬──────────────┐
│ 847+ EOIs    │ 42 Cities    │ 8 Countries  │
│ Submitted    │ Represented  │ Interested   │
└──────────────┴──────────────┴──────────────┘

[CTA BUTTONS — two side by side on desktop, stacked on mobile]
┌─────────────────────────────────┐
│ 🔍  Explore Opportunities       │  ← PRIMARY (large, Red)
└─────────────────────────────────┘
┌─────────────────────────────────┐
│    Apply for Founding Access    │  ← SECONDARY (outlined, white border)
└─────────────────────────────────┘

[MICRO-COPY below buttons]
No payment. No commitment. Express your interest in 5 minutes.

[FOUNDING MEMBER URGENCY — small badge, gold]
🔴 LIVE  |  Founding Member Applications Open — Limited Slots
```

**Behavior:**
- "Explore Opportunities" smoothly scrolls to the Form Module (Step 0: Self-Identification)
- "Apply for Founding Access" also goes to Form Module but opens with the identity step pre-highlighted

---

### SECTION 2: TRUST SIGNALS STRIP

**Layout:** Full-width horizontal strip, white background, 5 columns on desktop, 2x3 grid on mobile.

**Meghna's Requirement:** Trust must be established BEFORE the first CTA. The page currently asks for action before building trust.

```
┌────────┬────────┬────────┬────────┬────────┐
│ 🌍     │ 📊     │ 🏢     │ 👥     │ 🏆     │
│ 195    │ 50     │ 10+    │ 1,000+ │ 6      │
│Countries│Sectors │Products│ Members│ Awards │
│ Network│Covered │        │ Target │Categories│
└────────┴────────┴────────┴────────┴────────┘
```

Below the numbers, add a one-line trust statement:
```
"Backed by 30 years of ICE Exhibition legacy — India's most trusted trade intelligence ecosystem."
```

---

### SECTION 3: FOUNDING MEMBER FOMO STRIP

**⚠️ MEGHNA'S CRITICAL INSTRUCTION: This section must appear EARLY — on the landing area, NOT buried at 80% through the form. It is one of the strongest conversion levers.**

**Layout:** Full-width red banner strip, white text.

```
┌─────────────────────────────────────────────────────────┐
│  🔴  FOUNDING MEMBER ACCESS — APPLICATIONS OPEN NOW      │
│                                                          │
│  First 100 SMEs: Year 1 FREE  |  First 500 Readers:      │
│  Founding Badge  |  Priority Platform Onboarding         │
│                                                          │
│  Why Join Before Public Launch?                          │
│  ✓ Priority Onboarding  ✓ Founding Recognition           │
│  ✓ Early Platform Access  ✓ Exclusive Opportunities      │
│  ✓ Influence Product Direction                           │
│                                                          │
│  [  Secure Founding Access  ]  ← Button, white, pill     │
└─────────────────────────────────────────────────────────┘
```

**This strip also appears as a persistent sidebar panel on desktop during the form (right side, 280px wide), and as a collapsible banner at the top of the form on mobile.**

---

### SECTION 4: ECOSYSTEM SNAPSHOT

**Meghna's Note:** The ecosystem tree with no descriptions is useless to a first-time visitor. Each platform needs a one-line descriptor to generate curiosity.

**Layout:** Heading + 7 horizontal cards (scrollable on mobile).

```
Heading:
"One Ecosystem. Every Business Opportunity."

[7 CARDS — horizontal scroll on mobile, grid on desktop]

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│  🌐 IGEN EXPO   │  │ 📰 IGEN NEWS    │  │ 🏅 IGEN AWARDS  │
│  Trade & Export │  │ Industry Intel  │  │ Industry Recog. │
│  Intelligence   │  │ SMEs · Leaders  │  │ 6 Categories    │
│  195 Countries  │  │ Companies       │  │ per Sector      │
│  [Explore →]    │  │ [Explore →]     │  │ [Explore →]     │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐  ┌─────────────────┐  ┌─────────────────┐
│ 🇮🇳 VIKSIT      │  │ 🤝 IGEN         │  │ 💎 IGEN         │
│ BHARAT CONF.   │  │ PARTNERS        │  │ SPONSORS        │
│ Vision 2047    │  │ Grow with IGEN  │  │ Own a Category  │
│ Industry Summit│  │ City · Sector   │  │ National Reach  │
│ [Explore →]    │  │ [Explore →]     │  │ [Explore →]     │
└─────────────────┘  └─────────────────┘  └─────────────────┘

┌─────────────────┐
│ 👔 IGEN LEADERS │
│ Executive Legacy│
│ CEO · MD · CXO  │
│ Permanent Page  │
│ [Explore →]     │
└─────────────────┘

[CTA — centered below cards]
[ Start Your Discovery Journey → ]
```

---

## PART 5: THE FORM MODULE — COMPLETE STEP-BY-STEP BUILD

### STICKY PROGRESS BAR (Always Visible During Form)

Sticks to top of viewport when user scrolls into the form module. Disappears after Thank You screen.

```
[DESKTOP PROGRESS BAR]
┌────────────────────────────────────────────────────────────────┐
│  IGEN EOI APPLICATION                              Step 2 of 7  │
│                                                                  │
│  ●────────●────────○────────○────────○────────○────────○        │
│ ID     Profile  Goals   Ecosystem Products  Review  Submit      │
│                                                                  │
│  ████████████░░░░░░░░░░░░░░░░░░░░░░░░   20% Complete           │
└────────────────────────────────────────────────────────────────┘

[MOBILE PROGRESS BAR — simplified]
┌────────────────────────────────────────┐
│  Step 2 of 7 · Profile  ──────────── 20%│
│  ████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░  │
└────────────────────────────────────────┘
```

**Step labels:** ID → Profile → Goals → Ecosystem → Products → Review → Submit

**Visual states:**
- Completed step: Filled circle in `--trust-green`, checkmark icon
- Current step: Filled circle in `--igen-primary`, pulsing ring animation
- Future step: Empty circle in `--step-inactive`

---

### STEP 0 — SELF-IDENTIFICATION
**(Meghna's Addition — Most Critical New Step)**
**Progress: 5%**

**Meghna's Instruction:** A cold visitor facing 15 products simultaneously with no guidance will leave. Adding a simple 4-button "Who Are You?" step above the product grid immediately pre-sorts everything. This is the single most impactful addition to the entire form.

**Header:**
```
"Before We Begin — Who Are You?"
[subtext: So we can show you what's most relevant to you in IGEN.]
```

**Layout:** 5 large clickable identity cards in a 2-column grid (mobile: 1 column)

```
┌──────────────────────┐  ┌──────────────────────┐
│  📖                  │  │  🎓                  │
│  READER              │  │  INDUSTRY EXPERT     │
│  I consume industry  │  │  I have 10+ years of │
│  news and want       │  │  expertise and want  │
│  smarter insights    │  │  visibility          │
└──────────────────────┘  └──────────────────────┘

┌──────────────────────┐  ┌──────────────────────┐
│  🏢                  │  │  👔                  │
│  BUSINESS OWNER /    │  │  INDUSTRY LEADER     │
│  COMPANY             │  │  (CXO / Founder)     │
│  I want my company   │  │  I want my executive │
│  to grow & be found  │  │  identity built      │
└──────────────────────┘  └──────────────────────┘

┌──────────────────────┐
│  🌐                  │
│  EXPORTER / IMPORTER │
│  I want to discover  │
│  global trade opps   │
└──────────────────────┘
```

**Behavior on Selection:**
- Card gets selected state (navy border, checkmark badge)
- Form steps 1–5 are **pre-configured** based on selection:
  - `READER` → Company Profile (Step 2) is optional/simplified. Products pre-filter to Reader Plan.
  - `INDUSTRY EXPERT` → Products pre-filter to SME Page / Associate SME.
  - `BUSINESS OWNER` → Products pre-filter to Company Page, Exporter/Importer pages.
  - `INDUSTRY LEADER` → Products pre-filter to Leader Page, Awards, Conference.
  - `EXPORTER/IMPORTER` → Products pre-filter to all EXPO products.
- A personalisation message appears:
  ```
  ✓ Great! We've personalised your IGEN journey based on your profile.
    You can still explore all opportunities.
  ```

**CTA:** `[ Continue — Build My IGEN Profile → ]`

---

### STEP 1 — PERSONAL PROFILE
**Progress: 10%**

**Meghna's Instruction:** Replace "Tell Us About Yourself" with language that makes the visitor feel they are BUILDING something, not filling a form.

**Header:**
```
"Let's Build Your IGEN Profile"
[subtext: Your professional identity on India's industry intelligence ecosystem.]
```

**Fields:**

```
┌─────────────────────────────────────────────┐
│ Full Name *                                  │
│ [________________________]                   │
│                                              │
│ Mobile Number *              Country Code    │
│ [+91] [____________________]                 │
│                                              │
│ Email Address *                              │
│ [________________________]                   │
│                                              │
│ City *                                       │
│ [________________________]                   │
│                                              │
│ State                                        │
│ [Dropdown: All Indian States + International]│
│                                              │
│ Country                                      │
│ [India ▼] (pre-selected)                    │
│                                              │
│ LinkedIn Profile                             │
│ [________________________]                   │
│ 💡 so we can personalise your               │
│    recommendations [← Meghna's fix]          │
│                                              │
│ Current Designation / Role *                 │
│ [________________________]                   │
│ e.g. Founder / CEO / Director / Expert       │
└─────────────────────────────────────────────┘
```

**CTA:** `[ Continue — Step 2 of 7 → ]`

**Auto-save toast after submit:**
```
✅ Profile saved. Your application is 10% complete.
   You can return anytime to continue. Progress is auto-saved.
```

---

### STEP 2 — ORGANISATION PROFILE
**Progress: 20%**

**Meghna's Instruction:** This step should be CONDITIONAL — only fully shown for Business Owner / Company / Exporter identity types. For Readers and Individual Experts, show a simplified version. Revenue Band must have a rationale — it's a sensitive early ask.

**Header:**
```
"Tell Us About Your Organisation"
[subtext — show only for business types:]
"Your company profile helps us match you with the right trade and industry partners."
```

**Conditional display logic:**
- If identity = `READER` → Show only: Company Name (optional), Industry Sector (required)
- If identity = `INDUSTRY EXPERT` → Show: Company/Practice Name, Industry Sector, Sub-Industry, Business Type
- All other identities → Show full set of fields below

**Full Fields:**

```
┌─────────────────────────────────────────────┐
│ Company / Organisation Name *                │
│ [________________________]                   │
│                                              │
│ Website                                      │
│ [________________________]                   │
│                                              │
│ Industry Sector *          Sub Industry      │
│ [Dropdown ▼]              [Dropdown ▼]       │
│                                              │
│ Employee Strength *                          │
│ ○ 1–10   ○ 11–50   ○ 51–200                 │
│ ○ 201–500   ○ 500+                           │
│                                              │
│ Business Type *                              │
│ ○ Startup   ○ MSME   ○ Enterprise            │
│ ○ Exporter  ○ Importer  ○ Manufacturer       │
│ ○ Service Provider  ○ Consultant             │
│ ○ Professional  ○ Investor                   │
│ ○ Government  ○ Association                  │
│                                              │
│ Annual Revenue Range (helps us match you)    │
│ [Why we ask: helps us connect you with the   │
│ right IGEN partners and opportunities]        │
│ [Dropdown ▼] [Prefer not to say option avail]│
└─────────────────────────────────────────────┘
```

**CTA:** `[ Continue — Step 3 of 7 → ]`

---

### STEP 3 — BUSINESS OBJECTIVES DISCOVERY
**Progress: 30%**

**Meghna's Critical Fix:** The original 13 flat-list options cause overwhelm. Group them into 3 clusters with a "Select up to 3" instruction.

**Header:**
```
"What Are You Looking To Achieve?"
[subtext: Select up to 3 priorities. We'll match you to the most relevant opportunities.]
```

**Layout:** 3 grouped clusters, each as a card with multi-select checkboxes.

```
┌─────────────────────────────────────────────────────────────────┐
│  CLUSTER 1: GROWTH & REVENUE                                    │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ Generate Leads        ○ Export Growth                 │   │
│  │ ○ Import Opportunities  ○ Strategic Partnerships        │   │
│  │ ○ Investment Opportunities                              │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  CLUSTER 2: VISIBILITY & RECOGNITION                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ Increase Visibility   ○ Industry Recognition          │   │
│  │ ○ Thought Leadership    ○ Awards & Credibility          │   │
│  │ ○ Government Engagement                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  CLUSTER 3: INTELLIGENCE & COMMUNITY                            │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ ○ Market Intelligence   ○ Networking                    │   │
│  │ ○ Recruitment           ○ Learning & Insights           │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                  │
│  Selected: [Goal Tag 1] × [Goal Tag 2] × [Goal Tag 3] ×        │
│  (max 3 — chip-style tags, removable)                           │
└─────────────────────────────────────────────────────────────────┘
```

**Transition bridge sentence (Meghna's requirement):**
After selections are made, show a bridge sentence BEFORE showing Step 4:
```
"Based on what you want to achieve, here are the IGEN platforms most relevant to you →"
[The next step pre-highlights platforms relevant to their selections]
```

**CTA:** `[ Continue — Explore My IGEN Opportunities → ]`

---

### STEP 4 — PRIMARY ECOSYSTEM INTEREST
**Progress: 40%**

**Header:**
```
"Select Your Areas of Interest"
[subtext: You can select multiple. Each selection opens a detailed opportunity explorer.]
```

**Layout:** 7 platform cards in a 3-column grid (desktop) / 2-column (tablet) / 1-column (mobile).

**Meghna's Requirement:** Platforms relevant to the user's Step 3 goals are **pre-highlighted** with a "Recommended for you" badge. Others are available but not pre-selected.

**LIVE RECOMMENDATION ENGINE — RIGHT SIDEBAR (desktop) / BOTTOM PANEL (mobile):**

Meghna's Instruction: "The recommendation engine should surface DURING selection — as the visitor checks boxes, the sidebar updates in real time with 'You may also benefit from…' Post-selection placement reduces persuasion value."

```
MAIN AREA (left/center):

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  🌐              │  │  📰              │  │  🏅              │
│  IGEN EXPO       │  │  IGEN NEWS       │  │  IGEN AWARDS     │
│  [Recommended ✓] │  │  [Recommended ✓] │  │                  │
│                  │  │                  │  │                  │
│  ○ Select        │  │  ○ Select        │  │  ○ Select        │
└──────────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────────┐  ┌──────────────────┐  ┌──────────────────┐
│  🇮🇳             │  │  🤝              │  │  💎              │
│  VIKSIT BHARAT   │  │  IGEN PARTNERS   │  │  IGEN SPONSORS   │
│  CONFERENCE      │  │                  │  │                  │
│  ○ Select        │  │  ○ Select        │  │  ○ Select        │
└──────────────────┘  └──────────────────┘  └──────────────────┘

┌──────────────────┐
│  👔              │
│  IGEN LEADERS    │
│  ○ Select        │
└──────────────────┘

LIVE RECOMMENDATION SIDEBAR (right side, desktop):

┌────────────────────────┐
│ 💡 Based on your       │
│ selections, you may    │
│ also benefit from:     │
│                        │
│ ✓ Leader Page          │
│ ✓ Awards Nomination    │
│ ✓ Conference Delegate  │
│ ✓ Company Page         │
│ ✓ Sponsor Package      │
│                        │
│ [+ Add to Portfolio]   │
│ for each item          │
└────────────────────────┘
```

**Selection behavior:**
- Click card → card animates to selected state (navy border, checkmark, subtle scale-up)
- Platform-specific deep-dive section expands BELOW the card grid
- Sidebar recommendations update in real time

**CTA:** `[ Continue to Product Explorer → ]`

---

### STEP 5 — PRODUCT EXPLORER (Deep-Dive)
**Progress: 50% → 70%**

**Meghna's Instruction:** Product descriptions must NOT gate by credentials ("20+ years experience"). Instead, describe the SITUATION the person is in. Someone will self-select based on situation, not credentials.

For each selected platform from Step 4, an **accordion/tab section** expands showing all products within that platform. The user selects specific products and the system shows "Ideal For / Benefits / Add-Ons" per product.

---

#### 5A — IGEN EXPO EXPLORER

**Shown when IGEN EXPO is selected in Step 4.**

**Platform Banner:**
```
┌────────────────────────────────────────────────────────────┐
│ 🌐 IGEN EXPO                                               │
│ India's AI-Powered Trade Intelligence & Digital Exhibition │
│                                                            │
│ WHO SHOULD JOIN:                                           │
│ [Exporters] [Importers] [Manufacturers] [Trading Houses]   │
│ [Global Buyers] [Service Providers]                        │
└────────────────────────────────────────────────────────────┘
```

**5 Product Selection Cards:**

```
┌─────────────────────────────────────────────────────────────────┐
│ □  INDIAN EXPORTERS PAGE                                        │
│                                                                  │
│  Ideal For: "Your products are ready for the world, but global  │
│  buyers can't find you yet."                                    │
│  [← Meghna's fix: situation, not credential]                    │
│                                                                  │
│  Benefits:                                                       │
│  ✓ Visibility across 195 countries                              │
│  ✓ AI-powered buyer discovery                                    │
│  ✓ Verified exporter profile                                     │
│  ✓ Trade intelligence by country                                 │
│  ✓ Sector visibility                                             │
│                                                                  │
│  Starting from: [Pricing comes after EOI approval]              │
│  [← Meghna: price signal needed, uncertainty kills completion]  │
│                                                                  │
│  Suggested Add-Ons:                                              │
│  [+ Company Page] [+ Leader Page] [+ Awards] [+ Conference]     │
│                                                                  │
│  [ + Add to My Portfolio ]                                      │
└─────────────────────────────────────────────────────────────────┘

[Same card format for each of the 5 EXPO products:]
□ Global Importers Page
□ Indian Importers Page
□ Global Exporters Page
□ EXIM Service Providers Page
```

---

#### 5B — IGEN NEWS EXPLORER

**Shown when IGEN NEWS is selected in Step 4.**

**Platform Banner:**
```
┌────────────────────────────────────────────────────────────┐
│ 📰 IGEN NEWS                                               │
│ India's Business & Industry Intelligence Platform          │
│                                                            │
│ WHO SHOULD JOIN:                                           │
│ [Experts] [Companies] [CXOs] [Founders] [Readers]          │
│ [Investors] [Professionals]                                │
└────────────────────────────────────────────────────────────┘
```

**5 Product Cards:**

**SME PAGE card:**
```
┌─────────────────────────────────────────────────────────────────┐
│ □  SME PAGE                                                     │
│                                                                  │
│  Ideal For: "You've spent decades building expertise in your    │
│  industry — but when people search for an expert, they don't    │
│  find you."                                                     │
│  [Meghna: situation, not "20+ years experience"]                │
│                                                                  │
│  Benefits:                                                       │
│  ✓ Thought Leadership publishing                                 │
│  ✓ Consulting opportunities & bookings                          │
│  ✓ Industry Recognition                                         │
│  ✓ Awards Jury Eligibility                                      │
│  ✓ Podcast Opportunities                                        │
│  ✓ Expert Branding                                              │
│                                                                  │
│  🔴 FOUNDING SLOT: First 100 SMEs — Year 1 FREE                │
│                                                                  │
│  Suggested Add-Ons:                                              │
│  [+ Leader Page] [+ Conference Speaker] [+ Awards Jury]         │
│  [+ Knowledge Partner]                                          │
│                                                                  │
│  [ + Add to My Portfolio ]                                      │
└─────────────────────────────────────────────────────────────────┘
```

**ASSOCIATE SME PAGE card:**
```
│  Ideal For: "You're becoming recognised in your field but       │
│  your professional presence online doesn't reflect the          │
│  expert you've become."                                         │
│                                                                  │
│  Benefits:                                                       │
│  ✓ Digital Presence                                             │
│  ✓ Authority Building                                           │
│  ✓ Industry Visibility                                          │
│  ✓ Clear pathway to Full SME Status                             │
│  ✓ Certification Roadmap [← Meghna add-on]                     │
│  ✓ Mentorship access [← Meghna add-on]                         │
│  ✓ Milestone achievement badges [← Meghna add-on]              │
```

**COMPANY PAGE card:**
```
│  Ideal For: "Your company has a great product and team,         │
│  but buyers and investors searching online don't find you,      │
│  or don't trust what they find."                                │
│                                                                  │
│  Benefits:                                                       │
│  ✓ Verified Company Profile — Blue Tick Identity                │
│  ✓ Investor, Employee, Stakeholder sub-tabs                     │
│  ✓ PR Publishing                                                │
│  ✓ Industry Ranking Position [← Meghna add-on]                 │
│  ✓ Lead Generation Benefits [← Meghna add-on]                  │
│  ✓ Featured Company Upgrade [← Meghna add-on]                  │
│                                                                  │
│  Sample CTA: "Want More Visibility For Your Business?           │
│  Upgrade To Founding Company Membership."                        │
```

**LEADER PAGE card:**
```
│  Ideal For: "You've earned your seat at the industry table —    │
│  but your digital presence doesn't show who you've become."     │
│                                                                  │
│  Benefits:                                                       │
│  ✓ Personal Brand Score [← Meghna add-on]                      │
│  ✓ Industry Influence Index [← Meghna add-on]                  │
│  ✓ Speaking Opportunities                                       │
│  ✓ Board Advisory Opportunities [← Meghna add-on]              │
│  ✓ Media Coverage Opportunities [← Meghna add-on]              │
│  ✓ Executive Visibility Benefits                                │
│                                                                  │
│  Sample CTA: "Build Your Permanent Executive Identity."          │
```

**READER PLAN card:**
```
│  Ideal For: "You track your industry but rely on generic        │
│  news that wastes your time or misses what matters to you."     │
│                                                                  │
│  Benefits:                                                       │
│  ✓ AI-curated industry news — no noise                         │
│  ✓ Follow Industries & Sectors [← Meghna]                      │
│  ✓ Save Articles & Personalise Feed [← Meghna]                 │
│  ✓ Upgrade path: Reader → Associate SME [← Meghna]             │
│  ✓ Founding Member recognition (first 500)                      │
│                                                                  │
│  EOI Prompt after content consumption:                          │
│  "Enjoying Industry Intelligence? Become a Founding Reader."    │
│  [← Meghna: contextual EOI prompts throughout news feed]        │
```

---

#### 5C — IGEN AWARDS EXPLORER

**Shown when IGEN AWARDS is selected.**

```
┌────────────────────────────────────────────────────────────┐
│ 🏅 IGEN AWARDS                                             │
│ Industry Recognition Platform                              │
│                                                            │
│ WHO SHOULD PARTICIPATE:                                    │
│ [Companies] [Leaders] [Exporters] [SMEs] [Professionals]   │
└────────────────────────────────────────────────────────────┘

5 options as checkbox cards:
□ Awards Nomination
□ Jury Member
□ Awards Partner
□ Awards Sponsor
□ Category Sponsor

Benefits panel (shown for selected):
✓ Industry Recognition  ✓ Brand Credibility
✓ Media Visibility      ✓ Networking
✓ Reputation Enhancement
```

---

#### 5D — IGEN VIKSIT BHARAT CONFERENCE EXPLORER

**Shown when VIKSIT BHARAT CONFERENCE selected.**

```
┌────────────────────────────────────────────────────────────┐
│ 🇮🇳 IGEN VIKSIT BHARAT CONFERENCE                          │
│ Powering Viksit Bharat 2047                               │
│                                                            │
│ WHO SHOULD JOIN:                                           │
│ [Industry Leaders] [Government] [Academia]                 │
│ [Investors] [Companies] [Experts]                          │
└────────────────────────────────────────────────────────────┘

6 participation options as checkbox cards:
□ Delegate        □ Speaker
□ Panelist        □ Knowledge Partner
□ Strategic Partner  □ Sponsor

Benefits: National Visibility · Policy Dialogue · Strategic Networking
          Industry Influence · Thought Leadership

[If Speaker selected] → Show: Text area "Topic you'd like to speak on"
[If Sponsor selected] → Show: Dropdown "Sponsorship budget range"
```

---

#### 5E — IGEN PARTNERS EXPLORER

**Shown when IGEN PARTNERS selected.**

```
6 options:
□ Affiliate Partner    □ City Partner
□ Sector Partner       □ Knowledge Partner
□ Media Partner        □ Strategic Partner

Benefits:
✓ Revenue Opportunities  ✓ Regional Visibility
✓ Ecosystem Influence    ✓ Long-Term Participation
```

---

#### 5F — IGEN SPONSORS EXPLORER

**Shown when IGEN SPONSORS selected.**

```
6 options:
□ Founding Sponsor    □ Expo Sponsor
□ Awards Sponsor      □ Conference Sponsor
□ Platform Sponsor    □ Sector Sponsor

Benefits:
✓ Premium Branding        ✓ National Visibility
✓ Category Ownership      ✓ Thought Leadership Positioning
✓ Ecosystem Association
```

---

#### 5G — IGEN LEADERS EXPLORER

**Shown when IGEN LEADERS selected.**

```
5 options:
□ Leader Page           □ Conference Speaker
□ Awards Jury           □ Knowledge Partner
□ Mentor

Ideal For: "CEOs, MDs, Founders, Board Members,
            Government Officials, Industry Leaders"
            
Benefits:
✓ Permanent Executive Identity  ✓ Leadership Visibility
✓ Industry Recognition          ✓ Media Opportunities
✓ Speaker Opportunities
```

---

### STEP 5 — SMART RECOMMENDATION ENGINE
**(In-context, not a separate step)**

**Meghna's Instruction:** This must work DURING selection, not after. As the user adds products to their portfolio, the sidebar (desktop) or bottom panel (mobile) updates in real-time.

**Visual Design — Sidebar Panel:**

```
┌─────────────────────────────────┐
│ ⚡ SMART RECOMMENDATIONS        │
│ Based on your portfolio         │
│                                 │
│ You selected:                   │
│ [Indian Exporters Page] ✓       │
│ [SME Page] ✓                    │
│                                 │
│ ─────────────────────────────── │
│ You may also benefit from:      │
│                                 │
│ ➕ Company Page                 │
│    "Strengthen your corporate   │
│     identity alongside your     │
│     exporter profile"           │
│    [+ Add]                      │
│                                 │
│ ➕ Leader Page                  │
│    "As a founder + exporter,    │
│     build your executive brand" │
│    [+ Add]                      │
│                                 │
│ ➕ Awards Nomination            │
│    "SMEs get priority           │
│     nomination in IGEN Awards"  │
│    [+ Add]                      │
│                                 │
│ ➕ Conference Delegate           │
│    "Connect with 195-country    │
│     buyers in person"           │
│    [+ Add]                      │
└─────────────────────────────────┘
```

**Cross-sell logic table (build as a data object):**

```
If selected: EXPO product      → Recommend: Company Page, Leader Page, Awards
If selected: SME Page          → Recommend: Leader Page, Conference Speaker, Awards Jury
If selected: Company Page      → Recommend: Leader Page, Awards, Sponsor, Conference
If selected: Leader Page       → Recommend: Company Page, Awards, Conference Speaker
If selected: Reader Plan       → Recommend: Associate SME (upgrade path)
If selected: Awards            → Recommend: Company Page, Leader Page, Conference
If selected: Conference        → Recommend: Awards, Leader Page, Sponsor
If selected: Partners          → Recommend: Sponsor, Conference
```

---

### STEP 6 — REVIEW YOUR PORTFOLIO
**Progress: 80%**

**Header:**
```
"Your IGEN Opportunity Portfolio"
[subtext: Review your selections. Edit anything before submitting.]
```

**Meghna's Instruction:** After clicking Edit on any item, the user must return to EXACTLY that section, not restart from the beginning. Build explicit back-navigation.

**Layout:**

```
┌─────────────────────────────────────────────────────────────┐
│ 📋 YOUR IGEN PORTFOLIO                                      │
│                                                              │
│ PERSONAL PROFILE                            [Edit ✏️]        │
│ Rahul Sharma  ·  CEO  ·  Mumbai             [→ goes to Step 1]│
│                                                              │
│ ─────────────────────────────────────────────────────────── │
│                                                              │
│ ORGANISATION                                [Edit ✏️]        │
│ TechCorp India · IT Sector · Enterprise     [→ goes to Step 2]│
│                                                              │
│ ─────────────────────────────────────────────────────────── │
│                                                              │
│ YOUR GOALS                                  [Edit ✏️]        │
│ [Export Growth] [Industry Recognition]      [→ goes to Step 3]│
│ [Thought Leadership]                                         │
│                                                              │
│ ─────────────────────────────────────────────────────────── │
│                                                              │
│ YOUR SELECTED OPPORTUNITIES                 [Edit ✏️]        │
│                                             [→ goes to Step 5]│
│  ┌──────────────┐ ┌──────────────┐                         │
│  │ 🌐 IGEN EXPO │ │ 📰 IGEN NEWS │                         │
│  │ ✓ Indian     │ │ ✓ SME Page  │                         │
│  │   Exporters  │ │ ✓ Company   │                         │
│  │   Page       │ │   Page      │                         │
│  └──────────────┘ └──────────────┘                         │
│  ┌──────────────┐                                           │
│  │ 🏅 AWARDS    │                                           │
│  │ ✓ Nomination │                                           │
│  └──────────────┘                                           │
│                                                              │
│ ─────────────────────────────────────────────────────────── │
│                                                              │
│ 💡 SMART RECOMMENDATIONS FOR YOU                            │
│ Based on your portfolio, you may also benefit from:         │
│ [+ Leader Page — Add] [+ Conference — Add]                  │
│                                                              │
│ ─────────────────────────────────────────────────────────── │
│                                                              │
│ 🔴 FOUNDING MEMBER STATUS: ACTIVE                           │
│ Your application qualifies for Founding Member benefits     │
│ ✓ Priority Onboarding  ✓ Founding Recognition               │
│ ✓ Early Platform Access                                     │
└─────────────────────────────────────────────────────────────┘
```

**CTA:** `[ Secure My Founding Access → ]`

---

### STEP 7 — INTENT & FINAL SUBMISSION
**Progress: 90%**

**Header:**
```
"Almost There — Final Step"
[subtext: Tell us a little more so we can personalise your onboarding.]
```

**Fields:**

```
Why are you interested in IGEN? *
[textarea — min 20 chars]
"Tell us what excites you about IGEN…"

What do you hope to achieve in Year 1? 
[textarea — optional]
"What business outcome are you looking for?"

How did you hear about IGEN? *
[Dropdown: WhatsApp · LinkedIn · Google Search · Friend/Colleague
           IGEN Team Member · Event/Exhibition · Email Campaign · Other]

Referred by (if applicable):
[Text input — appears only if "Friend/Colleague" or "IGEN Team Member" selected]

Any questions for the IGEN team?
[textarea — optional]

☐ I agree to be contacted by the IGEN team about my application *
   (Required to submit)
```

**Final CTA Button — Large, Red, Full Width:**

```
┌────────────────────────────────────────────────────────────┐
│                                                            │
│     🎉  Secure My Founding Access                         │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

**Meghna's Instruction:** Replace "Submit My Expression of Interest" — the visitor has spent 10–15 minutes building their portfolio. The CTA should reflect that investment. "Secure My Founding Access" or "Submit My IGEN Portfolio" carries much more weight.

**Below button:**
```
🔒 Your information is secure. No payment required at this stage.
   Our team will contact you within 24 hours of submission.
```

---

### THANK YOU SCREEN
**Progress: 100%**

**Meghna's Critical Instruction:** 
1. "Welcome To The IGEN Founding Community. Your Expression of Interest has been received." — right sentiment but no warmth or specificity. What happens next? When will they hear back?
2. The 5 post-submission actions must be PRIORITISED, not presented as equals. Schedule Discussion = primary CTA.
3. Must include a personalised portfolio summary — "here's what you selected" — gives the visitor something tangible.

**Layout:**

```
┌────────────────────────────────────────────────────────────────┐
│                                                                │
│        ✅ (large animated checkmark — green)                   │
│                                                                │
│   Welcome to the IGEN Founding Community, [First Name].        │
│                                                                │
│   Your IGEN Opportunity Portfolio has been submitted.          │
│                                                                │
│   Reference: IGEN-[TIMESTAMP]-[RANDOM]                         │
│   A confirmation has been saved for you.                       │
│                                                                │
│ ──────────────────────────────────────────────────────────── │
│                                                                │
│   YOUR SELECTED PORTFOLIO                                      │
│   ┌──────────────┐ ┌──────────────┐ ┌──────────────┐         │
│   │ ✓ Indian     │ │ ✓ SME Page  │ │ ✓ Awards     │         │
│   │   Exporters  │ │             │ │   Nomination │         │
│   └──────────────┘ └──────────────┘ └──────────────┘         │
│                                                                │
│ ──────────────────────────────────────────────────────────── │
│                                                                │
│   WHAT HAPPENS NEXT?                                           │
│                                                                │
│   1. ✅ Application received — saved to our CRM               │
│   2. 📞 IGEN Account Manager calls you within 24 hours        │
│   3. 📄 Personalised brochures shared on WhatsApp + Email     │
│   4. 🗓️  Discovery call scheduled for your onboarding         │
│   5. 🚀 Founding Member access activated at platform launch   │
│                                                                │
│ ──────────────────────────────────────────────────────────── │
│                                                                │
│   NEXT STEPS (prioritised — Meghna's instruction):            │
│                                                                │
│   ┌────────────────────────────────────────────────┐          │
│   │  📅  Schedule My Discovery Call    ← PRIMARY   │          │
│   └────────────────────────────────────────────────┘          │
│                                                                │
│   ┌────────────────────────────────────────────────┐          │
│   │  👥  Refer a Colleague to IGEN    ← SECONDARY  │          │
│   └────────────────────────────────────────────────┘          │
│                                                                │
│   TERTIARY LINKS (smaller, text-style):                        │
│   📲 Join WhatsApp Updates  |  📥 Download Brochure            │
│   💼 Follow on LinkedIn                                        │
│                                                                │
│ ──────────────────────────────────────────────────────────── │
│                                                                │
│   📋 Copy My Portfolio Summary (JSON)                          │
│   ← Fill Another EOI for a Different Product                  │
│                                                                │
└────────────────────────────────────────────────────────────────┘
```

---

## PART 6: PAGE SECTIONS BELOW THE FORM

### SECTION 5: WHAT HAPPENS AFTER YOUR EOI?

**Layout:** Horizontal 5-step process flow with arrow connectors.

```
EOI Submitted → Assigned to Team → Discovery Call → Brochure Shared → Onboarding Begins
     ●───────────────●───────────────●───────────────●───────────────●
   Step 1          Step 2          Step 3           Step 4           Step 5
  CRM Entry      24-hr Contact    Qualification    Sales Strategy    Platform Live
```

---

### FOOTER

```
┌─────────────────────────────────────────────────────────────────┐
│  IGEN WORLD — India Global Expo News Platform Pvt Ltd           │
│                                                                  │
│  www.igenworld.com  |  IGEN NEWS  |  IGEN EXPO  |  IGEN AWARDS  │
│                                                                  │
│  Mission: Viksit Bharat 2047 — Empowering Indian Industry       │
│  Intelligence, Trade & Ecosystem Growth                          │
│                                                                  │
│  © 2025 India Global Expo News Platform Pvt Ltd.                │
│  All rights reserved.                                            │
└─────────────────────────────────────────────────────────────────┘
```

---

## PART 7: CTA LANGUAGE GUIDE

**Meghna's Replacement Table — Apply throughout the entire form:**

| ❌ Old (Do NOT use) | ✅ New (Use this) |
|---------------------|------------------|
| Submit EOI | Secure My Founding Access |
| Submit | Submit My IGEN Portfolio |
| Apply | Secure Access |
| Register | Reserve My Profile |
| Complete Form | Explore Opportunities |
| Join Now | Become a Founding Member |
| Fill Details | Create Your Identity |
| Express Interest | Build My IGEN Portfolio |
| Continue | Continue Building My Profile → |
| Next | Next Step → |

---

## PART 8: INTERACTION PATTERNS — DETAILED

### Card Selection Pattern

When a user clicks any selectable card (product, platform, identity):

```
[Unselected state]              [Selected state]
┌─────────────────┐            ┌─────────────────┐
│                 │  →click→   │ ✓               │ ← checkmark badge, top-right
│  Card Content   │            │  Card Content    │
│                 │            │                  │
│ [○ Select]      │            │ [✓ Selected]     │
└─────────────────┘            └─────────────────┘
 border: 1px #DEE2E6             border: 2px #0A2463
 background: white               background: rgba(10,36,99,0.04)
                                  box-shadow: 0 0 0 3px rgba(10,36,99,0.15)
```

**Animation:** `transform: scale(1.02)` on hover, `scale(1.0)` when selected (settled).

### Accordion/Expand Pattern

When a platform is selected in Step 4, its product explorer expands below with a smooth animation:

```
max-height: 0 → max-height: auto
opacity: 0 → opacity: 1
transition: all 0.4s ease
```

### Progress Update Pattern

After each step's CTA is clicked and validation passes:
1. Progress bar animates to new percentage (smooth, 500ms)
2. Current step circle fills with green + checkmark
3. Next step circle becomes active (navy)
4. Current step section fades out (`opacity → 0, translateY → -20px`)
5. Next step section fades in (`opacity → 1, translateY → 0`)

### Auto-Save Toast Pattern

After every step submission, show a brief toast (bottom-right on desktop, bottom on mobile):

```
┌─────────────────────────────────────────┐
│  💾 Progress saved — 30% complete       │
│  You can return anytime to continue.    │
└─────────────────────────────────────────┘
Appears: slide-up from bottom
Duration: 3 seconds
Then: slide-back down
```

### Validation Error Pattern

On form field validation failure:
- Input border turns `#E63946` (red)
- Error message appears below the field in red, 12px:
  ```
  ⚠️  Please enter your full name
  ```
- Page auto-scrolls to the FIRST error field
- NO alert boxes. ALL errors are inline.

### "Recommended for You" Badge

Platform and product cards that match the user's Step 3 goals get a small badge:

```
┌─────────────────────────────────────────┐
│  ⭐ Recommended for You                  │  ← small pill badge, gold bg
│                                         │
│  📰 IGEN NEWS                           │
│  ...                                    │
└─────────────────────────────────────────┘
```

---

## PART 9: MOBILE-SPECIFIC LAYOUT RULES

**All of the following apply at viewport width ≤ 767px:**

- Product grid: 1 column (stacked cards)
- Platform cards: Full width
- Progress bar: Simplified — step number + percentage + thin bar only
- Recommendation engine: Bottom sliding panel (not sidebar), expandable with "View Recommendations ↑"
- CTA buttons: Full width, min 56px height
- Hero CTAs: Stack vertically
- Founding Member FOMO strip: Collapsible accordion at top of form, auto-collapsed after Step 1
- Portfolio review: Accordion-style (each section individually expandable)
- All font sizes: 16px minimum on inputs (prevents iOS zoom)
- Step transitions: Bottom-up slide (feels native, like app navigation)

---

## PART 10: PERSISTENT ELEMENTS

### Founding Member FOMO Persistent Element

**On Desktop:** Fixed right sidebar panel (280px wide) showing:
```
┌──────────────────────────────┐
│ 🔴 FOUNDING ACCESS OPEN      │
│                              │
│ First 100 SMEs: Year 1 FREE  │
│ First 500 Readers: Badge     │
│                              │
│ ✓ Priority Onboarding        │
│ ✓ Founding Recognition       │
│ ✓ Early Access               │
│                              │
│ [Secure Founding Access]     │
└──────────────────────────────┘
```

**On Mobile:** Collapsible banner at top of form, minimised to a single line after being seen once:
```
🔴 Founding Access Open — Limited Slots [▼]
```

**Meghna's Instruction:** This founding member advantage MUST appear at the landing page level AND at the 40% mark in the form. It should NOT be buried at 80% as originally designed.

---

## PART 11: DATA CAPTURE STRUCTURE

The form must build and maintain this data object throughout the session. On final submit, this is the complete payload:

```javascript
{
  meta: {
    submission_id: "IGEN-[timestamp]-[4-digit-random]",
    submitted_at: "ISO datetime",
    traffic_source: "[from URL param ?source=]",
    referrer_team_member: "[from URL param ?team=]",
    form_version: "2.0"
  },
  identity: {
    selected_role: "READER | INDUSTRY_EXPERT | BUSINESS_OWNER | INDUSTRY_LEADER | EXPORTER_IMPORTER"
  },
  personal_profile: {
    full_name, mobile, email, city, state, country,
    linkedin_url, current_designation
  },
  organisation_profile: {
    company_name, website, industry_sector, sub_industry,
    employee_strength, business_type, revenue_band
  },
  business_objectives: {
    growth_goals: [],    // from cluster 1
    visibility_goals: [], // from cluster 2
    intelligence_goals: [] // from cluster 3
  },
  ecosystem_interest: {
    platforms_selected: []  // array of platform IDs
  },
  portfolio: {
    igen_expo: {
      selected: [],  // product IDs
      details: {}    // product-specific field values
    },
    igen_news: {
      selected: [],
      details: {}
    },
    igen_awards: { selected: [] },
    viksit_bharat: { selected: [], details: {} },
    igen_partners: { selected: [] },
    igen_sponsors: { selected: [] },
    igen_leaders: { selected: [] }
  },
  recommendations_accepted: [],  // products added via recommendation engine
  intent: {
    why_interested: "",
    goals_year_1: "",
    referral_source: "",
    referral_name: "",
    additional_comments: ""
  },
  consent: true,
  completion: {
    step0: false, step1: false, step2: false, step3: false,
    step4: false, step5: false, step6: false, step7: false,
    percentage: 0
  }
}
```

---

## PART 12: MEGHNA'S ISSUES TO FIX — CRITICAL LIST

These are flagged as critical by Meghna and must be implemented:

| # | Issue | Fix Required |
|---|-------|-------------|
| 1 | EOI form stuck on "Loading…" state | Must render immediately, no loading state visible |
| 2 | No self-identification step | Add Step 0 with 5 identity cards BEFORE any form fields |
| 3 | 15 products dumped simultaneously | Products are only shown after identity selection + platform selection |
| 4 | Founding Member buried at 80% | Show FOMO on hero, at 40% mark, AND as persistent sidebar |
| 5 | Goals are 13 flat options | Group into 3 clusters: Growth, Recognition, Intelligence |
| 6 | No transition bridge Step 6→7 | Add: "Based on what you want to achieve, here are your most relevant platforms →" |
| 7 | Credential-gating in product descriptions | Replace "20+ years" with situation-based descriptions throughout |
| 8 | No price signal anywhere | Add: "Pricing shared after EOI review" or "Starting from" note per product |
| 9 | Recommendation engine after selections only | Make it live/real-time as sidebar during selection in Step 4 |
| 10 | LinkedIn field with no rationale | Add "(so we can personalise your recommendations)" below field |
| 11 | Revenue Band with no context | Add rationale: "helps us connect you with the right partners" |
| 12 | "Submit My Expression of Interest" weak CTA | Replace with "Secure My Founding Access" |
| 13 | Thank You page flat/generic | Personalised portfolio summary + prioritised CTAs (Schedule Discussion = primary) |
| 14 | Edit on review restarts form | Edit returns user to EXACT section edited |
| 15 | Zero contextual EOI prompts on news pages | Add EOI prompt strip after every 3–4 articles on news feed pages |
| 16 | Products feel disconnected | Add cross-product recommendation suggestions throughout |

---

## PART 13: MEGHNA'S REVENUE FLOW — BUILD AS VISUAL SECTION

Add this as a visual section within the "Why IGEN?" area of the landing page:

```
CURRENT BROKEN FLOW (show in muted/crossed style):
Traffic → Content → Exit  (No monetisation)

IGEN'S PROPOSED FLOW (show in vibrant style):
Traffic → Content → Identity Selection → Interest Capture
    → EOI → Sales Follow-up → Membership → Upsell → Renewal

[Visual: Downward flow diagram with icons per step]
```

---

## PART 14: FINAL QUALITY CHECKLIST FOR AI AGENT

Before declaring the build complete, verify ALL of the following:

### Saurav's Architecture — All 23 Sections Implemented
- [ ] Section 3 — Landing Page with correct hero
- [ ] Section 4 — Personal Profile (10%)
- [ ] Section 5 — Company Profile (20%)
- [ ] Section 6 — Business Objectives (30%) — grouped
- [ ] Section 7 — Ecosystem Interest (40%)
- [ ] Section 8 — EXPO deep-dive
- [ ] Section 9 — NEWS deep-dive (all 5 products)
- [ ] Section 10 — AWARDS
- [ ] Section 11 — VIKSIT BHARAT CONFERENCE
- [ ] Section 12 — PARTNERS
- [ ] Section 13 — SPONSORS
- [ ] Section 14 — LEADERS
- [ ] Section 15 — Smart Recommendation Engine (live, real-time)
- [ ] Section 16 — Founding Member Advantages (shown EARLY)
- [ ] Section 17 — Business Goals Assessment
- [ ] Section 18 — Review Portfolio (with edit-back UX)
- [ ] Section 19 — Submission
- [ ] Section 20 — Thank You Page (personalised, prioritised CTAs)

### Meghna's Improvements — All Applied
- [ ] Step 0 Self-Identification added
- [ ] No credential-gating language anywhere
- [ ] Goals in 3 clusters, not flat list
- [ ] Recommendation engine is real-time, not post-selection
- [ ] Founding Member FOMO is on hero + 40% mark + persistent
- [ ] Price signals added per product
- [ ] LinkedIn field has rationale
- [ ] Revenue Band has rationale
- [ ] Transition bridge between Goals and Ecosystem
- [ ] Final CTA is "Secure My Founding Access"
- [ ] Thank You page shows personalised portfolio summary
- [ ] Thank You CTAs are prioritised (Schedule Discussion primary)
- [ ] Edit on review returns to exact section, not restart
- [ ] No "Submit" / "Apply" / "Fill" verbs anywhere — replaced per CTA table

### UX Quality
- [ ] Progress bar is sticky and always visible during form
- [ ] Auto-save toast appears after each step
- [ ] Form renders immediately — no loading state
- [ ] All transitions are smooth (300-400ms ease)
- [ ] Mobile layout tested at 375px
- [ ] Tap targets are minimum 44x44px
- [ ] Input font sizes are 16px minimum
- [ ] Validation errors are inline, no alert boxes
- [ ] URL params pre-fill work: ?product= ?source= ?team= ?city=

---

*Document synthesised from:*
*1. Saurav — IGEN World EOI Discovery & Interest Capture Platform (v1.0)*
*2. Meghna — EOI Form Submission Review & Recommendations (Sales Growth Leader / Co-Mother perspective)*
*For internal use by IGEN World development team.*
*India Global Expo News Platform Pvt Ltd — Confidential*
