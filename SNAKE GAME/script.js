const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const restartBtn = document.getElementById("restartBtn");

const box = 20;
let snake, direction, food, score, gameSpeed, gameLoop;

function init() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    food = randomFood();
    score = 0;
    gameSpeed = 150;

    scoreEl.textContent = "Score: 0";

    clearInterval(gameLoop);
    gameLoop = setInterval(updateGame, gameSpeed);
}

function randomFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

function updateGame() {
    let head = { ...snake[0] };

    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;
    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;

    // collision with walls
    if (
        head.x < 0 ||
        head.y < 0 ||
        head.x >= canvas.width ||
        head.y >= canvas.height ||
        snake.some(s => s.x === head.x && s.y === head.y)
    ) {
        alert("Game Over 💀");
        return init();
    }

    snake.unshift(head);

    // eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreEl.textContent = "Score: " + score;
        food = randomFood();

        // speed up slightly
        if (gameSpeed > 60) {
            gameSpeed -= 5;
            clearInterval(gameLoop);
            gameLoop = setInterval(updateGame, gameSpeed);
        }
    } else {
        snake.pop();
    }

    draw();
}

function draw() {
    ctx.fillStyle = "#0b0014";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // food
    ctx.fillStyle = "#ff4fd8";
    ctx.shadowBlur = 10;
    ctx.shadowColor = "#ff4fd8";
    ctx.fillRect(food.x, food.y, box, box);

    // snake
    ctx.fillStyle = "#00f7ff";
    ctx.shadowColor = "#00f7ff";

    snake.forEach((s, i) => {
        ctx.fillRect(s.x, s.y, box, box);
    });

    ctx.shadowBlur = 0;
}

// controls
document.addEventListener("keydown", e => {
    const key = e.key.toLowerCase();

    if ((key === "arrowleft" || key === "a") && direction !== "RIGHT") direction = "LEFT";
    if ((key === "arrowright" || key === "d") && direction !== "LEFT") direction = "RIGHT";
    if ((key === "arrowup" || key === "w") && direction !== "DOWN") direction = "UP";
    if ((key === "arrowdown" || key === "s") && direction !== "UP") direction = "DOWN";
});

restartBtn.addEventListener("click", init);

// start game
init();