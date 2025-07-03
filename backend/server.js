import express from "express";
import cors from "cors";
import { generateGeminiContent } from "./llm.js";
import { renderManim } from "./renderManim.js";
import { join, dirname } from "path";
import { writeFileSync } from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Endpoint to generate animation
app.post("/generate", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required." });
  }

  try {
    const script = await generateGeminiContent(prompt);

    // Write script to Python file (optional since renderManim already does this)
    const manimFilePath = join(__dirname, "manim_gen.py");
    writeFileSync(manimFilePath, script);

    // Render Manim animation
    const videoName = await renderManim(script);

    // res.json({ videoUrl: videoName });
    res.json({ videoUrl: "/uploads/videos/manim_gen/2160p60/animation.mp4" });
  } catch (error) {
    console.error("❌ Server error:", error);
    res.status(500).json({
      error: "Something went wrong.",
      details: error.toString(),
    });
  }
});

// Serve rendered videos
app.use("/videos", express.static(join(__dirname, "uploads")));

app.use("/uploads", express.static(join(__dirname, "uploads")));

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
