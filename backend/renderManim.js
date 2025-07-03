import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { exec } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export async function renderManim(script, outputName = "animation") {
  const filePath = join(__dirname, "manim_gen.py");
  const outputDir = join(__dirname, "uploads");

  // 💾 Save the generated Manim Python code
  writeFileSync(filePath, script);

  // 🛠️ Hardcoded class name: FlowScene
  const command = `python -m manim -qk ${filePath} FlowScene -o ${outputName}.mp4 --media_dir ${outputDir}`;
  console.log("🛠️ Running command:", command);

  return new Promise((resolve, reject) => {
    exec(command, (err, stdout, stderr) => {
      console.log("🔧 STDOUT:", stdout);
      console.error("❌ STDERR:", stderr);
      if (err) {
        return reject(`Render failed:\n${stderr}`);
      }
      resolve(join("uploads", `${outputName}.mp4`));
    });
  });
}
