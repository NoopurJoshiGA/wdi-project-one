
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

// intervalIDs
//let gameLoopIntervalId;

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

const Boss = {
  x: 250,
  y: 50,
  w: 150,
  h: 150
};


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// GAME MUSIC /////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
//create background music
const music = document.getElementById('music');
const musicOn = document.querySelector('.fa-volume-up');
const musicOff = document.querySelector('.fa-volume-off');

musicOff.addEventListener('click', playMusic);
musicOn.addEventListener('click', pauseMusic);

function playMusic() {
  music.play();
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
      if(checkEnemyCollision(bullet)) {
        clearInterval(bullet);
      }
    } else if(bulletPosition <= 0){
      //if bullet goes out of bounds
      clearInterval(fireBullet);
      //remove the bullet from game screen
      gameBoard.removeChild(bullet);
    }
  }, 50);
}


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// CHECK COLLISION ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
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
    }

    // another if to check if bullet has reached the top (if so, clear it anyway)
  }
  return false;
}

//needs refactoring, check for collision between player bullet and death star
function checkEnemyCollision(bullet) {
  const bossBottom = boss.getBoundingClientRect().bottom;
  const bossLeft = boss.getBoundingClientRect().left;
  const bossRight = bossLeft + 200;
  const bulletLeft = bullet.getBoundingClientRect().left;
  const bulletRight = bulletLeft + 10;
  const bulletTop = bullet.getBoundingClientRect().top;

  if((bulletTop < bossBottom) && (bulletRight > bossLeft) && (bulletLeft < bossRight)){
    console.log('death star hit');
    return true;
  } else {
    return false;
  }
}

function gameLoop() {
  // TODO: Create these functions (or rename the ones Rob has suggested).
  //checkLoss();
  // if (levelIsBeaten()) {
  //   //loadNextLevel();
  // }
  checkLevelWin();
  //checkBossWin();
  // if(playerIsDead()) {
  //   endGame();
  // }
}

// // TODO: Put this in a function. Then call it when you click start.
// // You'll need to keep track of the interval ID so you can stop it later
gameLoopIntervalId = setInterval(gameLoop, 1000 / 30); // 30 frames per second
// // TODO: then clearInterval when you're ready to end the game.

//we need this after the boss is defeated
// function checkBossWin() {
//   // gameBoard.removeChild(player);
//   // gameBoard.removeChild(scoreBoard);
//   // const gameOverMessage = document.createElement('div');
//   // gameBoard.appendChild(gameOverMessage);
//   // gameOverMessage.classList.add('gameOverMessage');
//   // gameOverMessage.innerHTML = 'Congratulations! You\'ve saved the galaxy';
// }

// function checkLoss(){
//   for(let i=0; i<invaders.length; i++) {
//     if(invaders[i].getBoundingClientRect().top > 600) {
//       console.log(invaders[i].getBoundingClientRect().top);
//       console.log('game over');
//       gameBoard.removeChild(invadersBoard);
//       gameBoard.removeChild(player);
//       gameBoard.removeChild(scoreBoard);
//       const gameOverMessage = document.createElement('div');
//       gameBoard.appendChild(gameOverMessage);
//       gameOverMessage.classList.add('gameOverMessage');
//       gameOverMessage.innerHTML = 'You\'ve been defeated';
//     }
//   }
// }


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
    enterBoss();
  }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// START BOSS LEVEL ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function enterBoss() {
  //change the background to make game look cool
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

  //death star shoots laser beam every 5 seconds
  setInterval(function(){
    shootLaser();
  }, 5000);

  //randomly move boss left and right
  setInterval(function(){
    moveBoss();
  }, 2000);
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
  console.log(Boss.y);
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
      if(checkBossCollision(laser)) {
        clearInterval(fireLaser);
      }
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

//collision detection between player and laser beam
function checkBossCollision(laser) {
  //get corners of the laser and player

  const playerTop = player.getBoundingClientRect().top;
  const playerLeft = player.getBoundingClientRect().left;
  const playerRight = playerLeft + 140;
  const playerBottom = player.getBoundingClientRect().bottom;

  const laserBottom = laser.getBoundingClientRect().height;
  const laserLeft = laser.getBoundingClientRect().left;
  const laserRight = laserLeft + 10;
  const laserTop = laser.getBoundingClientRect().top;

  // collision detection conditionals between laser beam and player
  if((laserBottom >= playerTop) && (laserRight > playerLeft) && (laserLeft < playerRight)) {
    // if((playerRight > laserLeft) && (playerLeft < laserRight) && (playerTop <= laserBottom) && (playerBottom < laserTop)) {
    alert('player hit');
  }
  //return true;
}
//  return false;

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// MOVE BOSS //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////
function moveBoss() {
  //create an array of directions the boss can move in
  const directions = ['left', 'right'];
  let direction = Math.floor((Math.random() * 2));

  //generate random distance (death star can move up between 100px and 200px left or right)
  let distance = Math.floor((Math.random() * 150) + 100);
  // console.log(distance);

  let bossLeft = boss.getBoundingClientRect().left;
  let bossRight = boss.getBoundingClientRect().left + 200;

  switch(directions[direction]){
    case 'left': {
      if((bossLeft-distance) > 0 ){
        console.log(distance);
        boss.style.left = (bossLeft-distance) + 'px';
      } else {
        boss.style.left = '100px';
      }
      break;
    }
    case 'right': {
      console.log('distance',distance);
      if((bossRight+distance) < 500) {
        boss.style.left = bossLeft + distance + 'px';
      } else {
        boss.style.left = '450px';
      }
      break;
    }
  }
}

gameLoop();
createPlayer();
moveInvaderRight();
