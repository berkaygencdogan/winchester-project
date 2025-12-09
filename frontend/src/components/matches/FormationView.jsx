import { getFormationPositions } from "./formationLayout";

export default function FormationView({ formation, players, side }) {
  const isHome = side === "home";

  const XI = players.map((p) => p.player);
  const positions = getFormationPositions(formation, isHome);

  return (
    <div className="relative mx-auto field w-[520px] h-[420px] bg-[#0a4f20] border-[3px] border-[#1E7D32] rounded-xl shadow-inner">
      {/* Center Line */}
      <div className="absolute left-1/2 top-0 w-[2px] h-full bg-white/20 -translate-x-1/2"></div>

      {/* Center Circle */}
      <div className="absolute left-1/2 top-1/2 w-[80px] h-[80px] rounded-full border-2 border-white/20 -translate-x-1/2 -translate-y-1/2"></div>

      {/* Penalty Areas */}
      <div className="absolute left-0 top-[100px] w-[140px] h-[220px] border-2 border-white/20 border-l-0"></div>
      <div className="absolute right-0 top-[100px] w-[140px] h-[220px] border-2 border-white/20 border-r-0"></div>

      {/* PLAYERS */}
      {XI.map((p, i) => {
        const pos = positions[i];
        if (!pos) return null;

        return (
          <div
            key={p.id}
            className="absolute flex items-center justify-center w-[42px] h-[42px] bg-blue-500 rounded-full border-2 border-white text-white font-bold text-sm"
            style={{
              top: pos.y,
              left: pos.x,
            }}
          >
            {p.number}
          </div>
        );
      })}
    </div>
  );
}
