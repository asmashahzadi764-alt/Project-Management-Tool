const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    role: {
      type: String,
      enum: ["Admin", "Member"],
      default: "Member"
    },
    // optional teams/projects user belongs to (denormalized)
    teams: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project"
      }
    ]
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
