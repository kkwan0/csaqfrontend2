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
        font-family: Aharoni;
        position: absolute;
        color: green;
        top: 0;
        left: 0;
        right: 0;
        width: 300px;
        transform: translateX(12%);
      }
      #time {
        font-size: 2em;
        font-weight: bold;
        font-family: Aharoni;
        position: absolute;
        color: green;
        top: 0;
        right: 0;
        width: 300px;
        transform: translateX(12%);
      }
      #highestScore {
        font-size: 2em;
        font-weight: bold;
        font-family: Aharoni;
        position: absolute;
        color: green;
        top: 0;
        right: 0;
        width: 300px;
        transform: translateX(12%);
      }
  </style>
</head>
<body>
  <div id="score">Score = 1</div>
  <div id="time">Time Elapsed = 60</div>
  <div id="highestScore">Highest Score = 100</div>
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
    class Doodle {
    constructor(x, y, dx, dy) {
      this.x = x;
      this.y = y;
      this.dx = dx;
      this.dy = dy;
      this.width = 40;
      this.height = 60;
    }
    get W() {
      return this.width;
    }
    get H() {
      return this.height;
    }
    get X() {
      return this.x;
    }
    get Y() {
      return this.y;
    }
    set X(x) {
      this.x = x;
    }
    set Y(y) {
      this.y = y;
    }
    get Dx() {
      return this.dx;
    }
    get Dy() {
      return this.dy;
    }
    set Dx(dx) {
      this.dx = dx;
    }
    set Dy(dy) {
      this.dy = dy;
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
  //create platforms until y reaches
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
  // the doodle 
  /*
  const doodle = {
    width: 40,
    height: 60,
    x: canvas.width / 2 - 20,
    y: platformStart - 60,
    //velocity
    dx: 0,
    dy: 0
  };
  */
  let doodle = new Doodle(canvas.width / 2 - 20, platformStart - 60, 0, 0);
  // keep track of player direction and actions
  let playerDir = 0;
  let keydown = false;
  let prevDoodleY = doodle.Y;
  //game loop
  function loop() {
    //check if the doodle falls off
    if(
      //doodle is falling
      doodle.Dy > 0 && 
      doodle.Y > canvas.height;
    ) {
      alert("Doodle fell off, game over!!!!!");
      return;
    }
    //updateScore();
    requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
    // apply gravity to doodle
    doodle.Dy += gravity;
    // if doodle reaches the middle of the screen, move the platforms down
    // instead of doodle up to make it look like doodle is going up
    if (doodle.Y < canvas.height / 2 && doodle.Dy < 0) {
      doodlePlatforms.forEach(function(platform) {
        platform.Y += -doodle.Dy;
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
      doodle.Y += doodle.Dy;
    }
    // only apply drag to horizontal movement if key is not pressed
    if (!keydown) {
      if (playerDir < 0) {
        doodle.Dx += drag;
        // don't let dx go above 0
        if (doodle.Dx > 0) {
          doodle.Dx = 0;
          playerDir = 0;
        }
      }
      else if (playerDir > 0) {
        doodle.Dx -= drag;
        if (doodle.Dx < 0) {
          doodle.Dx = 0;
          playerDir = 0;
        }
      }
    }
    doodle.X += doodle.Dx;
    // make doodle wrap the screen
    if (doodle.X + doodle.W < 0) {
      doodle.X = canvas.width;
    }
    else if (doodle.X > canvas.width) {
      doodle.X = -doodle.W;
    }
    // draw platforms
    context.fillStyle = 'green';
    doodlePlatforms.forEach(function(platform) {
      context.fillRect(platform.X, platform.Y, platformWidth, platformHeight);
      // make doodle jump if it collides with a platform from above
      if (
        // doodle is falling
        doodle.Dy > 0 &&
        // doodle was previous above the platform
        prevDoodleY + doodle.H <= platform.Y &&
        // doodle collides with platform
        // (Axis Aligned Bounding Box [AABB] collision check)
        doodle.X < platform.X + platformWidth &&
        doodle.X + doodle.W > platform.X &&
        doodle.Y < platform.Y + platformHeight &&
        doodle.Y + doodle.H > platform.Y
      ) {
        // reset doodle position so it's on top of the platform
        doodle.Y = platform.Y - doodle.H;
        doodle.Dy = bounceVelocity;
      }
    });
    // draw doodle
    context.fillStyle = 'yellow';
    context.fillRect(doodle.X, doodle.Y, doodle.W, doodle.H);
    prevDoodleY = doodle.Y;
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
      doodle.Dx = -3;
    }
    // right arrow key
    else if (e.which === 39) {
      keydown = true;
      playerDir = 1;
      doodle.Dx = 3;
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