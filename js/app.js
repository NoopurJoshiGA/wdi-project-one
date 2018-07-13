//load the page
window.addEventListener('DOMContentLoaded', () => {

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// DELIVERABLE 1 ///////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GAME SETUP //////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  //set up the game
  //to set up the game, create a board, specify the width and height of the board and add it to the dom
  //create an array of aliens and appendchild to the board
  //create player and append to the board, add to the middle of the screen (x axis width/2)?, height will be a little top from the bottle
  //add event listeners to move the player to the player
  function startGame() {
    console.log('starting game...');
    createBoard();
    createPlayer();
  }

  function createBoard() {
    const boardContainer = document.querySelector('.board-container');
    const gameBoard = document.createElement('div');
    boardContainer.appendChild(gameBoard);
    gameBoard.style.border = '2px solid black';
    // gameBoard.style.backgroundColor = 'black';
    gameBoard.style.width = '700px';
    gameBoard.style.height = '700px';
  }

  function createPlayer() {
    const player = document.createElement('div');
    gameBoard.appendChild(player);
    player.style.width = '50px';
    player.style.height = '50px';
  }

  //createAliens()
  //add event listeners()

  //move the aliens
  //moveAlien()
  //using timeouts? every second, move the array to the right and then down if it reaches the edge of the screen

  //somehow figure out how to shoot bullets
  //shootBullet()
  //add event listener for the spacebar
  //create a square for now as the bullet
  //attach the bullet to the player

  //somehow create collision detection
  //use square divs for now
  //check the boundaries of objects are touching, specificy 4 checks - one for each corner of the object
  //removeAlien() if players bullet hits the alien then remove the alien from the array

  //initialise the game...
  startGame();
});
