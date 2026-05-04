import { CircleUserRound } from "lucide-react";

export default function PlayersView({ data }) {
  if (!data || data.length === 0) {
    return (
      <p className="text-center text-slate-500 dark:text-gray-400 py-6">
        Oyuncu bilgisi yok.
      </p>
    );
  }

  const [home, away] = data;

  return (
    <div className="space-y-10 mt-6">
      {home && (
        <TeamPlayersBlock
          team={home.team}
          startXI={home.startXI || []}
          substitutes={home.substitutes || []}
        />
      )}

      {away && (
        <TeamPlayersBlock
          team={away.team}
          startXI={away.startXI || []}
          substitutes={away.substitutes || []}
        />
      )}
    </div>
  );
}

function TeamPlayersBlock({ team, startXI, substitutes }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{team?.name}</h2>

      <PlayerTable title="İlk 11" players={startXI} />
      <PlayerTable title="Yedekler" players={substitutes} />
    </div>
  );
}

function PlayerTable({ title, players }) {
  return (
    <div className="mb-6 rounded-xl p-4 bg-white border border-slate-200 dark:bg-[#1E293B] dark:border-gray-700">
      <h3 className="font-semibold mb-3">{title}</h3>

      {!players.length ? (
        <p className="text-sm text-slate-500 dark:text-gray-400">Veri yok.</p>
      ) : (
        <table className="w-full text-left border-separate border-spacing-y-2">
          <thead className="text-sm text-slate-500 dark:text-gray-400">
            <tr>
              <th className="w-10">#</th>
              <th>Oyuncu</th>
              <th className="w-24">Pozisyon</th>
            </tr>
          </thead>

          <tbody>
            {players.map((p, i) => (
              <PlayerRow key={i} item={p} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

function PlayerRow({ item }) {
  const player = item.player || {};

  return (
    <tr className="transition rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-[#1E293B] dark:hover:bg-[#273445]">
      <td className="px-3 py-2">{player.number ?? "-"}</td>

      <td className="px-3 py-2 flex items-center gap-2">
        <CircleUserRound
          size={18}
          className="text-slate-500 dark:text-gray-300"
        />
        <span>{player.name || "Unknown"}</span>
      </td>

      <td className="px-3 py-2 text-slate-500 dark:text-gray-300">
        {player.pos || "-"}
      </td>
    </tr>
  );
}
