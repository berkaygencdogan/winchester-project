import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ForumTopicItem from "../components/ForumTopicItem";

export default function Forum() {
  const [topics, setTopics] = useState(undefined);
  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get("/api/forums");
        setTopics(res.data.threads || []);
      } catch (err) {
        console.error("Forum yüklenemedi:", err);
        setTopics([]);
      }
    }
    load();
  }, []);

  const safeTopics = Array.isArray(topics) ? topics : [];

  return (
    <div className="max-w-[1000px] mx-auto mt-8">
      {/* Header + Yeni Konu Aç */}
      <div className="relative bg-[#1E293B] p-5 rounded-xl shadow mb-6">
        <h1 className="text-white text-2xl font-bold">Forum Başlık</h1>

        <Link
          to="/create-thread"
          className="absolute right-5 top-5 bg-[#ffb347] hover:bg-[#ff9d1d] 
          text-black font-bold px-5 py-2 rounded-md"
        >
          Yeni Konu Aç
        </Link>
      </div>

      {/* Forum topic list */}
      <div className="bg-[#1E293B] p-5 rounded-xl shadow space-y-4">
        {topics === undefined && (
          <p className="text-gray-400">Konular yükleniyor...</p>
        )}

        {safeTopics.length === 0 && topics !== undefined && (
          <p className="text-gray-400">Henüz konu yok.</p>
        )}

        {safeTopics.map((topic) => (
          <ForumTopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
