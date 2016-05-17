/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.

var playersGuess,
    winningNumber



/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
  var max = 100;
  var min = 1;
  return Math.floor(Math.random()*(max-min+1)+min);
}

// Check if the input is valid
// 0: not a number, 1: not within valid range, 2: valid number

function isValidInput(input) {
  if (isNaN(input)) {
    return 0;
  } else {
    return  (input > 100 || input < 1) ? 1 : 2;
  }
}

// Fetch the Players Guess

function playersGuessSubmission(num){ 
  $("#submit-number").click(function() {
    var input = $("#number").val();
    var tern = isValidInput(input);
    if (!tern) {
      $("#textfield").html("A NUMBER PLEASE")
      return "";
    } else if (tern === 1) {
      $("#textfield").html("A NUMBER BETWEEN 1-100 PLEASE")
      return "";
    } else if (checkGuess(num)){
      return true;
    } else {
      return input
    }
  })
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(num){
  var input = $("#number").val();
  return (num > input) ? 0 : 1;
}

// Check if the Player's Guess is the winning number 

function checkGuess(num){
  var input = $("#number").val();
  return (num == input) ? true : false;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(num){
  var input = $("#number").val();
  if (isValidInput(input) == 2) {
    var str = ""
    if (lowerOrHigher(num)) {
      str += "HIGHERRRR"
    } else {
      str += "LOWERRRR"
    }
    $("#textfield").html(str) 
  } else {
    $("#textfield").html("A NUMBER BETWEEN 1-100 PLEASE") 
  }
}

// Allow the "Player" to Play Again

function playAgain(){
  // add code here
}


/* **** Event Listeners/Handlers ****  */