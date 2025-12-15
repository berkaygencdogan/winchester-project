import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ForumTopicItem({ topic }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  if (!topic) return null;

  const replies = topic.replyCount || 0;
  const views = topic.views || 0;

  const author = topic.author?.nickname || topic.authorName || "Kullanıcı";

  const created = topic.createdAt?.toDate
    ? topic.createdAt.toDate()
    : topic.createdAt
    ? new Date(topic.createdAt)
    : new Date();

  const date = created.toLocaleDateString("tr-TR");

  const categoryKey = (topic.category || "genel").toLowerCase();

  const lastUser = author;

  return (
    <div
      onClick={() => navigate(`/forum/${topic.id}`)}
      className="
        w-full p-4 rounded-xl cursor-pointer transition
        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
        bg-white hover:bg-slate-50 border border-slate-200
        dark:bg-[#1E293B] dark:hover:bg-[#253142] dark:border-gray-700
      "
    >
      {/* SOL TARAF */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className="
            w-12 h-12 rounded-lg flex items-center justify-center
            font-bold text-lg
            bg-slate-200 text-slate-800
            dark:bg-[#0F172A] dark:text-white
          "
        >
          {author.charAt(0).toUpperCase()}
        </div>

        {/* Başlık + info */}
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">
            {topic.title || "Başlıksız Konu"}
          </p>

          <p className="text-slate-500 dark:text-gray-400 text-sm mt-1">
            {author} • {date} • {t(categoryKey)}
          </p>
        </div>
      </div>

      {/* SAĞ TARAF */}
      <div className="flex justify-between sm:justify-end sm:gap-10 text-sm w-full sm:w-auto">
        {/* Replies */}
        <div className="text-center">
          <p className="text-slate-700 dark:text-gray-200 font-semibold">
            {replies}
          </p>
          <p className="text-slate-500 dark:text-gray-400">{t("answers")}</p>
        </div>

        {/* Views */}
        <div className="text-center">
          <p className="text-slate-700 dark:text-gray-200 font-semibold">
            {views}
          </p>
          <p className="text-slate-500 dark:text-gray-400">{t("view")}</p>
        </div>

        {/* Last User */}
        <div className="text-right hidden sm:block">
          <p className="text-slate-700 dark:text-gray-200">{lastUser}</p>
          <p className="text-slate-500 dark:text-gray-400 text-sm">
            {t("lastResponse")}
          </p>
        </div>

        {/* Avatar small */}
        <div className="hidden sm:flex w-10 h-10 rounded-lg bg-green-600 items-center justify-center text-white font-bold">
          {lastUser.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* MOBİL */}
      <div className="sm:hidden flex justify-between items-center mt-2">
        <div className="text-slate-500 dark:text-gray-400 text-sm">
          {t("lastResponse")}: {lastUser}
        </div>

        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          {lastUser.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
