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
  var input = $("#number").val();
  var tern = isValidInput(input);
  if (tern === 0) {
    $("#number").val(""); 
    $("#textfield").html("A NUMBER PLEASE")
    return "";
  } else if (tern === 1) {
    $("#number").val(""); 
    $("#textfield").html("A NUMBER BETWEEN 1-100 PLEASE")
    return "";
  } else if (checkGuess(num)){
    $("#textfield").html("YOU GOT IT!!!")
    return "";
  } else {
    $("#number").val("");  
    return input
  }
}

// Determine if the next guess should be a lower or higher number

function lowerOrHigher(num, guess){
  return (num > guess) ? 0 : 1;
}

// Check if the Player's Guess is the winning number 

function checkGuess(num){
  // need to make sure new guess is not a duplicate
  // store guess in an array with all previous guess
  var input = $("#number").val();
  return (num == input) ? true : false;
}

// Create a provide hint button that provides additional clues to the "Player"

function provideHint(num, guess){
  if (guess == ("" || -1)) {
    $("#textfield").html("A NUMBER BETWEEN 1-100 PLEASE")  
  } else {
    var str = ""
    if (!lowerOrHigher(num, guess)) {
      str += "HIGHERRRR"
    } else {
      str += "LOWERRRR"
    }
    $("#textfield").html(str)   
  }
}

// Allow the "Player" to Play Again

function playAgain(){
  theNumber = generateWinningNumber();
  numGuess = 5;
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