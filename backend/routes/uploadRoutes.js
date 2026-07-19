import express from "express";
import upload from "../config/multer.js";
import authMiddleware from "../middleware/authMiddleware.js";
import { uploadFile } from "../controllers/uploadControllers.js";

const router = express.Router();

router.post(
    "/",
    authMiddleware,
    upload.single("file"),
    uploadFile
);

export default router;