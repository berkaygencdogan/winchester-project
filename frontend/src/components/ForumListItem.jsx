export default function ForumListItem({ item }) {
  return (
    <div className="w-full bg-[#1E293B] p-4 rounded-lg flex justify-between items-center border border-[#273244] hover:bg-[#223044] transition">
      {/* SOL KISIM */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-lg bg-gray-500 overflow-hidden">
          {item.avatar ? (
            <img src={item.avatar} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#0F172A] flex items-center justify-center text-xl font-bold">
              {item.username[0].toUpperCase()}
            </div>
          )}
        </div>

        {/* Başlık + info */}
        <div>
          <div className="font-semibold text-lg">{item.title}</div>

          <div className="text-sm opacity-70">
            {item.username} • {item.date} • {item.category}
          </div>
        </div>
      </div>

      {/* SAĞ KISIM */}
      <div className="flex items-center gap-6">
        {/* Cevaplar */}
        <div className="text-right">
          <div className="font-semibold">{item.replies}</div>
          <div className="text-xs opacity-60">Cevaplar</div>
        </div>

        {/* Görüntülenme */}
        <div className="text-right">
          <div className="font-semibold">{item.views}</div>
          <div className="text-xs opacity-60">Görüntüleme</div>
        </div>

        {/* Son mesaj */}
        <div className="text-right">
          <div className="opacity-60 text-xs">{item.lastActivity}</div>
          <div className="opacity-60 text-xs">{item.lastUser}</div>
        </div>

        {/* Sağdaki küçük avatar */}
        <div className="w-10 h-10 rounded-lg bg-green-600 flex items-center justify-center text-white font-bold">
          {item.lastUserInitial}
        </div>
      </div>
    </div>
  );
}
