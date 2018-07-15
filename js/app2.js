
//decalre all variables
const body = document.querySelector('body');
const gameBoard = document.querySelector('.board');

let bullet;
let bulletPosition = 0;
let bulletSpeed = 10;
let bullets = [];


let invaders = [];
let invader;
// let invader = document.querySelector('.invader');
let invaderX = 100;
let invaderY = 0;
const invaderSpeed = 10;
const invaderDrop = 40;
let touchedRightSide = false;


let player = document.querySelector('.player');
//let bullet = document.querySelector('.bullet');

//create player object
const Player = {
  x: 325,
  y: 600,
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

gameLoop();
createPlayer();
//createInvaders();

//create player on screen
function createPlayer() {
  gameBoard.appendChild(player);
  player.style.left = Player.x + 'px';
  player.style.top = Player.y + 'px';
}

// function createInvaders() {
//   for (let i = 0; i < 5; i++) {
//     invader = document.createElement('div');
//     invader.classList.add('invader');
//     invaders.push(invader);
//     gameBoard.appendChild(invader);
//     invaders[i].style.left = (invaderX * i) + 'px';
//   }
//   moveInvaderRight();
// }
// //needs work
// function moveInvaderRight() {
//   if(touchedRightSide === false) {
//     const moveRight = setInterval(function() {
//       //for (let i = 0; i < invaders.length; i++) {
//       if(invaderX < 600) {
//         invaderX += invaderSpeed;
//         invader.style.left = invaderX + 'px';
//       } else {
//         clearInterval(moveRight);
//         console.log('touched the right side');
//         touchedRightSide = true;
//         dropInvader(touchedRightSide);
//       }
//     }, 100);
//   }
// }
//
// function dropInvader(touchedRightSide) {
//   if(touchedRightSide === true) {
//     console.log(touchedRightSide);
//     invaderY += invaderDrop;
//     invader.style.top = invaderY + 'px';
//     console.log('dropped');
//     moveInvaderLeft();
//   } else if(touchedRightSide === false) {
//     invaderY += invaderDrop;
//     invader.style.top = invaderY + 'px';
//     console.log('dropped');
//     moveInvaderRight();
//   }
// }
//
// function moveInvaderLeft() {
//   if(touchedRightSide === true) {
//     const moveLeft = setInterval(function() {
//       if(invaderX > 0) {
//         invaderX -= invaderSpeed;
//         invader.style.left = invaderX + 'px';
//       } else {
//         clearInterval(moveLeft);
//         console.log('touched the left side');
//         touchedRightSide = false;
//         dropInvader(touchedRightSide);
//       }
//     }, 100);
//   }
// }

//make player move
document.onkeydown = function(e) {
  //move player left
  if(Player.x > 0 && e.keyCode === 37) {
    Player.x -= Player.speed;
    player.style.left = Player.x + 'px';

  } else if (Player.x < 650 && e.keyCode === 39) {
    Player.x += Player.speed;
    player.style.left = Player.x + 'px';

  } else if (e.keyCode === 32) {
    createBullet();
  }
};


function Bullet(){
  bullet = document.createElement('div');
  bullet.classList.add('bullet');
  gameBoard.appendChild(bullet);
  bullet.style.left = Player.x + 20 + 'px';
  bullet.style.top = Player.y + 'px';
}

function createBullet() {
  bullet = new Bullet();
  console.log(typeof(bullet));
  // console.log('bullets' + typeof(bullets));
  bullets.push(bullet);
  console.log(bullets.length);
  // setInterval(function() {
  //   if(bulletPosition > -600) {
  //     bulletPosition -= bulletSpeed;
  //     bullet.style.top = bulletPosition + 'px';
  //     //checkCollision();
  //   }
  // }, 100);
}

function moveBullet() {
  for(var i = 0 ; i < bullets.length ; i++ ) {
    bullets[i].style.top = bullets[i].style.top - 8;
  }
}




//
//
// function moveBullet() {
//   for(let i = 0; i<bullets.length; i++){
//     bulletPosition -= bulletSpeed;
//     //this is working
//     console.log(bulletPosition);
//     bullets[i].style.top = bulletPosition + 'px';
//     console.log('bullet top' + bullets[i].style.top);
//   }
  // bullets.forEach(function(element) {
  //   console.log(element);
  //   console.log(typeof(bullets));

  //
  // console.log('doing something');
// }

// function moveInvaders() {
//   for(let i = 0; i<invaders.length; i++){
//     invadersX -= 100;
//     invaders[i].style.left -= 10 + 'px';
//   }
// }

function gameLoop() {
  // console.log('hello');
  setTimeout(gameLoop, 1000);
  moveBullet();
  //moveInvaders();
}
