export default function ForumListItem({ item }) {
  return (
    <div
      className="
        w-full p-4 rounded-lg border transition
        bg-white text-slate-800 border-slate-200 hover:bg-slate-50
        dark:bg-[#1E293B] dark:text-white dark:border-[#273244] dark:hover:bg-[#223044]
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
                w-full h-full flex items-center justify-center
                text-xl font-bold
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
          <div className="font-semibold text-lg leading-tight text-slate-900 dark:text-white">
            {item.title}
          </div>

          <div className="text-sm mt-1 text-slate-600 dark:text-gray-400">
            {item.username} • {item.date} • {item.category}
          </div>
        </div>
      </div>

      {/* ALT KISIM — Replies / Views / Last */}
      <div className="grid grid-cols-3 text-center gap-4 sm:flex sm:items-center sm:justify-end sm:gap-8">
        {/* Replies */}
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">
            {item.replies}
          </div>
          <div className="text-xs text-slate-500 dark:text-gray-400">
            Cevaplar
          </div>
        </div>

        {/* Views */}
        <div>
          <div className="font-semibold text-slate-900 dark:text-white">
            {item.views}
          </div>
          <div className="text-xs text-slate-500 dark:text-gray-400">
            Görüntüleme
          </div>
        </div>

        {/* Last message */}
        <div>
          <div className="text-xs text-slate-500 dark:text-gray-400">
            {item.lastActivity}
          </div>
          <div className="text-xs text-slate-500 dark:text-gray-400">
            {item.lastUser}
          </div>
        </div>

        {/* Avatar (only desktop right side) */}
        <div
          className="
          hidden sm:flex w-10 h-10 rounded-lg
          bg-green-600 items-center justify-center
          text-white font-bold
        "
        >
          {item.lastUserInitial}
        </div>
      </div>
    </div>
  );
}
