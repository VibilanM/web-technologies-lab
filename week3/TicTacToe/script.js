const cells = document.querySelectorAll(".cell");
const status = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let currentPlayer = "X";
let gameOver = false;

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];

function checkWinner(){

    for(let pattern of winPatterns){

        let [a,b,c] = pattern;

        if(
            cells[a].textContent &&
            cells[a].textContent === cells[b].textContent &&
            cells[b].textContent === cells[c].textContent
        ) { return true; }
    }

    return false;
}

function checkDraw(){

    for(let cell of cells){
        if(cell.textContent === "") return false;
    }

    return true;
}

cells.forEach(cell=>{
    cell.addEventListener("click",()=>{

        if(cell.textContent !== "" || gameOver)
            return;

        cell.textContent = currentPlayer;

        if(checkWinner()){
            status.textContent = currentPlayer + " Wins!";
            status.classList.add("win");
            gameOver = true;
            return;
        }

        if(checkDraw()){
            status.textContent = "It's a Draw!";
            status.classList.add("draw");
            gameOver = true;
            return;
        }

        currentPlayer = currentPlayer === "X" ? "O" : "X";

        status.textContent = currentPlayer + "'s Turn";
    });
});

restartBtn.addEventListener("click",()=>{

    cells.forEach(cell=>{
        cell.textContent = "";
    });

    currentPlayer = "X";
    gameOver = false;

    status.textContent = "X's Turn";
    status.classList.remove("win");
    status.classList.remove("draw");

});