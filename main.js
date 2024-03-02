let numberOne = 0;
let numberTwo;
let operator;
let screenValue = document.querySelector(".screen");
const numButtons = document.querySelectorAll(".numButton");
const clearButton = document.querySelector(".clear");

function add (a,b) {
	return a + b
}
function subtract (a,b) {
	return a - b
}
function multiply (a,b) {
	return a * b
}
function divide (a,b) {
	return a / b
}
function operate(num1,num2,op) {
    switch(op) {
        case op = "+":
            return add(num1, num2)
        case op = "-":
            return subtract(num1,num2)
        case op = "*":
            return multiply(num1,num2)
        case op = "/":
            return divide(num1,num2)
    }
}

clearButton.addEventListener("click", () => {
    screenValue.textContent = 0
})

numButtons.forEach(button => button.addEventListener("click", () => {
    if (button.textContent === "0" && screenValue.textContent === "0") {
        exit();
    }
    if (screenValue.textContent === "0"){
        screenValue.textContent = ""
    }
    screenValue.textContent += button.textContent;
}))

//console.log(operate(numberOne,numberTwo,operator));