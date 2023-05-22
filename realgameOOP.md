<html>
<head>
  <title>Basic Doodle Jump HTML Game</title>
  <meta charset="UTF-8">
  <style>
      html, body {
        height: 100%;  
        margin: 0;
      }  
      body {
        text-align: center;
        align-items: center; 
      }
      canvas {
        border: 2px solid #FF0000;
        background-color: #E6E6E6;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #FF0000;
        display: block;
        margin: 0;
        height: 100%;
      }
      #score {
        font-size: 2em;
        font-weight: bold;
        position: center;
        top: 1;
        left: 52%;
        transform: translateX(12.5%);
      }
  </style>
</head>
<body>
  <div id="score">1</div>
<canvas width="375" height="667" id="game"></canvas>
<script>
    class Platform {
        constructor(x, y) {
            this.x = x;
            this.y = y;
        }
        get X() {
            return this.x;
        }
        get Y() {
            return this.y;
        }
        set X(x)
        {
          this.x=x;
        }
        set Y(y)
        {
          this.y=y;
        }
    }
/*
  class Platforms {
    constructor() {
      this.myPlatforms = []
    }
    //
    newPlatform(x, y) {
      let p = new Platform(x, y)
      this.myPlatforms.push(x, y)
      return p
    }
    //
    get allPlatforms() {
      return this.myPlatforms
    }
    //
    get PlatformLength() {
      return this.myPlatforms.length
    }
  }
  */
  //helper method for the while loop
  function random(min, max) {
    return Math.random() * (max - min) + min;
  }
  //set values for the platforms
  const canvas = document.getElementById('game');
  const context = canvas.getContext('2d');
  // width and height of each platform and where platforms start
  const platformWidth = 65;
  const platformHeight = 20;
  const platformStart = canvas.height - 50; //platformStart - 617
  // player physics
  const gravity = 0.33;
  const drag = 0.3;
  const bounceVelocity = -12.5;
  // minimum and maximum vertical space between each platform
  let minPlatformSpace = 15;
  let maxPlatformSpace = 20;
  //* starting adding platforms to the canvas 
  let y = platformStart;
  let doodlePlatforms = [new Platform(canvas.width / 2 - platformWidth / 2, platformStart)];
  while (y > 0) {
    // the next platform can be placed above the previous one with a space
    // somewhere between the min and max space
    y -= platformHeight + random(minPlatformSpace, maxPlatformSpace); 
    //suppose it is y = 595 when called
    // a platform can be placed anywhere 25px from the left edge of the canvas
    // and 25px from the right edge of the canvas (taking into account platform
    // width).
    // however the first few platforms cannot be placed in the center so
    // that the player will bounce up and down without going up the screen
    // until they are ready to move
    let x;
    do {
      x = random(25, canvas.width - 25 - platformWidth); //x = 259 suppose
    } while (
      y > canvas.height / 2 &&
      x > canvas.width / 2 - platformWidth * 1.5 &&
      x < canvas.width / 2 + platformWidth / 2
    );
    doodlePlatforms.push(new Platform(x, y))
  }
  // the doodle jumper
  const doodle = {
    width: 40,
    height: 60,
    x: canvas.width / 2 - 20,
    y: platformStart - 60,
    //velocity
    dx: 0,
    dy: 0
  };
  // keep track of player direction and actions
  let playerDir = 0;
  let keydown = false;
  let prevDoodleY = doodle.y;
  //game loop
  function loop() {
    //updateScore();
    requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
    // apply gravity to doodle
    doodle.dy += gravity;
    // if doodle reaches the middle of the screen, move the platforms down
    // instead of doodle up to make it look like doodle is going up
    if (doodle.y < canvas.height / 2 && doodle.dy < 0) {
      doodlePlatforms.forEach(function(platform) {
        platform.Y += -doodle.dy;
      });
      // add more platforms to the top of the screen as doodle moves up
      while (doodlePlatforms[doodlePlatforms.length - 1].Y > 0) {
            doodlePlatforms.push(new Platform(random(25, canvas.width - 25 - platformWidth),doodlePlatforms[doodlePlatforms.length - 1].Y - (platformHeight + random(minPlatformSpace, maxPlatformSpace)))
        );
        // add a bit to the min/max platform space as the player goes up
        minPlatformSpace += 0.5;
        maxPlatformSpace += 0.5;
        // cap max space
        maxPlatformSpace = Math.min(maxPlatformSpace, canvas.height / 2);
      }
    }
    else {
      doodle.y += doodle.dy;
    }
    // only apply drag to horizontal movement if key is not pressed
    if (!keydown) {
      if (playerDir < 0) {
        doodle.dx += drag;
        // don't let dx go above 0
        if (doodle.dx > 0) {
          doodle.dx = 0;
          playerDir = 0;
        }
      }
      else if (playerDir > 0) {
        doodle.dx -= drag;
        if (doodle.dx < 0) {
          doodle.dx = 0;
          playerDir = 0;
        }
      }
    }
    doodle.x += doodle.dx;
    // make doodle wrap the screen
    if (doodle.x + doodle.width < 0) {
      doodle.x = canvas.width;
    }
    else if (doodle.x > canvas.width) {
      doodle.x = -doodle.width;
    }
    // draw platforms
    context.fillStyle = 'green';
    doodlePlatforms.forEach(function(platform) {
      context.fillRect(platform.X, platform.Y, platformWidth, platformHeight);
      // make doodle jump if it collides with a platform from above
      if (
        // doodle is falling
        doodle.dy > 0 &&
        // doodle was previous above the platform
        prevDoodleY + doodle.height <= platform.Y &&
        // doodle collides with platform
        // (Axis Aligned Bounding Box [AABB] collision check)
        doodle.x < platform.X + platformWidth &&
        doodle.x + doodle.width > platform.X &&
        doodle.y < platform.Y + platformHeight &&
        doodle.y + doodle.height > platform.Y
      ) {
        // reset doodle position so it's on top of the platform
        doodle.y = platform.Y - doodle.height;
        doodle.dy = bounceVelocity;
      }
    });
    // draw doodle
    context.fillStyle = 'yellow';
    context.fillRect(doodle.x, doodle.y, doodle.width, doodle.height);
    prevDoodleY = doodle.y;
    // remove any platforms that have gone offscreen
    doodlePlatforms = doodlePlatforms.filter(function(platform) {
      return platform.Y < canvas.height;
    })
  }
  // listen to keyboard events to move doodle
  document.addEventListener('keydown', function(e) {
    // left arrow key
    if (e.which === 37) {
      keydown = true;
      playerDir = -1;
      doodle.dx = -3;
    }
    // right arrow key
    else if (e.which === 39) {
      keydown = true;
      playerDir = 1;
      doodle.dx = 3;
    }
  });
  document.addEventListener('keyup', function(e) {
    keydown = false;
  });
  // start the game
  requestAnimationFrame(loop);
  //updateScore();
  </script>
  </body>
  </html>