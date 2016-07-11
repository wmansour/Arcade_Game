// Global player location variable
var playerX = 200;
var playerY = 400;

// Global arrays for enemy
var HEIGHT = [68, 151, 234];
var ENEMY_SPEEDS = [300, 400, 500, 600];

//global variable for beginning lives and score
var livesRemaining = 10;
var pointsScored = 0;

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = ENEMY_SPEEDS[(Math.floor(Math.random() * ENEMY_SPEEDS.length))];
    this.x = -100;
    this.y = HEIGHT[Math.floor(Math.random() * 3)];
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Resets player position after getting hit by bug
Enemy.prototype.collision = function() {
  player.x = 200;
  player.y = 400;
  // lives decrease when they get hit by bug
  livesRemaining = livesRemaining - 1;
  lives.update(livesRemaining);
  //ends game and shows game over screen w/ score if lives reach 0
  if (livesRemaining === 0) {
        document.write(
          "<h1 style= 'text-align: center'>GAME OVER</h1>" +
          "<h2 style= 'text-align: center'>Your score was " + pointsScored + "</h2>" +
          "<h3 style= 'text-align: center'>Keep track of your high score and refresh page to play again.</h3>");
  }
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers
    this.x += this.speed * dt;
    // Identify collision with an enemy
    if (this.x - playerX < 40 && this.x - playerX > 0 && this.y === playerY) {
      this.collision();
    };
    // resets enemy when they cross the screen
    if (this.x > 500) {
      this.speed = ENEMY_SPEEDS[(Math.floor(Math.random() * ENEMY_SPEEDS.length))] - 100;
      this.x = -100;
      this.y = HEIGHT[Math.floor(Math.random() * 3)];
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
  this.x = playerX;
  this.y = playerY;
  this.sprite = 'images/char-boy.png';
};

//Resets player position when they reach the water and increases their score
Player.prototype.success = function() {
    this.x = 200;
    this.y = 400;
    pointsScored += 1;
    score.update(pointsScored);
};

Player.prototype.update = function(dt) {
  playerX = this.x;
  playerY = this.y;
  //scores a point if they reach the water
  if (playerY < 60) {
    this.success();
  }
};

Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Moves player and keeps them from going of off the canvas
Player.prototype.handleInput = function(direction) {
  if (direction === "left" && this.x > 0) {
    this.x = this.x - 100;
  }
  if (direction === "right" && this.x < 400) {
    this.x = this.x + 100;
  }
  if (direction === "up" && this.y > 0) {
    this.y = this.y - 83;
  }
  if (direction === "down" && this.y < 400) {
    this.y = this.y + 83;
  }
};

// Score function
var Score = function() {
  this.doc = document;
  this.scoreHeading = this.doc.createElement('h2');
  this.doc.body.appendChild(this.scoreHeading);
  this.node = this.doc.createTextNode("Score: " + pointsScored);
  this.scoreHeading.appendChild(this.node);
}

Score.prototype.update = function(pointsScored) {
  this.h2 = this.doc.getElementsByTagName('h2');
  this.h2[1].firstChild.nodeValue = "Score: " + pointsScored;
}

// Lives function
var Lives = function() {
  this.doc = document;
  this.livesHeading = this.doc.createElement('h2');
  this.doc.body.appendChild(this.livesHeading);
  this.node = this.doc.createTextNode("Lives: " + livesRemaining);
  this.livesHeading.appendChild(this.node);
}

Lives.prototype.update = function(livesRemaining) {
  this.h2 = this.doc.getElementsByTagName('h2');
  this.h2[0].firstChild.nodeValue = "Lives: " + livesRemaining;
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];
var player = new Player();
var lives = new Lives();
var score = new Score();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
