import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth } from "./middleware/authMiddleware.js";
const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Soundar@2005", 
  database: "test_portal"
});

db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});


const JWT_SECRET = "my_secret_key";

// Protected route
app.get("/mcq", requireAuth, (req, res) => {
  res.json({ message: "You are logged in!", user: req.user });
});

// // Protected questions route
// app.get("/api/questions", requireAuth, (req, res) => {
//   const sql = "SELECT * FROM questions";
//   db.query(sql, (err, results) => {
//     if (err) return res.status(500).json({ error: err.sqlMessage });
//     res.json(results);
//   });
// });

//Register User
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    const sql = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: "Database error" });
      }
      res.json({ message: "User registered successfully", id: result.insertId });
    });
  });
});

//Login Route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0) return res.status(401).json({ error: "User not found" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: "Error checking password" });
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      // Generate JWT token with role
      const token = jwt.sign({ id: user.id, role: user.role }, JWT_SECRET, { expiresIn: "1h" });

      res.json({
        message: "Login successful",
        token,
        role: user.role,
        name: user.name,
        email: user.email
      });
    });
  });
});





//Fetch Questions
app.get("/api/questions", (req, res) => {
  const sql = "SELECT * FROM questions";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    console.log("Data",results);
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});