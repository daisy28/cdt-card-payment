const form = document.querySelector(".payment_form");
const cardIssuer = document.querySelector(".card_issuer");
const cardNumberInputs = document.querySelectorAll(".form_inputs input");
const cardNumber = document.querySelector(".cardholder_number");
const cardExpirationMonth = document.querySelector(".card_expiration_month");
const cardExpirationYear = document.querySelector(".card_expiration_year");
const cardHolderNameInput = document.querySelector("#card_holder");
const cardHolderName = document.querySelector("#card_holder_name");
const month = document.querySelector(".month");
const year = document.querySelector(".year");
const cvvInput = document.querySelector("#cvv");
const alert = document.querySelector(".alert_box");

// expiry month and year
let months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
let selectMonth = new Date().getUTCMonth();
let monthOption = `<option value="">Month</option>`;
let yearStart = 2024;
let cardExpiryYear = new Date("2034").getFullYear();
let yearOption = `<option value="">Year</option>`;

// expiry month
for (let i = 0; i < months.length; i++){
     monthOption += `<option value="${months[i]}">${months[i]}</option>`
}
month.innerHTML = monthOption;

// expiry year
for (let i = yearStart; i < cardExpiryYear; i++){
     yearOption += `<option value="${i}">${i}</option>`
}
year.innerHTML = yearOption;

month.addEventListener("change", () => {
     cardExpirationMonth.innerHTML = `<span>${month.value}/</span>`;
});
year.addEventListener("change", () => {
     cardExpirationYear.innerHTML = `<span>${year.value}</span>`;
});


// Form validation
form.addEventListener("keyup", () => {
     // automatically move curosr/focus to next input element
     cardNumberInputs.forEach(input => {
          input.addEventListener("keydown", () => {
               if (input.value.length > input.maxLength) {
                    input.nextElementSibling.focus();
               } else if (input.value.length < input.maxLength) {
          input.style.borderColor = `crimson`;
               } else {
          input.style.borderColor = `green`;
               };
          });
     });

     // Validate card issuer
     if (cardNumberInputs[0].value[0] === "2") {
          cardIssuer.innerHTML = "Mastercard";
     } else if (cardNumberInputs[0].value[0] === "3") {
          cardIssuer.innerHTML = "American Express";
     } else if (cardNumberInputs[0].value[0] === "4") {
          cardIssuer.innerHTML = "Visa";
     } else if (cardNumberInputs[0].value[0] === "5") {
          cardIssuer.innerHTML = "Mastercard";
     } else {
          cardIssuer.innerHTML = "Verve";
     }

     if (cardNumberInputs[3].value.length > 3) {
          cardNumberInputs[3].blur();
     };

     if (cardHolderNameInput.value.length < 1) {
          cardHolderNameInput.style.borderColor = `crimson`;
     } else {
          cardHolderNameInput.style.borderColor = `green`;
     }
     
     // update dom with card details
     let value = ``;
     cardNumberInputs.forEach(input => {
          value += `<span>${input.value}</span>`;
     });
     cardNumber.innerHTML = value;
     cardHolderName.innerHTML = cardHolderNameInput.value;

     if (cvvInput.value.length < 3) {
          cvvInput.style.borderColor = `crimson`;
     } else if (cvvInput.value.length > 4) {
          cvvInput.style.borderColor = `crimson`;
     } else {
          cvvInput.style.borderColor = `green`;
     }
});

form.addEventListener("submit", e => {
     e.preventDefault();
const inputs = form.querySelectorAll("input");
     inputs.forEach(input => {
          if (input.value === "") {
               input.style.borderColor = `crimson`;
               alert.style.display = "block";
               alert.style.color = "crimson";
               alert.innerHTML = `
      <p>Your details are incorrect!</p>`;
          } else if (cvvInput.value.length < 3) {
               alert.style.color = "crimson";
               alert.innerHTML = `
      <p>Your details are incorrect!</p>`;
          } else if (cvvInput.value.length > 4) {
               alert.style.color = "crimson";
               alert.innerHTML = `
      <p>Your details are incorrect!</p>`;
          } else if (month.value === "") {
               month.style.borderColor = "crimson";
               alert.innerHTML = `
      <p>Your details are incorrect!</p>`;
          } else if (year.value === "") {
               year.style.borderColor = "crimson";
               alert.innerHTML = `
      <p>Your details are incorrect!</p>`;
          } else {
               input.style.borderColor = `green`;
               month.style.borderColor = "green";
               year.style.borderColor = "green";
               alert.style.display = "block";
               alert.style.color = "green";
               alert.innerHTML = `
      <p>Your payment was successful!</p>`;
          }
     });
})
