export default function StatsView({ data }) {
  if (!data || data.length === 0) return null;

  const homeStats = data[0]?.statistics ?? [];
  const awayStats = data[1]?.statistics ?? [];

  return (
    <div className="space-y-4">
      {homeStats.map((stat, i) => {
        const homeVal = normalizeValue(stat.value);
        const awayVal = normalizeValue(awayStats[i]?.value);

        return (
          <div key={i}>
            {/* Başlık */}
            <div className="flex justify-between text-sm mb-1">
              <span>{stat.type}</span>
              <span>
                {stat.value} - {awayStats[i]?.value}
              </span>
            </div>

            {/* BAR GRAFİK */}
            <StatBar home={homeVal} away={awayVal} />
          </div>
        );
      })}
    </div>
  );
}

/* % veya sayı fark etmeksizin normalize eder */
function normalizeValue(v) {
  if (v == null) return 0;

  if (typeof v === "string") {
    if (v.includes("%")) return parseInt(v.replace("%", ""));
    return parseInt(v);
  }

  return v;
}

/* BAR ÇİZİMİ */
function StatBar({ home, away }) {
  const total = home + away || 1;

  return (
    <div className="flex h-2 rounded overflow-hidden">
      <div
        className="bg-green-500"
        style={{ width: `${(home / total) * 100}%` }}
      ></div>
      <div
        className="bg-yellow-500"
        style={{ width: `${(away / total) * 100}%` }}
      ></div>
    </div>
  );
}
