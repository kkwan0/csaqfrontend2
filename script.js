window.onload = function() {
    var timerElement = document.getElementById('timer');
  
    // Function to update the timer display
    function updateTimer() {
      var currentTime = new Date();
  
      var hours = currentTime.getHours();
      var minutes = currentTime.getMinutes();
      var seconds = currentTime.getSeconds();
  
      // Add leading zeros if necessary
      hours = (hours < 10) ? "0" + hours : hours;
      minutes = (minutes < 10) ? "0" + minutes : minutes;
      seconds = (seconds < 10) ? "0" + seconds : seconds;
  
      // Update the timer display
      timerElement.textContent = hours + ":" + minutes + ":" + seconds;
    }
  
    // Update the timer every second (1000 milliseconds)
    setInterval(updateTimer, 1000);
  };
  