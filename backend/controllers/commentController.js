const Comment = require("../models/Comment");
const Task = require("../models/Task");
const Project = require("../models/Project");

// ADD COMMENT
exports.addComment = async (req, res) => {
  const { taskId, message } = req.body;

  if (!taskId || !message) {
    return res.status(400).json({ message: "Task ID and message required" });
  }

  // Check task exists
  const task = await Task.findById(taskId);
  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  // Check project membership
  const project = await Project.findById(task.projectId);
  if (!project.members.includes(req.user._id)) {
    return res.status(403).json({ message: "Not authorized" });
  }

  const comment = await Comment.create({
    taskId,
    userId: req.user._id,
    message
  });

  // Activity log
  await require("../models/ActivityLog").create({
    projectId: project._id,
    userId: req.user._id,
    action: "added_comment",
    payload: { taskId, commentId: comment._id, message }
  });

  // Notify task assignee (if different) and emit sockets
  const taskAssignee = task.assignedTo;
  if (taskAssignee && taskAssignee.toString() !== req.user._id.toString()) {
    const Notification = require("../models/Notification");
    const notification = await Notification.create({
      userId: taskAssignee,
      type: "comment",
      payload: { taskId, commentId: comment._id, message, commentedBy: req.user._id }
    });

    const io = req.app.get("io");
    if (io) {
      io.to(project._id.toString()).emit("commentAdded", comment);
      io.to(`user:${taskAssignee}`).emit("notification", notification);
    }
  } else {
    const io = req.app.get("io");
    if (io) io.to(project._id.toString()).emit("commentAdded", comment);
  }

  res.status(201).json(comment);
};

// GET COMMENTS BY TASK
exports.getComments = async (req, res) => {
  const { taskId } = req.params;

  const comments = await Comment.find({ taskId })
    .populate("userId", "name email")
    .sort("createdAt");

  res.json(comments);
};
