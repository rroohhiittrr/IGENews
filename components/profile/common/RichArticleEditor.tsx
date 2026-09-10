"use client";

import React, { useState, useRef } from "react";
import {
  X,
  Image as ImageIcon,
  Camera,
  Play,
  Code2,
  Braces,
  Minus,
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Link2,
  Quote,
  List,
  ListOrdered,
  CheckSquare,
  Heading1,
  Heading2,
  Heading3,
  AlignLeft,
  AlignCenter,
  Maximize2,
  Trash2,
  Upload,
  Search,
  FileText,
  Paperclip,
  CheckCircle2,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Eye,
  Send,
  Save,
  Clock,
  BookOpen,
  Tag,
  AlertTriangle,
  Lock,
} from "lucide-react";

export interface ArticleBlock {
  id: string;
  type: "paragraph" | "heading" | "image" | "video" | "embed" | "code" | "divider" | "quote";
  content?: string;
  level?: 1 | 2 | 3;
  url?: string;
  caption?: string;
  language?: string;
  alignment?: "full" | "center" | "left";
  authorQuote?: string;
}

export interface ArticleDraft {
  id?: string;
  title: string;
  subtitle: string;
  coverImage?: string;
  coverOverlayStyle?: "gradient" | "minimal" | "dark" | "none";
  coverPosition?: "center" | "top" | "bottom";
  hasBackcover?: boolean;
  backcoverText?: string;
  backcoverImage?: string;
  fontFamily: "serif" | "sans" | "mono" | "display";
  fontSize?: "standard" | "large" | "executive";
  blocks: ArticleBlock[];
  tags: string[];
  pdfAttachment?: { name: string; size: string };
  wordAttachment?: { name: string; size: string };
  videoAttachment?: { url: string; title: string; provider?: "direct" | "youtube" | "vimeo" | "loom" };
  scheduledDate?: string;
  authorType?: string;
  authorName?: string;
}

interface RichArticleEditorProps {
  isOpen: boolean;
  onClose: () => void;
  onPublish: (article: ArticleDraft) => void;
  onSaveDraft?: (article: ArticleDraft) => void;
  initialData?: ArticleDraft;
  userTier: "free" | "pro" | "elite" | "sovereign" | "pioneer" | "luminary";
  publishedCountThisMonth: number;
  publishedCountThisWeek: number;
}

