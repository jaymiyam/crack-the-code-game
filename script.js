const display = document.getElementById('display');
const guess = document.getElementById('guess');
const form = document.querySelector('form');
const guessHistory = document.getElementById('guess-history');
const guessHistoryHeader = document.getElementById('guess-history-header');
let codeArr = [];
let codeString = '';
let ACount = 0;
let BCount = 0;

generateCode();

function generateCode() {
  const codeNums = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];

  for (let i = 0; i < codeNums.length; i++) {
    let j = Math.floor(Math.random() * codeNums.length);
    //by switching position of codeNums array to prevent picking the same number again
    [codeNums[i], codeNums[j]] = [codeNums[j], codeNums[i]];
  }

  codeArr = codeNums.slice(0, 4);
  codeString = codeArr.join('');
}

function checkAnswer(e) {
  e.preventDefault();
  const guessString = guess.value;

  // check if guess input is empty or not a number
  if (guessString == '' || isNaN(guessString)) {
    alert('Please input a 4-digit code sequence between 1 to 9!');
    guess.value = '';
    return;
  }

  // check if guess input has duplicating digits
  if (checkForDuplicates(guessString)) {
    alert('The code sequence must not have duplicating digits!');
    guess.value = '';
    return;
  }

  // create an array if both validation passes
  const guessArr = guessString.split('');

  if (codeString === guessString) {
    display.innerText = `${codeString}`;
    document.querySelector('h1').innerText = `You Cracked The Code!`;
    makeConfetti();
    return;
  }

  checkIncludes(codeArr, guessArr);

  checkPosition(codeArr, guessArr);

  display.innerText = `${ACount}A${BCount}B`;

  if (guessHistoryHeader.className === '') {
    guessHistoryHeader.classList.add('show');
  }

  let currentGuessResult = document.createElement('tr');
  currentGuessResult.innerHTML = `
    <td>${guessString}</td>
    <td>${ACount}A${BCount}B</td>
    `;
  guessHistory.appendChild(currentGuessResult);

  guess.value = '';
}

// TODO: checking logic flaw

function checkIncludes(codeArr, guessArr) {
  //reset count for every guess
  BCount = 0;

  for (let i = 0; i < codeArr.length; i++) {
    if (codeArr.includes(guessArr[i])) {
      BCount++;
    }
  }
}

function checkPosition(codeArr, guessArr) {
  //reset count for every guess
  ACount = 0;

  for (let i = 0; i < codeArr.length; i++) {
    if (codeArr[i] === guessArr[i]) {
      ACount++;
      BCount--;
    }
  }
}

function checkForDuplicates(string) {
  let set = new Set();
  let duplicate = false;

  for (let i = 0; i < string.length; i++) {
    if (set.has(string[i])) {
      duplicate = true;
      break;
    }
    set.add(string[i]);
  }

  return duplicate;
}

//confetti animation
function makeConfetti() {
  confetti();
}

form.addEventListener('submit', checkAnswer);
