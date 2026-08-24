"use client";

import { useState } from "react";
import { ProductId, PRODUCT_INFO, SECTOR_LIST } from "./data/productData";
import { saveProgress, validateStep3 } from "./utils/formUtils";

interface FormStep3Props {
  productId: ProductId;
  onComplete: (data: Record<string, string | string[] | boolean>) => void;
  onBack: () => void;
}

// ── Reusable styled input helpers ────────────────────────────────────────────
const inputBase: React.CSSProperties = {
  width: "100%",
  minHeight: "48px",
  fontSize: "16px",
  padding: "12px 16px",
  borderRadius: "12px",
  outline: "none",
  background: "#F8F9FA",
  color: "#1A1A2E",
  fontFamily: "'Inter', sans-serif",
  transition: "border-color 0.2s, box-shadow 0.2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 500,
  marginBottom: "6px",
  color: "#1A1A2E",
};

const errorStyle: React.CSSProperties = {
  display: "block",
  fontSize: "12px",
  color: "#E63946",
  marginTop: "4px",
};

function Input({
  id,
  value = "",
  onChange,
  placeholder,
  type = "text",
  hasError,
  inputMode,
}: {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  hasError?: boolean;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}) {
  const safeValue = value || "";
  return (
    <input
      id={id}
      type={type}
      value={safeValue}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      inputMode={inputMode}
      style={{ ...inputBase, border: `1.5px solid ${hasError ? "#E63946" : "#DEE2E6"}` }}
      onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
      onBlur={(e) => { e.target.style.borderColor = hasError ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
    />
  );
}

function Select({
  id,
  value = "",
  onChange,
  options,
  placeholder,
  hasError,
}: {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
  hasError?: boolean;
}) {
  const safeValue = value || "";
  return (
    <select
      id={id}
      value={safeValue}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputBase, border: `1.5px solid ${hasError ? "#E63946" : "#DEE2E6"}`, appearance: "none" }}
      onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
      onBlur={(e) => { e.target.style.borderColor = hasError ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => <option key={o} value={o}>{o}</option>)}
    </select>
  );
}

