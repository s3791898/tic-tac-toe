const Gameboard = (() => {
  const board = Array(9).fill(null);

  const getBoard = () => board;

  const markCell = (index, playerSymbol) => {
    if (board[index] === null) {
      board[index] = playerSymbol;
      return true;
    }
    return false;
  };

  const resetBoard = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = null;
    }
  };

  return {
    getBoard,
    markCell,
    resetBoard,
  };
})();
