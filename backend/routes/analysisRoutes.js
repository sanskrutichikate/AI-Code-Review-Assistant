import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import { analyzeCode ,  getAnalysisResults } from "../controllers/analysisControllers.js";

const router = express.Router();


       // ANALYZE SOURCE CODE


Endpoint:
//POST / api / analysis


    

router.post(
    "/",
    authMiddleware,
    analyzeCode
);

router.get(
    "/",
    authMiddleware,
    getAnalysisResults
);

export default router;