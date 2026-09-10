"use client";

import React, { useState } from "react";
import {
  Briefcase,
  Building2,
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Edit2,
  Check,
  X,
  GraduationCap,
  Award,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Star,
  Sparkles,
} from "lucide-react";

export interface WorkExperienceItem {
  id: string;
  role: string;
  company: string;
  companyLogo?: string;
  companyUrl?: string;
  employmentType: "Full-time" | "Board Member" | "Advisory Partner" | "Founder" | "Executive Director";
  startDate: string;
  endDate: string;
  isCurrent: boolean;
  location: string;
  locationType: "On-site" | "Hybrid" | "Remote";
  summary?: string;
  accomplishments: string[];
  associatedSectors?: string[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  fieldOfStudy?: string;
  startYear: string;
  endYear: string;
  honors?: string;
}

export interface BoardAppointmentItem {
  id: string;
  organization: string;
  committeeRole: string;
  tenure: string;
  description?: string;
}

interface ExecutiveExperienceTimelineProps {
  experiences?: WorkExperienceItem[];
  education?: EducationItem[];
  boardAppointments?: BoardAppointmentItem[];
  isEditable?: boolean;
  onUpdateExperiences?: (items: WorkExperienceItem[]) => void;
  onUpdateEducation?: (items: EducationItem[]) => void;
  onUpdateBoardAppointments?: (items: BoardAppointmentItem[]) => void;
  tier?: "free" | "pioneer" | "luminary" | "sovereign";
}

const DEFAULT_EXPERIENCES: WorkExperienceItem[] = [
  {
    id: "exp_1",
    role: "Chairman & Group Managing Director",
    company: "Singhania Global Conglomerate Ltd",
    companyUrl: "https://example.com",
    employmentType: "Executive Director",
    startDate: "Jan 2019",
    endDate: "Present",
    isCurrent: true,
    location: "Mumbai, India",
    locationType: "Hybrid",
    summary: "Leading corporate strategy, capital deployment, and cross-border manufacturing joint ventures across ASEAN and GCC corridors.",
    accomplishments: [
      "Scaled group market capitalization from ₹4,200 Cr to ₹12,800 Cr across 6 calendar years.",
      "Spearheaded ₹850 Cr bilateral industrial expansion in advanced semiconductor & precision tooling.",
      "Championed corporate ESG adoption, reducing supply chain carbon intensity by 34%."
    ],
    associatedSectors: ["Advanced Manufacturing", "Cross-Border Trade"]
  },
  {
    id: "exp_2",
    role: "Senior Vice President — Global Supply Chains",
    company: "AeroDynamics India Holdings",
    employmentType: "Full-time",
    startDate: "Jul 2013",
    endDate: "Dec 2018",
    isCurrent: false,
    location: "Bengaluru, India",
    locationType: "On-site",
    summary: "Managed multinational logistics network covering 14 tier-1 defense & aerospace manufacturing plants.",
    accomplishments: [
      "Secured 99.4% on-time delivery across critical aerospace assembly sub-contracts.",
      "Restructured vendor procurement framework, saving ₹180 Cr annually."
    ],
    associatedSectors: ["Aerospace & Defense", "Logistics & Sourcing"]
  },
  {
    id: "exp_3",
    role: "Vice President — Industrial Strategy",
    company: "Bharat Heavy Precision Works",
    employmentType: "Full-time",
    startDate: "May 2008",
    endDate: "Jun 2013",
    isCurrent: false,
    location: "Pune, India",
    locationType: "On-site",
    accomplishments: [
      "Led digital manufacturing turnaround across 4 legacy fabrication hubs.",
      "Expanded bilateral export orders with European industrial machinery syndicates."
    ]
  }
];

const DEFAULT_EDUCATION: EducationItem[] = [
  {
    id: "edu_1",
    institution: "Indian Institute of Management Ahmedabad (IIMA)",
    degree: "Executive Management Programme",
    fieldOfStudy: "Global Corporate Governance & Macroeconomics",
    startYear: "2006",
    endYear: "2008",
    honors: "Dean's Distinguished Honor Roll"
  },
  {
    id: "edu_2",
    institution: "Indian Institute of Technology (IIT) Bombay",
    degree: "Bachelor of Technology (B.Tech)",
    fieldOfStudy: "Mechanical & Industrial Systems Engineering",
    startYear: "2002",
    endYear: "2006",
    honors: "First Class with Distinction"
  }
];

const DEFAULT_BOARD_APPOINTMENTS: BoardAppointmentItem[] = [
  {
    id: "board_1",
    organization: "Confederation of Indian Industry (CII)",
    committeeRole: "National Council Member — Cross-Border Supply Chains",
    tenure: "2022 — Present",
    description: "Advising government bodies and trade syndicates on tariff optimization and bilateral CEPA compliance."
  },
  {
    id: "board_2",
    organization: "Indo-Gulf Trade Advisory Board",
    committeeRole: "Independent Director & Strategic Advisor",
    tenure: "2020 — Present",
    description: "Facilitating multi-billion dollar bilateral industrial trade partnerships between India and UAE."
  }
];

export default function ExecutiveExperienceTimeline({
  experiences = DEFAULT_EXPERIENCES,
  education = DEFAULT_EDUCATION,
  boardAppointments = DEFAULT_BOARD_APPOINTMENTS,
  isEditable = false,
  onUpdateExperiences,
  onUpdateEducation,
  onUpdateBoardAppointments,
  tier = "pioneer",
}: ExecutiveExperienceTimelineProps) {
  const [activeSection, setActiveSection] = useState<"experience" | "education" | "board">("experience");

  // Local state for editing
  const [items, setItems] = useState<WorkExperienceItem[]>(experiences);
  const [eduItems, setEduItems] = useState<EducationItem[]>(education);
  const [boardItems, setBoardItems] = useState<BoardAppointmentItem[]>(boardAppointments);

  // New item modal/form states
  const [isAddingExp, setIsAddingExp] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newCompany, setNewCompany] = useState("");
  const [newType, setNewType] = useState<WorkExperienceItem["employmentType"]>("Full-time");
  const [newStartDate, setNewStartDate] = useState("");
  const [newEndDate, setNewEndDate] = useState("Present");
  const [newIsCurrent, setNewIsCurrent] = useState(true);
  const [newLocation, setNewLocation] = useState("");
  const [newAccomplishment, setNewAccomplishment] = useState("");
  const [accomplishmentsList, setAccomplishmentsList] = useState<string[]>([]);

