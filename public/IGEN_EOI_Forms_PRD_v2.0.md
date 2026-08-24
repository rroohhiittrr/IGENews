**IGEN WORLD**

Expression of Interest (EOI) Forms Platform — Full Specification

Product Requirements Document

All 20 Products · Full Form Fields · Per-Stage Hooks & CTAs · Homepage Content · CRM Rules

*India Global Expo · India Global News · IGEN Awards · IGEN Conferences*

Document

IGEN EOI Forms Platform — Full PRD v2.0

Version

v2.0

Date

17 June 2026

Status

Draft — for UX & Tech review

Products

20 products across 4 categories

CRM Source

IGEN CRM Master PRD v1.0 (Rohit Kumar / Vijay Singh)

Audience

IGEN UX Team + Technology Team

Version 2 of this PRD. Adds complete per-product form specs, per-stage hooks/CTAs, homepage content structure, and CRM reference ID rules — for all 20 products. Sections 5–8 are the core deliverable: each contains a full card-to-success-screen specification for every product in that category.

Contents

# 1\. Overview & The 20 Products

One central EOI platform, one form engine, **20 products**, four categories. Every visitor moves through the same five-part journey (landing → product page → consent → 4-stage form → success), with product-specific hooks, CTAs and Stage 3 fields at every step.

**Code**

**Category**

**Product**

**Icon**

**P1**

India Global Expo

Indian Exporters

📦

**P2**

India Global Expo

Global Importers

🌐

**P3**

India Global Expo

Global Exporters

✈️

**P4**

India Global Expo

Indian Importers

📥

**P5**

India Global Expo

Service Providers

🤝

**P6**

India Global News

SME Page

🏆

**P7**

India Global News

Associate SME Page

🌱

**P8**

India Global News

Company Page

🏢

**P9**

India Global News

Leader Page

👔

**P10**

India Global News

Reader Upgrade Plan

📰

**P11**

IGEN Awards

Nomination

🥇

**P12**

IGEN Awards

Sponsorship

🎗️

**P13**

IGEN Awards

Branding

📢

**P14**

IGEN Awards

Certification

🏅

**P15**

IGEN Awards

Conference

🎤

**P16**

IGEN Conferences

Sponsorships

💼

**P17**

IGEN Conferences

Speakers & Thought Leadership

🎙️

**P18**

IGEN Conferences

Delegates & Memberships

🎟️

**P19**

IGEN Conferences

Awards & Recognition

🏆

**P20**

IGEN Conferences

Research, Media & Visibility

📊

Existing in current build: P1–P5 (India Global Expo) and P6–P10 (India Global News). New in this PRD: P11–P15 (IGEN Awards) and P16–P20 (IGEN Conferences).

# 2\. The 5-Part UX Journey

**Step**

**Screen**

**Progress**

**Data event**

Landing page

Hero + category tabs + 20 product cards + Get in Touch

—

—

Product landing

Headline · who/what/why · hook · CTA

—

—

Consent gate

Data + privacy agreement (mandatory)

—

Consent stored

Stage 1 — Quick Entry

Full Name · Mobile · Email · City · Interested In

25%

Lead created

Stage 2 — Business

Company · Sector · Role · Category · Years

50%

Lead patched

Stage 3 — Product Details

Product-specific fields (unique per product)

75%

Lead patched

Stage 4 — Intent & Goals

Why · Source · Multi-product grid · Consent · Submit

90% → 100%

Lead qualified

Success

Reference ID · reward · share actions

100% ✅

ID issued

Stage labels in the UI progress bar: Quick Entry | Business | Product Details | Intent & Goals. Progress bar fills 25% per stage; the bar reads 90% during Stage 4 filling and 100% on submission.

# 3\. Homepage Content & Copy Structure

This section specifies the **exact required content and copy** for every section of the EOI landing page — from the hero block to the footer link. Visual styling and component choices are left to the UX team.

## 3.1 Hero Section

**Element**

**Required Content / Copy**

**Badge / pill above headline**

🇮🇳 India's First AI-Powered Trade Intelligence & Industry Ecosystem Platform

**Headline**

Become a Founding Member of IGEN World — Before Everyone Else Joins.

**Sub-headline**

IGEN News | IGEN Expo | IGEN Awards | Viksit Bharat Conference

**Tagline**

20 Products. One Ecosystem. Unlimited Opportunity.

**Live stats bar**

● LIVE \[n\] EOIs Submitted · \[n\] Cities · \[n\] Countries (real-time counter from CRM)

**Primary CTA**

→ Express Your Interest Now — It's Free

**Reassurance line**

Takes less than 60 seconds. No payment. No commitment. Just your interest.

**Scroll cue**

↓ Scroll to explore

## 3.2 Category Navigation Tabs

Tabs in order: **All Forms · India Global Expo · India Global News · IGEN Awards · IGEN Conferences**. Default on load: All Forms (20 products visible, grouped by category). Selecting a tab filters the grid in place — no page reload.

## 3.3 Product Card Grid — 20 Cards

Each card shows: icon + product name + about line + *'Fill: 4 steps (~60s)'* metadata + hook + CTA. Cards are equal-size within a responsive grid. The card hooks and CTAs for all 20 products are specified in Sections 5–8.

**Card element**

**Requirement**

**Product icon**

Category-relevant emoji or icon (specified per product in Sections 5–8)

**Product name**

Display name (e.g. 'Indian Exporters', 'SME Page', 'Nomination')

**About line**

One sentence describing what the form is for (specified per product)

**Metadata**

Fill: 4 steps (~60s) · No payment · Data safe

**Hook**

Product-specific persuasive line (see Sections 5–8 — 'Card Hook')

**CTA button**

Product-specific action label (see Sections 5–8 — 'Card CTA')

**Selected state**

