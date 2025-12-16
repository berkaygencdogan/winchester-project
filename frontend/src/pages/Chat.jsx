import { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  addDoc,
  serverTimestamp,
  updateDoc,
  doc,
  setDoc,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";
import { ArrowLeft, Paperclip } from "lucide-react";

export default function Chat() {
  const { uid } = useParams();
  const navigate = useNavigate();
  const me = JSON.parse(localStorage.getItem("user"));
  const user = auth.currentUser;
  const db = getFirestore();
  const [uploading, setUploading] = useState(false);

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [replyTo, setReplyTo] = useState(null);
  const [typing, setTyping] = useState(false);
  const [otherUser, setOtherUser] = useState(null);

  const bottomRef = useRef(null);
  const typingTimeout = useRef(null);
  const fileInputRef = useRef(null);
  const touchStartX = useRef(null);

  /* =========================
     HEADER USER
  ========================= */
  useEffect(() => {
    async function loadUser() {
      const snap = await getDoc(doc(db, "users", uid));
      if (snap.exists()) setOtherUser(snap.data());
    }
    loadUser();
  }, [uid]);

  /* =========================
     ACTIVE CHAT FLAG
  ========================= */
  useEffect(() => {
    localStorage.setItem("activeChatUid", uid);
    return () => localStorage.removeItem("activeChatUid");
  }, [uid]);

  /* =========================
     MESSAGES
  ========================= */
  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "messages"),
      where("participants", "array-contains", me.uid),
      orderBy("createdAt", "asc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs
        .map((d) => ({ id: d.id, ...d.data() }))
        .filter(
          (m) =>
            (m.from.uid === me.uid && m.to.uid === uid) ||
            (m.from.uid === uid && m.to.uid === me.uid)
        );

      setMessages(list);

      list.forEach((m) => {
        if (m.to.uid === me.uid && !m.read) {
          updateDoc(doc(db, "messages", m.id), { read: true });
        }
      });
    });

    return () => unsub();
  }, [uid]);

  /* =========================
     TYPING
  ========================= */
  useEffect(() => {
    const ref = doc(db, "typing", `${uid}_${me.uid}`);
    const unsub = onSnapshot(ref, (snap) => {
      setTyping(snap.exists());
    });
    return () => unsub();
  }, [uid]);

  async function handleTyping() {
    const ref = doc(db, "typing", `${me.uid}_${uid}`);
    await setDoc(ref, { typing: true });

    clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => deleteDoc(ref), 1500);
  }

  /* =========================
     HELPERS
  ========================= */
  function sameDay(a, b) {
    return (
      a.getFullYear() === b.getFullYear() &&
      a.getMonth() === b.getMonth() &&
      a.getDate() === b.getDate()
    );
  }

  function dayLabel(date) {
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    if (sameDay(date, today)) return "Bugün";
    if (sameDay(date, yesterday)) return "Dün";

    return date.toLocaleDateString("tr-TR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  }

  function time(ts) {
    return ts.toDate().toLocaleTimeString("tr-TR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  /* =========================
     SEND
  ========================= */
  async function sendMessage() {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text,
      title: "Mesaj",
      from: {
        uid: me.uid,
        nickname: me.nickname,
        avatar: me.avatar,
      },
      to: { uid },
      participants: [me.uid, uid],
      replyTo: replyTo
        ? {
            id: replyTo.id,
            text: replyTo.text,
            nickname: replyTo.from.nickname,
          }
        : null,
      read: false,
      createdAt: serverTimestamp(),
    });

    setText("");
    setReplyTo(null);
  }
  async function handleFileSelect(e) {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    const tempId = "temp-" + Date.now();

    // 🔵 geçici mesaj
    setMessages((prev) => [
      ...prev,
      {
        id: tempId,
        uploading: true,
        from: { uid: me.uid },
        createdAt: { toDate: () => new Date() },
        file: {
          name: file.name,
          type: file.type,
        },
      },
    ]);

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5000/api/upload/message", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    // 🟢 geçici mesajı sil
    setMessages((prev) => prev.filter((m) => m.id !== tempId));

    // 🔵 gerçek mesaj
    await addDoc(collection(db, "messages"), {
      text: "",
      file: data.file,
      from: {
        uid: me.uid,
        nickname: me.nickname,
        avatar: me.avatar,
      },
      to: { uid },
      participants: [me.uid, uid],
      read: false,
      createdAt: serverTimestamp(),
    });

    setUploading(false);
    e.target.value = "";
  }

  return (
    <div className="h-[100dvh] flex flex-col bg-slate-50 dark:bg-[#0F172A]">
      {/* HEADER */}
      <div className="flex items-center gap-3 px-3 py-2 border-b border-slate-200 dark:border-gray-700 bg-white dark:bg-[#0F172A]">
        <button onClick={() => navigate(-1)}>
          <ArrowLeft className="text-slate-700 dark:text-gray-300" />
        </button>

        <img
          src={otherUser?.avatar}
          alt="avatar"
          className="w-9 h-9 rounded-full object-cover"
        />

        <span className="font-semibold text-slate-900 dark:text-white">
          {otherUser?.nickname || "Sohbet"}
        </span>
      </div>

      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto px-3 py-2 space-y-3">
        {messages.map((m, i) => {
          if (!m.createdAt) return null;

          const isMine = m.from.uid === me.uid;
          const date = m.createdAt.toDate();
          const prev = messages[i - 1]?.createdAt?.toDate();
          const showDay = !prev || !sameDay(date, prev);

          return (
            <div key={m.id}>
              {showDay && (
                <div className="flex justify-center my-2">
                  <span className="text-xs px-3 py-1 rounded-full bg-slate-200 dark:bg-[#1E293B] text-slate-700 dark:text-gray-300">
                    {dayLabel(date)}
                  </span>
                </div>
              )}

              <div
                className={`flex ${isMine ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`relative max-w-[75%] px-4 py-2 rounded-2xl text-sm
                    ${
                      isMine
                        ? "bg-orange-500 text-black rounded-br-sm"
                        : `
                          bg-slate-200 text-slate-900
                          dark:bg-[#1E293B] dark:text-white
                          rounded-bl-sm
                        `
                    }
                  `}
                >
                  {m.replyTo && (
                    <div className="text-xs mb-1 p-2 rounded bg-black/10 dark:bg-white/10">
                      <b>{m.replyTo.nickname}</b>
                      <div className="truncate">{m.replyTo.text}</div>
                    </div>
                  )}

                  {m.text && <div>{m.text}</div>}

                  {m.uploading && (
                    <div className="text-xs italic opacity-70 mt-1">
                      Yükleniyor… ⏳
                    </div>
                  )}

                  {/* FILE */}
                  {m.file && (
                    <div className="mt-2">
                      {m.file.type.startsWith("image/") ? (
                        <img
                          src={m.file.url}
                          alt={m.file.name}
                          className={`max-w-[220px] rounded-lg cursor-pointer ${
                            isMine ? "ml-auto" : ""
                          }`}
                          onClick={() => window.open(m.file.url, "_blank")}
                        />
                      ) : (
                        <a
                          href={m.file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="
                            flex items-center gap-2 p-3 rounded-lg
                            bg-black/10 hover:bg-black/20
                            dark:bg-white/10 dark:hover:bg-white/20
                          "
                        >
                          📄
                          <div className="flex flex-col text-xs">
                            <span className="font-semibold truncate max-w-[160px]">
                              {m.file.name}
                            </span>
                            <span className="opacity-70">
                              {(m.file.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                        </a>
                      )}
                    </div>
                  )}

                  {/* TIME + READ */}
                  <div className="flex justify-end items-center gap-1 text-[11px] mt-1 opacity-70">
                    <span>{time(m.createdAt)}</span>
                    {isMine && (
                      <span
                        className={
                          m.read
                            ? "text-green-400 font-bold"
                            : "text-black/60 dark:text-gray-400"
                        }
                      >
                        {m.read ? "✓✓" : "✓"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {typing && (
          <div className="text-xs italic text-slate-500 dark:text-gray-400">
            Yazıyor…
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* REPLY BAR */}
      {replyTo && (
        <div
          className="px-3 py-2 text-xs flex justify-between
          bg-slate-200 dark:bg-[#1E293B] text-slate-800 dark:text-gray-200"
        >
          <span>
            <b>{replyTo.from.nickname}</b>: {replyTo.text}
          </span>
          <button onClick={() => setReplyTo(null)}>✕</button>
        </div>
      )}
      <div className="px-3 text-xs text-slate-500 dark:text-gray-400">
        Maksimum dosya boyutu: <b>20 MB</b>
      </div>
      {/* INPUT */}
      <div
        className="sticky bottom-0 px-3 py-2 flex gap-2
        bg-white dark:bg-[#0F172A] border-t border-slate-200 dark:border-gray-700"
      >
        <button
          onClick={() => fileInputRef.current.click()}
          className="text-slate-700 dark:text-gray-300"
        >
          <Paperclip />
        </button>

        <input
          ref={fileInputRef}
          type="file"
          hidden
          onChange={handleFileSelect}
        />

        <input
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            handleTyping();
          }}
          placeholder="Mesaj yaz..."
          className="
            flex-1 p-3 rounded-lg border outline-none
            bg-white text-slate-900 border-slate-300
            dark:bg-[#1E293B] dark:text-white dark:border-gray-700
          "
        />

        <button
          onClick={sendMessage}
          className="px-5 rounded-lg bg-orange-500 text-black font-bold"
        >
          Gönder
        </button>
      </div>
    </div>
  );
}
