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
    }
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
  // minimum and maximum vertical space between each platform
  let minPlatformSpace = 15;
  let maxPlatformSpace = 20;
  //* starting adding platforms to the canvas 
  let y = platformStart;
  let doodlePlatforms = new Platforms()
  while (y > 0) {
    // the next platform can be placed above the previous one with a space
    // somewhere between the min and max space
    y -= platformHeight + random(minPlatformSpace, maxPlatformSpace); //suppose it is y = 595 when called
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
    doodlePlatforms.newPlatform(x, y)
  }
  //game loop
  function loop() {
    //updateScore();
    requestAnimationFrame(loop);
    context.clearRect(0,0,canvas.width,canvas.height);
    context.fillStyle = 'green';
    doodlePlatforms.allPlatforms.forEach(function(platform) {
      context.fillRect(platform.X(), platform.Y(), platformWidth, platformHeight);
    });
    doodlePlatforms.allPlatforms = doodlePlatforms.allPlatforms.filter(function(platform) {
      return platform.Y() < canvas.height;
    })
  }
  // start the game
  requestAnimationFrame(loop);
  //updateScore();
  </script>
  </body>
  </html>