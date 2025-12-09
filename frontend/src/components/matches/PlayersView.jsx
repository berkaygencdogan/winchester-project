import { Square, CircleUserRound } from "lucide-react";

export default function PlayersView({ data }) {
  if (!data || data.length === 0) return null;

  const [home, away] = data;

  return (
    <div className="space-y-10 mt-6">
      <TeamPlayersBlock team={home.team} players={home.players} />
      <TeamPlayersBlock team={away.team} players={away.players} />
    </div>
  );
}

/* -------------------- TAKIM BLOĞU -------------------- */
function TeamPlayersBlock({ team, players }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{team.name}</h2>

      <table className="w-full text-left border-separate border-spacing-y-2">
        <thead className="text-gray-400 text-sm">
          <tr>
            <th className="w-10">#</th>
            <th>Oyuncu</th>
            <th className="w-24">Pozisyon</th>
            <th className="w-20 text-center">Rating</th>
          </tr>
        </thead>

        <tbody>
          {players.map((p, i) => (
            <PlayerRow key={i} player={p} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* -------------------- TEK SATIR OYUNCU -------------------- */
function PlayerRow({ player }) {
  const stats = player.statistics?.[0] || {};

  const number = stats.games?.number || player.player?.number || "-";
  const rating = stats.games?.rating || "-";
  const pos = stats.games?.position || player.player?.pos || "-";

  const yellow = stats.cards?.yellow || 0;
  const red = stats.cards?.red || 0;

  return (
    <tr className="bg-[#1E293B] hover:bg-[#273445] transition rounded-lg">
      {/* FORM NO */}
      <td className="px-3 py-2">
        <div className="w-9 h-9 rounded-full bg-[#0F172A] flex items-center justify-center text-sm font-bold">
          {number}
        </div>
      </td>

      {/* OYUNCU ADI + KARTLAR */}
      <td className="px-3 py-2 flex items-center gap-2">
        <CircleUserRound size={18} className="text-gray-300" />
        <span>{player.player?.name || "Unknown"}</span>

        {yellow > 0 && <Square size={14} className="text-yellow-400" />}
        {red > 0 && <Square size={14} className="text-red-500" />}
      </td>

      {/* POZISYON */}
      <td className="px-3 py-2 text-gray-300">{pos}</td>

      {/* RATING */}
      <td className="px-3 py-2 text-center font-semibold text-yellow-400">
        {rating}
      </td>
    </tr>
  );
}
