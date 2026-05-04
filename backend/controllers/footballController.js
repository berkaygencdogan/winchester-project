import axios from "axios";
import fs from "fs";
import path from "path";

const API_ENABLED = true;
const FOOTBALL_API_BASE = "https://v3.football.api-sports.io";

const CACHE_DIR = path.resolve("cache");
const TODAY_CACHE_FILE = path.join(CACHE_DIR, "football-today.json");
const LIVE_CACHE_FILE = path.join(CACHE_DIR, "football-live.json");

const TODAY_CACHE_TTL_MS = 5 * 60 * 1000;
const LIVE_CACHE_TTL_MS = 30 * 1000;

function ensureCacheDir() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
  }
}

function readCache(file) {
  ensureCacheDir();

  if (!fs.existsSync(file)) {
    return { timestamp: null, data: null };
  }

  try {
    return JSON.parse(fs.readFileSync(file, "utf-8"));
  } catch {
    return { timestamp: null, data: null };
  }
}

function writeCache(file, data) {
  ensureCacheDir();

  fs.writeFileSync(
    file,
    JSON.stringify(
      {
        timestamp: Date.now(),
        data,
      },
      null,
      2,
    ),
  );
}

function cacheIsValid(cache, ttl) {
  return (
    cache.timestamp &&
    Date.now() - cache.timestamp < ttl &&
    Array.isArray(cache.data)
  );
}

function getTodayUTC() {
  return new Date().toISOString().split("T")[0];
}

function checkApiKey() {
  if (!process.env.FOOTBALL_API_KEY) {
    throw new Error("FOOTBALL_API_KEY .env içinde tanımlı değil.");
  }
}

async function footballGet(endpoint, params = {}) {
  checkApiKey();

  const response = await axios.get(`${FOOTBALL_API_BASE}${endpoint}`, {
    headers: {
      "x-apisports-key": process.env.FOOTBALL_API_KEY,
    },
    params,
    timeout: 20000,
  });

  return response.data;
}

function formatFixture(m) {
  return {
    id: m.fixture?.id,
    date: m.fixture?.date,
    timestamp: m.fixture?.timestamp,
    minute: m.fixture?.status?.elapsed,

    status: {
      long: m.fixture?.status?.long,
      short: m.fixture?.status?.short,
      elapsed: m.fixture?.status?.elapsed,
    },

    league: {
      id: m.league?.id,
      name: m.league?.name,
      country: m.league?.country,
      logo: m.league?.logo,
      flag: m.league?.flag,
      season: m.league?.season,
      round: m.league?.round,
    },

    home: {
      id: m.teams?.home?.id,
      name: m.teams?.home?.name,
      logo: m.teams?.home?.logo,
      winner: m.teams?.home?.winner,
    },

    away: {
      id: m.teams?.away?.id,
      name: m.teams?.away?.name,
      logo: m.teams?.away?.logo,
      winner: m.teams?.away?.winner,
    },

    score: {
      home: m.goals?.home,
      away: m.goals?.away,
      halftime: m.score?.halftime,
      fulltime: m.score?.fulltime,
      extratime: m.score?.extratime,
      penalty: m.score?.penalty,
    },

    venue: {
      id: m.fixture?.venue?.id,
      name: m.fixture?.venue?.name,
      city: m.fixture?.venue?.city,
    },
  };
}

export function health(req, res) {
  res.json({
    success: true,
    status: "ok",
  });
}

export async function getTodayFixtures(req, res) {
  try {
    const cache = readCache(TODAY_CACHE_FILE);

    if (cacheIsValid(cache, TODAY_CACHE_TTL_MS)) {
      return res.json({
        success: true,
        source: "cache",
        count: cache.data.length,
        data: cache.data,
      });
    }

    if (!API_ENABLED) {
      return res.status(403).json({
        success: false,
        error: "API_DISABLED",
      });
    }

    const data = await footballGet("/fixtures", {
      date: getTodayUTC(),
    });

    const fixtures = (data.response || []).map(formatFixture);

    writeCache(TODAY_CACHE_FILE, fixtures);

    return res.json({
      success: true,
      source: "api",
      count: fixtures.length,
      data: fixtures,
    });
  } catch (err) {
    console.error("FOOTBALL TODAY ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "FOOTBALL_TODAY_FETCH_FAILED",
      message: err.message,
    });
  }
}

export async function getLiveFixtures(req, res) {
  try {
    const cache = readCache(LIVE_CACHE_FILE);

    if (cacheIsValid(cache, LIVE_CACHE_TTL_MS)) {
      return res.json({
        success: true,
        source: "cache",
        count: cache.data.length,
        data: cache.data,
      });
    }

    if (!API_ENABLED) {
      return res.status(403).json({
        success: false,
        error: "API_DISABLED",
      });
    }

    const data = await footballGet("/fixtures", {
      live: "all",
    });

    const matches = (data.response || []).map(formatFixture);

    writeCache(LIVE_CACHE_FILE, matches);

    return res.json({
      success: true,
      source: "api",
      count: matches.length,
      data: matches,
    });
  } catch (err) {
    console.error("FOOTBALL LIVE ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "FOOTBALL_LIVE_FETCH_FAILED",
      message: err.message,
    });
  }
}

export async function getMatchEvents(req, res) {
  try {
    const data = await footballGet("/fixtures/events", {
      fixture: req.params.id,
    });

    return res.json({
      success: true,
      fixture_id: Number(req.params.id),
      count: data.response?.length || 0,
      data: data.response || [],
    });
  } catch (err) {
    console.error("EVENTS API ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "EVENTS_FETCH_FAILED",
    });
  }
}

export async function getMatchStatistics(req, res) {
  try {
    const data = await footballGet("/fixtures/statistics", {
      fixture: req.params.id,
    });

    return res.json({
      success: true,
      fixture_id: Number(req.params.id),
      count: data.response?.length || 0,
      data: data.response || [],
    });
  } catch (err) {
    console.error("STATISTICS API ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "STATISTICS_FETCH_FAILED",
    });
  }
}

export async function getMatchLineups(req, res) {
  try {
    const data = await footballGet("/fixtures/lineups", {
      fixture: req.params.id,
    });

    return res.json({
      success: true,
      fixture_id: Number(req.params.id),
      count: data.response?.length || 0,
      data: data.response || [],
    });
  } catch (err) {
    console.error("LINEUPS API ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "LINEUPS_FETCH_FAILED",
    });
  }
}

export async function getMatchPlayers(req, res) {
  try {
    const data = await footballGet("/fixtures/players", {
      fixture: req.params.id,
    });

    return res.json({
      success: true,
      fixture_id: Number(req.params.id),
      count: data.response?.length || 0,
      data: data.response || [],
    });
  } catch (err) {
    console.error("PLAYERS API ERROR:", err.response?.data || err.message);

    return res.status(500).json({
      success: false,
      error: "PLAYERS_FETCH_FAILED",
    });
  }
}
