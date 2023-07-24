const wordDisplay = document.querySelector('.word-display');
const guessesText = document.querySelector('.guesses-text b');
const keyboard = document.querySelector('.keyboard');
const hangmanBoxImage = document.querySelector('.hangman-box img');
const gameModal = document.querySelector('.game-modal');
const button = gameModal.querySelector('button');
const maximumGuesses = 6;
let currentWord;
let correctLetters;
let wrongGuessCount;
const resetGame = () => {
     correctLetters = [];
     wrongGuessCount = 0;
     hangmanBoxImage.src = './images/hangman-0.svg';
     guessesText.innerText = `${wrongGuessCount} / ${maximumGuesses}`;
     wordDisplay.innerHTML = currentWord.split("").map(() => `<li class="letter"></li>`).join("");
     keyboard.querySelectorAll('button').forEach(button => button.disabled = false);
     gameModal.classList.remove('show');
};
const getRandomWord = () => {
     const {word,hint} = wordList[Math.floor(Math.random() * wordList.length)];
     currentWord = word;
     document.querySelector('.hint-text b').innerText = hint;
     resetGame();
};
getRandomWord();
button.addEventListener('click',getRandomWord);
const gameOver = (isVictory) => {
     const modalText = isVictory ? 'You Found the Worl:' : 'The Correct Word was:';
     gameModal.querySelector('img').src = `./images/${isVictory ? 'Victory' : 'Lost'}.gif`;
     gameModal.querySelector('h4').innerText = isVictory ? 'Congrats!' : 'Game Over!';
     gameModal.querySelector('p').innerHTML = `${modalText} <b>${currentWord}</b>`;
     gameModal.classList.add('show');
};
const initGame = (button,clickedLetter) => {
     if(currentWord.includes(clickedLetter)){
          [...currentWord].forEach((letter,index) => {
               if(letter === clickedLetter){
                    correctLetters.push(letter);
                    wordDisplay.querySelectorAll('li')[index].innerText = letter;
                    wordDisplay.querySelectorAll('li')[index].classList.add('guessed');
               }
          });
     }else{
          wrongGuessCount++;
          hangmanBoxImage.src = `./images/hangman-${wrongGuessCount}.svg`;
     }
     button.disabled = true;
     guessesText.innerText = `${wrongGuessCount} / ${maximumGuesses}`;
     if(wrongGuessCount === maximumGuesses) return gameOver(false);
     if(correctLetters.length === currentWord.length) return gameOver(true);
};
for(let i = 97;i <= 122;i++){
     const button = document.createElement('button');
     button.innerText = String.fromCharCode(i);
     keyboard.appendChild(button);
     button.addEventListener('click',(event) => {
          initGame(event.target,String.fromCharCode(i));
     });
}