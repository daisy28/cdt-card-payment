const cardContainer = document.querySelector(".card_container");
const form = document.querySelector(".payment_form");
const cardNumberInput = document.querySelector(".card_holder_number");


form.addEventListener("submit", (e) => {
     e.preventDefault();
     formValidation();
});

const formValidation = () => {
     console.log(cardNumberInput.value)
     console.log(cardNumberInput.value[0])
     console.log(cardNumberInput.value[1])
     if (cardNumberInput.value[0] === 2 || 5) {
          cardContainer.innerHTML = cardUI("Mastercard");
     } else if (cardNumberInput.value[0] === 4) {
          cardContainer.innerHTML = cardUI("Visa");
     } else if (cardNumberInput.value[0] === 3) {
          cardContainer.innerHTML = cardUI("American Express");
     } else {
          cardContainer.innerHTML = cardUI("Verve");
     }
}

const cardUI = (cardIssuer, cardHolder, expiry) => {
     return `
     <div class="payment_card">
                    <div class="card_details_one">
                         <img src="/assets/20230829_130215.jpg" alt="card-badge" class="class_badge">
                         <p>${cardIssuer}</p>
                    </div>
                    <div class="card_details_two">
                         <div>
                              <p class="card_owner_name">card holder</p>
                              <p>gloria ubah</p>
                         </div>

                         <div>
                              <p class="card_expiration">expires</p>
                              <p>29/10/2025</p>
                         </div>
                    </div>
               </div>
     `
}
