const Task = require("../models/Task");
const Project = require("../models/Project");

/* ================= CREATE TASK ================= */
exports.createTask = async (req, res) => {
  try {
    const { title, projectId, boardId, description } = req.body;

    if (!title || !projectId || !boardId) {
      return res.status(400).json({ message: "All fields required" });
    }

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const members = project.members || [];

    const isMember =
      (project.createdBy && project.createdBy.toString() === req.user._id.toString()) ||
      members.some((m) => m.toString() === req.user._id.toString());

    if (!isMember) return res.status(403).json({ message: "Not authorized" });

    const task = await Task.create({
      title,
      description,
      projectId,
      boardId,
      createdBy: req.user._id
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET TASKS BY PROJECT ================= */
exports.getTasksByProject = async (req, res) => {
  try {
    const { projectId } = req.params;

    const project = await Project.findById(projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const members = project.members || [];

    const isMember =
      (project.createdBy && project.createdBy.toString() === req.user._id.toString()) ||
      members.some((m) => m.toString() === req.user._id.toString());

    if (!isMember) return res.status(403).json({ message: "Not authorized" });

    const tasks = await Task.find({ projectId }).populate("boardId", "name");
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE TASK ================= */
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.findById(task.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const members = project.members || [];

    const isMember =
      (project.createdBy && project.createdBy.toString() === req.user._id.toString()) ||
      members.some((m) => m.toString() === req.user._id.toString());

    if (!isMember) return res.status(403).json({ message: "Not authorized" });

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;
    task.boardId = req.body.boardId || task.boardId;

    await task.save();
    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE TASK ================= */
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ message: "Task not found" });

    const project = await Project.findById(task.projectId);
    if (!project) return res.status(404).json({ message: "Project not found" });

    const members = project.members || [];

    const isMember =
      (project.createdBy && project.createdBy.toString() === req.user._id.toString()) ||
      members.some((m) => m.toString() === req.user._id.toString());

    if (!isMember) return res.status(403).json({ message: "Not authorized" });

    await task.deleteOne();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
