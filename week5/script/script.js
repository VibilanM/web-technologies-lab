let countries = [
    "India",
    "Japan",
    "China",
    "France",
    "Germany",
    "Brazil",
    "Canada",
    "Australia",
    "Italy",
    "Spain",
    "Egypt",
    "Mexico"
];

let cards = [];

for (let i = 0; i < countries.length; i++) {
    cards.push(countries[i]);
    cards.push(countries[i]);
}

cards.push("Danger");

cards.sort(function () {
    return Math.random() - 0.5;
});

let gameBoard = document.getElementById("game-board");
let scoreDisplay = document.getElementById("score");
let message = document.getElementById("message");
let resetButton = document.getElementById("reset-button");

let firstCard = null;
let secondCard = null;

let firstBox = null;
let secondBox = null;

let score = 0;
let matchedPairs = 0;
let gameOver = false;

// Create all the boxes
for (let i = 0; i < cards.length; i++) {

    let box = document.createElement("div");

    box.classList.add("box");

    box.dataset.country = cards[i];

    box.innerText = "?";

    box.addEventListener("click", function () {
        revealBox(box);
    });

    gameBoard.appendChild(box);
}

function revealBox(box) {

    if (gameOver) {
        return;
    }

    if (box === firstBox) {
        return;
    }

    if (box.classList.contains("matched")) {
        return;
    }

    if (secondBox !== null) {
        return;
    }

    let country = box.dataset.country;

    box.innerText = country;
    box.classList.add("revealed");

    if (firstBox === null) {

        firstBox = box;
        firstCard = country;

        return;
    }

    secondBox = box;
    secondCard = country;

    if (secondCard === "Danger" || firstCard === "Danger") {

        message.innerText = "Danger! Game Over!";
        score = 0;
        scoreDisplay.innerText = score;

        gameOver = true;

        return;
    }

    if (firstCard === secondCard) {

        firstBox.classList.add("matched");
        secondBox.classList.add("matched");

        score = score + 10;
        matchedPairs = matchedPairs + 1;

        scoreDisplay.innerText = score;

        message.innerText = "Match! +10 points";

        firstBox = null;
        secondBox = null;

        firstCard = null;
        secondCard = null;

        if (matchedPairs === 12) {
            message.innerText = "Congratulations! You found all 12 pairs!";
            gameOver = true;
        }

    } else {

        message.innerText = "Not a match! Score reset to 0.";

        score = 0;
        scoreDisplay.innerText = score;

        setTimeout(function () {

            firstBox.innerText = "?";
            secondBox.innerText = "?";

            firstBox.classList.remove("revealed");
            secondBox.classList.remove("revealed");

            firstBox = null;
            secondBox = null;

            firstCard = null;
            secondCard = null;

        }, 1000);
    }
}

resetButton.addEventListener("click", function () {
    location.reload();
});