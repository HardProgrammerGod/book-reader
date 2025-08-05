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

const learnedWords = JSON.parse(localStorage.getItem("learnedWords") || "[]");

fetch('book.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('book-title').textContent = data.title;
    const chapter = data.chapters[0];
    document.getElementById('chapter-title').textContent = chapter.title;

    const contentDiv = document.getElementById('book-content');

    chapter.paragraphs.forEach(paragraph => {
      const p = document.createElement('p');

      paragraph.split(' ').forEach(word => {
        const cleanWord = word.replace(/[.,?!]/g, '').toLowerCase();
        const span = document.createElement('span');
        span.textContent = word + ' ';
        span.className = 'word';
        if (learnedWords.includes(cleanWord)) {
          span.classList.add('learned');
        }
        span.addEventListener('click', e => showTranslation(e, cleanWord, span));
        p.appendChild(span);
      });

      contentDiv.appendChild(p);
    });
  });

function showTranslation(e, word, element) {
  const tooltip = document.getElementById('tooltip');
  const translation = fakeDictionary[word] || 'No translation found';
  tooltip.textContent = translation;
  tooltip.style.display = 'block';
  tooltip.style.left = `${e.pageX + 10}px`;
  tooltip.style.top = `${e.pageY - 10}px`;

  // Зберегти слово
  if (!learnedWords.includes(word)) {
    learnedWords.push(word);
    localStorage.setItem("learnedWords", JSON.stringify(learnedWords));
    element.classList.add("learned");
  }

  setTimeout(() => {
    tooltip.style.display = 'none';
  }, 2000);
}
