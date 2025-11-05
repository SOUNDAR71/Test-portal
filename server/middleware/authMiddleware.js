import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my_secret_key";

export function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization; // expects "Bearer <token>"

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized: Token missing" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next(); // proceed to the route
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}
