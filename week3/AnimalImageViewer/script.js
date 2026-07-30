let animals = {
    cat: "cat.jpg",
    dog: "dog.jpg",
    lion: "lion.jpg",
    elephant: "elephant.jpg"
};

function showImage() {
    let animal = document.getElementById("animalName").value.toLowerCase();

    let img = document.getElementById("animalImage");
    let msg = document.getElementById("message");

    if (animals[animal]) {
        img.src = "images/" + animals[animal];
        msg.textContent = "";
    }
    else {
        img.src = "";
        img.alt = "Image Not Found.";
        msg.textContent = "Image Not Found.";
    }
}