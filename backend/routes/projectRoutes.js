const express = require("express");
const router = express.Router();

const { createProject, getProjects } = require("../controllers/projectController");
const protect = require("../middleware/authMiddleware");   // 🔥 add this

router.post("/", protect, createProject);  // 🔥 protect
router.get("/", protect, getProjects);     // 🔥 protect

module.exports = router;
