function gameBoard() {
  console.log('this be gameboard');

  const rows = 3;
  const columns = 3;
  board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  function getBoard() {
    return board;
  };

  function dropMark() {
    //
  };


  return {getBoard}


};

game = gameBoard();

function Cell() {

  let value = 0;

  function addMark() {
    value = 'x';
  };

  function getValue() {
    return value;
  };

  return {addMark, getValue};

};
