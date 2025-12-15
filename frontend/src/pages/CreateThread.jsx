import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { auth } from "../firebase/firebase";

export default function CreateThread() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Futbol");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  if (!user)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10 px-4">
        Yeni konu açmak için giriş yapmalısın.
      </p>
    );

  async function submitThread() {
    if (!title.trim() || !message.trim()) return;

    setLoading(true);

    try {
      const db = getFirestore();

      /* 1️⃣ THREAD OLUŞTUR */
      const threadRef = await addDoc(collection(db, "forumThreads"), {
        title,
        category,
        author: {
          uid: user.uid,
          nickname: user.nickname,
          avatar: user.avatar || null,
        },
        createdAt: serverTimestamp(),
        lastMessageAt: serverTimestamp(),
      });

      /* 2️⃣ İLK MESAJ */
      await addDoc(collection(db, "forumThreads", threadRef.id, "messages"), {
        text: message,
        author: {
          uid: user.uid,
          nickname: user.nickname,
          avatar: user.avatar || null,
        },
        createdAt: serverTimestamp(),
      });

      navigate(`/forum/${threadRef.id}`);
    } catch (err) {
      console.error("Konu oluşturulamadı:", err);
      alert("Bir hata oluştu.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full flex justify-center mt-6 px-3">
      <div className="w-full max-w-[900px] p-5 sm:p-8 rounded-xl shadow space-y-6 bg-white border border-slate-200 dark:bg-[#1E293B] dark:border-gray-700">
        <h1 className="text-2xl sm:text-3xl font-bold">Yeni Konu Aç</h1>

        <div className="space-y-5">
          {/* BAŞLIK */}
          <div>
            <label className="text-slate-600 dark:text-gray-300">Başlık</label>
            <input
              className="w-full mt-1 p-3 rounded-lg bg-slate-100 border border-slate-300 dark:bg-[#0F172A] dark:border-gray-700"
              placeholder="Konu başlığı..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* KATEGORİ */}
          <div>
            <label className="text-slate-600 dark:text-gray-300">
              Kategori
            </label>
            <select
              className="w-full mt-1 p-3 rounded-lg bg-slate-100 border border-slate-300 dark:bg-[#0F172A] dark:border-gray-700"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option>Futbol</option>
              <option>Basketbol</option>
              <option>Voleybol</option>
              <option>E-Spor</option>
              <option>Genel</option>
            </select>
          </div>

          {/* MESAJ */}
          <div>
            <label className="text-slate-600 dark:text-gray-300">Mesaj</label>
            <textarea
              className="w-full mt-1 p-3 h-40 rounded-lg resize-none bg-slate-100 border border-slate-300 dark:bg-[#0F172A] dark:border-gray-700"
              placeholder="İlk mesajınızı yazın..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* BUTON */}
          <button
            onClick={submitThread}
            disabled={loading}
            className="w-full px-6 py-3 rounded-lg font-bold bg-[#ffb347] hover:bg-[#ff9d1d] text-black transition disabled:opacity-50"
          >
            {loading ? "Gönderiliyor..." : "Konuyu Oluştur"}
          </button>
        </div>
      </div>
    </div>
  );
}
