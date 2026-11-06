function loadGamesData() {
    fetch('games.json')
        .then(response => response.json())
        .then(data => renderGameCards(data))
        .catch(error => console.error('Error loading games data:', error));
}

function renderGameCards(games) {
    const gameCardsContainer = document.getElementById('gameCards');
    
    games.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.classList.add('game-card');
        gameCard.innerHTML = `
            <div class="card">
                <img src="${game.icon}" class="card-img-top" alt="${game.name}">
                <div class="card-body">
                    <h5 class="card-title">${game.name}</h5>
                    <p class="card-text" onclick="toggleDescription(this)">
                        ${game.description}
                    </p>
                    <a href="${game.url}" target="_blank" class="btn">开始游戏</a>
                </div>
            </div>
        `;
        gameCardsContainer.appendChild(gameCard);
    });
}

function toggleDescription(element) {
    element.classList.toggle('expanded');
}

window.onload = function() {
    loadGamesData();
};
