import fetch from "node-fetch";
import { store } from "./dataStore.js";
import { calculateStandings } from "./calculateStandings.js";
import { getLeagueSeason } from "./leagueConfig.js";
import dotenv from "dotenv";

dotenv.config();

const BASE = "https://v3.football.api-sports.io";

export async function fetchLeagueData(leagueId) {
  if (store.standings[leagueId]) return; // cache

  const season = getLeagueSeason(leagueId);
  if (!season) return;

  const res = await fetch(
    `${BASE}/fixtures?league=${leagueId}&season=${season}`,
    {
      headers: {
        "x-apisports-key": `${process.env.API_FOOTBALL_KEY}`,
      },
    }
  );

  const json = await res.json();
  store.fixtures[leagueId] = json.response ?? [];
  store.standings[leagueId] = calculateStandings(store.fixtures[leagueId]);
}
