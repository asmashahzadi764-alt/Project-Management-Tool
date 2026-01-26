const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { getProjectActivity } = require("../controllers/activityController");

router.get("/project/:projectId", protect, getProjectActivity);

module.exports = router;
