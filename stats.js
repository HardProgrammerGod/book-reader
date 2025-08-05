const fakeDictionary = {
  "wind": "вітер",
  "strong": "сильний",
  "rain": "дощ",
  "island": "острів",
  "boat": "човен",
  "men": "чоловіки",
  "tired": "втомлені",
  "cold": "холодні",
  "hungry": "голодні",
  "alive": "живі"
};

const wordListEl = document.getElementById("word-list");
const wordCountEl = document.getElementById("word-count");
const resetButton = document.getElementById("reset-button");

const learnedWords = JSON.parse(localStorage.getItem("learnedWords") || "[]");

if (learnedWords.length === 0) {
  wordCountEl.textContent = "Ви ще не вивчили жодного слова.";
} else {
  wordCountEl.textContent = `Ви вивчили ${learnedWords.length} слів:`;

  learnedWords.forEach(word => {
    const li = document.createElement("li");
    li.textContent = `${word} — ${fakeDictionary[word] || "переклад невідомий"}`;
    wordListEl.appendChild(li);
  });
}

resetButton.addEventListener("click", () => {
  if (confirm("Ви точно хочете очистити свій прогрес?")) {
    localStorage.removeItem("learnedWords");
    location.reload();
  }
});
