const form = document.getElementById("promptForm");
const promptInput = document.getElementById("promptInput");
const submitBtn = document.getElementById("submitBtn");
const errorMsg = document.getElementById("errorMsg");
const videoContainer = document.getElementById("videoContainer");
const videoPreview = document.getElementById("videoPreview");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const prompt = promptInput.value.trim();

  if (!prompt) return;

  submitBtn.disabled = true;
  submitBtn.textContent = "Generating...";
  errorMsg.classList.add("hidden");
  videoContainer.classList.add("hidden");

  try {
    const response = await axios.post("http://localhost:3000/generate", {
      prompt,
    });
    
    const videoUrl = response.data?.videoUrl;
    if (videoUrl) {
      videoPreview.src = `http://localhost:3000/videos/${videoUrl}`;
      videoContainer.classList.remove("hidden");
    } else {
      errorMsg.textContent = "No video URL received.";
      errorMsg.classList.remove("hidden");
    }
  } catch (err) {
    console.error(err);
    errorMsg.textContent = "Failed to generate animation.";
    errorMsg.classList.remove("hidden");
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = "Generate Animation";
  }
});
