import express from "express";

import {
  shipingOrders,
  costCenter,
  cancelOrder,
  reverseOrder,
  trackSingleOrder,
  trackMultipleOrder,
  reversMultipleOrder,
  cancelMultipleOrder,
  shipSingleOrder,
} from "../../services/tcs/cod.js";

const router = express.Router();

// GET  METHOD

router.post("/abc/trackSingleOrder", trackSingleOrder);
router.post("/trackMultipleOrders", trackMultipleOrder);

// POST  METHOD
router.post("/placeMultipleOrders", shipingOrders);
router.post("/placeOrder", shipSingleOrder);

router.post("/costCenter", costCenter);

router.post("/reversSingleOrder", reverseOrder);
router.post("/reversMultipleOrder", reversMultipleOrder);

// PUT  METHOD
router.post("/cancelSingleOrder", cancelOrder);
router.post("/cancelMultipleOrder", cancelMultipleOrder);

export default router;
