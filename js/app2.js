
//declare all variables
const body = document.querySelector('body');
const gameBoard = document.querySelector('.board');
const invadersBoard = document.querySelector('.invadersBoard');
const scoreBoard = document.querySelector('.score');
gameBoard.appendChild(scoreBoard);
gameBoard.appendChild(invadersBoard);

//score
let score = 0;

//bullet for my variables
let bullet;
let bulletPosition;
let bulletSpeed = 20;
let bullets = [];

//invader variables
let invader;
//create empty array of invaders
let invaders = [];

let invaderX = 10;
let invaderY = 0;
const invaderSpeed = 3;

//distance the invaders will drop once touching the sides
let invaderDrop = 10;
let touchedRightSide = false;

//collision properties
let bulletTop;
let bulletLeft;
let bulletRight;

let invaderLeft;
let invaderRight;
let invaderBottom;

//player
let player = document.querySelector('.player');

let fireBullet;


//create player object
const Player = {
  x: 260,
  y: 550,
  w: 50,
  h: 50,
  speed: 10
};

// const Bullet = {
//   x: Player.x + 25,
//   y: Player.y,
//   w: 10,
//   h: 20,
//   speed: 10
// };

//create the invaders
for (let i = 0; i < 21; i++) {
  invader = document.createElement('div');
  // //give them all a class
  invader.classList.add('invader');
  // //add to screen
  invadersBoard.appendChild(invader);
  // invaderRow.appendChild(invader);
  // //add invaders to array
  invaders.push(invader);
  invader.setAttribute('id', i);
}

//create player on screen
function createPlayer() {
  gameBoard.appendChild(player);
  player.style.left = Player.x + 'px';
  player.style.top = Player.y + 'px';
}

// function moveInvaders() {
//   if(invaderDrop < 400) {
//     for(let i = 0 ; i < invaders.length ; i++ ) {
//       invaderDrop += 1;
//       invaders[i].style.top = invaderDrop + 'px';
//     }
//   } else {
//     const playerExplosion = setInterval(function() {
//       player.style.backgroundImage = 'url(\'./images/explosion.png\')';
//     }, 1000);
//   }
// }


// //needs work
function moveInvaderRight() {

  if(touchedRightSide === false) {
    const moveRight = setInterval(function() {
      if(invaderX < 130) {
        invaderX += invaderSpeed;
        invadersBoard.style.left = invaderX + 'px';
      } else {
        clearInterval(moveRight);
        console.log('touched the right side');
        touchedRightSide = true;
        dropInvader(touchedRightSide);
      }
    }, 100);
  }
}

function dropInvader(touchedRightSide) {
  if(touchedRightSide === true) {
    console.log(touchedRightSide);
    invaderY += invaderDrop;
    invadersBoard.style.top = invaderY + 'px';
    console.log('dropped');
    moveInvaderLeft();
  } else if(touchedRightSide === false) {
    invaderY += invaderDrop;
    invadersBoard.style.top = invaderY + 'px';
    console.log('dropped');
    moveInvaderRight();
  }
}

function moveInvaderLeft() {
  if(touchedRightSide === true) {
    const moveLeft = setInterval(function() {
      if(invaderX > 0) {
        invaderX -= invaderSpeed;
        invadersBoard.style.left = invaderX + 'px';
      } else {
        clearInterval(moveLeft);
        console.log('touched the left side');
        touchedRightSide = false;
        dropInvader(touchedRightSide);
      }
    }, 100);
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
  bullet = document.createElement('div');
  //give bullet a class
  bullet.classList.add('bullet');
  //add bullet to game screen
  gameBoard.appendChild(bullet);
  //position bullet so it's in the center of the player
  bullet.style.left = Player.x + 65 + 'px';
  bullet.style.top = Player.y + 'px';

  bulletPosition = Player.y;
  fireBullet = setInterval(function() {
    if(bulletPosition > 0 ) {
      console.log('firing');
      //make sure bullet doesn't go to infinity and beyond
      bulletPosition -= bulletSpeed;
      bullet.style.top = bulletPosition + 'px';
      // console.log('GOING IN HERE');
      // clearInterval(fireBullet);
      checkCollision();
    } else if(bulletPosition < 0){
      clearInterval(fireBullet);
      gameBoard.removeChild(bullet);
    }
  }, 50);
}

function checkCollision() {
  for(let i=0; i<invaders.length; i++) {
    invaderBottom = invaders[i].getBoundingClientRect().top;
    invaderLeft = invaders[i].getBoundingClientRect().left;
    invaderRight = invaderLeft + 40;

    bulletLeft = bullet.getBoundingClientRect().left;
    bulletRight = bulletLeft + 10;
    bulletTop = bullet.getBoundingClientRect().top;

    if(((!invaders[i].classList.contains('hit')) && bulletTop < invaderBottom + 40) && (bulletRight > invaderLeft) && (bulletLeft < invaderRight)) {
      const id = invaders[i].getAttribute('id');
      //invaders[i].style.backgroundColor = 'red';

      invaders[i].classList.add('hit');

      console.log(id);
      //invaders[id].classList.add('explosion');
      //remove the invader from screen
      //gameBoard.removeChild(invaders[id]);
      //stop the bullet from moving up
      clearInterval(fireBullet);
      console.log('clearing', fireBullet);
      //remove bullet from dom
      gameBoard.removeChild(bullet);

      score += 10;
      scoreBoard.innerHTML = 'Score: ' + score;

    }

    // another if to check if bullet has reached the top (if so, clear it anyway)
  }
}



function gameLoop() {
  // console.log('hello');
  setTimeout(gameLoop, 2000);
  //moveBullet();
  checkWin();
}

function checkWin() {
  if(document.querySelectorAll('.hit').length === 24) {
    alert('youve won');
    clearTimeout(gameLoop);
  }
}

gameLoop();
createPlayer();
moveInvaderRight();
