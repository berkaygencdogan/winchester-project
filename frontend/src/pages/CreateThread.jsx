import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
      const res = await axios.post("/api/forums", {
        title,
        categoryId: category,
        authorId: user.uid,
        authorName: user.nickname,
        message,
      });

      navigate(`/forum/${res.data.threadId}`);
    } catch (err) {
      console.error("Konu oluşturulamadı:", err);
      alert("Bir hata oluştu.");
    }

    setLoading(false);
  }

  return (
    <div className="w-full flex justify-center mt-6 px-3">
      <div
        className="
          w-full max-w-[900px]
          p-5 sm:p-8 rounded-xl shadow space-y-6
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        {/* Başlık */}
        <h1 className="text-2xl sm:text-3xl font-bold">Yeni Konu Aç</h1>

        {/* FORM */}
        <div className="space-y-5">
          {/* Başlık */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Başlık
            </label>
            <input
              className="
                w-full mt-1 p-3 rounded-lg
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none focus:border-orange-500
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
              placeholder="Konu başlığı..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Kategori
            </label>
            <select
              className="
                w-full mt-1 p-3 rounded-lg
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Futbol">Futbol</option>
              <option value="Basketbol">Basketbol</option>
              <option value="Voleybol">Voleybol</option>
              <option value="E-Spor">E-Spor</option>
              <option value="Genel">Genel</option>
            </select>
          </div>

          {/* Mesaj */}
          <div>
            <label className="text-slate-600 dark:text-gray-300 text-sm sm:text-base">
              Mesaj
            </label>
            <textarea
              className="
                w-full mt-1 p-3 h-40 rounded-lg resize-none
                bg-slate-100 border border-slate-300
                text-slate-900 text-sm sm:text-base
                outline-none focus:border-orange-500
                dark:bg-[#0F172A] dark:border-gray-700 dark:text-white
              "
              placeholder="İlk mesajınızı yazın..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          {/* Gönder Butonu */}
          <button
            onClick={submitThread}
            disabled={loading}
            className="
              w-full px-6 py-3 rounded-lg font-bold
              bg-[#ffb347] hover:bg-[#ff9d1d]
              text-black text-sm sm:text-lg
              transition disabled:opacity-50
            "
          >
            {loading ? "Gönderiliyor..." : "Konuyu Oluştur"}
          </button>
        </div>
      </div>
    </div>
  );
}
