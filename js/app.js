let inputItem = document.querySelector(".input-item");
let selectBtn = document.querySelectorAll(".select-btn");
let customInput = document.querySelector(".custom-input");
let numberOfPeople = document.querySelector(".number-people-input");
let amountTip = document.querySelector("#amountTip");
let amountTotal = document.querySelector("#totalPerson");
let resetBtn = document.querySelector("#reset_btn");
let validTxt = document.querySelector(".valid_txt");
let validTxtBill = document.querySelector(".valid_txt_bill");

let billInput = 0;
let peopleInput = 0;
let percentageItem = 0;

inputItem.addEventListener("input", (event) => {
  if (inputItem.value.trim() !== "") {
    billInput = parseFloat(inputItem.value);
  }
  calculate();
});

numberOfPeople.addEventListener("input", (event) => {
  if (numberOfPeople.value.trim() !== "") {
    peopleInput = parseFloat(numberOfPeople.value);
  }
  calculate();
});

customInput.addEventListener("input", (event) => {
  if (customInput.value.trim() !== "") {
    percentageItem = parseFloat(customInput.value);
    console.log(percentageItem);
  }
  calculate();
});

selectBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    percentageItem = parseFloat(button.innerHTML);
    handleButtonClick(this);
    calculate();
  });
});

function handleButtonClick(button) {
  let buttons = document.querySelectorAll(".select-btn");
  buttons.forEach(function (btn) {
    btn.classList.remove("active");
  });
  button.classList.add("active");
}

customInput.addEventListener("focus", function () {
  selectBtn.forEach(function (button) {
    button.classList.remove("active");
  });
  customInput.style.border = "2px solid #26C2AE";
});

customInput.addEventListener("blur", function () {
  customInput.style.border = "2px solid #F3F9FA";
});

function calculate() {
  billValidation();
  peopleValidation();

  if (billInput !== 0 && percentageItem !== 0 && peopleInput !== 0) {
    let total = parseInt(
      (billInput * (percentageItem / 100) + billInput) / peopleInput
    );
    let tipAmount = parseInt(
      (billInput * (percentageItem / 100)) / peopleInput
    );
    amountTip.textContent = tipAmount.toFixed(2);
    amountTotal.textContent = total.toFixed(2);
    resetBtn.style.background = "#26C2AE";
  }
}

function billValidation() {
  if (billInput === 0 || isNaN(billInput)) {
    validTxtBill.style.display = "block";
    inputItem.style.border = "2px solid #E17457";
  } else {
    validTxtBill.style.display = "none";
    inputItem.style.border = "2px solid #26C2AE";
  }
}

function peopleValidation() {
  if (peopleInput === 0 || isNaN(peopleInput)) {
    validTxt.style.display = "block";
    numberOfPeople.style.border = "2px solid #E17457";
  } else {
    validTxt.style.display = "none";
    numberOfPeople.style.border = "2px solid #26C2AE";
  }
}
resetBtn.addEventListener("click", function (e) {
  e.stopPropagation();
  billInput = 0;
  peopleInput = 0;
  percentageItem = 0;
});
