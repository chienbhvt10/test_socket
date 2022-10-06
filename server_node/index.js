const express = require("express");
const app = express();
const { Server } = require("socket.io");
const http = require("http");
const server = http.createServer(app);
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:8000"],
    methods: ["GET", "POST"],
  },
});

app.get("/", (req, res) => {
  res.send("hello world");
});

io.on("connection", (socket) => {
  console.log("user connected: " + socket.id);
  socket.on("join-room", (data) => socket.join(data));
  socket.on("send-chat", (data) => {
    console.log(data);
    return socket.to(data.room).emit("receive-mes", data);
  });
  socket.on("send-status", (data) => {
    console.log(data);
    return socket.emit("receive-status", data);
  });
});

server.listen(4000, () => {
  console.log("listening on port 4000");
});
