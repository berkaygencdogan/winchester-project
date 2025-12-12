import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import CommentForm from "../components/CommentForm";
import CommentList from "../components/CommentList";
import { useTranslation } from "react-i18next";

export default function ForumDetail() {
  const { t } = useTranslation();
  const { id } = useParams();

  const [thread, setThread] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await axios.get(`/api/forums/${id}`);
        setThread(res.data.thread);
      } catch (err) {
        console.error("Konu yüklenemedi:", err);
      }
      setLoading(false);
    }
    load();
  }, [id]);

  if (loading)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10">
        {t("loading")}
      </p>
    );

  if (!thread)
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 mt-10">
        {t("notFound")}
      </p>
    );

  return (
    <div className="max-w-[1000px] mx-auto mt-8 px-3 sm:px-0">
      {/* THREAD HEADER */}
      <div
        className="
          p-5 rounded-xl shadow mb-6
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        <Link
          to="/forum"
          className="text-sm text-slate-500 dark:text-gray-400 hover:underline"
        >
          ← {t("forum")}
        </Link>

        <h1 className="mt-2 text-2xl font-bold">{thread.title}</h1>

        <p className="text-sm text-slate-500 dark:text-gray-400 mt-1">
          {thread.authorName} · {new Date(thread.createdAt).toLocaleString()}
        </p>
      </div>

      {/* FIRST MESSAGE */}
      <div
        className="
          p-5 rounded-xl shadow mb-6
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        <p className="whitespace-pre-wrap">{thread.message}</p>
      </div>

      {/* COMMENTS */}
      <div
        className="
          p-5 rounded-xl shadow space-y-4
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        <h2 className="text-lg font-semibold">{t("comments")}</h2>

        <CommentList comments={thread.comments || []} />
        <CommentForm threadId={id} />
      </div>
    </div>
  );
}
