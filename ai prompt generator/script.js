const savedList = document.getElementById("savedList");

window.onload = function() {
  loadPrompts();
};

function generatePrompt() {
  const btn = document.getElementById("generateBtn");
  const category = document.getElementById("category").value;
  const input = document.getElementById("userInput").value.toLowerCase();

  if (input === "") {
    alert("Enter something!");
    return;
  }

  btn.classList.add("generating");

  setTimeout(() => {
    let emotion = detectEmotion(input);
    let prompt = buildPrompt(category, input, emotion);

    document.getElementById("output").value = prompt;

    savePrompt(prompt);
    btn.classList.remove("generating");

  }, 1000);
}

/* Emotion Detection */
function detectEmotion(text) {
  if (text.includes("scary") || text.includes("dark")) return "dark";
  if (text.includes("happy") || text.includes("fun")) return "positive";
  if (text.includes("sad") || text.includes("alone")) return "emotional";
  if (text.includes("power") || text.includes("money")) return "intense";
  return "neutral";
}

/* Heavy Prompt Builder */
function buildPrompt(category, input, emotion) {
  let baseStyle = "";

  switch(emotion) {
    case "dark":
      baseStyle = "Use dark cinematic tones, deep shadows, and a mysterious atmosphere.";
      break;
    case "positive":
      baseStyle = "Use vibrant colors, bright lighting, and an energetic feel.";
      break;
    case "emotional":
      baseStyle = "Focus on emotional depth, storytelling, and expressive detail.";
      break;
    case "intense":
      baseStyle = "Create a powerful, high-impact and dramatic output.";
      break;
    default:
      baseStyle = "Maintain a clean and professional tone.";
  }

  switch(category) {
    case "image":
      return `Create a highly detailed visual of ${input}. ${baseStyle}
Include cinematic lighting, ultra realistic textures, depth and strong composition.
Make it visually striking and premium quality.`;

    case "chatgpt":
      return `Explain ${input} in a detailed and structured way. ${baseStyle}
Include examples, clarity, and actionable insights.`;

    case "trading":
      return `Analyze ${input} using support, resistance, trend, and volume. ${baseStyle}
Provide entry, exit, and risk management strategy.`;

    case "coding":
      return `Write clean code for ${input}. ${baseStyle}
Include explanation and best practices.`;
  }
}

/* Copy Animation */
function copyPrompt() {
  const output = document.getElementById("output");
  const copyBtn = document.getElementById("copyBtn");

  output.select();
  document.execCommand("copy");

  copyBtn.innerText = "Copied!";
  copyBtn.classList.add("copied");

  setTimeout(() => {
    copyBtn.innerText = "Copy Prompt";
    copyBtn.classList.remove("copied");
  }, 1500);
}

/* Save Prompt */
function savePrompt(prompt) {
  let prompts = JSON.parse(localStorage.getItem("prompts")) || [];
  prompts.push(prompt);
  localStorage.setItem("prompts", JSON.stringify(prompts));
  loadPrompts();
}

/* Load + Delete */
function loadPrompts() {
  savedList.innerHTML = "";
  let prompts = JSON.parse(localStorage.getItem("prompts")) || [];

  prompts.forEach((p, index) => {
    let li = document.createElement("li");

    li.innerHTML = `
      ${p}
      <button onclick="deletePrompt(${index})">Delete</button>
    `;

    savedList.appendChild(li);
  });
}

/* Delete Single */
function deletePrompt(index) {
  let prompts = JSON.parse(localStorage.getItem("prompts")) || [];
  prompts.splice(index, 1);
  localStorage.setItem("prompts", JSON.stringify(prompts));
  loadPrompts();
}