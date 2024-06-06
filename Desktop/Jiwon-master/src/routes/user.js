const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

module.exports = (db) => {
  // 회원가입
  router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.query(
        "INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
        [name, email, hashedPassword],
        (err, results) => {
          if (err) {
            return res
              .status(500)
              .json({ message: "Error registering user", error: err });
          }
          res.status(201).json({ message: "User registered successfully!" });
        }
      );
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  });

  // 로그인
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    db.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      async (err, results) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Error logging in", error: err });
        }
        if (results.length === 0) {
          return res.status(400).json({ message: "Invalid credentials!" });
        }
        const user = results[0];
        const match = await bcrypt.compare(password, user.password);
        if (match) {
          res
            .status(200)
            .json({ message: "Login successful!", name: user.name });
        } else {
          res.status(400).json({ message: "Invalid credentials!" });
        }
      }
    );
  });

  return router;
};
