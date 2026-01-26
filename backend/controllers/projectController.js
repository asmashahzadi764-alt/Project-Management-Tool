const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Project title required" });
    }

    const project = await Project.create({
      title,
      description,
      createdBy: req.user._id,
      members: [req.user._id],
    });

    res.status(201).json(project);
  } catch (err) {
    console.error("createProject error:", err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getProjects = async (req, res) => {
  try {
    // only show projects of logged in user
    const projects = await Project.find({
      members: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
