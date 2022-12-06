// Each item can be either null (empty), 0 (player 1), 1 (player 2)
const boardState = [
    null, null, null, 
    null, null, null, 
    null, null, null,
];

// The win condition array
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// The Active Player
let activePlayer = 0;

// Cells
const cells = document.querySelectorAll("td");

// Add event listeners to cells
cells.forEach(function (cell, index) {
    cell.dataset.index = index;

    cell.onmouseover = function () {
        cell.style.backgroundColor = "#ccc";
        cell.style.transition = "1s";
    }

    cell.onmouseout = function() {
        cell.style.backgroundColor = "#fff";
    }

    cell.addEventListener("click", clicked);
});

// Clicked function definition 
function clicked (event) {
    const index = Number (event.target.dataset.index);
    
    const letter = activePlayer ? "o" : "x";

    const cell = event.target;
    event.target.textContent = letter;

    boardState[index] = activePlayer;

    cell.removeEventListener("click", clicked);
    cell.onmouseover = null;

    if (hasWon()) {
        window.location = "./winner.html";
    }

    if (hasDrawn()) {
        window.location = "./draw.html";
    }

    activePlayer = activePlayer ? 0 : 1;
}

// The win detector
function hasWon () {
    for (const condition of winConditions) {
        const boardValues = condition.map(function (item) {
            return boardState[item];
        });

        const playerPieces = boardValues.filter(function (item) {
            return item === activePlayer;
        });

        if (playerPieces.length === 3) return true;
    }

    return false;
}

function hasDrawn () {
    const boardCapacity = boardState.filter(function (item) {
        return item !== null;
    });

    return boardCapacity.length === boardState.length;
}

const again = document.querySelector("#again");
if (again) {
    again.onclick = (event) => {
        event.preventDefault();
        window.location = "./";
    }
}