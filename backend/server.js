import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import codeRoutes from "./routes/codeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import analysisRoutes from "./routes/analysisRoutes.js";
import aiRoutes from "./routes/aiRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Code Review Assistant Backend Running");
});

//authentication routes

app.use("/api/auth", authRoutes);
app.use("/api/code", codeRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/analysis", analysisRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});