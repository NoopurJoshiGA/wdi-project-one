//TODO:
// (2) add instructions to game
// (4) add icons next to health bars
// (6) add sound effects and music to enhance UX
// (7) add game restart button (clear all intervals, maybe push all intervals into an array and then clear all?)
// (8) improve game over gameOverMessage
// (10) refactor refactor refactor

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
let playerHealth = 100;
const bossBar = document.querySelector('.boss-bar');
let bossHealth = 50;
let score = 0;
let level = 0;

//game condition
let isWin = false;
//create empty array of invaders
let invader;
const invaders = [];

//could refactor this?
let invaderPositionLeft = 0;
let invaderPositionTop = 60;
//speed at which the invaders will move
const invaderSpeed = 0.1;
//distance the invaders will drop after touching the sides
const invaderDrop = 10;
let touchedRightSide = false;
//speed at which the bullet will fire
const bulletSpeed = 20;
//player
const player = document.querySelector('.player');
//create player object
const Player = {
  x: 260,
  y: 280,
  w: 50,
  h: 50,
  speed: 20
};

let boss;

const music = document.querySelector('#main-theme');
const musicOn = document.querySelector('.fa-volume-up');
const musicOff = document.querySelector('.fa-volume-off');


//intervals
let invaderBulletInterval;


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
  startGameButton.innerHTML = 'Start Game';
  startScreen.appendChild(startGameButton);
  startGameButton.addEventListener('click', startGame);

  //music

  musicOff.addEventListener('click', playMusic);
  musicOn.addEventListener('click', pauseMusic);

}

function startGame() {
  const gameLoopIntervalId = setInterval(gameLoop, 1000 / 30); // 30 frames per second
  startScreen.style.display = 'none';
  gameBoard.style.display = 'block';
  createPlayer();
  moveInvaderRight();
  level++;
  console.log('level: ', level);

  movePlayer();
  randomInvaderBullet();



  let test = gameBoard.getBoundingClientRect().bottom;
  console.log('test',test);
}

