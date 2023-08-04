// Element Selection
const cells = document.querySelectorAll(".cell");
const summary = document.querySelector(".summary");
const restartBtn = document.querySelector(".restart");

const overlay = document.querySelector(".overlay");

// This is an array whcih contain all possible combination of winning
const winningCombination = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 4, 6],
  [2, 5, 8],
  [3, 4, 5],
  [6, 7, 8],
];

// Array to save game state
const gameState = [];

// p1 (circle)
// p2 (cross)
const PLAYER_1 = "circle";
const PLAYER_2 = "cross";
let playerTurn = PLAYER_1;

function switchPlayer() {
  playerTurn = playerTurn === PLAYER_1 ? PLAYER_2 : PLAYER_1;
}

// Function to mark cell
function markCell(cell) {
  // marking cell according to player
  cell.classList.add(playerTurn);

  gameState[cell.dataset.index] = playerTurn;
}

// Function to check if cell already marked

function checkCell(cell) {
  if (cell.classList.contains("cross") || cell.classList.contains("circle")) {
    return false;
  }
  return true;
}

// Checking if current player won
function checkWin() {
  let isWin = winningCombination.some((combination) => {
    return combination.every((c) => gameState[c] === playerTurn);
  });

  return isWin;
}

function isDraw() {
  return gameState.length === 9 && !gameState.includes(undefined);
}

function showSummaryText(text) {
  const p = document.createElement("p");

  p.innerText = text;

  // clearing inner html for summary
  summary.innerHTML = "";
  summary.appendChild(p);

  // Showing overlay
  overlay.classList.remove("none");
}

// Restart Game
function restartGame() {
  gameState.length = 0;
  playerTurn = PLAYER_1;
  overlay.classList.add("none");

  // We have to remove classes from all div of cross and circle
  cells.forEach((cell) => {
    cell.classList = ["cell"];
  });
}

//  Adding event listner on cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (checkCell(cell)) {
      markCell(cell);
      // Check after making current player move is he/she won the game
      if (checkWin()) {
        // State if any user win
        showSummaryText(`${playerTurn} Wins`);

        return;
      }
      if (isDraw()) {
        showSummaryText("Game was drawn");

        return;
      }
      switchPlayer();
    }
  });
});

restartBtn.addEventListener("click", () => {
  restartGame();
});
