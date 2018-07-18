
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
// gameBoard.appendChild(scoreBoard);
gameBoard.appendChild(invadersBoard);

// intervalIDs
//let gameLoopIntervalId;

//score
let score = 0;

let isWin = false;

//invader variables
let invader;
//create empty array of invaders
let invaders = [];
let invaderPositionLeft = 0;
let invaderPositionTop = 60;
//speed at which the invaders will move
const invaderSpeed = 1;
//distance the invaders will drop after touching the sides
let invaderDrop = 10;
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

//create boss object
let boss;

//create boss health
let bossHealth = 50;
let bar = document.querySelector('.bar');

const Boss = {
  x: 250,
  y: 50,
  w: 150,
  h: 150
};

//music
const music = document.getElementById('music');
const musicOn = document.querySelector('.fa-volume-up');
const musicOff = document.querySelector('.fa-volume-off');

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// GAME MUSIC /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function setupAudio() {
  musicOff.addEventListener('click', playMusic);
  musicOn.addEventListener('click', pauseMusic);
}

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
  bullet.style.top = Player.y + 'px';
  //start firing the bullet from the same height as the player
  let bulletPosition = Player.y;
  bullet.intervalId = setInterval(function() {
    if(bulletPosition > 0 ) {
      //make sure bullet doesn't go to infinity and beyond
      bulletPosition -= bulletSpeed;
      bullet.style.top = bulletPosition + 'px';
      // check if the bullet has hit anything
      checkBulletCollision(bullet);
    } else if(bulletPosition <= 0){
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
  const objectsToCheck = document.querySelectorAll('.invader:not(.hit),.laser');
  for (let i = 0; i < objectsToCheck.length; i++) {
    const currentObject = objectsToCheck[i];
    if (objectsCollide(player, currentObject)) {
      gameOver();
    }
  }
}

function checkBulletCollision(bullet) {
  // Things that the bullet could kill
  const objectsToCheck = document.querySelectorAll('.invader:not(.hit),.boss');
  for (let i = 0; i < objectsToCheck.length; i++) {
    const currentObject = objectsToCheck[i];
    if (objectsCollide(bullet, currentObject)) {
      // console.log('Bullet has hit!', currentObject.classList);
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

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CHECK COLLISION ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function bulletHitBoss(bullet) {
  console.log('boss hit...');
  bossHealth--;
  console.log(bossHealth);
  bar.style.width = bossHealth * 2 + '%';
  bar.innerHTML = bossHealth * 2 + '%';

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

  //   //increase score
    score += 1000;
    //display the score
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
  console.log('game over...');
  // gameBoard.removeChild(invadersBoard);
  gameBoard.removeChild(boss);
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

    //proceed to the next level
    startBossLevel();
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// START BOSS LEVEL ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function startBossLevel() {
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
  boss.style.left = Boss.x + 'px';
  boss.style.top = Boss.y + 'px';
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// SHOOT LASER ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function shootLaser() {
  console.log('generating beam...');
  const laser = document.createElement('div');
  laser.classList.add('laser');
  boss.appendChild(laser);
  //position bullet so it's in the center of the player
  laser.style.left = '97.5px';
  laser.style.top = '75px';

  //start firing the bullet from the same height as the player
  let laserPosition = Boss.y;

  const fireLaser = setInterval(function() {
    //make sure bullet doesn't go beyond the player
    if(laserPosition < 560) {
      laserPosition += 30;
      laser.style.height = laserPosition + 'px';
      //if a collision has been detected
      //stop the laser
      //game over
      // if(checkBossCollision(laser)) {
      //   clearInterval(fireLaser);
      // }
      // } else if(laserPosition >= 650){
      //   //if bullet goes out of bounds
      //   //remove the bullet from game screen
      //   clearInterval(fireBossBullet);
      //   boss.removeChild(laser);
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
  // TODO: Create these functions (or rename the ones Rob has suggested).
  //checkLoss();
  // if (levelIsBeaten()) {
  //   //loadNextLevel();
  // }
  checkPlayerCollision();
  checkLevelWin();
  //checkBossWin();
  // if(playerIsDead()) {

  // }
}

// // TODO: Put this in a function. Then call it when you click start.
// // You'll need to keep track of the interval ID so you can stop it later
gameLoopIntervalId = setInterval(gameLoop, 1000 / 30); // 30 frames per second
// // TODO: then clearInterval when you're ready to end the game.
// gameLoop();
createPlayer();
moveInvaderRight();
setupAudio();
