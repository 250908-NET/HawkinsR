function swapBackground() {
    let body = document.body.style.backgroundColor;

    if (body === "black") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "white";
    }
}

let btn = document.getElementById("btn");
btn.addEventListener("click", swapBackground);