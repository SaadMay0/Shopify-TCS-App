import express from "express";

import {
  postPreferences,
  getPreference,
  postFragile,
  getFragile,
} from "../services/shopify/preferences.js";

const router = express.Router();

// GET  METHOD

router.get("/getPreference", getPreference);
router.get("/getFragile", getFragile);

// POST  METHOD
router.post("/postPreferences", postPreferences);

router.post("/postFragile", postFragile);

// PUT  METHOD

export default router;
