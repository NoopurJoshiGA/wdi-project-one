
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// DECLARE VARIABLES //////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//get all variables from DOM
const startScreen = document.querySelector('.start-screen');
const gameBoard = document.querySelector('.board');
const invadersBoard = document.querySelector('.invaders-board');
const scoreBoard = document.querySelector('.score');

//menu items
const playerBar = document.querySelector('.player-bar');
let playerHealth = 50;
const bossBar = document.querySelector('.boss-bar');
let bossHealth = 100;
let score = 0;
let level = 0;
let shootLaserInterval;
let moveBossInterval;

//game condition
let isWin = false;
//create empty array of invaders
let invader;
const invaders = [];

let invaderPositionLeft = 0;
let invaderPositionTop = 60;
//speed at which the invaders will move
const invaderSpeed = 1;
//distance the invaders will drop after touching the sides
const invaderDrop = 10;
let touchedRightSide = false;
//speed at which the bullet will fire
const bulletSpeed = 15;
//player
const player = document.querySelector('.player');
//create player object
const Player = {
  x: 270,
  y: 0,
  w: 135,
  h: 120,
  speed: 20
};

let boss;

const music = document.querySelector('#main-theme');
const musicOn = document.querySelector('.fa-volume-up');
const musicOff = document.querySelector('.fa-volume-off');
const laser = document.querySelector('#laser');

const gameIntervals = [];

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// GAME MUSIC /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function playMusic() {
  music.play();
  console.log('works...');
  musicOff.style.visibility = 'hidden';
  musicOn.style.visibility = 'visible';
}

function pauseMusic() {
  music.pause();
  musicOff.style.visibility = 'visible';
  musicOn.style.visibility = 'hidden';
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// START SCREEN ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function startGameScreen() {
  const startGameButton = document.createElement('button');
  startGameButton.classList.add('startBtn');
  startGameButton.classList.add('pulse');
  startGameButton.classList.add('animated');
  startGameButton.classList.add('infinite');
  startGameButton.innerHTML = 'Start Game';
  startScreen.appendChild(startGameButton);
  startGameButton.addEventListener('click', startGame);

  //music
  musicOff.addEventListener('click', playMusic);
  musicOn.addEventListener('click', pauseMusic);
}

function startGame() {
  setInterval(gameLoop, 1000 / 30); // 30 frames per second
  startScreen.style.display = 'none';
  gameBoard.style.display = 'block';
  createPlayer();
  moveInvaderRight();
  movePlayer();
  randomInvaderBullet();
  level++;
}

function generateInvaderBullet() {

  const invaderBullet = document.createElement('div');
  //give bullet a class
  invaderBullet.classList.add('invaderBullet');
  //add bullet to game screen
  gameBoard.appendChild(invaderBullet);

  const randomIndex = Math.floor(Math.random() * invaders.length);
  const randomInvader = invaders[randomIndex];
  // don't fire bullet if invader has been hit (only fire bullets for invaders displayed on the screen)
  if(randomInvader.classList.contains('hit')) {
    invaderBullet.style.left = 0 + 'px';
    invaderBullet.style.top = 0 + 'px';
    invaderBullet.style.visibility = 'hidden';
  } else {
    //position bullet in the middle of the invader
    invaderBullet.style.left = randomInvader.getBoundingClientRect().left - gameBoard.getBoundingClientRect().left + 20 + 'px';
    invaderBullet.style.top = randomInvader.getBoundingClientRect().top + 40 + 'px';

    let invaderBulletPosition = randomInvader.getBoundingClientRect().top;

    invaderBullet.intervalId = setInterval(function() {
      if(invaderBulletPosition < 650 ) {
      //make sure bullet doesn't go to infinity and beyond
        invaderBulletPosition += bulletSpeed;
        invaderBullet.style.top = invaderBulletPosition + 'px';

      } else {
        removeInvaderBullet(invaderBullet);
      }
    }, 50);

    gameIntervals.push(invaderBullet.intervalId);
  }
}
// }

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CREATE INVADERS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

