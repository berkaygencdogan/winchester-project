import { useEffect, useState } from "react";
import { useMatch } from "../../hooks/useMatch";

import EventsView from "./EventsView";
import StatsView from "./StatsView";
import LineupsView from "./LineupsView";
import PlayersView from "./PlayersView";
import MatchDetailSkeleton from "./MatchDetailSkeleton";

export default function MatchDetailPanel() {
  const { selectedMatchId } = useMatch();

  const [activeTab, setActiveTab] = useState("STATISTICS");

  const [info, setInfo] = useState(null);
  const [stats, setStats] = useState([]);
  const [events, setEvents] = useState([]);
  const [lineups, setLineups] = useState([]);
  const [players, setPlayers] = useState([]);

  // MATCH INFO — FIXTURES.JSON'DAN ÇEKİLİYOR
  useEffect(() => {
    if (!selectedMatchId) return;

    fetch("/mock/fixtures_fener_gs.json")
      .then((res) => res.json())
      .then((list) => {
        const match = list.find((m) => m.fixture.id === selectedMatchId);
        setInfo(match);
      });
  }, [selectedMatchId]);

  // TAB'A GÖRE MOCK DATA ÇEKİLİYOR
  useEffect(() => {
    if (!selectedMatchId) return;

    if (activeTab === "STATISTICS") {
      fetch(`/mock/statistics_fener_gs.json`)
        .then((res) => res.json())
        .then(setStats);
    }

    if (activeTab === "EVENTS") {
      fetch(`/mock/events_fener_gs.json`)
        .then((res) => res.json())
        .then(setEvents);
    }

    if (activeTab === "LINEUPS") {
      fetch(`/mock/lineups_fener_gs.json`)
        .then((res) => res.json())
        .then(setLineups);
    }

    if (activeTab === "PLAYERS") {
      fetch(`/mock/players_fener_gs.json`)
        .then((res) => res.json())
        .then(setPlayers);
    }
  }, [activeTab, selectedMatchId]);

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
      </div>

      {/* TAB BAR */}
      <div className="flex gap-3 mb-4">
        {["EVENTS", "STATISTICS", "LINEUPS", "PLAYERS"].map((t) => (
          <button
            key={t}
            onClick={() => setActiveTab(t)}
            className={`px-4 py-1 rounded-lg ${
              activeTab === t ? "bg-orange-600" : "bg-[#1B2534]"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      {activeTab === "EVENTS" && <EventsView data={events} info={info} />}
      {activeTab === "STATISTICS" &&
        (stats.length ? (
          <StatsView data={stats} />
        ) : (
          <p className="text-center text-gray-500">İstatistik yok.</p>
        ))}
      {activeTab === "LINEUPS" && <LineupsView data={lineups} />}
      {activeTab === "PLAYERS" && <PlayersView data={players} />}
    </div>
  );
}

function Team({ team }) {
  return (
    <div className="text-center">
      <img src={team.logo} className="w-12 h-12 mx-auto" />
      <p>{team.name}</p>
    </div>
  );
}
