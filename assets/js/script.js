const Gameboard = (() => {
  const board = [];

  const initialiseBoard = () => {
    for (let i = 0; i < 9; i++) {
      board.push(null); // Initialises each cell with null (empty)
    }
  };

  const getBoard = () => board.slice();

  const updateCell = (index, player) => {
    if (index >= 0 && index < board.length && board[index] === null) {
      board[index] = player; // Update the cell with the players symbol
      return true; // Cell updated successfully
    }
    return false; // Cell update failed
  };

  const resetBoard = () => {
    board.fill(null);
  };

  initialiseBoard();

  return {
    getBoard,
    updateCell,
    resetBoard,
  };
})();

const Player = (name, symbol) => ({
  name,
  symbol,
});

const GameController = (() => {
  let currentPlayer;
  let winner = null;

  const startGame = (player1, player2) => {
    // Randomly select the starting player
    currentPlayer = Math.random() < 0.5 ? player1 : player2;
    winner = null; // Reset the winner
  };

  const switchPlayer = () => {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
  };

  const getCurrentPlayer = () => currentPlayer;

  const checkWinner = () => {};

  const endGame = () => {};

  return { startGame, switchPlayer, getCurrentPlayer };
})();
