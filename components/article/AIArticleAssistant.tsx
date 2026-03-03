"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, Loader2, ChevronDown, ChevronUp, Bot, Zap } from "lucide-react";
import { Article } from "@/types/types";

interface AIArticleAssistantProps {
  article: Article;
}

type QuickAction = "summarize" | "keypoints" | "perspective" | "custom";

interface Message {
  role: "user" | "ai";
  text: string;
}

// ── Generate mock AI responses from article content ─────────────────────────
function generateSummary(article: Article): string {
  return `📋 **Summary of this article:**\n\n${article.summary}\n\nThis report highlights significant developments in the ${article.sector?.name ?? "trade"} sector${article.country ? ` involving ${article.country.pairName}` : ""}. Published by ${article.sourceName}${article.authorName ? ` and authored by ${article.authorName}` : ""}, the article covers a ${article.readTime}-minute read worth of in-depth analysis.`;
}

function generateKeyPoints(article: Article): string {
  const tags = article.tags.slice(0, 4).map((t) => `• **${t}**`).join("\n");
  return `🔑 **Key Takeaways:**\n\n${tags}\n\n• The article spans ${article.readTime} minutes of reading\n• ${article.isTrending ? "This is a **trending** story right now" : "An important development worth tracking"}\n• Source: **${article.sourceName}**\n• Published: **${new Date(article.publishedAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}**`;
}

function generatePerspective(article: Article): string {
  return `🌐 **Broader Context:**\n\nThis story is part of a larger narrative around India's ${article.sector?.name ?? "trade"} landscape. With ${article.likeCount.toLocaleString()} likes and ${article.commentCount} community responses, the topic is generating significant engagement among trade professionals and policymakers.\n\nAnalysts are watching this closely given the ${article.isTrending ? "trending momentum" : "strategic implications"} it carries for bilateral trade flows and sectoral investment pipelines.`;
}

