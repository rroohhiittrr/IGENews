"use client";

import { useState, useRef, useEffect } from "react";
import { Heart, CornerDownRight, Send, X, ChevronDown, ChevronUp } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Reply {
  id: string;
  author: string;
  avatar: string;        // initials
  avatarColor: string;
  time: string;
  text: string;
  likes: number;
  isLiked: boolean;
}

interface Comment {
  id: string;
  author: string;
  avatar: string;        // initials
  avatarColor: string;
  badge?: string;
  time: string;
  text: string;
  likes: number;
  isLiked: boolean;
  replies: Reply[];
}

// ─── Static mock seed comments (different per article via slug) ───────────────
const SEED_COMMENTS: Omit<Comment, "id">[] = [
  {
    author: "Arjun Mehta",
    avatar: "AM",
    avatarColor: "bg-blue-500",
    badge: "Analyst",
    time: "2h ago",
    text: "This is a major milestone. The downstream effect on SME exporters alone could be massive. 🚀",
    likes: 47,
    isLiked: false,
    replies: [
      {
        id: "r1",
        author: "Priya Nair",
        avatar: "PN",
        avatarColor: "bg-purple-500",
        time: "1h ago",
        text: "Completely agree — SMEs were underprepared last time but the ecosystem has matured a lot since.",
        likes: 12,
        isLiked: false,
      },
      {
        id: "r2",
        author: "Vikram S.",
        avatar: "VS",
        avatarColor: "bg-green-500",
        time: "45m ago",
        text: "What about the logistics bottleneck? That's the real killer for small players.",
        likes: 8,
        isLiked: false,
      },
    ],
  },
  {
    author: "Sneha Kapoor",
    avatar: "SK",
    avatarColor: "bg-pink-500",
    time: "4h ago",
    text: "Finally some good news for the sector. Been waiting for this announcement for months. The numbers look right this time.",
    likes: 31,
    isLiked: false,
    replies: [
      {
        id: "r3",
        author: "Rohit D.",
        avatar: "RD",
        avatarColor: "bg-orange-500",
        time: "3h ago",
        text: "Don't celebrate too early — implementation is where India usually stumbles.",
        likes: 19,
        isLiked: false,
      },
    ],
  },
  {
    author: "Karan Joshi",
    avatar: "KJ",
    avatarColor: "bg-teal-500",
    badge: "Trade Expert",
    time: "6h ago",
    text: "I've been tracking this space for 8 years. This deal structure is different from the 2018 attempt — much stronger compliance framework this time.",
    likes: 63,
    isLiked: false,
    replies: [],
  },
  {
    author: "Meera Iyer",
    avatar: "MI",
    avatarColor: "bg-indigo-500",
    time: "8h ago",
    text: "Great reporting as always from IGN. Would love a follow-up piece on the regulatory implications.",
    likes: 22,
    isLiked: false,
    replies: [],
  },
  {
    author: "Dev Sharma",
    avatar: "DS",
    avatarColor: "bg-red-400",
    time: "10h ago",
    text: "Numbers sound impressive but context is important. Let's see how this compares to last year's projections before getting too excited.",
    likes: 15,
    isLiked: false,
    replies: [
      {
        id: "r4",
        author: "Anita Roy",
        avatar: "AR",
        avatarColor: "bg-yellow-500",
        time: "9h ago",
        text: "Fair point. The base effect is worth noting here.",
        likes: 6,
        isLiked: false,
      },
    ],
  },
];

// ─── Generate deterministic comments from slug ────────────────────────────────
function slugHash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}
function makeComments(articleSlug: string, totalCount: number): Comment[] {
  const h = slugHash(articleSlug);
  const count = Math.min(Math.max(2, (h % 3) + 2), totalCount, SEED_COMMENTS.length);
  return SEED_COMMENTS.slice(0, count).map((c, i) => ({ ...c, id: `${articleSlug}-c${i}` }));
}

// ─── Avatar circle ────────────────────────────────────────────────────────────
function Avatar({ initials, color, size = "md" }: { initials: string; color: string; size?: "sm" | "md" }) {
  const sz = size === "sm" ? "h-7 w-7 text-[10px]" : "h-8 w-8 text-xs";
  return (
    <div className={`${sz} ${color} shrink-0 rounded-full flex items-center justify-center font-bold text-white`}>
      {initials}
    </div>
  );
}

