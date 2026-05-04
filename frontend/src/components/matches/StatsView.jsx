export default function StatsView({ data }) {
  if (!data || data.length === 0) {
    return <p className="text-center text-gray-500">İstatistik yok.</p>;
  }

  const homeStats = data[0]?.statistics ?? [];
  const awayStats = data[1]?.statistics ?? [];

  return (
    <div className="space-y-4">
      {homeStats.map((stat, i) => {
        const homeVal = normalizeValue(stat.value);
        const awayVal = normalizeValue(awayStats[i]?.value);

        return (
          <div key={i}>
            <div className="flex justify-between text-sm mb-1">
              <span>{stat.type}</span>
              <span>
                {stat.value ?? "-"} - {awayStats[i]?.value ?? "-"}
              </span>
            </div>

            <StatBar home={homeVal} away={awayVal} />
          </div>
        );
      })}
    </div>
  );
}

function normalizeValue(v) {
  if (v == null) return 0;

  if (typeof v === "string") {
    if (v.includes("%")) return parseInt(v.replace("%", ""), 10) || 0;
    return parseInt(v, 10) || 0;
  }

  return Number(v) || 0;
}

function StatBar({ home, away }) {
  const total = home + away || 1;

  return (
    <div className="flex h-2 rounded overflow-hidden">
      <div
        className="bg-green-500"
        style={{ width: `${(home / total) * 100}%` }}
      />
      <div
        className="bg-yellow-500"
        style={{ width: `${(away / total) * 100}%` }}
      />
    </div>
  );
}
