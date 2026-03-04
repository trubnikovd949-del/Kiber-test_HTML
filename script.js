let currentQuestion = 0;
let score = 0;
let username = '';
const resultsKey = 'quiz_results';

// Перемешанные вопросы: похожие темы не идут подряд
const questions = [
  {
    question: "Что делает тег <header>?",
    answers: [
      "Создаёт основной контент страницы",
      "Определяет верхнюю часть (шапку) сайта",
      "Вставляет картинку",
      "Делает текст жирным"
    ],
    correct: 1
  },
  {
    question: "Что означает свойство margin в CSS?",
    answers: [
      "Внутренний отступ (пробел внутри блока)",
      "Цвет фона",
      "Внешний отступ (пробел снаружи блока)",
      "Размер шрифта"
    ],
    correct: 2
  },
  {
    question: "Какой тег создаёт нумерованный список?",
    answers: [
      "<numlist>",
      "<ol>",
      "<ul>",
      "<numbers>"
    ],
    correct: 1
  },
  {
    question: "Что делает свойство background-color?",
    answers: [
      "Меняет цвет текста",
      "Меняет цвет фона элемента",
      "Добавляет картинку на задний план",
      "Делает блок прозрачным"
    ],
    correct: 1
  },
  {
    question: "Какой тег используется для самого крупного заголовка на странице?",
    answers: [
      "<h6>",
      "<title>",
      "<h1>",
      "<header>"
    ],
    correct: 2
  },
  {
    question: "Где нужно подключать CSS-файл с помощью <link>?",
    answers: [
      "Внутри <body>",
      "Внутри <footer>",
      "Внутри <head>",
      "Любое место подходит"
    ],
    correct: 2
  },
  {
    question: "Что делает border-radius: 10px; ?",
    answers: [
      "Добавляет рамку вокруг блока",
      "Делает углы блока скруглёнными",
      "Увеличивает размер шрифта",
      "Меняет цвет границы"
    ],
    correct: 1
  },
  {
    question: "Какой тег используется для обычного абзаца текста?",
    answers: [
      "<text>",
      "<p>",
      "<div>",
      "<span>"
    ],
    correct: 1
  },
  {
    question: "Что делает свойство padding?",
    answers: [
      "Отступ снаружи блока",
      "Отступ внутри блока (между содержимым и границей)",
      "Меняет ширину блока",
      "Выравнивает текст по центру"
    ],
    correct: 1
  },
  {
    question: "Какой тег создаёт маркированный (ненумерованный) список?",
    answers: [
      "<list>",
      "<ol>",
      "<ul>",
      "<li>"
    ],
    correct: 2
  },
  {
    question: "Какой тег используется для создания ссылки?",
    answers: [
      "<link>",
      "<url>",
      "<a>",
      "<href>"
    ],
    correct: 2
  },
  {
    question: "Что делает тег <main>?",
    answers: [
      "Добавляет музыку на страницу",
      "Создаёт меню навигации",
      "Обозначает основное содержимое страницы",
      "Меняет цвет фона"
    ],
    correct: 2
  }
];

// --- остальной код без изменений ---
function startTest() {
  const input = document.getElementById('username');
  username = input.value.trim();
  if (!username) {
    alert('Пожалуйста, введите имя!');
    return;
  }
  document.getElementById('welcome-screen').style.display = 'none';
  document.getElementById('quiz-container').style.display = 'block';
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question-title').textContent = `Вопрос ${currentQuestion + 1}: ${q.question}`;
  const answersDiv = document.getElementById('answers');
  answersDiv.innerHTML = '';

  q.answers.forEach((answer, index) => {
    const div = document.createElement('div');
    div.classList.add('answer-option');
    div.textContent = answer;
    div.onclick = () => selectAnswer(div, index);
    answersDiv.appendChild(div);
  });

  document.getElementById('next-btn').disabled = true;
}

let selectedAnswerIndex = -1;

function selectAnswer(element, index) {
  document.querySelectorAll('.answer-option').forEach(el => el.classList.remove('selected'));
  element.classList.add('selected');
  selectedAnswerIndex = index;
  document.getElementById('next-btn').disabled = false;
}

function nextQuestion() {
  if (selectedAnswerIndex === questions[currentQuestion].correct) {
    score++;
  }

  currentQuestion++;

  if (currentQuestion < questions.length) {
    selectedAnswerIndex = -1;
    loadQuestion();
  } else {
    saveResult();
    showResults();
  }
}

function saveResult() {
  const results = JSON.parse(localStorage.getItem(resultsKey) || '[]');
  results.push({ name: username, score: score, total: questions.length });
  localStorage.setItem(resultsKey, JSON.stringify(results));
}

function showResults() {
  document.getElementById('quiz-container').style.display = 'none';
  document.getElementById('result-screen').style.display = 'block';

  const percent = Math.round((score / questions.length) * 100);
  document.getElementById('user-result').textContent =
    `${username}, вы набрали ${score} из ${questions.length} (${percent}%)`;

  const allResults = JSON.parse(localStorage.getItem(resultsKey) || '[]');
  const list = document.getElementById('all-results');
  list.innerHTML = '';
  allResults.forEach(res => {
    const li = document.createElement('li');
    li.textContent = `${res.name}: ${res.score}/${res.total}`;
    list.appendChild(li);
  });
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  selectedAnswerIndex = -1;
  document.getElementById('result-screen').style.display = 'none';
  document.getElementById('welcome-screen').style.display = 'block';
  document.getElementById('username').value = '';
}
