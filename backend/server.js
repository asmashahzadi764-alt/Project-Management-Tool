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

// ----------------------
// CORS CONFIG (FIXED)
// ----------------------
const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:3000",
  "https://project-management-tool-six-olive.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"]
}));

app.options("/*splat", cors());

// Middleware
app.use(express.json());

// ----------------------
// SOCKET.IO SETUP (FIXED)
// ----------------------
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
  }
});

// Attach io to app
app.set("io", io);

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("joinProject", (projectId) => {
    socket.join(projectId);
  });

  socket.on("joinUser", (userId) => {
    socket.join(`user:${userId}`);
  });

  socket.on("taskUpdated", ({ projectId }) => {
    socket.to(projectId).emit("refreshTasks");
  });

  socket.on("commentAdded", ({ projectId }) => {
    socket.to(projectId).emit("refreshComments");
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

// ----------------------
// DATABASE
// ----------------------
connectDB();

// ----------------------
// ROUTES
// ----------------------
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/notifications", notificationRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/dev", devRoutes);

// Test route
app.get("/", (req, res) => {
  res.send("Project Management API Running 🚀");
});

// Protected route
app.get("/api/protected", protect, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

// ----------------------
// ERROR HANDLING
// ----------------------
process.on("unhandledRejection", (reason) => {
  console.error("Unhandled Rejection:", reason);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// ----------------------
// START SERVER
// ----------------------
const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
