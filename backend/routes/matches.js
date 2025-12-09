import express from "express";
import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

const API_BASE = "https://v3.football.api-sports.io";
const API_KEY = process.env.FOOTBALL_API_KEY;

const headers = {
  "x-apisports-key": API_KEY,
};

// ÜLKELER
router.get("/countries", async (req, res) => {
  try {
    const response = await axios.get(`${API_BASE}/countries`, { headers });
    res.json(response.data.response);
  } catch (err) {
    console.error("COUNTRIES API ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Countries fetch failed" });
  }
});

// BUGÜNKÜ MAÇLAR (fixture listesi)
router.get("/fixtures/today", async (req, res) => {
  const today = new Date().toISOString().split("T")[0];

  try {
    const response = await axios.get(`${API_BASE}/fixtures?date=${today}`, {
      headers,
    });
    res.json(response.data.response);
  } catch (err) {
    console.error(
      "FIXTURES TODAY API ERROR:",
      err.response?.data || err.message
    );
    res.status(500).json({ error: "Fixtures fetch failed" });
  }
});

// MAÇ DETAYI / İSTATİSTİK
router.get("/fixtures/:id/statistics", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_BASE}/fixtures/statistics?fixture=${req.params.id}`,
      { headers }
    );
    res.json(response.data.response);
  } catch (err) {
    console.error("STATS API ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Match statistics fetch failed" });
  }
});

// MAÇ OLAYLARI
router.get("/fixtures/:id/events", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_BASE}/fixtures/events?fixture=${req.params.id}`,
      { headers }
    );
    res.json(response.data.response);
  } catch (err) {
    console.error("EVENTS API ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Events fetch failed" });
  }
});

// MAÇ KADROLAR
router.get("/fixtures/:id/lineups", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_BASE}/fixtures/lineups?fixture=${req.params.id}`,
      { headers }
    );
    res.json(response.data.response);
  } catch (err) {
    console.error("LINEUPS API ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Lineups fetch failed" });
  }
});

// MAÇ OYUNCULAR
router.get("/fixtures/:id/players", async (req, res) => {
  try {
    const response = await axios.get(
      `${API_BASE}/fixtures/players?fixture=${req.params.id}`,
      { headers }
    );
    res.json(response.data.response);
  } catch (err) {
    console.error("PLAYERS API ERROR:", err.response?.data || err.message);
    res.status(500).json({ error: "Players fetch failed" });
  }
});

export default router;
