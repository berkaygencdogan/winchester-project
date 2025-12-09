import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMatch } from "../hooks/useMatch";
import Skeleton from "./ui/Skeleton";

export default function MatchList() {
  const [matches, setMatches] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { setSelectedMatchId } = useMatch(); // ← ÖNEMLİ

  useEffect(() => {
    fetch("/mock/fixtures_fener_gs.json")
      .then((res) => res.json())
      .then((data) => {
        setMatches(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
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
          <div key={i} className="p-2 bg-[#1E293B] rounded-lg">
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
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
          onClick={() => handleClick(m)} // ← MAÇA TIKLA → DETAY AÇ
          className="bg-[#1E293B] rounded-lg p-3 cursor-pointer hover:bg-[#233044] transition"
        >
          <p className="text-sm text-gray-400">{m.league.name}</p>

          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center gap-2">
              <img src={m.teams.home.logo} className="w-6 h-6" />
              <span>{m.teams.home.name}</span>
            </div>

            <span className="font-bold">
              {m.goals.home} - {m.goals.away}
            </span>

            <div className="flex items-center gap-2">
              <span>{m.teams.away.name}</span>
              <img src={m.teams.away.logo} className="w-6 h-6" />
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
