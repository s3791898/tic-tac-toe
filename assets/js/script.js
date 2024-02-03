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
        // Check if the game is over
        if (!Game.isGameOver()) {
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
              Game.endGame();
            } else if (winner === "tie") {
              resultDisplay.textContent = "Tie!";
              Game.endGame();
            } else {
              Game.switchPlayer();
            }
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

  render();

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
  let gameOver = false;
  const resultDisplay = document.querySelector("#result-display");
  const startButton = document.querySelector("#start-button");
  const restartButton = document.querySelector("#restart-button");

  startButton.addEventListener("click", () => {
    gameOver = false;
    Gameboard.resetBoard();
    const player1Name = document.querySelector("#player1");
    const player2Name = document.querySelector("#player2");
    const displayMessage = document.querySelector("#message");

    if (player1Name.value === "" || player2Name.value === "") {
      displayMessage.textContent = "Please enter in the name of both players";
    } else {
      startGame();
      displayMessage.textContent = `${player1Name.value} is (X) and ${player2Name.value} is (O)`;
      player1Name.value = "";
      player2Name.value = "";
    }
  });

  restartButton.addEventListener("click", () => {
    gameOver = false;
    Gameboard.resetBoard();
    switchPlayer();
  });

  const startGame = () => {
    players = [
      player(document.querySelector("#player1").value, "X"),
      player(document.querySelector("#player2").value, "O"),
    ];
    // Randomly select the starting player
    currentPlayer = players[Math.floor(Math.random() * players.length)];
    resultDisplay.textContent = `${getCurrentPlayer().name}'s turn`;
    Gameboard.render();
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    resultDisplay.textContent = `${getCurrentPlayer().name}'s  turn`;
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

  const endGame = () => {
    gameOver = true;
  };

  const isGameOver = () => {
    return gameOver;
  };

  return {
    startGame,
    switchPlayer,
    getCurrentPlayer,
    checkWinner,
    endGame,
    isGameOver,
  };
})();
