let displayValue = '0';
let shouldResetDisplay = false;
const display = document.getElementById('display');

function updateDisplay() {
    display.textContent = displayValue;
}

function appendNumber(number) {
    if (displayValue === '0' || shouldResetDisplay) {
        displayValue = number;
        shouldResetDisplay = false;
    } else {
        // Prevent multiple decimals
        if (number === '.' && displayValue.includes('.')) {
            return;
        }
        displayValue += number;
    }
    updateDisplay();
}

function appendOperator(operator) {
    // Don't allow operators at the start except minus
    if (displayValue === '0' && operator !== '-') {
        return;
    }
    
    // If the last character is an operator, replace it
    const lastChar = displayValue.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        displayValue = displayValue.slice(0, -1) + operator;
    } else {
        displayValue += operator;
    }
    shouldResetDisplay = false;
    updateDisplay();
}

function clearDisplay() {
    displayValue = '0';
    shouldResetDisplay = false;
    updateDisplay();
}

function deleteLastChar() {
    if (displayValue.length === 1) {
        displayValue = '0';
    } else {
        displayValue = displayValue.slice(0, -1);
    }
    updateDisplay();
}

function calculate() {
    try {
        // Handle expressions that end with an operator
        const lastChar = displayValue.slice(-1);
        if (['+', '-', '*', '/'].includes(lastChar)) {
            displayValue = displayValue.slice(0, -1);
        }
        
        // Evaluate the expression
        const result = eval(displayValue);
        
        // Handle division by zero
        if (!isFinite(result)) {
            displayValue = 'Error';
        } else {
            // Format the result to avoid long decimals
            displayValue = parseFloat(result.toFixed(10)).toString();
        }
        shouldResetDisplay = true;
        updateDisplay();
    } catch (error) {
        displayValue = 'Error';
        shouldResetDisplay = true;
        updateDisplay();
    }
}