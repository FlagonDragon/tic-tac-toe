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
    console.log(typeof(board));
    return board;
  };

  function dropMark() {
    //
  };



  function printBoard() {

    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    
    console.log(boardWithCellValues);

  };


  return {getBoard, dropMark, printBoard};


};

myBoard = gameBoard();

function Cell() {

  let value = '';

  function addMark() {
    value = 'x';
  };

  function getValue() {
    return value;
  };

  return {addMark, getValue};

};

function GameController() {

  const board = Gameboard();

  const players = [
    {
      name: 'playerOne',
      token: 1
    },
    {
      name: 'playerTwo',
      token: 2
    }
  ];

  let activePlayer = players[0];

  function switchPlayerTurn() {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };

  function getActivePlayer() {
    return activePlayer;
  };

  function printNewRound() {
    board.printBoard();
    console.log(
      `${getActivePlayer().name}'s turn.`
    );
  };

  function playRound() {

    console.log(
      `Adding ${getActivePlayer}'s mark into board`
    );

    board.dropMark();

    switchPlayerTurn();
    printNewRound();
  };


};