  const handleAddAccomplishment = () => {
    if (!newAccomplishment.trim()) return;
    setAccomplishmentsList([...accomplishmentsList, newAccomplishment.trim()]);
    setNewAccomplishment("");
  };

  const handleSaveNewExp = () => {
    if (!newRole.trim() || !newCompany.trim()) {
      alert("Please provide both Role Title and Company Name.");
      return;
    }

    const newItem: WorkExperienceItem = {
      id: "exp_" + Date.now(),
      role: newRole.trim(),
      company: newCompany.trim(),
      employmentType: newType,
      startDate: newStartDate || "2024",
      endDate: newIsCurrent ? "Present" : newEndDate || "2026",
      isCurrent: newIsCurrent,
      location: newLocation || "India",
      locationType: "Hybrid",
      accomplishments: accomplishmentsList.length > 0 ? accomplishmentsList : ["Led corporate strategic initiatives and executive operations."],
    };

    const updated = [newItem, ...items];
    setItems(updated);
    onUpdateExperiences?.(updated);

    // Reset
    setNewRole("");
    setNewCompany("");
    setNewStartDate("");
    setNewEndDate("Present");
    setAccomplishmentsList([]);
    setIsAddingExp(false);
  };

  const handleDeleteExp = (id: string) => {
    const updated = items.filter((x) => x.id !== id);
    setItems(updated);
    onUpdateExperiences?.(updated);
  };

