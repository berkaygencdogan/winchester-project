import express from "express";

import {
  health,
  getTodayFixtures,
  getLiveFixtures,
  getMatchEvents,
  getMatchStatistics,
  getMatchLineups,
  getMatchPlayers,
} from "../controllers/footballController.js";

const router = express.Router();

router.get("/health", health);
router.get("/today", getTodayFixtures);
router.get("/live", getLiveFixtures);

router.get("/:id/events", getMatchEvents);
router.get("/:id/statistics", getMatchStatistics);
router.get("/:id/lineups", getMatchLineups);
router.get("/:id/players", getMatchPlayers);

export default router;
