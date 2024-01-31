const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;
  };

  const resetBoard = () => {
    gameboard.fill("");
    render();
  };

  return {
    render,
    resetBoard,
  };
})();

const player = (name, symbol) => ({
  name,
  symbol,
});

const Game = (() => {
  let players = [];
  let currentPlayer;
  let gameOver;

  const startGame = () => {
    players = [
      player(document.querySelector("#player1").value, "X"),
      player(document.querySelector("#player2").value, "O"),
    ];
    // Randomly select the starting player
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    gameOver = false;
    Gameboard.render();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkWinner = () => {};

  const endGame = () => {};

  return { startGame, switchPlayer, getCurrentPlayer };
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  Game.startGame();
});
