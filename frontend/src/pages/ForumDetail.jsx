import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getFirestore,
  doc,
  getDoc,
  collection,
  query,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useTranslation } from "react-i18next";

export default function ForumDetail() {
  const { t } = useTranslation();
  const { id } = useParams();

  const db = getFirestore();
  const loggedUser = JSON.parse(localStorage.getItem("user"));

  const [thread, setThread] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [text, setText] = useState("");
  const [sending, setSending] = useState(false);

  useEffect(() => {
    /* THREAD */
    getDoc(doc(db, "forumThreads", id))
      .then((snap) => {
        if (snap.exists()) {
          setThread({ id: snap.id, ...snap.data() });
        } else {
          setThread(null);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));

    /* MESSAGES */
    const q = query(
      collection(db, "forumThreads", id, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      setMessages(
        snap.docs.map((d) => ({
          id: d.id,
          ...d.data(),
        }))
      );
    });

    return () => unsub();
  }, [id]);

  async function sendMessage() {
    if (!loggedUser) {
      alert("Yorum yazmak için giriş yapmalısın.");
      return;
    }

    if (!text.trim()) return;

    setSending(true);

    try {
      await addDoc(collection(db, "forumThreads", id, "messages"), {
        text: text.trim(),
        author: {
          uid: loggedUser.uid,
          nickname: loggedUser.nickname,
          avatar: loggedUser.avatar || null,
        },
        createdAt: serverTimestamp(),
      });

      await updateDoc(doc(db, "forumThreads", id), {
        lastMessageAt: serverTimestamp(),
      });

      setText("");
    } catch (err) {
      console.error("Mesaj gönderilemedi:", err);
      alert("Mesaj gönderilemedi.");
    }

    setSending(false);
  }

  if (loading)
    return (
      <p className="text-center mt-10 text-slate-500 dark:text-gray-400">
        {t("loading")}
      </p>
    );

  if (!thread)
    return (
      <p className="text-center mt-10 text-slate-500 dark:text-gray-400">
        {t("notFound")}
      </p>
    );

  return (
    <div
      className="
        min-h-screen
        bg-slate-50 text-slate-900
        dark:bg-[#0F172A] dark:text-white
      "
    >
      <div className="max-w-[1000px] mx-auto pt-6 px-3 sm:px-0">
        {/* THREAD HEADER */}
        <div
          className="
            p-5 mb-6 rounded-2xl
            bg-white border border-slate-200 shadow
            dark:bg-[#1E293B] dark:border-gray-700
          "
        >
          <Link
            to="/forum"
            className="
              text-sm font-medium
              text-slate-500 dark:text-gray-400
              hover:underline
            "
          >
            ← {t("forum")}
          </Link>

          <h1 className="mt-2 text-2xl font-bold">{thread.title}</h1>

          <p className="mt-1 text-sm text-slate-500 dark:text-gray-400">
            {thread.author.nickname} ·{" "}
            {thread.createdAt?.toDate().toLocaleString()}
          </p>
        </div>

        {/* MESSAGES */}
        <div className="space-y-4 mb-6">
          {messages.map((m) => (
            <div
              key={m.id}
              className="
                p-5 rounded-2xl
                bg-white border border-slate-200 shadow
                dark:bg-[#1E293B] dark:border-gray-700
              "
            >
              <div className="flex items-center gap-3 mb-3">
                {m.author.avatar ? (
                  <img
                    src={m.author.avatar}
                    alt={m.author.nickname}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                ) : (
                  <div
                    className="
                      w-10 h-10 rounded-full
                      flex items-center justify-center
                      bg-slate-200 text-slate-800 font-bold
                      dark:bg-[#0F172A] dark:text-white
                    "
                  >
                    {m.author.nickname[0].toUpperCase()}
                  </div>
                )}

                <div>
                  <p className="font-semibold">{m.author.nickname}</p>
                  <p className="text-xs text-slate-500 dark:text-gray-400">
                    {m.createdAt?.toDate().toLocaleString()}
                  </p>
                </div>
              </div>

              <p className="whitespace-pre-wrap leading-relaxed">{m.text}</p>
            </div>
          ))}

          {messages.length === 0 && (
            <p className="text-center text-slate-500 dark:text-gray-400">
              Henüz mesaj yok.
            </p>
          )}
        </div>

        {/* COMMENT BOX */}
        <div
          className="
            p-5 rounded-2xl
            bg-white border border-slate-200 shadow
            dark:bg-[#1E293B] dark:border-gray-700
          "
        >
          {!loggedUser ? (
            <p className="text-slate-500 dark:text-gray-400">
              Yorum yazmak için giriş yapmalısın.
            </p>
          ) : (
            <>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Yorumunu yaz..."
                className="
                  w-full h-28 resize-none p-3 rounded-lg
                  bg-slate-100 border border-slate-300
                  text-slate-900
                  dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
                  outline-none transition
                "
              />

              <button
                onClick={sendMessage}
                disabled={sending}
                className="
                  mt-3 px-6 py-2 rounded-lg font-semibold
                  bg-orange-500 hover:bg-orange-600
                  text-black transition
                  disabled:opacity-50
                "
              >
                {sending ? "Gönderiliyor..." : "Yorum Gönder"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
