export default function ForumListItem({ item }) {
  return (
    <div
      className="
  w-full p-4 rounded-lg border transition
  bg-white border-slate-200 hover:bg-slate-50
  dark:bg-[#1E293B] dark:border-[#273244] dark:hover:bg-[#223044]
"
    >
      {/* ÜST KISIM — Avatar + Başlık */}
      <div className="flex items-center gap-4 mb-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-lg bg-gray-500 overflow-hidden flex-shrink-0">
          {item.avatar ? (
            <img src={item.avatar} className="w-full h-full object-cover" />
          ) : (
            <div
              className="
  w-full h-full flex items-center justify-center text-xl font-bold
  bg-slate-200 text-slate-800
  dark:bg-[#0F172A] dark:text-white
"
            >
              {item.username[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* Başlık + info */}
        <div className="flex-1">
          <div className="font-semibold text-lg leading-tight">
            {item.title}
          </div>

          <div className="text-sm opacity-70 mt-1">
            {item.username} • {item.date} • {item.category}
          </div>
        </div>
      </div>

      {/* ALT KISIM — Replies / Views / Last */}
      <div className="grid grid-cols-3 text-center gap-4 sm:flex sm:items-center sm:justify-end sm:gap-8">
        {/* Replies */}
        <div>
          <div className="font-semibold">{item.replies}</div>
          <div className="text-xs opacity-60">Cevaplar</div>
        </div>

        {/* Views */}
        <div>
          <div className="font-semibold">{item.views}</div>
          <div className="text-xs opacity-60">Görüntüleme</div>
        </div>

        {/* Last message */}
        <div>
          <div className="opacity-60 text-xs">{item.lastActivity}</div>
          <div className="opacity-60 text-xs">{item.lastUser}</div>
        </div>

        {/* Avatar (only desktop right side) */}
        <div className="hidden sm:flex w-10 h-10 rounded-lg bg-green-600 items-center justify-center text-white font-bold">
          {item.lastUserInitial}
        </div>
      </div>
    </div>
  );
}