//create the invaders
for (let i = 0; i < 28; i++) {
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
  player.style.bottom = Player.y + 'px';
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
    },10);
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PLAYER MOVEMENT ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function movePlayer() {
  document.onkeydown = function(e) {
    //move player left
    if(Player.x > 10 && e.keyCode === 37) {
      Player.x -= Player.speed;
      player.style.left = Player.x + 'px';

    } else if (Player.x < 560 && e.keyCode === 39) {
      Player.x += Player.speed;
      player.style.left = Player.x + 'px';

    } else if (e.keyCode === 32) {
      shootBullet();
      //sound effect
      const pew = new Audio('./audio/pew.mp3');
      pew.play();
    }
  };
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// SHOOT BULLET ///////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function shootBullet() {
  //create bullet element
  const bullet = document.createElement('div');
  //give bullet a class
  bullet.classList.add('bullet');
  //add bullet to game screen
  gameBoard.appendChild(bullet);
  //position bullet so it's in the center of the player
  bullet.style.left = Player.x + 65 + 'px';
  bullet.style.bottom = Player.h + 'px';
  //start firing the bullet from the same height as the player
  let bulletPosition = Player.h;

  bullet.intervalId = setInterval(function() {
    if(bulletPosition < 600 ) {
      //make sure bullet doesn't go to infinity and beyond
      bulletPosition += bulletSpeed;
      bullet.style.bottom = bulletPosition + 'px';
      // check if the bullet has hit anything
      checkBulletCollision(bullet);
    } else {
      removeBullet(bullet);
    }
  }, 50);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// COLLISION DETECTION ////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function objectsCollide(obj1, obj2) {
  const box1 = obj1.getBoundingClientRect();
  const box2 = obj2.getBoundingClientRect();
  return (box1.right > box2.left) && (box1.left < box2.right)
  && (box1.top < box2.bottom) && (box1.bottom > box2.top);
}

function checkPlayerCollision() {
  // Things that could kill the player
  const objectsToCheck = document.querySelectorAll('.invader:not(.hit), .laser, .invaderBullet');
  for (let i = 0; i < objectsToCheck.length; i++) {
    const currentObject = objectsToCheck[i];
    if (objectsCollide(player, currentObject)) {
      decreasePlayerHealth();
    }
  }
}

function checkBulletCollision(bullet) {
  // Things that the bullet could kill
  const objectsToCheck = document.querySelectorAll('.invader:not(.hit),.boss');
  for (let i = 0; i < objectsToCheck.length; i++) {
    const currentObject = objectsToCheck[i];
    if (objectsCollide(bullet, currentObject)) {
      removeBullet(bullet);
      if (currentObject.classList.contains('boss')) {
        bulletHitBoss(bullet);
      } else if (currentObject.classList.contains('invader')) {
        bulletHitInvader(bullet, currentObject);
      }
    }
  }
}

function removeBullet(bullet) {
  gameBoard.removeChild(bullet);
  clearInterval(bullet.intervalId);
}

function removeInvaderBullet(invaderBullet) {
  gameBoard.removeChild(invaderBullet);
  clearInterval(invaderBullet.intervalId);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// INVADER BULLETS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function getRandomTime() {
  const randomTime = Math.floor(Math.random() * 2) + 1;
  console.log(randomTime);
  return randomTime * 1000;
}

