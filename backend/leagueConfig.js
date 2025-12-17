import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const raw = fs.readFileSync(path.join(__dirname, "api.json"), "utf8");
const data = JSON.parse(raw);

export function getAllLeagues() {
  return data.leagues.map((l) => {
    const season =
      l.seasons.find((s) => s.current && s.coverage.fixtures)?.year ?? null;

    return {
      leagueId: l.league.id,
      name: l.league.name,
      country: l.league.country,
      season,
    };
  });
}

export function getLeagueSeason(leagueId) {
  const item = data.leagues.find((l) => l.league.id === leagueId);
  if (!item) return null;

  return (
    item.seasons.find((s) => s.current && s.coverage.fixtures)?.year ?? null
  );
}
