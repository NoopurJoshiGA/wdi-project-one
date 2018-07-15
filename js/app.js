// //load the page
// window.addEventListener('DOMContentLoaded', () => {
//
//   /////////////////////////////////////////////////////////////////////////////
//   /////////////////////////////// GAME SETUP //////////////////////////////////
//   /////////////////////////////////////////////////////////////////////////////
//
//   //decalre all variables
//   const body = document.querySelector('body');
//   const gameBoard = document.querySelector('.board');
//   const player = document.querySelector('.player');
//   let bullet = document.querySelector('.bullet');
//   let invader = document.querySelector('invader');
//
//   //create player object
//   const Player = {
//     x: 325,
//     y: 600,
//     w: 50,
//     h: 50,
//     speed: 10
//   };
//
//   // let bulletPosition = 0;
//   // let bulletSpeed = 10;
//   //
//   //
//
//   let invaderX = 100;
//   let invaderY = 0;
//   const invaderSpeed = 10;
//   const invaderDrop = 40;
//   let touchedRightSide = false;
//
//   // const bullets = [];
//   //
//   // const Bullet = {
//   //   x: Player.x,
//   //   y: Player.y,
//   //   w: 10,
//   //   h: 20,
//   //   speed: 10
//   // };
//
//   setupBoard();
//   createPlayer();
//   createInvaders();
//
//   function setupBoard() {
//     body.appendChild(gameBoard);
//     console.log('board setup');
//   }
//
//   function createPlayer() {
//     gameBoard.appendChild(player);
//     player.style.left = Player.x + 'px';
//     player.style.top = Player.y + 'px';
//   }
//
//   //make player move
//   document.onkeydown = function(e) {
//     if(Player.x > 0 && e.keyCode === 37) {
//
//       Player.x -= Player.speed;
//       player.style.left = Player.x + 'px';
//
//     } else if (Player.x < 650 && e.keyCode === 39) {
//
//       Player.x += Player.speed;
//       player.style.left = Player.x + 'px';
//
//     } else if (e.keyCode === 32) {
//       //createBullet();
//     }
//   };
//
//   function createInvaders() {
//     for (let i = 0; i < 1; i++) {
//       invader = document.createElement('div');
//       invader.classList.add('invader');
//       invaders.push(invader);
//       gameBoard.appendChild(invader);
//       invaders[i].style.left = (invaderX * i) + 'px';
//     }
//     moveInvaderRight();
//   }
//
//
//   // function Bullet() {
//   //   bullet.style.left = Player.x + 20 + 'px';
//   //   bullet.style.top = Player.y + 'px';
//   //   return bullet;
//   // }
//   //
//   // function createBullet() {
//   //   bullet = new Bullet();
//   //   gameBoard.appendChild(bullet);
//   //   console.log('new bullet created' + bullet);
//   //
//   //   const fireBullet = setInterval(function() {
//   //     if(bulletPosition > -600) {
//   //       bulletPosition -= bulletSpeed;
//   //       bullet.style.top = bulletPosition + 'px';
//   //       //checkCollision();
//   //     }
//   //   }, 100);
//   // }
//
//
//
//
//
//
//
//
//
//
//   // let bulletTop;
//   // let bulletLeft;
//   // let bulletRight;
//   //
//   // let invaderLeft;
//   // let invaderRight;
//   // let invaderBottom;
//
//
//
//
//
//
//   // //needs work
//   // function moveInvaderRight() {
//   //   if(touchedRightSide === false) {
//   //     const moveRight = setInterval(function() {
//   //       //for (let i = 0; i < invaders.length; i++) {
//   //       if(invaderX < 600) {
//   //         invaderX += invaderSpeed;
//   //         invader.style.left = invaderX + 'px';
//   //       } else {
//   //         clearInterval(moveRight);
//   //         console.log('touched the right side');
//   //         touchedRightSide = true;
//   //         dropInvader(touchedRightSide);
//   //       }
//   //     }, 100);
//   //   }
//   // }
//   //
//   // function dropInvader(touchedRightSide) {
//   //   if(touchedRightSide === true) {
//   //     console.log(touchedRightSide);
//   //     invaderY += invaderDrop;
//   //     invader.style.top = invaderY + 'px';
//   //     console.log('dropped');
//   //     moveInvaderLeft();
//   //   } else if(touchedRightSide === false) {
//   //     invaderY += invaderDrop;
//   //     invader.style.top = invaderY + 'px';
//   //     console.log('dropped');
//   //     moveInvaderRight();
//   //   }
//   // }
//   //
//   // function moveInvaderLeft() {
//   //   if(touchedRightSide === true) {
//   //     const moveLeft = setInterval(function() {
//   //       if(invaderX > 0) {
//   //         invaderX -= invaderSpeed;
//   //         invader.style.left = invaderX + 'px';
//   //       } else {
//   //         clearInterval(moveLeft);
//   //         console.log('touched the left side');
//   //         touchedRightSide = false;
//   //         dropInvader(touchedRightSide);
//   //       }
//   //     }, 100);
//   //   }
//   // }
//
//
//
//
//   //
//   // function shootBullet() {
//   //   if(bulletPosition > 0) {
//   //     bulletPosition -= bulletSpeed;
//   //     bulletPosition -= bulletSpeed;
//   //     bullet.style.top = bulletPosition + 'px';
//   //   }
//   // }
//
//   // function checkCollision() {
//   //   bulletLeft = bullet.getBoundingClientRect().left;
//   //   invaderLeft + 50;
//   //
//   //   bulletTop = bullet.getBoundingClientRect().top;
//   //   invaderBottom = invader.getBoundingClientRect().top;
//   //   bulletLeft = bullet.getBoundingClientRect().left;
//   //   invaderLeft = invader.getBoundingClientRect().left;
//   //   // console.log('bulletTop ' + bulletTop);
//   //   // console.log('invaderBottom ' + invaderBottom);
//   //   console.log('invaderleft ' + invaderLeft);
//   //   console.log('bulletleft ' + bulletLeft);
//   //
//   //   if((bulletTop < (invaderBottom + 30)) && (bulletLeft <= (invaderLeft + 40))) {
//   //     alert('collision');
//   //   }
//   //
//   // }
//
//
//   //create game loop that will fire bullets
//   // function gameLoop() {
//   //   setTimeout(gameLoop, 1000);
//   //   shootBullet();
//   // }
//   //
//   // gameLoop();
//
// });