function simulateTyping(
  text: string,
  onChunk: (chunk: string) => void,
  onDone: () => void
) {
  const words = text.split(" ");
  let i = 0;
  const interval = setInterval(() => {
    if (i < words.length) {
      onChunk(words.slice(0, i + 1).join(" "));
      i++;
    } else {
      clearInterval(interval);
      onDone();
    }
  }, 35);
  return () => clearInterval(interval);
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function AIArticleAssistant({ article }: AIArticleAssistantProps) {
  const [expanded, setExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [typingText, setTypingText] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (expanded && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [messages, typingText, expanded]);

  function sendMessage(text: string, quick?: QuickAction) {
    if (isTyping) return;
    const userMsg: Message = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");
    setIsTyping(true);
    setTypingText("");

    let response = "";
    if (quick === "summarize") response = generateSummary(article);
    else if (quick === "keypoints") response = generateKeyPoints(article);
    else if (quick === "perspective") response = generatePerspective(article);
    else
      response = `🤖 Based on this article about **${article.title.substring(0, 60)}...**\n\nYour question "${text}" touches on an important dimension of this story. The ${article.sourceName} report highlights that this development has implications across the ${article.sector?.name ?? "trade"} sector. For deeper analysis, consider tracking related articles using the tags above. *(AI responses are illustrative — real-time data integration coming soon.)*`;

    simulateTyping(
      response,
      (chunk) => setTypingText(chunk),
      () => {
        setMessages((prev) => [...prev, { role: "ai", text: response }]);
        setTypingText("");
        setIsTyping(false);
      }
    );
  }

  const QUICK_ACTIONS = [
    { id: "summarize" as QuickAction, label: "Summarise Article", icon: "📋" },
    { id: "keypoints" as QuickAction, label: "Key Takeaways", icon: "🔑" },
    { id: "perspective" as QuickAction, label: "Broader Context", icon: "🌐" },
  ];

  return (
    <div className="my-6 rounded-2xl border border-[var(--color-primary)]/20 bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/20 shadow-sm overflow-hidden">
      {/* Header bar — always visible */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left transition-colors hover:bg-white/50"
      >
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600 shadow-md">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-[var(--color-primary)] uppercase tracking-wider">IGN AI Assistant</p>
          <p className="text-[11px] text-[var(--color-neutral-dark)]">Ask questions · Summarise · Get context</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-1 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse" />
            Live
          </span>
          {expanded ? (
            <ChevronUp className="h-4 w-4 text-[var(--color-neutral-mid)]" />
          ) : (
            <ChevronDown className="h-4 w-4 text-[var(--color-neutral-mid)]" />
          )}
        </div>
      </button>

      {/* Expanded chat area */}
      {expanded && (
        <div className="border-t border-[var(--color-primary)]/10">
          {/* Quick action chips */}
          {messages.length === 0 && (
            <div className="px-4 pt-3 pb-2">
              <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-[var(--color-neutral-mid)]">
                Quick Actions
              </p>
              <div className="flex flex-wrap gap-2">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action.id}
                    onClick={() => sendMessage(action.label, action.id)}
                    disabled={isTyping}
                    className="flex items-center gap-1.5 rounded-full border border-[var(--color-primary)]/30 bg-white px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)] shadow-sm transition-all hover:bg-[var(--color-primary)] hover:text-white hover:shadow-md disabled:opacity-40"
                  >
                    <span>{action.icon}</span>
                    {action.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message thread */}
          {(messages.length > 0 || isTyping) && (
            <div className="px-4 pt-3 space-y-3 max-h-72 overflow-y-auto">
              {messages.map((msg, i) => (
                <MessageBubble key={i} message={msg} />
              ))}

              {/* Typing indicator / streaming */}
              {isTyping && (
                <div className="flex gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600">
                    <Bot className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="flex-1 rounded-2xl rounded-tl-none bg-white border border-[var(--color-neutral-light)] px-3 py-2.5 shadow-sm">
                    {typingText ? (
                      <MarkdownText text={typingText} />
                    ) : (
                      <div className="flex items-center gap-1.5 py-1">
                        <Loader2 className="h-3.5 w-3.5 animate-spin text-[var(--color-primary)]" />
                        <span className="text-xs text-[var(--color-neutral-mid)] italic">Analysing article…</span>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
          )}

          {/* Reset when messages exist */}
          {messages.length > 0 && (
            <div className="px-4 pt-1 pb-0 flex flex-wrap gap-1.5">
              {QUICK_ACTIONS.map((action) => (
                <button
                  key={action.id}
                  onClick={() => sendMessage(action.label, action.id)}
                  disabled={isTyping}
                  className="flex items-center gap-1 rounded-full border border-[var(--color-primary)]/20 bg-white/70 px-2.5 py-1 text-[10px] font-semibold text-[var(--color-primary)] transition-all hover:bg-[var(--color-primary)] hover:text-white disabled:opacity-40"
                >
                  <span>{action.icon}</span>
                  {action.label}
                </button>
              ))}
            </div>
          )}

          {/* Custom question input */}
          <div className="px-4 py-3 flex items-center gap-2">
            <div className="flex-1 flex items-center gap-2 rounded-xl border border-[var(--color-primary)]/20 bg-white px-3 py-2 shadow-sm focus-within:border-[var(--color-primary)] transition-colors">
              <Zap className="h-3.5 w-3.5 shrink-0 text-[var(--color-primary)]" />
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && inputText.trim() && !isTyping) {
                    sendMessage(inputText.trim());
                  }
                }}
                placeholder="Ask anything about this article…"
                className="flex-1 bg-transparent text-xs text-[var(--color-text-body)] placeholder:text-[var(--color-neutral-mid)] focus:outline-none"
                disabled={isTyping}
              />
            </div>
            <button
              onClick={() => inputText.trim() && !isTyping && sendMessage(inputText.trim())}
              disabled={!inputText.trim() || isTyping}
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600 text-white shadow-md transition-all hover:shadow-lg disabled:opacity-30"
            >
              <Send className="h-3.5 w-3.5" />
            </button>
          </div>

          {/* Footer */}
          <div className="px-4 pb-2 text-center">
            <p className="text-[9px] text-[var(--color-neutral-mid)]">
              IGN AI · Powered by editorial intelligence · Responses are illustrative
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ── Message Bubble ────────────────────────────────────────────────────────────
function MessageBubble({ message }: { message: Message }) {
  if (message.role === "user") {
    return (
      <div className="flex justify-end">
        <div className="max-w-[80%] rounded-2xl rounded-tr-none bg-[var(--color-primary)] px-3 py-2 shadow-sm">
          <p className="text-xs text-white leading-relaxed">{message.text}</p>
        </div>
      </div>
    );
  }
  return (
    <div className="flex gap-2.5">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[var(--color-primary)] to-purple-600">
        <Bot className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="flex-1 rounded-2xl rounded-tl-none bg-white border border-[var(--color-neutral-light)] px-3 py-2.5 shadow-sm">
        <MarkdownText text={message.text} />
      </div>
    </div>
  );
}

// ── Simple inline markdown renderer ──────────────────────────────────────────
function MarkdownText({ text }: { text: string }) {
  const lines = text.split("\n").filter(Boolean);
  return (
    <div className="space-y-1">
      {lines.map((line, i) => {
        // Bold: **text**
        const withBold = line.replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-[var(--color-text-body)]">$1</strong>');
        return (
          <p
            key={i}
            className="text-xs text-[var(--color-neutral-dark)] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: withBold }}
          />
        );
      })}
    </div>
  );
}
