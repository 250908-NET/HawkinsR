let paragraph = document.getElementById("paragraph1");
let change = document.getElementById("change");
let reset = document.getElementById("reset");

change.addEventListener("click", function() {
    paragraph.style.color = "red";
    paragraph.style.fontWeight = "bold";
});

reset.addEventListener("click", function() {
    paragraph.style.color = "black";
    paragraph.style.fontWeight = "normal";
});