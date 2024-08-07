// create needed variables
let firstNum = undefined;
let secondNum = undefined;
let operator = undefined;
let prevButton = undefined;

// store html values into variables
displayValue = document.querySelector("#display");
const numButtons = document.querySelectorAll(".num-button");
const operatorButtons = document.querySelectorAll(".operator-button");
const clearButton = document.querySelector("#clear-button");
const deleteButton = document.querySelector("#delete-button");
const equalButton = document.querySelector("#equal-button");
const decimalButton = document.querySelector("#decimal-button");

currOperatorButton = undefined;
newNumStart = true;

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

// num clicked on is displayed
numButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (prevButton === "equal-button") {
            clear();
        }
        if (newNumStart) {
            displayValue.textContent = "";
            newNumStart = false;
        }
        displayValue.textContent += event.target.textContent;
        prevButton = button.getAttribute("class");
    });
});

// operator clicked on is stored in operator variable
operatorButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
        if (prevButton === "equal-button") {
            operator = button.value;
        }
        // second operator button
        else if (operator !== undefined) {
            calculate();
            operator = button.value;
        }
        // first press
        else if (firstNum === undefined) {
            firstNum = parseInt(displayValue.textContent);
            operator = button.value;
        }
        else if (secondNum === undefined) {
            operator = button.value;
            calculate();
        }
        newNumStart = true;
        prevButton = button.getAttribute("class");
    });
});


equalButton.addEventListener("click", (event) => {
    calculate();
    newNumStart = true;
    prevButton = equalButton.getAttribute("id");

});

// eventListener for clear button
clearButton.addEventListener("click", (event) => {
    clear();
    //deSelectOperatorButton();
});

function calculate() {
    secondNum = parseInt(displayValue.textContent);
    firstNum = operate(operator, firstNum, secondNum);
    secondNum = undefined;
    displayValue.textContent = firstNum;
}

function clear() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    currOperatorButton = undefined;
    displayValue.textContent = "";
    newNumStart = true;
    prevButton = undefined;
}