// ─── Single reply ─────────────────────────────────────────────────────────────
function ReplyItem({ reply }: { reply: Reply }) {
  const [liked, setLiked] = useState(reply.isLiked);
  const [likes, setLikes] = useState(reply.likes);
  return (
    <div className="flex gap-2 mt-2">
      <Avatar initials={reply.avatar} color={reply.avatarColor} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="bg-[var(--color-neutral-light)] rounded-xl rounded-tl-none px-3 py-2">
          <p className="text-[11px] font-semibold text-[var(--color-text-body)]">{reply.author}</p>
          <p className="text-xs text-[var(--color-neutral-dark)] mt-0.5 leading-relaxed">{reply.text}</p>
        </div>
        <div className="flex items-center gap-3 mt-1 px-1">
          <span className="text-[10px] text-[var(--color-neutral-mid)]">{reply.time}</span>
          <button
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            className={`flex items-center gap-0.5 text-[10px] font-medium transition-colors ${liked ? "text-red-500" : "text-[var(--color-neutral-mid)] hover:text-red-400"}`}
          >
            <Heart className={`h-3 w-3 ${liked ? "fill-red-500" : ""}`} />
            {likes > 0 && likes}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Single comment ───────────────────────────────────────────────────────────
function CommentItem({
  comment,
  onReply,
}: {
  comment: Comment;
  onReply: (id: string, author: string) => void;
}) {
  const [liked, setLiked] = useState(comment.isLiked);
  const [likes, setLikes] = useState(comment.likes);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <div className="flex gap-2.5">
      <Avatar initials={comment.avatar} color={comment.avatarColor} />
      <div className="flex-1 min-w-0">
        {/* Bubble */}
        <div className="bg-[var(--color-neutral-light)] rounded-xl rounded-tl-none px-3 py-2.5">
          <div className="flex items-center gap-1.5 flex-wrap">
            <p className="text-xs font-semibold text-[var(--color-text-body)]">{comment.author}</p>
            {comment.badge && (
              <span className="rounded-full bg-[var(--color-primary)] px-1.5 py-0 text-[9px] font-bold text-white">
                {comment.badge}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--color-neutral-dark)] mt-1 leading-relaxed">{comment.text}</p>
        </div>

        {/* Meta row */}
        <div className="flex items-center gap-3 mt-1.5 px-1">
          <span className="text-[10px] text-[var(--color-neutral-mid)]">{comment.time}</span>
          <button
            onClick={() => { setLiked(!liked); setLikes(liked ? likes - 1 : likes + 1); }}
            className={`flex items-center gap-1 text-[10px] font-medium transition-colors ${liked ? "text-red-500" : "text-[var(--color-neutral-mid)] hover:text-red-400"}`}
          >
            <Heart className={`h-3 w-3 ${liked ? "fill-red-500" : ""}`} />
            {likes > 0 ? `${likes} Like${likes !== 1 ? "s" : ""}` : "Like"}
          </button>
          <button
            onClick={() => onReply(comment.id, comment.author)}
            className="flex items-center gap-1 text-[10px] font-medium text-[var(--color-neutral-mid)] hover:text-[var(--color-primary)] transition-colors"
          >
            <CornerDownRight className="h-3 w-3" />
            Reply
          </button>
          {comment.replies.length > 0 && (
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-0.5 text-[10px] font-medium text-[var(--color-primary)] hover:underline ml-auto"
            >
              {showReplies ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              {showReplies ? "Hide" : `${comment.replies.length}`} {showReplies ? "replies" : comment.replies.length === 1 ? "reply" : "replies"}
            </button>
          )}
        </div>

        {/* Replies */}
        {showReplies && comment.replies.length > 0 && (
          <div className="mt-1 pl-2 border-l-2 border-[var(--color-neutral-light)]">
            {comment.replies.map((r) => <ReplyItem key={r.id} reply={r} />)}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────
interface CommentPanelProps {
  articleSlug: string;
  totalCount: number;
  label: string;
  onClose: () => void;
}

export default function CommentPanel({ articleSlug, totalCount, label, onClose }: CommentPanelProps) {
  const [comments, setComments] = useState<Comment[]>(() => makeComments(articleSlug, totalCount));
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState<{ id: string; author: string } | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  // Focus textarea when panel opens or reply is triggered
  useEffect(() => { textareaRef.current?.focus(); }, [replyTo]);

  const handleReply = (id: string, author: string) => {
    setReplyTo({ id, author });
    textareaRef.current?.focus();
  };

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed) return;

    if (replyTo) {
      // Add reply to the target comment
      setComments((prev) =>
        prev.map((c) =>
          c.id === replyTo.id
            ? {
                ...c,
                replies: [
                  ...c.replies,
                  {
                    id: `reply-${Date.now()}`,
                    author: "You",
                    avatar: "YO",
                    avatarColor: "bg-[var(--color-primary)]",
                    time: "Just now",
                    text: trimmed,
                    likes: 0,
                    isLiked: false,
                  },
                ],
              }
            : c
        )
      );
      setReplyTo(null);
    } else {
      // New top-level comment
      setComments((prev) => [
        {
          id: `new-${Date.now()}`,
          author: "You",
          avatar: "YO",
          avatarColor: "bg-[var(--color-primary)]",
          time: "Just now",
          text: trimmed,
          likes: 0,
          isLiked: false,
          replies: [],
        },
        ...prev,
      ]);
    }
    setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  return (
    <div
      ref={panelRef}
      className="mt-3 rounded-xl border border-[var(--color-neutral-light)] bg-[rgba(248,249,252,0.95)] overflow-hidden"
      style={{ animation: "slideDown 0.2s ease" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-[var(--color-neutral-light)] bg-white">
        <p className="text-xs font-semibold text-[var(--color-text-body)]">
          💬 {label} · {comments.length + totalCount - Math.min(5, totalCount)} responses
        </p>
        <button
          onClick={onClose}
          className="rounded-full p-1 text-[var(--color-neutral-mid)] hover:bg-[var(--color-neutral-light)] transition-colors"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Composer */}
      <div className="px-3 py-3 border-b border-[var(--color-neutral-light)] bg-white">
        {replyTo && (
          <div className="flex items-center gap-1.5 mb-2 px-2 py-1 bg-blue-50 rounded-lg text-xs text-blue-600">
            <CornerDownRight className="h-3 w-3 shrink-0" />
            <span>Replying to <strong>{replyTo.author}</strong></span>
            <button onClick={() => setReplyTo(null)} className="ml-auto hover:text-blue-900">
              <X className="h-3 w-3" />
            </button>
          </div>
        )}
        <div className="flex gap-2 items-end">
          <div className="h-8 w-8 shrink-0 rounded-full bg-[var(--color-primary)] flex items-center justify-center font-bold text-white text-[10px]">
            YO
          </div>
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={replyTo ? `Reply to ${replyTo.author}...` : "Share your thoughts... (⌘+Enter to send)"}
              rows={2}
              className="w-full resize-none rounded-xl border border-[var(--color-neutral-light)] bg-[var(--color-neutral-light)] px-3 py-2 text-xs text-[var(--color-text-body)] placeholder:text-[var(--color-neutral-mid)] focus:outline-none focus:border-[var(--color-primary)] focus:bg-white transition-all"
            />
          </div>
          <button
            onClick={handleSubmit}
            disabled={!text.trim()}
            className="shrink-0 flex items-center justify-center h-8 w-8 rounded-full bg-[var(--color-primary)] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-primary-dark)] transition-all"
          >
            <Send className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Comment list */}
      <div className="px-3 py-3 flex flex-col gap-4 max-h-80 overflow-y-auto">
        {comments.length === 0 && (
          <p className="text-center text-xs text-[var(--color-neutral-mid)] py-4">
            No comments yet. Start the conversation!
          </p>
        )}
        {comments.map((c) => (
          <CommentItem key={c.id} comment={c} onReply={handleReply} />
        ))}
      </div>

      {/* Load more hint */}
      {totalCount > comments.length && (
        <div className="px-4 py-2 border-t border-[var(--color-neutral-light)] text-center">
          <button className="text-[11px] font-medium text-[var(--color-primary)] hover:underline">
            View all {totalCount} responses
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
