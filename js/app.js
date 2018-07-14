//load the page
window.addEventListener('DOMContentLoaded', () => {

  /////////////////////////////////////////////////////////////////////////////
  /////////////////////////////// GAME SETUP //////////////////////////////////
  /////////////////////////////////////////////////////////////////////////////

  //decalre all variables
  const boardContainer = document.querySelector('.board-container');
  const gameBoard = document.createElement('div');
  const leftBoard = 0;
  const rightBoard = 700;

  const player = document.createElement('div');
  let playerX = 335;
  const playerY = 600;
  const playerSpeed = 10;

  const invaders = [];
  let invader = document.createElement('div');
  let invaderX = 100;
  let invaderY = 0;
  const invaderSpeed = 10;
  const invaderDrop = 40;
  let touchedRightSide = false;

  let bullet;
  let bulletPosition = 0;
  const bulletSpeed = 10;

  setupBoard();
  createPlayer();
  createInvaders();

  function setupBoard() {
    gameBoard.classList.add('game-board');
    boardContainer.appendChild(gameBoard);
    console.log('board setup');
  }

  function createPlayer() {
    player.classList.add('player');
    gameBoard.appendChild(player);
    player.style.left = playerX + 'px';
    player.style.top = playerY + 'px';
  }

  function createInvaders() {
    for (let i = 0; i < 5; i++) {
      invader = document.createElement('div');
      // invader[i].style.left = i*5 + 'px';
      invader.classList.add('invader');
      invaders.push(invader);
      gameBoard.appendChild(invader);
      invaders[i].style.left = (invaderX * i) + 'px';
    }
    //moveInvaderRight();
  }
  //needs work
  // function moveInvaderRight() {
  //   if(touchedRightSide === false) {
  //     const moveRight = setInterval(function() {
  //       //for (let i = 0; i < invaders.length; i++) {
  //       if(invaders[i].invaderX < 600) {
  //         invaders[i].invaderX += invaderSpeed;
  //         invaders[i].invader.style.left = invaderX + 'px';
  //       } else {
  //         clearInterval(moveRight);
  //         console.log('touched the right side');
  //         touchedRightSide = true;
  //         dropInvader(touchedRightSide);
  //         //}
  //       }
  //     }, 500);
  //   }
  // }

  function dropInvader(touchedRightSide) {
    if(touchedRightSide === true) {
      console.log(touchedRightSide);
      invaderY += invaderDrop;
      invader.style.top = invaderY + 'px';
      console.log('dropped');
      //moveInvaderLeft();
    } else if(touchedRightSide === false) {
      invaderY += invaderDrop;
      invader.style.top = invaderY + 'px';
      console.log('dropped');
      //moveInvaderRight();
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
      }, 500);
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
    console.log('spacebar pressed');
    bullet = document.createElement('div');
    bullet.classList.add('bullet');
    player.appendChild(bullet);

    //move bullets up
    const fireBullet = setInterval(function() {
      if(bulletPosition > -550) {
        bulletPosition -= bulletSpeed;
        bullet.style.top = bulletPosition + 'px';
      } else if(bulletPosition === 550) {
        player.removeChild(bullet);
      }
    }, 100);
  }

});
