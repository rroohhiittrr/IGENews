# SME/ASME Implementation Tasks

## Phase 1 — SME Pricing & Capability Alignment
- [x] Renamed Free plan to 'Free SME' (no 'Associate' labels) in `app/[locale]/(main)/profile/plans/sme/page.tsx`
- [x] Configured SME price points (Free: ₹0, Pro: ₹3,499, Elite: ₹6,999, Sovereign: ₹14,999)
- [x] Specified strict article limits (Free: 0, Pro: 4, Elite: 6, Sovereign: 8)

## Phase 2 — ASME (Associate SME) Pricing & Capability Alignment
- [x] Created ASME plans page at `app/[locale]/(main)/profile/plans/associate-sme/page.tsx`
- [x] Configured discounted ASME price points (Free: ₹0, Pro: ₹2,499, Elite: ₹4,999, Sovereign: ₹9,999)
- [x] Specified equivalent ASME article limits (Free: 0, Pro: 4, Elite: 6, Sovereign: 8)

## Phase 3 — SME Dashboards (Private/Public View Toggles)
- [x] Built Free SME dashboard in `components/profile/sme/free/FreeSMEDashboard.tsx`
- [x] Added public/private toggles to `AssociateSMEProDashboard.tsx` (Pro)
- [x] Added public/private toggles to `SMEEliteDashboard.tsx` (Elite)
- [x] Added public/private toggles to `SMESovereignDashboard.tsx` (Sovereign)

## Phase 4 — ASME Dashboards (Private/Public View Toggles)
- [x] Integrated `ASMETierRouter` inside `AssociateSmeDashboard.tsx` to handle plan routing
- [x] Implemented Free ASME dashboard in `components/profile/associate-sme/free/AssociateSMEFreeDashboard.tsx`
- [x] Implemented ASME Pro dashboard in `components/profile/associate-sme/pro/AssociateSMEProDashboard.tsx`
- [x] Implemented ASME Elite dashboard in `components/profile/associate-sme/elite/AssociateSMEEliteDashboard.tsx`
- [x] Implemented ASME Sovereign dashboard in `components/profile/associate-sme/sovereign/AssociateSMESovereignDashboard.tsx`

## Phase 5 — Routing & Integration Alignment
- [x] Updated `/profile` home page routing inside `app/[locale]/(main)/profile/page.tsx` to mount SME/ASME dashboards on approved/paid status
- [x] Enabled auto-onboarding validation updates in `CheckoutModal.tsx` on instant upgrades
- [x] Integrated verification badges for the new subscription levels in `ProfileHeader.tsx`

## Phase 6 — Affiliate Coupons & Partner Integration
- [x] Formatted dynamic invite coupon code engine (`SME-` & `ASME-` prefixes)
- [x] Implemented IGE Affiliate Invitation banner in public views across all tiers
- [x] Added Affiliate program panel in private views (Free cards, Pro tab, Elite & Sovereign revenue tab integration)

## Phase 7 — Navigation & Route Separation (Plans vs Profile)
- [x] Removed dashboard redirect from `app/[locale]/(main)/profile/plans/sme/page.tsx` so clicking "Subject Matter Expert - SME" in the sidebar displays the 4 SME subscription plans (Free SME, Pro, Elite, Sovereign).
- [x] Removed dashboard redirect from `app/[locale]/(main)/profile/plans/associate-sme/page.tsx` so clicking "Associate SME" in the sidebar displays the 4 ASME subscription plans.
- [x] Removed dashboard redirects from Company and Leader plan pages.
- [x] Unified `app/[locale]/(main)/profile/page.tsx` to handle user Profile Dashboards (SME, ASME, Company, Leader, Reader) when clicking "Profile" in the sidebar.
- [x] Added dynamic active profile summary banners to the plans pages with a direct shortcut button to the Profile Dashboard.

## Phase 8 — Sovereign In-App Upgrades & Realistic Sample Names
- [x] Replaced external `mailto:` link on Sovereign cards in `app/[locale]/(main)/profile/plans/sme/page.tsx` and `app/[locale]/(main)/profile/plans/associate-sme/page.tsx` with in-app `CheckoutModal` upgrades.
- [x] Replaced generic "SME Pro User" / placeholder names across all 8 SME and ASME dashboards with realistic sample expert names (`Dr. Vikram Malhotra` for SME, `Ananya Krishnan` for ASME).
- [x] Verified in browser: clicking "Upgrade to SME Sovereign" opens `CheckoutModal`, processes upgrade, and displays the SME Sovereign dashboard with sample expert branding.

## Phase 9 — Company Pages & Subscriptions (Complete Redesign)
- [x] Redesigned Company Plans & Pricing Page (`app/[locale]/(main)/profile/plans/company/page.tsx`) with 4 distinct tiers:
  - **Free Company Profile** (₹0/forever — Basic unverified profile with name, sector, and summary).
  - **Top Start-up** (`startup` — ₹9,999/mo · ₹99,990/yr | 1 Bundled Leader Page, Blue Tick, 4 Stakeholder Tabs).
  - **Top Company** (`company` — ₹16,999/mo · ₹1,69,990/yr | 2 Bundled Leader Pages, Priority Sector Ranking).
  - **Top Corporate** (`corporate` — ₹26,999/mo · ₹2,69,990/yr | 5 Bundled Leader Pages, Sector #1 Pinned Slot, Global Corridors).
- [x] Built interactive high-converting growth widgets:
  - **Live Verified Onboarding Ticker** (social proof marquee).
  - **"Nuclear Close" Sector Slot Scarcity Engine** (48-hour slot hold confirmation).
  - **Interactive LinkedIn & X vs. iGEN ROI Calculator** (dynamic 90x reach multiplier & cost savings calculation).
  - **Pre-Handled Objections FAQ Accordion** (6 core enterprise sales questions).
- [x] Built Bloomberg-grade Public Company Micro-Site (`components/profile/company/CompanyPublicProfile.tsx`):
  - 📈 **Investors Tab** (Turnover, Export %, Capacity, Credit Rating, Capex Roadmap, PDF Factsheet download).
  - 👥 **Employees Tab** (Bundled Executive Leader Profiles grid with bio modals, culture pillars, open roles).
  - 🤝 **Stakeholders Tab** (Banking partners SBI/HDFC/EXIM, Tier-1 vendor codes, ESG Net-Zero scorecard).
  - 📢 **Brand Tab** (Macro capability domains, verified IGE news coverage, national awards).
  - 🌍 **Global Corridors Tab** (Exclusive to Top Corporate — trade corridor routes & international regulatory seals).
- [x] Built Company Management Dashboard (`components/profile/company/free/CompanyDashboard.tsx`) with Private Admin Editor, Bundled Leaders Manager, Buyer Inquiries (RFQ) Inbox, and Public Profile Preview toggle.
- [x] Verified end-to-end via automated browser subagents.
