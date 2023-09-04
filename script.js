const cardIssuer = document.querySelector(".card_issuer");
const cardNumber = document.querySelector(".cardholder_number");
const form = document.querySelector(".payment_form");
const cardNumberInputs = document.querySelectorAll(".form_inputs input");
const cardHolderNameInput = document.querySelector("#card_holder");
const cardHolderName = document.querySelector("#card_holder_name");
const year = document.querySelector(".year");
const month = document.querySelector(".month");


const formValidation = () => {
     cardNumberInputs.forEach(input => {
     input.addEventListener("keydown", () => {
          if (input.value.length > input.maxLength) {
               input.nextElementSibling.focus();
          };
     });
});

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

     let value = ``;
     cardNumberInputs.forEach(input => {
          value += `<span>${input.value}</span>`;
     });
     cardNumber.innerHTML = value;

     cardHolderName.innerHTML = cardHolderNameInput.value;
     
}

form.addEventListener("keyup", () => {
     formValidation();
});

// let cardExpiryYear = new Date("2024");
// console.log(cardExpiryYear.getFullYear());
// for (let i = 0; i < 10; i++){
//      console.log(cardExpiryYear, i)
// }