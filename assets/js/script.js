const Gameboard = (() => {
  const gameboard = ["", "", "", "", "", "", "", "", ""];
  const resultDisplay = document.querySelector("#result-display");
  const messageDisplay = document.querySelector("#message");

  const render = () => {
    let boardHTML = "";
    gameboard.forEach((square, index) => {
      boardHTML += `<div class="square" id="square-${index}">${square}</div>`;
    });
    document.querySelector("#gameboard").innerHTML = boardHTML;

    // Add event listeners to each square
    document.querySelectorAll(".square").forEach((square, index) => {
      square.addEventListener("click", () => {
        // Check if the clicked square is empty
        if (gameboard[index] === "") {
          // Update the gameboard array with the current player's symbol
          gameboard[index] = Game.getCurrentPlayer().symbol;
          render();

          const winner = Game.checkWinner();
          if (winner === true) {
            resultDisplay.textContent = `${
              Game.getCurrentPlayer().name
            } is the Winner!`;
          } else if (winner === "tie") {
            resultDisplay.textContent = `This match was a Tie!`;
          } else {
            Game.switchPlayer();
          }
        }
      });
    });
  };

  const resetBoard = () => {
    gameboard.fill("");
    render();
  };

  const getGameboard = () => gameboard;

  return {
    render,
    resetBoard,
    getGameboard,
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
  const resultDisplay = document.querySelector("#result-display");

  const startGame = () => {
    players = [
      player(document.querySelector("#player1").value, "X"),
      player(document.querySelector("#player2").value, "O"),
    ];
    // Randomly select the starting player
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    Gameboard.render();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    resultDisplay.textContent = `${getCurrentPlayer().name} turn`;
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkWinner = () => {
    const currentPlayerSymbol = getCurrentPlayer().symbol;
    const gameboard = Gameboard.getGameboard();
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (
        gameboard[a] === currentPlayerSymbol &&
        gameboard[b] === currentPlayerSymbol &&
        gameboard[c] === currentPlayerSymbol
      ) {
        return true;
      }
    }

    if (gameboard.every((square) => square !== "")) {
      return "tie";
    }

    return false;
  };

  const endGame = () => {};

  return { startGame, switchPlayer, getCurrentPlayer, checkWinner };
})();

const startButton = document.querySelector("#start-button");
startButton.addEventListener("click", () => {
  const player1Name = document.querySelector("#player1");
  const player2Name = document.querySelector("#player2");

  if (player1Name.value === "" || player2Name.value === "") {
    document.querySelector("#message").textContent =
      "Please enter in the name of both players";
  } else {
    Game.startGame();
    player1Name.value = "";
    player2Name.value = "";
  }
});

const restartButton = document.querySelector("#restart-button");
restartButton.addEventListener("click", () => {
  Gameboard.resetBoard();
});

// NOTE FOR NEXT STEP
// figure out how to disable the gameboard when a winner is determined to prevent the user from playing.
// Add further styles to the result-display, message, background and the overall visual of the game.
