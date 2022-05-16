const highScoreList = document.getElementById('high-score-list');

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

// Iterate ove all the scores and return a String of each score and join them
highScoreList.innerHTML = highScores
    .map((score) => {
        return `<li class="high-score">${score.name} ❤️ ${score.score}</li>`;
    })
    .join('');
