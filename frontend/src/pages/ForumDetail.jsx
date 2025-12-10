import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function ForumDetail() {
  const { id } = useParams();

  const [thread, setThread] = useState(null);
  const [comments, setComments] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 10;

  const user = JSON.parse(localStorage.getItem("user")) || null;
  const isAdmin = user?.role === "admin";

  // PAGINATION
  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const paginated = comments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  // THREAD + COMMENTS LOAD
  useEffect(() => {
    async function load() {
      try {
        const threadRes = await axios.get(`/api/forums/${id}`);
        setThread(threadRes.data.thread);

        const commentRes = await axios.get(`/api/comments/${id}`);
        setComments(commentRes.data.comments);
      } catch (err) {
        console.error("Forum detay yüklenemedi:", err);
      }
    }
    load();
  }, [id]);

  // ------------------- MODERATION -------------------
  async function lockThread() {
    await axios.post(`/api/forums/${id}/lock`, { adminId: user.uid });
    setThread((t) => ({ ...t, isLocked: true }));
  }

  async function unlockThread() {
    await axios.post(`/api/forums/${id}/unlock`);
    setThread((t) => ({ ...t, isLocked: false }));
  }

  async function deleteThread() {
    await axios.post(`/api/forums/${id}/delete`, { adminId: user.uid });
    alert("Konu silindi.");
  }

  // ------------------- COMMENT SEND -------------------
  async function handleSend(message) {
    if (!message.trim()) return;

    await axios.post(`/api/comments/${id}`, {
      userId: user.uid,
      userName: user.nickname,
      message,
    });

    // yorum eklendikten sonra tekrar yükle
    const res = await axios.get(`/api/comments/${id}`);
    setComments(res.data.comments);
  }

  if (!thread)
    return <p className="text-center text-gray-400 mt-10">Yükleniyor...</p>;

  return (
    <div className="max-w-[1100px] mx-auto mt-6 space-y-6">
      {/* ---------------- HEADER ---------------- */}
      <div className="bg-[#1E293B] p-5 rounded-xl shadow relative">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          {thread.isLocked && <span className="text-red-400 text-xl">🔒</span>}
          {thread.title}
        </h1>

        <div className="text-sm text-gray-300 mt-1">
          {thread.authorName} • {thread.categoryId}
        </div>

        {/* MOD MENU */}
        {isAdmin && (
          <div className="absolute right-4 top-4">
            <ModerationMenu
              thread={thread}
              lockThread={lockThread}
              unlockThread={unlockThread}
              deleteThread={deleteThread}
            />
          </div>
        )}
      </div>

      {/* ---------------- PAGE NUMBERS ---------------- */}
      {totalPages > 1 && (
        <Pagination total={totalPages} page={page} setPage={setPage} />
      )}

      {/* ---------------- POSTS ---------------- */}
      {paginated.map((c, index) => (
        <PostItem
          key={c.id}
          post={c}
          index={(page - 1) * PAGE_SIZE + index + 1}
        />
      ))}

      {/* ---------------- PAGE NUMBERS ---------------- */}
      {totalPages > 1 && (
        <Pagination total={totalPages} page={page} setPage={setPage} />
      )}

      {/* ---------------- COMMENT BOX ---------------- */}
      {!thread.isLocked ? (
        user ? (
          <AddCommentBox user={user} onSend={handleSend} />
        ) : (
          <p className="text-center text-gray-400">
            Yanıt yazmak için giriş yap.
          </p>
        )
      ) : (
        <p className="text-center text-red-400 text-lg">
          🔒 Bu konu kilitli. Yeni yorum eklenemez.
        </p>
      )}
    </div>
  );
}

/* ======================================================
   MODERATION MENU
====================================================== */
function ModerationMenu({ thread, lockThread, unlockThread, deleteThread }) {
  return (
    <div className="bg-[#0F172A] p-3 rounded-lg shadow-lg text-white space-y-2 border border-gray-700">
      <p className="font-bold text-sm opacity-70 mb-1">Moderate</p>

      {!thread.isLocked ? (
        <button
          onClick={lockThread}
          className="block text-left w-full text-red-400 hover:text-red-300"
        >
          Konuyu Kilitle
        </button>
      ) : (
        <button
          onClick={unlockThread}
          className="block text-left w-full text-green-400 hover:text-green-300"
        >
          Kilidi Aç
        </button>
      )}

      <button
        onClick={deleteThread}
        className="block text-left w-full text-yellow-400 hover:text-yellow-300"
      >
        Konuyu Sil
      </button>
    </div>
  );
}

/* ======================================================
   PAGINATION
====================================================== */
function Pagination({ total, page, setPage }) {
  return (
    <div className="flex justify-end gap-2">
      {[...Array(total)].map((_, i) => (
        <button
          key={i}
          onClick={() => setPage(i + 1)}
          className={`px-3 py-1 rounded-md ${
            page === i + 1
              ? "bg-[#ffb347] text-black"
              : "bg-[#1E293B] text-gray-300 hover:bg-[#2b3a4c]"
          }`}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}

/* ======================================================
   POST ITEM
====================================================== */
function PostItem({ post, index }) {
  return (
    <div className="bg-[#1E293B] p-5 rounded-xl shadow flex gap-6 relative">
      <div className="absolute right-4 top-3 text-gray-400 text-xs">
        #{index}
      </div>

      {/* Sol Profil Kartı */}
      <div className="w-[220px] flex-shrink-0 text-center">
        <div className="w-32 h-32 mx-auto rounded-lg bg-gray-700" />
        <p className="mt-2 text-white font-bold">{post.userName}</p>

        <span className="text-xs bg-purple-600 text-white px-2 py-1 rounded-md">
          Üye
        </span>

        <div className="text-left bg-[#0F172A] rounded-lg p-3 mt-3 text-gray-300 text-sm space-y-1">
          <div>Mesajlar: —</div>
          <div>Beğeni: —</div>
        </div>
      </div>

      {/* Mesaj İçeriği */}
      <div className="flex-1">
        <p className="text-gray-400 text-sm mb-2">
          {new Date(post.createdAt._seconds * 1000).toLocaleString("tr-TR")}
        </p>
        <p className="text-white whitespace-pre-line">{post.message}</p>
      </div>
    </div>
  );
}

function AddCommentBox({ user, onSend }) {
  const [msg, setMsg] = useState("");

  return (
    <div className="bg-[#1E293B] p-5 rounded-xl shadow">
      <p className="text-gray-300 mb-2">Yanıt Yaz ({user.nickname})</p>

      <textarea
        className="bg-[#0F172A] text-white p-3 rounded-lg w-full h-36 resize-none"
        placeholder="Mesajınızı yazın..."
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
      ></textarea>

      <button
        onClick={() => onSend(msg)}
        className="mt-3 bg-[#ffb347] hover:bg-[#ff9d1d] text-black font-bold px-6 py-2 rounded-md"
      >
        Gönder
      </button>
    </div>
  );
}
