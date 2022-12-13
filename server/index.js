// const express = require("express");
// const app = express();
// const http = require("http");
// const cors = require("cors");
// const { Server } = require("socket.io");

// app.use(cors());

// const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: ["http://localhost:3000/"],
//     methods: ["GET", "POST", "UPDATE", "DELETE"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("user is connected with id : ", socket.id);

//   socket.on("join-room", (id) => {
//     socket.join(id);
//     console.log(`User with id ${socket.id} joined id with ${id}`);
//   });

//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//   });
// });

// server.listen(3001, () => {
//   console.log("server is running");
// });
