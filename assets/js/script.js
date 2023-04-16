const scoreElement = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const timeElement = document.getElementById("time");
const quizForm = document.getElementById("quiz-form");
const startBtn = document.getElementById("start-btn");
const results = document.getElementById("results");
const initialsInput = document.getElementById("initials");
const saveScoreBtn = document.getElementById("save-score-btn");
const highScores = document.getElementById("high-scores");
const highScoresList = document.getElementById("high-scores-list");
const viewHighScores = document.getElementById("view-high-scores");
const viewHighScoresBtn = document.getElementById("view-high-scores");
const backToStartBtn = document.getElementById("back-to-start");
const clearHighScoresBtn = document.getElementById("clear-high-scores");

// 1. Start the Quiz //



// ... (Other variable declarations)


startBtn.addEventListener("click", startQuiz);
viewHighScoresBtn.addEventListener("click", () => {
  startBtn.style.display = "none";
  timerDisplay.style.display = "none";
  results.style.display = "none";
  highScores.style.display = "block";

  displayHighScores();
});


// ... (rest of the script.js code)


const questions = [
    {
      text: "1. JavaScript is case-sensitive.",
      choices: ["True", "False"],
      answer: 0,
    },
    {
      text: "2. Which of the following is NOT a JavaScript data type?",
      choices: ["String", "Number", "Boolean", "Character"],
      answer: 3,
    },
    {
      text: "3. How do you create a function in JavaScript?",
      choices: [
        "function myFunction() {}",
        "function = myFunction() {}",
        "function:myFunction() {}",
      ],
      answer: 0,
    },
    {
      text: "4. The '===' operator checks for both value and type equality.",
      choices: ["True", "False"],
      answer: 0,
    },
  ];

const timePerQuestion = 10;
const penaltyTime = 5;
let timeLeft = questions.length * timePerQuestion;
let currentQuestionIndex = 0;
let timer;
let score = 0;

startBtn.addEventListener("click", startQuiz);

function setupQuizListeners() {
    quizForm.addEventListener("submit", checkAnswer);
}

function startQuiz() {
    // Reset the timer and the quiz
    timeLeft = 60; // Set the time left to 60 seconds
    currentQuestionIndex = 0;
    timerDisplay.textContent = timeLeft;
  
    // Hide the start button and show the quiz form
    startBtn.style.display = "none";
    quizForm.style.display = "block";
    timerDisplay.style.display = "block";
  
    // Start the timer
    timerInterval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = timeLeft;
  
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  
    // Display the first question
    displayQuestion();
  }
  

function displayQuestion() {
  const question = questions[currentQuestionIndex];
  quizForm.innerHTML = `
    <p>${question.text}</p>
    ${question.choices
      .map(
        (choice, index) =>
          `<label><input type="radio" name="question" value="${index}"> ${choice}</label>`
      )
      .join("")}
    <button id="submit-answer">Submit Answer</button>
  `;

  document.getElementById("submit-answer").addEventListener("click", checkAnswer);
}

function checkAnswer(event) {
  event.preventDefault(); // Add this line to prevent form submission

  const selectedAnswer = parseInt(document.querySelector("input[name='question']:checked").value);
  const correctAnswer = questions[currentQuestionIndex].answer;

  const resultMsg = document.createElement("p");
  resultMsg.style.marginTop = "10px";

  if (selectedAnswer !== correctAnswer) {
    timeLeft -= penaltyTime;
    resultMsg.textContent = "Wrong!";
    resultMsg.style.color = "red";
  } else {
    score++;
    resultMsg.textContent = "Correct!";
    resultMsg.style.color = "green";
  }

  quizForm.appendChild(resultMsg);

  setTimeout(() => {
    resultMsg.remove();

    currentQuestionIndex++;

    if (currentQuestionIndex === questions.length || timeLeft <= 0) {
      endQuiz();
    } else {
      displayQuestion();
    }
  }, 1000);
}


function updateTimer() {
  timeLeft--;
  timeElement.textContent = Math.max(timeLeft, 0);

  if (timeLeft <= 0) {
    clearInterval(timer);
    endQuiz();
  }
}

function endQuiz() {
  clearInterval(timer);
  quizForm.style.display = "none";
  results.style.display = "block";
  scoreElement.textContent = score;

  saveScoreBtn.addEventListener("click", saveScore);
}



function saveScore() {
    const initials = initialsInput.value.trim().toUpperCase();
    if (!initials) return;
  
    const highScoresArray = JSON.parse(localStorage.getItem("highScores")) || [];
    const newScore = { initials, score };
  
    highScoresArray.push(newScore);
    highScoresArray.sort((a, b) => b.score - a.score);
    highScoresArray.splice(5); // Keep the top 5 scores
  
    localStorage.setItem("highScores", JSON.stringify(highScoresArray));
  
    displayHighScores();
    highScores.style.display = "block";
    results.style.display = "none";
  }
  




function displayHighScores() {
  const highScoresArray = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.innerHTML = highScoresArray
    .map((scoreEntry) => `<li>${scoreEntry.initials} - ${scoreEntry.score}</li>`)
    .join("");
}

backToStartBtn.addEventListener("click", () => {
    highScores.style.display = "none";
    startBtn.style.display = "block";

    currentQuestionIndex = 0;;
  });

clearHighScoresBtn.addEventListener("click", () => {
    localStorage.removeItem("highScores");
    highScoresList.innerHTML = "";
  });











// 3. 

