import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function ForumTopicItem({ topic }) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const replies = topic.replyCount || 0;
  const views = topic.views || 0;
  const author = topic.authorName || "Kullanıcı";

  const created = topic.createdAt?._seconds
    ? new Date(topic.createdAt._seconds * 1000)
    : new Date(topic.createdAt);

  const date = created.toLocaleDateString("tr-TR");
  const lastUser = author;

  return (
    <div
      onClick={() => navigate(`/forum/${topic.id}`)}
      className="
        w-full bg-[#1E293B] hover:bg-[#253142] transition p-4 rounded-xl cursor-pointer
        flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4
      "
    >
      {/* SOL TARAF */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-lg bg-[#0F172A] flex items-center justify-center text-white font-bold text-lg">
          {author.charAt(0).toUpperCase()}
        </div>

        {/* Başlık + info */}
        <div>
          <p className="text-lg font-semibold leading-tight">{topic.title}</p>
          <p className="text-gray-400 text-sm mt-1">
            {author} • {date} • {t(topic.categoryId.toLowerCase())}
          </p>
        </div>
      </div>

      {/* SAĞ TARAF (mobilde alta iner) */}
      <div className="flex justify-between sm:justify-end sm:gap-10 text-sm w-full sm:w-auto">
        {/* Replies */}
        <div className="text-center">
          <p className="font-bold text-white">{replies}</p>
          <p className="text-gray-400 text-xs">{t("answers")}</p>
        </div>

        {/* Views */}
        <div className="text-center">
          <p className="font-bold text-white">{views}</p>
          <p className="text-gray-400 text-xs">{t("view")}</p>
        </div>

        {/* Last User */}
        <div className="text-right hidden sm:block">
          <p className="text-gray-400">{lastUser}</p>
          <p className="text-gray-500 text-xs">{t("lastResponse")}</p>
        </div>

        {/* Avatar küçük (desktop için) */}
        <div className="hidden sm:flex w-10 h-10 rounded-lg bg-green-600 items-center justify-center text-white font-bold">
          {lastUser.charAt(0).toUpperCase()}
        </div>
      </div>

      {/* Mobilde son mesaj bilgisi + avatar */}
      <div className="sm:hidden flex justify-between items-center mt-2">
        <div className="text-gray-400 text-sm">
          {t("lastResponse")}: {lastUser}
        </div>

        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          {lastUser.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
