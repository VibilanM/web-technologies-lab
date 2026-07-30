let secretNumber = Math.floor(Math.random() * 9) + 1;

function checkGuess() {
    let guess = document.getElementById("guess").value;

    document.getElementById("number").textContent = guess;

    if (guess == secretNumber) {
        document.getElementById("result").textContent = "Correct! You guessed the number!";
    }
    else {
        document.getElementById("result").textContent = "Try again!";
    }
}