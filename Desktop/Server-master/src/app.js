const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const http = require("http");
const socketIo = require("socket.io");
const User = require("./models/User");

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

app.use(bodyParser.json());

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = new User({ name, email, password });
    await user.save();
    res.status(201).send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== password) {
      return res.status(400).send("Invalid password");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

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