Active card highlights in Navy (#1D1D46) with white text and a ✓ badge

## 3.4 “What Happens After Your EOI?” — 5-Step Journey Block

A visual 5-step timeline below the cards, showing the post-submission journey. Required content:

**Step**

**Label**

**Description**

Step 1

Submit Your EOI

Fill out your expression of interest in under 5 minutes. No payment required.

Step 2

Team Contacts You

Our dedicated onboarding team calls you within 24 hours to discuss your application.

Step 3

Receive Your Pack

Get your product brochure, pricing details, and onboarding requirements on WhatsApp + Email.

Step 4

Profile Created

Our team builds your IGEN profile or page and reviews it before platform launch.

Step 5

Go Live at Launch

Your page, profile, or participation goes live when IGEN officially launches — with founding member advantages.

## 3.5 Get in Touch Block

For undecided visitors. Hook: *"Not sure where to start? Tell us a little and the IGEN team will call you."*

**Field**

**Label in UI**

**Type**

**Required**

**Notes**

Full Name

Full Name \*

Text

Yes

Placeholder: Your Full Name | 2–100 chars

Mobile Number

Mobile Number \*

Phone

Yes

Flag: 🇮🇳 +91 default | Placeholder: 10-digit mobile number

Comment

Comments / What are you looking for? \*

Textarea

Yes

Placeholder: Tell us what you'd like to do or ask...

CTA: **"Submit Enquiry & Request Call"**

# 4\. Common Form Template (applies to all 20 products)

Stages 1, 2 and 4 are **identical across all 20 products** except for: (a) the product-specific hook and CTA at each stage, and (b) the Event City field added in Stage 1 and Stage 2 for IGEN Awards and IGEN Conferences products. The per-product hooks and CTAs are in Sections 5–8. Stage 3 is fully product-specific and defined per product in Sections 5–8.

## 4.1 Stage 1 — Quick Entry (25% complete)

UI title: **"STEP 1 OF 4"** + **"Let's Start. Just 20 Seconds."** | Back: none | Forward: Continue → (Step 1 of 4)

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

Min 2, Max 100 chars. A–Z a–z, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

🇮🇳 +91 default country code. 10-digit India / international with code. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled display

Yes ★

Auto-set from selected product card. Shown as: \[icon\] \[Product Name\]. User can change here.

**\[AWARDS + CONF ONLY\] Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · No preference / All

## 4.2 Stage 2 — Business (50% complete)

UI title: **"STEP 2 OF 4"** + **"Tell Us About Your Business"** | Auto-save note: *"🏁 Your progress is auto-saved. You can return anytime to complete your application."*

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Optional. Placeholder: www.yourcompany.com

**Business Category**

Pill toggles

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**\[AWARDS + CONF ONLY\] Target City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All (confirm event city)

## 4.3 Stage 4 — Intent & Goals (90% → 100% on submit)

UI title: **"STEP 4 OF 4"** + product-specific title | Progress: 90% during fill → 100% on submit.

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: Tell us about your business goals...

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM coupon database. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons (P1–P20). Current product pre-ticked. User may add more.

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent checkbox**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

Submit button label: product-specific (see per-product sections) — default: '🎉 Submit My IGEN Application'. Sub-text below submit button: 'By submitting, you agree to be contacted by the IGEN team. Your information is safe. No payment required.'

## 4.4 Progress & Save Rules

-   **Stage 1 submit:** Lead is created in CRM instantly (status: Incomplete — 25%). User advances without waiting for server response.
-   **Stages 2 & 3:** Lead record is patched (enriched) with new data. Completion score updates to 50% then 75%.
-   **Stage 4 submit:** Lead is finalised. Status: Fully Qualified — 100%. Reference ID is issued.
-   **Abandonment:** Inactivity > ~15 minutes after Stage 1 → lead flagged 'Incomplete' with completion score and queued for recovery outreach.
-   **Auto-save note:** Shown in Stage 2 header: '🏁 Your progress is auto-saved. You can return anytime to complete your application.'

# 5\. CRM Reference ID & System Rules

Source: **IGEN CRM Master PRD v1.0** (Rohit Kumar, CRM Head / Vijay Singh, Founder & CEO, India Global Expo News Platform Pvt. Ltd.)

## 5.1 Reference / User ID Format

Format: IGEN-{submission\_timestamp}-{4-digit random}

Example: IGEN-1781673282-7921

• Timestamp = Unix epoch timestamp (server-side, UTC) at moment of Stage 4 submission.

• 4-digit random = cryptographically random 4-digit number (0001–9999), zero-padded.

• Generated server-side only — never on the client.

• Unique per submission; stored as the lead's primary reference in the IGEN CRM.

• Displayed on the success screen as a copyable pill/badge.

• Included in WhatsApp and email confirmation messages to the user.

• Format connector is a hyphen ( - ). No spaces. Always uppercase IGEN.

## 5.2 Auto-Tagging on EOI Capture

**Tag**

**System behaviour**

**Product tag**

P1–P20 (product code auto-assigned from the selected card)

**Source channel**

Website / Facebook / Instagram / WhatsApp / Event / Call / Associate SME (auto-detected)

**City**

From Stage 1 City field

**Event City**

From Stage 1 Event City field (Awards + Conferences only)

**Coupon / Associate SME**

Auto-populated from coupon code lookup. Null if no coupon used.

**Submission timestamp**

ISO 8601 date-time; server-side stamped on Stage 1 submit (lead creation).

## 5.3 Duplicate Detection

-   **If same email OR same mobile number exists in CRM:** system shows: "An EOI already exists for this contact. View existing record?" — blocks duplicate creation unless manually overridden by Sales Head.
-   **Mobile format:** +91 prefix enforced for India numbers. International numbers must include country code.
-   **Coupon validation:** Code must match an active coupon in Affiliate CRM. Invalid: "This coupon code is not valid or has expired." — submission still allowed without a coupon.

## 5.4 Notifications Triggered by EOI Submission

**Trigger**

**Message (channel)**

**Stage 1 submit — client**

WhatsApp + Email: "Thank you \[Name\], we have received your interest in \[Product\]. Our team will contact you within 24 hours."

**Stage 1 submit — agent assigned**

In-App + WhatsApp: "New EOI assigned to you: \[Name\] interested in \[Product\]. Follow up within 2 hours."

**Stage 4 submit — client (full)**

WhatsApp + Email: "Your IGEN Application is complete. Reference: IGEN-{id}. Brochure and next steps below."

**Follow-up reminder Day 3**

In-App + WhatsApp to agent: "EOI from \[Name\] has not been contacted in 3 days. Action required."

**Conversion (paid)**

In-App to Founder/CRM Head: "\[Product\] EOI converted to paid by \[Agent\] — \[Company\]."

**Abandonment (~15 min after Stage 1)**

Internal CRM flag: Incomplete Application. Queued for recovery outreach.

## 5.5 Associate SME Coupon Code Format

Format: \[CITY-3-LETTER\]\[SME or RESELLER\]\[DISCOUNT%\]\[MEMBER-ID\]

Example: BLRSME15072 = Bengaluru · SME · 15% discount · Member ID 072

• Auto-generated by Affiliate CRM on Associate SME approval. Cannot be manually set.

• City codes: DEL · MUM · BLR · HYD · CHN · AMD (and others as network grows)

• Entered by prospect in Stage 4 optional Coupon Code field.

• Commission attributed 100% to the matching Associate SME on conversion.

# 6\. India Global Expo — 5 Product Specifications

Each product below is specified card-to-success, in order: Card Copy → Product Landing Page → Stage 1 → Stage 2 → Stage 3 → Stage 4 → Success Screen.

## P1 📦 Indian Exporters

**Product Card Copy**

**Card Element**

**Content**

**About line**

Register your export business and get discovered by verified international buyers across 195 countries.

**Card hook**

**Get discovered by buyers in 195 countries — before your competitor does.**

**Card CTA**

**Register Exporter Interest**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Your export business deserves a global storefront.**

**Sub-headline**

Founding exporters rank first in their sector at platform launch.

**Who should apply**

Indian manufacturers, producers and traders ready to scale into global markets.

**What this form gives you**

A verified Indian Exporter profile with 195-country buyer discovery and EXIM intelligence.

**Why now / why founding**

Founding-edition exporters are top-ranked in their sector from Day 1 — before the platform opens to all.

**Page hook**

**Get discovered by buyers in 195 countries — before your competitor does.**

**Page CTA**

**Begin Exporter Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to claim your founding-exporter spot — it goes live first.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 📦 Indian Exporters. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your business so the right international buyers discover you.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Exporter Profile Details"**

**💡 HOOK** *Your export profile is how 195 countries find and trust you.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Legal Name**

Text

Yes ★

Registered name; up to 200 chars

**Export Product Category**

Dropdown

Yes ★

Category framework (primary product group)

**Destination Countries**

Multi-select

Yes ★

All 195 countries; select active or target markets

**Annual Export Turnover**

Dropdown

Yes ★

<₹1 Cr · ₹1–5 Cr · ₹5–25 Cr · ₹25–100 Cr · ₹100 Cr+ · Prefer not to say

**IEC (Importer-Exporter Code)**

Radio

Yes ★

Yes (have IEC) · Applied / In Process · No (not yet)

**Export Sector**

Dropdown

Yes ★

50-sector framework (secondary classification)

**Target Markets**

Multi-select

Yes ★

Regions: Africa · Americas · Asia-Pacific · Europe · GCC · South Asia

**Certified / Award-winning Exporter?**

Radio

No

Yes · No. If Yes: please name the certification/award

**Primary Export Challenge**

Dropdown

No

Buyer discovery · Payment · Logistics · Documentation · Tariffs · Other

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *One last step — lock in founding-exporter ranking priority before we launch.*

**➜ CTA 🎉 Submit Exporter EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Expo onboarding team will call you within 24 hours. 2. You'll receive your Exporter brochure and onboarding pack on WhatsApp + Email. 3. Your verified exporter profile will be created and reviewed. 4. Your profile goes live at launch — ranked first in your sector.

**Reward / recognition**

**You're a Founding Exporter. Top-ranked sector discovery is reserved for you at platform launch.**

**Download CTA**

Download Exporter Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P2 🌐 Global Importers

**Product Card Copy**

**Card Element**

**Content**

**About line**

Register as an international buyer and get matched with verified Indian suppliers across 50 sectors.

**Card hook**

**Discover India's most verified suppliers — in one place, before the platform opens.**

**Card CTA**

**Register Importer Interest**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Source from India with trust, not guesswork.**

**Sub-headline**

Early importers get first-mover supplier matching the moment the platform opens.

**Who should apply**

International buyers, sourcing managers and procurement teams buying from India.

**What this form gives you**

Verified Indian supplier discovery across 50 sectors and 1,200+ industries, with EXIM intelligence.

**Why now / why founding**

First-mover importers get priority supplier matching at launch — before the queue grows.

**Page hook**

**Discover India's most verified suppliers — in one place, before the platform opens.**

**Page CTA**

**Begin Importer Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to unlock first-mover Indian supplier access.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🌐 Global Importers. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us what you source so we match you with the right verified suppliers.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Importer Profile Details"**

**💡 HOOK** *Sharper sourcing needs — sharper supplier matches. Help us find your perfect suppliers.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★

International buyer company; up to 200 chars

**Country of Origin**

Dropdown

Yes ★

All 195 countries

**Products to Import from India**

Multi-select / text

Yes ★

Category framework + free text

**Sectors of Interest**

Multi-select

Yes ★

50-sector framework; up to 5

**Annual Import Volume (from India)**

Dropdown

Yes ★

<$50K · $50K–$250K · $250K–$1M · $1M–$5M · $5M+ · Prefer not to say

**How Do You Currently Find Indian Suppliers?**

Dropdown

Yes ★

Trade shows · B2B platforms · Referrals · India office · No structured method

**Biggest Sourcing Challenge**

Dropdown

No

Supplier verification · Quality assurance · Price discovery · Logistics · Communication · Other

**Verified-Supplier Certification needed?**

Radio

No

Yes — for procurement compliance · No · Nice to have

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — secure first-mover supplier matching before we launch.*

**➜ CTA 🎉 Submit Importer EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Text Area

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Expo team will contact you within 24 hours. 2. You'll receive your Importer sourcing pack on WhatsApp + Email. 3. Your buyer profile is created and verified. 4. Supplier matches go live at launch.

**Reward / recognition**

**You're in. First-mover supplier matching is reserved for your account at launch.**

**Download CTA**

Download Importer Sourcing Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P3 ✈️ Global Exporters

**Product Card Copy**

**Card Element**

**Content**

**About line**

Register to enter India's high-growth market with verified buyer connections and market-entry intelligence.

**Card hook**

**Enter India's fastest-growing market — with the intelligence to do it right.**

**Card CTA**

**Register Global Export Interest**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Sell into India — with the data to do it right.**

**Sub-headline**

Priority matching with Indian importers at launch, before the queue opens.

**Who should apply**

International exporters, manufacturers and brands targeting Indian buyers and importers.

**What this form gives you**

India market-entry intelligence: verified importers, tariff data and sector insights.

**Why now / why founding**

Early registrations get priority matching with verified Indian importers at platform launch.

**Page hook**

**Enter India's fastest-growing market — with the intelligence to do it right.**

**Page CTA**

**Begin Global Exporter Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your India market entry — on the fastest-growing sourcing platform.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: ✈️ Global Exporters. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your business so we map your India market opportunity.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Global Exporter Profile"**

**💡 HOOK** *The more we know, the more precisely we match you with Indian buyers.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Country of Origin**

Dropdown

Yes ★

All 195 countries

**Products / Services Exported**

Multi-select / text

Yes ★

Category framework + free text

**Target Sector in India**

Multi-select

Yes ★

50-sector framework

**Currently Export to India?**

Radio

Yes ★

Yes · No · Previously but stopped

**Annual Export Turnover (global)**

Dropdown

No

<$100K · $100K–$500K · $500K–$2M · $2M–$10M · $10M+ · Prefer not to say

**Primary India Entry Challenge**

Dropdown

No

Finding verified buyers · Import duties · Regulatory compliance · Local distributor · Price competition · Other

**Preferred India Entry Mode**

Dropdown

No

Direct to importer · Distributor / agent · Joint venture · India office · Not sure

**Certifications / Standards held**

Text

No

E.g. ISO, CE, FDA, BIS. Free text.

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — lock in priority Indian-buyer matching before launch.*

**➜ CTA 🎉 Submit Global Exporter EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Expo team will contact you within 24 hours. 2. India market-entry guide delivered on WhatsApp + Email. 3. Your exporter profile is created. 4. Buyer matches go live at launch.

**Reward / recognition**

**You're set. Priority matching with verified Indian importers is reserved for you at launch.**

**Download CTA**

Download India Market Entry Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P4 📥 Indian Importers

**Product Card Copy**

**Card Element**

**Content**

**About line**

Register as an Indian importer and access verified global suppliers from 195 countries with trade intelligence.

**Card hook**

**Source globally. Import intelligently. Get there before your competitor.**

**Card CTA**

**Register Importer Interest**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Find the right global supplier — before your competitor does.**

**Sub-headline**

Founding importers get early access to the global supplier matching engine.

**Who should apply**

Indian importers, procurement teams and distributors sourcing products from international markets.

**What this form gives you**

Global supplier discovery across 195 countries, with tariff, duty and import compliance intelligence.

**Why now / why founding**

Founding importers access the supplier matching engine first — priority over all later registrations.

**Page hook**

**Source globally. Import intelligently. Get there before your competitor.**

**Page CTA**

**Begin Indian Importer Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to access global supplier intelligence from 195 countries.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 📥 Indian Importers. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your business and we'll surface your best global source markets.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Indian Importer Profile"**

**💡 HOOK** *Your import profile shapes which global suppliers we match you with.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Products Imported / Sourced**

Multi-select / text

Yes ★

Category framework + free text

**Countries Currently Imported From**

Multi-select

Yes ★

All 195 countries

**Sector**

Dropdown

Yes ★

50-sector framework

**Annual Import Value**

Dropdown

Yes ★

<₹50L · ₹50L–₹2 Cr · ₹2–10 Cr · ₹10–50 Cr · ₹50 Cr+ · Prefer not to say

**IEC (Importer-Exporter Code)**

Radio

Yes ★

Yes (have IEC) · Applied / In Process · No (not yet)

**Biggest Import Challenge**

Dropdown

No

Supplier verification · Quality assurance · Price discovery · Logistics · Customs · Currency · Other

**Primary Sourcing Goal on IGEN Expo**

Dropdown

No

Find new suppliers · Verify existing suppliers · Price benchmarking · Expand categories · All of the above

**GST Registration**

Radio

Yes ★

GST registered · Composition scheme · Not yet registered

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — unlock early access to the global supplier matching engine.*

**➜ CTA 🎉 Submit Importer EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Expo team will call you within 24 hours. 2. Global sourcing guide delivered on WhatsApp + Email. 3. Your importer profile is created. 4. Supplier matches go live at launch.

**Reward / recognition**

**You're in. Early access to the global supplier matching engine is reserved for you at launch.**

**Download CTA**

Download Global Sourcing Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P5 🤝 Service Providers

**Product Card Copy**

**Card Element**

**Content**

**About line**

Register as a verified EXIM service provider and be the first professional buyers find when they need freight, customs, trade-finance or EXIM consulting.

**Card hook**

**Be the first EXIM service provider buyers find — before the platform opens.**

**Card CTA**

**Register Service Provider Interest**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Stop chasing leads. Let exporters and importers find you.**

**Sub-headline**

Launch-day providers get maximum sector visibility before any competitors join.

**Who should apply**

Freight forwarders, customs brokers, trade-finance providers and EXIM consultants.

**What this form gives you**

A verified EXIM service provider profile with a built-in lead generation engine.

**Why now / why founding**

Launch-day providers rank first in their service category before the platform opens to all.

**Page hook**

**Be the first EXIM service provider buyers find — before the platform opens.**

**Page CTA**

**Begin Service Provider Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to claim maximum sector visibility at platform launch.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🤝 Service Providers. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your practice so the right clients find you at the right moment.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your EXIM Service Provider Profile"**

**💡 HOOK** *Your service profile is how exporters and importers will shortlist you.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Firm Name**

Text

Yes ★

Up to 200 chars

**Type of EXIM Service**

Checkbox

Yes ★

Freight forwarding · Customs brokerage · Trade finance · EXIM consulting · Logistics · Insurance · Legal & compliance · Documentation · Other

**Primary Sectors Served**

Multi-select

Yes ★

50-sector framework; up to 5

**Active Client Count**

Dropdown

No

1–10 · 11–50 · 51–200 · 201–500 · 500+

**Licensed / Registered?**

Checkbox

No

DGFT licensed · FFFAI member · IATA accredited · RBI authorised · Other · None yet

**Years in EXIM Services**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years

**Markets / Corridors Served**

Multi-select

No

Africa · Americas · Asia-Pacific · Europe · GCC · South Asia

**Primary Goal on IGEN Expo**

Dropdown

Yes ★

Lead generation · Brand credibility · Client discovery · Market expansion · All of the above

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — lock in launch-day sector visibility before the platform opens.*

**➜ CTA 🎉 Submit Service Provider EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Expo team will contact you within 24 hours. 2. Your service provider brochure delivered on WhatsApp + Email. 3. Your verified profile is created. 4. Clients start discovering you at launch.

**Reward / recognition**

**You're listed. Maximum sector visibility is reserved for you at platform launch.**

**Download CTA**

Download Service Provider Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

# 7\. India Global News — 5 Product Specifications

Each product below is specified card-to-success, in order: Card Copy → Product Landing Page → Stage 1 → Stage 2 → Stage 3 → Stage 4 → Success Screen.

## P6 🏆 SME Page

**Product Card Copy**

**Card Element**

**Content**

**About line**

Establish your authority as a verified sector expert. Fill in your professional background and areas of expertise to share thought leadership and join the consulting marketplace.

**Card hook**

**Your 20 years of experience deserves a national stage — and income.**

**Card CTA**

**Apply as a Founding SME**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Turn your expertise into authority, discovery and income.**

**Sub-headline**

Only 100 founding SME slots. Year 1 is free for the first 100.

**Who should apply**

Experienced industry professionals and sector experts with 20+ years of experience.

**What this form gives you**

A national SME profile with thought-leadership publishing rights and consulting marketplace access.

**Why now / why founding**

Only 100 founding SME slots. Year 1 is free. After 100, standard rates apply.

**Page hook**

**Your 20 years of experience deserves a national stage — and income.**

**Page CTA**

**Begin SME Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to claim one of 100 founding SME slots. Year 1 is free.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🏆 SME Page. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your background so buyers and consulting clients can find you.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your SME Page Details"**

**💡 HOOK** *Your expertise profile is your national credibility — get it right.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Primary Industry / Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Years of Professional Experience**

Dropdown

Yes ★

10–15 · 15–20 · 20–25 · 25–30 · 30+ years

**Your Top Areas of Expertise**

Textarea

Yes ★

Consulting topics and areas of expertise. Min 30 words.

**Do you currently offer consulting services?**

Radio

Yes ★

Yes · No · Planning to

**LinkedIn Profile URL**

URL

No

https://linkedin.com/in/yourname

**Have you written industry articles or reports?**

Radio

Yes ★

Yes · No

**Interested in joining the IGEN Awards Jury?**

Radio

No

Yes · Maybe · No

**Preferred SME Plan**

Radio

Yes ★

Founding SME (Free Year 1) · Standard SME

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — secure free Year-1 founding membership before the 100 slots fill.*

**➜ CTA 🎉 Submit SME EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our SME Onboarding Team will call you within 24 hours. 2. You'll receive your Founding SME Application form on WhatsApp + Email. 3. Your profile will be created and reviewed by our team. 4. Once approved — your SME Page goes live at launch.

**Reward / recognition**

**You're a Founding SME — Year 1 free. Your national profile is reserved among the first 100.**

**Download CTA**

Download SME Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P7 🌱 Associate SME Page

**Product Card Copy**

**Card Element**

**Content**

**About line**

Build your professional identity and emerging sector visibility. Fill in your current industry role, sectors of work, and professional goals.

**Card hook**

**Build your industry identity now — and grow into Top SME status.**

**Card CTA**

**Apply as Associate SME**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Start your authority journey — and grow into full SME status.**

**Sub-headline**

First 100 Associate SME spots come with founding-member recognition in your city.

**Who should apply**

Rising professionals and mid-career experts with 10+ years building their industry profile.

**What this form gives you**

Visibility as an emerging expert, entry to the consulting marketplace, and a path to full SME membership.

**Why now / why founding**

First 100 founding Associate SME slots — founding recognition in your city, before rates change.

**Page hook**

**Build your industry identity now — and grow into Top SME status.**

**Page CTA**

**Begin Associate SME Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your industry identity — be first in your city.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🌱 Associate SME Page. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your work so we place you in the right sector for maximum visibility.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Associate SME Profile"**

**💡 HOOK** *Define the expertise you want to be known for — your professional identity starts here.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Primary Industry / Sector**

Dropdown

Yes ★

50-sector framework

**Years of Professional Experience**

Dropdown

Yes ★

5–10 · 10–15 · 15–20 · 20+ years

**Current Role / Position**

Text

Yes ★

E.g. Senior Manager / VP / Consultant

**Top Expertise Areas**

Textarea

Yes ★

What you want to be known for. Min 20 words.

**LinkedIn Profile URL**

URL

No

https://linkedin.com/in/yourname

**Do you want to offer consulting through IGEN?**

Radio

Yes ★

Yes · Not yet · Maybe

**Do you actively mentor or network?**

Radio

No

Yes · No · Occasionally

**Interest in growing to Full SME Page?**

Radio

No

Yes · Maybe · No

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — claim your founding Associate SME badge in your city.*

**➜ CTA 🎉 Submit Associate SME EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our team will contact you within 24 hours. 2. Your Associate SME onboarding pack arrives on WhatsApp + Email. 3. Your profile is created and reviewed. 4. Goes live at launch with city founding-member status.

**Reward / recognition**

**Application received. You're in line to be a founding Associate SME in your city.**

**Download CTA**

Download Associate SME Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P8 🏢 Company Page

**Product Card Copy**

**Card Element**

**Content**

**About line**

Create a verified, SEO-ready company page to build digital trust. Fill in company legal details, founding year, employee count, and sector information.

**Card hook**

**Build India's most trusted digital company identity — before your competitors do.**

**Card CTA**

**Register Company Interest**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**A verified company page buyers and investors actually trust.**

**Sub-headline**

Founding company pages get permanent front-page discovery advantage at launch.

**Who should apply**

Companies that want to be trusted, discovered and chosen by buyers, investors and partners.

**What this form gives you**

A Blue-Tick, Google-indexed company profile with investor, brand and leader sub-tabs.

**Why now / why founding**

Founding company pages rank first in their sector from launch day and carry permanent discovery advantage.

**Page hook**

**Build India's most trusted digital company identity — before your competitors do.**

**Page CTA**

**Begin Company Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your verified company identity — permanent launch-day ranking.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🏢 Company Page. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us about your company so we build the most powerful profile for you.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Company Page Details"**

**💡 HOOK** *Show buyers and investors what makes your company the right choice.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company Legal Name**

Text

Yes ★

Registered name; up to 200 chars

**Company Type**

Dropdown

Yes ★

Private Ltd · Public Ltd · LLP · Proprietorship · Partnership · Trust/NGO · Government · Other

**Year of Incorporation**

Number

Yes ★

4-digit year. 1800–current year.

**Primary Sector**

Dropdown

Yes ★

50-sector framework

**Number of Employees**

Dropdown

Yes ★

1–10 · 11–50 · 51–200 · 201–500 · 500–1000 · 1000+

**Company Website**

URL

No

https://

**What should buyers and investors discover about you?**

Textarea

Yes ★

Key differentiator, achievement or story. Min 30 words.

**Bundle Leader Pages?**

Radio

No

Yes (link founders/CXOs) · No · Not sure

**Preferred Company Page Tier**

Radio

Yes ★

Free / Verified · Standard · Premium · Platinum (see brochure for details)

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — lock in permanent front-page discovery before launch.*

**➜ CTA 🎉 Submit Company EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Company Page team will contact you within 24 hours. 2. Your Company Page pack delivered on WhatsApp + Email. 3. Your verified profile is created and reviewed. 4. Goes live at launch — front-page ranked in your sector.

**Reward / recognition**

**You're in. A permanent front-page discovery advantage is reserved for your company at launch.**

**Download CTA**

Download Company Page Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P9 👔 Leader Page

**Product Card Copy**

**Card Element**

**Content**

**About line**

Publish thought leadership and build personal executive brand. Fill in designation, company, industry sector, and leadership goals.

**Card hook**

**Your leadership profile must work as hard as you do — and be found by the right people.**

**Card CTA**

**Claim Your Leader Page**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**An executive identity that travels with you — and gets you found.**

**Sub-headline**

Founding leaders get priority nomination in the inaugural IGEN Awards.

**Who should apply**

Senior executives, founders and board members building a personal brand and legacy.

**What this form gives you**

A discoverable Leader Page for CEOs, CFOs, CTOs, founders and MDs with publishing access.

**Why now / why founding**

Founding leaders get permanent recognition and priority nomination in the inaugural IGEN Awards.

**Page hook**

**Your leadership profile must work as hard as you do — and be found by the right people.**

**Page CTA**

**Begin Leader Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to claim your executive identity — and awards-nomination priority.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 👔 Leader Page. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your role so we position your profile to reach the right audience.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Leader Page Details"**

**💡 HOOK** *Define how investors, boards and industry peers should discover you.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Leader Full Name**

Text

Yes ★

2–100 chars; same as Section 0 standard

**Designation**

Text

Yes ★

E.g. Founder & CEO / CFO / Managing Director / Chairman

**Current Company**

Text

Yes ★

Associated organisation

**Primary Sector**

Dropdown

Yes ★

50-sector framework

**LinkedIn Profile URL**

URL

No

https://linkedin.com/in/yourname

**Application Type**

Radio

Yes ★

Applying for myself · Sponsored by my company · On behalf of a leader (agency/PR)

**What is the primary goal of this Leader Page?**

Checkbox

Yes ★

Investor visibility · Board opportunities · Speaking invitations · Awards recognition · Thought leadership · Media coverage · Business development

**Key Achievement / Story**

Textarea

Yes ★

One headline achievement that defines your leadership. Min 30 words.

**Awards / Recognition already received**

Text

No

Optional: any prior national / international recognition

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — secure inaugural IGEN Awards nomination priority.*

**➜ CTA 🎉 Submit Leader EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Leader Page team will contact you within 24 hours. 2. Your Leader Page onboarding pack on WhatsApp + Email. 3. Your executive profile is created and reviewed. 4. Goes live at launch with inaugural awards-nomination priority.

**Reward / recognition**

**You're set. Priority nomination in the inaugural IGEN Awards is reserved for you.**

**Download CTA**

Download Leader Page Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P10 📰 Reader Upgrade Plan

**Product Card Copy**

**Card Element**

**Content**

**About line**

Subscribe to premium AI-curated sector intelligence and bilateral reports. Fill in sectors of interest, news consumption channels, and reason for upgrading.

**Card hook**

**Stop being overwhelmed by noise. Start receiving the intelligence that moves your business.**

**Card CTA**

**Join as Founding Reader**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**AI-curated industry intelligence across 50 sectors — no noise, only signal.**

**Sub-headline**

First 500 founding readers get permanent recognition and a founding badge.

**Who should apply**

Business professionals, investors and sector leaders who need high-quality intelligence to make decisions.

**What this form gives you**

Curated sector news, trade-intelligence reports, bilateral country reports and SME consulting access.

**Why now / why founding**

First 500 founding readers get permanent recognition and lifetime founding-member status.

**Page hook**

**Stop being overwhelmed by noise. Start receiving the intelligence that moves your business.**

**Page CTA**

**Begin Reader Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to join the first 500 founding readers — permanent recognition.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 📰 Reader Upgrade Plan. Switchable by user.

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us about you so we tune your AI intelligence feed to exactly what you need.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Reader Profile & Preferences"**

**💡 HOOK** *Pick your sectors and signals — your personalised intelligence starts here.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Sectors of Interest**

Multi-select

Yes ★

50-sector framework; up to 5 sectors

**How do you currently consume business news?**

Checkbox

Yes ★

Email newsletter · LinkedIn · News apps · Print media · Industry portals · WhatsApp groups · Podcasts

**Primary Reason to Upgrade**

Radio

Yes ★

Better sector intelligence · Bilateral trade reports · SME consulting access · Sector rankings · Research reports · All of the above

**Frequency Preference**

Radio

Yes ★

Daily digest · Weekly roundup · As published

**Are you interested in consulting with an IGEN SME?**

Radio

No

Yes · Maybe · No

**Preferred Reader Plan**

Radio

Yes ★

Founding Reader (Early Access) · Standard Premium · Enterprise Team License

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — claim permanent founding-reader recognition before 500 slots fill.*

**➜ CTA 🎉 Submit Reader EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our team will contact you within 24 hours. 2. Your Reader onboarding pack on WhatsApp + Email. 3. Your personalised feed is configured. 4. Full access goes live at launch with founding badge.

**Reward / recognition**

**Welcome, Founding Reader. Permanent recognition among the first 500 is reserved for you.**

**Download CTA**

Download Reader Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

# 8\. IGEN Awards — 5 Product Specifications

Each product below is specified card-to-success, in order: Card Copy → Product Landing Page → Stage 1 → Stage 2 → Stage 3 → Stage 4 → Success Screen.

## P11 🥇 Nomination

**Product Card Copy**

**Card Element**

**Content**

**About line**

Apply to have your company, leader, or sector achievement evaluated and recognised at the IGEN Awards across six Indian cities.

**Card hook**

**Recognition that becomes credibility, trust, market positioning — and business growth.**

**Card CTA**

**Apply for Nomination**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Be recognised — and turn recognition into real business growth.**

**Sub-headline**

Founding-edition nominees are recognised first on the most prestigious stage.

**Who should apply**

Founders, leaders, MSMEs and companies with a track record worth recognising.

**What this form gives you**

A jury-evaluated nomination across leadership, company, sector and theme award categories.

**Why now / why founding**

Founding-edition nominees enter the inaugural recognition cycle — highest visibility, most prestige.

**Page hook**

**Recognition that becomes credibility, trust, market positioning — and business growth.**

**Page CTA**

**Begin Nomination**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your nomination — founding-edition recognition cycle.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🥇 Nomination. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · No preference / All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us who you're nominating so we route to the right award group and jury.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Event City (confirm)**

Multi-select

Yes ★

Confirm city/cities for award ceremony attendance

**Stage 3** — Product Details

**"Your Nomination Details"**

**💡 HOOK** *Your achievement story is what the jury evaluates — make it compelling.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Nomination Type**

Radio

Yes ★

Self-nomination · On behalf of company · On behalf of a leader

**Award Group**

Dropdown

Yes ★

Individual Leadership · Organisation · Sector / Industry · Theme · Government / PSU

**Award Category**

Dropdown (depends on group)

Yes ★

Individual: Founder / CEO / CXO / Women Leadership / Young Leader | Organisation: Startup / MSME / Enterprise / Manufacturing / Technology / Export | Theme: Viksit Bharat 2047 / Make in India / Sustainability | Government: PSU / Smart City / Governance

**Nominee Name**

Text

Yes ★

Company name or individual name; 2–100 chars

**Sector**

Dropdown

Yes ★

50-sector framework

**Industry / Sub-industry**

Dropdown / text

Yes ★

1,350+ sub-industry framework

**Achievement Area**

Checkbox

Yes ★

Growth · Innovation · Sustainability · Exports · Technology · Social Impact

**Achievement Description**

Textarea

Yes ★

Key achievement to be evaluated. Min 50 words.

**Annual Turnover (org nominations)**

Dropdown

Cond.

<₹1 Cr · ₹1–5 Cr · ₹5–25 Cr · ₹25–100 Cr · ₹100 Cr+

**Number of Employees (org)**

Dropdown

Cond.

1–10 · 11–50 · 51–200 · 201–500 · 500+

**Nomination Package Interest**

Radio

No

Standard · Premium · Platinum · Enterprise · Not sure yet

**Add-ons of Interest**

Checkbox

No

Jury interaction session · Multi-city nomination · Multi-category · Awards branding package

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — enter the founding-edition recognition cycle.*

**➜ CTA 🎉 Submit Nomination EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Awards team will contact you within 24 hours. 2. Nomination pack and evaluation criteria on WhatsApp + Email. 3. Jury evaluation process begins. 4. Winner notification before event day.

**Reward / recognition**

**Nomination received. You're entered for founding-edition recognition — credibility that lasts.**

**Download CTA**

Download Awards Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P12 🎗️ Sponsorship

**Product Card Copy**

**Card Element**

**Content**

**About line**

Sponsor the IGEN Awards and position your brand as the leader of your sector across six Indian cities.

**Card hook**

**Own the stage where your entire industry gets recognised — and leads come to you.**

**Card CTA**

**Become a Sponsor**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Position your brand as the undisputed leader of your sector.**

**Sub-headline**

Founding and title sponsorship slots are strictly limited — one per city.

**Who should apply**

Brands, corporates and organisations seeking industry positioning, thought leadership and lead generation.

**What this form gives you**

Title, presenting, category, city and experience sponsorships at IGEN Awards across six cities.

**Why now / why founding**

Founding/title slots are strictly limited — one per city. First to enquire, first to secure.

**Page hook**

**Own the stage where your entire industry gets recognised — and leads come to you.**

**Page CTA**

**Begin Sponsorship Enquiry**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your sponsorship conversation — title slots are already being reserved.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🎗️ Sponsorship. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your brand so we design the right sponsorship association for you.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 3** — Product Details

**"Your Sponsorship Details"**

**💡 HOOK** *Choose the tier and cities that match your positioning ambition.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Sponsorship Tier**

Dropdown

Yes ★

Founding · Title · Presenting · Powered By · Platinum · Gold · Silver · Associate · Not sure yet

**Sponsorship Type**

Checkbox

Yes ★

Premium package · Award category · City sponsorship · Sector sponsorship · Experience (Gala / Red Carpet / Jury dinner) · Branding (stage / LED / print) · Digital · Strategic partner

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All cities

**Sector or Award Category to Sponsor**

Dropdown

Yes ★

50-sector list / award category list

**Sponsorship Objective**

Checkbox

Yes ★

Brand visibility · Industry positioning · Lead generation · Trust building · CSR · Executive recognition

**Indicative Budget**

Dropdown

No

<₹5L · ₹5–20L · ₹20–50L · ₹50L–1 Cr · ₹1 Cr+ · Prefer not to say

**Would you like a custom sponsorship proposal?**

Radio

No

Yes — please design one · No — I'll choose from a package

**Cross-interest**

Checkbox

No

Branding package · Certification · Nomination · Speaker slot

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — reserve your sponsorship slot before it's taken.*

**➜ CTA 🎉 Submit Sponsorship EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Awards partnerships team will call you within 24 hours. 2. Custom sponsorship proposal on WhatsApp + Email. 3. Slot reserved on confirmation. 4. Branding and activation begin.

**Reward / recognition**

**Received. Our partnerships team will design a sponsorship that positions you as the sector leader.**

**Download CTA**

Download Sponsorship Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P13 📢 Branding

**Product Card Copy**

**Card Element**

**Content**

**About line**

Buy visibility at the IGEN Awards without a full sponsorship — CEO branding, company stories, interviews, hall-of-fame features and digital reach.

**Card hook**

**Visibility that doesn't require a sponsorship — and works long after the event.**

**Card CTA**

**Explore Branding Options**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Put your company and leaders in front of the right industry audience.**

**Sub-headline**

Founding-edition features carry the most attention and prestige.

**Who should apply**

Companies and leaders who want awards visibility without committing to a full sponsorship.

**What this form gives you**

CEO branding, company features, interviews, hall-of-fame listings and digital visibility packages.

**Why now / why founding**

Founding-edition features get the most eyeballs and are published first.

**Page hook**

**Visibility that doesn't require a sponsorship — and works long after the event.**

**Page CTA**

**Begin Branding Enquiry**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your visibility plan — founding-edition features fill fast.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 📢 Branding. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · Digital only

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your brand so we shape the right visibility story.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Branding Details"**

**💡 HOOK** *Pick the formats that will make your brand seen — by the right audience.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Branding Goal**

Checkbox

Yes ★

Company showcase · Featured company · Founder / CEO branding · Leadership story · Industry spotlight · Media (interview / podcast / video) · Digital (banner / social / newsletter) · Hall of Fame

**Whom to Brand**

Radio

Yes ★

Company · Founder · CEO · CXO · Product / Brand

**Preferred Format**

Checkbox

Yes ★

Written interview · Podcast · Video feature · Press release · Social campaign · Editorial story · Digital banner

**Target City**

Multi-select

Yes ★

6 cities · All cities · Digital-only

**Sector**

Dropdown

Yes ★

50-sector framework

**Brand Story / Key Message**

Textarea

Yes ★

What should the audience take away? Min 30 words.

**Indicative Budget**

Dropdown

No

<₹2L · ₹2–5L · ₹5–10L · ₹10–15L · ₹15L+ · Not sure

**Do you need IGEN to shape the story for you?**

Radio

No

Yes — I'd like help · No — I have the content ready

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — lock in founding-edition visibility before slots fill.*

**➜ CTA 🎉 Submit Branding EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Branding team will contact you within 24 hours. 2. Branding options pack on WhatsApp + Email. 3. Content collection and production begins. 4. Published at the event and digitally.

**Reward / recognition**

**Received. Our team will craft a visibility package that puts your brand in the spotlight.**

**Download CTA**

Download Branding Options Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P14 🏅 Certification

**Product Card Copy**

**Card Element**

**Content**

**About line**

Apply for an IGEN trust, ESG, MSME, startup or export-excellence certification that buyers, tenders and investors can verify.

**Card hook**

**Turn trust into a credential that buyers can verify — in seconds.**

**Card CTA**

**Apply for Certification**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Make your credibility official — and visible everywhere.**

**Sub-headline**

Founding-certified entities anchor the IGEN trust directory from day one.

**Who should apply**

Companies that want verified trust signals for buyers, tenders, investors and partners.

**What this form gives you**

IGEN-issued trust, ESG, MSME, startup and export-excellence certifications with verification QR.

**Why now / why founding**

Founding-certified entities are the first in the trust directory — maximum credibility, maximum discovery.

**Page hook**

**Turn trust into a credential that buyers can verify — in seconds.**

**Page CTA**

**Begin Certification Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your certification — founding-certified entities get listed first.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🏅 Certification. Switchable by user.

**Event City (for Awards presentation)**

Multi-select

No

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · None (digital only)

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your entity so we map the right certifications for you.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Certification Details"**

**💡 HOOK** *Choose the credentials that build lasting buyer confidence.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Certification Interest**

Checkbox

Yes ★

IGEN Certified Company · Trusted Company · Verified Company · Trusted Brand · Certified Leader · Startup Validation · MSME Validation · ESG Certification · Sustainability · Export Excellence · Innovation · AI Readiness · Industry Excellence · Women Leadership · Social Impact

**Certification Purpose**

Checkbox

Yes ★

Buyer trust · Tender / RFP eligibility · Brand credibility · Investor confidence · Export credibility · ESG compliance · Sector authority

**Entity Type**

Dropdown

Yes ★

Startup · MSME · SME · Large Enterprise · Individual Leader

**Sector**

Dropdown

Yes ★

50-sector framework

**GSTIN**

Text

Cond.

Indian entities; 15-char GSTIN. Required for company certifications.

**PAN**

Text

Cond.

Indian entities; 10-char PAN.

**Supporting Documents Ready?**

Radio

No

Yes — ready to submit · Partially ready · No — need guidance

**Indicative Budget**

Dropdown

No

₹50K · ₹1L · ₹2L · ₹2L+ · Not sure

**Interested in Top-100 / Ranking Programs?**

Radio

No

Yes · Maybe · No

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — begin your verified-trust recognition journey.*

**➜ CTA 🎉 Submit Certification EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Certification team will contact you within 24 hours. 2. Certification requirements and verification process on WhatsApp + Email. 3. Document submission and evaluation. 4. Certification issued and published in the IGEN trust directory.

**Reward / recognition**

**Received. Our certification team will guide you to a verifiable IGEN trust credential.**

**Download CTA**

Download Certification Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P15 🎤 Conference

**Product Card Copy**

**Card Element**

**Content**

**About line**

Join the industry conference on Awards Day 1 — as a keynote speaker, panelist, roundtable chair, delegate or corporate delegation.

**Card hook**

**Recognition on Day 2 starts with influence on Day 1.**

**Card CTA**

**Join the Conference**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Take the stage at the industry conference — beside the awards.**

**Sub-headline**

Founding speakers and delegates get inaugural-session recognition.

**Who should apply**

Leaders who want thought-leadership, policy dialogue, networking and investor connect.

**What this form gives you**

Speaker slots, panels, roundtables, delegate passes and VIP delegations across six cities.

**Why now / why founding**

Founding speakers and delegates get inaugural-session recognition and the highest visibility.

**Page hook**

**Recognition on Day 2 starts with influence on Day 1.**

**Page CTA**

**Begin Conference Enquiry**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to claim your conference role — founding-session recognition.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🎤 Conference. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your expertise so we place you on the right stage.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 3** — Product Details

**"Your Conference Participation Details"**

**💡 HOOK** *Choose how you want to participate and lead on the day.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Participation Type**

Checkbox

Yes ★

Keynote speaker · Industry speaker · Panel speaker · Fireside chat · Moderator · CXO roundtable · Delegate · VIP delegation · Corporate delegation (multiple seats)

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Sector / Topic of Expertise**

Dropdown + text

Yes ★

50-sector framework + proposed topic (free text)

**Proposed Topic / Session Title**

Textarea

Cond.

Required for all speaker roles. Min 10 words.

**Number of Delegates**

Number

Cond.

Required for delegation options. Minimum 5.

**Primary Objective**

Checkbox

Yes ★

Thought leadership · Networking · Lead generation · Policy dialogue · Investor connect · Buyer-seller meet

**Indicative Budget**

Dropdown

No

<₹5L · ₹5–10L · ₹10–25L · ₹25L+ · Not sure

**Cross-interest**

Checkbox

No

Nomination · Sponsorship · Branding package

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — secure founding-session recognition before roles are filled.*

**➜ CTA 🎉 Submit Conference EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Conference team will contact you within 24 hours. 2. Speaker / delegate confirmation pack on WhatsApp + Email. 3. Role confirmed and agenda slot allocated. 4. Inaugural-session recognition published.

**Reward / recognition**

**Received. Our team will confirm your role and inaugural-session recognition.**

**Download CTA**

Download Conference Programme →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

# 9\. IGEN Conferences — 5 Product Specifications

Each product below is specified card-to-success, in order: Card Copy → Product Landing Page → Stage 1 → Stage 2 → Stage 3 → Stage 4 → Success Screen.

## P16 💼 Sponsorships

**Product Card Copy**

**Card Element**

**Content**

**About line**

Become a sponsor of the IGEN Viksit Bharat Conference and position your brand at the centre of India's 2047 policy and industry conversation.

**Card hook**

**Don't sponsor an event. Lead an industry.**

**Card CTA**

**Become a Sponsor**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Position your brand at the centre of Viksit Bharat 2047.**

**Sub-headline**

One founding sponsor per city — strictly limited.

**Who should apply**

Corporates and brands seeking industry authority, policy influence and sustained visibility.

**What this form gives you**

Founding, title, session, research and experience sponsorships across six cities.

**Why now / why founding**

One founding sponsor per city — a permanent leadership association. First to enquire, first to secure.

**Page hook**

**Don't sponsor an event. Lead an industry.**

**Page CTA**

**Begin Sponsorship Enquiry**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your sponsorship — one founding spot per city.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 💼 Sponsorships. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your brand so we design the right association with Viksit Bharat 2047.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 3** — Product Details

**"Your Conference Sponsorship Details"**

**💡 HOOK** *Choose the tier, theme and cities that match your industry leadership ambition.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Sponsorship Tier**

Dropdown

Yes ★

Founding · Title · Presenting · Powered By · Co-Powered · Platinum · Gold · Silver · Not sure

**Sponsorship Family**

Checkbox

Yes ★

Premium · Thought-leadership (Bharat 2047 / Knowledge / Research / Industry Voice / Policy / GDP / Future India) · Session (AI / Startup / MSME / Manufacturing / Export / Sustainability / Healthcare / Leadership) · Experience (Gala / Networking / Registration) · Branding · Digital

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Sector**

Dropdown

Yes ★

50-sector framework

**Objective**

Checkbox

Yes ★

Industry authority · Brand visibility · Policy influence · Lead generation · Research association · CEO branding · Investor connect

**Indicative Budget**

Dropdown

No

<₹5L · ₹5–10L · ₹10–25L · ₹25–40L · ₹40–75L · ₹75L–1.5 Cr · ₹1 Cr+ · Prefer not to say

**Custom proposal requested?**

Radio

No

Yes · No — I'll choose from a package

**Cross-interest**

Checkbox

No

Speaker slot · Awards · Research / media · Delegate passes

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — reserve your founding-sponsor association before it's taken.*

**➜ CTA 🎉 Submit Sponsorship EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Conference partnerships team will call you within 24 hours. 2. Custom sponsorship proposal on WhatsApp + Email. 3. Slot reserved on confirmation. 4. Branding and activation begin.

**Reward / recognition**

**Received. Our team will design a sponsorship that positions you as an industry leader of Viksit Bharat 2047.**

**Download CTA**

Download Conference Sponsorship Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P17 🎙️ Speakers & Thought Leadership

**Product Card Copy**

**Card Element**

**Content**

**About line**

Become a speaker or thought-leader at the IGEN Viksit Bharat Conference and build authority that lasts well beyond the event.

**Card hook**

**Don't buy stage time. Build industry authority that lasts years.**

**Card CTA**

**Become a Speaker**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Be the voice shaping India's 2047 industry agenda.**

**Sub-headline**

Speakers become permanent thought-leadership assets — not just event attendees.

**Who should apply**

CEOs, founders, CXOs, investors, policymakers and subject-matter experts.

**What this form gives you**

Keynote, panel, fireside, research-author and industry-voice roles with lasting digital assets.

**Why now / why founding**

Speakers become permanent thought-leadership assets cited in research, media and AI searches.

**Page hook**

**Don't buy stage time. Build industry authority that lasts years.**

**Page CTA**

**Begin Speaker Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your speaker profile — become a permanent industry voice.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🎙️ Speakers & Thought Leadership. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your background so we position your authority in the right programme slot.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 3** — Product Details

**"Your Speaker & Thought-Leadership Profile"**

**💡 HOOK** *Propose your topic and show how it advances India's Viksit Bharat 2047 agenda.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Speaker Role**

Dropdown

Yes ★

Keynote · Panel speaker · Fireside chat · Moderator · Co-moderator · Industry voice contributor · Research contributor · CXO roundtable · Sector roundtable · Masterclass

**Speaker Category**

Dropdown

Yes ★

Chairman · CEO / MD · Founder · CXO · Government official · Policymaker · Investor · Academic leader · Industry expert · International speaker

**Sector / Industry**

Dropdown + text

Yes ★

50-sector framework + sub-industry free text

**Thought-Leadership Profile**

Textarea

Yes ★

Bio · achievements · awards · publications · patents · books (if any). Min 40 words.

**Proposed Topic / Session Title**

Text

Yes ★

Talk or session title; 5–100 chars

**Why this topic matters for Viksit Bharat 2047**

Textarea

Yes ★

Min 30 words. Explain the relevance and impact.

**Expected Takeaways / Recommendations**

Textarea

No

What the audience will walk away with. Optional.

**Research Contribution**

Checkbox

No

Research paper · Industry voice article · Podcast · Interview · Whitepaper · None

**LinkedIn Profile URL**

URL

No

https://linkedin.com/in/yourname

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Visibility Add-ons**

Checkbox

No

CEO interview feature · Article / blog · Podcast episode · AI-search visibility package

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — secure your place on the agenda and start building lasting authority.*

**➜ CTA 🎉 Submit Speaker EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our programme team will contact you within 24 hours. 2. Speaker guidelines and agenda slot on WhatsApp + Email. 3. Topic confirmed and session scheduled. 4. Permanent thought-leadership assets published post-event.

**Reward / recognition**

**Received. Our programme team will review your topic and confirm your speaking role.**

**Download CTA**

Download Speaker Guidelines →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P18 🎟️ Delegates & Memberships

**Product Card Copy**

**Card Element**

**Content**

**About line**

Attend the IGEN Viksit Bharat Conference as a delegate — and help shape research that is published nationally.

**Card hook**

**Don't just attend. Help create India's knowledge agenda.**

**Card CTA**

**Become a Delegate**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Learn, network and shape research that's published globally.**

**Sub-headline**

Delegates' questions become part of nationally published city research papers.

**Who should apply**

Industry professionals, executives, MSMEs, startups, investors and students.

**What this form gives you**

Delegate passes and leadership memberships, with a Bharat 2047 contributor certificate.

**Why now / why founding**

Delegates' Q&A contributions are published in city research papers — permanent visibility.

**Page hook**

**Don't just attend. Help create India's knowledge agenda.**

**Page CTA**

**Begin Delegate Registration**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to reserve your delegate access and contributor certificate.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🎟️ Delegates & Memberships. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us about you so we tailor your pass and delegate experience.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 3** — Product Details

**"Your Delegate & Membership Details"**

**💡 HOOK** *Choose your pass, city and membership — your research contribution starts here.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Delegate Type**

Radio

Yes ★

Industry professional · Student / Academic · International delegate · Government / PSU

**Professional Profile**

Dropdown

Cond.

Shown for professionals: Corporate executive · CEO · CXO · Government · MSME · Startup · Investor · Consultant · Academic · Association

**Student Stream**

Dropdown

Cond.

Shown for students: Engineering · MBA / Management · Commerce · Law · Medical · Technology / IT · Research · Innovation · Entrepreneurship

**Pass Type**

Dropdown

Yes ★

Standard · Premium · VIP · CXO Pass · Government · International · Student Concession

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Sector of Interest**

Dropdown

Yes ★

50-sector framework

**Membership Interest**

Checkbox

No

Bharat 2047 Leaders · CEO Membership · CXO Network · Women Leaders · Startup · MSME · Policy Circle · Global · Founding · Lifetime · None

**Primary Objective**

Checkbox

Yes ★

Learning · Networking · Research contribution (Q&A published) · Visibility · Certificate · Business development

**Number of Delegates (group booking)**

Number

No

Optional; min 5 for group rates

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — claim your Bharat 2047 contributor certificate.*

**➜ CTA 🎉 Submit Delegate EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our delegate team will contact you within 24 hours. 2. Pass confirmation and event details on WhatsApp + Email. 3. Certificate pre-issued. 4. Attend, contribute, and see your questions in the published research paper.

**Reward / recognition**

**Received. Your delegate access and Bharat 2047 contributor certificate are reserved.**

**Download CTA**

Download Conference Programme →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P19 🏆 Awards & Recognition

**Product Card Copy**

**Card Element**

**Content**

**About line**

Apply for awards and recognition at the IGEN Viksit Bharat Conference Day 2 — nominations, award sponsorships and winner visibility packages.

**Card hook**

**Day 1 influence. Day 2 recognition. Double the value, one ecosystem.**

**Card CTA**

**Apply for Awards**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Be recognised on the same stage where the industry agenda is set.**

**Sub-headline**

Conference + awards recognition compounds your visibility and credibility.

**Who should apply**

Leaders and companies ready to be recognised alongside the Viksit Bharat summit.

**What this form gives you**

Award nominations, category sponsorships and winner visibility packages, integrated with the conference.

**Why now / why founding**

Conference and awards recognition together compound visibility and create a media moment.

**Page hook**

**Day 1 influence. Day 2 recognition. Double the value, one ecosystem.**

**Page CTA**

**Begin Awards Application**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your awards application — integrated recognition cycle.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 🏆 Awards & Recognition. Switchable by user.

**Event City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us who you're nominating and why they deserve recognition.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Stage 3** — Product Details

**"Your Awards & Recognition Details"**

**💡 HOOK** *Choose your category, city and recognition package — the recognition cycle starts now.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Application Type**

Radio

Yes ★

Award nomination · Award category sponsorship · Recognition / visibility product · Winner visibility package

**Award Category**

Dropdown

Cond.

For nominations: Leadership · Innovation · Technology · Startup · MSME · Sustainability · Export · Manufacturing · Education · Healthcare · Women Leadership · Young Leader

**Nominee Name**

Text

Cond.

Nomination only; 2–100 chars

**Achievement Summary**

Textarea

Cond.

Nomination only; min 40 words

**Sponsorship Type**

Checkbox

Cond.

Sponsors only: Title · Category · Trophy · Jury dinner · Gala dinner · Hall of Fame · Red carpet · Winners lounge

**Sector**

Dropdown

Yes ★

50-sector framework

**Target City / Cities**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All

**Recognition / Visibility Add-ons**

Checkbox

No

Winner interview · Winner story article · Winner video · Hall of Fame listing · Media coverage · Leadership profile

**Indicative Budget**

Dropdown

Cond.

Sponsors only: <₹5L · ₹5–20L · ₹20–50L · ₹50L+ · Prefer not to say

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — enter the integrated conference-and-awards recognition cycle.*

**➜ CTA 🎉 Submit Awards EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our Awards team will contact you within 24 hours. 2. Award category details and evaluation criteria on WhatsApp + Email. 3. Nomination processed and shortlisting begins. 4. Recognition ceremony on Day 2.

**Reward / recognition**

**Received. Your nomination enters the integrated Viksit Bharat conference-and-awards recognition cycle.**

**Download CTA**

Download Awards Brochure →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

## P20 📊 Research, Media & Visibility

**Product Card Copy**

**Card Element**

**Content**

**About line**

Become a research contributor, media partner or visibility sponsor at the IGEN Viksit Bharat Conference — and be cited everywhere, including by AI.

**Card hook**

**Be cited everywhere — including by the AI that answers questions about your industry.**

**Card CTA**

**Become a Research / Media Partner**

**Fill info**

4 steps (~60s) | No payment | Takes less than a minute

**Product Landing Page**

**Element**

**Content**

**Headline**

**Turn your insight into a permanent, discoverable industry asset.**

**Sub-headline**

Research and media assets keep working long after the event ends.

**Who should apply**

Leaders and brands building authority, long-term discoverability and industry association.

**What this form gives you**

Research papers, whitepapers, CEO interviews, leadership stories and AI-search visibility packages.

**Why now / why founding**

Research and media assets built at the conference are cited in AI models, search engines and industry reports.

**Page hook**

**Be cited everywhere — including by the AI that answers questions about your industry.**

**Page CTA**

**Begin Partner Enquiry**

**Stage 1** — Quick Entry

**"Let's Start. Just 20 Seconds."**

**💡 HOOK** *60 seconds to start your visibility plan — permanent, discoverable authority.*

**➜ CTA Continue → (Step 1 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes ★

2–100 chars. Letters, spaces, hyphen, apostrophe. Placeholder: Your Full Name

**Mobile Number**

Phone

Yes ★

+91 prefix default; country code + 10 digits. Placeholder: 10-digit mobile number

**Email Address**

Email

Yes ★

RFC-5322 valid. Placeholder: your@email.com

**City**

Text / Dropdown

Yes ★

Major Indian cities list + International. Placeholder: Your City

**Interested In**

Pre-filled

Yes ★

Auto-filled: 📊 Research, Media & Visibility. Switchable by user.

**Reach / City**

Multi-select

Yes ★

Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad · All · National / Digital only

**Stage 2** — Business

**"Tell Us About Your Business"**

**💡 HOOK** *Tell us your brand so we shape the right research and media angle.*

**➜ CTA Continue → (Step 2 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Company / Organisation Name**

Text

Yes ★ \*

\*Optional for Individual Professional / Student. Placeholder: Your Company or Organisation

**Industry Sector**

Dropdown

Yes ★

50-sector framework. Placeholder: — Select Sector —

**Your Role / Designation**

Text

Yes ★

Free text. Placeholder: Founder / CEO / Director / Manager

**Website URL**

URL

No

https://. Placeholder: www.yourcompany.com

**Business Category**

Pill toggle

Yes ★

Startup · SME / MSME · Large Enterprise · Individual Professional · Government Body

**Years in Business / Industry**

Dropdown

Yes ★

<1 · 1–3 · 3–5 · 5–10 · 10–20 · 20+ years. Placeholder: — Select Years —

**Stage 3** — Product Details

**"Your Research, Media & Visibility Details"**

**💡 HOOK** *Choose the research, media and visibility that keeps working long after the event.*

**➜ CTA Continue → (Step 3 of 4)**

**Field**

**Type**

**Required**

**Options / Notes**

**Interest Area**

Checkbox

Yes ★

Research paper · Whitepaper · Industry voice paper · Economic growth report · Sector report · Policy paper · AI impact report · CEO / founder interview · Leadership story · Sponsored editorial article · Podcast episode · Video feature · Visibility package (CEO / founder / CXO / women leaders / expert / global) · Search & AI-search visibility · Research sponsorship

**Your Role**

Radio

Yes ★

Author / contributor · Sponsor / partner · Interview subject (be featured)

**Topic / Sector**

Dropdown + text

Yes ★

50-sector framework + free text topic

**Brief / Angle**

Textarea

Yes ★

What story do you want to tell? Min 30 words.

**Reach**

Multi-select

Yes ★

6 cities · All India · National Digital · Global

**Visibility Goal**

Checkbox

Yes ★

Industry authority · Google search ranking · AI search (ChatGPT / Gemini / Perplexity / Claude) · Global reach · Lead generation · Thought leadership citation

**Indicative Budget**

Dropdown

No

<₹2L · ₹2–5L · ₹5–10L · ₹10L+ · Not sure

**Want IGEN to build a content plan for you?**

Radio

No

Yes — please create a plan · No — I have the plan ready

**Stage 4** — Intent & Goals

**"Almost There — Last Step."**

**💡 HOOK** *Last step — lock in lasting, discoverable authority that works everywhere.*

**➜ CTA 🎉 Submit Partner EOI**

**Field**

**Type**

**Required**

**Options / Notes**

**Why are you interested in IGEN?**

Textarea

Yes ★

Min 20 chars. Placeholder: What business outcome are you looking for?

**What do you hope to achieve?**

Textarea

No

Optional. Placeholder: What business outcome are you looking for?

**How did you hear about IGEN?**

Dropdown

Yes ★

Associate SME Referral · LinkedIn · Facebook Ad · Instagram · Website · Event · WhatsApp · Other

**Referral / Coupon Code**

Text

No

Alphanumeric. Auto-validates against Affiliate CRM. Placeholder: Enter code if you have one

**Interested in more IGEN products?**

Multi-select grid

No

All 20 products shown with icons; current product pre-checked

**Any questions or comments?**

Textarea

No

Placeholder: Anything you'd like us to know?

**Consent**

Checkbox

Yes ★

"I agree to be contacted by the IGEN team. Your information is safe. No spam. No payment required."

**✅ Success Screen**

**Element**

**Content**

**Headline**

🎉 Thank You, \[First Name\]!

**Sub-line**

Your IGEN Application Has Been Submitted Successfully.

**Reference ID**

IGEN-{timestamp}-{4-digit random} (e.g. IGEN-1781673282-7921) — displayed as a copyable pill/badge

**Confirmation note**

Your application has been saved. Our team will contact you within 24 hours.

**Product next-steps**

1\. Our content team will contact you within 24 hours. 2. Research / media content plan on WhatsApp + Email. 3. Content creation and production begins. 4. Published across events, platforms and AI-indexed channels.

**Reward / recognition**

**Received. Our content team will design a research-and-media plan that keeps you discoverable everywhere.**

**Download CTA**

Download Research & Media Guide →

**Share actions**

Save to WhatsApp · Share on LinkedIn · Copy Submission Data

**Secondary link**

← Fill Another EOI for a Different Product

# 10\. Field Validation & Global Standards Reference

All forms inherit the **IGEN Global Common Standards (Section 0 of the IGEN CRM Master PRD)**. The most-used fields are summarised below.

**Field**

**Type**

**Required**

**Options / Notes**

**Full Name**

Text

Yes

2–100 chars · A–Z a–z · spaces · hyphen · apostrophe · no digits

**Email Address**

Email

Yes

RFC-5322 · name@domain.ext · 6–254 chars

**Mobile Number**

Phone

Yes

Country code mandatory (+91 default) · 10–15 digits · no spaces

**WhatsApp Number**

Phone

Cond.

Same rules as Mobile · 'Same as mobile' toggle

**Website / LinkedIn**

URL

No

Must start https:// or http:// · valid domain

**GSTIN**

Text

Cond.

15 chars: 2-digit state + 5 PAN + 4 digits + 1 alpha + Z + check digit

**PAN**

Text

Cond.

10 chars: 5 letters + 4 digits + 1 letter

**IEC**

Text

Cond.

10 digits; numeric only (DGFT format)

**City**

Dropdown

Yes

Cascading dropdown per country + free-text 'Other'

**Event City**

Multi-select

Cond.

Awards/Conferences only: Delhi · Mumbai · Bengaluru · Hyderabad · Chennai · Ahmedabad

**End of document.** IGEN EOI Forms Platform — PRD v2.0 · 17 June 2026.