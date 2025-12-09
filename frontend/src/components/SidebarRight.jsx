function SidebarRight() {
  return (
    <div className="space-y-6">
      {/* Meetup Card */}
      <div className="bg-[#1E293B] p-4 rounded-xl space-y-3">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="bg-[#0F172A] h-20 rounded-lg border border-[#273244] hover:bg-[#162033] cursor-pointer transition"
          />
        ))}
      </div>

      {/* Podcasts Card */}
      <div className="bg-[#1E293B] p-4 rounded-xl space-y-3">
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
