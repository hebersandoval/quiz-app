const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', (event) => {
    // Disable if player has not typed anything in the input
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (event) => {
    event.preventDefault();
    console.log('Clicked on save');
};
