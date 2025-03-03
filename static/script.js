// Get the canvas
let canvas = document.getElementById('gameCanvas');
let ctx = canvas.getContext('2d');

// Load images
let dinoImg = new Image();
dinoImg.src = '/static/pixel_dino.png';

let truckImg = new Image();
truckImg.src = '/static/truck.png';

// Dinosaur object
let dino = {
  x: 50,
  y: 200,
  width: 40,
  height: 40,
  velocityY: 0,
  gravity: 1,
  jumpPower: -15,
  jumping: false,
};

// Obstacles
let obstacles = [];
let obstacleSpeed = 5;
let gameOver = false;

// Jump function
document.addEventListener('keydown', function (event) {
  if (event.code === 'Space' && !dino.jumping) {
    dino.velocityY = dino.jumpPower;
    dino.jumping = true;
  }
});

// Game loop
function updateGame() {
  if (gameOver) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the dinosaur
  ctx.drawImage(dinoImg, dino.x, dino.y, dino.width, dino.height);

  // Apply gravity
  dino.y += dino.velocityY;
  dino.velocityY += dino.gravity;
  if (dino.y > 200) {
    dino.y = 200;
    dino.jumping = false;
  }

  // Move and draw obstacles
  for (let i = 0; i < obstacles.length; i++) {
    obstacles[i].x -= obstacleSpeed;
    ctx.drawImage(
      obstacles[i].image,
      obstacles[i].x,
      obstacles[i].y,
      obstacles[i].width,
      obstacles[i].height
    );

    // Collision detection with adjusted hitboxes
    let dinoHitbox = {
      x: dino.x + 5, // Shrink the hitbox inward
      y: dino.y + 5,
      width: dino.width - 10, // Reduce width
      height: dino.height - 5, // Reduce height slightly
    };

    let obstacleHitbox = {
      x: obstacles[i].x + 5,
      y: obstacles[i].y + 5,
      width: obstacles[i].width - 10,
      height: obstacles[i].height - 5,
    };

    // check for collisions
    if (
      dinoHitbox.x < obstacleHitbox.x + obstacleHitbox.width &&
      dinoHitbox.x + dinoHitbox.width > obstacleHitbox.x &&
      dinoHitbox.y < obstacleHitbox.y + obstacleHitbox.height &&
      dinoHitbox.y + dinoHitbox.height > obstacleHitbox.y
    ) {
      gameOver = true;
      setTimeout(() => {
        alert('Game Over!');
        document.location.reload();
      }, 300);
      return;
    }
  }

  // Remove obstacles that move out of the screen
  obstacles = obstacles.filter((obstacle) => obstacle.x > -50);

  requestAnimationFrame(updateGame);
}

// Generate obstacles
function createObstacle() {
  let obstacle = {
    x: 800,
    y: 220,
    width: 50,
    height: 50,
    image: truckImg,
  };

  obstacles.push(obstacle);
  setTimeout(createObstacle, Math.random() * 2000 + 1000);
}

// Start the game after images load
truckImg.onload = function () {
  createObstacle();
  updateGame();
};
