import axios from "axios";

// 🔐 Move your API key to .env for security (recommended)
const apiKey = process.env.api_key;

export async function generateGeminiContent(prompt, model = "gemini-2.0-flash") {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

  const payload = {
    contents: [
      {
        parts: [
          {
            text: `You are a Manim expert.

Generate a Manim animation in Python to visualize this process:

"${prompt}"  ← insert user flow here (e.g., "User logs in, backend checks, access granted")

Use the following strict rules:
- The class must always be named FlowScene
- Do NOT use Tex() or MathTex(). Use only Text() to avoid LaTeX issues
- Use only built-in shapes like Rectangle, Circle, Arrow, and Text
- Scene must be self-contained and run independently with: python -m manim script.py FlowScene
- Return only code — no markdown, explanation, or extra text
`
          }
        ]
      }
    ]
  };

  try {
    const response = await axios.post(url, payload, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    const result = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;

    const cleaned = result
  ?.replace(/```(python)?/gi, "") // remove ``` or ```python
  .replace(/```/g, "")            // remove ending ```
  .trim();

  return cleaned || "⚠️ No content returned.";    

  } catch (error) {
    console.error("🔥 Gemini API error:", error.response?.data || error.message);
    return "❌ Gemini failed. Check your API key, model, or prompt.";
  }
}
