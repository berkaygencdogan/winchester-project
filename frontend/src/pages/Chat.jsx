import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
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
} from "firebase/firestore";
import { auth } from "../firebase/firebase";

export default function Chat() {
  const { uid } = useParams(); // konuşulan kişi UID
  const user = auth.currentUser;
  const me = JSON.parse(localStorage.getItem("user"));
  const db = getFirestore();

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const bottomRef = useRef(null);

  /* ================================
     AKTİF CHAT FLAG (BİLDİRİM ENGEL)
  ================================= */
  useEffect(() => {
    localStorage.setItem("activeChatUid", uid);
    return () => {
      localStorage.removeItem("activeChatUid");
    };
  }, [uid]);

  /* ================================
     MESAJLARI ÇEK
  ================================= */
  useEffect(() => {
    if (!user || !uid) return;

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

      // gelenleri okundu yap
      list.forEach((m) => {
        if (m.to.uid === me.uid && !m.read) {
          updateDoc(doc(db, "messages", m.id), { read: true });
        }
      });
    });

    return () => unsub();
  }, [uid]);

  /* ================================
     OTOMATİK SCROLL
  ================================= */
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  /* ================================
     MESAJ GÖNDER
  ================================= */
  async function sendMessage() {
    if (!text.trim()) return;

    await addDoc(collection(db, "messages"), {
      text,
      title: "Mesaj",

      from: {
        uid: me.uid,
        nickname: me.nickname,
        avatar:
          me.avatar ||
          `https://ui-avatars.com/api/?name=${me.nickname.charAt(
            0
          )}&background=ffb347&color=000&bold=true`,
      },

      to: { uid },

      participants: [me.uid, uid],
      read: false,
      createdAt: serverTimestamp(),
    });

    setText("");
  }

  return (
    <div
      className="
        h-[100dvh]
        flex flex-col
        px-3 pt-3
        pb-[72px]
        bg-slate-50 dark:bg-[#0F172A]
      "
    >
      {/* MESSAGES */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {messages.map((m) => {
          const isMine = m.from.uid === me.uid;

          return (
            <div
              key={m.id}
              className={`flex ${isMine ? "justify-end" : "justify-start"}`}
            >
              <div className="relative flex items-end gap-1">
                {/* ✓ / ✓✓ SOLDA */}
                {isMine && (
                  <span
                    className={`
              text-xs font-bold
              ${m.read ? "text-green-500" : "text-gray-800"}
            `}
                  >
                    {m.read ? "✓✓" : "✓"}
                  </span>
                )}

                {/* MESSAGE BUBBLE */}
                <div
                  className={`
            max-w-[75%] px-4 py-2 rounded-2xl text-sm
            break-words
            ${
              isMine
                ? "bg-orange-500 text-black rounded-br-sm"
                : "bg-white dark:bg-[#1E293B] text-black dark:text-white rounded-bl-sm"
            }
          `}
                >
                  {m.text}
                </div>
              </div>
            </div>
          );
        })}

        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="sticky bottom-0 pt-2 bg-slate-50 dark:bg-[#0F172A]">
        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Mesaj yaz..."
            className="
              flex-1 p-3 rounded-lg
              border border-slate-300
              dark:border-gray-700 dark:bg-[#1E293B]
              outline-none
            "
          />
          <button
            onClick={sendMessage}
            className="px-5 rounded-lg bg-orange-500 font-bold text-black"
          >
            Gönder
          </button>
        </div>
      </div>
    </div>
  );
}
