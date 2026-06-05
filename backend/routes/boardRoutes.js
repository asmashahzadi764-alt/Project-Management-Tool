const express = require("express");
const router = express.Router();
const Board = require("../models/Board");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

router.get("/:projectId", protect, async (req, res) => {
  try {
    const { projectId } = req.params;

    // us project ki boards fetch karo
    let boards = await Board.find({ projectId }).sort("order");

    // agar boards nahi hain toh 3 default boards auto-create karo
    if (!boards || boards.length === 0) {
      boards = await Board.insertMany([
        { name: "To Do", projectId, order: 0 },
        { name: "In Progress", projectId, order: 1 },
        { name: "Done", projectId, order: 2 },
      ]);
    }

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
