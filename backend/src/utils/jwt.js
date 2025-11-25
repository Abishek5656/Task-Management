import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const SECRET = process.env.JWT_SECRET || "default_secret_key";

// Generate JWT token
export function generateToken(payload) {
  return jwt.sign(payload, SECRET, {
    expiresIn: "7d", // token valid for 7 days
  });
}

// Verify JWT token
export function verifyToken(token) {
  return jwt.verify(token, SECRET);
}
