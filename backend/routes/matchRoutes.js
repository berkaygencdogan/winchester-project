import express from "express";
import {
  getTodayFixtures,
  getMatchEvents,
  getMatchLineups,
  getMatchStats,
  getMatchPlayers,
} from "../controllers/matchesController.js";

const router = express.Router();

router.get("/fixtures/today", getTodayFixtures);
router.get("/fixtures/:id/events", getMatchEvents);
router.get("/fixtures/:id/lineups", getMatchLineups);
router.get("/fixtures/:id/statistics", getMatchStats);
router.get("/fixtures/:id/players", getMatchPlayers);

export default router;
