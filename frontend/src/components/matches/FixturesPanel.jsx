import { useEffect, useState } from "react";
import { useMatch } from "../../hooks/useMatch";
import axios from "axios";

export default function FixturesPanel() {
  const [fixtures, setFixtures] = useState([]);
  const [filter, setFilter] = useState("ALL"); // <-- TAB STATE
  const { setSelectedMatchId } = useMatch();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/matches/fixtures/today")
      .then((res) => setFixtures(res.data));
  }, []);

  // ---- FİLTRE ----
  const filterFixtures = fixtures.filter((match) => {
    const status = match.fixture.status.short;

    if (filter === "ALL") return true;

    if (filter === "LIVE")
      return ["1H", "2H", "HT", "ET", "P", "LIVE"].includes(status);

    if (filter === "FINISHED") return ["FT", "AET", "PEN"].includes(status);

    if (filter === "SCHEDULED") return status === "NS";

    return true;
  });

  return (
    <div className="p-3">
      {/* TAB BAR */}
      <div className="flex gap-3 mb-3">
        {["ALL", "LIVE", "FINISHED", "SCHEDULED"].map((t) => (
          <button
            key={t}
            onClick={() => setFilter(t)}
            className={`px-4 py-1 rounded-md text-sm transition 
              ${
                filter === t
                  ? "bg-orange-600 text-white"
                  : "bg-[#1B2534] hover:bg-[#223044]"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* MAÇ LİSTESİ */}
      {filterFixtures.map((match) => (
        <div
          key={match.fixture.id}
          onClick={() => setSelectedMatchId(match.fixture.id)}
          className="mb-4 bg-[#1B2534] p-3 rounded-md cursor-pointer hover:bg-[#273244]"
        >
          <div className="text-xs text-green-400 font-bold mb-1">
            {match.fixture.status.short}
          </div>

          <TeamRow team={match.teams.home} goals={match.goals.home} />
          <TeamRow team={match.teams.away} goals={match.goals.away} />
        </div>
      ))}
    </div>
  );
}

function TeamRow({ team, goals }) {
  return (
    <div className="flex justify-between items-center py-1">
      <div className="flex items-center gap-2">
        <img src={team.logo} className="w-5 h-5" />
        <span>{team.name}</span>
      </div>
      <span>{goals ?? "-"}</span>
    </div>
  );
}