//load the page
window.addEventListener('DOMContentLoaded', () => {

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GAME SETUP //////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  //decalre all variables
  const body = document.querySelector('body');
  const gameBoard = document.querySelector('.board');
  const leftBoard = 0;
  const rightBoard = 700;

  const player = document.querySelector('.player');
  let playerX = 325;
  const playerY = 600;
  const playerSpeed = 10;

  const invaders = [];
  let invader = document.querySelector('.invader');
  let invaderX = 100;
  let invaderY = 0;
  const invaderSpeed = 10;
  const invaderDrop = 40;
  let touchedRightSide = false;

  let bullet;
  let bullets = [];
  const bulletSpeed = 10;
  let bulletPosition = 0;

  let bulletTop;
  let bulletLeft;
  let bulletRight;

  let invaderLeft;
  let invaderRight;
  let invaderBottom;

  setupBoard();
  createPlayer();
  createInvaders();

  function setupBoard() {

    console.log('board setup');
  }

  function createPlayer() {
    player.classList.add('player');
    gameBoard.appendChild(player);
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
  }

  function createInvaders() {
    for (let i = 0; i < 1; i++) {
      invader = document.createElement('div');
      invader.classList.add('invader');
      invaders.push(invader);
      gameBoard.appendChild(invader);
      invaders[i].style.left = (invaderX * i) + 'px';
    }
    moveInvaderRight();
  }
  //needs work
  function moveInvaderRight() {
    if(touchedRightSide === false) {
      const moveRight = setInterval(function() {
        //for (let i = 0; i < invaders.length; i++) {
        if(invaderX < 600) {
          invaderX += invaderSpeed;
          invader.style.left = invaderX + 'px';
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
      invader.style.top = invaderY + 'px';
      console.log('dropped');
      moveInvaderLeft();
    } else if(touchedRightSide === false) {
      invaderY += invaderDrop;
      invader.style.top = invaderY + 'px';
      console.log('dropped');
      moveInvaderRight();
    }
  }

  function moveInvaderLeft() {
    if(touchedRightSide === true) {
      const moveLeft = setInterval(function() {
        if(invaderX > 0) {
          invaderX -= invaderSpeed;
          invader.style.left = invaderX + 'px';
        } else {
          clearInterval(moveLeft);
          console.log('touched the left side');
          touchedRightSide = false;
          dropInvader(touchedRightSide);
        }
      }, 100);
    }
  }

  //gotta fix the positions of the player
  document.onkeydown = function(e) {
    //move player left
    if(playerX > leftBoard && e.keyCode === 37) {
      playerX -= playerSpeed;
      player.style.left = playerX + 'px';
      //console.log(player.style.left);
    } else if (playerX < (rightBoard-50) && e.keyCode === 39) {
      playerX += playerSpeed;
      player.style.left = playerX + 'px';
      //console.log(player.style.left);
    } else if (e.keyCode === 32) {
      shootBullet();
    }
  };

  function shootBullet() {
    //first create the bullet
    bullet = document.createElement('div');
    //add it to the array of bullets
    bullets.push(bullet);
    bullet.classList.add('bullet');
    player.appendChild(bullet);
    bullets.forEach(function(bullet){
      console.log(bullet);
      const fireBullet = setInterval(function() {
        if(bulletPosition > -600) {
          bulletPosition -= bulletSpeed;
          bullet.style.top = bulletPosition + 'px';
          checkCollision();
        }
      }, 100);
    });
  }


  function checkCollision() {
    bulletLeft = bullet.getBoundingClientRect().left;
    invaderLeft + 50;

    bulletTop = bullet.getBoundingClientRect().top;
    invaderBottom = invader.getBoundingClientRect().top;
    bulletLeft = bullet.getBoundingClientRect().left;
    invaderLeft = invader.getBoundingClientRect().left;
    // console.log('bulletTop ' + bulletTop);
    // console.log('invaderBottom ' + invaderBottom);
    console.log('invaderleft ' + invaderLeft);
    console.log('bulletleft ' + bulletLeft);

    if((bulletTop < (invaderBottom + 30)) && (bulletLeft <= (invaderLeft + 40))) {
      alert('collision');
    }

  }

});
