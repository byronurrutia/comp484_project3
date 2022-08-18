const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");
const congrats = document.querySelector(".win-banner");
const wpmtext = document.querySelector(".prompt");

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
    (sec < 10 ? "0" + sec : sec) +
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
  }, 10);
}

// Match the text entered with the provided text on the page:
function matchText() {
  userInputArray = testArea.value.split("");
  for (let i = 0; i < userInputArray.length; i++) {
    if (userInputArray[i] !== originArray[i]) {
      testWrapper.style.borderColor = "red";
      return false;
    }
  }
  testWrapper.style.borderColor = "green";
  return true;
}

// Start the timer:
function started() {
  timerStart();
  timerOn = true;
}

// Reset everything:
function reset() {
  clearInterval(functionTimer);
  min = 0;
  sec = 0;
  csec = 0;
  timeElapsed = 0;
  charCount = 0;
  wpm = 0;
  timerOn = false;
  testArea.disabled = false;
  testArea.value = "";
  testWrapper.style.borderColor = "grey";
  theTimer.innerHTML = format();
  congrats.style.display = "none";
}

// Event listeners for keyboard input and the reset button:
testArea.addEventListener("input", (event) => {
  //   console.log(originArray);
  if (matchText() && event.inputType !== "deleteContentBackward") charCount++;
  if (timerOn !== true) started();
  if (userInputArray.length === originArray.length && matchText()) {
    timerOn = false;
    testArea.disabled = true;
    clearInterval(functionTimer);
    wpm = parseInt(charCount / 5 / (timeElapsed / 6000));
    wpmtext.innerHTML = "Words Per Min: " + wpm;
    congrats.style.display = "block";
  }
});

resetButton.onclick = function () {
  reset();
};
