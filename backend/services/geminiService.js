import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function reviewCode(sourceCode, language) {
  const prompt = `
You are a senior software engineer.

Review the following ${language} code.

Return ONLY valid JSON.

{
  "summary": "",
  "bugs": [],
  "improvements": [],
  "bestPractices": [],
  "security": [],
  "performance": []
}

Code:
${sourceCode}
`;

  try {
    const response = await ai.models.generateContent({
     model: "gemini-3.5-flash",
      contents: prompt,
    });

    let text = response.text;

    console.log("Gemini Response:");
    console.log(text);

    text = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(text);

  } catch (err) {
    console.error(err);
    throw err;
  }
}