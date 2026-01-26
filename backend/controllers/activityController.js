const ActivityLog = require("../models/ActivityLog");

exports.getProjectActivity = async (req, res) => {
  try {
    const { projectId } = req.params;
    const activities = await ActivityLog.find({ projectId }).sort({ createdAt: -1 }).limit(100);
    res.json(activities);
  } catch (err) {
    console.error("getProjectActivity error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
