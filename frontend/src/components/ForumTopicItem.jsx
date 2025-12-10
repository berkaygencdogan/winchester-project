import { useNavigate } from "react-router-dom";

export default function ForumTopicItem({ topic }) {
  const navigate = useNavigate();

  const replies = topic.replyCount || 0;
  const views = topic.views || 0;
  const author = topic.authorName || "Kullanıcı";
  const date = new Date(topic.createdAt).toLocaleDateString("tr-TR");
  const lastActivity = date;
  const lastUser = author;

  return (
    <div
      onClick={() => navigate(`/forum/${topic.id}`)}
      className="w-full bg-[#1E293B] hover:bg-[#253142] transition p-4 rounded-xl cursor-pointer flex items-center justify-between"
    >
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-[#0F172A] flex items-center justify-center text-white font-bold">
          {author.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="text-lg font-semibold">{topic.title}</p>
          <p className="text-gray-400 text-sm">
            {author} • {date} • {topic.categoryId}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-10 text-sm">
        <div className="text-center">
          <p className="font-bold text-white">{replies}</p>
          <p className="text-gray-400 text-xs">Cevaplar</p>
        </div>

        <div className="text-center">
          <p className="font-bold text-white">{views}</p>
          <p className="text-gray-400 text-xs">Görüntüleme</p>
        </div>

        <div className="text-right">
          <p className="text-gray-400">{lastActivity}</p>
          <p className="text-gray-500 text-xs">{lastUser}</p>
        </div>

        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          {lastUser.charAt(0).toUpperCase()}
        </div>
      </div>
    </div>
  );
}
