const form = document.querySelector(".payment_form");
const cardIssuer = document.querySelector(".card_issuer");
const cardNumberInputs = document.querySelectorAll(".form_inputs input");
const cardNumber = document.querySelector(".cardholder_number");
const cardExpirationMonth = document.querySelector(".card_expiration_month");
const cardExpirationYear = document.querySelector(".card_expiration_year");
const cardHolderNameInput = document.querySelector("#card_holder");
const cardHolderName = document.querySelector("#card_holder_name");
const mssgOne = document.querySelector(".message1");
const mssgTwo = document.querySelector(".message2");
const mssgThree = document.querySelector(".message3");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const cvvInput = document.querySelector("#cvv");
const alert = document.querySelector(".alert_box");

// expiry month and year
let months = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEPT",
  "OCT",
  "NOV",
  "DEC",
];
let selectMonth = new Date().getUTCMonth();
let monthOption = `<option value="">Month</option>`;
let yearStart = 2024;
let cardExpiryYear = new Date("2034").getFullYear();
let yearOption = `<option value="">Year</option>`;

// expiry month
for (let i = 0; i < months.length; i++) {
  monthOption += `<option value="${months[i]}">${months[i]}</option>`;
}
month.innerHTML = monthOption;

// expiry year
for (let i = yearStart; i < cardExpiryYear; i++) {
  yearOption += `<option value="${i}">${i}</option>`;
}
year.innerHTML = yearOption;

// update the card with selected month and year
month.addEventListener("change", () => {
  cardExpirationMonth.innerHTML = `<span>${month.value}/</span>`;
});
year.addEventListener("change", () => {
  cardExpirationYear.innerHTML = `<span>${year.value}</span>`;
});

// Form validation
const formValidation = () => {
  form.addEventListener("keyup", () => {
  // automatically move cursor/focus to next input element & validate input
  cardNumberInputs.forEach((input, index) => {
    input.addEventListener("keydown", () => {
      if (input.value.length > input.maxLength && index < 3) {
        input.nextElementSibling.focus();
      } else if (input.value.length > input.maxLength) {
        input.blur();
      } else if (input.value.length < input.maxLength) {
        input.style.borderColor = `crimson`;
        mssgOne.innerHTML = message("card number must be 16 digits");
      } else {
        input.style.borderColor = `green`;
        mssgOne.innerHTML = message("✔️");
      }
    });
  });

  // Validate card issuer
  if (cardNumberInputs[0].value[0] === "2") {
    cardIssuer.setAttribute("src", "assets/MasterCard_Logo.svg.png");
  } else if (cardNumberInputs[0].value[0] === "3") {
    cardIssuer.setAttribute("src", "assets/images__3_-removebg-preview.png");
  } else if (cardNumberInputs[0].value[0] === "4") {
    cardIssuer.setAttribute("src", "assets/Visa_Inc._logo.svg.png");
  } else if (cardNumberInputs[0].value[0] === "5") {
    cardIssuer.setAttribute("src", "assets/MasterCard_Logo.svg.png");
  } else {
    cardIssuer.setAttribute("src", "assets/images__1_-removebg-preview.png");
  };

  if (cardHolderNameInput.value.length < 1) {
    cardHolderNameInput.style.borderColor = `crimson`;
    mssgTwo.innerHTML = message("first and last name is required!");
  } else {
    cardHolderNameInput.style.borderColor = `green`;
    mssgTwo.innerHTML = message("✔️");
  };

  // update dom with card details
  let value = ``;
  cardNumberInputs.forEach((input) => {
    value += `<span>${input.value}</span>`;
  });
  cardNumber.innerHTML = value;
  cardHolderName.innerHTML = cardHolderNameInput.value;

  // validate expiry month and year
  if (!month.value) {
    month.style.borderColor = "crimson";
  } else {
    month.style.borderColor = "green";
  }
  if (!year.value) {
    year.style.borderColor = "crimson";
  } else {
    year.style.borderColor = "green";
  }

  // validate cvv
  if (cvvInput.value.length < 3) {
    cvvInput.style.borderColor = `crimson`;
    mssgThree.innerHTML = message("ccv must not be less than 3");
  } else if (cvvInput.value.length > 4) {
    cvvInput.style.borderColor = `crimson`;
    mssgThree.innerHTML = message("ccv must not be greater than 4");
  } else {
    cvvInput.style.borderColor = `green`;
    mssgThree.innerHTML = message("✔️");
  }
  });
}
formValidation();
const message = (message) => {
  alert.style.display = "block";
  return `<p>${message}</p>`;
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  cardNumberInputs.forEach(input => {
    if (input.value.length !== 4) {
      input.style.borderColor = `crimson`;
      alert.innerHTML = message("Enter card number");
    } else if (cardHolderNameInput.value.length < 7) {
      cardHolderNameInput.style.borderColor = `crimson`;
      alert.innerHTML = message("Enter first name and last name");
    } else if (!month.value) {
      alert.innerHTML = message("Enter expiry month");
    } else if (!year.value) {
      alert.innerHTML = message("Enter expiry year");
    } else if (cvvInput.value.length < 3) {
      alert.innerHTML = message("cvv invalid!");
    } else if (cvvInput.value.length > 4) {
      alert.innerHTML = message("cvv invalid!");
    } else {
      alert.innerHTML = message("Your payment was successful! ✔️");
      alert.style.color = "green";
      // setTimeout(() => {
      //   form.querySelectorAll("input").forEach(input => { input.value = "" });
      //   month.value = "";
      //   year.value = "";
      // }, 3000)
    }
  });
});
