import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(file) {
  const fullPath = path.join(__dirname, "..", "mock", file);
  return JSON.parse(fs.readFileSync(fullPath));
}

// ============================
// 📌 Today Fixtures
// ============================
export function getTodayFixtures(req, res) {
  try {
    const data = loadJSON("fixtures.json");
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "fixtures.json okunamadı" });
  }
}

// ============================
// 📌 Events
// ============================
export function getMatchEvents(req, res) {
  try {
    const id = req.params.id;
    const data = loadJSON(`events_${id}.json`);
    res.json(data);
  } catch {
    res.json([]);
  }
}

// ============================
// 📌 Lineups
// ============================
export function getMatchLineups(req, res) {
  try {
    const id = req.params.id;
    const data = loadJSON(`lineups_${id}.json`);
    res.json(data);
  } catch {
    res.json([]);
  }
}

// ============================
// 📌 Statistics
// ============================
export function getMatchStats(req, res) {
  try {
    const id = req.params.id;
    const data = loadJSON(`statistics_${id}.json`);
    res.json(data);
  } catch {
    res.json([]);
  }
}

// ============================
// 📌 Players
// ============================
export function getMatchPlayers(req, res) {
  try {
    const id = req.params.id;
    const data = loadJSON(`players_${id}.json`);
    res.json(data);
  } catch {
    res.json([]);
  }
}
