import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 5000;

// Gemini client (API key env se aayegi)
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY
});

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Buddy Backend (Gemini SDK) 🚀");
});

app.post("/ai", async (req, res) => {
  try {
    const { action, code } = req.body;

    const prompt = `
You are an expert software developer.

Task: ${action}

Code:
${code}

Explain clearly for a beginner.
`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt
    });
    console.log(response.text);
    
    res.json({
      success: true,
      message: response.text
    });

  } catch (error) {
    console.error("Gemini SDK error:", error);
    res.status(500).json({
      success: false,
      message: "Gemini AI error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);  
});
