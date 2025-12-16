function SidebarLeft() {
  return (
    <div
      className="
        p-4 rounded-xl space-y-3
        bg-white border border-slate-200
        text-slate-800
        dark:bg-[#1E293B] dark:border-gray-700 dark:text-white
      "
    >
      {/* Category boxes */}
      <div
        className="
          space-y-2
        "
      >
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              h-12 rounded-lg border cursor-pointer transition
              bg-slate-100 border-slate-300 hover:bg-slate-200
              dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
            "
          />
        ))}
      </div>

      {/* Tags */}
      <div className="space-y-2">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="
              h-10 rounded-lg border cursor-pointer transition
              bg-slate-100 border-slate-300 hover:bg-slate-200
              dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
            "
          />
        ))}
      </div>

      {/* Pinned Groups */}
      <div className="space-y-2">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="
              h-14 rounded-lg border cursor-pointer transition
              bg-slate-100 border-slate-300 hover:bg-slate-200
              dark:bg-[#0F172A] dark:border-[#273244] dark:hover:bg-[#162033]
            "
          />
        ))}
      </div>
    </div>
  );
}

export default SidebarLeft;
