function switcher() {
    if (img.src.match("./cat1.webp")) {
        img.src = "./cat2.jpg";
    } else {
        img.src = "./cat1.webp";
    }
}

let img = document.getElementById("image");
let btn = document.getElementById("switch");

btn.addEventListener("click", switcher);
