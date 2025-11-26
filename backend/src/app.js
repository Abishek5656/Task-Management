import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";

const app = express();

/* ------------------ RATE LIMITER ------------------ */
// Global rate limit → 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(globalLimiter);


import authRoutes from "./modules/auth/auth.routes.js";
import requestRoutes from "./modules/requests/request.routes.js";


// Mount routes later here:
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);

export { app };
