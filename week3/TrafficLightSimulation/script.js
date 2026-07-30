let state = 0;

function nextLight() {
    let red = document.getElementById("red");
    let yellow = document.getElementById("yellow");
    let green = document.getElementById("green");

    red.style.backgroundColor = "grey";
    yellow.style.backgroundColor = "grey";
    green.style.backgroundColor = "grey";

    if (state == 0) {
        red.style.backgroundColor = "red";
        state = 1;
    }
    else if (state == 1) {
        green.style.backgroundColor = "green";
        state = 2;
    }
    else if (state == 2) {
        yellow.style.backgroundColor = "yellow";
        state = 0;
    }
}