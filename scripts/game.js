// const fetch = require('fetch');
// import fetch from 'fetch';

const question = document.getElementById('question');
// Change to an []
const choices = Array.from(document.getElementsByClassName('choice-text'));
const progressText = document.getElementById('progress-text');
const scoreText = document.getElementById('score');
const progressBarFull = document.getElementById('progress-bar-full');
const loader = document.getElementById('loader');
const game = document.getElementById('game');

// Game constants
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [];

// Get question from json file using fetch
// fetch('scripts/questions.json')
// Using Open Trivia DB
fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
    .then((response) => {
        return response.json();
    })
    .then((loadedQuestions) => {
        console.log(loadedQuestions.results);
        // Transform each loaded question
        questions = loadedQuestions.results.map((loadedQuestion) => {
            const formattedQuestion = {
                question: loadedQuestion.question,
            };

            // Contains incorrect answers at this point
            const answerChoices = [...loadedQuestion.incorrect_answers];
            // Generate random number for the current answer (0 and 3)
            formattedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            // Not zero based, so subtract 1 and not going to remove any elements and put in the correct question
            answerChoices.splice(formattedQuestion.answer - 1, 0, loadedQuestion.correct_answer);

            // Iterate through the answer choices
            answerChoices.forEach((choice, index) => {
                // Answer choices will be put in the formatted question dynamically
                formattedQuestion['choice' + (index + 1)] = choice;
            });

            return formattedQuestion;
        });
        // Wait until question are loaded to start game
        // questions = loadedQuestions;
        startGame();
    })
    .catch((error) => {
        console.log(error);
    });

const startGame = () => {
    questionCounter = 0;
    score = 0;
    // Make a full copy of the questions' []
    availableQuestions = [...questions];
    getNewQuestion();
    // Loader
    game.classList.remove('hidden');
    loader.classList.add('hidden');
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
