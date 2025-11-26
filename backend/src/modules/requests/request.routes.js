import express from "express";
import { requestController } from "./request.controller.js";
import { authMiddleware } from "../../middleware/authMiddleware.js";

const router = express.Router();

// All routes require login
router.use(authMiddleware);

// create request
router.post("/", requestController.create);

//My Requests
router.get("/my", requestController.myRequests);

// MANAGER ONLY ROUTES
router.get("/pending",requestController.pendingApprovals);

router.get("/:id",requestController.getById);

router.patch("/:id/approve",requestController.approve);

router.patch("/:id/reject",requestController.reject);

export default router;


