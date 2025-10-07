function greet(){
    let name = document.getElementById("nameInput").value;
    if(name.trim() == ""){
        alert("Please enter your name.");
    } else {
        alert("Hello, " + name + "!");
    }
}

document.getElementById("greetButton").addEventListener("click", greet);