function RadioGroup({
  id,
  options,
  value = "",
  onChange,
  hasError,
}: {
  id: string;
  options: string[];
  value?: string;
  onChange: (v: string) => void;
  hasError?: boolean;
}) {
  const safeValue = value || "";
  return (
    <div
      className="flex flex-wrap gap-2 p-1.5 rounded-xl transition-all"
      id={id}
      style={{
        border: `1.5px solid ${hasError ? "#E63946" : "transparent"}`,
        background: hasError ? "#FFF5F5" : "transparent",
      }}
    >
      {options.map((opt) => {
        const isSelected = safeValue === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-150"
            style={{
              border: `1.5px solid ${isSelected ? "#0A2463" : "#DEE2E6"}`,
              background: isSelected ? "#0A2463" : "#fff",
              color: isSelected ? "#fff" : "#1A1A2E",
              boxShadow: isSelected ? "0 2px 8px rgba(10,36,99,0.20)" : "none",
            }}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function Textarea({
  id,
  value = "",
  onChange,
  placeholder,
  rows = 3,
  hasError,
}: {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
  hasError?: boolean;
}) {
  const safeValue = value || "";
  return (
    <textarea
      id={id}
      value={safeValue}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputBase, border: `1.5px solid ${hasError ? "#E63946" : "#DEE2E6"}`, minHeight: "auto", resize: "vertical" }}
      onFocus={(e) => { e.target.style.borderColor = "#0A2463"; e.target.style.boxShadow = "0 0 0 3px rgba(10,36,99,0.12)"; }}
      onBlur={(e) => { e.target.style.borderColor = hasError ? "#E63946" : "#DEE2E6"; e.target.style.boxShadow = "none"; }}
    />
  );
}

function CheckboxGroup({
  id,
  options,
  values = [],
  onChange,
  hasError,
}: {
  id: string;
  options: string[];
  values?: string[];
  onChange: (v: string[]) => void;
  hasError?: boolean;
}) {
  const safeValues = values || [];
  const toggle = (opt: string) => {
    if (safeValues.includes(opt)) onChange(safeValues.filter((v) => v !== opt));
    else onChange([...safeValues, opt]);
  };
  return (
    <div
      className="flex flex-wrap gap-2 p-1.5 rounded-xl transition-all"
      id={id}
      style={{
        border: `1.5px solid ${hasError ? "#E63946" : "transparent"}`,
        background: hasError ? "#FFF5F5" : "transparent",
      }}
    >
      {options.map((opt) => {
        const checked = safeValues.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm font-medium transition-all duration-150"
            style={{
              border: `1.5px solid ${checked ? "#2A9D8F" : "#DEE2E6"}`,
              background: checked ? "#F0FDF9" : "#fff",
              color: checked ? "#065F46" : "#1A1A2E",
            }}
          >
            <span style={{ fontSize: "13px" }}>{checked ? "✅" : "⬜"}</span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

// ── Per-product field renderer ───────────────────────────────────────────────

interface FieldProps {
  form: Record<string, string | string[]>;
  set: (k: string, v: string) => void;
  setArr: (k: string, v: string[]) => void;
  errors: Record<string, string>;
}

function SmePageFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Primary Industry / Sector <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Years of Professional Experience <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-exp" value={form.experience as string} onChange={(v) => set("experience", v)} options={["5–10 years", "10–15 years", "15–20 years", "20–25 years", "25+ years"]} placeholder="— Select —" hasError={!!errors.experience} />
        {errors.experience && <span style={errorStyle}>{errors.experience}</span>}
      </div>
      <div>
        <label style={labelStyle}>Your Top Areas of Expertise <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-expertise" value={form.expertise as string} onChange={(v) => set("expertise", v)} placeholder="Your consulting topics and areas of expertise..." hasError={!!errors.expertise} />
        {errors.expertise && <span style={errorStyle}>{errors.expertise}</span>}
      </div>
      <div>
        <label style={labelStyle}>Do you currently offer consulting services? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-consulting" options={["Yes", "No", "Planning to"]} value={form.consulting as string} onChange={(v) => set("consulting", v)} hasError={!!errors.consulting} />
        {errors.consulting && <span style={errorStyle}>{errors.consulting}</span>}
      </div>
      <div>
        <label style={labelStyle}>LinkedIn Profile URL <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span></label>
        <Input id="s3-linkedin" value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/yourname" type="url" />
      </div>
      <div>
        <label style={labelStyle}>Have you written industry articles or reports? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-articles" options={["Yes", "No"]} value={form.articles as string} onChange={(v) => set("articles", v)} hasError={!!errors.articles} />
        {errors.articles && <span style={errorStyle}>{errors.articles}</span>}
      </div>
      <div>
        <label style={labelStyle}>Interested in joining the IGEN Awards Jury? <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span></label>
        <RadioGroup id="s3-jury" options={["Yes", "Maybe", "No"]} value={form.jury as string} onChange={(v) => set("jury", v)} />
      </div>
      <div>
        <label style={labelStyle}>Preferred SME Plan <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-plan" options={["Founding SME (Free Year 1)", "Standard SME"]} value={form.plan as string} onChange={(v) => set("plan", v)} hasError={!!errors.plan} />
        {errors.plan && <span style={errorStyle}>{errors.plan}</span>}
      </div>
    </>
  );
}

function AssociateSmeFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Primary Sector of Work <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Years of Industry Experience <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-exp" value={form.experience as string} onChange={(v) => set("experience", v)} options={["5–10 years", "10–15 years", "15+ years"]} placeholder="— Select —" hasError={!!errors.experience} />
        {errors.experience && <span style={errorStyle}>{errors.experience}</span>}
      </div>
      <div>
        <label style={labelStyle}>Current Role / Designation <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-role" value={form.role as string} onChange={(v) => set("role", v)} placeholder="Your current role" hasError={!!errors.role} />
        {errors.role && <span style={errorStyle}>{errors.role}</span>}
      </div>
      <div>
        <label style={labelStyle}>What expertise do you want to be known for? <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-known" value={form.known_for as string} onChange={(v) => set("known_for", v)} placeholder="Describe your expertise..." hasError={!!errors.known_for} />
        {errors.known_for && <span style={errorStyle}>{errors.known_for}</span>}
      </div>
      <div>
        <label style={labelStyle}>LinkedIn Profile URL <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span></label>
        <Input id="s3-linkedin" value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/yourname" type="url" />
      </div>
      <div>
        <label style={labelStyle}>Interested in growing to Full SME status?</label>
        <RadioGroup id="s3-grow" options={["Yes", "Not Sure"]} value={form.grow_sme as string} onChange={(v) => set("grow_sme", v)} />
      </div>
      <div>
        <label style={labelStyle}>Are you an active professional networker in your city? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-network" options={["Yes", "Growing My Network"]} value={form.networker as string} onChange={(v) => set("networker", v)} hasError={!!errors.networker} />
        {errors.networker && <span style={errorStyle}>{errors.networker}</span>}
      </div>
    </>
  );
}

function CompanyPageFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Company Legal Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-legal" value={form.legal_name as string} onChange={(v) => set("legal_name", v)} placeholder="Company Legal Name" hasError={!!errors.legal_name} />
        {errors.legal_name && <span style={errorStyle}>{errors.legal_name}</span>}
      </div>
      <div>
        <label style={labelStyle}>Company Type <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-type" value={form.company_type as string} onChange={(v) => set("company_type", v)} options={["Startup", "Private Ltd", "Public Ltd", "LLP", "Proprietorship", "Other"]} placeholder="— Select —" hasError={!!errors.company_type} />
        {errors.company_type && <span style={errorStyle}>{errors.company_type}</span>}
      </div>
      <div>
        <label style={labelStyle}>Year of Founding <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-year" value={form.founding_year as string} onChange={(v) => set("founding_year", v)} placeholder="e.g. 2015" type="number" inputMode="numeric" hasError={!!errors.founding_year} />
        {errors.founding_year && <span style={errorStyle}>{errors.founding_year}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Sector <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Number of Employees <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-emp" value={form.employees as string} onChange={(v) => set("employees", v)} options={["1–10", "11–50", "51–200", "201–500", "500+"]} placeholder="— Select —" hasError={!!errors.employees} />
        {errors.employees && <span style={errorStyle}>{errors.employees}</span>}
      </div>
      <div>
        <label style={labelStyle}>Existing Leader Pages to bundle?</label>
        <RadioGroup id="s3-leader" options={["Yes", "No", "Not Sure"]} value={form.leader_pages as string} onChange={(v) => set("leader_pages", v)} />
      </div>
      <div>
        <label style={labelStyle}>Preferred Company Page Tier</label>
        <RadioGroup id="s3-tier" options={["Silver", "Gold", "Platinum", "Not Sure Yet"]} value={form.tier as string} onChange={(v) => set("tier", v)} />
      </div>
      <div>
        <label style={labelStyle}>What do you want buyers/investors to discover? <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-discover" value={form.discover as string} onChange={(v) => set("discover", v)} placeholder="Describe your company's key strengths..." hasError={!!errors.discover} />
        {errors.discover && <span style={errorStyle}>{errors.discover}</span>}
      </div>
    </>
  );
}

function LeaderPageFields({ form, set, setArr, errors }: FieldProps) {
  const goalOptions = ["Investor Visibility", "Board Opportunities", "Executive Search", "Thought Leadership", "Speaking Engagements", "Personal Brand"];
  return (
    <>
      <div>
        <label style={labelStyle}>Leader Full Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-leader-name" value={form.leader_name as string} onChange={(v) => set("leader_name", v)} placeholder="Full Name" hasError={!!errors.leader_name} />
        {errors.leader_name && <span style={errorStyle}>{errors.leader_name}</span>}
      </div>
      <div>
        <label style={labelStyle}>Designation <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-desig" value={form.designation as string} onChange={(v) => set("designation", v)} options={["CEO", "CFO", "CTO", "CIO", "CHRO", "CSO", "Founder", "Co-Founder", "Managing Director", "Board Director", "Government Official", "Trade Official", "Other"]} placeholder="— Select —" hasError={!!errors.designation} />
        {errors.designation && <span style={errorStyle}>{errors.designation}</span>}
      </div>
      <div>
        <label style={labelStyle}>Current Company Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-company" value={form.company as string} onChange={(v) => set("company", v)} placeholder="Your company name" hasError={!!errors.company} />
        {errors.company && <span style={errorStyle}>{errors.company}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Sector <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>LinkedIn Profile URL <span style={{ color: "#6C757D", fontSize: "12px" }}>(optional)</span></label>
        <Input id="s3-linkedin" value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/yourname" type="url" />
      </div>
      <div>
        <label style={labelStyle}>Application type <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-app-type" options={["Self", "Company-Sponsored"]} value={form.app_type as string} onChange={(v) => set("app_type", v)} hasError={!!errors.app_type} />
        {errors.app_type && <span style={errorStyle}>{errors.app_type}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary goals for your Leader Page <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-goals" options={goalOptions} values={form.goals as string[]} onChange={(v) => setArr("goals", v)} hasError={!!errors.goals} />
        {errors.goals && <span style={errorStyle}>{errors.goals}</span>}
      </div>
    </>
  );
}

function ReaderPlanFields({ form, set, setArr, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Sectors of Interest (up to 5) <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-sectors" options={SECTOR_LIST} values={form.sectors as string[]} onChange={(v) => setArr("sectors", v.slice(0, 5))} hasError={!!errors.sectors} />
        {errors.sectors && <span style={errorStyle}>{errors.sectors}</span>}
      </div>
      <div>
        <label style={labelStyle}>How do you currently consume industry news? <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-news-how" options={["Google News", "LinkedIn", "Industry Newsletters", "WhatsApp Groups", "Other"]} values={form.news_consumption as string[]} onChange={(v) => setArr("news_consumption", v)} hasError={!!errors.news_consumption} />
        {errors.news_consumption && <span style={errorStyle}>{errors.news_consumption}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary reason for upgrading <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-reason" value={form.reason as string} onChange={(v) => set("reason", v)} options={["Stay informed on sector", "Find industry experts", "Business intelligence for decisions", "Investment research", "General knowledge"]} placeholder="— Select —" hasError={!!errors.reason} />
        {errors.reason && <span style={errorStyle}>{errors.reason}</span>}
      </div>
      <div>
        <label style={labelStyle}>Interested in booking SME consultations?</label>
        <RadioGroup id="s3-sme" options={["Yes", "Maybe", "No"]} value={form.sme_consult as string} onChange={(v) => set("sme_consult", v)} />
      </div>
      <div>
        <label style={labelStyle}>Preferred Plan</label>
        <RadioGroup id="s3-plan" options={["Basic Reader", "Professional Reader", "Pro Plus Reader", "Not Sure"]} value={form.plan as string} onChange={(v) => set("plan", v)} />
      </div>
    </>
  );
}

function IndianExporterFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Company Legal Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-legal" value={form.legal_name as string} onChange={(v) => set("legal_name", v)} placeholder="Company Legal Name" hasError={!!errors.legal_name} />
        {errors.legal_name && <span style={errorStyle}>{errors.legal_name}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Export Product / Service Category <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-products" value={form.export_products as string} onChange={(v) => set("export_products", v)} placeholder="List your main export products..." hasError={!!errors.export_products} />
        {errors.export_products && <span style={errorStyle}>{errors.export_products}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Export Destination Countries <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-countries" value={form.dest_countries as string} onChange={(v) => set("dest_countries", v)} placeholder="e.g. USA, UAE, Germany..." hasError={!!errors.dest_countries} />
        {errors.dest_countries && <span style={errorStyle}>{errors.dest_countries}</span>}
      </div>
      <div>
        <label style={labelStyle}>Annual Export Turnover (approx.) <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-turnover" value={form.turnover as string} onChange={(v) => set("turnover", v)} options={["Under ₹1 Cr", "₹1–5 Cr", "₹5–25 Cr", "₹25–100 Cr", "₹100 Cr+", "Prefer not to say"]} placeholder="— Select —" hasError={!!errors.turnover} />
        {errors.turnover && <span style={errorStyle}>{errors.turnover}</span>}
      </div>
      <div>
        <label style={labelStyle}>IEC (Importer Exporter Code) <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-iec" options={["Yes", "Applied", "No"]} value={form.iec as string} onChange={(v) => set("iec", v)} hasError={!!errors.iec} />
        {errors.iec && <span style={errorStyle}>{errors.iec}</span>}
      </div>
      <div>
        <label style={labelStyle}>Export Sector <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Target markets to expand into</label>
        <Textarea id="s3-target" value={form.target_markets as string} onChange={(v) => set("target_markets", v)} placeholder="New markets you want to explore..." />
      </div>
      <div>
        <label style={labelStyle}>Government-certified / award-winning exporter?</label>
        <RadioGroup id="s3-cert" options={["Yes", "No"]} value={form.certified as string} onChange={(v) => set("certified", v)} />
      </div>
    </>
  );
}

function GlobalImporterFields({ form, set, setArr, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Company Name / Organisation <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-company" value={form.company as string} onChange={(v) => set("company", v)} placeholder="Your company name" hasError={!!errors.company} />
        {errors.company && <span style={errorStyle}>{errors.company}</span>}
      </div>
      <div>
        <label style={labelStyle}>Country of Origin <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-country" value={form.country as string} onChange={(v) => set("country", v)} placeholder="Your country" hasError={!!errors.country} />
        {errors.country && <span style={errorStyle}>{errors.country}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Products to Import from India <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-import-products" value={form.import_products as string} onChange={(v) => set("import_products", v)} placeholder="List products you want to source from India..." hasError={!!errors.import_products} />
        {errors.import_products && <span style={errorStyle}>{errors.import_products}</span>}
      </div>
      <div>
        <label style={labelStyle}>Sectors of Interest for Indian Sourcing <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Annual Import Volume (approx.)</label>
        <Select id="s3-volume" value={form.volume as string} onChange={(v) => set("volume", v)} options={["Under USD 100K", "USD 100K–500K", "USD 500K–2M", "USD 2M+", "Not Specified"]} placeholder="— Select —" />
      </div>
      <div>
        <label style={labelStyle}>How do you find Indian suppliers? <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-how" options={["Trade Fairs", "Directories", "Cold Outreach", "Referrals", "Other"]} values={form.find_suppliers as string[]} onChange={(v) => setArr("find_suppliers", v)} hasError={!!errors.find_suppliers} />
        {errors.find_suppliers && <span style={errorStyle}>{errors.find_suppliers}</span>}
      </div>
      <div>
        <label style={labelStyle}>Looking for verified, audited Indian suppliers? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-verified" options={["Yes", "Partially", "Just Exploring"]} value={form.verified as string} onChange={(v) => set("verified", v)} hasError={!!errors.verified} />
        {errors.verified && <span style={errorStyle}>{errors.verified}</span>}
      </div>
    </>
  );
}

function GlobalExporterFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Company Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-company" value={form.company as string} onChange={(v) => set("company", v)} placeholder="Your company name" hasError={!!errors.company} />
        {errors.company && <span style={errorStyle}>{errors.company}</span>}
      </div>
      <div>
        <label style={labelStyle}>Country of Origin <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-country" value={form.country as string} onChange={(v) => set("country", v)} placeholder="Your country" hasError={!!errors.country} />
        {errors.country && <span style={errorStyle}>{errors.country}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Products / Services You Export <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-products" value={form.export_products as string} onChange={(v) => set("export_products", v)} placeholder="What you export..." hasError={!!errors.export_products} />
        {errors.export_products && <span style={errorStyle}>{errors.export_products}</span>}
      </div>
      <div>
        <label style={labelStyle}>Target Sector in India <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Do you currently export to India? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-india" options={["Yes", "Exploring", "Not Yet"]} value={form.exports_to_india as string} onChange={(v) => set("exports_to_india", v)} hasError={!!errors.exports_to_india} />
        {errors.exports_to_india && <span style={errorStyle}>{errors.exports_to_india}</span>}
      </div>
      <div>
        <label style={labelStyle}>Main challenge entering India market <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-challenge" value={form.challenge as string} onChange={(v) => set("challenge", v)} options={["Finding Buyers", "Regulations", "Tariffs", "Distribution", "Other"]} placeholder="— Select —" hasError={!!errors.challenge} />
        {errors.challenge && <span style={errorStyle}>{errors.challenge}</span>}
      </div>
      <div>
        <label style={labelStyle}>Preferred India Market Entry Mode</label>
        <Select id="s3-mode" value={form.entry_mode as string} onChange={(v) => set("entry_mode", v)} options={["Direct B2B", "Distributor", "Agent", "Joint Venture", "Other"]} placeholder="— Select —" />
      </div>
    </>
  );
}

function IndianImporterFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Company Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-company" value={form.company as string} onChange={(v) => set("company", v)} placeholder="Your company name" hasError={!!errors.company} />
        {errors.company && <span style={errorStyle}>{errors.company}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Products You Import <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-products" value={form.import_products as string} onChange={(v) => set("import_products", v)} placeholder="Products you import..." hasError={!!errors.import_products} />
        {errors.import_products && <span style={errorStyle}>{errors.import_products}</span>}
      </div>
      <div>
        <label style={labelStyle}>Countries You Currently Import From <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-countries" value={form.source_countries as string} onChange={(v) => set("source_countries", v)} placeholder="e.g. China, USA, Germany..." hasError={!!errors.source_countries} />
        {errors.source_countries && <span style={errorStyle}>{errors.source_countries}</span>}
      </div>
      <div>
        <label style={labelStyle}>Sector <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Annual Import Value (approx.)</label>
        <Select id="s3-value" value={form.import_value as string} onChange={(v) => set("import_value", v)} options={["Under ₹1 Cr", "₹1–10 Cr", "₹10–50 Cr", "₹50 Cr+"]} placeholder="— Select —" />
      </div>
      <div>
        <label style={labelStyle}>Biggest challenge in current importing? <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-challenge" value={form.challenge as string} onChange={(v) => set("challenge", v)} options={["Finding Verified Suppliers", "Tariff Intelligence", "Compliance", "Quality Assurance", "Logistics", "Other"]} placeholder="— Select —" hasError={!!errors.challenge} />
        {errors.challenge && <span style={errorStyle}>{errors.challenge}</span>}
      </div>
      <div>
        <label style={labelStyle}>IEC Available? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-iec" options={["Yes", "Applied", "No"]} value={form.iec as string} onChange={(v) => set("iec", v)} hasError={!!errors.iec} />
        {errors.iec && <span style={errorStyle}>{errors.iec}</span>}
      </div>
    </>
  );
}

function ServiceProviderFields({ form, set, setArr, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Company / Practice Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-company" value={form.company as string} onChange={(v) => set("company", v)} placeholder="Your company or practice name" hasError={!!errors.company} />
        {errors.company && <span style={errorStyle}>{errors.company}</span>}
      </div>
      <div>
        <label style={labelStyle}>Type of EXIM Service <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-services" options={["Freight Forwarding", "Customs Clearance", "Trade Finance", "Export Documentation", "Regulatory Consulting", "Logistics", "Insurance", "Other"]} values={form.services as string[]} onChange={(v) => setArr("services", v)} hasError={!!errors.services} />
        {errors.services && <span style={errorStyle}>{errors.services}</span>}
      </div>
      <div>
        <label style={labelStyle}>Primary Sectors Served <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Number of exporter/importer clients currently <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-clients" value={form.clients as string} onChange={(v) => set("clients", v)} options={["1–10", "11–50", "51–200", "200+"]} placeholder="— Select —" hasError={!!errors.clients} />
        {errors.clients && <span style={errorStyle}>{errors.clients}</span>}
      </div>
      <div>
        <label style={labelStyle}>Are you licensed / registered? <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-licensed" options={["Yes", "In Process"]} value={form.licensed as string} onChange={(v) => set("licensed", v)} hasError={!!errors.licensed} />
        {errors.licensed && <span style={errorStyle}>{errors.licensed}</span>}
      </div>
      <div>
        <label style={labelStyle}>Main goal on IGEN Expo <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-goal" value={form.goal as string} onChange={(v) => set("goal", v)} options={["Lead Generation", "Brand Visibility", "Network Expansion", "All of the Above"]} placeholder="— Select —" hasError={!!errors.goal} />
        {errors.goal && <span style={errorStyle}>{errors.goal}</span>}
      </div>
    </>
  );
}

function IgenAwardsFields({ form, set, setArr, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Nominating as <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-nominating" options={["Self", "On Behalf of Company", "On Behalf of Leader"]} value={form.nominating as string} onChange={(v) => set("nominating", v)} hasError={!!errors.nominating} />
        {errors.nominating && <span style={errorStyle}>{errors.nominating}</span>}
      </div>
      <div>
        <label style={labelStyle}>Award Category Interest <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-cats" options={["Leadership Excellence", "Innovation & Technology", "Brand of the Year", "Export Achievement", "Startup & MSME", "Sustainability & ESG"]} values={form.categories as string[]} onChange={(v) => setArr("categories", v)} hasError={!!errors.categories} />
        {errors.categories && <span style={errorStyle}>{errors.categories}</span>}
      </div>
      <div>
        <label style={labelStyle}>Sector for Nomination <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Company / Individual Name for Nomination <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-nom-name" value={form.nominee_name as string} onChange={(v) => set("nominee_name", v)} placeholder="Name of nominee" hasError={!!errors.nominee_name} />
        {errors.nominee_name && <span style={errorStyle}>{errors.nominee_name}</span>}
      </div>
      <div>
        <label style={labelStyle}>Brief description of achievement <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-achievement" value={form.achievement as string} onChange={(v) => set("achievement", v)} placeholder="Why are you nominating this person / company?" hasError={!!errors.achievement} />
        {errors.achievement && <span style={errorStyle}>{errors.achievement}</span>}
      </div>
      <div>
        <label style={labelStyle}>Interested in Sponsoring an Award Category?</label>
        <RadioGroup id="s3-sponsor" options={["Yes", "No", "Maybe"]} value={form.sponsor as string} onChange={(v) => set("sponsor", v)} />
      </div>
    </>
  );
}

function ViksitBharatFields({ form, set, setArr, errors }: FieldProps) {
  const showSpeaker = (form.interested_as as string[])?.includes("Speaker");
  const showSponsor = (form.interested_as as string[])?.includes("Sponsor");
  return (
    <>
      <div>
        <label style={labelStyle}>Interested as <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-as" options={["Delegate", "Speaker", "Partner", "Sponsor"]} values={form.interested_as as string[]} onChange={(v) => setArr("interested_as", v)} hasError={!!errors.interested_as} />
        {errors.interested_as && <span style={errorStyle}>{errors.interested_as}</span>}
      </div>
      <div>
        <label style={labelStyle}>Organisation / Company Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-org" value={form.org as string} onChange={(v) => set("org", v)} placeholder="Your organisation" hasError={!!errors.org} />
        {errors.org && <span style={errorStyle}>{errors.org}</span>}
      </div>
      <div>
        <label style={labelStyle}>Sector Represented <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      {showSpeaker && (
        <div>
          <label style={labelStyle}>Speaking topic <span style={{ color: "#E63946" }}>*</span></label>
          <Textarea id="s3-topic" value={form.topic as string} onChange={(v) => set("topic", v)} placeholder="What would you like to speak about?" hasError={!!errors.topic} />
          {errors.topic && <span style={errorStyle}>{errors.topic}</span>}
        </div>
      )}
      {showSponsor && (
        <div>
          <label style={labelStyle}>Sponsorship budget range <span style={{ color: "#E63946" }}>*</span></label>
          <Select id="s3-budget" value={form.budget as string} onChange={(v) => set("budget", v)} options={["Under ₹5L", "₹5–20L", "₹20–50L", "₹50L+"]} placeholder="— Select —" hasError={!!errors.budget} />
          {errors.budget && <span style={errorStyle}>{errors.budget}</span>}
        </div>
      )}
      <div>
        <label style={labelStyle}>City preference for attending <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-city" value={form.city as string} onChange={(v) => set("city", v)} placeholder="Your preferred city" hasError={!!errors.city} />
        {errors.city && <span style={errorStyle}>{errors.city}</span>}
      </div>
      <div>
        <label style={labelStyle}>Government affiliation (if any)</label>
        <Input id="s3-gov" value={form.gov_affiliation as string} onChange={(v) => set("gov_affiliation", v)} placeholder="Ministry / Department / Organization" />
      </div>
    </>
  );
}

function AffiliateFields({ form, set, setArr, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Your Network Description <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-network-desc" value={form.network_desc as string} onChange={(v) => set("network_desc", v)} placeholder="Describe your network..." hasError={!!errors.network_desc} />
        {errors.network_desc && <span style={errorStyle}>{errors.network_desc}</span>}
      </div>
      <div>
        <label style={labelStyle}>Type of Network <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-network-type" options={["Industry Professionals", "SMEs", "Business Owners", "Government Contacts", "Media & Press", "Online Community", "Other"]} values={form.network_type as string[]} onChange={(v) => setArr("network_type", v)} hasError={!!errors.network_type} />
        {errors.network_type && <span style={errorStyle}>{errors.network_type}</span>}
      </div>
      <div>
        <label style={labelStyle}>Estimated Network Size <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-size" value={form.network_size as string} onChange={(v) => set("network_size", v)} options={["Under 100", "100–500", "500–2000", "2000–10000", "10000+"]} placeholder="— Select —" hasError={!!errors.network_size} />
        {errors.network_size && <span style={errorStyle}>{errors.network_size}</span>}
      </div>
      <div>
        <label style={labelStyle}>Sectors your network is strongest in <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-sector" value={form.sector as string} onChange={(v) => set("sector", v)} options={SECTOR_LIST} placeholder="— Select Sector —" hasError={!!errors.sector} />
        {errors.sector && <span style={errorStyle}>{errors.sector}</span>}
      </div>
      <div>
        <label style={labelStyle}>Do you currently promote any B2B platforms?</label>
        <RadioGroup id="s3-promote" options={["Yes", "No"]} value={form.promotes as string} onChange={(v) => set("promotes", v)} />
      </div>
      <div>
        <label style={labelStyle}>How do you plan to promote IGEN? <span style={{ color: "#E63946" }}>*</span></label>
        <CheckboxGroup id="s3-promote-how" options={["WhatsApp", "LinkedIn", "Events", "Direct Calling", "Email", "Other"]} values={form.promote_how as string[]} onChange={(v) => setArr("promote_how", v)} hasError={!!errors.promote_how} />
        {errors.promote_how && <span style={errorStyle}>{errors.promote_how}</span>}
      </div>
    </>
  );
}

function ResellerFields({ form, set, setArr, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Business / Agency Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-biz" value={form.business_name as string} onChange={(v) => set("business_name", v)} placeholder="Your business name" hasError={!!errors.business_name} />
        {errors.business_name && <span style={errorStyle}>{errors.business_name}</span>}
      </div>
      <div>
        <label style={labelStyle}>City / Region to resell in <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-region" value={form.region as string} onChange={(v) => set("region", v)} placeholder="e.g. Mumbai, Pune, Maharashtra" hasError={!!errors.region} />
        {errors.region && <span style={errorStyle}>{errors.region}</span>}
      </div>
      <div>
        <label style={labelStyle}>Current Business Type <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-biz-type" value={form.biz_type as string} onChange={(v) => set("biz_type", v)} options={["Digital Agency", "Consulting Firm", "Event Company", "Media Company", "Individual Entrepreneur", "Other"]} placeholder="— Select —" hasError={!!errors.biz_type} />
        {errors.biz_type && <span style={errorStyle}>{errors.biz_type}</span>}
      </div>
      <div>
        <label style={labelStyle}>B2B Sales Experience <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-b2b-exp" value={form.b2b_exp as string} onChange={(v) => set("b2b_exp", v)} options={["Less than 1 year", "1–3 years", "3–5 years", "5+ years"]} placeholder="— Select —" hasError={!!errors.b2b_exp} />
        {errors.b2b_exp && <span style={errorStyle}>{errors.b2b_exp}</span>}
      </div>
      <div>
        <label style={labelStyle}>What products do you want to resell first? <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-resell-prods" value={form.resell_products as string} onChange={(v) => set("resell_products", v)} placeholder="List the IGEN products you'd like to resell..." hasError={!!errors.resell_products} />
        {errors.resell_products && <span style={errorStyle}>{errors.resell_products}</span>}
      </div>
      <div>
        <label style={labelStyle}>Monthly revenue target from IGEN reselling</label>
        <Select id="s3-revenue" value={form.revenue_target as string} onChange={(v) => set("revenue_target", v)} options={["₹10K–₹50K", "₹50K–₹2L", "₹2L–₹5L", "₹5L+"]} placeholder="— Select —" />
      </div>
    </>
  );
}

function StakeholderFields({ form, set, errors }: FieldProps) {
  return (
    <>
      <div>
        <label style={labelStyle}>Full Name <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-name" value={form.full_name as string} onChange={(v) => set("full_name", v)} placeholder="Your full name" hasError={!!errors.full_name} />
        {errors.full_name && <span style={errorStyle}>{errors.full_name}</span>}
      </div>
      <div>
        <label style={labelStyle}>Organisation / Fund / Firm <span style={{ color: "#E63946" }}>*</span></label>
        <Input id="s3-org" value={form.org as string} onChange={(v) => set("org", v)} placeholder="Your organisation" hasError={!!errors.org} />
        {errors.org && <span style={errorStyle}>{errors.org}</span>}
      </div>
      <div>
        <label style={labelStyle}>Nature of Interest <span style={{ color: "#E63946" }}>*</span></label>
        <Select id="s3-interest" value={form.interest as string} onChange={(v) => set("interest", v)} options={["Strategic Investment", "Co-Building", "Advisory Role", "Partnership", "Media", "Government Collaboration", "Other"]} placeholder="— Select —" hasError={!!errors.interest} />
        {errors.interest && <span style={errorStyle}>{errors.interest}</span>}
      </div>
      <div>
        <label style={labelStyle}>What you bring to IGEN <span style={{ color: "#E63946" }}>*</span></label>
        <Textarea id="s3-contribution" value={form.contribution as string} onChange={(v) => set("contribution", v)} placeholder="Describe what you bring to the table..." hasError={!!errors.contribution} />
        {errors.contribution && <span style={errorStyle}>{errors.contribution}</span>}
      </div>
      <div>
        <label style={labelStyle}>Preferred way to connect with Founder <span style={{ color: "#E63946" }}>*</span></label>
        <RadioGroup id="s3-connect" options={["Video Call", "In-Person Meeting", "Phone Call"]} value={form.connect_mode as string} onChange={(v) => set("connect_mode", v)} hasError={!!errors.connect_mode} />
        {errors.connect_mode && <span style={errorStyle}>{errors.connect_mode}</span>}
      </div>
      <div>
        <label style={labelStyle}>LinkedIn or Website</label>
        <Input id="s3-linkedin" value={form.linkedin as string} onChange={(v) => set("linkedin", v)} placeholder="https://" type="url" />
      </div>
    </>
  );
}

// Helper to map key to element ID for scrolling to validation error
const getElementId = (key: string) => {
  if (key === "experience") return "s3-exp";
  if (key === "known_for") return "s3-known";
  if (key === "legal_name") return "s3-legal";
  if (key === "company_type") return "s3-type";
  if (key === "founding_year") return "s3-year";
  if (key === "employees") return "s3-emp";
  if (key === "leader_pages") return "s3-leader";
  if (key === "leader_name") return "s3-leader-name";
  if (key === "designation") return "s3-desig";
  if (key === "app_type") return "s3-app-type";
  if (key === "news_consumption") return "s3-news-how";
  if (key === "sme_consult") return "s3-sme";
  if (key === "export_products") return "s3-products";
  if (key === "dest_countries") return "s3-countries";
  if (key === "import_products") return "s3-import-products";
  if (key === "find_suppliers") return "s3-how";
  if (key === "exports_to_india") return "s3-india";
  if (key === "services") return "s3-services";
  if (key === "categories") return "s3-cats";
  if (key === "interested_as") return "s3-as";
  if (key === "network_desc") return "s3-network-desc";
  if (key === "network_type") return "s3-network-type";
  if (key === "network_size") return "s3-size";
  if (key === "promote_how") return "s3-promote-how";
  if (key === "business_name") return "s3-biz";
  if (key === "biz_type") return "s3-biz-type";
  if (key === "b2b_exp") return "s3-b2b-exp";
  if (key === "resell_products") return "s3-resell-prods";
  if (key === "revenue_target") return "s3-revenue";
  if (key === "connect_mode") return "s3-connect";
  return `s3-${key}`;
};

// ── Main FormStep3 ──────────────────────────────────────────────────────────

export default function FormStep3({ productId, onComplete, onBack }: FormStep3Props) {
  const [form, setFormState] = useState<Record<string, string | string[]>>({});
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const product = PRODUCT_INFO[productId];

  const set = (key: string, value: string) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const setArr = (key: string, value: string[]) => {
    setFormState((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateStep3(productId, form as Record<string, string | string[] | boolean>);
    if (Object.keys(errs).length) {
      setErrors(errs);
      const firstKey = Object.keys(errs)[0];
      document.getElementById(getElementId(firstKey))?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setLoading(true);
    saveProgress("step3", form as Record<string, string | string[] | boolean>);
    await new Promise((r) => setTimeout(r, 400));
    setLoading(false);
    onComplete(form as Record<string, string | string[] | boolean>);
  };

  const renderFields = () => {
    switch (productId) {
      case "sme_page": return <SmePageFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "associate_sme": return <AssociateSmeFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "company_page": return <CompanyPageFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "leader_page": return <LeaderPageFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "reader_plan": return <ReaderPlanFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "indian_exporter": return <IndianExporterFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "global_importer": return <GlobalImporterFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "global_exporter": return <GlobalExporterFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "indian_importer": return <IndianImporterFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "service_provider": return <ServiceProviderFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "igen_awards": return <IgenAwardsFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "viksit_bharat_conf": return <ViksitBharatFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "affiliate_partner": return <AffiliateFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "reseller_partner": return <ResellerFields form={form} set={set} setArr={setArr} errors={errors} />;
      case "founding_stakeholder": return <StakeholderFields form={form} set={set} setArr={setArr} errors={errors} />;
      default: return null;
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6 text-center">
        <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "#E63946" }}>Step 3 of 4</p>
        <h2 className="text-xl font-bold" style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}>
          Your {product.name} Details
        </h2>
      </div>

      <div className="space-y-4">{renderFields()}</div>

      <div className="mt-6 flex gap-3">
        <button type="button" onClick={onBack} className="rounded-full px-5 py-3 text-sm font-semibold transition-all" style={{ border: "1.5px solid #DEE2E6", color: "#6C757D", background: "#fff", minHeight: "48px" }}>← Back</button>
        <button id="step3-submit" type="submit" disabled={loading} className="flex-1 rounded-full py-3 text-base font-bold text-white transition-all duration-200"
          style={{ background: loading ? "#9CA3AF" : "linear-gradient(135deg, #E63946 0%, #c0392b 100%)", boxShadow: "0 4px 18px rgba(230,57,70,0.30)", minHeight: "56px", cursor: loading ? "not-allowed" : "pointer" }}>
          {loading ? "Saving…" : "Continue → (Step 3 of 4)"}
        </button>
      </div>
    </form>
  );
}
