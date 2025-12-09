import { useNavigate } from "react-router-dom";

export default function ForumTopicItem({ topic }) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/forum/${topic.id}`)}
      className="w-full bg-[#1E293B] hover:bg-[#253142] transition p-4 rounded-xl cursor-pointer flex items-center justify-between"
    >
      {/* SOL — ICON + BAŞLIK + META */}
      <div className="flex items-center gap-4">
        {/* Kullanıcı avatar harfi */}
        <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-white font-bold">
          {topic.author.charAt(0).toUpperCase()}
        </div>

        {/* Başlık + meta bilgiler */}
        <div>
          <p className="text-lg font-semibold">{topic.title}</p>

          <p className="text-gray-400 text-sm">
            {topic.author} • {topic.date} • {topic.category}
          </p>
        </div>
      </div>

      {/* SAĞ — Replies / Views / Son Aktivite */}
      <div className="flex items-center gap-10 text-sm">
        {/* Replies */}
        <div className="text-center">
          <p className="font-bold text-white">{topic.replies}</p>
          <p className="text-gray-400 text-xs">Cevaplar</p>
        </div>

        {/* Views */}
        <div className="text-center">
          <p className="font-bold text-white">{topic.views}</p>
          <p className="text-gray-400 text-xs">Görüntüleme</p>
        </div>

        {/* Last Activity */}
        <div className="text-right">
          <p className="text-gray-400">{topic.lastActivity}</p>
          <p className="text-gray-500 text-xs">{topic.lastUser}</p>
        </div>

        {/* Last user avatar */}
        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          {topic.lastUser.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
