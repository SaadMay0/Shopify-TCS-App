import express from "express";

import {
  countryList,
  stationList,
  cityList,
  placeOrder,
  placeOrderByCN,
  orderCancel,
  trackCODorder,
  orderReverse,
  costCenterCod,
  pickupStatus,
  paymentDetails,
  paymentInvoiceDetails,
} from "../../services/helper_functions/tcs/cod.js";

const router = express.Router();

// GET  METHOD
router.get("/getcountrylist", countryList);
router.get("/getstationList", stationList);
router.get("/getcitiesList", cityList);
router.get("/trackCODorder", trackCODorder);
router.get("/pickupStatus", pickupStatus);
router.get("/paymentDetails", paymentDetails);
router.get("/paymentInvoiceDetails", paymentInvoiceDetails);
// POST  METHOD
router.post("/placeOrder", placeOrder);
router.post("/placeOrderByCN", placeOrderByCN);
router.post("/orderReverse", orderReverse);
router.post("/costCenterCod", costCenterCod);
// PUT  METHOD
router.put("/orderCancel", orderCancel);

export default router;