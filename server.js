import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST"],
  },
});

let playersCount = 0;
io.on("connection", (socket) => {
  console.log(`User ${socket.id} is connected`);

  socket.on("ready", () => {
    console.log(`player ${socket.id} is ready`);

    playersCount++;

    if (playersCount % 2 === 0) {
      io.emit("startGame", socket.id);
    }
  });

  socket.on("paddleMove", (paddleData) => {
    socket.broadcast.emit("paddleMove", paddleData);
  });

  socket.on("ballMove", (ballData) => {
    socket.broadcast.emit("ballMove", ballData);
  });

  socket.on("disconnect", (reason) => {
    console.log(`client ${socket.id} disconnected due to: ${reason}`);
  });
});

httpServer.listen(3000, () => console.log("listening on port 3000"));
