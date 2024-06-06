const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const userRoutes = require("./routes/user");
const http = require("http");
const socketIo = require("socket.io");
require("dotenv").config(); // dotenv 패키지 사용

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "your_password",
  database: process.env.DB_NAME || "s_wheats",
  port: process.env.DB_PORT || 3307,
});

db.connect((err) => {
  if (err) {
    console.error("MySQL connection error:", err);
    return;
  }
  console.log("MySQL connected...");
});

// 미들웨어 설정
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// 라우트 설정
app.use("/api/users", userRoutes(db));

io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("joinRoom", (room) => {
    socket.join(room);
    console.log(`Client joined room: ${room}`);
  });

  socket.on("chatMessage", (data) => {
    io.to(data.room).emit("chatMessage", {
      userName: data.userName,
      message: data.message,
    });
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
