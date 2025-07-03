# ⚡ FlowAnimater – LLM to Manim Animation Generator

FlowAnimater is a full-stack project that converts natural language explanations into animated videos using the Manim library. Users input a text-based description (like a tech flow or concept), and the app returns a rendered `.mp4` animation using LLM-generated Python (Manim) code.

---

## 🧠 Project Objective

Help users visualize their ideas or workflows by simply describing them in plain English — without needing to touch a single line of animation code.

---

## 🏗️ Architecture Overview

Frontend (HTML + JS + CSS)
↓
Express.js Backend (Node)
↓
Google Gemini API (LLM) → Python Code (Manim)
↓
Render .mp4 via Manim → Save to /uploads
↓
Frontend renders video


---

## 🔧 Tech Stack

| Layer       | Tech                     |
|-------------|--------------------------|
| Frontend    | HTML, CSS, JavaScript    |
| Backend     | Node.js, Express         |
| AI Model    | Google Gemini 2.0 Flash  |
| Animation   | Python, Manim            |
| File Storage| Local `/uploads` folder  |

---

## 📁 Project Structure

flowanimater/
│
├── backend/
│ ├── server.js # Express server
│ ├── llm.js # Gemini API logic
│ ├── renderManim.js # Manim rendering logic
│ ├── manim_gen.py # Auto-generated script (Manim code)
│ ├── uploads/ # Rendered videos
│ └── .env # Gemini API key
│
├── frontend/
│ ├── index.html # UI for input & video display
│ ├── style.css # Basic styling
│ └── script.js # Handles input & video rendering
│
└── README.md


---

## ⚙️ Setup Instructions (Local)

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/flowanimater.git
cd flowanimater

cd backend
npm install
