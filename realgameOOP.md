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
      .container {
        display: flex;
      }
      canvas {
        border: 2px solid #FF0000;
        background-color: #E6E6E6;
        border-radius: 10px;
        box-shadow: 0px 0px 10px #FF0000;
        display: block;
        margin: 0;
        height: 90%;
        style="display: inline-block;
      }
      table {
        margin-left: 20px;
      }
      info-container {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        height: 90%;
      }
      #score {
        font-size: 2em;
        font-weight: bold;
        font-family: 'Courier New', monospace;
        top: 0;
        left: 0;
        right: 0;
        width: 300px;
        transform: translateX(-2%);
        text-transform: uppercase;
	background: linear-gradient(to right,  #500573  30%, #161070   75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 20vw;
		family: $font;
	};
      }
      #highestScore {
        font-size: 1.7em;
        font-weight: bold;
        font-family: 'Courier New', monospace;
        top: 0;
        right: 0;
        width: 300px;
        transform: translateX(-2%);
        background: linear-gradient(to right,  #500573  30%,  #161070    75%);
	-webkit-background-clip: text;
	-webkit-text-fill-color: transparent;
	font: {
		size: 20vw;
		family: $font;
	};
      }
      /* th table head */
      th
      {
        font-weight: bold;
        color:  #7673ff ;
        transform: translateX(-3%);
      }
      td
      {
font-weight: bold;
        color:   #8683fb   ;
        font-family: "Comic Sans MS", "Comic Sans", cursive;
        width: 300px;
        transform: translateX(-2%);
      }
  </style>
</head>
<body>

<div class="container">
  <div class="canvas-container">
    <canvas width="375" height="667" id="game"></canvas>
  </div>
  <div class="info-container">
    <div id="score">Score: </div>
    <div id="score">Time Elapsed: </div>
    <div id="highestScore">Highest Score: </div>
  </div>
  <div class="table">

  <table id="tablearr">
  <!-- Table headers or initial content -->
  <tr>
    <th>Session</th>
    <th>Score</th>
  </tr>
</table>

  </div>
</div>
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
  //window varible
  var windowId = undefined;
  //score counter and variable
  var score = 0;
  var highscore = getHighScore(); //highscore
  //
  // minimum and maximum vertical space between each platform
  let minPlatformSpace = 15;
  let maxPlatformSpace = 20;
  //* starting adding platforms to the canvas 
  let y = platformStart;
  let doodlePlatforms = [new Platform(canvas.width / 2 - platformWidth / 2, platformStart)];
  //doodle image
  var dimg = new Image();
  dimg.src = "https://raw.githubusercontent.com/JasonMize/coding-league-assets/master/doodle-jump-doodler.png";
  //platforms image
  var pimg = new Image();
  pimg.src = "platform3.png";
  //background image
  var bimg = new Image();
  bimg.src = "dbackground(1).png";
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
    //updateScore();
    //check if the doodle falls off
    if(doodle.Y > canvas.height) {
      alert("Doodle fell off, game over!!!!!");
      if (score > highscore) {
        highscore = score;
        document.getElementById('highestScore').innerHTML = "Highscore: "+ highscore;
        document.cookie = 'highscore' + '=' + score + '; expires=' +    daysToExpire + ';SameSite=None';
        console.log(highscore);
      }
      document.getElementById('score').innerHTML = "Score: "+score;
      cancelAnimationFrame(windowId); 
      createNewCookie();
      location.reload();       
      return;
    }
    windowId = undefined;
    requestAnimationFrame(loop);
    //context.clearRect(0,0,canvas.width,canvas.height);
    //drawing background from image
    context.drawImage(bimg, 0, 0, canvas.width,canvas.height);
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
        doodlePlatforms.push(new Platform(random(25, canvas.width - 25 - platformWidth),doodlePlatforms[doodlePlatforms.length - 1].Y - (platformHeight + random(minPlatformSpace, maxPlatformSpace))));
        score++;
        document.getElementById('score').innerHTML = "Score: "+score;
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
      //context.fillRect(platform.X, platform.Y, platformWidth, platformHeight);
      context.drawImage(pimg, platform.X, platform.Y, platformWidth, platformHeight);
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
    //context.fillRect(doodle.X, doodle.Y, doodle.W, doodle.H);
    context.drawImage(dimg, doodle.X, doodle.Y, doodle.W, doodle.H);
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
  windowId = requestAnimationFrame(loop);
  //updateScore();
  function getHighScore() {
  var cookieString = document.cookie;
  var cookieArray = cookieString.split(";");
  // Iterate over each cookie
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();
    // Check if the cookie starts with the provided name
    if (cookie.startsWith("highscore=")) {
      // Extract and return the cookie value
      var score = parseInt(cookie.substring("highscore=".length));    
      return score;
      }
  }
  // Return null if the cookie is not found
  console.log("notfound");
  return null;
  }
  console.log(getHighScore());
  </script>


  <script>
  var cookieValue = document.cookie;
  const daysToExpire = new Date(2147483647 * 1000).toUTCString();
  // Split the cookie string into an array of cookies
  var cookies = cookieValue.split(';');
  // Get the table body element
  var tableBody = document.querySelector('#tablearr');
  // Generate table rows for each cookie