  return (
    <div className="space-y-6">
      {/* Sub-section Switcher */}
      <div className="flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800 pb-3 flex-wrap gap-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection("experience")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "experience"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Executive Experience ({items.length})</span>
          </button>

          <button
            onClick={() => setActiveSection("education")}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeSection === "education"
                ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Education ({eduItems.length})</span>
          </button>

          {tier !== "free" && (
            <button
              onClick={() => setActiveSection("board")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                activeSection === "board"
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60"
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>Board & Advisory ({boardItems.length})</span>
            </button>
          )}
        </div>

        {isEditable && activeSection === "experience" && (
          <button
            onClick={() => setIsAddingExp(!isAddingExp)}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Position</span>
          </button>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 1. EXECUTIVE EXPERIENCE TIMELINE                                          */}
      {/* ========================================================================= */}
      {activeSection === "experience" && (
        <div className="space-y-4">
          {/* Add Position Form in Admin Mode */}
          {isAddingExp && (
            <div className="bg-slate-50 dark:bg-slate-900/60 p-5 rounded-2xl border border-blue-200 dark:border-blue-900/40 space-y-4 text-xs animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-blue-600" />
                  <span>Add Executive Position</span>
                </h4>
                <button onClick={() => setIsAddingExp(false)} className="text-slate-400 hover:text-slate-600">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Role / Executive Title *</label>
                  <input
                    type="text"
                    value={newRole}
                    onChange={(e) => setNewRole(e.target.value)}
                    placeholder="e.g. Managing Director & CEO"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Company / Conglomerate *</label>
                  <input
                    type="text"
                    value={newCompany}
                    onChange={(e) => setNewCompany(e.target.value)}
                    placeholder="e.g. Tata International Logistics"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Employment Type</label>
                  <select
                    value={newType}
                    onChange={(e) => setNewType(e.target.value as any)}
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  >
                    <option value="Executive Director">Executive Director</option>
                    <option value="Full-time">Full-time</option>
                    <option value="Board Member">Board Member</option>
                    <option value="Founder">Founder</option>
                    <option value="Advisory Partner">Advisory Partner</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Location</label>
                  <input
                    type="text"
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    placeholder="e.g. Mumbai, India"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Start Date</label>
                  <input
                    type="text"
                    value={newStartDate}
                    onChange={(e) => setNewStartDate(e.target.value)}
                    placeholder="e.g. Jan 2021"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block font-bold text-slate-700 dark:text-slate-300">End Date</label>
                    <label className="flex items-center gap-1.5 text-[11px] font-semibold text-blue-600 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newIsCurrent}
                        onChange={(e) => setNewIsCurrent(e.target.checked)}
                        className="rounded text-blue-600"
                      />
                      <span>Current Position</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    disabled={newIsCurrent}
                    value={newIsCurrent ? "Present" : newEndDate}
                    onChange={(e) => setNewEndDate(e.target.value)}
                    placeholder="e.g. Dec 2024"
                    className="w-full px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Accomplishments Bullets */}
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Key Corporate Accomplishments</label>
                <div className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={newAccomplishment}
                    onChange={(e) => setNewAccomplishment(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleAddAccomplishment())}
                    placeholder="e.g. Scaled group EBITDA by 28% across 3 years"
                    className="flex-1 px-3 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={handleAddAccomplishment}
                    className="px-3 py-2 bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 rounded-xl font-bold"
                  >
                    Add
                  </button>
                </div>
                {accomplishmentsList.length > 0 && (
                  <ul className="space-y-1 pl-4 list-disc text-slate-600 dark:text-slate-400">
                    {accomplishmentsList.map((acc, i) => (
                      <li key={i}>{acc}</li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAddingExp(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 dark:text-slate-400 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveNewExp}
                  className="px-4 py-2 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-xs"
                >
                  Save Position
                </button>
              </div>
            </div>
          )}

          {/* Timeline List (LinkedIn Structure) */}
          <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
            {items.map((exp, idx) => (
              <div key={exp.id} className="relative group">
                {/* Node Dot */}
                <div className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all bg-white dark:bg-slate-900 ${
                  exp.isCurrent
                    ? "border-blue-600 shadow-xs text-blue-600"
                    : "border-slate-300 dark:border-slate-700 text-slate-400"
                }`}>
                  <div className={`w-2 h-2 rounded-full ${exp.isCurrent ? "bg-blue-600 animate-pulse" : "bg-slate-400"}`} />
                </div>

                {/* Experience Card */}
                <div className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="flex items-start gap-3.5">
                      {/* Company Lettermark Avatar */}
                      <div className="w-12 h-12 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center font-black text-base text-slate-700 dark:text-slate-300 shrink-0">
                        {exp.company.charAt(0)}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                            {exp.role}
                          </h4>
                          {exp.isCurrent && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                              Present Role
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 mt-0.5">
                          <span>{exp.company}</span>
                          <span>·</span>
                          <span className="text-slate-500 font-normal">{exp.employmentType}</span>
                        </div>

                        <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {exp.startDate} — {exp.endDate}
                          </span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5" />
                            {exp.location} {exp.locationType ? `(${exp.locationType})` : ""}
                          </span>
                        </div>
                      </div>
                    </div>

                    {isEditable && (
                      <button
                        onClick={() => handleDeleteExp(exp.id)}
                        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-xl transition-all self-start"
                        title="Delete Position"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>

                  {exp.summary && (
                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed pt-1">
                      {exp.summary}
                    </p>
                  )}

                  {exp.accomplishments && exp.accomplishments.length > 0 && (
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                        Key Strategic Milestones & Impact
                      </span>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {exp.accomplishments.map((acc, aIdx) => (
                          <li key={aIdx} className="flex items-start gap-2">
                            <span className="text-blue-600 dark:text-blue-400 font-bold shrink-0 mt-0.5">›</span>
                            <span>{acc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {exp.associatedSectors && exp.associatedSectors.length > 0 && (
                    <div className="flex items-center gap-1.5 pt-1 flex-wrap">
                      {exp.associatedSectors.map((sector, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ACADEMIC & EXECUTIVE EDUCATION                                         */}
      {/* ========================================================================= */}
      {activeSection === "education" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {eduItems.map((edu) => (
              <div
                key={edu.id}
                className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/40 border border-violet-200 dark:border-violet-800 flex items-center justify-center font-bold text-violet-600 dark:text-violet-400 shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>

                <div className="space-y-1 flex-1">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">{edu.institution}</h4>
                  <p className="text-xs font-semibold text-slate-700 dark:text-slate-300">{edu.degree}</p>
                  {edu.fieldOfStudy && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">{edu.fieldOfStudy}</p>
                  )}
                  <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                    <span>{edu.startYear} — {edu.endYear}</span>
                    {edu.honors && (
                      <>
                        <span>·</span>
                        <span className="text-amber-600 dark:text-amber-400 font-semibold">{edu.honors}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. BOARD APPOINTMENTS & ADVISORY                                          */}
      {/* ========================================================================= */}
      {activeSection === "board" && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {boardItems.map((b) => (
              <div
                key={b.id}
                className="bg-white dark:bg-[#0f172a] rounded-2xl border border-slate-200/80 dark:border-slate-800 p-5 shadow-xs flex items-start gap-4"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 shrink-0">
                  <Award className="w-6 h-6" />
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center justify-between gap-2 flex-wrap">
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">{b.organization}</h4>
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800">
                      {b.tenure}
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-300">{b.committeeRole}</p>
                  {b.description && (
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed pt-1">
                      {b.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
