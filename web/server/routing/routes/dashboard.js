import express from "express";

import {
  shiping,
  getOrders,
  searchOrders,
  filteredBaseOrders,
  getAllCities,
} from "../services/shopify/dashboard.js";

const router = express.Router();

// GET  METHOD
router.get("/filtringOrder", filteredBaseOrders);
router.get("/searchOrders", searchOrders);

router.get("/getorders", getOrders);

// POST  METHOD
router.get("/shiping", shiping);

// PUT  METHOD

router.get("/getAllCities", getAllCities);

export default router;
