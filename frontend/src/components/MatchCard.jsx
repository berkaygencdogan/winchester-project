export default function MatchCard({ match }) {
  const fixture = match.fixture;
  const teams = match.teams;

  const time = new Date(fixture.date).toLocaleTimeString("tr-TR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  const status = fixture.status.short; // "NS" / "1H" / "FT" vs.

  return (
    <div className="bg-[#0F172A] p-3 rounded-lg border border-[#1E2636] hover:border-[#334155] transition mb-3">
      {/* LİG ADI */}
      <div className="text-xs opacity-50 mb-2">{match.league.name}</div>

      <div className="flex items-center justify-between">
        {/* TAKIMLAR */}
        <div className="flex flex-col gap-1">
          {/* Ev takımı */}
          <div className="flex items-center gap-2">
            <img src={teams.home.logo} className="w-5 h-5" />
            <span>{teams.home.name}</span>
          </div>

          {/* Deplasman */}
          <div className="flex items-center gap-2">
            <img src={teams.away.logo} className="w-5 h-5" />
            <span>{teams.away.name}</span>
          </div>
        </div>

        {/* SCORE / SAAT */}
        <div className="text-right">
          {status === "NS" && <div className="text-sm opacity-80">{time}</div>}

          {status !== "NS" && (
            <div className="font-bold text-lg">
              {fixture.status.long === "Match Finished"
                ? `${match.goals.home} - ${match.goals.away}`
                : `${match.goals.home ?? 0} - ${match.goals.away ?? 0}`}
            </div>
          )}

          {/* MAÇ DURUMU */}
          <div className="text-xs opacity-60">{fixture.status.short}</div>
        </div>
      </div>
    </div>
  );
}
