
//declare all variables
const body = document.querySelector('body');
const gameBoard = document.querySelector('.board');
const invadersBoard = document.querySelector('.invadersBoard');
const score = document.querySelector('.score');
gameBoard.appendChild(score);
gameBoard.appendChild(invadersBoard);

//bullet for my variables
let bullet;
let bulletPosition;
let bulletSpeed = 20;
let bullets = [];

//invader variables
let invader;
let invaders = [];
const invaderX = 10;
const invaderY = 0;
const invaderSpeed = 1;
let invaderDrop = 1;
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
for (let i = 0; i < 24; i++) {
  invader = document.createElement('div');
  // //give them all a class
  invader.classList.add('invader');
  // //add to screen
  invadersBoard.appendChild(invader);
  // invaderRow.appendChild(invader);
  // //add invaders to array
  invaders.push(invader);
  console.log(invaders);
  invader.setAttribute('id', i);
  // // //position them
  // invaders[i].style.left = (invaderX * i) + 'px';
  // invaders[i].style.top = invaderY + 'px';
}
// }
// }

//moveInvaderRight();

//create player on screen
function createPlayer() {
  gameBoard.appendChild(player);
  player.style.left = Player.x + 'px';
  player.style.top = Player.y + 'px';
}

function moveInvaders() {
  if(invaderDrop < 400) {
    for(let i = 0 ; i < invaders.length ; i++ ) {
      invaderDrop += 1;
      invaders[i].style.top = invaderDrop + 'px';
    }
  } else {
    const playerExplosion = setInterval(function() {
      player.style.backgroundImage = 'url(\'./images/explosion.png\')';
    }, 1000);
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



    }

    // another if to check if bullet has reached the top (if so, clear it anyway)
  }
}



// function shootBullet() {
//   //create bullet element
//   bullet = document.createElement('div');
//   //give bullet a class
//   bullet.classList.add('bullet');
//   //add bullet to game screen
//   gameBoard.appendChild(bullet);
//   //position bullet so it's in the center of the player
//   bullet.style.left = Player.x + 65 + 'px';
//   bullet.style.top = Player.y + 'px';
//   // bullet = new Bullet();
//   // bullets.push({x: Player.x + 65, y: Player.y - 20});
//   let topPosition = Player.y;
//   setInterval(function() {
//     if(topPosition < 600) {
//     console.log(bullet.style.top);
//     bullet.style.top = topPosition + 'px';
//     topPosition -= 10;
//   }
//   }, 100);
// }



// function moveBullet() {
//   for(let i = 0 ; i < bullets.length ; i++ ) {
//     //console.log(bullets[i]);
//     bullets[i].y = bullets[i].y + 10;
//   }
// }

// function moveInvaders() {
//   for(let i = 0; i<invaders.length; i++){
//     invadersX -= 100;
//     invaders[i].style.left -= 10 + 'px';
//   }
// }

function gameLoop() {
  // console.log('hello');
  setTimeout(gameLoop, 2000);
  //moveBullet();
  checkWin();
//  moveInvaders();
}

function checkWin() {
  if(document.querySelectorAll('.hit').length === 24) {
    alert('youve won');
    clearTimeout(gameLoop);
  }
}



gameLoop();
createPlayer();
//createInvaders();