function tablegen() {
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim().split('=');
    var name = cookie[0];
    var value = cookie[1];
    var row = document.createElement('tr');
    var nameCell = document.createElement('td');
    nameCell.textContent = name;
    row.appendChild(nameCell); //adds the item
    var valueCell = document.createElement('td');
    valueCell.textContent = value;
    row.appendChild(valueCell);
    tableBody.appendChild(row);
    var deleteButtonCell = document.createElement('td');
    var deleteButton = document.createElement('button'); //the butotn
    deleteButton.textContent = 'rmove'; //text in button
    deleteButton.addEventListener('click', function()
    {
      deleteCookie(name); //functino so that it doesn't run automatically
    });
    deleteButtonCell.appendChild(deleteButton);
    row.appendChild(deleteButtonCell); //these 2 add the button
  }
}
  function createNewCookie() {
    // Generate a new cookie name and value
    var cookieName = 'player' + (document.cookie.split('player').length - 1); //checks the length of how many users there are
    var cookieValue = score;
    // Set the new cookie
    document.cookie = cookieName + '=' + cookieValue + '; expires=' + daysToExpire + ';SameSite=None';
    var tableBody = document.querySelector('#tablearr');  //returns the table
  }
  function deleteCookie(cookieName) {
      document.cookie = cookieName + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }
 

// Retrieve all cookies and split them into individual name-value pairs
var cookieString = document.cookie;
var cookiePairs = cookieString.split(";");

// Create a 2D array to store the cookie names and values
var cookieArray = [];

// Iterate over each cookie pair
for (var i = 0; i < cookiePairs.length; i++) {
  // Extract the cookie name and value
  var cookiePair = cookiePairs[i].trim();
  var equals = cookiePair.indexOf("=");

  // Extract the cookie name and value
  var cookieName = cookiePair.substr(0, equals);
  var cookieValue = cookiePair.substr(equals + 1);

  // Create a new array to store the name-value pair
  var cookie = [cookieName, cookieValue];

  // Add the cookie array to the main cookieArray
  cookieArray.push(cookie);
}

// Now you have a 2D array (cookieArray) containing all the cookie names and values
console.log(cookieArray);



var table = document.getElementById("tablearr");

for (var i = 0; i < cookieArray.length; i++) {
  if (cookieArray[i][0].startsWith("highscore")) {
    highscoreRowIndex = i;
    console.log("found");
    console.log(cookieArray[i][0]);

    cookieArray = deleteRow(cookieArray, i);

    break;
  }
}

function deleteRow(arr, row) {
  arr = arr.slice(0); // make a copy
  arr.splice(row, 1);
  return arr;
}


// Iterate over each cookie array in the 2D array
for (var i = 0; i < cookieArray.length; i++) {
  // Create a new row
  var row = document.createElement("tr");
  
  // Iterate over each element in the cookie array
  for (var j = 0; j < cookieArray[i].length; j++) {
    // Create a new cell
    var cell = document.createElement("td");
    
    // Set the cell text to the value in the cookie array
    cell.textContent = cookieArray[i][j];
    
    // Append the cell to the row
    row.appendChild(cell);
  }
  
  // Append the row to the table
  table.appendChild(row);
}









function getHighScore() {
  var cookieString = document.cookie;
  var cookieArray = cookieString.split(";");

  // Iterate over each cookie
  for (var i = 0; i < cookieArray.length; i++) {
    var cookie = cookieArray[i].trim();

    // Check if the cookie starts with the provided name
    if (cookie.startsWith("highscore=")) {
      // Extract and return the cookie value
      var score = parseInt(cookie.substring("highscore=".length));    
      return score;
      }
  }

  // Return null if the cookie is not found
  console.log("notfound");
  return null;
}


getHighScore();
console.log(getHighScore());
document.getElementById('highestScore').innerHTML = "Highest Score: " + getHighScore();

</script> 
  </body>
  </html>