function sayhello() {
    console.log("Hello, World!");
    alert("Hello, World!");
}

let btn = document.getElementById("myButton");
btn.addEventListener("click", sayhello);