const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

router.get("/:projectId", protect, async (req, res) => {
  try {
    const { projectId } = req.params;

    // Boards (Backlog, To Do, In Progress)
    const boards = await Board.find();  

    const boardsWithTasks = await Promise.all(
      boards.map(async (board) => {
        const tasks = await Task.find({
          boardId: board._id,
          projectId: projectId,
        });

        return {
          ...board.toObject(),
          tasks,
        };
      })
    );

    res.json(boardsWithTasks);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
