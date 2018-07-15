
//decalre all variables
const body = document.querySelector('body');
const gameBoard = document.querySelector('.board');

let bullet;
let bulletPosition = 0;
let bulletSpeed = 20;
let bullets = [];


let invader;
//let invaders = [];
const invaderX = 100;
const invaderY = 0;
const invaderSpeed = 10;
let invaderDrop = 40;
let touchedRightSide = false;


let player = document.querySelector('.player');


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

let invaders = [];

for (let i = 0; i < 7; i++) {
  //create 5 invaders for now
  invader = document.createElement('div');
  //give them all a class
  invader.classList.add('invader');
  //add to screen
  gameBoard.appendChild(invader);
  //add invaders to array
  invaders.push(invader);
  //position them
  invaders[i].style.left = (invaderX * i) + 'px';
  invaders[i].style.top = invaderY + 'px';
}
console.log(invaders.length);
//moveInvaderRight();




//create player on screen
function createPlayer() {
  gameBoard.appendChild(player);
  player.style.left = Player.x + 'px';
  player.style.top = Player.y + 'px';
}

// function createInvaders() {
//   for (let i = 0; i < 5; i++) {
//     //create 5 invaders for now
//     invader = document.createElement('div');
//     //give them all a class
//     invader.classList.add('invader');
//     //add to screen
//     gameBoard.appendChild(invader);
//     //add invaders to array
//     invaders.push(invader);
//     //position them
//     invaders[i].style.left = (invaderX * i) + 'px';
//   }
//   console.log(invaders.length);
//   //moveInvaderRight();
// }

function moveInvaders() {
  for(let i = 0 ; i < invaders.length ; i++ ) {
    invaderDrop += 1;
    invaders[i].style.top = invaderDrop + 'px';
    console.log(invaders[i].style.top);
    console.log(invaders[i]);
  }
}


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
  bullet.style.left = Player.x + 65 + 'px';
  bullet.style.top = Player.y + 'px';
}

function createBullet() {
  bullet = new Bullet();
  console.log(typeof(bullet));
  // console.log('bullets' + typeof(bullets));
  bullets.push(bullet);
  console.log(bullets.length);
}

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
  setTimeout(gameLoop, 5000);
  //moveBullet();
  moveInvaders();
}



gameLoop();
createPlayer();
//createInvaders();
