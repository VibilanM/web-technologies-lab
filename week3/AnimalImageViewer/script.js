let animals = {
    cat: "cat.jpg",
    dog: "dog.jpg",
    lion: "lion.jpg",
    elephant: "elephant.jpg"
};

function showImage() {
    let animal = document.getElementById("animalName").value.toLowerCase();

    let img = document.getElementById("animalImage");

    if (animals[animal]) {
        img.src = "images/" + animals[animal];
    }
    else {
        img.src = "";
        img.alt = "Image Not Found.";
    }
}