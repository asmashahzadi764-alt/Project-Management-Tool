const Notification = require("../models/Notification");

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user._id })
      .sort({ createdAt: -1 });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.markRead = async (req, res) => {
  try {
    const noti = await Notification.findById(req.params.id);
    if (!noti) return res.status(404).json({ message: "Not found" });

    noti.read = true;
    await noti.save();
    res.json({ message: "Marked read" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
