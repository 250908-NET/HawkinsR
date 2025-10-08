function add() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    
    let result = num1 + num2;
    
    document.getElementById("result").innerText = "Result: " + result;
}

function subtract() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    
    let result = num1 - num2;
    
    document.getElementById("result").innerText = "Result: " + result;
}

function multiply() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    
    let result = num1 * num2;
    
    document.getElementById("result").innerText = "Result: " + result;
}

function divide() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value); 

    if (num2 === 0) {
        document.getElementById("result").innerText = "Error: Division by zero";
        return;
    } else {
        let result = num1 / num2;
        document.getElementById("result").innerText = "Result: " + result;
    }
}

document.getElementById("addBtn").addEventListener("click", add);
document.getElementById("subtractBtn").addEventListener("click", subtract);
document.getElementById("multiplyBtn").addEventListener("click", multiply);
document.getElementById("divideBtn").addEventListener("click", divide);
document.getElementById("calculateBtn").addEventListener("click", calculate);

function calculate() {
    let num1 = parseFloat(document.getElementById("num1").value);
    let num2 = parseFloat(document.getElementById("num2").value);
    let operation = document.getElementById("operator").value;
    let result;

    switch (operation) {
        case "+":
            result = num1 + num2;
            break;
        case "-":
            result = num1 - num2;
            break;
        case "*":
            result = num1 * num2;
            break;
        case "/":
            if (num2 === 0) {
                document.getElementById("result").innerText = "Error: Division by zero";
                return;
            } else {
                result = num1 / num2;
            }
            break;
        default:
            document.getElementById("result").innerText = "Error: Invalid operation";
            return;
    }

    document.getElementById("result").innerText = "Result: " + result;
}