import express from "express";
import { requestController } from "./request.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// All routes require login
router.use(authMiddleware);

// create request
router.post("/", requestController.create);


export default router;


