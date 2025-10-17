import express from "express";
import mysql from "mysql2";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { requireAuth } from "./middleware/authMiddleware.js";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration
const allowedOrigins = [
  "https://test-portal-xi.vercel.app"
];
app.use(
  cors({
    origin: function (origin, callback) {
      // Allow server-to-server or local requests without origin
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());

// Correct Port for Backend (use 5000, NOT 3306)
const PORT = process.env.PORT || 5000;

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("MySQL Connected...");
});

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

// Protected route
app.get("/mcq", requireAuth, (req, res) => {
  res.json({ message: "You are logged in!", user: req.user });
});

// Register user
app.post("/register", (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "All fields are required" });
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ error: "Error hashing password" });

    const sql =
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, 'user')";
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

//  Login route
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
    if (err) return res.status(500).json({ error: "Database error" });
    if (results.length === 0)
      return res.status(401).json({ error: "User not found" });

    const user = results[0];

    bcrypt.compare(password, user.password, (err, match) => {
      if (err) return res.status(500).json({ error: "Error checking password" });
      if (!match) return res.status(401).json({ error: "Invalid credentials" });

      const token = jwt.sign(
        { id: user.id, role: user.role },
        JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN || "1d" }
      );

      res.json({
        message: "Login successful",
        token,
        role: user.role,
        name: user.name,
        email: user.email,
      });
    });
  });
});

// Fetch questions
app.get("/api/questions", (req, res) => {
  const sql = "SELECT * FROM questions";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: err.sqlMessage });
    console.log("📘 Questions fetched:", results.length);
    res.json(results);
  });
});

// Default route (for Render health check)
app.get("/", (req, res) => {
  res.send(" Test Portal Backend Running Successfully!");
});

// Start server
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
