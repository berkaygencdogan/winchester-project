function SidebarLeft() {
  return (
    <div
      className="
  p-4 rounded-xl space-y-3
  bg-white border border-slate-200
  dark:bg-[#1E293B] dark:border-gray-700
"
    >
      {/* Category boxes */}
      <div
        className="
    h-12 rounded-lg border cursor-pointer transition
    bg-slate-100 border-slate-300 hover:bg-slate-200
    dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
  "
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-12 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>

      {/* Tags */}
      <div
        className="
    h-12 rounded-lg border cursor-pointer transition
    bg-slate-100 border-slate-300 hover:bg-slate-200
    dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
  "
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-10 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>

      {/* Pinned Groups */}
      <div
        className="
    h-12 rounded-lg border cursor-pointer transition
    bg-slate-100 border-slate-300 hover:bg-slate-200
    dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
  "
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-14 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>
    </div>
  );
}

export default SidebarLeft;
