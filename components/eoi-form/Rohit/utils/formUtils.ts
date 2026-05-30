// IGEN EOI Form — Utility Functions
// Validation, localStorage, submission logic

import { ProductId } from "../data/productData";

// ──────────────────────────────────────────────────────────────────────────────
// WEBHOOK CONFIG — Backend team fills these in
// ──────────────────────────────────────────────────────────────────────────────
export const WEBHOOK_URL = ""; // e.g. "https://api.igen.com/eoi/submit"
export const CRM_WEBHOOK = ""; // CRM webhook URL

// ──────────────────────────────────────────────────────────────────────────────
// STORAGE KEYS
// ──────────────────────────────────────────────────────────────────────────────
export const STORAGE_KEYS = {
  CURRENT_SUBMISSION: "igen_eoi_current",
  ALL_SUBMISSIONS: "igen_eoi_all_submissions",
  PRODUCT_SELECTED: "igen_eoi_product",
  STEP_PROGRESS: "igen_eoi_step",
};

// ──────────────────────────────────────────────────────────────────────────────
// SUBMISSION SCHEMA
// ──────────────────────────────────────────────────────────────────────────────
export interface SubmissionData {
  meta: {
    submission_id: string;
    submitted_at: string;
    product_id: ProductId | "";
    product_name: string;
    platform: string;
    traffic_source: string;
    team_member: string;
    form_version: string;
  };
  step1: {
    full_name: string;
    mobile: string;
    email: string;
    city: string;
    interested_in: string;
  };
  step2: {
    company_name: string;
    industry_sector: string;
    designation: string;
    website: string;
    business_category: string;
    years_in_business: string;
  };
  step3: Record<string, string | string[] | boolean>;
  step4: {
    why_interested: string;
    goals: string;
    referral_source: string;
    referral_name: string;
    additional_products: string[];
    comments: string;
    consent: boolean;
  };
  status: {
    step1_completed: boolean;
    step2_completed: boolean;
    step3_completed: boolean;
    step4_completed: boolean;
    fully_submitted: boolean;
    completion_percentage: number;
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// GENERATE SUBMISSION ID
// ──────────────────────────────────────────────────────────────────────────────
export function generateSubmissionId(): string {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.floor(1000 + Math.random() * 9000);
  return `IGEN-${timestamp}-${random}`;
}

// ──────────────────────────────────────────────────────────────────────────────
// CALCULATE COMPLETION PERCENTAGE
// ──────────────────────────────────────────────────────────────────────────────
export function calculateCompletion(submission: SubmissionData): number {
  const steps = [
    submission.status.step1_completed,
    submission.status.step2_completed,
    submission.status.step3_completed,
    submission.status.step4_completed,
  ];
  const completed = steps.filter(Boolean).length;
  return Math.round((completed / 4) * 100);
}

// ──────────────────────────────────────────────────────────────────────────────
// INIT EMPTY SUBMISSION
// ──────────────────────────────────────────────────────────────────────────────
export function createEmptySubmission(productId: ProductId | "" = "", productName = "", platform = ""): SubmissionData {
  return {
    meta: {
      submission_id: generateSubmissionId(),
      submitted_at: "",
      product_id: productId,
      product_name: productName,
      platform: platform,
      traffic_source: "",
      team_member: "",
      form_version: "1.0",
    },
    step1: { full_name: "", mobile: "", email: "", city: "", interested_in: productId },
    step2: { company_name: "", industry_sector: "", designation: "", website: "", business_category: "", years_in_business: "" },
    step3: {},
    step4: { why_interested: "", goals: "", referral_source: "", referral_name: "", additional_products: [], comments: "", consent: false },
    status: {
      step1_completed: false,
      step2_completed: false,
      step3_completed: false,
      step4_completed: false,
      fully_submitted: false,
      completion_percentage: 0,
    },
  };
}

// ──────────────────────────────────────────────────────────────────────────────
// SAVE PROGRESS TO LOCALSTORAGE
// ──────────────────────────────────────────────────────────────────────────────
export function saveProgress(step: keyof Pick<SubmissionData, "step1" | "step2" | "step3" | "step4">, data: Record<string, unknown>): void {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_SUBMISSION);
    const current: SubmissionData = stored ? JSON.parse(stored) : createEmptySubmission();
    (current as unknown as Record<string, unknown>)[step] = data;
    (current.status as Record<string, unknown>)[`${step}_completed`] = true;
    current.status.completion_percentage = calculateCompletion(current);
    localStorage.setItem(STORAGE_KEYS.CURRENT_SUBMISSION, JSON.stringify(current));
  } catch {
    console.error("Failed to save progress to localStorage");
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// LOAD CURRENT SUBMISSION
// ──────────────────────────────────────────────────────────────────────────────
export function loadCurrentSubmission(): SubmissionData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_SUBMISSION);
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// FINAL SUBMIT
// ──────────────────────────────────────────────────────────────────────────────
export async function finalSubmit(): Promise<SubmissionData | null> {
  try {
    const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_SUBMISSION);
    if (!stored) return null;

    const submission: SubmissionData = JSON.parse(stored);
    submission.status.fully_submitted = true;
    submission.meta.submitted_at = new Date().toISOString();

    // Save to all submissions log
    const allStored = localStorage.getItem(STORAGE_KEYS.ALL_SUBMISSIONS);
    const allSubmissions: SubmissionData[] = allStored ? JSON.parse(allStored) : [];
    allSubmissions.push(submission);
    localStorage.setItem(STORAGE_KEYS.ALL_SUBMISSIONS, JSON.stringify(allSubmissions));
    localStorage.setItem(STORAGE_KEYS.CURRENT_SUBMISSION, JSON.stringify(submission));

    // Console log for debugging
    console.log("IGEN EOI SUBMISSION:", JSON.stringify(submission, null, 2));

    // Webhook send if configured
    if (WEBHOOK_URL) {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    }
    if (CRM_WEBHOOK) {
      await fetch(CRM_WEBHOOK, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission),
      });
    }

    return submission;
  } catch (err) {
    console.error("Final submit error:", err);
    return null;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// COPY TO CLIPBOARD
// ──────────────────────────────────────────────────────────────────────────────
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// ──────────────────────────────────────────────────────────────────────────────
// VALIDATE STEP 1
// ──────────────────────────────────────────────────────────────────────────────
export function validateStep1(data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.full_name?.trim()) errors.full_name = "Full name is required";
  if (!data.mobile?.trim()) {
    errors.mobile = "Mobile number is required";
  } else if (!/^\d{10}$/.test(data.mobile.replace(/\s/g, ""))) {
    errors.mobile = "Enter a valid 10-digit mobile number";
  }
  if (!data.email?.trim()) {
    errors.email = "Email address is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!data.city?.trim()) errors.city = "City is required";
  if (!data.interested_in) errors.interested_in = "Please select a product";
  return errors;
}

// ──────────────────────────────────────────────────────────────────────────────
// VALIDATE STEP 2
// ──────────────────────────────────────────────────────────────────────────────
export function validateStep2(data: Record<string, string>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.company_name?.trim()) errors.company_name = "Company / Organisation name is required";
  if (!data.industry_sector) errors.industry_sector = "Please select an industry sector";
  if (!data.designation?.trim()) errors.designation = "Your role / designation is required";
  if (!data.business_category) errors.business_category = "Please select a business category";
  if (!data.years_in_business) errors.years_in_business = "Please select years in business";
  return errors;
}

