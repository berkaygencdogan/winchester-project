import { MessageCircle, Share2 } from "lucide-react";
import CommentList from "./CommentList";
import CommentForm from "./CommentForm";
import { useState } from "react";

export default function PostCard({ post }) {
  const [comments, setComments] = useState(post.comments);

  return (
    <div className="bg-[#1E293B] p-4 rounded-xl space-y-4">
      {/* MAÇ BÖLÜMÜ */}
      <div className="bg-[#0F172A] p-4 rounded-lg">
        <div className="text-sm opacity-70">{post.match.league}</div>
        <div className="text-lg font-semibold">
          {post.match.homeTeam} vs {post.match.awayTeam}
        </div>

        <div className="flex gap-3 mt-3">
          <span className="bg-[#1E293B] p-2 rounded-lg">
            1: {post.match.odds.home}
          </span>
          <span className="bg-[#1E293B] p-2 rounded-lg">
            X: {post.match.odds.draw}
          </span>
          <span className="bg-[#1E293B] p-2 rounded-lg">
            2: {post.match.odds.away}
          </span>
        </div>
      </div>

      {/* ANALİZ */}
      <div className="text-sm opacity-90 bg-[#0F172A] p-3 rounded-lg">
        {post.analysis}
      </div>

      {/* ALT MENÜ */}
      <div className="flex items-center justify-between pt-2 border-t border-white/10">
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
