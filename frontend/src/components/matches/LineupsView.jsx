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
    <div className="mt-6">
      {/* ================= DESKTOP: YAN YANA ================= */}
      <div className="hidden sm:grid grid-cols-2 gap-8">
        {/* ========== HOME COLUMN ========== */}
        <div className="space-y-6">
          <TeamHeader
            team={home.team}
            coach={home.coach}
            formation={home.formation}
          />

          <FormationWrapper>
            <FormationView
              formation={home.formation}
              players={home.startXI}
              side="home"
            />
          </FormationWrapper>

          <PlayerList title="Starting XI" list={home.startXI} />
          <PlayerList title="Substitutes" list={home.substitutes} />
        </div>

        {/* ========== AWAY COLUMN ========== */}
        <div className="space-y-6">
          <TeamHeader
            team={away.team}
            coach={away.coach}
            formation={away.formation}
            align="right"
          />

          <FormationWrapper>
            <FormationView
              formation={away.formation}
              players={away.startXI}
              side="away"
            />
          </FormationWrapper>

          <PlayerList title="Starting XI" list={away.startXI} />
          <PlayerList title="Substitutes" list={away.substitutes} />
        </div>
      </div>

      {/* ================= MOBILE: ALT ALTA ================= */}
      <div className="sm:hidden space-y-10">
        {/* HOME */}
        <div className="space-y-6">
          <TeamHeader
            team={home.team}
            coach={home.coach}
            formation={home.formation}
          />

          <FormationWrapper>
            <FormationView
              formation={home.formation}
              players={home.startXI}
              side="home"
            />
          </FormationWrapper>

          <PlayerList title="Starting XI" list={home.startXI} />
          <PlayerList title="Substitutes" list={home.substitutes} />
        </div>

        {/* AWAY */}
        <div className="space-y-6">
          <TeamHeader
            team={away.team}
            coach={away.coach}
            formation={away.formation}
          />

          <FormationWrapper>
            <FormationView
              formation={away.formation}
              players={away.startXI}
              side="away"
            />
          </FormationWrapper>

          <PlayerList title="Starting XI" list={away.startXI} />
          <PlayerList title="Substitutes" list={away.substitutes} />
        </div>
      </div>
    </div>
  );
}

/* ======================================================
   TEAM HEADER
====================================================== */
function TeamHeader({ team, coach, formation, align }) {
  const logo = team?.logo || team?.team?.logo || "";
  const name = team?.name || team?.team?.name || "Unknown Team";
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
   FORMATION WRAPPER (SABİT GENİŞLİK)
====================================================== */
function FormationWrapper({ children }) {
  return (
    <div className="w-full flex justify-center">
      <div className="max-w-[520px] w-full">{children}</div>
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
