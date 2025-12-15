import { useState } from "react";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
  doc,
  getDoc,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";

export default function MessageModal({ toUser, onClose }) {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);

  const fromUser = auth.currentUser;

  if (!fromUser || !toUser) return null;

  async function sendMessage() {
    if (!text.trim()) return;

    setLoading(true);

    try {
      const db = getFirestore();

      // 🔥 GÖNDEREN
      const fromSnap = await getDoc(doc(db, "users", fromUser.uid));
      const fromData = fromSnap.exists() ? fromSnap.data() : {};

      // 🔥 ALICI
      const toSnap = await getDoc(doc(db, "users", toUser.uid));
      const toData = toSnap.exists() ? toSnap.data() : {};

      console.log(fromData, toData);

      await addDoc(collection(db, "messages"), {
        title: "Mesaj",
        text,

        from: {
          uid: fromUser.uid,
          nickname: fromData.nickname || "Bilinmeyen",
          avatar: fromData.avatar || null,
        },

        to: {
          uid: toUser.uid,
          nickname: toData.nickname || "Bilinmeyen",
          avatar: toData.avatar || null,
        },
        participants: [fromUser.uid, toUser.uid],
        read: false,
        createdAt: serverTimestamp(),
      });

      onClose();
    } catch (err) {
      console.error("Mesaj gönderilemedi:", err);
      alert("Mesaj gönderilemedi");
    }

    setLoading(false);
  }

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
      <div
        className="
          w-full max-w-md mx-3
          bg-white dark:bg-[#1E293B]
          border border-slate-200 dark:border-gray-700
          rounded-xl shadow-xl p-5
        "
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            {toUser.nickname} kullanıcısına mesaj
          </h2>

          <button
            onClick={onClose}
            className="text-slate-500 hover:text-red-500"
          >
            ✕
          </button>
        </div>

        {/* TEXTAREA */}
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Mesajınızı yazın..."
          className="
            w-full h-32 resize-none rounded-lg p-3
            bg-slate-100 dark:bg-[#0F172A]
            border border-slate-300 dark:border-gray-700
            text-slate-900 dark:text-white
            outline-none
          "
        />

        {/* ACTIONS */}
        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="
              px-4 py-2 rounded-lg
              bg-slate-200 dark:bg-[#0F172A]
              text-slate-700 dark:text-gray-300
            "
          >
            İptal
          </button>

          <button
            onClick={sendMessage}
            disabled={loading}
            className="
              px-5 py-2 rounded-lg font-semibold
              bg-orange-500 hover:bg-orange-600
              text-black transition
              disabled:opacity-50
            "
          >
            {loading ? "Gönderiliyor..." : "Gönder"}
          </button>
        </div>
      </div>
    </div>
  );
}
