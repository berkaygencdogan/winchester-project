import { useEffect, useState } from "react";
import { useMatch } from "../../hooks/useMatch";

const API = "http://localhost:5050";

export default function FixturesPanel() {
  const [fixtures, setFixtures] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const { setSelectedMatchId } = useMatch();

  useEffect(() => {
    fetch(`${API}/api/football/today`)
      .then((res) => res.json())
      .then((json) => setFixtures(json.data || []))
      .catch(console.error);
  }, []);

  const filterFixtures = fixtures.filter((match) => {
    const status = match.status?.short;

    if (filter === "ALL") return true;
    if (filter === "LIVE") {
      return ["1H", "2H", "HT", "ET", "P", "LIVE"].includes(status);
    }
    if (filter === "FINISHED") {
      return ["FT", "AET", "PEN"].includes(status);
    }
    if (filter === "SCHEDULED") {
      return status === "NS";
    }

    return true;
  });

  return (
    <div className="p-3">
      <div className="flex gap-3 mb-3">
        {["ALL", "LIVE", "FINISHED", "SCHEDULED"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1 rounded-md text-sm ${
              filter === t
                ? "bg-orange-600 text-white"
                : "bg-slate-100 dark:bg-[#1B2534]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {filterFixtures.map((match) => (
        <div
          key={match.id}
          onClick={() => setSelectedMatchId(match.id)}
          className="mb-4 p-3 rounded-md cursor-pointer bg-white dark:bg-[#1B2534]"
        >
          <div className="text-xs font-bold mb-1 text-green-600">
            {match.status?.short}
          </div>

          <TeamRow team={match.home} goals={match.score?.home} />
          <TeamRow team={match.away} goals={match.score?.away} />
        </div>
      ))}
    </div>
  );
}

function TeamRow({ team, goals }) {
  return (
    <div className="flex justify-between items-center py-1">
      <div className="flex items-center gap-2">
        <img src={team?.logo} className="w-5 h-5" alt={team?.name} />
        <span>{team?.name}</span>
      </div>

      <span className="font-semibold">{goals ?? "-"}</span>
    </div>
  );
}
