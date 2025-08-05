const dictionary = {
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

const learnedWords = JSON.parse(localStorage.getItem("learnedWords") || "[]");
const quizContainer = document.getElementById("quiz-container");
const resultText = document.getElementById("result");
const restartBtn = document.getElementById("restart-btn");

let currentQuestion = 0;
let correctAnswers = 0;
let quizWords = [];

function getRandomOptions(correctTranslation, allTranslations) {
  const options = [correctTranslation];
  while (options.length < 4) {
    const rand = allTranslations[Math.floor(Math.random() * allTranslations.length)];
    if (!options.includes(rand)) {
      options.push(rand);
    }
  }
  return options.sort(() => Math.random() - 0.5);
}

function showQuestion() {
  if (currentQuestion >= quizWords.length) {
    showResult();
    return;
  }

  const word = quizWords[currentQuestion];
  const correct = dictionary[word];
  const allTranslations = Object.values(dictionary);
  const options = getRandomOptions(correct, allTranslations);

  quizContainer.innerHTML = `
    <p><strong>${currentQuestion + 1}. Як перекладається слово "${word}"?</strong></p>
    ${options.map(opt => `<button class="option-btn">${opt}</button>`).join("<br><br>")}
  `;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (btn.textContent === correct) {
        correctAnswers++;
        btn.style.backgroundColor = "#c8ffc8";
      } else {
        btn.style.backgroundColor = "#ffc8c8";
      }

      setTimeout(() => {
        currentQuestion++;
        showQuestion();
      }, 800);
    });
  });
}

function showResult() {
  quizContainer.innerHTML = "";
  resultText.textContent = `Ви дали ${correctAnswers} правильних відповідей із ${quizWords.length}`;
  restartBtn.style.display = "inline-block";
}

restartBtn.addEventListener("click", () => {
  location.reload();
});

function startQuiz() {
  const validWords = learnedWords.filter(w => dictionary[w]);
  if (validWords.length < 3) {
    quizContainer.innerHTML = "<p>Недостатньо вивчених слів для тесту. Потрібно щонайменше 3.</p>";
    return;
  }

  quizWords = validWords.sort(() => Math.random() - 0.5).slice(0, 5);
  showQuestion();
}

startQuiz();