// ──────────────────────────────────────────────────────────────────────────────
// VALIDATE STEP 4
// ──────────────────────────────────────────────────────────────────────────────
export function validateStep4(data: Record<string, unknown>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!data.why_interested || (data.why_interested as string).trim().length < 20) {
    errors.why_interested = "Please tell us why you're interested (minimum 20 characters)";
  }
  if (!data.referral_source) errors.referral_source = "Please tell us how you heard about IGEN";
  if (!data.consent) errors.consent = "You must agree to be contacted to submit";
  return errors;
}

// ──────────────────────────────────────────────────────────────────────────────
// VALIDATE STEP 3
// ──────────────────────────────────────────────────────────────────────────────
export function validateStep3(productId: ProductId, data: Record<string, string | string[] | boolean>): Record<string, string> {
  const errors: Record<string, string> = {};

  const required = (field: string, msg: string) => {
    const val = data[field];
    if (val === undefined || val === null) {
      errors[field] = msg;
    } else if (typeof val === "string" && !val.trim()) {
      errors[field] = msg;
    } else if (Array.isArray(val) && val.length === 0) {
      errors[field] = msg;
    } else if (typeof val === "boolean" && !val) {
      errors[field] = msg;
    }
  };

  switch (productId) {
    case "sme_page":
      required("sector", "Primary industry sector is required");
      required("experience", "Years of professional experience is required");
      required("expertise", "Top areas of expertise is required");
      required("consulting", "Please specify if you offer consulting");
      required("articles", "Please specify if you have written articles/reports");
      required("plan", "Preferred SME plan is required");
      break;
    case "associate_sme":
      required("sector", "Primary sector of work is required");
      required("experience", "Years of industry experience is required");
      required("role", "Current role/designation is required");
      required("known_for", "Expertise description is required");
      required("networker", "Please specify networking status");
      break;
    case "company_page":
      required("legal_name", "Company legal name is required");
      required("company_type", "Company type is required");
      required("founding_year", "Founding year is required");
      required("sector", "Primary sector is required");
      required("employees", "Number of employees is required");
      required("discover", "Description of company strengths is required");
      break;
    case "leader_page":
      required("leader_name", "Leader full name is required");
      required("designation", "Designation is required");
      required("company", "Current company name is required");
      required("sector", "Primary sector is required");
      required("app_type", "Application type is required");
      required("goals", "Please select at least one goal");
      break;
    case "reader_plan":
      required("sectors", "Please select at least one sector of interest");
      required("news_consumption", "Please select how you consume news");
      required("reason", "Primary reason for upgrading is required");
      break;
    case "indian_exporter":
      required("legal_name", "Company legal name is required");
      required("export_products", "Export product/service category is required");
      required("dest_countries", "Export destination countries is required");
      required("turnover", "Annual export turnover is required");
      required("iec", "IEC availability status is required");
      required("sector", "Export sector is required");
      break;
    case "global_importer":
      required("company", "Company name is required");
      required("country", "Country of origin is required");
      required("import_products", "Primary import products is required");
      required("sector", "Sourcing sector is required");
      required("find_suppliers", "Please select how you find suppliers");
      required("verified", "Verified suppliers requirement is required");
      break;
    case "global_exporter":
      required("company", "Company name is required");
      required("country", "Country of origin is required");
      required("export_products", "Primary products exported is required");
      required("sector", "Target sector in India is required");
      required("exports_to_india", "Export status to India is required");
      required("challenge", "Main challenge entering India is required");
      break;
    case "indian_importer":
      required("company", "Company name is required");
      required("import_products", "Primary products imported is required");
      required("source_countries", "Import source countries is required");
      required("sector", "Import sector is required");
      required("challenge", "Biggest importing challenge is required");
      required("iec", "IEC availability status is required");
      break;
    case "service_provider":
      required("company", "Company / practice name is required");
      required("services", "Please select at least one EXIM service");
      required("sector", "Primary sector served is required");
      required("clients", "Number of clients served is required");
      required("licensed", "Licensing status is required");
      required("goal", "Main goal on IGEN Expo is required");
      break;
    case "igen_awards":
      required("nominating", "Nominating status is required");
      required("categories", "Please select at least one award category");
      required("sector", "Sector for nomination is required");
      required("nominee_name", "Nominee name is required");
      required("achievement", "Description of achievement is required");
      break;
    case "viksit_bharat_conf":
      required("interested_as", "Interested role is required");
      required("org", "Organisation / company name is required");
      required("sector", "Sector represented is required");
      required("city", "City preference is required");
      const intAs = data.interested_as;
      if (Array.isArray(intAs)) {
        if (intAs.includes("Speaker")) {
          required("topic", "Speaking topic is required");
        }
        if (intAs.includes("Sponsor")) {
          required("budget", "Sponsorship budget range is required");
        }
      }
      break;
    case "affiliate_partner":
      required("network_desc", "Network description is required");
      required("network_type", "Please select network type");
      required("network_size", "Estimated network size is required");
      required("sector", "Sectors network strongest in is required");
      required("promote_how", "Please select promotion channel");
      break;
    case "reseller_partner":
      required("business_name", "Business / agency name is required");
      required("region", "City / region is required");
      required("biz_type", "Current business type is required");
      required("b2b_exp", "B2B sales experience is required");
      required("resell_products", "Products to resell is required");
      break;
    case "founding_stakeholder":
      required("full_name", "Full name is required");
      required("org", "Organisation / fund / firm is required");
      required("interest", "Nature of interest is required");
      required("contribution", "Contribution description is required");
      required("connect_mode", "Preferred way to connect is required");
      break;
  }

  return errors;
}

// ──────────────────────────────────────────────────────────────────────────────
// RESET FORM
// ──────────────────────────────────────────────────────────────────────────────
export function resetForm(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_SUBMISSION);
    localStorage.removeItem(STORAGE_KEYS.PRODUCT_SELECTED);
    localStorage.removeItem(STORAGE_KEYS.STEP_PROGRESS);
  } catch {
    // noop
  }
}
