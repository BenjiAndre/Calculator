let firstOperand = ''
let secondOperand = ''
let currentOperation = null
let shouldResetScreen = false

const userInput = document.querySelector('#user-input');
const displayResult = document.querySelector('#result');

const numberButtons = document.querySelectorAll('[data-type="number"]');
const operatorButtons = document.querySelectorAll('[data-type="operator"]');
const equalsButton = document.getElementById('equals');
const allClearButton = document.getElementById('all-clear');
const clearButton = document.getElementById('clear');
const decimalButton = document.getElementById('decimal');

window.addEventListener('keydown', handleKeyboardInput)
equalsButton.addEventListener('click', evaluate)
allClearButton.addEventListener('click', clear)
clearButton.addEventListener('click', deleteNumber)
decimalButton.addEventListener('click', appendPoint)

numberButtons.forEach((button) =>
  button.addEventListener('click', () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => setOperation(button.textContent))
)

function appendNumber(number) {
  if (displayResult.textContent === '0' || shouldResetScreen)
    resetScreen();
  displayResult.textContent += number;
}

function resetScreen() {
  displayResult.textContent = ''
  shouldResetScreen = false
}

function clear() {
  displayResult.textContent = '0'
  userInput.textContent = ''
  firstOperand = ''
  secondOperand = ''
  currentOperation = null
}

function appendPoint() {
  if (shouldResetScreen) {
    resetScreen();
  }
  if (displayResult.textContent === '') {
    displayResult.textContent = '0';
  }
  if (displayResult.textContent.includes('.')) return;

  displayResult.textContent += '.';
}

function deleteNumber() {
  displayResult.textContent = displayResult.textContent.slice(0, -1)
}

function setOperation(operator) {
  if (currentOperation !== null) {
    evaluate();
  }

  firstOperand = displayResult.textContent;
  currentOperation = operator;
  userInput.textContent = `${firstOperand} ${currentOperation}`;
  shouldResetScreen = true;
}

function evaluate() {

  if (displayResult === null || shouldResetScreen) return;

  if ((currentOperation === '÷' || currentOperation === '%') && displayResult.textContent === '0') {
    alert("You can't divide by 0!");
    return
  }

  secondOperand = displayResult.textContent

  displayResult.textContent = roundResult(
    operate(currentOperation, firstOperand, secondOperand)
  )

  userInput.textContent = `${firstOperand} ${currentOperation} ${secondOperand} =`;
  currentOperation = null;
}

function roundResult(number) {
  return Math.round(number * 1000) / 1000;
}

function add(a, b) {
  return a + b;
}

function substract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function modulo(a, b) {
  return a % b;
}

function operate(operator, a, b) {
  a = Number(a)
  b = Number(b)
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return substract(a, b);
    case '×':
      return multiply(a, b);
    case '÷':
      if (b === 0) return null;
      else return divide(a, b);
    case '%':
      if (b === 0) return null;
      else return modulo(a, b);
    default:
      return null; 
  }
}

function handleKeyboardInput(e) {
  if (e.key >= 0 && e.key <= 9) appendNumber(e.key)
  if (e.key === '.') appendPoint()
  if (e.key === '=' || e.key === 'Enter') evaluate()
  if (e.key === 'Backspace') deleteNumber()
  if (e.key === 'Escape') clear()
  if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/')
    setOperation(convertOperator(e.key))
}

function convertOperator(keyboardOperator) {
  if (keyboardOperator === '/') return '÷';
  if (keyboardOperator === '*') return '×';
  if (keyboardOperator === '-') return '-';
  if (keyboardOperator === '+') return '+';
  if (keyboardOperator === '%') return '%';
}

