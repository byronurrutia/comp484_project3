const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

var min = 0;
var sec = 0;
var csec = 0;
var timeElapsed = 0;
var charCount = 0;
var wpm;
var timerOn = false;
var formattedTimer;
var functionTimer;
var userInputArray;
const originArray = originText.split("");

// Add leading zero to numbers 9 or below (purely for aesthetics):
function format() {
  return (formattedTimer =
    (min < 10 ? "0" + min : min) +
    ":" +
    (sec < 10 ? "0" + min : sec) +
    ":" +
    (csec < 10 ? "0" + csec : csec));
}

// Run a standard minute/second/hundredths timer:
function timerStart() {
  functionTimer = setInterval(() => {
    csec++;
    timeElapsed++;
    if (csec / 100 == 1) {
      csec = 0;
      sec++;
    }
    if (sec / 60 == 1) {
      sec = 0;
      min++;
    }
    theTimer.innerHTML = format();
    userInputArray = testArea.value.split("");
    // console.log(testArea.value.split(""));
  }, 10);
}

// Match the text entered with the provided text on the page:
function matchText() {
  if (
    userInputArray[userInputArray.length] ==
      originArray[userInputArray.length] &&
    userInputArray.length !== 0
  )
    return true;
  else return false;
}

// Start the timer:
function started() {
  timerStart();
  timerOn = true;
}

// Reset everything:

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("input", (event) => {
  if (matchText && event.inputType !== "deleteContentBackward") charCount++;
  if (event.inputType === "deleteContentBackward") charCount--;
  if (timerOn !== true) started();
  if (charCount === originArray.length) {
    timerOn = false;
    testArea.disabled = true;
    clearInterval(functionTimer);
    wpm = parseInt(charCount / 5 / (timeElapsed / 6000));
  }
});
