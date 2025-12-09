function SidebarLeft() {
  return (
    <div className="space-y-6">
      {/* Category boxes */}
      <div className="bg-[#1E293B] p-4 rounded-xl space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-12 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>

      {/* Tags */}
      <div className="bg-[#1E293B] p-4 rounded-xl space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-10 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>

      {/* Pinned Groups */}
      <div className="bg-[#1E293B] p-4 rounded-xl space-y-3">
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
