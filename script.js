// Element Selection
const cells = document.querySelectorAll(".cell");

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

  switchPlayer();
}

// Function to check if cell already marked

function checkCell(cell) {
  if (cell.classList.contains("cross") || cell.classList.contains("circle")) {
    return false;
  }
  return true;
}

//  Adding event listner on cell
cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    if (checkCell(cell)) {
      markCell(cell);
    }
  });
});
