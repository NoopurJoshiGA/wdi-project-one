
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// DECLARE VARIABLES //////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//get board variable from DOM
const gameBoard = document.querySelector('.board');
//get container where the invaders will be placed
const invadersBoard = document.querySelector('.invadersBoard');
//get score board
const scoreBoard = document.querySelector('.score');
//add elements to the game board
gameBoard.appendChild(scoreBoard);
gameBoard.appendChild(invadersBoard);

//score
let score = 0;

//invader variables
let invader;
//create empty array of invaders
let invaders = [];
let invaderPositionLeft = 0;
let invaderPositionTop = 60;
//speed at which the invaders will move
const invaderSpeed = 1;
//distance the invaders will drop after touching the sides
let invaderDrop = 100;
let touchedRightSide = false;

//speed at which the bullet will fire
const bulletSpeed = 20;

//player
let player = document.querySelector('.player');

//create player object
const Player = {
  x: 260,
  y: 550,
  w: 50,
  h: 50,
  speed: 20
};

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CREATE INVADERS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//create the invaders
for (let i = 0; i < 21; i++) {
  //create 21 invaders
  invader = document.createElement('div');
  //give them all a class
  invader.classList.add('invader');
  //add to screen
  invadersBoard.appendChild(invader);
  //add invaders to array
  invaders.push(invader);
  //give all invaders an ID - this will be used to determine collision
  invader.setAttribute('id', i);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CREATE PLAYER //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function createPlayer() {
  //add player to the game board
  gameBoard.appendChild(player);
  //position player in the middle
  player.style.left = Player.x + 'px';
  player.style.top = Player.y + 'px';
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOVE INVADERS //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function moveInvaderRight() {
  if(!touchedRightSide) {
    const moveRight = setInterval(function() {
      if(invaderPositionLeft < 130) {
        invaderPositionLeft += invaderSpeed;
        invadersBoard.style.left = invaderPositionLeft + 'px';
      } else {
        clearInterval(moveRight);
        touchedRightSide = true;
        dropInvader(touchedRightSide);
      }
    }, 10);
  }
}

function dropInvader(touchedRightSide) {
  if(touchedRightSide) {
    invaderPositionTop += invaderDrop;
    invadersBoard.style.top = invaderPositionTop + 'px';
    moveInvaderLeft();
  } else {
    invaderPositionTop += invaderDrop;
    invadersBoard.style.top = invaderPositionTop + 'px';
    moveInvaderRight();
  }
}

function moveInvaderLeft() {
  if(touchedRightSide) {
    const moveLeft = setInterval(function() {
      if(invaderPositionLeft > 0) {
        invaderPositionLeft -= invaderSpeed;
        invadersBoard.style.left = invaderPositionLeft + 'px';
      } else {
        clearInterval(moveLeft);
        touchedRightSide = false;
        dropInvader(touchedRightSide);
      }
    }, 10);
  }
}

//make player move
document.onkeydown = function(e) {
  //move player left
  if(Player.x > -30 && e.keyCode === 37) {
    Player.x -= Player.speed;
    player.style.left = Player.x + 'px';

  } else if (Player.x < 650 && e.keyCode === 39) {
    Player.x += Player.speed;
    player.style.left = Player.x + 'px';

  } else if (e.keyCode === 32) {
    shootBullet();
  }
};

function shootBullet() {
  //create bullet element
  const bullet = document.createElement('div');
  //give bullet a class
  bullet.classList.add('bullet');
  //add bullet to game screen
  gameBoard.appendChild(bullet);
  //position bullet so it's in the center of the player
  bullet.style.left = Player.x + 65 + 'px';
  bullet.style.top = Player.y + 'px';
  //start firing the bullet from the same height as the player
  let bulletPosition = Player.y;
  const fireBullet = setInterval(function() {
    if(bulletPosition > 0 ) {
      //make sure bullet doesn't go to infinity and beyond
      bulletPosition -= bulletSpeed;
      bullet.style.top = bulletPosition + 'px';
      //if a collision has been detected
      //stop moving the bullet
      if(checkCollision(bullet)) {
        clearInterval(fireBullet);
      }
    } else if(bulletPosition <= 0){
      //if bullet goes out of bounds
      clearInterval(fireBullet);
      //remove the bullet from game screen
      gameBoard.removeChild(bullet);
    }
  }, 50);
}

function checkCollision(bullet) {
  for(let i=0; i<invaders.length; i++) {
    //get corners of the bullets and invaders
    const invaderBottom = invaders[i].getBoundingClientRect().top;
    const invaderLeft = invaders[i].getBoundingClientRect().left;
    const invaderRight = invaderLeft + 40;

    const bulletLeft = bullet.getBoundingClientRect().left;
    const bulletRight = bulletLeft + 10;
    const bulletTop = bullet.getBoundingClientRect().top;

    //collision detection conditionals
    if(((!invaders[i].classList.contains('hit')) && bulletTop < invaderBottom + 40) && (bulletRight > invaderLeft) && (bulletLeft < invaderRight)) {
      const id = invaders[i].getAttribute('id');
      //add a class of hit to the invader, this will help determine whether or not you've won the game
      invaders[i].classList.add('hit');
      //remove bullet from dom
      gameBoard.removeChild(bullet);
      //increase score
      score += 10;
      //display the score
      scoreBoard.innerHTML = 'Score: ' + score;

      return true;
      //checkLoss();

    }

    // another if to check if bullet has reached the top (if so, clear it anyway)
  }
  return false;
}



function gameLoop() {
  setTimeout(gameLoop, 1000);
  checkLoss();
  checkWin();
}

function checkLoss(){
  for(let i=0; i<invaders.length; i++) {
    if(invaders[i].getBoundingClientRect().top > 600) {
      console.log(invaders[i].getBoundingClientRect().top);
      console.log('game over');
      gameBoard.removeChild(invadersBoard);
      gameBoard.removeChild(player);
      gameBoard.removeChild(scoreBoard);
      const gameOverMessage = document.createElement('div');
      gameBoard.appendChild(gameOverMessage);
      gameOverMessage.classList.add('gameOverMessage');
      gameOverMessage.innerHTML = 'You\'ve been defeated';
    }
  }
}

function checkWin() {
  //if all 21 invaders have been hit, then you win the game hurray!
  if(document.querySelectorAll('.hit').length === 21) {
    //remove all the elements from the game board
    gameBoard.removeChild(invadersBoard);
    gameBoard.removeChild(player);
    gameBoard.removeChild(scoreBoard);

    //remove any bullets left on the screen
    const selectAllBullets = document.querySelectorAll('.bullet');
    selectAllBullets.forEach(bullet => {
      gameBoard.removeChild(bullet);
    });

    //clear any intervals
    clearInterval(moveInvaderLeft);
    clearInterval(moveInvaderRight);

    const gameOverMessage = document.createElement('div');
    gameBoard.appendChild(gameOverMessage);
    gameOverMessage.classList.add('gameOverMessage');
    gameOverMessage.innerHTML = 'Congratulations! You\'ve saved the galaxy';
  }
}

gameLoop();
createPlayer();
moveInvaderRight();
