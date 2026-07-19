import express from "express";
import { getReviews ,  getReviewById, deleteReview } from "../controllers/reviewControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", authMiddleware, getReviews);
router.get("/:id", authMiddleware, getReviewById);
router.delete("/:id", authMiddleware, deleteReview);

export default router;