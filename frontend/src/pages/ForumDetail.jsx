import { useState } from "react";

export default function ForumDetail({ thread, posts, user }) {
  const [page, setPage] = useState(1);

  const PAGE_SIZE = 10;
  const totalPages = Math.ceil(posts.length / PAGE_SIZE);

  const paginated = posts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className="p-4 space-y-8">
      {/* ---------------- HEADER ---------------- */}
      <div className="bg-[#1E293B] rounded-xl p-5 shadow-lg">
        <h1 className="text-2xl font-bold text-white">{thread.title}</h1>

        <div className="text-sm text-gray-300 mt-1">
          {thread.author} • {thread.date} • {thread.category}
        </div>
      </div>

      {/* ---------------- POSTS ---------------- */}
      {paginated.map((p, index) => (
        <PostItem
          key={p.id}
          post={p}
          index={(page - 1) * PAGE_SIZE + index + 1}
        />
      ))}

      {/* ---------------- PAGINATION ---------------- */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {[...Array(totalPages)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                page === i + 1
                  ? "bg-[#ffb347] text-black"
                  : "bg-[#1E293B] text-gray-300 hover:bg-[#2a3a4f]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}

      {/* ---------------- COMMENT BOX ---------------- */}
      {user ? (
        <AddCommentBox user={user} />
      ) : (
        <div className="text-center text-gray-400 mt-6">
          Yanıt yazmak için giriş yapman gerekiyor.
        </div>
      )}
    </div>
  );
}

/* =======================================================
   POST ITEM
======================================================= */
function PostItem({ post, index }) {
  return (
    <div className="bg-[#1E293B] rounded-xl p-5 shadow-lg flex gap-6">
      {/* LEFT - USER CARD */}
      <div className="w-40 flex-shrink-0 text-center">
        <img
          src={post.user.avatar}
          className="rounded-lg w-32 h-32 mx-auto object-cover"
        />

        <p className="mt-2 font-bold text-white">{post.user.name}</p>

        <span className="inline-block mt-1 px-3 py-1 text-xs font-bold rounded-md bg-purple-600 text-white">
          {post.user.badge}
        </span>

        {/* mini stats */}
        <div className="bg-[#0F172A] rounded-lg mt-3 p-3 text-left text-gray-300 text-sm space-y-1">
          <div>Katılım: {post.user.joined}</div>
          <div>Mesajlar: {post.user.messages}</div>
          <div>Beğeni puanı: {post.user.likes}</div>
          <div>Ödüller: {post.user.awards}</div>
        </div>
      </div>

      {/* RIGHT - MESSAGE */}
      <div className="flex-1 relative">
        {/* Post Number */}
        <div className="absolute right-0 top-0 text-gray-400 text-xs">
          #{index}
        </div>

        <div className="text-sm text-gray-300 mb-2">{post.date}</div>

        <p className="text-white leading-relaxed">{post.message}</p>
      </div>
    </div>
  );
}

/* =======================================================
   ADD COMMENT BOX
======================================================= */
function AddCommentBox({ user }) {
  return (
    <div className="bg-[#1E293B] rounded-xl p-5 shadow-lg">
      <p className="text-gray-300 mb-2">Yanıt Yaz ({user.name})</p>

      <textarea
        className="w-full h-32 bg-[#0F172A] text-white p-3 rounded-lg outline-none resize-none"
        placeholder="Mesajınızı yazın..."
      ></textarea>

      <button className="mt-3 px-6 py-2 bg-[#ffb347] text-black rounded-md font-bold hover:bg-[#ff9d1d]">
        Gönder
      </button>
    </div>
  );
}
