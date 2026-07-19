import express from "express";
import { saveCode } from "../controllers/codeControllers.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, saveCode);

export default router;