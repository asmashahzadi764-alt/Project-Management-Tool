const mongoose = require("mongoose");

const activitySchema = new mongoose.Schema(
  {
    projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    action: { type: String, required: true }, // e.g. "created_task", "updated_status"
    payload: { type: Object }
  },
  { timestamps: true }
);

module.exports = mongoose.model("ActivityLog", activitySchema);
