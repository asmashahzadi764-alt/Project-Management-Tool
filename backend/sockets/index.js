// socket/index.js
module.exports = (io) => {
  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    socket.on("joinProject", (projectId) => socket.join(projectId));
    socket.on("joinUser", (userId) => socket.join(`user:${userId}`));
  });
};

// server.js
const socketHandler = require("./socket");
socketHandler(io);
