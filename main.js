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

//reinitializes all values. unsure if logic based on undefineds is poor quality code or not...
clearButton.addEventListener("click", () => {
    screenValue.textContent = 0;
    operator = undefined;
    numberOne = undefined;
    numberTwo = undefined;
})

numButtons.forEach(button => button.addEventListener("click", () => {
    // will clear the display after pressing an operator or equals button for clarity
    if (clearNum === true) {
        screenValue.textContent = "";
        clearNum = false;
    }
    // keeps initialized 0 value as 0 when user inputs 0 to prevent user from inputting multiple zeroes in a row
    if (button.textContent === "0" && screenValue.textContent === "0") {
        return
    }
    if (screenValue.textContent === "0"){
        screenValue.textContent = ""
    }
    screenValue.textContent += button.textContent;
}))


opButtons.forEach(button => button.addEventListener("click", () => {
    // this fires to store the first number to be operated on to prevent an empty calcuations
    if (numberOne === undefined) {
        numberOne = Number(screenValue.textContent);
        operator = button.textContent;
        clearNum = true;
        return;
    }
    // operate upon stored values and returns the result
    if (numberOne) {
        numberTwo = Number(screenValue.textContent);
        screenValue.textContent = operate(numberOne,numberTwo,operator);
        numberOne = Number(screenValue.textContent);
        numberTwo = undefined;
        operator = button.textContent;
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
    processedNum = num.replace(/[^.]/gm,"");
    // Reduces onscreen text to a string containing nothing or a single decimal.
    // 
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