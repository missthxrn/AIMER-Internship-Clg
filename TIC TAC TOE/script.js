const boardEl = document.getElementById("board");
const statusEl = document.getElementById("status");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let mode = "2p";

let scoreX = 0;
let scoreO = 0;

function renderBoard() {
    boardEl.innerHTML = "";
    board.forEach((cell, i) => {
        const div = document.createElement("div");
        div.classList.add("cell");
        div.textContent = cell;
        div.onclick = () => handleMove(i);
        boardEl.appendChild(div);
    });
}

function handleMove(i) {
    if (board[i] || !gameActive) return;

    board[i] = currentPlayer;
    renderBoard();

    if (checkWin()) return;

    currentPlayer = currentPlayer === "X" ? "O" : "X";

    if (mode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 300);
    }
}

function aiMove() {
    let move;

    if (mode === "easy") move = randomMove();
    else if (mode === "medium") move = smartMove();
    else move = bestMove();

    board[move] = "O";
    renderBoard();

    if (checkWin()) return;

    currentPlayer = "X";
}

function randomMove() {
    let empty = board.map((v, i) => v === "" ? i : null).filter(v => v !== null);
    return empty[Math.floor(Math.random() * empty.length)];
}

function smartMove() {
    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            if (checkWinner("O")) return i;
            board[i] = "";
        }
    }
    return randomMove();
}

function bestMove() {
    let bestScore = -Infinity;
    let move;

    for (let i = 0; i < 9; i++) {
        if (board[i] === "") {
            board[i] = "O";
            let score = minimax(board, 0, false);
            board[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(newBoard, depth, isMax) {
    if (checkWinner("O")) return 10 - depth;
    if (checkWinner("X")) return depth - 10;
    if (!newBoard.includes("")) return 0;

    if (isMax) {
        let best = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "O";
                best = Math.max(best, minimax(newBoard, depth + 1, false));
                newBoard[i] = "";
            }
        }
        return best;
    } else {
        let best = Infinity;
        for (let i = 0; i < 9; i++) {
            if (newBoard[i] === "") {
                newBoard[i] = "X";
                best = Math.min(best, minimax(newBoard, depth + 1, true));
                newBoard[i] = "";
            }
        }
        return best;
    }
}

function checkWin() {
    if (checkWinner(currentPlayer)) {
        statusEl.textContent = currentPlayer + " Wins!";
        gameActive = false;

        if (currentPlayer === "X") scoreX++;
        else scoreO++;

        document.getElementById("scoreX").textContent = scoreX;
        document.getElementById("scoreO").textContent = scoreO;

        return true;
    }

    if (!board.includes("")) {
        statusEl.textContent = "Draw!";
        gameActive = false;
        return true;
    }

    return false;
}

function checkWinner(p) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(c => c.every(i => board[i] === p));
}

function resetGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;
    statusEl.textContent = "";
    renderBoard();
}

function setMode(m) {
    mode = m;
    resetGame();
}

renderBoard();