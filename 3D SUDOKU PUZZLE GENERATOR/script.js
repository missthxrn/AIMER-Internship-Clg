const cube = document.getElementById("cube");

let currentGrid = [];
let solutionGrid = [];
let currentLevel = 'easy';
let rotationY = 10;

// CREATE GRID
function createGrid(grid) {
    cube.innerHTML = "";

    grid.forEach((row, r) => {
        row.forEach((num, c) => {
            const cell = document.createElement("div");
            cell.classList.add("cell");

            cell.contentEditable = num === 0;
            cell.textContent = num !== 0 ? num : "";

            // CLICK (select cell)
            cell.addEventListener("click", () => {
                document.querySelectorAll(".cell").forEach(c => {
                    c.classList.remove("active");
                });
                cell.classList.add("active");
            });

            // INPUT (typing numbers)
            cell.addEventListener("input", () => {
                let val = parseInt(cell.textContent);

                if (!val || val < 1 || val > 9) {
                    cell.textContent = "";
                    cell.classList.remove("correct", "wrong");
                    return;
                }

                if (val === solutionGrid[r][c]) {
                    cell.classList.add("correct");
                    cell.classList.remove("wrong");
                } else {
                    cell.classList.add("wrong");
                    cell.classList.remove("correct");
                }
            });

            cube.appendChild(cell);
        });
    });
}

// GENERATE
function generateSudoku(level = 'easy') {
    currentLevel = level;

    let grid = Array.from({ length: 9 }, () => Array(9).fill(0));
    solve(grid);

    solutionGrid = grid.map(r => [...r]);
    currentGrid = grid.map(r => [...r]);

    let removeCount = level === 'easy' ? 30 :
        level === 'medium' ? 45 : 60;

    removeNumbers(currentGrid, removeCount);
    createGrid(currentGrid);
}

// SOLVER
function solve(grid) {
    for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
            if (grid[r][c] === 0) {
                let nums = shuffle([1, 2, 3, 4, 5, 6, 7, 8, 9]);

                for (let num of nums) {
                    if (isValid(grid, r, c, num)) {
                        grid[r][c] = num;
                        if (solve(grid)) return true;
                        grid[r][c] = 0;
                    }
                }
                return false;
            }
        }
    }
    return true;
}

function isValid(grid, r, c, num) {
    for (let i = 0; i < 9; i++) {
        if (grid[r][i] === num || grid[i][c] === num) return false;
    }

    let br = Math.floor(r / 3) * 3;
    let bc = Math.floor(c / 3) * 3;

    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (grid[br + i][bc + j] === num) return false;
        }
    }

    return true;
}

function removeNumbers(grid, count) {
    while (count > 0) {
        let r = Math.floor(Math.random() * 9);
        let c = Math.floor(Math.random() * 9);

        if (grid[r][c] !== 0) {
            grid[r][c] = 0;
            count--;
        }
    }
}

function shuffle(arr) {
    return arr.sort(() => Math.random() - 0.5);
}

// ROTATE
function rotateBoard(val) {
    rotationY += val;
    cube.style.transform = `rotateX(10deg) rotateY(${rotationY}deg)`;
}

// RESET
function resetBoard() {
    createGrid(currentGrid);
}

// SOLVE
function solveBoard() {
    createGrid(solutionGrid);
}

// START
generateSudoku();