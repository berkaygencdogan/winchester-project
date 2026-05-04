import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import EventsView from "./EventsView";
import StatsView from "./StatsView";
import LineupsView from "./LineupsView";
import PlayersView from "./PlayersView";
import MatchDetailSkeleton from "./MatchDetailSkeleton";
import { useOnceFetch } from "../../hooks/useOneFetch";

const API = "http://localhost:5050";

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

  const [loadingInfo, setLoadingInfo] = useState(true);
  const [loadingTab, setLoadingTab] = useState(false);

  useEffect(() => {
    async function fetchMatchInfo() {
      try {
        setLoadingInfo(true);

        const res = await fetch(`${API}/api/football/today`);
        const json = await res.json();

        const match = (json.data || []).find((m) => Number(m.id) === matchId);

        setInfo(match || null);
      } catch (err) {
        console.error("MATCH INFO ERROR:", err);
      } finally {
        setLoadingInfo(false);
      }
    }

    fetchMatchInfo();
  }, [matchId]);

  useEffect(() => {
    if (!matchId || !info) return;

    const key = `${matchId}_${activeTab}`;

    if (!canFetch(key)) return;

    let endpoint = "";

    if (activeTab === "STATISTICS") {
      endpoint = `${API}/api/football/${matchId}/statistics`;
    }

    if (activeTab === "EVENTS") {
      endpoint = `${API}/api/football/${matchId}/events`;
    }

    if (activeTab === "LINEUPS") {
      endpoint = `${API}/api/football/${matchId}/lineups`;
    }

    if (activeTab === "PLAYERS") {
      endpoint = `${API}/api/football/${matchId}/players`;
    }

    if (!endpoint) return;

    setLoadingTab(true);

    fetch(endpoint)
      .then((res) => res.json())
      .then((json) => {
        const data = json.data || [];

        if (activeTab === "STATISTICS") setStats(data);
        if (activeTab === "EVENTS") setEvents(data);
        if (activeTab === "LINEUPS") setLineups(data);
        if (activeTab === "PLAYERS") setPlayers(data);
      })
      .catch(console.error)
      .finally(() => setLoadingTab(false));
  }, [activeTab, matchId, info, canFetch]);

  if (loadingInfo || !info) return <MatchDetailSkeleton />;

  const home = info.home;
  const away = info.away;

  const isLive = ["1H", "2H", "HT", "ET", "P", "LIVE"].includes(
    info.status?.short,
  );

  return (
    <div className="p-4">
      <div className="text-center mb-4">
        <div className="flex justify-center gap-6 items-center">
          <Team team={home} />

          <div className="text-3xl font-bold">
            {info.score?.home ?? "-"} - {info.score?.away ?? "-"}
          </div>

          <Team team={away} />
        </div>

        <p className="text-orange-400 mt-1 font-semibold">
          {info.status?.long}
        </p>

        {isLive && (
          <div className="mt-1">
            <span className="inline-block text-xs bg-red-500 text-white px-2 py-0.5 rounded">
              LIVE {info.minute ? `${info.minute}'` : ""}
            </span>
          </div>
        )}
      </div>

      <div className="flex gap-3 mb-4">
        {["EVENTS", "STATISTICS", "LINEUPS", "PLAYERS"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1 rounded-lg transition ${
              activeTab === t
                ? "bg-orange-600 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-[#1B2534] dark:text-gray-300"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

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
      <img src={team?.logo} className="w-12 h-12 mx-auto" alt={team?.name} />
      <p>{team?.name}</p>
    </div>
  );
}
