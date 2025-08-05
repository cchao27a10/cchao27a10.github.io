const page1btn = document.querySelector("#page1btn");
const page2btn = document.querySelector("#page2btn");
const page3btn = document.querySelector("#page3btn");
const homebtn = document.querySelector("#resetbtn");

const pages = [
  document.querySelector("#page1"),
  document.querySelector("#page2"),
  document.querySelector("#page3"),
  document.querySelector("#home")
];

const buttons = [page1btn, page2btn, page3btn, homebtn];

function showPage(index) {
  pages.forEach((page, i) => {
    if (i === index) {
      page.style.display = "flex";             // Make visible for transition
      setTimeout(() => page.classList.add("active"), 20); // Trigger fade-in
    } else {
      page.classList.remove("active");           // Trigger fade-out
      setTimeout(() => {
        page.style.display = "none";             // Hide after animation
      }, 500); // Match CSS transition duration
    }
  });
}

// Button listeners
homebtn.addEventListener("click", function() { resetApp(3); });
page1btn.addEventListener("click", function() { showPage(0); });
page2btn.addEventListener("click", function() { showPage(1); });
page3btn.addEventListener("click", function() { showPage(2); });


function resetApp() {
  // Reset all pages to initial state; show first page
  showPage(0);
}

function submitRamenQuiz() {
  const answers = {
    q1: 'Tonkotsu',
    q2: 'Yokohama Chinatown',
    q3: 'Sweetcorn',
    q4: 'Nagoya',
    q5: '1980s'
  };
  let score = 0;
  const total = Object.keys(answers).length;

  for (let key in answers) {
    const checked = document.querySelector(`input[name="${key}"]:checked`);
    if (checked && checked.value === answers[key]) {
      score++;
    }
  }
  const resultBox = document.getElementById("quizResult");
  resultBox.innerHTML = `You scored ${score} out of ${total}!`;
  resultBox.style.display = 'block';

  const quizSound = document.getElementById("quizSound");
  if (quizSound) {
    quizSound.play();
  }

 // Disable all inputs after submit
  const allInputs = document.querySelectorAll('#quizForm input');
  allInputs.forEach(input => input.disabled = true);

  // Hide submit button, show reset button
  document.querySelector('button[onclick="submitRamenQuiz()"]').style.display = 'none';
  document.getElementById('resetQuizBtn').style.display = 'inline-block';
}

// Reset quiz function
function resetQuiz() {
  // Clear result text
  document.getElementById("quizResult").innerHTML = '';

  // Enable all inputs
  const allInputs = document.querySelectorAll('#quizForm input');
  allInputs.forEach(input => {
    input.disabled = false;
    input.checked = false; // Clear selection
  });

  // Show submit button, hide reset button
  document.querySelector('button[onclick="submitRamenQuiz()"]').style.display = 'inline-block';
  document.getElementById('resetQuizBtn').style.display = 'none';
}

// Add event listener for reset button
document.getElementById('resetQuizBtn').addEventListener('click', resetQuiz);