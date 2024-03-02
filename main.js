let numberOne;
let numberTwo;
let operator;
let clearNum = false;
let screenValue = document.querySelector(".screen");
const numButtons = document.querySelectorAll(".numButton");
const clearButton = document.querySelector(".clear");
const opButtons = document.querySelectorAll(".opButton")
const enterButton = document.querySelector(".equals")
const decimalButton = document.querySelector(".decimal")

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
    numberOne = undefined;
    operator = undefined;
    numberTwo = undefined;
})

numButtons.forEach(button => button.addEventListener("click", () => {
    if (clearNum === true) {
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

// Unintended behavior -- repeated operator presses yield exponential results.... may just have to create a flag for this.

opButtons.forEach(button => button.addEventListener("click", () => {
    if (numberOne === undefined) {
        numberOne = Number(screenValue.textContent);
        operator = button.textContent;
        clearNum = true;
        return;
    }
    if (numberOne) {
        numberTwo = Number(screenValue.textContent);
        screenValue.textContent = operate(numberOne,numberTwo,operator);
        numberOne = Number(screenValue.textContent);
        clearNum = true;
        return;
    }
}))

enterButton.addEventListener("click", () => {
        numberTwo = Number(screenValue.textContent);
        screenValue.textContent = operate(numberOne,numberTwo,operator);
        clearNum = true;

        return;
})

decimalButton.addEventListener("click", () => {
    let num = screenValue.textContent
    //checking for a decimal in the onscreen value
    processedNum = num.replace(/[^.]/gm,"");
    if (processedNum && clearNum === true) {
        screenValue.textContent = "0."
        clearNum = false;
        return;
    } else if (processedNum && clearNum === false) {
        return
    } else {
    screenValue.textContent += "."
    return;
    }
})

//console.log(operate(numberOne,numberTwo,operator));