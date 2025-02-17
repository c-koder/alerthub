const { Server } = require("socket.io");

let io;
const userSockets = new Map();

const socketConnection = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000"],
    },
  });

  io.on("connection", (socket) => {
    const userId = socket.handshake.query.userId;
    if (userId) {
      userSockets.set(userId, socket.id);
    }

    socket.on("disconnect", () => {
      for (let [userId, socketId] of userSockets) {
        if (socketId === socket.id) {
          userSockets.delete(userId);
          break;
        }
      }
    });
  });
};

const emitNewNotification = (userId, notification) => {
  const socketId = userSockets.get(userId);
  if (socketId) {
    io.to(socketId).emit("new_notification", notification);
  } else {
    console.warn(`User with ID ${userId} is not connected.`);
  }
};

module.exports = { socketConnection, emitNewNotification };
