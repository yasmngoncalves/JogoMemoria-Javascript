const cards = [
    'images/cherry.png', 'images/cherry.png', 'images/watermelon.png', 'images/watermelon.png', 'images/grape.png', 'images/grape.png', 'images/lemon.png', 'images/lemon.png', 'images/orange.png', 'images/orange.png', 'images/peach.png', 'images/peach.png', 'images/pineapple.png', 'images/pineapple.png', 'images/strawberry.png', 'images/strawberry.png'
];

let firstCard = null;
let secondCard = null;
let lockBoard = false;

// selecionar os botões e o tabuleiro
const startButton = document.getElementById('start-game');
const resetButton = document.getElementById('reset-game');
const gameBoard = document.getElementById('game-board');

//embaralhar os cards
function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

//criando os cards no html
function createBoard() {
    gameBoard.innerHTML = '';
    const shuffledCards = shuffle([...cards]);
    shuffledCards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.dataset.value = card;

        const frontFace = document.createElement('img');
        frontFace.src = card;
        frontFace.classList.add('front-face');
        frontFace.style.display = 'none';

        cardElement.appendChild(frontFace);
        cardElement.addEventListener('click', flipCard);
        gameBoard.appendChild(cardElement);
    });
}

// iniciar o jogo
function startGame() {
    createBoard();
    gameBoard.classList.remove('hidden');
    startButton.style.display = 'none';
    resetButton.style.display = 'inline-block';
}

// reiniciar o jogo
function resetGame() {
    resetBoard(); 
    createBoard();
}

//virar os cards
function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');
    this.querySelector('.front-face').style.display = 'block';

    if (!firstCard) {
        firstCard = this;
    } else {
        secondCard = this;
        checkMatch();
    }
}

//verificar cards correspondentes
function checkMatch() {
    let isMatch = firstCard.dataset.value === secondCard.dataset.value;
    isMatch ? disableCards() : unflipCards();
}

//desabilitar os cards quando formar um par
function disableCards() {
    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

     // verifica se todas as cartas foram combinadas
     if (document.querySelectorAll('.matched').length === cards.length) {
        setTimeout(() => {
            alert('Você encontrou todos os pares. Parabéns!');
            resetGame(); 
        }, 500); 
    }

    resetBoard();
}

//desvirar os cards quando não for par
function unflipCards() {
    lockBoard = true;
    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        firstCard.querySelector('.front-face').style.display = 'none';
        secondCard.querySelector('.front-face').style.display = 'none';

        resetBoard();
    }, 1000);
}

//resetar os cards
function resetBoard() {
    [firstCard, secondCard, lockBoard] = [null, null, false];
}

// adicionar eventos aos botões
startButton.addEventListener('click', startGame);
resetButton.addEventListener('click', resetGame);