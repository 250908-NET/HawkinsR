function greet(){
    let name = document.getElementById("nameInput").value;
    if(name.trim() == ""){
        alert("Please enter your name.");
    } else {
        alert("Hello, " + name + "!");
    }
}

function colorAlert(){
    let color = document.getElementById("favColorInput").value;
    let name = document.getElementById("nameInput").value;
    if(name.trim() == ""){
        alert("Please enter your name first.");
        return;
    }
    if(color.trim() == ""){
        alert("Please enter your favorite color.");
    } else {
        alert("Your favorite color is " + color + "!");
    }
}

document.getElementById("greetButton").addEventListener("click", greet);
document.getElementById("colorButton").addEventListener("click", colorAlert);