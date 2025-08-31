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
 
    if (board[row][column].getValue() == 'o' || board[row][column].getValue() == 'x') { 

      return 'occupied'; 

    } else {

      board[row][column].addMark(player);

    };

    for (i = 0; i < 3; i++) {

      var winConRow = board[i][0].getValue() + board[i][1].getValue() + board[i][2].getValue();

      if (winConRow == 'xxx' || winConRow == 'ooo' ) {
        
        console.log('winConRow is: ' + winConRow);
        
        return 'gameOver';

      };

    };

    for (i = 0; i < 3; i++) {

      var winConColumn = board[0][i].getValue() + board[1][i].getValue() + board[2][i].getValue();

      if (winConColumn == 'xxx' || winConColumn == 'ooo' ) {
        
        console.log('winConColumn is: ' + winConColumn);
        
        return 'gameOver';

      };

    };

   
    var winConDiag = ''
    for (i = 0; i < 3; i++) {
      
      winConDiag += board[i][i].getValue();

      // console.log('winConDiag is: ' + winConDiag);

      if (winConDiag == 'xxx' || winConDiag == 'ooo' ) {
        
        console.log('winConDiag is: ' + winConDiag);
        
        return 'gameOver';

      };

    };

    winConDiag2 = board[0][2].getValue() + board[1][1].getValue() + board[2][0].getValue()

    if (winConDiag2 == 'xxx' || winConDiag2 == 'ooo' ) {
      
      return 'gameOver';

    };
  
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
      `Adding ${getActivePlayer().name}'s mark onto board...`
    );

    play = board.dropMark(row, column, getActivePlayer().token);

    if (play == 'occupied') {

      return 'Cell is already occupied!'

    } else if (play == 'gameOver') {

      board.printBoard();
      
      return getActivePlayer().name + ' WINS!!';

    } else {

    // console.log(board[0][1].getValue());

    switchPlayerTurn();
    printNewRound();

    };

  };

  printNewRound();

  return {playRound, getActivePlayer};

};

game = GameController();