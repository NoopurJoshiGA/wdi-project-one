
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
let invaderDrop = 20;
let touchedRightSide = false;

//bullet for my variables
// let bullet;
// let bulletPosition;
//speed at which the bullet with fire
const bulletSpeed = 20;

// let bullets = [];


//collision properties
// let bulletTop;
// let bulletLeft;
// // let bulletRight;
// let invaderLeft;
// let invaderRight;
// let invaderBottom;

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

// let fireBullet;

// const Bullet = {
//   x: Player.x + 25,
//   y: Player.y,
//   w: 10,
//   h: 20,
//   speed: 10
// };

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
        console.log(invaderPositionTop);
        // console.log('position from top', invadersBoard.getBoundingClientRect().top);
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
    console.log('position from the top is ===> ' , invaderPositionTop);
    console.log('it should drop by ====> ' ,invaderDrop);
    invaderPositionTop += invaderDrop;
    console.log(invaderPositionTop);
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

function Bullet(){
  //create bullet element
  bullet = document.createElement('div');
  //give bullet a class
  bullet.classList.add('bullet');
  //add bullet to game screen
  gameBoard.appendChild(bullet);
  //position bullet so it's in the center of the player
  bullet.style.left = Player.x + 65 + 'px';
  bullet.style.top = Player.y + 'px';
}

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
  // bullet = new Bullet();
  let bulletPosition = Player.y;
  const fireBullet = setInterval(function() {
    if(bulletPosition > 0 ) {
      console.log('firing');
      //make sure bullet doesn't go to infinity and beyond
      bulletPosition -= bulletSpeed;
      bullet.style.top = bulletPosition + 'px';
      if(checkCollision(bullet)) {
        clearInterval(fireBullet);
      }
    } else if(bulletPosition <= 0){
      clearInterval(fireBullet);
      gameBoard.removeChild(bullet);
    }
  }, 50);
}

function checkCollision(bullet) {
  for(let i=0; i<invaders.length; i++) {

    const invaderBottom = invaders[i].getBoundingClientRect().top;
    const invaderLeft = invaders[i].getBoundingClientRect().left;
    const invaderRight = invaderLeft + 40;

    const bulletLeft = bullet.getBoundingClientRect().left;
    const bulletRight = bulletLeft + 10;
    const bulletTop = bullet.getBoundingClientRect().top;

    if(((!invaders[i].classList.contains('hit')) && bulletTop < invaderBottom + 40) && (bulletRight > invaderLeft) && (bulletLeft < invaderRight)) {
      const id = invaders[i].getAttribute('id');
      //invaders[i].style.backgroundColor = 'red';

      invaders[i].classList.add('hit');

      console.log(id);
      //invaders[id].classList.add('explosion');
      //remove the invader from screen
      //gameBoard.removeChild(invaders[id]);
      //stop the bullet from moving up
      // clearInterval(fireBullet);
      //remove bullet from dom
      gameBoard.removeChild(bullet);

      score += 10;
      scoreBoard.innerHTML = 'Score: ' + score;
      checkWin();
      checkLoss();
      return true;
    }

    // another if to check if bullet has reached the top (if so, clear it anyway)
  }
  return false;
}



function gameLoop() {
  // console.log('hello');
  setTimeout(gameLoop, 1000);
  checkLoss();
  //moveBullet();

}

function checkLoss(){
  for(let i=0; i<invaders.length; i++) {
    if(invaders[i].getBoundingClientRect().top > 600) {
      console.log(invaders[i].getBoundingClientRect().top);
      console.log('game over');
    }
  }
}

function checkWin() {
  //if all 21 invaders have been hit, then you win the game
  if(document.querySelectorAll('.hit').length === 10) {
    console.log('youve won');
    gameBoard.removeChild(invadersBoard);
    // clearInterval(fireBullet);
    gameBoard.removeChild(player);
    gameBoard.removeChild(scoreBoard);
    // gameBoard.removeChild(bullet);
    const selectAllBullets = document.querySelectorAll('.bullet');
    selectAllBullets.forEach(bullet => {
      gameBoard.removeChild(bullet);


    });
    // bullet.classList.remove('.bullet');
    clearInterval(moveInvaderLeft);
    clearInterval(moveInvaderRight);
    const winMessage = document.createElement('div');
    gameBoard.appendChild(winMessage);
    winMessage.classList.add('winMessage');
    winMessage.innerHTML = 'Congratulations! You\'ve saved the galaxy';
  }
}



gameLoop();
createPlayer();
moveInvaderRight();
