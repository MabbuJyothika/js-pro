
const startBtn = document.querySelector('.start-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const continueBtn = document.querySelector('.continue-btn');
const quizSection = document.querySelector('.quiz-section');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const tryAgainBtn = document.querySelector('.tryAgain-btn');
const goHomeBtn = document.querySelector('.goHome-btn');
const signinForm = document.getElementById('signinForm');
const errorMessage = document.getElementById('error-message');
const container = document.querySelector('.container');
const signinFormContainer = document.querySelector('.signin-form-container');



// Handle Sign-In Form submission
signinForm.onsubmit = (e) => {
    e.preventDefault();

    // Hide the sign-in form
    signinFormContainer.style.display = 'none'; // Hide sign-in form
    container.style.display = 'flex';           // Show quiz section
    
    successMessage.style.display = 'block'; // Show the success message
    successMessage.textContent = 'Successfully signed in!'; // Set success message text
    // Start the quiz immediately
    quizSection.classList.add('active');
    showQuestions(0);  // Show the first question
    questionCounter(1); // Set the question counter to 1
    headerScore();      // Initialize score header
};

// Event listeners for buttons
startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
};

exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
};

continueBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizBox.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
};

tryAgainBtn.onclick = () => {
    quizBox.classList.add('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
    headerScore();
};

goHomeBtn.onclick = () => {
    quizSection.classList.remove('active');
    nextBtn.classList.remove('active');
    resultBox.classList.remove('active');
    questionCount = 0;
    questionNumb = 1;
    userScore = 0;
    showQuestions(questionCount);
    questionCounter(questionNumb);
};

// Variables for quiz functionality
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

const nextBtn = document.querySelector('.next-btn');

// Handling 'Next' button functionality
nextBtn.onclick = () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        showQuestions(questionCount);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active'); // Reset 'Next' button
    } else {
        showResultBox();
    }
};

// Display questions and options
const optionList = document.querySelector('.option-list');
function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    const optionsContainer = optionList;

    // Update the question text
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    // Generate the options dynamically
    let optionTag = `
        <div class="option"><span>${questions[index].options[0]}</span></div>
        <div class="option"><span>${questions[index].options[1]}</span></div>
        <div class="option"><span>${questions[index].options[2]}</span></div>
        <div class="option"><span>${questions[index].options[3]}</span></div>
    `;

    // Inject the options into the DOM
    optionsContainer.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');

    // Add click event to each option
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}

// Handle option selection
function optionSelected(answer) {
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCount].answer;
    let allOptions = optionList.children.length;

    if (userAnswer === correctAnswer) {
        answer.classList.add('correct');
        userScore += 1;
        headerScore();
    } else {
        answer.classList.add('incorrect');
        // Highlight the correct answer
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAnswer) {
                optionList.children[i].classList.add('correct');
            }
        }
    }

    // Disable all options after selection
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }

    // Enable the 'Next' button
    nextBtn.classList.add('active');
}

// Update the question counter
function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

// Update the header score
function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore}/${questions.length}`;
}

// Show the result box at the end of the quiz
function showResultBox() {
    quizBox.classList.remove('active');
    resultBox.classList.add('active');

    const scoreText = document.querySelector('.score-text');
    const percentage = (userScore / questions.length) * 100;
    scoreText.textContent = `Your Score: ${userScore} out of ${questions.length} (${percentage.toFixed(2)}%)`;

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = 0;
    let progressEndValue = percentage;
    let speed = 20;

    let progress = setInterval(() => {
        progressStartValue++;
        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1) 0deg)`;
        if (progressStartValue === progressEndValue) {
            clearInterval(progress);
        }
    }, speed);
}
