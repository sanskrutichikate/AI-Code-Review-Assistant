import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { aiReview } from "../controllers/aiControllers.js";

const router=express.Router();
router.post(
    "/review",
    authMiddleware,
   aiReview 
);

export default router;
