let shuffle = function (array) {
  let currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
};

const cards = document.getElementById('cards');
const card = document.getElementsByClassName('card');
const icons = document.getElementsByClassName('icons');
const matched = document.getElementsByClassName('matched');
const nextCard = document.getElementById('next-card');
const mainIcon = document.getElementById('main-icon');
const score = document.getElementById('score');
const restart = document.querySelector('.restart');
let moves = 0;
let symbols = ['atom', 'frog', 'feather-alt', 'cogs', 'anchor', 'fan', 'bolt', 'hat-wizard', 'apple-alt', 'bell', 'bomb', 'brain'];
let remainingSymbols = ['atom', 'frog', 'feather-alt', 'cogs', 'anchor', 'fan', 'bolt', 'hat-wizard', 'apple-alt', 'bell', 'bomb', 'brain'];
let cardArray = [];

shuffleAllCards();

//everytime when card is clicked, function flipCard is called
Array.from(card).forEach(function (card) {
  card.addEventListener('click', flipCard);
});

//starts a new game when restart is clicked
restart.addEventListener('click', restartNewGame);


function flipCard(event) {

  //If the card is already matched then click won't work on that card
  if (this.className === "card") {
    moves++;
    score.textContent = moves;
    let mainIconClass = mainIcon.classList[1];
    event.target.classList.add('show');
    let iconMatches = event.target.firstElementChild.classList.contains(mainIconClass);

    /*If the card matches with the next card icon,
     then cardMatched function will be called
     otherwise card will be hide again*/
    if (iconMatches) {
      cardMatched(event, mainIconClass);
    } else {
      setTimeout(function () { event.target.classList.remove('show'); }, 700);
    }
  }

  checkWinningCondition();
};

function cardMatched(event, mainIconClass) {
  event.target.classList.add('matched');

  //removes the matched card from array
  let matchedIndex = remainingSymbols.indexOf(mainIconClass.substring(mainIconClass.indexOf("-") + 1));
  remainingSymbols.splice(matchedIndex, 1);

  //gets the random card from the unmatched cards
  let randomIndex = getRandomInt(0, remainingSymbols.length - 2);
  mainIcon.className = 'fa fa-' + remainingSymbols[randomIndex];
}

function checkWinningCondition() {

  //when all cards are matched, alert will appear
  if (matched.length === 12) {
    setTimeout(function () { alert(`You have won!\nIt took you ${moves} moves.`); }, 200);
  }
};

//when restart button is clicked, it resets the gameboard
function restartNewGame() {
  moves = 0;
  score.textContent = moves;
  shuffleAllCards();

  //as all the cards are unmatched
  remainingSymbols = ['atom', 'frog', 'feather-alt', 'cogs', 'anchor', 'fan', 'bolt', 'hat-wizard', 'apple-alt', 'bell', 'bomb', 'brain'];
  randomIndex = getRandomInt(0, remainingSymbols.length - 2);
  mainIcon.className = 'fa fa-' + remainingSymbols[randomIndex];

  for (let j = 0; j < card.length; j++) {
    card[j].classList.remove('matched', 'show');
  }
};

//shuffles all the cards
function shuffleAllCards(){
  cardArray = shuffle(symbols);
  for (let i = 0; i < icons.length; i++) {
    icons[i].className = 'fa fa-' + cardArray[i] + ' icons';
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max + 1 - min)) + min;
};

