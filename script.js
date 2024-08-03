// create needed variables
let firstNum = undefined;
let secondNum = undefined;
let operator = undefined;

// store html values into variables
displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const equalButton = document.querySelector("#equal-button");
const decimalButton = document.querySelector("#decimal-button");

currOperatorButton = undefined;
newNumStart = false;

// basic math functions
function add(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1*num2;
}

function divide(num1,num2) {
    return num1 / num2;
}

function operate(operator,num1,num2) {
    if (operator === "+") return add(num1,num2);
    else if (operator === "-") return subtract(num1,num2);
    else if (operator === "*") return multiply(num1,num2);
    else if (operator === "/") return divide(num1,num2);
}

function setFirstNum() {
    // second num not set
    if (secondNum === undefined) {
        firstNum = parseInt(displayValue.textContent);
    }
    // second num is already set => do the math
    else {
        
    }
}

function setSecondNum() {
    
}

function deSelectOperatorButton() {
    if (currOperatorButton !== undefined) {
        currOperatorButton.style.background = "";
    }
}



// eventlisteners for the num buttons
numButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (newNumStart) {
            displayValue.textContent = "";
            newNumStart = false;
        }
        displayValue.textContent += event.target.textContent;
    });
});

// eventlisteners for operator buttons
operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        operator = button.value;
        if (currOperatorButton === undefined) {
            firstNum = parseInt(displayValue.textContent);
        }
        // means second operator pressed
        else {
            deSelectOperatorButton();
            // do math on the current num
            secondNum = parseInt(displayValue.textContent);
            firstNum = operate(operator,firstNum,secondNum);
            displayValue.textContent = firstNum;
            secondNum = undefined;
        }
        newNumStart = true;
        button.style.background = "gray";
        currOperatorButton = button;

    });
});

// eventListener for equal button
equalButton.addEventListener("click", (event) => {
    deSelectOperatorButton();
    if (operator !== undefined && firstNum !== undefined) {
        secondNum = displayValue.textContent;
        displayValue.textContent = operate(
            operator,
            firstNum,
            secondNum ? secondNum : firstNum
        );
    }
});

// eventListener for clear button
clearButton.addEventListener("click", (event) => {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    currOperatorButton = undefined;
    displayValue.textContent = "";
    newNumStart = true;
    deSelectOperatorButton();
});