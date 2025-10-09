function swapBackground() {
    let body = document.body.style.backgroundColor;

    if (body === "black") {
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    } else {
        document.body.style.backgroundColor = "black";
        document.body.style.color = "gray";
    }
}

function addTask(){
    let task = taskInput.value;
    if(task){
        let li = document.createElement("li");
        li.textContent = task;
        taskList.appendChild(li);
        taskInput.value = "";
    }
}

let btn = document.getElementById("btn");
btn.addEventListener("click", swapBackground);

let addTaskBtn = document.getElementById("addTaskBtn");
let taskInput = document.getElementById("taskInput");
let taskList = document.getElementById("taskList");
addTaskBtn.addEventListener("click", addTask);