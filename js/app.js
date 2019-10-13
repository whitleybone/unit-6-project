/////////////
//CONSTANTS
/////////////

const overlay = document.querySelector('#overlay');
const title = document.querySelector('.title');
const startButton = document.querySelector('.btn__reset');
const phraseDiv = document.querySelector('#phrase');
const phraseUl = phraseDiv.querySelector('ul');
const letter = document.getElementsByClassName('letter');
const show = document.getElementsByClassName('show');
const qwertyDiv = document.querySelector('#qwerty');   
const letterButtons = qwertyDiv.querySelectorAll('button');
const scoreboard = document.querySelector('#scoreboard');
const scoreboardLi = scoreboard.querySelectorAll('.tries');

const phrases = [
    'A Chip Off The Old Block',
    'Curiosity Killed The Cat',
    'Great Minds Think Alike',
    'Home Sweet Home',
    'Keeping It Real',
    'The Breakfast Club',
    'Jurassic Park',
    'Stranger Things',
    'Rick and Morty',
    'Alien covenant',
];

/////////////
//VARIABLES
/////////////

let missed = 0;   // number of missed guesses 

/////////////
//FUNCTIONS
/////////////

/**
 * Function to get random phrase and split characters
 * @param {*} array 
 */
function getRandomPhraseAsArray(array) {
    const randomPhrase = array[Math.floor(Math.random() * array.length)];
    return randomPhrase.toUpperCase().split('');
}

/**
 * Function to add list item and display random phrase
 * @param {*} array 
 */
function addPhraseToDisplay(array) {   
    for (let i = 0; i < array.length; i++) {
        const listItem = document.createElement('li');
        phraseUl.appendChild(listItem);
        listItem.textContent = array[i];
    
        if (array[i] !== ' ') {
            listItem.className = 'letter';
        } else {
            listItem.className = 'space';
        }
    }
}

/**
 * Function to compare letter clicked vs random phrase
 * @param {*} buttonClicked 
 */
function checkLetter(buttonClicked) {
    const letterClicked = buttonClicked.textContent.toUpperCase();
    let letterFound = false;

    for (let i = 0; i < letter.length; i++){
        if (letterClicked === letter[i].textContent) {
            letter[i].classList.add('show');
            letterFound = true;
        } 
    }
    
    return letterFound ? letterClicked : null;
}

/**
 * function to check if the player has won or not
 */
function checkWin() {
    if (letter.length === show.length) {
        overlay.classList.add('win');
        overlay.style.display = '';
        title.textContent = "You win!"
        startButton.textContent = "Reset"
    }

    if (missed >= 5) {
        overlay.classList.add('lose');
        overlay.style.display = '';
        title.textContent = "You lose!"
        startButton.textContent = "Reset"
    }
}

//////////////////
//EXECUTION
/////////////////
const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray);


//////////////////
//EVENT HANDLERS
/////////////////

//Listener for when start button is clicked
startButton.addEventListener('click', () => {  
    overlay.style.display = "none";
});


//listener for when user presses a key on keyboard
window.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
        e.target.className = 'chosen';
        e.target.disabled = true;

        const letterFound = checkLetter(e.target);

        if (letterFound === null) {
            missed += 1;
        }

        if (missed >= 1 && missed <= 5){
            const heart = scoreboardLi[scoreboardLi.length-missed];
            heart.getElementsByTagName('img')[0].src = 'images/lostHeart.png';
        }
    }
    checkWin();
});

startButton.addEventListener('click', (e) => {
    if (e.target.textContent === 'Reset') {
        // set missed to 0
        missed = 0;

        // reset heart states
        for (let i = 0; i < scoreboardLi.length; i++) {
            const img = scoreboardLi[i].getElementsByTagName('img')[0];
            img.src = 'images/liveHeart.png';
        }

        // remove li's
        while (phraseUl.children.length > 0) {
            phraseUl.removeChild(phraseUl.children[0]);
        }

        // remove chosen class from all buttons
        for (let i = 0; i < letterButtons.length; i++) {
            letterButtons[i].classList.remove('chosen');
            letterButtons[i].disabled = false;
        }

        // reset overlay class
        overlay.classList.remove('win', 'lose');

        // generate new random phrase
        const newPhrase = getRandomPhraseAsArray(phrases);

        // add new li's
        addPhraseToDisplay(newPhrase);
    }
});


