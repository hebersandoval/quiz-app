const question = document.getElementById('question');
// Change to an []
const choices = Array.from(document.getElementsByClassName('choice-text'));

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
        choice1: `<xmp><script href='demo.js'></xmp>`,
        choice2: `<xmp><script name='demo.js'></xmp>`,
        choice3: `<xmp><script src='demo.js'></xmp>`,
        choice4: `<xmp><script file='demo.js'></xmp>`,
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
        // Go to the end page
        return window.location.assign('/end.html');
    }

    questionCounter++;
    const questionIndex = Math.floor(Math.random() * availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    // Set the content of the HTML element
    question.innerHTML = currentQuestion.question;

    // Get the choice for the question
    choices.forEach((choice) => {
        const number = choice.dataset['number'];
        choice.innerHTML = currentQuestion['choice' + number];
        console.log(choice);
        // Remove the question that was just displayed
        availableQuestions.splice(questionIndex, 1);
        // Wait after everything has been loaded
        acceptingAnswers = true;
    });
};

choices.forEach((choice) => {
    choice.addEventListener('click', (event) => {
        console.log(event.target);
        // If not ready to receive answers, just ignore
        if (!acceptingAnswers) return;
        // Set to false due to a delay in page reload
        acceptingAnswers = false;
        const selectedChoice = event.target;
        const selectedAnswer = selectedChoice.dataset['number'];
        console.log(selectedAnswer);
        getNewQuestion();
    });
});

startGame();
