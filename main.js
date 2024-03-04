let numberOne;
let numberTwo;
let operator;
let result;
let clearNum = false;
let needNewNumber = false;
let canBackspace = true;
let screenValue = document.querySelector(".screen");
const numButtons = document.querySelectorAll(".numButton");
const clearButton = document.querySelector(".clear");
const opButtons = document.querySelectorAll(".opButton")
const enterButton = document.querySelector(".equals")
const decimalButton = document.querySelector(".decimal")
const backspaceButton = document.querySelector(".backspace")

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

backspaceButton.addEventListener("click",backSpacePress)
        
enterButton.addEventListener("click", equalsPress)

decimalButton.addEventListener("click", decimalPress)

opButtons.forEach(button => button.addEventListener("click", operatorPress))

numButtons.forEach(button => button.addEventListener("click", numberPress))

clearButton.addEventListener("click", clearButtonPress)

let keyPressed;

//listen for keypress
document.addEventListener("keydown",(e) => {
    keyCode = e.code;
    // console.log(keyCode);
    // convert keypress to input
    // if it matches with an operator, number, or equals, call the respective function.
})

function backSpacePress() {
    if (canBackspace === false) {
        return
    } 
    let screenString = screenValue.textContent;
    let screenStringLength = screenString.length;
    screenValue.textContent = screenString.slice(0, screenStringLength - 1);
    if (screenValue.textContent === "") {
        screenValue.textContent = "0"
    }
    return;
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
    needNewNumber = false;
    canBackspace = true;
}

function numberPress () {
    // check if the calculator needs a new number to prevent exponential calculations...
    if (needNewNumber = true) {
        needNewNumber = false
    }
    // will clear the display after pressing an operator or equals button for clarity
    if (clearNum === true) {
        screenValue.textContent = "";
        clearNum = false;
    }
    // keeps initialized 0 value as 0 when user inputs 0 to prevent user from inputting multiple zeroes in a row
    if (this.textContent === "0" && screenValue.textContent === "0") {
        return
    }
    // clears the zero when other flags fail 
    if (screenValue.textContent === "0"){
        screenValue.textContent = ""
    }
    // prevent input from overflowing 
    let num = screenValue.textContent.toString()
    if(num.length > 12) {
        return
    }
    screenValue.textContent += this.textContent;
    return;
}

function equalsPress() {
    // when no operator is present, flag clearNum and do nothing.
    if (operator === undefined) {
        clearNum = true
        canBackspace = false;
        return;
    }
    // otherwise it operates and stores numberTwo to allow for iterable calculations
    if (!numberTwo) {
        numberTwo = Number(screenValue.textContent);
    }
    // check if numberTwo is zero, end function if yes.
    if (numberTwo === 0 && operator === "/") {
        divideByZero();
        return;
    }
    // 
    result = operate(numberOne,numberTwo,operator);
    screenValue.textContent = roundNum(result);
    numberOne = result;
    needNewNumber = true;
    canBackspace = false;
    clearNum = true;
    return;
}

function roundNum(num) {
    if (num > 99999999999999 || num < -999999999999) {
    num = Number(num.toString() + ".0");
    return (num.toPrecision(9));
    }
    return num;
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
        operator = this.textContent;
        needNewNumber = true;
        canBackspace = true;
        clearNum = true;
        return;
    }
    if (needNewNumber === true) {
        operator = this.textContent;
        return
    }
    numberTwo = undefined;
    // operate upon stored values and returns the result
    if (numberOne && needNewNumber === false) {
        numberTwo = Number(screenValue.textContent);
        //check if it's zero, end function if yes.
        if (numberTwo === 0 && operator === "/") {
            divideByZero();
            return;
        }
        result = operate(numberOne,numberTwo,operator);
        screenValue.textContent = roundNum(result);
        numberOne = result;
        numberTwo = undefined;
        operator = this.textContent;
        needNewNumber = true;
        clearNum = true;
        canBackspace = true;
        return;
    }
}
