function SidebarRight() {
  return (
    <div
      className="
  p-4 rounded-xl space-y-3
  bg-white border border-slate-200
  dark:bg-[#1E293B] dark:border-gray-700
"
    >
      {/* Meetup Card */}
      <div
        className="
    h-20 rounded-lg border cursor-pointer transition
    bg-slate-100 border-slate-300 hover:bg-slate-200
    dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
  "
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-20 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>

      {/* Podcasts Card */}
      <div
        className="
    h-20 rounded-lg border cursor-pointer transition
    bg-slate-100 border-slate-300 hover:bg-slate-200
    dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
  "
      >
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-16 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>
    </div>
  );
}

export default SidebarRight;
