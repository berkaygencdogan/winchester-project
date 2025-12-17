import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import Skeleton from "./ui/Skeleton";

export default function MatchList() {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedMatchId } = useMatch();

  useEffect(() => {
    let cancelled = false;

    async function fetchMatches() {
      try {
        const res = await fetch("http://localhost:5000/api/matches/today");
        const json = await res.json();

        // Backend { source, data } dönüyor
        if (!cancelled) {
          setMatches(json.data || []);
        }
      } catch (err) {
        console.error("MATCH FETCH ERROR:", err);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchMatches();

    return () => {
      cancelled = true;
    };
  }, []);

  const handleClick = (match) => {
    const id = match.fixture.id;
    setSelectedMatchId(id);
    navigate(`/matches/${id}`);
  };

  if (loading) {
    return (
      <div className="space-y-3 p-3">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="p-2 rounded-lg bg-slate-100 dark:bg-[#1E293B]"
          >
            <Skeleton className="p-2 rounded-lg" />
            <Skeleton className="p-2 rounded-lg mt-2" />
          </div>
        ))}
      </div>
    );
  }

  if (!matches || matches.length === 0) {
    return <div className="text-center text-gray-400 py-6">Maç yok..</div>;
  }

  return (
    <div className="p-3 space-y-2">
      {matches.map((m) => (
        <div
          key={m.fixture.id}
          onClick={() => handleClick(m)}
          className="
            rounded-lg p-3 cursor-pointer transition
            bg-white border border-slate-200 hover:bg-slate-50
            dark:bg-[#1E293B] dark:hover:bg-[#233044] dark:border-gray-700
          "
        >
          <p className="text-sm text-gray-400">{m.league.name}</p>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <img
                src={m.teams.home.logo}
                alt={m.teams.home.name}
                className="w-6 h-6"
              />
              <span>{m.teams.home.name}</span>
            </div>

            <span className="font-bold">
              {m.goals.home} - {m.goals.away}
            </span>

            <div className="flex items-center gap-2">
              <span>{m.teams.away.name}</span>
              <img
                src={m.teams.away.logo}
                alt={m.teams.away.name}
                className="w-6 h-6"
              />
            </div>
          </div>

          <p className="text-orange-400 text-sm mt-1">
            {m.fixture.status.long}
          </p>
        </div>
      ))}
    </div>
  );
}
