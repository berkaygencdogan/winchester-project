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
      <p className="text-center text-gray-400 mt-10">
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
        message, // ilk mesaj
      });

      const newThreadId = res.data.threadId;

      navigate(`/forum/${newThreadId}`);
    } catch (err) {
      console.error("Konu oluşturulamadı:", err);
      alert("Bir hata oluştu.");
    }

    setLoading(false);
  }

  return (
    <div className="max-w-[900px] mx-auto mt-10 space-y-6">
      <h1 className="text-3xl font-bold text-white">Yeni Konu Aç</h1>

      {/* ---------------- FORM ---------------- */}
      <div className="bg-[#1E293B] p-6 rounded-xl shadow space-y-4">
        {/* Başlık */}
        <div>
          <label className="text-gray-300">Başlık</label>
          <input
            className="w-full mt-1 p-3 rounded-lg bg-[#0F172A] text-white"
            placeholder="Konu başlığı..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="text-gray-300">Kategori</label>
          <select
            className="w-full mt-1 p-3 rounded-lg bg-[#0F172A] text-white"
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
          <label className="text-gray-300">Mesaj</label>
          <textarea
            className="w-full mt-1 p-3 rounded-lg bg-[#0F172A] text-white h-40 resize-none"
            placeholder="İlk mesajınızı yazın..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        {/* Gönder butonu */}
        <button
          onClick={submitThread}
          disabled={loading}
          className="bg-[#ffb347] hover:bg-[#ff9d1d] text-black font-bold px-6 py-3 rounded-lg w-full"
        >
          {loading ? "Gönderiliyor..." : "Konuyu Oluştur"}
        </button>
      </div>
    </div>
  );
}
