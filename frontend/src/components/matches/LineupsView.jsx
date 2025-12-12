import FormationView from "./FormationView";

export default function LineupsView({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-slate-500 dark:text-gray-400 py-6">
        Diziliş bilgisi bulunamadı.
      </div>
    );
  }

  const [home, away] = data;

  return (
    <div className="space-y-10 mt-6">
      {/* ================= HOME TEAM ================= */}
      <TeamHeader
        team={home.team}
        coach={home.coach}
        formation={home.formation}
        align="left"
      />

      {/* HOME FIELD */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-[320px] sm:max-w-[400px]">
          <FormationView
            formation={home.formation}
            players={home.startXI}
            side="home"
          />
        </div>
      </div>

      {/* HOME STARTING XI */}
      <PlayerList title="Starting XI" list={home.startXI} />

      {/* HOME SUBS */}
      <PlayerList title="Substitutes" list={home.substitutes} />

      {/* ================= AWAY TEAM ================= */}
      <TeamHeader
        team={away.team}
        coach={away.coach}
        formation={away.formation}
        align="right"
      />

      {/* AWAY FIELD */}
      <div className="w-full flex justify-center mt-4">
        <div className="w-full max-w-[320px] sm:max-w-[400px]">
          <FormationView
            formation={away.formation}
            players={away.startXI}
            side="away"
          />
        </div>
      </div>

      {/* AWAY STARTING XI */}
      <PlayerList title="Starting XI" list={away.startXI} />

      {/* AWAY SUBS */}
      <PlayerList title="Substitutes" list={away.substitutes} />
    </div>
  );
}

/* ======================================================
   TEAM HEADER
====================================================== */
function TeamHeader({ team, coach, formation, align }) {
  const logo = team?.logo || team?.team?.logo || team?.teamDetails?.logo || "";
  const name =
    team?.name || team?.team?.name || team?.teamDetails?.name || "Unknown Team";
  const coachName = coach?.name || "Unknown Coach";

  return (
    <div
      className={`flex items-center gap-3 ${
        align === "right" ? "flex-row-reverse text-right" : ""
      }`}
    >
      <img src={logo} className="w-12 h-12 rounded-lg" alt={name} />

      <div>
        <p className="text-lg font-bold">{name}</p>
        <p className="text-sm text-slate-500 dark:text-gray-300">
          Coach: {coachName}
        </p>
        <p className="text-orange-500 font-semibold">{formation || "-"}</p>
      </div>
    </div>
  );
}

/* ======================================================
   PLAYER LIST
====================================================== */
function PlayerList({ title, list }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div
        className="
          rounded-xl p-4
          bg-white border border-slate-200
          dark:bg-[#1E293B] dark:border-gray-700
        "
      >
        {list.length === 0 ? (
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
              {list.map((p, i) => (
                <tr
                  key={i}
                  className="
                    transition rounded-lg
                    bg-slate-100 hover:bg-slate-200
                    dark:bg-[#243244] dark:hover:bg-[#2d3b4f]
                  "
                >
                  <td className="px-3 py-2">{p.player.number}</td>
                  <td className="px-3 py-2">{p.player.name}</td>
                  <td className="px-3 py-2">{p.player.pos}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
