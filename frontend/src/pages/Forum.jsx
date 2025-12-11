import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ForumTopicItem from "../components/ForumTopicItem";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export default function Forum() {
  const { t } = useTranslation();
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
    <div className="max-w-[1000px] mx-auto mt-8 px-3 sm:px-0">
      {/* Header */}
      <div className="relative bg-[#1E293B] p-5 rounded-xl shadow mb-6">
        <h1 className="text-white text-2xl font-bold">{t("forum")}</h1>

        <Link
          to="/create-thread"
          className="
            absolute right-5 top-5 
            bg-[#ffb347] hover:bg-[#ff9d1d] 
            text-black font-bold px-5 py-2 rounded-md
            text-sm sm:text-base
          "
        >
          {t("newTopic")}
        </Link>
      </div>

      {/* List */}
      <div className="bg-[#1E293B] p-4 sm:p-5 rounded-xl shadow space-y-4">
        {!topics && <p className="text-gray-400">{t("loading")}</p>}

        {safeTopics.length === 0 && topics !== undefined && (
          <p className="text-gray-400">{t("noTopics")}</p>
        )}

        {safeTopics.map((topic) => (
          <ForumTopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
