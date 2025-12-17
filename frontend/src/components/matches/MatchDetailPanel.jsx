import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventsView from "./EventsView";
import StatsView from "./StatsView";
import LineupsView from "./LineupsView";
import PlayersView from "./PlayersView";
import MatchDetailSkeleton from "./MatchDetailSkeleton";
import { useOnceFetch } from "../../hooks/useOneFetch";

export default function MatchDetailPanel() {
  const { id } = useParams();
  const { canFetch } = useOnceFetch();
  const matchId = Number(id);

  const [activeTab, setActiveTab] = useState("STATISTICS");

  const [info, setInfo] = useState(null);
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [players, setPlayers] = useState([]);

  const [loadingTab, setLoadingTab] = useState(false);

  // ================= MATCH INFO (CACHE'Lİ TODAY ENDPOINT) =================
  useEffect(() => {
    async function fetchMatchInfo() {
      try {
        const res = await fetch("/api/matches/today");
        const json = await res.json();

        const match = (json.data || []).find((m) => m.fixture.id === matchId);

        setInfo(match || null);
      } catch (err) {
        console.error("MATCH INFO ERROR:", err);
      }
    }

    fetchMatchInfo();
  }, [matchId]);

  // ================= TAB DATA =================
  useEffect(() => {
    if (!matchId || !info) return;

    const status = info.fixture.status.short;
    const key = `${matchId}_${activeTab}`;

    // ❌ aynı tab için tekrar fetch yok
    if (!canFetch(key)) return;

    let endpoint = "";

    if (activeTab === "STATISTICS")
      endpoint = `/api/matches/${matchId}/statistics?status=${status}`;

    if (activeTab === "EVENTS")
      endpoint = `/api/matches/${matchId}/events?status=${status}`;

    if (activeTab === "LINEUPS")
      endpoint = `/api/matches/${matchId}/lineups?status=${status}`;

    if (activeTab === "PLAYERS") endpoint = `/api/matches/${matchId}/players`; // players cache yok ama nadir

    if (!endpoint) return;

    setLoadingTab(true);

    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        if (activeTab === "STATISTICS") setStats(data || []);
        if (activeTab === "EVENTS") setEvents(data || []);
        if (activeTab === "LINEUPS") setLineups(data || []);
        if (activeTab === "PLAYERS") setPlayers(data || []);
      })
      .catch(console.error)
      .finally(() => setLoadingTab(false));
  }, [activeTab, matchId, info]);

  if (!info) return <MatchDetailSkeleton />;

  const home = info.teams.home;
  const away = info.teams.away;

  return (
    <div className="p-4">
      {/* SCORE */}
      <div className="text-center mb-4">
        <div className="flex justify-center gap-6 items-center">
          <Team team={home} />
          <div className="text-3xl font-bold">
            {info.goals.home} - {info.goals.away}
          </div>
          <Team team={away} />
        </div>

        <p className="text-orange-400 mt-1 font-semibold">
          {info.fixture.status.long}
        </p>

        {["1H", "2H", "HT", "LIVE"].includes(info.fixture.status.short) && (
          <div className="mt-1">
            <span className="inline-block text-xs bg-red-500 text-white px-2 py-0.5 rounded">
              LIVE
            </span>
          </div>
        )}
      </div>

      {/* TAB BAR */}
      <div className="flex gap-3 mb-4">
        {["EVENTS", "STATISTICS", "LINEUPS", "PLAYERS"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1 rounded-lg transition
              ${
                activeTab === t
                  ? "bg-orange-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1B2534] dark:text-gray-300"
              }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {loadingTab && (
        <p className="text-center text-gray-400 py-6">Yükleniyor…</p>
      )}

      {!loadingTab && activeTab === "EVENTS" && (
        <EventsView data={events} info={info} />
      )}

      {!loadingTab &&
        activeTab === "STATISTICS" &&
        (stats.length ? (
          <StatsView data={stats} />
        ) : (
          <p className="text-center text-gray-500">İstatistik yok.</p>
        ))}

      {!loadingTab && activeTab === "LINEUPS" && <LineupsView data={lineups} />}

      {!loadingTab && activeTab === "PLAYERS" && <PlayersView data={players} />}
    </div>
  );
}

function Team({ team }) {
  return (
    <div className="text-center">
      <img src={team.logo} className="w-12 h-12 mx-auto" alt={team.name} />
      <p>{team.name}</p>
    </div>
  );
}
