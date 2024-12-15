const add = function (a, b) {
  return a + b;
};

const subtract = function (a, b) {
  return a - b;
};

const multiply = function (a, b) {
  return a * b;
};

const divide = function (a, b) {
  return a / b;
};

const operate = function (operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "x") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  } else {
    return error;
  }
};

const calculator_Buttons = Array.from(document.querySelectorAll(".key"));
const calculator_Numbers = Array.from(document.querySelectorAll(".number"));
const calculator_Operations = Array.from(
  document.querySelectorAll(".operator")
);
const calculator_Screen = document.querySelector(".display");

// document.addEventListener("click", (e) => {
//   console.log(e.target);
// });
let operator1_Pressed = "";
let number1_Pressed = "";
let number2_Pressed = "";
let operator2_Pressed = "";
let finalResult = 0;

let getFirsthalf = function (e) {
  if (calculator_Numbers.includes(e.target)) {
    number1_Pressed = number1_Pressed.concat(e.target.innerHTML);
    calculator_Screen.textContent = number1_Pressed;
  } else if (calculator_Operations.includes(e.target)) {
    console.log(number1_Pressed);
    operator1_Pressed = operator1_Pressed.concat(e.target.innerHTML);
    console.log(operator1_Pressed);
    document.removeEventListener("click", getFirsthalf);
    document.addEventListener("click", getSecondhalf);
  }
};

let getSecondhalf = function (e) {
  calculator_Screen.textContent = "";
  if (calculator_Numbers.includes(e.target)) {
    number2_Pressed = number2_Pressed.concat(e.target.innerHTML);
    calculator_Screen.textContent = number2_Pressed;
  } else if (calculator_Operations.includes(e.target)) {
    console.log(number2_Pressed);
    operator2_Pressed = operator2_Pressed.concat(e.target.innerHTML);
    console.log(operator2_Pressed);
    document.removeEventListener("click", getSecondhalf);
    finalResult = operate(
      operator1_Pressed,
      Number(number1_Pressed),
      Number(number2_Pressed)
    );
    console.log(finalResult);
    calculator_Screen.textContent = Math.round(finalResult * 1000) / 1000;
    number1_Pressed = finalResult;
    document.addEventListener("click", getSecondhalf_continued);
  }
};

let getSecondhalf_continued = function (e) {
  if (calculator_Operations.includes(e.target)) {
    // if equals is pressed
    operator1_Pressed = e.target.innerHTML;
    number2_Pressed = "";
    operator2_Pressed = "";
    console.log(operator1_Pressed);
    document.addEventListener("click", getSecondhalf);
    document.removeEventListener("click", getSecondhalf_continued);
  } else if (calculator_Numbers.includes(e.target)) {
    number1_Pressed = e.target.innerHTML;
    document.addEventListener("click", getSecondhalf);
    document.removeEventListener("click", getSecondhalf_continued);
  }
};

let clearButton = function (e) {
  if (e.target.innerHTML === "CLR") {
    calculator_Screen.textContent = "";
    operator1_Pressed = "";
    number1_Pressed = "";
    number2_Pressed = "";
    operator2_Pressed = "";
    finalResult = 0;
    document.removeEventListener("click", getSecondhalf);
    document.removeEventListener("click", getSecondhalf_continued);
    document.addEventListener("click", getFirsthalf);
  }
};

document.addEventListener("click", getFirsthalf);
document.addEventListener("click", clearButton);
