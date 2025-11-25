import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

import authRoutes from "./modules/auth/auth.routes.js";

// TEMP root route
app.get("/", (req, res) => {
  res.send({ message: "Backend running successfully!" });
});

// Mount routes later here:
app.use("/auth", authRoutes);

export { app };
