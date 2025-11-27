import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import client from "prom-client";
import helmet from "helmet";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Allow metrics endpoint
app.use(
  helmet({
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: false,
  })
);


/* ------------------ MORGAN LOGGING ------------------ */
// "dev" → colored logs (GET /login 200 12ms)
app.use(morgan("dev"));


/* ------------------ RATE LIMITER ------------------ */
// Global rate limit → 100 requests per 15 minutes per IP
const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

/* ------------------ PROMETHEUS METRICS ------------------ */
const register = new client.Registry();
client.collectDefaultMetrics({ register });

// Optional custom metrics
const httpRequestCounter = new client.Counter({
  name: "http_requests_total",
  help: "Total number of HTTP requests",
  labelNames: ["method", "route", "status"],
});

register.registerMetric(httpRequestCounter);

// Middleware to count every request
app.use((req, res, next) => {
  res.on("finish", () => {
    httpRequestCounter.inc({
      method: req.method,
      route: req.route?.path || req.originalUrl,
      status: res.statusCode,
    });
  });
  next();
});

app.use(globalLimiter);

// Route to expose metrics for Prometheus/Grafana
app.get("/metrics", async (req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});


import authRoutes from "./modules/auth/auth.routes.js";
import requestRoutes from "./modules/requests/request.routes.js";


// Mount routes later here:
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);

export { app };


