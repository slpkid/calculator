let numberOne = 0;
let numberTwo;
let operator;
let phase = 1;
clearNum = false;
let screenValue = document.querySelector(".screen");
const numButtons = document.querySelectorAll(".numButton");
const clearButton = document.querySelector(".clear");
const opButtons = document.querySelectorAll(".opButton")

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
    phase = 1;
    screenValue.textContent = 0;
    numberOne = 0;
    operator = undefined;
    numberTwo = undefined;
})

numButtons.forEach(button => button.addEventListener("click", () => {
    if (phase === 2 && clearNum === true) {
        screenValue.textContent = "";
        clearNum = false;
    }
    if (button.textContent === "0" && screenValue.textContent === "0") {
        return
    }
    if (screenValue.textContent === "0"){
        screenValue.textContent = ""
    }
    screenValue.textContent += button.textContent;
}))

opButtons.forEach(button => button.addEventListener("click", () => {
    if (phase === 1) {
        numberOne = screenValue.textContent;
        operator = button.textContent;
        phase = 2;
        clearNum = true;
        return;
    }
    if (phase === 2) {
        numberTwo = screenValue.textContent;
        screenValue.textContent = operate(numberOne,numberTwo,operator);
        phase = 1;
    }
}))

//console.log(operate(numberOne,numberTwo,operator));