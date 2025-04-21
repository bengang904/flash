// 异步加载JSON文件
function loadGamesData() {
    fetch('games.json')
        .then(response => response.json())
        .then(data => renderGameCards(data))
        .catch(error => console.error('Error loading games data:', error));
}

// 渲染所有游戏卡片
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
                    <p class="card-text" onclick="toggleDescription(this)">${game.description}</p>
                    <a href="game.html?swfUrl=${encodeURIComponent(game.swfUrl)}" class="btn">开始游戏</a>
                </div>
            </div>
        `;
        gameCardsContainer.appendChild(gameCard);
    });
}

// 切换描述文字的展开和收起
function toggleDescription(element) {
    element.classList.toggle('expanded');
}

// 初始化页面
window.onload = function() {
    loadGamesData();
};
