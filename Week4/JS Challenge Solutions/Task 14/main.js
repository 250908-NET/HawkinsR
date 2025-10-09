function addNewItem() {
    let ul = document.getElementById("list");
    let li = document.createElement("li");
    li.appendChild(document.createTextNode("New Item"));
    ul.appendChild(li);
}

let addBtn = document.getElementById("add");

addBtn.addEventListener("click", addNewItem);