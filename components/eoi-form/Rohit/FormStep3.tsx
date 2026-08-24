"use client";

import { useState } from "react";
import { ProductId, PRODUCT_INFO, SECTOR_LIST } from "./data/productData";
import { saveProgress } from "./utils/formUtils";

interface FormStep3Props {
  productId: ProductId;
  onComplete: (data: Record<string, any>) => void;
  onBack: () => void;
}

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
  border: "1.5px solid #DEE2E6",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: "14px",
  fontWeight: 600,
  marginBottom: "6px",
  color: "#1A1A2E",
};

function Input({
  id,
  value = "",
  onChange,
  placeholder,
  type = "text",
}: {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={inputBase}
    />
  );
}

function Select({
  id,
  value = "",
  onChange,
  options,
  placeholder,
}: {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder?: string;
}) {
  return (
    <select
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={{ ...inputBase, appearance: "none" }}
    >
      {placeholder && <option value="">{placeholder}</option>}
      {options.map((o) => (
        <option key={o} value={o}>
          {o}
        </option>
      ))}
    </select>
  );
}

function RadioGroup({
  options,
  value = "",
  onChange,
}: {
  options: string[];
  value?: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const isSelected = value === opt;
        return (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className="rounded-full px-3.5 py-1.5 text-xs font-bold transition-all cursor-pointer border"
            style={{
              borderColor: isSelected ? "#0A2463" : "#DEE2E6",
              background: isSelected ? "#0A2463" : "#ffffff",
              color: isSelected ? "#ffffff" : "#4A5568",
            }}
          >
            {isSelected && "✓ "}
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
}: {
  id: string;
  value?: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <textarea
      id={id}
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      style={{ ...inputBase, minHeight: "auto", resize: "vertical" }}
    />
  );
}

function CheckboxGroup({
  options,
  values = [],
  onChange,
}: {
  options: string[];
  values?: string[];
  onChange: (v: string[]) => void;
}) {
  const toggle = (opt: string) => {
    if (values.includes(opt)) onChange(values.filter((v) => v !== opt));
    else onChange([...values, opt]);
  };
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const checked = values.includes(opt);
        return (
          <button
            key={opt}
            type="button"
            onClick={() => toggle(opt)}
            className="flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-bold transition-all border cursor-pointer"
            style={{
              borderColor: checked ? "#2A9D8F" : "#DEE2E6",
              background: checked ? "#F0FDF9" : "#ffffff",
              color: checked ? "#065F46" : "#4A5568",
            }}
          >
            <span>{checked ? "✅" : "⬜"}</span>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

export default function FormStep3({
  productId,
  onComplete,
  onBack,
}: FormStep3Props) {
  const product = PRODUCT_INFO[productId];
  const [form, setForm] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(false);

  const set = (k: string, v: any) => setForm((prev) => ({ ...prev, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    saveProgress("step3", form);
    await new Promise((r) => setTimeout(r, 300));
    setLoading(false);
    onComplete(form);
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="mb-6 text-center">
        <span
          className="inline-block text-xs font-extrabold uppercase tracking-widest px-3 py-1 rounded-full mb-2"
          style={{ background: "#EEF2FF", color: "#0A2463" }}
        >
          STEP 3 OF 4 — PRODUCT DETAILS
        </span>
        <h2
          className="text-xl md:text-2xl font-bold mb-1"
          style={{ fontFamily: "'Poppins', sans-serif", color: "#0A2463" }}
        >
          {product ? `${product.name} Details` : "Product Details"}
        </h2>

        {product && (
          <div
            className="mt-2 p-3 rounded-xl text-xs font-semibold max-w-lg mx-auto"
            style={{
              background: "#FFF7ED",
              color: "#C2440E",
              border: "1px solid #FFEDD5",
            }}
          >
            💡 {product.stage3Hook}
          </div>
        )}
      </div>

      <div className="space-y-4">
        {/* Render Product-Specific Stage 3 Fields */}
        {productId === "p1_indian_exporter" && (
          <>
            <div>
              <label style={labelStyle}>Company / Legal Name *</label>
              <Input id="legal_name" value={form.legal_name} onChange={(v) => set("legal_name", v)} placeholder="Registered Company Legal Name" />
            </div>
            <div>
              <label style={labelStyle}>Export Product Category *</label>
              <Textarea id="export_category" value={form.export_category} onChange={(v) => set("export_category", v)} placeholder="Primary products exported..." />
            </div>
            <div>
              <label style={labelStyle}>Destination Countries / Markets *</label>
              <Input id="dest_countries" value={form.dest_countries} onChange={(v) => set("dest_countries", v)} placeholder="e.g. USA, UAE, Germany, UK" />
            </div>
            <div>
              <label style={labelStyle}>Annual Export Turnover *</label>
              <Select id="turnover" value={form.turnover} onChange={(v) => set("turnover", v)} options={["<₹1 Cr", "₹1–5 Cr", "₹5–25 Cr", "₹25–100 Cr", "₹100 Cr+", "Prefer not to say"]} placeholder="— Select Turnover —" />
            </div>
            <div>
              <label style={labelStyle}>IEC (Importer-Exporter Code) *</label>
              <RadioGroup options={["Yes (have IEC)", "Applied / In Process", "No (not yet)"]} value={form.iec} onChange={(v) => set("iec", v)} />
            </div>
            <div>
              <label style={labelStyle}>Primary Export Challenge</label>
              <Select id="challenge" value={form.challenge} onChange={(v) => set("challenge", v)} options={["Buyer Discovery", "Payment Security", "Logistics", "Documentation", "Tariffs / Duties", "Other"]} placeholder="— Select Challenge —" />
            </div>
          </>
        )}

        {productId === "p2_global_importer" && (
          <>
            <div>
              <label style={labelStyle}>International Buyer Company Name *</label>
              <Input id="legal_name" value={form.legal_name} onChange={(v) => set("legal_name", v)} placeholder="Company Name" />
            </div>
            <div>
              <label style={labelStyle}>Country of Origin *</label>
              <Input id="country_origin" value={form.country_origin} onChange={(v) => set("country_origin", v)} placeholder="Country name" />
            </div>
            <div>
              <label style={labelStyle}>Products to Import from India *</label>
              <Textarea id="import_products" value={form.import_products} onChange={(v) => set("import_products", v)} placeholder="Products you wish to source from India..." />
            </div>
            <div>
              <label style={labelStyle}>Annual Import Volume (from India) *</label>
              <Select id="import_vol" value={form.import_vol} onChange={(v) => set("import_vol", v)} options={["<$50K", "$50K–$250K", "$250K–$1M", "$1M–$5M", "$5M+", "Prefer not to say"]} placeholder="— Select Volume —" />
            </div>
            <div>
              <label style={labelStyle}>How Do You Currently Find Indian Suppliers? *</label>
              <RadioGroup options={["Trade Shows", "B2B Platforms", "Referrals", "India Sourcing Office", "No Structured Method"]} value={form.find_method} onChange={(v) => set("find_method", v)} />
            </div>
          </>
        )}

        {productId === "p3_global_exporter" && (
          <>
            <div>
              <label style={labelStyle}>Country of Origin *</label>
              <Input id="country_origin" value={form.country_origin} onChange={(v) => set("country_origin", v)} placeholder="Country name" />
            </div>
            <div>
              <label style={labelStyle}>Products / Services Exported *</label>
              <Textarea id="export_products" value={form.export_products} onChange={(v) => set("export_products", v)} placeholder="Describe products/services to export to India..." />
            </div>
            <div>
              <label style={labelStyle}>Currently Export to India? *</label>
              <RadioGroup options={["Yes", "No", "Previously but stopped"]} value={form.currently_exports} onChange={(v) => set("currently_exports", v)} />
            </div>
            <div>
              <label style={labelStyle}>Primary India Market Entry Challenge</label>
              <Select id="challenge" value={form.challenge} onChange={(v) => set("challenge", v)} options={["Finding Verified Buyers", "Import Duties & Tariffs", "Regulatory Compliance", "Local Distributor Search", "Price Competition", "Other"]} placeholder="— Select Challenge —" />
            </div>
          </>
        )}

        {productId === "p4_indian_importer" && (
          <>
            <div>
              <label style={labelStyle}>Products Imported / Sourced *</label>
              <Textarea id="import_products" value={form.import_products} onChange={(v) => set("import_products", v)} placeholder="Products you import..." />
            </div>
            <div>
              <label style={labelStyle}>Countries Currently Imported From *</label>
              <Input id="source_countries" value={form.source_countries} onChange={(v) => set("source_countries", v)} placeholder="e.g. China, Germany, USA, Japan..." />
            </div>
            <div>
              <label style={labelStyle}>Annual Import Value *</label>
              <Select id="import_val" value={form.import_val} onChange={(v) => set("import_val", v)} options={["<₹50L", "₹50L–₹2 Cr", "₹2–10 Cr", "₹10–50 Cr", "₹50 Cr+", "Prefer not to say"]} placeholder="— Select Value —" />
            </div>
            <div>
              <label style={labelStyle}>IEC Status *</label>
              <RadioGroup options={["Yes (have IEC)", "Applied / In Process", "No (not yet)"]} value={form.iec} onChange={(v) => set("iec", v)} />
            </div>
          </>
        )}

        {productId === "p5_service_provider" && (
          <>
            <div>
              <label style={labelStyle}>Type of EXIM Service *</label>
              <CheckboxGroup options={["Freight Forwarding", "Customs Brokerage", "Trade Finance", "EXIM Consulting", "Logistics", "Insurance", "Legal & Compliance", "Documentation"]} values={form.services || []} onChange={(v) => set("services", v)} />
            </div>
            <div>
              <label style={labelStyle}>Active Client Count</label>
              <Select id="clients" value={form.clients} onChange={(v) => set("clients", v)} options={["1–10", "11–50", "51–200", "201–500", "500+"]} placeholder="— Select Client Count —" />
            </div>
            <div>
              <label style={labelStyle}>Licensed / Registered Accreditations</label>
              <CheckboxGroup options={["DGFT Licensed", "FFFAI Member", "IATA Accredited", "RBI Authorised", "None Yet"]} values={form.accreditations || []} onChange={(v) => set("accreditations", v)} />
            </div>
          </>
        )}

        {productId === "p6_sme_page" && (
          <>
            <div>
              <label style={labelStyle}>Years of Professional Experience *</label>
              <Select id="experience" value={form.experience} onChange={(v) => set("experience", v)} options={["10–15 years", "15–20 years", "20–25 years", "25–30 years", "30+ years"]} placeholder="— Select Experience —" />
            </div>
            <div>
              <label style={labelStyle}>Top Areas of Expertise *</label>
              <Textarea id="expertise" value={form.expertise} onChange={(v) => set("expertise", v)} placeholder="Consulting topics, technical skills, sector wisdom..." />
            </div>
            <div>
              <label style={labelStyle}>Do You Offer Consulting Services? *</label>
              <RadioGroup options={["Yes", "No", "Planning to"]} value={form.consulting} onChange={(v) => set("consulting", v)} />
            </div>
            <div>
              <label style={labelStyle}>Interested in Joining the IGEN Awards Jury?</label>
              <RadioGroup options={["Yes", "Maybe", "No"]} value={form.jury} onChange={(v) => set("jury", v)} />
            </div>
          </>
        )}

        {productId === "p7_associate_sme" && (
          <>
            <div>
              <label style={labelStyle}>Years of Industry Experience *</label>
              <Select id="experience" value={form.experience} onChange={(v) => set("experience", v)} options={["5–10 years", "10–15 years", "15+ years"]} placeholder="— Select Experience —" />
            </div>
            <div>
              <label style={labelStyle}>Areas of Emerging Expertise *</label>
              <Textarea id="expertise" value={form.expertise} onChange={(v) => set("expertise", v)} placeholder="Describe your key strengths and professional focus..." />
            </div>
            <div>
              <label style={labelStyle}>Goal to Become Full SME Status in 1-2 Years? *</label>
              <RadioGroup options={["Yes", "Maybe", "Not sure"]} value={form.sme_goal} onChange={(v) => set("sme_goal", v)} />
            </div>
          </>
        )}

        {productId === "p8_company_page" && (
          <>
            <div>
              <label style={labelStyle}>Company Legal Registered Name *</label>
              <Input id="legal_name" value={form.legal_name} onChange={(v) => set("legal_name", v)} placeholder="Legal Name" />
            </div>
            <div>
              <label style={labelStyle}>Year of Founding *</label>
              <Input id="founding_year" type="number" value={form.founding_year} onChange={(v) => set("founding_year", v)} placeholder="e.g. 2018" />
            </div>
            <div>
              <label style={labelStyle}>Employee Count Range *</label>
              <Select id="emp_count" value={form.emp_count} onChange={(v) => set("emp_count", v)} options={["1–10", "11–50", "51–200", "201–500", "500+"]} placeholder="— Select Employee Count —" />
            </div>
            <div>
              <label style={labelStyle}>Blue Tick Document Verification Ready? *</label>
              <RadioGroup options={["Yes (GST/PAN/Incorporation ready)", "In Progress", "Need guidance"]} value={form.blue_tick} onChange={(v) => set("blue_tick", v)} />
            </div>
          </>
        )}

        {productId === "p9_leader_page" && (
          <>
            <div>
              <label style={labelStyle}>Executive Title / Designation *</label>
              <Input id="designation" value={form.designation} onChange={(v) => set("designation", v)} placeholder="e.g. Founder & CEO, Managing Director" />
            </div>
            <div>
              <label style={labelStyle}>LinkedIn Executive Profile URL</label>
              <Input id="linkedin" value={form.linkedin} onChange={(v) => set("linkedin", v)} placeholder="https://linkedin.com/in/username" />
            </div>
            <div>
              <label style={labelStyle}>Executive Leadership Goals *</label>
              <CheckboxGroup options={["Thought Leadership", "Board Appointments", "Speaking Engagements", "Awards Recognition", "Investor Visibility"]} values={form.goals || []} onChange={(v) => set("goals", v)} />
            </div>
          </>
        )}

        {productId === "p10_reader_plan" && (
          <>
            <div>
              <label style={labelStyle}>News Consumption Channels *</label>
              <CheckboxGroup options={["WhatsApp Alerts", "Daily Email Digest", "Mobile App Feed", "Weekly Sector Reports", "Direct Portal Access"]} values={form.channels || []} onChange={(v) => set("channels", v)} />
            </div>
            <div>
              <label style={labelStyle}>Primary Reason for Upgrading *</label>
              <Textarea id="upgrade_reason" value={form.upgrade_reason} onChange={(v) => set("upgrade_reason", v)} placeholder="What sector intelligence matters most to you?" />
            </div>
          </>
        )}

        {/* Awards & Conferences (P11 - P20) */}
        {productId === "p11_nomination" && (
          <>
            <div>
              <label style={labelStyle}>Nomination Type *</label>
              <RadioGroup options={["Self-nomination", "On behalf of company", "On behalf of a leader"]} value={form.nom_type} onChange={(v) => set("nom_type", v)} />
            </div>
            <div>
              <label style={labelStyle}>Award Group *</label>
              <Select id="award_group" value={form.award_group} onChange={(v) => set("award_group", v)} options={["Individual Leadership", "Organisation Excellence", "Sector / Industry Award", "Viksit Bharat Theme", "Government / PSU"]} placeholder="— Select Award Group —" />
            </div>
            <div>
              <label style={labelStyle}>Nominee Name *</label>
              <Input id="nominee_name" value={form.nominee_name} onChange={(v) => set("nominee_name", v)} placeholder="Company or Individual Name" />
            </div>
            <div>
              <label style={labelStyle}>Achievement Description *</label>
              <Textarea id="achievement" value={form.achievement} onChange={(v) => set("achievement", v)} placeholder="Describe key accomplishments, innovation, or growth..." />
            </div>
          </>
        )}

        {productId === "p12_sponsorship" && (
          <>
            <div>
              <label style={labelStyle}>Sponsorship Tier *</label>
              <Select id="tier" value={form.tier} onChange={(v) => set("tier", v)} options={["Founding Sponsor", "Title Sponsor", "Presenting Sponsor", "Category Sponsor", "Platinum / Gold", "Not Sure Yet"]} placeholder="— Select Tier —" />
            </div>
            <div>
              <label style={labelStyle}>Indicative Budget</label>
              <Select id="budget" value={form.budget} onChange={(v) => set("budget", v)} options={["<₹5L", "₹5–20L", "₹20–50L", "₹50L–1 Cr", "₹1 Cr+"]} placeholder="— Select Budget —" />
            </div>
          </>
        )}

        {productId === "p13_branding" && (
          <>
            <div>
              <label style={labelStyle}>Branding Formats of Interest *</label>
              <CheckboxGroup options={["Written CEO Interview", "Video Feature", "Hall of Fame Listing", "Social Media Campaign", "Digital Banner Spotlight"]} values={form.formats || []} onChange={(v) => set("formats", v)} />
            </div>
            <div>
              <label style={labelStyle}>Brand Message Summary *</label>
              <Textarea id="message" value={form.message} onChange={(v) => set("message", v)} placeholder="Key takeaways for your audience..." />
            </div>
          </>
        )}

        {productId === "p14_certification" && (
          <>
            <div>
              <label style={labelStyle}>Certification Type *</label>
              <CheckboxGroup options={["IGEN Trust Seal", "Verified MSME", "ESG & Sustainability", "Export Excellence", "AI Readiness", "Startup Credential"]} values={form.certs || []} onChange={(v) => set("certs", v)} />
            </div>
            <div>
              <label style={labelStyle}>GSTIN / Identification (if applicable)</label>
              <Input id="gstin" value={form.gstin} onChange={(v) => set("gstin", v)} placeholder="15-digit GSTIN" />
            </div>
          </>
        )}

        {productId === "p15_conference" && (
          <>
            <div>
              <label style={labelStyle}>Conference Role Interest *</label>
              <CheckboxGroup options={["Keynote Speaker", "Panel Speaker", "Roundtable Chair", "VIP Delegate Pass", "Corporate Delegation"]} values={form.roles || []} onChange={(v) => set("roles", v)} />
            </div>
            <div>
              <label style={labelStyle}>Proposed Topic / Expertise *</label>
              <Textarea id="topic" value={form.topic} onChange={(v) => set("topic", v)} placeholder="Proposed speech topic or panel expertise..." />
            </div>
          </>
        )}

        {productId === "p16_sponsorships" && (
          <>
            <div>
              <label style={labelStyle}>Conference Sponsorship Tier *</label>
              <Select id="tier" value={form.tier} onChange={(v) => set("tier", v)} options={["Founding Conference Sponsor", "Title Sponsor", "Session Host", "Research Partner", "Not sure"]} placeholder="— Select Tier —" />
            </div>
          </>
        )}

        {productId === "p17_speakers" && (
          <>
            <div>
              <label style={labelStyle}>Proposed Keynote / Panel Topic *</label>
              <Textarea id="topic" value={form.topic} onChange={(v) => set("topic", v)} placeholder="Describe your topic or thesis..." />
            </div>
          </>
        )}

        {productId === "p18_delegates" && (
          <>
            <div>
              <label style={labelStyle}>Number of Delegate Seats Requested *</label>
              <Input id="seats" type="number" value={form.seats} onChange={(v) => set("seats", v)} placeholder="e.g. 1, 3, 5, 10" />
            </div>
          </>
        )}

        {productId === "p19_awards" && (
          <>
            <div>
              <label style={labelStyle}>Viksit Bharat Achievement Category *</label>
              <Textarea id="achievement" value={form.achievement} onChange={(v) => set("achievement", v)} placeholder="Describe your organization's contribution to Vision 2047..." />
            </div>
          </>
        )}

        {productId === "p20_research_media" && (
          <>
            <div>
              <label style={labelStyle}>Research & Media Scope *</label>
              <CheckboxGroup options={["Co-Published Whitepaper", "Press Release Syndication", "Stage Launch Event", "Video Podcast Recording"]} values={form.scopes || []} onChange={(v) => set("scopes", v)} />
            </div>
          </>
        )}

        {productId === "p21_sso_chairman" && (
          <>
            <div>
              <label style={labelStyle}>Preferred SSO Leadership Role (Pied Piper Model) *</label>
              <RadioGroup
                options={[
                  "👑 SSO Chairman",
                  "👥 SSO Vice Chairman",
                  "👥 SSO Associate Chairman 1",
                  "👥 SSO Associate Chairman 2",
                  "👥 SSO SME Envoy Delegate",
                ]}
                value={form.sso_role}
                onChange={(v) => set("sso_role", v)}
              />
            </div>

            <div>
              <label style={labelStyle}>Target GDP Sector (60 Sectors Available) *</label>
              <Select
                id="target_sector"
                value={form.target_sector}
                onChange={(v) => set("target_sector", v)}
                options={SECTOR_LIST}
                placeholder="— Select Target GDP Sector —"
              />
            </div>

            <div>
              <label style={labelStyle}>Proposed 1-Hour Session Topic / Leadership Vision *</label>
              <Textarea
                id="session_vision"
                value={form.session_vision}
                onChange={(v) => set("session_vision", v)}
                placeholder="Describe your vision, session focus, or thought leadership topic for this sector session..."
              />
            </div>

            <div>
              <label style={labelStyle}>Prior Session Chair / Keynote Experience *</label>
              <RadioGroup
                options={[
                  "Experienced Session Chair",
                  "Frequent Keynote Speaker",
                  "First-Time Chair",
                  "Panel Moderator",
                ]}
                value={form.prior_exp}
                onChange={(v) => set("prior_exp", v)}
              />
            </div>
          </>
        )}

        {/* Generic fallback for any remaining product IDs */}
        {!["p1_indian_exporter", "p2_global_importer", "p3_global_exporter", "p4_indian_importer", "p5_service_provider", "p6_sme_page", "p7_associate_sme", "p8_company_page", "p9_leader_page", "p10_reader_plan", "p11_nomination", "p12_sponsorship", "p13_branding", "p14_certification", "p15_conference", "p16_sponsorships", "p17_speakers", "p18_delegates", "p19_awards", "p20_research_media", "p21_sso_chairman"].includes(productId) && (
          <div>
            <label style={labelStyle}>Specific Requirements / Details *</label>
            <Textarea id="generic_details" value={form.generic_details} onChange={(v) => set("generic_details", v)} placeholder="Tell us more about your specific interest..." />
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="mt-8 flex gap-3">
        <button
          type="button"
          onClick={onBack}
          className="rounded-full px-6 py-3.5 text-sm font-bold border transition-all cursor-pointer"
          style={{
            borderColor: "#DEE2E6",
            color: "#4A5568",
            background: "#ffffff",
          }}
        >
          ← Back
        </button>

        <button
          id="step3-submit"
          type="submit"
          disabled={loading}
          className="flex-1 rounded-full py-4 text-base font-extrabold text-white transition-all duration-200 cursor-pointer shadow-lg"
          style={{
            background: loading
              ? "#9CA3AF"
              : "linear-gradient(135deg, #E63946 0%, #C1121F 100%)",
            boxShadow: "0 4px 18px rgba(230, 57, 70, 0.35)",
          }}
        >
          {loading
            ? "Saving…"
            : product?.stage3Cta || "Continue → (Step 3 of 4)"}
        </button>
      </div>
    </form>
  );
}
