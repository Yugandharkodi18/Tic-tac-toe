let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let aiPlayer = "O";
let humanPlayer = "X";
let gameActive = false;

// Choose Player
function setPlayer(player) {
    humanPlayer = player;
    aiPlayer = (player === "X") ? "O" : "X";
    document.getElementById("chooseSign").style.display = "none";
    document.getElementById("gameBoard").style.display = "block";
    gameActive = true;
}

// Handle Player Move
function playerMove(index) {
    if (board[index] === "" && gameActive) {
        board[index] = humanPlayer;
        updateBoard();
        if (!checkWinner(humanPlayer)) {
            aiMove();
        }
    }
}

// AI Move (Simple Logic)
function aiMove() {
    let emptyCells = board.map((val, i) => (val === "" ? i : null)).filter(v => v !== null);
    if (emptyCells.length === 0) return;

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[randomIndex] = aiPlayer;
    updateBoard();
    checkWinner(aiPlayer);
}

// Update Board UI
function updateBoard() {
    let cells = document.getElementsByClassName("cell");
    for (let i = 0; i < 9; i++) {
        cells[i].innerText = board[i];
    }
}

// Check Winner
function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
    ];

    for (let pattern of winPatterns) {
        if (pattern.every(index => board[index] === player)) {
            document.getElementById("status").innerText = `${player} Wins!`;
            gameActive = false;
            return true;
        }
    }

    if (!board.includes("")) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameActive = false;
        return true;
    }
    return false;
}

// Reset Game
function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    document.getElementById("status").innerText = "";
    updateBoard();
}
