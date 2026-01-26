const express = require("express");
const cors = require("cors");
require("dotenv").config();
const http = require("http");
const { Server } = require("socket.io");

// Environment checks
if (!process.env.MONGO_URI) {
  console.error("Missing MONGO_URI in .env");
  process.exit(1);
}
if (!process.env.JWT_SECRET) {
  console.warn("Warning: JWT_SECRET not set. Auth may fail.");
}

// DB & Routes
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const projectRoutes = require("./routes/projectRoutes");
const boardRoutes = require("./routes/boardRoutes");
const taskRoutes = require("./routes/taskRoutes");
const commentRoutes = require("./routes/commentRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const activityRoutes = require("./routes/activityRoutes");
const devRoutes = require("./routes/devRoutes");

const protect = require("./middleware/authMiddleware");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: { origin: true, methods: ["GET", "POST", "PUT"] }
});

// Attach io to app for controllers
app.set("io", io);

// Socket.IO connection
io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join project room
  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
    console.log(`Socket ${socket.id} joined project room: ${projectId}`);
  });

  // Join user room for personal notifications
  socket.on("joinUser", (userId) => {
    const room = `user:${userId}`;
    socket.join(room);
    console.log(`Socket ${socket.id} joined user room: ${room}`);
  });

  // Broadcast task update
  socket.on("taskUpdated", ({ projectId }) => {
    socket.to(projectId).emit("refreshTasks");
  });

  // Broadcast comment added
  socket.on("commentAdded", ({ projectId }) => {
    socket.to(projectId).emit("refreshComments");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activity", activityRoutes);
// Dev-only helpers
app.use("/api/dev", devRoutes);

// Test route
app.get("/", (req, res) => res.send("Project Management API Running"));

// Protected test
app.get("/api/protected", protect, (req, res) => {
  res.json({ message: "Protected route accessed", user: req.user });
});

// Global error handling
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Start server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
