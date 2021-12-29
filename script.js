const word = document.getElementById('word');
const wrongLetters = document.getElementById('wrong-letters');
const playAgain = document.getElementById('play-button');
const popupContainer = document.getElementById('popup-container');
const notificationContainer = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');
const finalMessageRevealWord = document.getElementById('final-message-reveal-word');
const figurePart = document.querySelectorAll('.figure-part');
const wordArray = ('application','programming','interface','wizard');
let selectedWord = wordArray[Math.floor(Math.random() * wordArray.length)];
let playable = true;
const correctLettersArray = [];
const wrongLettersArray = [];
function displayWord(){
     word.innerHTML = `
          ${selectedWord.split("").map(letter => `
               <span class="letter">${correctLettersArray.includes(letter) ? letter : ''}</span>
          `).join("")}
     `;
     const innerWord = word.innerText.replace(/[\n]/g,"");
     if(innerWord === selectedWord){
          finalMessage.innerText = 'Congratulations! You Won! 😃';
          finalMessageRevealWord.innerText = "";
          popupContainer.style.display = 'flex';
          playable = false;
     }
}
displayWord();
function updateWrongLetters(){
     wrongLetters.innerHTML = `
          ${wrongLettersArray.length > 0 ? '<p>wrong</p>' : ""}
          ${wrongLettersArray.map(letter => `<span>${letter}</span>`)}
     `;
     figurePart.forEach((part,index) => {
          const errors = wrongLetters.length;
          if(index > errors){
               part.style.display = 'block';
          }else{
               part.style.display = 'none';
          }
     });
     if(wrongLettersArray.length === figurePart.length){
          finalMessage.innerText = 'Unfortunately You Lost. 😔';
          finalMessageRevealWord.innerText = `...The Word was: ${selectedWord}`;
          popupContainer.style.display = 'flex';
          playable = false;
     }
}
function showNotification(){
     notificationContainer.classList.add('show');
     setTimeout(() => {
          notificationContainer.classList.remove('show');
     },3000);
}
window.addEventListener('keydown',event => {
     if(playable){
          if(event.keyCode >= 65 && event.keyCode <= 90){
               const letter = event.key.toLowerCase();
               if(selectedWord.includes(letter)){
                    if(!correctLettersArray.includes(letter)){
                         correctLettersArray.push(letter);
                         displayWord();
                    }else{
                         showNotification();
                    }
               }else{
                    if(!wrongLettersArray.includes(letter)){
                         wrongLettersArray.push(letter);
                         updateWrongLetters();
                    }else{
                         showNotification();
                    }
               }
          }
     }
});
playAgain.addEventListener('click',() => {
     playable = true;
     correctLettersArray.splice(0);
     wrongLettersArray.splice(0);
     selectedWord = wordArray[Math.floor(Math.random() * wordArray.length)];
     displayWord();
     updateWrongLetters();
     popupContainer.style.display = 'none';
});