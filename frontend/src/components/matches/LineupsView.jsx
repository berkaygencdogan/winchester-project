import FormationView from "./FormationView";

export default function LineupsView({ data }) {
  if (!data || data.length === 0) {
    return (
      <div className="text-center text-gray-400 py-6">
        Diziliş bilgisi bulunamadı.
      </div>
    );
  }

  const [home, away] = data;

  return (
    <div className="space-y-10 mt-6">
      {/* ----------------------------------------------- */}
      {/* ÜST BİLGİ BÖLÜMÜ */}
      {/* ----------------------------------------------- */}
      <div className="flex justify-between items-center px-4">
        {/* LEFT TEAM */}
        <TeamHeader
          team={home.team}
          coach={home.coach}
          formation={home.formation}
          align="left"
        />

        {/* CENTER SCORE AREA (LineupsView içinde skor yok ama opsiyonel eklenebilir) */}
        <div className="text-center">
          <h2 className="text-xl font-bold">Lineups</h2>
        </div>

        {/* RIGHT TEAM */}
        <TeamHeader
          team={away.team}
          coach={away.coach}
          formation={away.formation}
          align="right"
        />
      </div>

      {/* ----------------------------------------------- */}
      {/* FORMATION FIELDS */}
      {/* ----------------------------------------------- */}
      <div className="grid grid-cols-2 gap-6">
        {/* HOME FIELD */}
        <div>
          <FormationView
            formation={home.formation}
            players={home.startXI}
            side="home"
          />
        </div>

        {/* AWAY FIELD */}
        <div>
          <FormationView
            formation={away.formation}
            players={away.startXI}
            side="away"
          />
        </div>
      </div>

      {/* ----------------------------------------------- */}
      {/* STARTING XI LISTS */}
      {/* ----------------------------------------------- */}
      <div className="grid grid-cols-2 gap-6">
        <PlayerList title="Starting XI" list={home.startXI} />
        <PlayerList title="Starting XI" list={away.startXI} />
      </div>

      {/* ----------------------------------------------- */}
      {/* SUBSTITUTES LISTS */}
      {/* ----------------------------------------------- */}
      <div className="grid grid-cols-2 gap-6">
        <PlayerList title="Substitutes" list={home.substitutes} />
        <PlayerList title="Substitutes" list={away.substitutes} />
      </div>
    </div>
  );
}

/* ----------------------------------------------------- */
/* TAKIM BAŞLIK ALANI */
/* ----------------------------------------------------- */

function TeamHeader({ team, coach, formation, align }) {
  const logo =
    team?.logo ||
    team?.team?.logo || // olası alternatif
    team?.teamDetails?.logo ||
    "";

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
        <p className="text-gray-300 text-sm">Coach: {coachName}</p>
        <p className="text-orange-400 font-semibold">{formation || "-"}</p>
      </div>
    </div>
  );
}

/* ----------------------------------------------------- */
/* PLAYER LIST TABLE (Starting XI / Substitutes) */
/* ----------------------------------------------------- */

function PlayerList({ title, list }) {
  return (
    <div>
      <h3 className="text-lg font-semibold mb-3">{title}</h3>

      <div className="bg-[#1E293B] rounded-xl p-4 shadow-lg">
        {list.length === 0 ? (
          <p className="text-gray-400 text-sm">Veri yok.</p>
        ) : (
          <table className="w-full text-left border-separate border-spacing-y-2">
            <thead className="text-gray-400 text-sm">
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
                  className="bg-[#243244] hover:bg-[#2d3b4f] transition rounded-lg"
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
