const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let score = 0; // 分数
let player = { x: 50, y: 300, width: 50, height: 50, dy: 0, gravity: 1.5, jumpPower: -20, isJumping: false };
let obstacles = [];
let gameInterval, obstacleInterval;
let isGameOver = false;
const scoreElement = document.getElementById('score');
const gameOverMessage = document.getElementById('gameOverMessage');

// 绘制玩家
function drawPlayer() {
ctx.fillStyle = 'blue';
ctx.fillRect(player.x, player.y, player.width, player.height);
}

// 绘制障碍物
function drawObstacles() {
ctx.fillStyle = 'green';
obstacles.forEach(obstacle => {
ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
});
}

// 更新玩家状态
function updatePlayer() {
player.y += player.dy;
player.dy += player.gravity;

if (player.y + player.height >= canvas.height) {
player.y = canvas.height - player.height;
player.isJumping = false;
player.dy = 0;
}
}

// 创建障碍物
function createObstacle() {
const obstacle = { x: canvas.width, y: 350, width: 20, height: 50 };
obstacles.push(obstacle);
}

// 更新障碍物状态
function updateObstacles() {
obstacles.forEach((obstacle, index) => {
obstacle.x -= 5;
if (obstacle.x + obstacle.width < 0) {
obstacles.splice(index, 1);
score++;
scoreElement.textContent = `Score: ${score}`;
}
});
}

// 检查碰撞
function checkCollision() {
obstacles.forEach(obstacle => {
if (player.x < obstacle.x + obstacle.width &&
player.x + player.width > obstacle.x &&
player.y < obstacle.y + obstacle.height &&
player.y + player.height > obstacle.y) {
endGame();
}
});
}

// 开始游戏
function startGame() {
gameInterval = setInterval(() => {
ctx.clearRect(0, 0, canvas.width, canvas.height); // 清除画布
drawPlayer();
drawObstacles();
updatePlayer();
updateObstacles();
checkCollision();
}, 1000 / 60);

obstacleInterval = setInterval(createObstacle, 2000);
}

// 结束游戏
function endGame() {
clearInterval(gameInterval);
clearInterval(obstacleInterval);
isGameOver = true;
gameOverMessage.style.display = "block";
}

// 控制跳跃
window.addEventListener('keydown', function(e) {
if (e.code === 'Space' && !player.isJumping) {
player.dy = player.jumpPower;
player.isJumping = true;
}
});

// 启动游戏
startGame();
未选择文件
