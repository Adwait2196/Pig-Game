'use strict';

const gameValues = {
    scores: [0, 0],
    currentScore: 0,
    activePlayer: 0,
    pOneFinalScoreElement: document.querySelector('#score--0'),
    pTwoFinalScoreElement: document.querySelector('#score--1'),
    pOneCurrentScoreElement: document.querySelector('#current--0'),
    pTwoCurrentScoreElement: document.querySelector('#current--1'),
    newGameButtonElement: document.querySelector('.btn--new'),
    rollDiceButtonElement: document.querySelector('.btn--roll'),
    holdScoreButtonElement: document.querySelector('.btn--hold'),
    imageElement: document.querySelector('.dice'),
    pOneElement: document.querySelector('.player--0'),
    pTwoElement: document.querySelector('.player--1'),
};

const initializeResetGame = function () {
    gameValues.scores = [0, 0];
    gameValues.currentScore = 0;
    document
        .querySelector(`.player--${gameValues.activePlayer}`)
        .classList.remove('player--winner');
    gameValues.activePlayer = 0;
    gameValues.pOneElement.classList.add('player--active');
    gameValues.pTwoElement.classList.remove('player--active');
    gameValues.pOneFinalScoreElement.textContent = 0;
    gameValues.pTwoFinalScoreElement.textContent = 0;
    gameValues.pOneCurrentScoreElement.textContent = 0;
    gameValues.pTwoCurrentScoreElement.textContent = 0;
    gameValues.imageElement.classList.add('hidden');
    gameValues.rollDiceButtonElement.disabled = false;
    gameValues.holdScoreButtonElement.disabled = false;
};

const changeTheActivePlayer = function () {
    document.querySelector(
        `#current--${gameValues.activePlayer}`
    ).textContent = 0;
    gameValues.currentScore = 0;
    gameValues.activePlayer = gameValues.activePlayer === 0 ? 1 : 0;
    gameValues.pOneElement.classList.toggle('player--active');
    gameValues.pTwoElement.classList.toggle('player--active');
};

const holdTheScore = function () {
    gameValues.scores[gameValues.activePlayer] += gameValues.currentScore;
    document.querySelector(`#score--${gameValues.activePlayer}`).textContent =
        gameValues.scores[gameValues.activePlayer];
    if (gameValues.scores[gameValues.activePlayer] >= 100) {
        document
            .querySelector(`.player--${gameValues.activePlayer}`)
            .classList.add('player--winner');
        gameValues.imageElement.classList.add('hidden');
        gameValues.rollDiceButtonElement.disabled = true;
        gameValues.holdScoreButtonElement.disabled = true;
    } else {
        changeTheActivePlayer();
    }
};

const rollTheDice = function () {
    const diceValue = Math.trunc(Math.random() * 6) + 1;
    gameValues.imageElement.classList.remove('hidden');
    gameValues.imageElement.src = `./Images/dice-${diceValue}.png`;
    if (diceValue !== 1) {
        gameValues.currentScore += diceValue;
        document.querySelector(
            `#current--${gameValues.activePlayer}`
        ).textContent = gameValues.currentScore;
        gameValues.holdScoreButtonElement.addEventListener(
            'click',
            holdTheScore
        );
    } else {
        changeTheActivePlayer();
    }
};

initializeResetGame();
gameValues.rollDiceButtonElement.addEventListener('click', rollTheDice);
gameValues.newGameButtonElement.addEventListener('click', initializeResetGame);
