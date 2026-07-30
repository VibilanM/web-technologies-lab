function changeColor(id) {

    let box = document.getElementById(id);

    let r = Math.floor(Math.random() * 256);
    let g = Math.floor(Math.random() * 256);
    let b = Math.floor(Math.random() * 256);

    box.style.backgroundColor = "rgb(" + r + "," + g + "," + b + ")";
}

function resetBoxes() {

    for (let i = 1; i <= 9; i++) {
        document.getElementById("box" + i).style.backgroundColor = "brown";
    }

}