// create needed variables
let firstNum = undefined;
let secondNum = undefined;
let operator = undefined;
let prevButton = undefined;
let currOp = undefined;

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
decimalAdded = false;

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
    if (num2 === 0) {
        return "ERROR";
    }
    else return num1 / num2;
}

function operate(operator,num1,num2) {
    if (operator === "+") return add(num1,num2);
    else if (operator === "-") return subtract(num1,num2);
    else if (operator === "*") return multiply(num1,num2);
    else if (operator === "/") return divide(num1,num2);
}

// Event Functions
function numEvent(event) {
    if (prevButton === "equal-button") {
        clear();
        displayValue.textContent = "";
    }
    if (newNumStart) {
        displayValue.textContent = "";
        newNumStart = false;
    }
    // make sure number is no more than 14 digits
    if (displayValue.textContent.length < 13) {
        if (event.type === "click") {
            if (event.target.textContent === "." && decimalAdded) {}
            else displayValue.textContent += event.target.textContent;
        }
        else if (event.type === "keyup") {
            if (event.target.textContent === "." && decimalAdded) {}
            else displayValue.textContent += event.key;
        }
        
    }
    prevButton = "num-button";
}

function toogleOperatorOff() {
    if (currOp !== undefined) {
        currOp.classList.remove("highlight");
    }
}

function toogleOperatorOn(event) {
    currOp = event.currentTarget;
    currOp.classList.add("highlight");
}

function operatorEvent(event) {
    if (displayValue.textContent !== "" && displayValue.textContent !== "." && displayValue.textContent !== "ERROR") {
        // if click, add class to highlight button
        toogleOperatorOff();
        toogleOperatorOn(event);
        if (firstNum !== undefined && prevButton === "num-button") {
            secondNum = parseFloat(displayValue.textContent);
            calculate();
        }
        else {
            firstNum = parseFloat(displayValue.textContent);
        }
        newNumStart = true;
        decimalAdded = false;
        if (event.type === "click") {
            operator = event.target.value;
        }
        else if (event.type === "keyup") {
            operator = event.key;
        }        
        prevButton = "operator-button";
    }
    
}

function equalEvent(event) {
        // if first num is not pressed, do nothing
    // if second num is not pressed, second num = first num
    // if operator not pressed, do previous operation
    if (firstNum === undefined) return;
    else if (prevButton === "operator-button") {
        secondNum = firstNum;
    }
    else if (prevButton === "equal-button") {}
    else if (displayValue.textContent !== "" && displayValue.textContent !== "ERROR") {
        secondNum = parseFloat(displayValue.textContent);
    }
    calculate();
    newNumStart = true;
    decimalAdded = false;
    prevButton = "equal-button";
    toogleOperatorOff();
}

function delEvent(event) {
    if (displayValue.textContent !== "" && (prevButton === "num-button" || displayValue.textContent === ".")) {
        let length = displayValue.textContent.length;
        if (displayValue.textContent.slice(-1) === ".") {
            decimalAdded = false;
        }
        displayValue.textContent = displayValue.textContent.slice(0,length-1);
    }
}

function decimalEvent(event) {
    if (!decimalAdded) {
        /*if (prevButton != "num-button") {
            newNumStart = true;
        }*/
        //displayValue.textContent += ".";
        decimalAdded = true;
        //prevButton = "num-button";
    }
}

document.addEventListener("keyup", (event) => {
    if (event.key >= 0 && event.key <= 9) {
        numEvent(event);
    }
    else if (event.key === "+" || 
        event.key === "-" || 
        event.key === "*" || 
        event.key === "/") {
        operatorEvent(event);
    }
    else if (event.key === "=") {
        equalEvent(event);
    }
    else if (event.key === "Backspace") {
        delEvent(event);
    }
    else if (event.key === ".") {
        decimalEvent(event);
    }
});

// num clicked on is displayed
numButtons.forEach((button) => {
    button.addEventListener("click", numEvent);
});

// operator clicked on is stored in operator variable
operatorButtons.forEach((button) => {
    button.addEventListener("click", operatorEvent);
});

equalButton.addEventListener("click", equalEvent);

// eventListener for clear button
clearButton.addEventListener("click", (event) => {
    clear();
    displayValue.textContent = "";
    //deSelectOperatorButton();
});

deleteButton.addEventListener("click", delEvent);

decimalButton.addEventListener("click", decimalEvent);



function calculate() {    
    firstNum = operate(operator, firstNum, secondNum);
    answerString = firstNum.toString();
    
    if (answerString.length > 13) {
        if (firstNum <= 9999999999999 && firstNum >= 0.000006) {
            firstNum = parseFloat(answerString.slice(0,13));
        }
        else {
            firstNum = firstNum.toExponential(8);
        }
    }
    displayValue.textContent = firstNum;
    if (firstNum === "ERROR") {
        clear();
    }
}

function clear() {
    firstNum = undefined;
    secondNum = undefined;
    operator = undefined;
    currOperatorButton = undefined;
    newNumStart = true;
    prevButton = undefined;
    decimalAdded = false;
    toogleOperatorOff();
}