const STOCK_UNSPLASH_IMAGES = [
  { id: "s1", url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&auto=format&fit=crop", title: "Global Stock Market Board", author: "Markus Spiske" },
  { id: "s2", url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop", title: "Corporate Skyscraper Architecture", author: "Sean Pollock" },
  { id: "s3", url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&auto=format&fit=crop", title: "Global Digital Network Earth", author: "NASA" },
  { id: "s4", url: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=1200&auto=format&fit=crop", title: "Central Banking & Currency", author: "Tech Daily" },
  { id: "s5", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&auto=format&fit=crop", title: "Financial Data & Analytics", author: "Luke Chesser" },
  { id: "s6", url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1200&auto=format&fit=crop", title: "Executive Business Handshake", author: "Hunters Race" },
];

const AVAILABLE_SECTOR_TAGS = [
  "Macroeconomics",
  "FinTech & Banking",
  "Semiconductors",
  "Clean Energy & ESG",
  "AI & Enterprise Tech",
  "Supply Chain & Logistics",
  "Healthcare & Biotech",
  "Cross-Border Trade",
  "Defense & Aerospace",
  "Policy & Governance",
  "Real Estate & REITs",
  "Venture Capital",
];

export const RichArticleEditor: React.FC<RichArticleEditorProps> = ({
  isOpen,
  onClose,
  onPublish,
  onSaveDraft,
  initialData,
  userTier,
  publishedCountThisMonth,
  publishedCountThisWeek,
}) => {
  // State
  const [fontFamily, setFontFamily] = useState<"serif" | "sans" | "mono" | "display">(initialData?.fontFamily || "serif");
  const [fontSize, setFontSize] = useState<"standard" | "large" | "executive">(initialData?.fontSize || "standard");
  const [title, setTitle] = useState(initialData?.title || "");
  const [subtitle, setSubtitle] = useState(initialData?.subtitle || "");
  const [coverImage, setCoverImage] = useState(initialData?.coverImage || "");
  const [coverPosition, setCoverPosition] = useState<"center" | "top" | "bottom">(initialData?.coverPosition || "center");
  const [coverOverlayStyle, setCoverOverlayStyle] = useState<"gradient" | "minimal" | "dark" | "none">(initialData?.coverOverlayStyle || "gradient");
  
  // Executive Backcover State
  const [hasBackcover, setHasBackcover] = useState<boolean>(initialData?.hasBackcover || false);
  const [backcoverText, setBackcoverText] = useState<string>(
    initialData?.backcoverText ||
      "Analytical memorandum prepared for sovereign institutions, enterprise executives, and market participants. Citations, empirical indices, and qualitative insights verified by iGEN News Editorial Board."
  );
  const [backcoverImage, setBackcoverImage] = useState<string>(initialData?.backcoverImage || "");

  const [blocks, setBlocks] = useState<ArticleBlock[]>(
    initialData?.blocks || [
      {
        id: "b1",
        type: "paragraph",
        content: "Provide your in-depth industry analysis, macro indicators, or strategic insights here. Select text to apply editorial formatting, or click the action icons below to insert rich media blocks...",
      },
    ]
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || ["Macroeconomics"]);
  const [pdfAttachment, setPdfAttachment] = useState<{ name: string; size: string } | undefined>(initialData?.pdfAttachment);
  const [wordAttachment, setWordAttachment] = useState<{ name: string; size: string } | undefined>(initialData?.wordAttachment);
  
  // UI states
  const [activeInsertIndex, setActiveInsertIndex] = useState<number | null>(null);
  const [unsplashModalOpen, setUnsplashModalOpen] = useState(false);
  const [unsplashSearch, setUnsplashSearch] = useState("");
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [videoModalTab, setVideoModalTab] = useState<"upload" | "url">("upload");
  const [videoUrlInput, setVideoUrlInput] = useState("");
  const [embedModalOpen, setEmbedModalOpen] = useState(false);
  const [embedHtmlInput, setEmbedHtmlInput] = useState("");
  const [previewMode, setPreviewMode] = useState(false);
  const [tagDropdownOpen, setTagDropdownOpen] = useState(false);
  const [coverSettingsOpen, setCoverSettingsOpen] = useState(false);
  const [wordImportSuccess, setWordImportSuccess] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const coverFileInputRef = useRef<HTMLInputElement>(null);
  const backcoverFileInputRef = useRef<HTMLInputElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const wordInputRef = useRef<HTMLInputElement>(null);
  const videoFileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Normalized Tier limits logic (supporting both SME and Leader plans)
  const normalizedTier =
    userTier === "pioneer"
      ? "pro"
      : userTier === "luminary"
      ? "elite"
      : userTier;

  const tierQuotas: Record<string, { maxPerMonth: number; maxPerWeek: number; maxTags: number; allowPdf: boolean; allowWord: boolean; name: string }> = {
    free: { maxPerMonth: 0, maxPerWeek: 0, maxTags: 2, allowPdf: false, allowWord: false, name: "Free Tier" },
    pro: { maxPerMonth: 4, maxPerWeek: 1, maxTags: 10, allowPdf: true, allowWord: true, name: "Pro / Pioneer" },
    elite: { maxPerMonth: 6, maxPerWeek: 2, maxTags: 999, allowPdf: true, allowWord: true, name: "Elite / Luminary" },
    sovereign: { maxPerMonth: 8, maxPerWeek: 2, maxTags: 999, allowPdf: true, allowWord: true, name: "Sovereign" },
  };

  const quota = tierQuotas[normalizedTier] || tierQuotas.pro;
  const isMonthlyLimitReached = publishedCountThisMonth >= quota.maxPerMonth;
  const isWeeklyLimitReached = quota.maxPerWeek > 0 && publishedCountThisWeek >= quota.maxPerWeek;

  // Calculate read time and words
  const totalWords = (title + " " + subtitle + " " + blocks.map((b) => b.content || "").join(" ")).trim().split(/\s+/).filter(Boolean).length;
  const readTimeMin = Math.max(1, Math.ceil(totalWords / 200));

  // Block management
  const addBlock = (type: ArticleBlock["type"], extra: Partial<ArticleBlock> = {}, index?: number) => {
    const newBlock: ArticleBlock = {
      id: "b_" + Date.now() + "_" + Math.random().toString(36).substring(2, 6),
      type,
      content: "",
      ...extra,
    };
    if (index !== undefined && index >= 0) {
      const updated = [...blocks];
      updated.splice(index + 1, 0, newBlock);
      setBlocks(updated);
    } else {
      setBlocks([...blocks, newBlock]);
    }
    setActiveInsertIndex(null);
  };

  const updateBlock = (id: string, updates: Partial<ArticleBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const deleteBlock = (id: string) => {
    if (blocks.length <= 1) {
      setBlocks([{ id: "b_" + Date.now(), type: "paragraph", content: "" }]);
      return;
    }
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const moveBlock = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= blocks.length) return;
    const updated = [...blocks];
    const [moved] = updated.splice(index, 1);
    updated.splice(newIndex, 0, moved);
    setBlocks(updated);
  };

  // Image upload handling
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      addBlock("image", { url: fakeUrl, caption: file.name, alignment: "full" }, activeInsertIndex ?? undefined);
    }
  };

  const handleCoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleBackcoverUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBackcoverImage(URL.createObjectURL(file));
      setHasBackcover(true);
    }
  };

  const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPdfAttachment({
        name: file.name,
        size: (file.size / (1024 * 1024)).toFixed(2) + " MB",
      });
    }
  };

  const handleWordUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const sizeStr = (file.size / (1024 * 1024)).toFixed(2) + " MB";
      setWordAttachment({
        name: file.name,
        size: sizeStr,
      });
      const cleanTitle = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
      if (!title.trim()) {
        setTitle(cleanTitle);
      }
      setWordImportSuccess(`Uploaded Word document "${file.name}" (${sizeStr}).`);
      setTimeout(() => setWordImportSuccess(null), 5000);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      addBlock("video", { url: fakeUrl, caption: file.name }, activeInsertIndex ?? undefined);
    }
  };

  // Tag toggle
  const toggleTag = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      if (selectedTags.length >= quota.maxTags) {
        setValidationError(`Your ${quota.name} plan allows a maximum of ${quota.maxTags} sector tags.`);
        return;
      }
      setSelectedTags([...selectedTags, tag]);
      setValidationError(null);
    }
  };

  // Publish validation
  const handlePublishClick = () => {
    if (userTier === "free") {
      setValidationError("Free tier accounts have read-only access. Please upgrade to Pro, Pioneer, Elite, or Sovereign to publish articles.");
      return;
    }
    if (isMonthlyLimitReached) {
      setValidationError(`Monthly publishing limit of ${quota.maxPerMonth} articles reached for ${quota.name}.`);
      return;
    }
    if (isWeeklyLimitReached) {
      setValidationError(`Weekly pacing limit of ${quota.maxPerWeek} article(s)/week reached for ${quota.name}.`);
      return;
    }
    if (!title.trim()) {
      setValidationError("Please enter an article title before publishing.");
      return;
    }
    setValidationError(null);
    onPublish({
      title,
      subtitle,
      coverImage,
      coverOverlayStyle,
      coverPosition,
      fontFamily,
      fontSize,
      hasBackcover,
      backcoverText,
      backcoverImage,
      blocks,
      tags: selectedTags,
      pdfAttachment,
      wordAttachment,
    });
  };

  const getFontClass = () => {
    let font = "font-sans";
    if (fontFamily === "serif") font = "font-serif tracking-normal";
    else if (fontFamily === "mono") font = "font-mono tracking-tight";
    else if (fontFamily === "display") font = "font-serif tracking-wide";

    let size = "text-base";
    if (fontSize === "large") size = "text-lg";
    else if (fontSize === "executive") size = "text-xl";

    return `${font} ${size} leading-relaxed`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-2 md:p-6 overflow-y-auto">
      {/* Hidden File Inputs */}
      <input type="file" ref={fileInputRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
      <input type="file" ref={coverFileInputRef} accept="image/*" className="hidden" onChange={handleCoverUpload} />
      <input type="file" ref={backcoverFileInputRef} accept="image/*" className="hidden" onChange={handleBackcoverUpload} />
      <input type="file" ref={pdfInputRef} accept=".pdf" className="hidden" onChange={handlePdfUpload} />
      <input
        type="file"
        ref={wordInputRef}
        accept=".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        className="hidden"
        onChange={handleWordUpload}
      />
      <input type="file" ref={videoFileInputRef} accept="video/*" className="hidden" onChange={handleVideoUpload} />

      <div className="relative w-full max-w-5xl bg-white dark:bg-[#0f172a] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col max-h-[94vh] overflow-hidden">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-[#131d33] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold text-sm">
              IGE
            </div>
            <div>
              <h2 className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-2">
                Executive Publishing Studio
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium border border-emerald-500/20 uppercase tracking-wider">
                  {quota.name}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <span>{totalWords} words</span>
                <span>•</span>
                <span>{readTimeMin} min read</span>
                <span>•</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">Autosaved</span>
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Family Selector */}
            <div className="hidden sm:flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setFontFamily("serif")}
                className={`px-2.5 py-1 rounded font-serif ${
                  fontFamily === "serif"
                    ? "bg-slate-900 text-white dark:bg-emerald-600 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
                title="Serif: Editorial, Literary"
              >
                Serif
              </button>
              <button
                type="button"
                onClick={() => setFontFamily("sans")}
                className={`px-2.5 py-1 rounded font-sans ${
                  fontFamily === "sans"
                    ? "bg-slate-900 text-white dark:bg-emerald-600 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
                title="Sans: Clean, Modern"
              >
                Sans
              </button>
              <button
                type="button"
                onClick={() => setFontFamily("display")}
                className={`px-2.5 py-1 rounded font-serif tracking-wider ${
                  fontFamily === "display"
                    ? "bg-slate-900 text-white dark:bg-emerald-600 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
                title="Display: Executive Headline"
              >
                Display
              </button>
              <button
                type="button"
                onClick={() => setFontFamily("mono")}
                className={`px-2.5 py-1 rounded font-mono ${
                  fontFamily === "mono"
                    ? "bg-slate-900 text-white dark:bg-emerald-600 font-semibold"
                    : "text-slate-600 dark:text-slate-300 hover:text-slate-900"
                }`}
                title="Mono: Technical, Quant"
              >
                Mono
              </button>
            </div>

            {/* Font Size Selector */}
            <div className="hidden md:flex items-center bg-white dark:bg-slate-800 rounded-lg p-1 border border-slate-200 dark:border-slate-700 text-xs">
              <button
                type="button"
                onClick={() => setFontSize("standard")}
                className={`px-2 py-0.5 rounded font-bold ${
                  fontSize === "standard"
                    ? "bg-slate-900 text-white dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-300"
                }`}
                title="Standard Reading Size"
              >
                A
              </button>
              <button
                type="button"
                onClick={() => setFontSize("large")}
                className={`px-2 py-0.5 rounded font-bold text-sm ${
                  fontSize === "large"
                    ? "bg-slate-900 text-white dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-300"
                }`}
                title="Large Reading Size"
              >
                A+
              </button>
              <button
                type="button"
                onClick={() => setFontSize("executive")}
                className={`px-2 py-0.5 rounded font-bold text-base ${
                  fontSize === "executive"
                    ? "bg-slate-900 text-white dark:bg-emerald-600"
                    : "text-slate-500 hover:text-slate-800 dark:text-slate-300"
                }`}
                title="Executive Presentation Size"
              >
                A++
              </button>
            </div>

            {/* Preview Button */}
            <button
              type="button"
              onClick={() => setPreviewMode(!previewMode)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors ${
                previewMode
                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800"
                  : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:bg-slate-50"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>{previewMode ? "Edit Canvas" : "Reader Preview"}</span>
            </button>

            {/* Save Draft Button */}
            {onSaveDraft && (
              <button
                type="button"
                onClick={() =>
                  onSaveDraft({
                    title,
                    subtitle,
                    coverImage,
                    coverOverlayStyle,
                    coverPosition,
                    fontFamily,
                    fontSize,
                    hasBackcover,
                    backcoverText,
                    backcoverImage,
                    blocks,
                    tags: selectedTags,
                    pdfAttachment,
                    wordAttachment,
                  })
                }
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 transition-colors"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Draft</span>
              </button>
            )}

            {/* Publish Button */}
            <button
              type="button"
              onClick={handlePublishClick}
              disabled={userTier === "free" || isMonthlyLimitReached}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                userTier === "free" || isMonthlyLimitReached
                  ? "bg-slate-200 text-slate-400 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed"
                  : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-emerald-600/20"
              }`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Publish Column</span>
            </button>

            {/* Close */}
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Word Document Upload / Import Notification */}
        {wordImportSuccess && (
          <div className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-200 dark:border-blue-800 px-6 py-2.5 flex items-center justify-between text-xs text-blue-800 dark:text-blue-300">
            <div className="flex items-center gap-2 font-medium">
              <FileText className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{wordImportSuccess}</span>
            </div>
            <span className="text-[10px] bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded font-bold">Word .docx Ready</span>
          </div>
        )}

        {/* Quota & Warning Banner if applicable */}
        {validationError && (
          <div className="bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-800 px-6 py-2.5 flex items-center justify-between text-xs text-amber-800 dark:text-amber-300">
            <div className="flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{validationError}</span>
            </div>
            <button
              type="button"
              onClick={() => setValidationError(null)}
              className="text-amber-600 hover:text-amber-800 font-bold"
            >
              Dismiss
            </button>
          </div>
        )}

        {userTier === "free" && (
          <div className="bg-blue-50 dark:bg-blue-950/40 border-b border-blue-200 dark:border-blue-800 px-6 py-2 flex items-center justify-between text-xs text-blue-800 dark:text-blue-300">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
              <span>Free SME Profile: Article publishing is read-only. Upgrade to SME Pro to publish 4 analytical reports / month.</span>
            </div>
          </div>
        )}

        {/* Scrollable Canvas Body */}
        <div className="flex-1 overflow-y-auto px-6 md:px-14 py-8 bg-white dark:bg-[#0f172a]">
          <div className={`max-w-3xl mx-auto ${getFontClass()}`}>
            
            {/* Cover Image Area & Options */}
            {coverImage ? (
              <div className="mb-8 space-y-3">
                <div className="relative group rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 aspect-[21/9] shadow-md bg-slate-900">
                  <img
                    src={coverImage}
                    alt="Article Cover"
                    className={`w-full h-full object-cover transition-all ${
                      coverPosition === "top" ? "object-top" : coverPosition === "bottom" ? "object-bottom" : "object-center"
                    }`}
                  />
                  {/* Applied Overlay */}
                  <div
                    className={`absolute inset-0 pointer-events-none transition-all ${
                      coverOverlayStyle === "gradient"
                        ? "bg-gradient-to-t from-black/75 via-black/25 to-transparent"
                        : coverOverlayStyle === "dark"
                        ? "bg-black/45"
                        : coverOverlayStyle === "minimal"
                        ? "bg-black/15"
                        : "bg-transparent"
                    }`}
                  />

                  {/* Hover Controls */}
                  {!previewMode && (
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                      <button
                        type="button"
                        onClick={() => coverFileInputRef.current?.click()}
                        className="px-3.5 py-2 bg-white text-slate-900 rounded-xl text-xs font-bold shadow hover:bg-slate-100 flex items-center gap-1.5"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Change Photo</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setUnsplashModalOpen(true)}
                        className="px-3.5 py-2 bg-white/90 text-slate-900 rounded-xl text-xs font-bold shadow hover:bg-white flex items-center gap-1.5"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Stock Unsplash</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => setCoverImage("")}
                        className="p-2 bg-red-600 text-white rounded-xl hover:bg-red-700 shadow"
                        title="Remove Cover"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Cover Customization Toolbar */}
                {!previewMode && (
                  <div className="flex flex-wrap items-center justify-between gap-3 px-3 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">Alignment:</span>
                      {(["top", "center", "bottom"] as const).map((pos) => (
                        <button
                          key={pos}
                          type="button"
                          onClick={() => setCoverPosition(pos)}
                          className={`px-2 py-0.5 rounded capitalize text-[11px] font-medium transition-colors ${
                            coverPosition === pos
                              ? "bg-emerald-600 text-white font-bold"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                          }`}
                        >
                          {pos}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 dark:text-slate-400 font-semibold text-[11px]">Overlay:</span>
                      {(["none", "minimal", "gradient", "dark"] as const).map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setCoverOverlayStyle(st)}
                          className={`px-2 py-0.5 rounded capitalize text-[11px] font-medium transition-colors ${
                            coverOverlayStyle === st
                              ? "bg-emerald-600 text-white font-bold"
                              : "text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => setHasBackcover(!hasBackcover)}
                      className={`px-2.5 py-0.5 rounded text-[11px] font-bold border transition-colors ${
                        hasBackcover
                          ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400"
                          : "text-slate-500 border-slate-300 hover:text-slate-800"
                      }`}
                    >
                      {hasBackcover ? "✓ Backcover Enabled" : "+ Enable Backcover"}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="mb-6 flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => coverFileInputRef.current?.click()}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-dashed border-slate-300 dark:border-slate-700 transition-colors shadow-2xs"
                >
                  <Upload className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Upload Cover Photo</span>
                </button>
                <button
                  type="button"
                  onClick={() => setUnsplashModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-dashed border-slate-300 dark:border-slate-700 transition-colors shadow-2xs"
                >
                  <Camera className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Unsplash Stock Library</span>
                </button>
                <button
                  type="button"
                  onClick={() => setHasBackcover(!hasBackcover)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold border border-dashed transition-colors shadow-2xs ${
                    hasBackcover
                      ? "bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/40 dark:text-emerald-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 border-slate-300 dark:border-slate-700"
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>{hasBackcover ? "Executive Backcover On" : "Add Executive Backcover"}</span>
                </button>
              </div>
            )}

            {/* Title Input */}
            <input
              type="text"
              placeholder="Title of your analytical report..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              disabled={previewMode}
              className="w-full text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 bg-transparent border-0 focus:outline-none focus:ring-0 mb-3 tracking-tight"
            />

            {/* Subtitle / Lead Input */}
            <input
              type="text"
              placeholder="Add a captivating subtitle or executive thesis..."
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              disabled={previewMode}
              className="w-full text-lg md:text-xl font-normal text-slate-600 dark:text-slate-300 placeholder-slate-300 dark:placeholder-slate-600 bg-transparent border-0 focus:outline-none focus:ring-0 mb-8 leading-relaxed"
            />

            <hr className="border-slate-200 dark:border-slate-800 mb-8" />

            {/* Dynamic Blocks */}
            <div className="space-y-6">
              {blocks.map((block, index) => (
                <div key={block.id} className="relative group/block">
                  {/* Block Hover Actions (Up/Down/Delete) */}
                  {!previewMode && (
                    <div className="absolute -left-12 top-2 hidden group-hover/block:flex items-center flex-col gap-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg p-1 shadow-md z-10">
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "up")}
                        disabled={index === 0}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => moveBlock(index, "down")}
                        disabled={index === blocks.length - 1}
                        className="p-1 text-slate-400 hover:text-slate-700 dark:hover:text-white disabled:opacity-30"
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => deleteBlock(block.id)}
                        className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950/40 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Block Content Renderers */}
                  {block.type === "paragraph" && (
                    <textarea
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      disabled={previewMode}
                      placeholder="Write your analysis paragraph..."
                      rows={Math.max(2, Math.ceil((block.content?.length || 0) / 75))}
                      className="w-full text-base md:text-lg text-slate-800 dark:text-slate-200 placeholder-slate-300 dark:placeholder-slate-600 bg-transparent border-0 focus:outline-none focus:ring-0 resize-none leading-relaxed"
                    />
                  )}

                  {block.type === "heading" && (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        disabled={previewMode}
                        placeholder={block.level === 2 ? "Section Heading (H2)..." : "Sub-section (H3)..."}
                        className={`w-full font-bold text-slate-900 dark:text-white placeholder-slate-300 dark:placeholder-slate-600 bg-transparent border-0 focus:outline-none focus:ring-0 ${
                          block.level === 2 ? "text-2xl mt-4 mb-2" : "text-xl mt-2 mb-1"
                        }`}
                      />
                    </div>
                  )}

                  {block.type === "quote" && (
                    <div className="border-l-4 border-emerald-600 pl-4 py-2 my-4 bg-emerald-50/40 dark:bg-emerald-950/20 rounded-r-lg">
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        disabled={previewMode}
                        placeholder="Insert key executive quote or strategic takeaway..."
                        rows={2}
                        className="w-full text-lg italic text-slate-800 dark:text-slate-200 placeholder-slate-400 bg-transparent border-0 focus:outline-none resize-none"
                      />
                      <input
                        type="text"
                        value={block.authorQuote || ""}
                        onChange={(e) => updateBlock(block.id, { authorQuote: e.target.value })}
                        disabled={previewMode}
                        placeholder="— Quote attribution (e.g., IMF World Economic Outlook 2026)"
                        className="w-full text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-transparent border-0 focus:outline-none"
                      />
                    </div>
                  )}

                  {block.type === "image" && (
                    <div className="my-6">
                      <div className="relative group/img rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm">
                        <img src={block.url} alt={block.caption || "Embedded image"} className="w-full max-h-[500px] object-cover" />
                        {!previewMode && (
                          <div className="absolute top-3 right-3 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/70 backdrop-blur-sm p-1.5 rounded-xl">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveInsertIndex(index);
                                fileInputRef.current?.click();
                              }}
                              className="px-2.5 py-1 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 flex items-center gap-1"
                            >
                              <Upload className="w-3 h-3 text-emerald-600" />
                              <span>Replace</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteBlock(block.id)}
                              className="p-1.5 bg-red-600/80 text-white rounded-lg hover:bg-red-600"
                              title="Delete Photo"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={block.caption || ""}
                        onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                        disabled={previewMode}
                        placeholder="Type image caption / source attribution..."
                        className="w-full text-center text-xs text-slate-500 dark:text-slate-400 mt-2 bg-transparent border-0 focus:outline-none italic"
                      />
                    </div>
                  )}

                  {block.type === "video" && (
                    <div className="my-6">
                      <div className="relative group/vid rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 aspect-video bg-black flex items-center justify-center shadow-lg">
                        {block.url?.includes("youtube.com") || block.url?.includes("youtu.be") ? (
                          <iframe
                            src={block.url.replace("watch?v=", "embed/")}
                            title="Video Player"
                            className="w-full h-full"
                            allowFullScreen
                          />
                        ) : block.url?.includes("vimeo.com") ? (
                          <iframe
                            src={block.url.replace("vimeo.com/", "player.vimeo.com/video/")}
                            title="Vimeo Player"
                            className="w-full h-full"
                            allowFullScreen
                          />
                        ) : block.url ? (
                          <video
                            src={block.url}
                            controls
                            className="w-full h-full object-contain"
                            poster={coverImage || undefined}
                          />
                        ) : (
                          <div className="text-center p-6 text-slate-400">
                            <Play className="w-12 h-12 mx-auto mb-2 text-emerald-500" />
                            <p className="text-sm font-medium">No video source provided</p>
                          </div>
                        )}

                        {!previewMode && (
                          <div className="absolute top-3 right-3 opacity-0 group-hover/vid:opacity-100 transition-opacity flex items-center gap-1.5 bg-black/70 backdrop-blur-sm p-1.5 rounded-xl z-10">
                            <button
                              type="button"
                              onClick={() => {
                                setActiveInsertIndex(index);
                                videoFileInputRef.current?.click();
                              }}
                              className="px-2.5 py-1 bg-white text-slate-900 rounded-lg text-xs font-bold hover:bg-slate-100 flex items-center gap-1"
                            >
                              <Upload className="w-3 h-3 text-emerald-600" />
                              <span>Replace Video</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => deleteBlock(block.id)}
                              className="p-1.5 bg-red-600/80 text-white rounded-lg hover:bg-red-600"
                              title="Delete Video"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                      <input
                        type="text"
                        value={block.caption || ""}
                        onChange={(e) => updateBlock(block.id, { caption: e.target.value })}
                        disabled={previewMode}
                        placeholder="Type video description / source attribution..."
                        className="w-full text-center text-xs text-slate-500 dark:text-slate-400 mt-2 bg-transparent border-0 focus:outline-none italic"
                      />
                    </div>
                  )}

                  {block.type === "code" && (
                    <div className="my-6 rounded-xl overflow-hidden border border-slate-800 bg-[#0d1117] text-slate-200 font-mono text-sm">
                      <div className="flex items-center justify-between px-4 py-2 bg-[#161b22] border-b border-slate-800 text-xs">
                        <span className="text-slate-400 font-semibold">{block.language || "python"}</span>
                        <select
                          value={block.language || "python"}
                          onChange={(e) => updateBlock(block.id, { language: e.target.value })}
                          disabled={previewMode}
                          className="bg-transparent text-slate-300 text-xs border border-slate-700 rounded px-2 py-0.5"
                        >
                          <option value="python">Python</option>
                          <option value="typescript">TypeScript</option>
                          <option value="sql">SQL</option>
                          <option value="json">JSON</option>
                          <option value="rust">Rust</option>
                          <option value="go">Go</option>
                          <option value="bash">Bash</option>
                        </select>
                      </div>
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        disabled={previewMode}
                        placeholder="# Paste algorithm, financial calculation, or code sample here..."
                        rows={4}
                        className="w-full p-4 bg-transparent text-emerald-400 focus:outline-none font-mono text-xs resize-none"
                      />
                    </div>
                  )}

                  {block.type === "embed" && (
                    <div className="my-6 p-4 rounded-xl border border-dashed border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20">
                      <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 dark:text-emerald-400 mb-2">
                        <Code2 className="w-4 h-4" />
                        <span>Interactive Embed / Widget</span>
                      </div>
                      <textarea
                        value={block.content}
                        onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                        disabled={previewMode}
                        placeholder="<iframe src='...' width='100%' height='350'></iframe>"
                        rows={3}
                        className="w-full p-2 text-xs font-mono bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg focus:outline-none"
                      />
                    </div>
                  )}

                  {block.type === "divider" && (
                    <div className="my-10 flex items-center justify-center gap-2 text-slate-400 dark:text-slate-600">
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    </div>
                  )}

                  {/* Inline Block Insertion Trigger Bar (Green Circular Design matching Screenshot) */}
                  {!previewMode && (
                    <div className="my-4 flex items-center justify-center">
                      {activeInsertIndex === index ? (
                        <div className="flex items-center gap-3 p-2 bg-white dark:bg-slate-900 border border-emerald-500/40 rounded-full shadow-xl animate-in fade-in zoom-in-95 duration-200">
                          {/* 1. Image Upload */}
                          <button
                            type="button"
                            title="Upload Image"
                            onClick={() => {
                              setActiveInsertIndex(index);
                              fileInputRef.current?.click();
                            }}
                            className="w-10 h-10 rounded-full border-2 border-emerald-600 dark:border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:scale-110 transition-all shadow-sm"
                          >
                            <ImageIcon className="w-5 h-5" />
                          </button>

                          {/* 2. Unsplash Stock */}
                          <button
                            type="button"
                            title="Unsplash Stock Photo"
                            onClick={() => {
                              setActiveInsertIndex(index);
                              setUnsplashModalOpen(true);
                            }}
                            className="w-10 h-10 rounded-full border-2 border-emerald-600 dark:border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:scale-110 transition-all shadow-sm"
                          >
                            <Camera className="w-5 h-5" />
                          </button>

                          {/* 3. Video */}
                          <button
                            type="button"
                            title="Video Embed"
                            onClick={() => {
                              setActiveInsertIndex(index);
                              setVideoModalOpen(true);
                            }}
                            className="w-10 h-10 rounded-full border-2 border-emerald-600 dark:border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:scale-110 transition-all shadow-sm"
                          >
                            <Play className="w-5 h-5" />
                          </button>

                          {/* 4. Embed */}
                          <button
                            type="button"
                            title="Interactive Embed / Widget"
                            onClick={() => {
                              setActiveInsertIndex(index);
                              setEmbedModalOpen(true);
                            }}
                            className="w-10 h-10 rounded-full border-2 border-emerald-600 dark:border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:scale-110 transition-all shadow-sm"
                          >
                            <Code2 className="w-5 h-5" />
                          </button>

                          {/* 5. Code Block */}
                          <button
                            type="button"
                            title="Code Syntax Block"
                            onClick={() => addBlock("code", { language: "python" }, index)}
                            className="w-10 h-10 rounded-full border-2 border-emerald-600 dark:border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:scale-110 transition-all shadow-sm"
                          >
                            <Braces className="w-5 h-5" />
                          </button>

                          {/* 6. Section Divider */}
                          <button
                            type="button"
                            title="Section Divider"
                            onClick={() => addBlock("divider", {}, index)}
                            className="w-10 h-10 rounded-full border-2 border-emerald-600 dark:border-emerald-500 flex items-center justify-center text-emerald-600 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:scale-110 transition-all shadow-sm"
                          >
                            <Minus className="w-5 h-5" />
                          </button>

                          {/* Close bar */}
                          <button
                            type="button"
                            onClick={() => setActiveInsertIndex(null)}
                            className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 flex items-center justify-center ml-1"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="opacity-0 group-hover/block:opacity-100 transition-opacity flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setActiveInsertIndex(index)}
                            className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 text-xs font-semibold rounded-full hover:bg-emerald-100 transition-all"
                          >
                            <span>+ Insert Block</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("heading", { level: 2 }, index)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:bg-slate-200"
                          >
                            H2
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("quote", {}, index)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:bg-slate-200"
                          >
                            Quote
                          </button>
                          <button
                            type="button"
                            onClick={() => addBlock("paragraph", {}, index)}
                            className="px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs rounded-full hover:bg-slate-200"
                          >
                            Paragraph
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Bottom Append Trigger */}
            {!previewMode && (
              <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => addBlock("paragraph", {})}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs font-semibold border border-transparent hover:border-emerald-500/30 transition-all"
                >
                  + Add Paragraph
                </button>
                <button
                  type="button"
                  onClick={() => addBlock("heading", { level: 2 })}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-slate-700 dark:text-slate-300 hover:text-emerald-600 text-xs font-semibold border border-transparent hover:border-emerald-500/30 transition-all"
                >
                  + Add Section H2
                </button>
                <button
                  type="button"
                  onClick={() => setActiveInsertIndex(blocks.length - 1)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white text-xs font-semibold shadow hover:bg-emerald-700 transition-all"
                >
                  + Open Media Inserter
                </button>
              </div>
            )}

            {/* Executive Closing Backcover & Endsheet */}
            <div className="mt-14 pt-8 border-t-2 border-dashed border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold text-xs">
                    BC
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      Executive Backcover & Institutional Endsheet
                      {hasBackcover && (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold border border-emerald-300 dark:border-emerald-800">
                          Active Endsheet
                        </span>
                      )}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Official closing dossier with verified institutional seal, attached downloadable reports, and author sign-off.
                    </p>
                  </div>
                </div>

                {!previewMode && (
                  <button
                    type="button"
                    onClick={() => setHasBackcover(!hasBackcover)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border ${
                      hasBackcover
                        ? "bg-red-50 dark:bg-red-950/40 text-red-600 border-red-200 dark:border-red-800 hover:bg-red-100"
                        : "bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700 shadow-sm"
                    }`}
                  >
                    {hasBackcover ? "Remove Backcover" : "+ Enable Backcover"}
                  </button>
                )}
              </div>

              {hasBackcover && (
                <div className="relative rounded-2xl overflow-hidden border border-slate-300 dark:border-slate-700 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white p-6 md:p-8 shadow-2xl">
                  {backcoverImage && (
                    <img
                      src={backcoverImage}
                      alt="Backcover Background"
                      className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-overlay"
                    />
                  )}
                  <div className="relative z-10 space-y-5">
                    <div className="flex items-center justify-between border-b border-white/15 pb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center font-black text-emerald-400 border border-white/20 shadow-inner">
                          IGE
                        </div>
                        <div>
                          <p className="text-xs font-bold tracking-widest text-white/95 uppercase">
                            IGE News • Institutional Dossier
                          </p>
                          <p className="text-[10px] text-white/60">Verified Strategic Research & Advisory</p>
                        </div>
                      </div>

                      {!previewMode && (
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => backcoverFileInputRef.current?.click()}
                            className="px-2.5 py-1 bg-white/15 hover:bg-white/25 rounded-lg text-[11px] font-medium transition-colors"
                          >
                            {backcoverImage ? "Change Backcover BG" : "Upload Backcover Photo"}
                          </button>
                          {backcoverImage && (
                            <button
                              type="button"
                              onClick={() => setBackcoverImage("")}
                              className="p-1 bg-red-500/30 hover:bg-red-500/50 rounded-lg text-red-300 text-[11px]"
                              title="Remove BG"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1.5">
                        Closing Executive Memorandum & Sign-off
                      </p>
                      {previewMode ? (
                        <p className="text-xs text-white/85 leading-relaxed font-serif italic">
                          "{backcoverText}"
                        </p>
                      ) : (
                        <textarea
                          value={backcoverText}
                          onChange={(e) => setBackcoverText(e.target.value)}
                          rows={3}
                          placeholder="Type backcover closing thesis, methodology note, or copyright statement..."
                          className="w-full bg-white/10 border border-white/20 rounded-xl p-3 text-xs text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-emerald-400 resize-none"
                        />
                      )}
                    </div>

                    {/* Attached Resources Display on Backcover */}
                    {(pdfAttachment || wordAttachment) && (
                      <div className="pt-2">
                        <p className="text-[11px] font-semibold text-white/70 uppercase tracking-wider mb-2">
                          Attached Institutional Downloads:
                        </p>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {pdfAttachment && (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <Paperclip className="w-4 h-4 text-emerald-400 shrink-0" />
                                <div className="truncate">
                                  <p className="text-xs font-semibold text-white truncate">{pdfAttachment.name}</p>
                                  <p className="text-[10px] text-white/60">PDF Whitepaper • {pdfAttachment.size}</p>
                                </div>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-bold shrink-0">
                                PDF
                              </span>
                            </div>
                          )}
                          {wordAttachment && (
                            <div className="flex items-center justify-between p-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-sm">
                              <div className="flex items-center gap-2.5 overflow-hidden">
                                <FileText className="w-4 h-4 text-blue-400 shrink-0" />
                                <div className="truncate">
                                  <p className="text-xs font-semibold text-white truncate">{wordAttachment.name}</p>
                                  <p className="text-[10px] text-white/60">Word Report • {wordAttachment.size}</p>
                                </div>
                              </div>
                              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-bold shrink-0">
                                DOCX
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Drawer: Sector Tags, Word Document & PDF Attachments */}
        <div className="px-6 py-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-[#131d33] flex flex-wrap items-center justify-between gap-4 shrink-0">
          {/* Sector Tags Selector */}
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <Tag className="w-3.5 h-3.5 text-emerald-600" />
              <span>Sectors ({selectedTags.length}/{quota.maxTags}):</span>
            </div>
            {selectedTags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-950/50 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800"
              >
                {tag}
                {!previewMode && (
                  <button type="button" onClick={() => toggleTag(tag)} className="hover:text-red-500">
                    <X className="w-3 h-3" />
                  </button>
                )}
              </span>
            ))}
            {!previewMode && (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setTagDropdownOpen(!tagDropdownOpen)}
                  className="text-xs text-emerald-600 hover:text-emerald-700 font-semibold px-2 py-0.5 rounded border border-dashed border-emerald-400 dark:border-emerald-600"
                >
                  + Add Tag
                </button>
                {tagDropdownOpen && (
                  <div className="absolute bottom-full left-0 mb-2 w-56 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-200 dark:border-slate-800 p-2 max-h-48 overflow-y-auto z-30">
                    {AVAILABLE_SECTOR_TAGS.map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => {
                          toggleTag(t);
                          setTagDropdownOpen(false);
                        }}
                        className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                          selectedTags.includes(t)
                            ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300"
                            : "text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                        }`}
                      >
                        {t} {selectedTags.includes(t) && "✓"}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Institutional Attachments: PDF Whitepaper & Word Document */}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Word Document Attachment */}
            {quota.allowWord ? (
              wordAttachment ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-blue-200 dark:border-blue-800 rounded-lg text-xs shadow-2xs">
                  <FileText className="w-3.5 h-3.5 text-blue-600" />
                  <span className="font-semibold text-slate-800 dark:text-slate-100 max-w-[130px] truncate">{wordAttachment.name}</span>
                  <span className="text-slate-400 text-[10px]">({wordAttachment.size})</span>
                  {!previewMode && (
                    <button type="button" onClick={() => setWordAttachment(undefined)} className="text-red-500 hover:text-red-700 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ) : (
                !previewMode && (
                  <button
                    type="button"
                    onClick={() => wordInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 hover:bg-blue-50 transition-colors shadow-2xs"
                  >
                    <FileText className="w-3.5 h-3.5 text-blue-600" />
                    <span>Attach Word (.docx)</span>
                  </button>
                )
              )
            ) : (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>Word: Pro+</span>
              </span>
            )}

            {/* PDF Attachment */}
            {quota.allowPdf ? (
              pdfAttachment ? (
                <div className="flex items-center gap-2 px-3 py-1 bg-white dark:bg-slate-900 border border-emerald-200 dark:border-emerald-800 rounded-lg text-xs shadow-2xs">
                  <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="font-semibold text-slate-800 dark:text-slate-100 max-w-[130px] truncate">{pdfAttachment.name}</span>
                  <span className="text-slate-400 text-[10px]">({pdfAttachment.size})</span>
                  {!previewMode && (
                    <button type="button" onClick={() => setPdfAttachment(undefined)} className="text-red-500 hover:text-red-700 ml-1">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              ) : (
                !previewMode && (
                  <button
                    type="button"
                    onClick={() => pdfInputRef.current?.click()}
                    className="flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-white dark:bg-slate-800 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 transition-colors shadow-2xs"
                  >
                    <Paperclip className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Attach PDF Report</span>
                  </button>
                )
              )
            ) : (
              <span className="text-[11px] text-slate-400 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                <span>PDF: Pro+</span>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Unsplash Stock Photos Modal */}
      {unsplashModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Camera className="w-5 h-5 text-emerald-600" />
                <span>Select Editorial Stock Photo (Unsplash)</span>
              </h3>
              <button type="button" onClick={() => setUnsplashModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative mb-4">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={unsplashSearch}
                onChange={(e) => setUnsplashSearch(e.target.value)}
                placeholder="Search market, technology, macroeconomics..."
                className="w-full pl-9 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-80 overflow-y-auto">
              {STOCK_UNSPLASH_IMAGES.filter((img) =>
                img.title.toLowerCase().includes(unsplashSearch.toLowerCase())
              ).map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    if (!coverImage) {
                      setCoverImage(img.url);
                    } else {
                      addBlock("image", { url: img.url, caption: `${img.title} — Photo by ${img.author}` }, activeInsertIndex ?? undefined);
                    }
                    setUnsplashModalOpen(false);
                  }}
                  className="group relative rounded-xl overflow-hidden cursor-pointer border border-slate-200 dark:border-slate-800 aspect-video hover:ring-2 hover:ring-emerald-500 transition-all"
                >
                  <img src={img.url} alt={img.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end">
                    <p className="text-[11px] font-semibold text-white truncate">{img.title}</p>
                    <p className="text-[9px] text-slate-300">By {img.author}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Upload & Embed Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Play className="w-5 h-5 text-emerald-600" />
                <span>Add Video to Report</span>
              </h3>
              <button type="button" onClick={() => setVideoModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Tabs: Upload File vs Web Embed */}
            <div className="flex items-center border-b border-slate-200 dark:border-slate-800 mb-4">
              <button
                type="button"
                onClick={() => setVideoModalTab("upload")}
                className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  videoModalTab === "upload"
                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Video File</span>
              </button>
              <button
                type="button"
                onClick={() => setVideoModalTab("url")}
                className={`flex-1 py-2 text-xs font-bold border-b-2 transition-colors flex items-center justify-center gap-1.5 ${
                  videoModalTab === "url"
                    ? "border-emerald-600 text-emerald-600 dark:text-emerald-400"
                    : "border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"
                }`}
              >
                <Link2 className="w-3.5 h-3.5" />
                <span>Embed URL (YouTube/Vimeo)</span>
              </button>
            </div>

            {videoModalTab === "upload" ? (
              <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-2xl p-6 text-center hover:border-emerald-500 transition-colors bg-slate-50/50 dark:bg-slate-800/30">
                <Play className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                  Upload MP4, WebM, MOV Video
                </p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mb-4">
                  Videos play directly inside the report with full playback controls.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setVideoModalOpen(false);
                    videoFileInputRef.current?.click();
                  }}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-all shadow-md flex items-center gap-2 mx-auto"
                >
                  <Upload className="w-4 h-4" />
                  <span>Choose Video File from Device</span>
                </button>
              </div>
            ) : (
              <div>
                <p className="text-xs text-slate-500 mb-2">Paste YouTube, Vimeo, or direct MP4 link:</p>
                <input
                  type="text"
                  value={videoUrlInput}
                  onChange={(e) => setVideoUrlInput(e.target.value)}
                  placeholder="https://www.youtube.com/watch?v=..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
                />
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setVideoModalOpen(false)}
                    className="px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      if (videoUrlInput.trim()) {
                        addBlock("video", { url: videoUrlInput.trim() }, activeInsertIndex ?? undefined);
                        setVideoUrlInput("");
                        setVideoModalOpen(false);
                      }
                    }}
                    className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Insert Video
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Interactive Embed Modal */}
      {embedModalOpen && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/60 p-4">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Code2 className="w-5 h-5 text-emerald-600" />
                <span>Insert HTML / Interactive Widget</span>
              </h3>
              <button type="button" onClick={() => setEmbedModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <p className="text-xs text-slate-500 mb-3">Paste iframe embed code, live charts, or financial widget HTML:</p>
            <textarea
              value={embedHtmlInput}
              onChange={(e) => setEmbedHtmlInput(e.target.value)}
              placeholder="<iframe src='...' ...></iframe>"
              rows={4}
              className="w-full p-3 font-mono text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 mb-4"
            />
            <div className="flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setEmbedModalOpen(false)}
                className="px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (embedHtmlInput.trim()) {
                    addBlock("embed", { content: embedHtmlInput.trim() }, activeInsertIndex ?? undefined);
                    setEmbedHtmlInput("");
                    setEmbedModalOpen(false);
                  }
                }}
                className="px-4 py-1.5 rounded-lg text-xs font-semibold bg-emerald-600 text-white hover:bg-emerald-700"
              >
                Insert Embed
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RichArticleEditor;
