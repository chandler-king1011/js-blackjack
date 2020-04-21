const userScoreEl = document.querySelector("#user-score");
const botScoreEl = document.querySelector("#bot-score");
const userCardContainer = document.querySelector("#user-cards");
const botCardContainer = document.querySelector("#bot-cards");



let userScore = 0;
let botScore = 0;
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

const addScore = (card) => {
    let cardScore = 0;
    if (card == "J" || card == "K" || card == "Q") {
        cardScore = 10;
    } else if (card === "A") {
        cardScore = 1;
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
    let card = randomNumSelection(12);
    addScore(cardChoices[card]);
    displayCard(cardChoices[card], "User");

}

const handleStand = () => {

}

const handleDeal = () => {

}

const handleUserBust = () => {
    document.querySelector(".blackjack__message").innerText = "You busted!";
}