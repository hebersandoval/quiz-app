const question = document.getElementById('question');
// Change to an []
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');

// Game constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: `Inside which HTML element do we put the JavaScript?`,
        choice1: `<xmp><script></xmp>`,
        choice2: `<xmp><javascript></xmp>`,
        choice3: `<xmp><js></xmp>`,
        choice4: `<xmp><scripting></xmp>`,
        answer: 1,
    },
    {
        question: `What is the correct syntax for referring to an external script called 'demo.js'?`,
        choice1: `<xmp><script href='demo.js'></script></xmp>`,
        choice2: `<xmp><script name='demo.js'></script></xmp>`,
        choice3: `<xmp><script src='demo.js'></script></xmp>`,
        choice4: `<xmp><script file='demo.js'></script></xmp>`,
        answer: 3,
    },
    {
        question: `How do you write 'Hello World' in an alert box?`,
        choice1: `<xmp>msgBox('Hello World');</xmp>`,
        choice2: `<xmp>alertBox('Hello World');</xmp>`,
        choice3: `<xmp>msg('Hello World');</xmp>`,
        choice4: `<xmp>alert('Hello World');</xmp>`,
        answer: 4,
    },
];

const startGame = () => {
    questionCounter = 0;
    score = 0;
    // Make a full copy of the questions' []
    availableQuestions = [...questions];
    getNewQuestion();
};

const getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        // Set localStorage
        localStorage.setItem('mostRecentScore', score);
        // Go to the end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    // Update text of question counter in page
    progressText.innerHTML = `Question ${questionCounter}/${MAX_QUESTIONS}`;
    // Update the progres bar; convert value to %
    progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // Set the content of the HTML element
    question.innerHTML = currentQuestion.question;

    // Get the choice for the question
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
    });
    // Remove the question that was just displayed
    availableQuestions.splice(questionIndex, 1);
    // Wait after everything has been loaded
    acceptingAnswers = true;
};

choices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
        // If not ready to receive answers, just ignore
        if (!acceptingAnswers) return;
        // Set to false due to a delay in page reload
        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];

        // Mark as correct/incorrect
        let classToApply = 'incorrect';
        if (selectedAnswer == currentQuestion.answer) {
            classToApply = 'correct';
        }
        // const classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect';
        // Increase score if correct answer is selected
        if (classToApply === 'correct') {
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);
        // Delay when removing class and going to next question
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 2000);
    });
});

const incrementScore = (num) => {
    score += num;
    scoreText.innerHTML = score;
};

startGame();