function generateInvaderBullet() {
  //create invader bullet
  const invaderBullet = document.createElement('div');
  //give bullet a class
  invaderBullet.classList.add('invaderBullet');
  //add bullet to game screen
  gameBoard.appendChild(invaderBullet);
  //position bullet so it's in the center of the player
  const randomIndex = Math.floor(Math.random() * invaders.length);
  const randomInvader = invaders[randomIndex];

  //position bullet in the middle of the invader
  invaderBullet.style.left = randomInvader.getBoundingClientRect().left + 20 + 'px';
  invaderBullet.style.top = randomInvader.getBoundingClientRect().top + 40 + 'px';
  console.log(invaderBullet.style.left);
  console.log(invaderBullet.style.top);
  let invaderBulletPosition = randomInvader.getBoundingClientRect().bottom;
  console.log('invaderbuletpositi ', invaderBulletPosition);
  invaderBulletInterval = setInterval(function() {
    if(invaderBulletPosition < 750 ) {
      //make sure bullet doesn't go to infinity and beyond
      invaderBulletPosition += bulletSpeed;
      invaderBullet.style.top = invaderBulletPosition + 'px';

    } else if(invaderBulletPosition >= 70){
      removeInvaderBullet(invaderBullet);
    }
  }, 50);
}


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
    },10);
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// PLAYER MOVEMENT ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function movePlayer() {
  document.onkeydown = function(e) {
    //move player left
    if(Player.x > -20 && e.keyCode === 37) {
      Player.x -= Player.speed;
      player.style.left = Player.x + 'px';

    } else if (Player.x < 560 && e.keyCode === 39) {
      Player.x += Player.speed;
      player.style.left = Player.x + 'px';

    } else if (e.keyCode === 32) {
      shootBullet();
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
  bullet.style.left = Player.x + Player.w + 'px';
  bullet.style.top = Player.y - Player.h + 'px';
  //start firing the bullet from the same height as the player
  let bulletPosition = Player.y;
  bullet.intervalId = setInterval(function() {
    if(bulletPosition < 500 ) {
      //make sure bullet doesn't go to infinity and beyond
      bulletPosition -= bulletSpeed;
      bullet.style.top = bulletPosition + 'px';
      // check if the bullet has hit anything
      checkBulletCollision(bullet);
    } else if(bulletPosition <= 50){
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
  // gameBoard.removeChild(invaderBullet);
  clearInterval(invaderBulletInterval);
}

function getRandomTime() {
  const randomTime = Math.floor(Math.random() * 2) + 1;
  console.log(randomTime);
  return randomTime * 1000;
}

function randomInvaderBullet() {
  setInterval(function() {
    generateInvaderBullet();
  }, getRandomTime());
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CHECK COLLISION ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function bulletHitBoss(bullet) {
  bossHealth--;
  console.log(bossHealth);
  bossBar.style.width = bossHealth * 2 + '%';
  bossBar.innerHTML = bossHealth * 2 + '%';

  //make death star red
  if(bossHealth === 0) {
    console.log(bossHealth);
    isWin = true;
    gameOver();
  } else {
    const hitEnemy = setTimeout(function() {
      boss.style.backgroundImage = 'url("images/deathstarhit.png")';
    },0);
    setTimeout(() => {
      clearInterval(hitEnemy);
      boss.style.backgroundImage = 'url("images/deathstar.png")';
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

function gameOver() {
  if(checkLevel() === 1) {
    console.log('game over...', level);
    gameBoard.removeChild(invadersBoard);
  } else {
    gameBoard.removeChild(boss);
  }
  gameBoard.removeChild(player);
  const gameOverMessage = document.createElement('div');
  gameBoard.appendChild(gameOverMessage);
  gameOverMessage.classList.add('gameOverMessage');
  if(!isWin){
    gameOverMessage.innerHTML = 'You\'ve been defeated.';
  } else {
    gameOverMessage.innerHTML = 'You\'ve won';
  }
}

function checkLevel(){
  console.log('checking level...', level);
  return level;
}

function decreasePlayerHealth() {
  playerHealth--;
  playerBar.style.width = playerHealth + '%';
  playerBar.innerHTML = playerHealth + '%';

  if(playerHealth === 0) {
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
  if(document.querySelectorAll('.hit').length === 2) {
    //remove all the elements from the game board
    gameBoard.removeChild(invadersBoard);

    //remove any bullets left on the screen
    const selectAllBullets = document.querySelectorAll('.bullet');
    selectAllBullets.forEach(bullet => {
      gameBoard.removeChild(bullet);
    });
    //clear any intervals
    clearInterval(moveInvaderLeft);
    clearInterval(moveInvaderRight);
    clearInterval(invaderBulletInterval);

    //proceed to the next level
    startBossLevel();
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
  setInterval(function(){
    shootLaser();
  }, 5000);

  //randomly move boss left and right
  setInterval(function(){
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

  const fireLaser = setInterval(function() {
    //make sure laser doesn't go beyond the screen
    if(laserPosition < 560) {
      laserPosition += 30;
      laser.style.height = laserPosition + 'px';
    } else {
      const holdLaser = setTimeout(function() {
        clearInterval(fireLaser);
        laserPosition = 0;
        laser.style.height = '0px';
      }, 1000);
    }
  }, 50);
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOVE BOSS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function moveBoss() {
  //create an array of directions the boss can move in
  const directions = ['left', 'right'];
  let direction = Math.floor((Math.random() * 2));

  //generate random distance (death star can move up between 100px and 200px left or right)
  let distance = Math.floor((Math.random() * 150) + 100);

  let bossLeft = boss.getBoundingClientRect().left;
  let bossRight = boss.getBoundingClientRect().left + 200;

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

// // TODO: Put this in a function. Then call it when you click start.
// // You'll need to keep track of the interval ID so you can stop it later

// // TODO: then clearInterval when you're ready to end the game.




startGameScreen();
