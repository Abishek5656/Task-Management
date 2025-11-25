import { verifyToken } from "../utils/jwt.js";

export const authMiddleware = (req, res, next) => {
  try {
    // Read token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ error: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    // Verify the token
    const decoded = verifyToken(token);

    // Attach user data to request
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role
    };


    console.log("reqqq", req.user)

    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};
