import { reviewCode } from "../services/geminiService.js";

export const aiReview = async (req, res) => {
  try {
    const { sourceCode, language } = req.body;

    if (!sourceCode || !language) {
      return res.status(400).json({
        message: "Source code and language are required.",
      });
    }

    const review = await reviewCode(sourceCode, language);

    res.status(200).json({
      review,
    });

  } catch (error) {
    console.error("Gemini Error:", error);

    res.status(500).json({
      message: "AI Review Failed",
    });
  }
};