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

function divideByZero() {    
    screenValue.textContent = "kappa"
    clearNum = true;
    operator = undefined;
    numberOne = undefined;
    numberTwo = undefined;
}

function clearButtonPress() {
    //reinitializes all values. unsure if logic based on undefineds is poor quality code or not...
    screenValue.textContent = 0;
    operator = undefined;
    numberOne = undefined;
    numberTwo = undefined;
}

function numberPress () {
    // will clear the display after pressing an operator or equals button for clarity
    if (clearNum === true) {
        screenValue.textContent = "";
        clearNum = false;
    }
    // keeps initialized 0 value as 0 when user inputs 0 to prevent user from inputting multiple zeroes in a row
    if (button.textContent === "0" && screenValue.textContent === "0") {
        return
    }
    // clears the zero when other flags fail 
    if (screenValue.textContent === "0"){
        screenValue.textContent = ""
    }
    screenValue.textContent += button.textContent;
}

function equalsPress() {
    // when no operator is present, flag clearNum and do nothing.
    if (operator === undefined) {
        clearNum = true
        return;
    }
    // otherwise it operates and stores numberTwo to allow for iterable calculations
    numberTwo = Number(screenValue.textContent);
    //check if it's zero, end function if yes.
    if (numberTwo === 0 && operator === "/") {
        divideByZero();
        return;
    }
    screenValue.textContent = operate(numberOne,numberTwo,operator).toString();
    clearNum = true;
    return;
}

function roundNum(num) {
    return Number(num.toString().slice(0,15))
}

function decimalPress() {
    let num = screenValue.textContent
    processedNum = num.replace(/[^.]/gm, "");
    // Reduces onscreen text to a string containing nothing or a single decimal.
    // check if clearNum is true, then print "0." to the screen
    if (processedNum && clearNum === true) {
        screenValue.textContent = "0."
        clearNum = false;
        return;
        // check for clearNum, and prevents multiple decimal presses if it's false
    } else if (processedNum && clearNum === false) {
        return
    }
    // if it passes both checks, then add a decimal.
    screenValue.textContent += "."
    return;
}

function operatorPress() {
    // this fires to store the first number to be operated on to prevent an empty calcuation
    if (numberOne === undefined) {
        numberOne = Number(screenValue.textContent);
        operator = button.textContent;
        clearNum = true;
        return;
    }
    // operate upon stored values and returns the result
    if (numberOne) {
        numberTwo = Number(screenValue.textContent);
        //check if it's zero, end function if yes.
        if (numberTwo === 0 && operator === "/") {
            divideByZero();
            return;
        }
        screenValue.textContent = operate(numberOne,numberTwo,operator);
        numberOne = Number(screenValue.textContent);
        numberTwo = undefined;
        operator = button.textContent;
        clearNum = true;
        return;
    }
}

enterButton.addEventListener("click", () => {
    equalsPress()
})

decimalButton.addEventListener("click", () => {
    decimalPress()
})

opButtons.forEach(button => button.addEventListener("click", () => {
    operatorPress()
}))

numButtons.forEach(button => button.addEventListener("click", () => {
    numberPress()
}))

clearButton.addEventListener("click", () => {
    clearButtonPress()
})