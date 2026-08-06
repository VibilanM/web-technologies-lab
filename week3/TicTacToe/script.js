const cells = document.querySelectorAll(".cell");

let currentPlayer = "X";
let gameOver = false;

// All possible winning combinations
const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    
    [0, 4, 8],
    [2, 4, 6]
];

function checkWinner() {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;

        if (
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) {
            return true;
        }
    }
    return false;
}

function checkDraw() {
    for (let cell of cells) {
        if (cell.textContent === "") {
            return false;
        }
    }
    return true;
}

cells.forEach((cell) => {
    cell.addEventListener("click", () => {
        if (cell.textContent !== "" || gameOver) return;

        cell.textContent = currentPlayer;

        if (checkWinner()) {
            alert(currentPlayer + " wins!");
            gameOver = true;
            return;
        }

        if (checkDraw()) {
            alert("It's a draw!");
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";
    });
});