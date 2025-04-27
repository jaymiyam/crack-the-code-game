const display = document.getElementById('display');
const guess = document.getElementById('guess');
const form = document.querySelector('form');
const guessHistory = document.getElementById('guess-history');
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

  if (guessString == '' || isNaN(guessString)) {
    alert('Please input a 4-digit number sequence!');
    guess.value = '';
    return;
  }
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
  let currentGuessResult = document.createElement('tr');
  currentGuessResult.innerHTML = `
    <td>${guessString}</td>
    <td>${ACount}A${BCount}B</td>
    `;
  guessHistory.appendChild(currentGuessResult);

  guess.value = '';
}

function checkIncludes(codeArr, guessArr) {
  //reset count for every guess
  BCount = 0;

  for (let i = 0; i < codeArr.length; i++) {
    if (codeArr.includes(guessArr[i])) {
      BCount++;
    } else {
      console.log('not a match');
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
    } else {
      return;
    }
  }
}

form.addEventListener('submit', checkAnswer);

//confetti animation

function makeConfetti() {
  confetti();
}
