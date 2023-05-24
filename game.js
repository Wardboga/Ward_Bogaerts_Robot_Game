// game.js
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const robot = new Robot(180, 360, 40, 40);
const fruits = [];
const background = new Background('background.jpg');

let leftArrowPressed = false;
let rightArrowPressed = false;
let score = 0;
let lives = 5;
let gameRunning = false;

const catchSound = new Audio('ding.wav');

document.addEventListener('keydown', function (event) {
  if (event.key === 'ArrowLeft') {
    leftArrowPressed = true;
  } else if (event.key === 'ArrowRight') {
    rightArrowPressed = true;
  } else if (event.key === ' ' && !gameRunning) { // Spacebar
    startGame();
  }
});

document.addEventListener('keyup', function (event) {
  if (event.key === 'ArrowLeft') {
    leftArrowPressed = false;
  } else if (event.key === 'ArrowRight') {
    rightArrowPressed = false;
  }
});

function createFruit() {
  const x = Math.random() * canvas.width;
  const radius = 20;
  const color = 'red';
  const elapsedTime = (Date.now() - startTime) / 1000; // Elapsed time in seconds
  const speed = 2 + elapsedTime * 0.1; // Adjust speed based on elapsed time
  const fruit = new Fruit(x, 0, radius, color, speed);
  fruits.push(fruit);
}

function startGame() {
  gameRunning = true;
  score = 0;
  lives = 5;
  startTime = Date.now();
  fruits.length = 0; // Clear existing fruits
  update();
}

function update() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  background.draw();

  robot.draw();

  if (leftArrowPressed && robot.x > 0) {
    robot.x -= 5;
  } else if (rightArrowPressed && robot.x + robot.width < canvas.width) {
    robot.x += 5;
  }

  for (let i = 0; i < fruits.length; i++) {
    const fruit = fruits[i];
    fruit.update();
    fruit.draw();

    // Check collision with robot
    if (
      fruit.y + fruit.radius > robot.y &&
      fruit.x + fruit.radius > robot.x &&
      fruit.x - fruit.radius < robot.x + robot.width
    ) {
      fruits.splice(i, 1);
      score++;
      catchSound.load();
      catchSound.play();
      // Handle collision for example increment score
    }

    // Remove fruits that are off the screen
    if (fruit.y - fruit.radius > canvas.height) {
      fruits.splice(i, 1);
      loseLife();
    }
  }

  if (gameRunning) {
    // Display score
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.fillText('Score: ' + score, 100, 30);

    // Display lives
    ctx.fillStyle = 'black';
    ctx.font = '24px Arial';
    ctx.textAlign = 'right';
    ctx.fillText('Lives: ' + lives, canvas.width - 10, 30);

    if (lives === 0) {
      gameOver();
      return;
    }

    requestAnimationFrame(update);
  } else {
    displayCenteredMessage('Press Spacebar to Start');
  }
}

function loseLife() {
  lives--;
}

function gameOver() {
  gameRunning = false;
  displayCenteredMessage('Game Over. Press Spacebar to Restart');
  // Game over logic here
  // For example, display a game over message or restart the game
  console.log('Game Over');
}

function displayCenteredMessage(message) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'black';
  ctx.font = '18px Arial';
  ctx.textAlign = 'center';
  ctx.fillText(message, canvas.width / 2, canvas.height / 2);
}

function displayScore() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.textAlign = 'left';
  ctx.fillText('Score: ' + score, 20, 30);
}

function displayLives() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.textAlign = 'right';
  ctx.fillText('Lives: ' + lives, canvas.width - 10, 30);
}

function displayInitialMessage() {
  ctx.fillStyle = 'black';
  ctx.font = '24px Arial';
  ctx.textAlign = 'center';
  ctx.fillText('Press Spacebar to Start', canvas.width / 2, canvas.height / 2);
}

let startTime = Date.now();
setInterval(createFruit, 1000);

displayInitialMessage();
