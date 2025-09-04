function gameBoard() {

  const rows = 3;
  const columns = 3;
  let board = [];

  for (let i = 0; i < rows; i++) {
    board[i] = [];
    for (let j = 0; j < columns; j++) {
      board[i].push(Cell());
    }
  }

  function getBoard() {
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
        
        return 'gameOver';

      };

    };

    for (i = 0; i < 3; i++) {

      var winConColumn = board[0][i].getValue() + board[1][i].getValue() + board[2][i].getValue();

      if (winConColumn == 'xxx' || winConColumn == 'ooo' ) {
        
        return 'gameOver';

      };

    };

   
    var winConDiag = ''
    for (i = 0; i < 3; i++) {
      
      winConDiag += board[i][i].getValue();

      if (winConDiag == 'xxx' || winConDiag == 'ooo' ) {
        
        return 'gameOver';

      };

    };

    winConDiag2 = board[0][2].getValue() + board[1][1].getValue() + board[2][0].getValue()

    if (winConDiag2 == 'xxx' || winConDiag2 == 'ooo' ) {
      
      return 'gameOver';

    };

    singleRow = [];
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        singleRow.push(board[i][j].getValue());
      };
    };
    
    if (!singleRow.includes('')) {
      
      return 'tie';

    }
  
  };

  function printBoard() {

    const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()))
    
    console.log(boardWithCellValues);

  };

  function newBoard () {

    board = [];

    for (let i = 0; i < rows; i++) {
      board[i] = [];
      for (let j = 0; j < columns; j++) {
        board[i].push(Cell());
      };
    };
  };

  return {getBoard, dropMark, printBoard, newBoard};

};

gameOn = true;

myBoard = gameBoard();

var playerOneName = 'Player One'
var playerTwoName = 'Player Two'

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

function GameController () {

  const board = gameBoard();

  const players = [
    {
      name: playerOneName,
      token: 'x'
    },
    {
      name: playerTwoName,
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

      console.log('Cell is already occupied!');

      return 'occupied'

    } else if (play == 'gameOver') {

      board.printBoard();

      console.log(getActivePlayer().name + ' WINS!!');
      
      return 'gameOver';

    } else if (play == 'tie') {
      
      console.log('We have a TIE!!!');

      return 'tie'

    } else {

    switchPlayerTurn();
    printNewRound();

    };

  };

  function restartGame () {
    
    board.newBoard();

    if (activePlayer == players[1]) {
      switchPlayerTurn();
     };

    gameOn = true;

  }

  printNewRound();

  return {players, playRound, getActivePlayer, restartGame, getBoard: board.getBoard};

};

// game = GameController();


function ScreenController() {
  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const game = GameController();

  const updateScreen = () => {

    boardDiv.textContent = "";

    const board = game.getBoard();
    const activePlayer = game.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.row = i
        cellButton.dataset.column = j
        cellButton.textContent = board[i][j].getValue();
        boardDiv.appendChild(cellButton);
      };
    };
  }

  function clickHandlerBoard(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;

    if ((!gameOn) || (!selectedColumn)) {
      return;
    };
    
    result = game.playRound(selectedRow,selectedColumn);

    if (result == 'occupied') {

      updateScreen();

      playerTurnDiv.textContent = 'Cell is already occupied!'

    } else if (result == 'gameOver') {

      gameOn = false;
  
      updateScreen();

      alert(game.getActivePlayer().name + ' WINS!!')

      playerTurnDiv.textContent = game.getActivePlayer().name + ' WINS!!'

    } else if (result == 'tie') {

      gameOn = false;

      updateScreen();

      playerTurnDiv.textContent = 'We have a TIE!!!'

    } else {

      updateScreen();

    }

  };

  const nameBtn = document.querySelector('.nameBtn');
  const myDialog = document.getElementById("myDialog");
  const player1Input = myDialog.querySelector("#player1");
  const player2Input = myDialog.querySelector("#player2");
  const confirmBtn = myDialog.querySelector("#confirmBtn");

  function nameChange () {
    myDialog.showModal();
  };

  nameBtn.addEventListener("click", nameChange);

  confirmBtn.addEventListener('click', (event) => {

    event.preventDefault();

    myDialog.close();

    playerOneName = player1Input.value
    playerTwoName = player2Input.value
    game.players[0].name = playerOneName
    game.players[1].name = playerTwoName

    updateScreen();
    
  }); 

  const restartBtn = document.querySelector('.restartBtn');
  
  restartBtn.addEventListener("click", () => {

    console.log('yea i think im workin!');
    
    game.restartGame();

    updateScreen();
  
  });

  boardDiv.addEventListener("click", clickHandlerBoard);

  updateScreen();

}

ScreenController();