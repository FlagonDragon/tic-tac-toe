function gameBoard() {

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

  function dropMark(row, column, player) {
 
    if (board[row][column] == 'o' || board[row][column] == 'x') return;

    board[row][column].addMark(player);

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

  function addMark(player) {
    value = player;
  };

  function getValue() {
    return value;
  };

  return {addMark, getValue};

};

function GameController() {

  const board = gameBoard();

  const players = [
    {
      name: 'playerOne',
      token: 'x'
    },
    {
      name: 'playerTwo',
      token: 'o'
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

  function playRound(row, column) {

    console.log(
      `Adding ${getActivePlayer().name}'s mark into board`
    );

    board.dropMark(row, column, getActivePlayer().token);

    switchPlayerTurn();
    printNewRound();
    
  };

  printNewRound();

  return {playRound, getActivePlayer};

};

game = GameController();