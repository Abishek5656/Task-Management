import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

import authRoutes from "./modules/auth/auth.routes.js";
import requestRoutes from "./modules/requests/request.routes.js";


// Mount routes later here:
app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);

export { app };
