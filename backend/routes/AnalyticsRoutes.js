const express = require("express");
const router = express.Router();
const { getAnalyticsSummary } = require("../controllers/AnalyticsController");

router.get("/summary", getAnalyticsSummary);

module.exports = router;