function randomInvaderBullet() {
  const randomBulletInterval = setInterval(function() {
    generateInvaderBullet();
  }, getRandomTime());
  gameIntervals.push(randomBulletInterval);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CHECK COLLISION ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function bulletHitBoss() {
  bossHealth--;
  bossBar.style.width = bossHealth * 1 + '%';

  //make death star red
  if(bossHealth === 0) {
    console.log(bossHealth);
    isWin = true;
    gameOver();
  } else {
    const hitEnemy = setTimeout(function() {
      boss.style.backgroundImage = 'url("images/deathstarhit.png")';
      boss.classList.add('animated');
      boss.classList.add('shake');
    },0);
    setTimeout(() => {
      clearInterval(hitEnemy);
      boss.style.backgroundImage = 'url("images/deathstar.png")';
      boss.classList.remove('animated');
      boss.classList.remove('shake');
    }, 500);

    score += 1000;
    scoreBoard.innerHTML = 'Score: ' + score;
  }
}

function bulletHitInvader(bullet, invader) {
  //add a class of hit to the invader, this will help determine whether or not you've won the game
  invader.classList.add('hit');
  // gameBoard.removeChild(invader);
  //increase score
  score += 10;
  //display the score
  scoreBoard.innerHTML = 'Score: ' + score;
}

function clearGameBoard() {
  const objectsToClear = document.querySelectorAll('.invaderBullet,.invader');
  for (let i = 0; i < objectsToClear.length; i++) {
    objectsToClear[i].remove();
  }
}

function gameOver() {
  if(checkLevel() === 1) {
    console.log('game over...', level);
    gameIntervals.forEach((interval) => clearInterval(interval));
    gameBoard.removeChild(invadersBoard);
    clearGameBoard();
  } else {
    clearInterval(shootLaserInterval);
    clearInterval(moveBossInterval);
    gameBoard.removeChild(boss);
    laser.pause();
    gameIntervals.forEach((interval) => clearInterval(interval));
  }
  gameBoard.removeChild(player);
  const gameOverMessage = document.createElement('div');
  gameBoard.appendChild(gameOverMessage);
  gameOverMessage.classList.add('gameOverMessage');
  if(!isWin){
    gameOverMessage.innerHTML = 'The rebel force has been destroyed. Much to learn you still have, young Padawan';
  } else {
    gameOverMessage.innerHTML = 'You\'ve destroyed the Death Star! The force is strong with you.';
  }

  const gameOverButton = document.createElement('div');
  gameOverButton.classList.add('gameOverButton');
  gameOverMessage.appendChild(gameOverButton);
  gameOverButton.innerHTML = 'Restart Game';
  gameOverButton.classList.add('animated');
  gameOverButton.classList.add('pulse');
  gameOverButton.classList.add('infinite');
  gameOverButton.addEventListener('click', function() {
    window.location.reload();
  });
}

function checkLevel(){
  console.log('checking level...', level);
  return level;
}

function decreasePlayerHealth() {
  playerHealth--;
  playerBar.style.width = playerHealth * 2 + '%';
  const hitPlayerInterval = setTimeout(function() {
    player.style.backgroundImage = 'url("images/xwinghit.png")';
  },0);
  setTimeout(() => {
    clearInterval(hitPlayerInterval);
    player.style.backgroundImage = 'url("images/xwing.png")';
  }, 500);

  if(playerHealth <= 0) {
    console.log('player is dead...');
    isWin = false;
    gameOver();
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////// CHECK IF PLAYER CAN MOVE TO NEXT LEVEL //////////////////////
////////////////////////////////////////////////////////////////////////////////
function checkLevelWin() {
  //if all 28 invaders have been hit, then you go to the boss level
  if(document.querySelectorAll('.hit').length === 28) {
    //remove all the elements from the game board
    gameBoard.removeChild(invadersBoard);
    //clear any intervals
    clearInterval(moveInvaderLeft);
    clearInterval(moveInvaderRight);

    clearGameBoard();
    //proceed to the next level
    startBossLevel();
    console.log(gameIntervals);
    gameIntervals.forEach((interval) => clearInterval(interval));
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// START BOSS LEVEL ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function startBossLevel() {
  level++;
  console.log('level: ', level);
  //create the boss on game board
  createBoss();
  //death star shoots laser beam every 5 seconds
  shootLaserInterval = setInterval(function(){
    shootLaser();
    laser.play();
  }, 5000);

  //randomly move boss left and right
  moveBossInterval = setInterval(function(){
    moveBoss();
  }, 2000);
}

function createBoss() {
  gameBoard.style.backgroundImage = 'url("images/starwarsbg.png")';
  gameBoard.style.backgroundSize = 'cover';

  //create the boss element (death star)
  boss = document.createElement('div');

  //add it to the game board
  gameBoard.appendChild(boss);

  //add a class
  boss.classList.add('boss');

  //position boss in the middle of the screen to begin with
  boss.style.left = 250 + 'px';
  boss.style.top = 50 + 'px';
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// SHOOT LASER ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function shootLaser() {
  console.log('generating beam...');
  const laser = document.createElement('div');
  laser.classList.add('laser');
  boss.appendChild(laser);
  //position laser so it's in the center of the boss
  laser.style.left = '97.5px';
  laser.style.top = '75px';

  //start firing the bullet from the same height as the player
  let laserPosition = 250;

  const fireLaserInterval = setInterval(function() {
    //make sure laser doesn't go beyond the screen
    if(laserPosition < 560) {
      laserPosition += 30;
      laser.style.height = laserPosition + 'px';
    } else {
      const holdLaserInterval = setTimeout(function() {
        clearInterval(fireLaserInterval);
        laserPosition = 0;
        laser.style.height = '0px';
      }, 1000);
      gameIntervals.push(holdLaserInterval);
    }
  }, 50);
  gameIntervals.push(fireLaserInterval);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOVE BOSS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function moveBoss() {
  //create an array of directions the boss can move in
  const directions = ['left', 'right'];
  const direction = Math.floor((Math.random() * 2));

  //generate random distance (death star can move up between 100px and 200px left or right)
  const distance = Math.floor((Math.random() * 150) + 100);
  const bossLeft = boss.style.left;
  const bossRight = boss.style.left + 200;

  switch(directions[direction]){
    case 'left': {
      if((bossLeft-distance) > 0 ){
        boss.style.left = (bossLeft-distance) + 'px';
      } else {
        boss.style.left = '100px';
      }
      break;
    }
    case 'right': {
      if((bossRight+distance) < 500) {
        boss.style.left = bossLeft + distance + 'px';
      } else {
        boss.style.left = '450px';
      }
      break;
    }
  }
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// MAIN GAME LOOP //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function gameLoop() {
  checkPlayerCollision();
  checkLevelWin();
}

startGameScreen();
