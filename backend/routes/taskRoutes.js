const express = require("express");
const router = express.Router();

const {
  createTask,
  getTasksByProject,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createTask);
router.get("/:projectId", authMiddleware, getTasksByProject);
router.put("/:taskId", authMiddleware, updateTask);
router.delete("/:taskId", authMiddleware, deleteTask);

module.exports = router;
