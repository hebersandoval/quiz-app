const username = document.getElementById('username');
const saveScoreBtn = document.getElementById('save-score-btn');
const finalScore = document.getElementById('final-score');

const MAX_HIGH_SCORES = 5;

// Get high score or return an empty []
highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalScore.innerText = mostRecentScore;

username.addEventListener('keyup', (event) => {
    // Disable if player has not typed anything in the input
    saveScoreBtn.disabled = !username.value;
});

const saveHighScore = (event) => {
    event.preventDefault();

    const score = {
        // score: mostRecentScore,
        score: Math.floor(Math.random() * 100),
        name: username.value,
    };
    // Add score to the []
    highScores.push(score);
    // Keep top 5 high score
    highScores.sort((a, b) => {
        // If b is higher than a, then put b before a
        return b.score - a.score;
    });
    // At index 5, start cutting everything
    highScores.splice(5);
    // Save to localStorage
    localStorage.setItem('highScores', JSON.stringify(highScores));
    // Go back home
    window.location.assign('/');
};
