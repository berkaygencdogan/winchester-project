import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  getFirestore,
  collection,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import ForumTopicItem from "../components/ForumTopicItem";
import { useTranslation } from "react-i18next";

export default function Forum() {
  const { t } = useTranslation();
  const [topics, setTopics] = useState(undefined);

  useEffect(() => {
    const db = getFirestore();

    const q = query(
      collection(db, "forumThreads"),
      orderBy("lastMessageAt", "desc")
    );

    const unsub = onSnapshot(
      q,
      (snap) => {
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTopics(list);
      },
      (err) => {
        console.error("Forum yüklenemedi:", err);
        setTopics([]);
      }
    );

    return () => unsub();
  }, []);

  const safeTopics = Array.isArray(topics) ? topics : [];

  return (
    <div className="max-w-[1000px] mx-auto mt-8 px-3 sm:px-0">
      {/* HEADER */}
      <div
        className="
          relative p-5 rounded-xl shadow mb-6
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        <h1 className="text-slate-900 dark:text-white text-2xl font-bold">
          {t("forum")}
        </h1>

        <Link
          to="/create-thread"
          className="
            absolute right-5 top-5
            bg-[#ffb347] hover:bg-[#ff9d1d]
            text-black font-bold px-5 py-2 rounded-md
            text-sm sm:text-base transition
          "
        >
          {t("newTopic")}
        </Link>
      </div>

      {/* LIST */}
      <div
        className="
          p-4 sm:p-5 rounded-xl shadow space-y-4
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        {!topics && (
          <p className="text-slate-500 dark:text-gray-400">{t("loading")}</p>
        )}

        {safeTopics.length === 0 && topics !== undefined && (
          <p className="text-slate-500 dark:text-gray-400">{t("noTopics")}</p>
        )}

        {safeTopics.map((topic) => (
          <ForumTopicItem key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
}
