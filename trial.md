<html>
<head>
  <title>Trial</title>
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
  </style>
</head>
<body>

<script>
class Score {
  constructor() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  increaseScore() {
    this.score++;
  }

  resetScore() {
    this.score = 0;
  }
}

// Usage example:
const gameScore = new Score();

let currentScore = gameScore.getScore();

if (/* block touches platform */) {

  // Block touches another barrier, increase score

  gameScore.increaseScore();
  console.log("Current score: " + currentScore);

} else {

  // Reset score
  gameScore.resetScore();
  console.log("Score after reset: " + currentScore);
}
<script>

</body>

</html>