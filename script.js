const userScoreEl = document.querySelector("#user-score");
const botScoreEl = document.querySelector("#bot-score");
const userCardContainer = document.querySelector("#user-cards");
const botCardContainer = document.querySelector("#bot-cards");


let userScore = 0;
let botScore = 0;
let botPlaying = false;
const cardChoices = [2, 3, 4, 5, 6, 7, 8, 9, 10, "A", "J", "K", "Q"];


const randomNumSelection = (max) => {
    return Math.floor(Math.random() * (max + 1));
} 

const displayCard = (cardNum, user) => {
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
        document.querySelector(".blackjack__message").innerText = "You already stood. You must wait for your opponent to complete their game.";
    }else {
        let card = randomNumSelection(12);
        addUserScore(cardChoices[card]);
        displayCard(cardChoices[card], "User");
    }
}

const handleBotHit = () => {
    if (botPlaying == true) {
        let card = randomNumSelection(12);
        addBotScore(cardChoices[card]);
        displayCard(cardChoices[card], "Bot");
    } else { return }
}

const handleStand = () => {
    botPlaying = true;
    handleBotHit();
}

const handleDeal = () => {
    userScore = 0;
    botScore = 0;
    userScoreEl.innerText = userScore;
    botScoreEl.innerText = botScore;
    userCardContainer.innerHTML = "";
    botCardContainer.innerHTML = "";
    document.querySelector(".blackjack__message").innerText = "Let's play";
}

const handleBotWin = () => {
    console.log("bot wins");
}

const handleUserBust = () => {
    document.querySelector(".blackjack__message").innerText = "You busted!";
}

const handleBotBust = () => {
    document.querySelector(".blackjack__message").innerText = "Your opponent busted!";
}