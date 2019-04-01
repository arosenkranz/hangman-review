//wrap entire javascript codebase in this .ready()
$(document).ready(function() {

  // create variables for game
  var wordBank = ["Game Of Thrones", "Breaking Bad", "Dexter", "Sopranos", "The Office", "Big Bang Theory", "Friends", "Parks And Recreation"];

  var wins = 0;
  var losses = 0;
  var pickedWord;
  var pickedWordPlaceholders = [];
  var guessesLeft = 10;
  var lettersAlreadyGuessed = [];
  var gameRunning = false;

  // create variables to hold html element references
  var $wins = $("#wins");
  var $losses = $("#losses");
  var $placeholders = $("#placeholders");
  var $guessesLeft = $("#guesses-left");
  var $lettersAlreadyGuessed = $("#letters-guessed");
  var $newGameBtn = $("#new-game");


  // create a function to start a new game
  function newGame() {
    // reset all game variables
    guessesLeft = 10;
    lettersAlreadyGuessed.length = 0;
    pickedWordPlaceholders.length = 0;
    gameRunning = true;

    // pick a new word at random from our wordBank
    pickedWord = wordBank[Math.floor(Math.random() * wordBank.length)];

    // generate placeholders from pickedWord
    for (var i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i] === " ") {
        pickedWordPlaceholders.push(" ");
      }
      else { 
        pickedWordPlaceholders.push("_");
      }
    }
    console.log(pickedWord, pickedWordPlaceholders);

    // write new values to the page to let user know a new game has started
    $lettersAlreadyGuessed.text(lettersAlreadyGuessed);
    $guessesLeft.text(guessesLeft);
    $placeholders.text(pickedWordPlaceholders.join(""));
  }

  // create a function that takes in the letter guessed (as an argument) to run our game logic
  function letterGuessed(letter) {
    console.log(letter);

    // check to see if letter has been guessed before
    if (lettersAlreadyGuessed.includes(letter)) {
      alert("You already guessed this letter");
      return false;
    }

    // add letter to lettersAlreadyGuessed bank
    lettersAlreadyGuessed.push(letter);
    $lettersAlreadyGuessed.text(lettersAlreadyGuessed.join(", "));


    // check to see if letter we pressed is in the pickedWord variable, if yes, replace placeholder value at that index with the correct letter
    for (var i = 0; i < pickedWord.length; i++) {
      if (pickedWord[i].toLowerCase() === letter.toLowerCase()) {
        pickedWordPlaceholders[i] = pickedWord[i];
      }
    }

    // write new placeholders to the page
    $placeholders.text(pickedWordPlaceholders.join(""));

    // check if letter guessed made it into our placeholders array, if not...decrement a guess
    if (!pickedWordPlaceholders.join("").toLowerCase().includes(letter)) {
      guessesLeft--;
      $guessesLeft.text(guessesLeft);
    }

    // check for a loss
    if (guessesLeft === 0) {
      losses++;
      $losses.text(losses);
      gameRunning = false;
    }

    // check for a win
    if (pickedWordPlaceholders.join("").toLowerCase() === pickedWord.toLowerCase()) {
      wins++;
      $wins.text(wins);
      gameRunning = false;
    }

  }


  // create onkeyup event listener for guessing a letter
  document.onkeyup = function(event) {

    // if letter pressed is between a & z, continue with logic
    if (event.which >= 65 && event.which <= 90 && gameRunning) {
      letterGuessed(event.key);
    }
    else {
      alert("You didn't press a letter");
    }

  }

  // add event listener to new game button to run newGame()
  $newGameBtn.on("click", newGame);


// DON'T DELETE
});