const Board = require("../models/Board");
const Project = require("../models/Project");

// CREATE BOARD
exports.createBoard = async (req, res) => {
  try {
    const { projectId, title } = req.body;
    if (!projectId || !title) {
      return res.status(400).json({ message: "Project ID and title required" });
    }
    const project = await Project.findById(projectId);
    if (!project || !project.members.includes(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }
    const board = await Board.create({ projectId, title });
    res.status(201).json(board);
  } catch (error) {
    console.error("createBoard error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET BOARDS BY PROJECT
exports.getBoards = async (req, res) => {
  try {
    const { projectId } = req.params;
    let boards = await Board.find({ projectId }).sort("order");

    // agar boards exist nahi karti toh 3 default boards auto-create karo
    if (!boards || boards.length === 0) {
      const defaultBoards = [
        { projectId, title: "To Do", order: 0 },
        { projectId, title: "In Progress", order: 1 },
        { projectId, title: "Done", order: 2 },
      ];
      boards = await Board.insertMany(defaultBoards);
    }

    const Task = require("../models/Task");
    const boardsWithTasks = await Promise.all(
      boards.map(async (b) => {
        const tasks = await Task.find({ boardId: b._id }).populate(
          "assignedTo",
          "name email"
        );
        return { ...b.toObject(), tasks };
      })
    );
    res.json(boardsWithTasks);
  } catch (error) {
    console.error("getBoards error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
