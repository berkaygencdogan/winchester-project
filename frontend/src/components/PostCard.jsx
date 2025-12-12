import { MessageCircle, Share2 } from "lucide-react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useState } from "react";

export default function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments);

  return (
    <div
      className="
  p-4 rounded-xl space-y-4
  bg-white border border-slate-200
  dark:bg-[#1E293B] dark:border-gray-700
"
    >
      {/* MAÇ BÖLÜMÜ */}
      <div
        className="
  p-4 rounded-lg
  bg-slate-100
  dark:bg-[#0F172A]
"
      >
        <div className="text-sm opacity-70">{post.match.league}</div>
        <div className="text-lg font-semibold">
          {post.match.homeTeam} vs {post.match.awayTeam}
        </div>

        <div className="flex gap-3 mt-3">
          <span
            className="
  p-2 rounded-lg
  bg-white border border-slate-200
  dark:bg-[#1E293B] dark:border-gray-700
"
          >
            1: {post.match.odds.home}
          </span>
          <span
            className="
  p-2 rounded-lg
  bg-white border border-slate-200
  dark:bg-[#1E293B] dark:border-gray-700
"
          >
            X: {post.match.odds.draw}
          </span>
          <span
            className="
  p-2 rounded-lg
  bg-white border border-slate-200
  dark:bg-[#1E293B] dark:border-gray-700
"
          >
            2: {post.match.odds.away}
          </span>
        </div>
      </div>

      {/* ANALİZ */}
      <div
        className="
  text-sm p-3 rounded-lg
  bg-slate-100 text-slate-800
  dark:bg-[#0F172A] dark:text-white
"
      >
        {post.analysis}
      </div>

      {/* ALT MENÜ */}
      <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-white/10">
        <button className="flex items-center gap-2 opacity-80 hover:opacity-100">
          <MessageCircle size={18} /> Yorumlar
        </button>
        <button className="flex items-center gap-2 opacity-80 hover:opacity-100">
          <Share2 size={18} /> Paylaş
        </button>
      </div>

      {/* YORUMLAR */}
      <CommentList comments={comments} />

      {/* YORUM FORMU */}
      <CommentForm onSubmit={(val) => setComments([...comments, val])} />
    </div>
  );
}
