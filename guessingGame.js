/* **** Guessing Game Functions **** */

// State of the game

function Game() {
  this.theNumber = generateWinningNumber();
  this.numGuess = 5;
  this.curGuess = -1;
  this.guesses = [];
}

// Generate the Winning Number

function generateWinningNumber(){
  var max = 100;
  var min = 1;
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Fetch the Players Guess

Game.prototype.playersGuessSubmission = function(){ 
  var input = $("#number").val();
  if (this.numGuess >= 1) {
    // not gameover yet
    if (isNaN(input) || input === "") {
      // input is not a number
      $("#number").val(""); 
      $("#textfield").html("A NUMBER PLEASE");
    } else {
      if (input > 100 || input < 1) {
        // input number out of range
        $("#number").val(""); 
        $("#textfield").html("A NUMBER BETWEEN 1-100 PLEASE")
      } else {
        if (this.isDuplicate(input)) {
          // current guess is a duplicate
          $("#number").val(""); 
          $("#textfield").html("TRY SOMETHING NEW!")
        } else {
          // not a duplicate   
          this.numGuess--;       
          if (this.checkGuess(input)) {
            // correct guess
            $("#textfield").html("YOU GOT IT!!!")
          } else {
            // wrong guess
            if (this.numGuess === 0) {
              // use up the last guess
              $("#textfield").html("THE ANSWER IS " + this.theNumber + " MUAHAHAHA")
            } else {
              // still have guesses
              $("#number").val(""); 
              this.guesses.push(input);
              this.curGuess = input;
              // give lower or higher instruction
              this.lowerOrHigher(input);
            }
          }
        }
      }
    }
  } else {
    // gameover
    $("#textfield").html("OOPS, GAME OVER.");
  }
  animateText();
}

// Determine if the next guess should be a lower or higher number

Game.prototype.lowerOrHigher = function(guess) {
  var str = (this.theNumber > guess) ? "HIGHERRRR" : "LOWERRRR";
  var d = Math.abs(this.theNumber - guess);
  if (d <= 10) {
    str += ", within 10 digits ;)";
  } else if (d > 10 && d <= 20) {
    str += ", less than 20 digits away ;)";
  } else {
    str += ", more than 20 digits away!"
  }
  $("#textfield").html(str)  
}

// Check if the Player's Guess is a duplicate

Game.prototype.isDuplicate = function(guess) {
  return this.guesses.includes(guess);
}

// Check if the Player's Guess is the winning number 

Game.prototype.checkGuess = function(guess) {
  return (this.theNumber == guess) ? true : false;
}

// Create a provide hint button that provides additional clues to the "Player"

Game.prototype.provideHint = function(){
  if (this.numGuess <= 0) {
    $("#textfield").html("GAME OVER! PERHAPS A SECOND CHANCE?");
  } else if (this.numGuess === 5) {
    $("#textfield").html("AT LEAST TRY A BIT");
  } else {
    var arr = [];
    arr.push(this.theNumber)
    if (this.numGuess === 4) {
      for (var i = 0; i < 7; i++) {
        arr.push(generateWinningNumber());
      }
    } else if (this.numGuess === 3) {
      for (var i = 0; i < 5; i++) {
        arr.push(generateWinningNumber());
      }
    } else if (this.numGuess === 2) {
      for (var i = 0; i < 3; i++) {
        arr.push(generateWinningNumber());
      }
    } else if (this.numGuess === 1) {
      arr.push(generateWinningNumber());
    } 
    arr.sort();
    $("#textfield").html("PICK YOUR GUESS: " + arr);
  }
  animateText()
}

// Allow the "Player" to Play Again

Game.prototype.playAgain = function(){
  this.theNumber = generateWinningNumber();
  this.numGuess = 5;
  this.curGuess = -1;
  this.guesses = [];
  $("#textfield").html("GUESS A NUMBER BETWEEN 1-100") 
  $("#number").val("");
}

function animateText() {
  $("#textfield").addClass("animate");
  $("#textfield").one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
    function(e) {
    $("#textfield").removeClass("animate");
  });
}

/* **** Event Listeners/Handlers ****  */