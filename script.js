const userScoreEl = document.querySelector("#user-score");
const botScoreEl = document.querySelector("#bot-score");
const userCardContainer = document.querySelector("#user-cards");
const botCardContainer = document.querySelector("#bot-cards");

let userScore = 0;
let botScore = 0;
let userWins = 0;
let userLosses = 0;
let draws = 0;
let botPlaying = false;
const cardChoices = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A", "J", "K", "Q"];

const winSound = new Audio("./assets/sounds/cash.mp3");
const lossSound = new Audio("./assets/sounds/aww.mp3");
const dealSound = new Audio("./assets/sounds/swish.m4a");


const randomNumSelection = (max) => {
    return Math.floor(Math.random() * (max + 1));
} 

const displayCard = (cardNum, user) => {
    dealSound.play();
    let imgEl = `<img src="./assets/images/${cardNum}.png" />` 
    if (user == "User") {
        userCardContainer.insertAdjacentHTML('afterbegin', imgEl);
    } else if (user == "Bot") {
        botCardContainer.insertAdjacentHTML('afterbegin', imgEl);
    }
}


const addBotScore = (card) => {
    let cardScore = 0;
    if (card == "J" || card == "K" || card == "Q") {
        cardScore = 10;
    } else if (card === "A") {
        if (botScore + 11 > 21) {
            cardScore = 1;
        } else {
            cardScore = 11;
        }
    } else {
        cardScore = card;
    }
    botScore += cardScore;
    botScoreEl.innerText = botScore;
    if (botScore > 21) {
        handleBotBust();
    } else if (botScore < userScore) {
        setTimeout(handleBotHit, 1000);
    } else if (botScore > userScore) {
        handleBotWin();
    } else if (botScore == userScore && botScore <= 17) {
        setTimeout(handleBotHit, 1000);
    } else if (botScore == userScore && botScore > 17) {
        handleDraw();
    }
    else {
        botPlaying = false;
    }

}

const addUserScore = (card) => {
    let cardScore = 0;
    if (card == "J" || card == "K" || card == "Q") {
        cardScore = 10;
    } else if (card === "A") {
        if (userScore + 11 > 21) {
            cardScore = 1;
        } else {
            cardScore = 11;
        }
    } else {
        cardScore = card;
    }
    userScore += cardScore;
    userScoreEl.innerText = userScore;
    if (userScore > 21) {
        handleUserBust();
    } 
}

const handleHit = () => {
    if (userScore > 21) {
        document.querySelector(".blackjack__message").innerText = "You already busted! Click stand to continue.";
    } else if (botPlaying == true) {
        document.querySelector(".blackjack__message").innerText = "You already stood. Press deal to reset game.";
    }else {
        let card = randomNumSelection(12);
        addUserScore(cardChoices[card]);
        displayCard(cardChoices[card], "User");
    }
}

const handleBotHit = () => {
    if (userScore > 21) {
        document.querySelector(".blackjack__message").innerText = "You already busted you must click deal to reset the game.";
    } else {
        if (botPlaying == true) {
            let card = randomNumSelection(12);
            addBotScore(cardChoices[card]);
            displayCard(cardChoices[card], "Bot");
        }  else { return }
    } 
}

const handleStand = () => {
    if (botPlaying == false) {
        botPlaying = true;
        handleBotHit();
    }
}

const handleDeal = () => {
    userScore = 0;
    botScore = 0;
    userScoreEl.innerText = userScore;
    botScoreEl.innerText = botScore;
    userCardContainer.innerHTML = "";
    botCardContainer.innerHTML = "";
    botPlaying = false;
    document.querySelector(".blackjack__message").innerText = "Let's play";
}

const handleBotWin = () => {
    lossSound.play();
    userLosses += 1;
    document.querySelector("#user-losses").innerText = userLosses;
    document.querySelector(".blackjack__message").innerText = "Your opponent won. Press deal to play again!";
}

const handleUserWin = () => {
    winSound.play();
    userWins += 1;
    document.querySelector("#user-wins").innerText = userWins;
}

const handleDraw = () => {
    draws += 1;
    document.querySelector("#user-draws").innerText = draws;
}

const handleUserBust = () => {
    document.querySelector(".blackjack__message").innerText = "You busted! Your opponent won.";
    handleBotWin();
}

const handleBotBust = () => {
    document.querySelector(".blackjack__message").innerText = "Your opponent busted! You win.";
    handleUserWin();
}