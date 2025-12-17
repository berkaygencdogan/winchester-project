import express from "express";
import axios from "axios";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

// ================= API KİLİDİ =================
const API_LOCKED = true;

// ================= API CONFIG =================
const FOOTBALL_API_BASE = "https://v3.football.api-sports.io";
const FOOTBALL_HEADERS = {
  "x-apisports-key": process.env.FOOTBALL_API_KEY,
};

// ================= CACHE CONFIG =================
const CACHE_DIR = path.resolve("cache");
const CACHE_FILE = path.join(CACHE_DIR, "football-today.json");

function ensureCacheFile() {
  if (!fs.existsSync(CACHE_DIR)) {
    fs.mkdirSync(CACHE_DIR);
  }

  if (!fs.existsSync(CACHE_FILE)) {
    fs.writeFileSync(
      CACHE_FILE,
      JSON.stringify({ date: null, data: null }, null, 2)
    );
  }
}

function readCache() {
  ensureCacheFile();
  return JSON.parse(fs.readFileSync(CACHE_FILE, "utf-8"));
}

function writeCache(date, data) {
  fs.writeFileSync(CACHE_FILE, JSON.stringify({ date, data }, null, 2));
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

// ================= ROUTES =================

// 🔒 API çağrısı YAPMAYAN örnek route
router.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ✅ GÜNLÜK TEK API İSTEĞİ (CACHE'Lİ)
router.get("/today", async (req, res) => {
  const today = getToday();
  const cache = readCache();

  // Cache geçerliyse
  if (cache.date === today && cache.data) {
    return res.json({
      source: "cache",
      data: cache.data,
    });
  }

  // API KİLİDİ sadece burada AÇILIYOR
  if (!API_LOCKED) {
    return res.status(403).json({
      error: "API_DISABLED",
    });
  }

  try {
    const response = await axios.get(
      `${FOOTBALL_API_BASE}/fixtures?date=${today}`,
      { headers: FOOTBALL_HEADERS }
    );

    writeCache(today, response.data.response);

    return res.json({
      source: "api",
      data: response.data.response,
    });
  } catch (err) {
    console.error("FOOTBALL API ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "FOOTBALL_FETCH_FAILED" });
  }
});

router.get("/:id/players", async (req, res) => {
  const fixtureId = req.params.id;

  try {
    const response = await axios.get(
      `${FOOTBALL_API_BASE}/fixtures/players?fixture=${fixtureId}`,
      { headers: FOOTBALL_HEADERS }
    );

    res.json(response.data.response);
  } catch (err) {
    console.error("PLAYERS API ERROR:", err.message);
    res.status(500).json({ error: "PLAYERS_FETCH_FAILED" });
  }
});

router.get("/:id/events", async (req, res) => {
  const fixtureId = req.params.id;

  try {
    const response = await axios.get(
      `${FOOTBALL_API_BASE}/fixtures/events?fixture=${fixtureId}`,
      { headers: FOOTBALL_HEADERS }
    );

    res.json(response.data.response);
  } catch (err) {
    console.error("EVENTS API ERROR:", err.message);
    res.status(500).json({ error: "EVENTS_FETCH_FAILED" });
  }
});

router.get("/:id/statistics", async (req, res) => {
  const fixtureId = req.params.id;

  try {
    const response = await axios.get(
      `${FOOTBALL_API_BASE}/fixtures/statistics?fixture=${fixtureId}`,
      { headers: FOOTBALL_HEADERS }
    );

    res.json(response.data.response);
  } catch (err) {
    console.error("STATISTICS API ERROR:", err.message);
    res.status(500).json({ error: "STATISTICS_FETCH_FAILED" });
  }
});

router.get("/:id/lineups", async (req, res) => {
  const fixtureId = req.params.id;

  try {
    const response = await axios.get(
      `${FOOTBALL_API_BASE}/fixtures/lineups?fixture=${fixtureId}`,
      { headers: FOOTBALL_HEADERS }
    );

    res.json(response.data.response);
  } catch (err) {
    console.error("LINEUPS API ERROR:", err.message);
    res.status(500).json({ error: "LINEUPS_FETCH_FAILED" });
  }
});

export default router;
