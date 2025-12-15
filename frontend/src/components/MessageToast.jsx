import { useNavigate } from "react-router-dom";

export default function MessageToast({
  avatar,
  nickname,
  text,
  toUid, // 👉 sohbet edilecek kişinin uid'si
}) {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/${toUid}`)}
      className="
        cursor-pointer
        flex items-center gap-3
        bg-white dark:bg-[#1E293B]
        border border-slate-200 dark:border-gray-700
        shadow-xl rounded-xl
        p-3 w-[320px]
        hover:bg-slate-50 dark:hover:bg-[#0F172A]
        transition
      "
    >
      <img
        src={avatar}
        className="w-10 h-10 rounded-full object-cover"
        alt={nickname}
      />

      <div className="flex-1 overflow-hidden">
        <p className="font-semibold text-slate-900 dark:text-white">
          {nickname}
        </p>
        <p className="text-sm text-slate-500 dark:text-gray-400 truncate">
          {text}
        </p>
      </div>

      <span className="text-xs text-orange-500 font-bold">Yeni</span>
    </div>
  );
}
