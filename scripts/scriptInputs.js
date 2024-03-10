const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const addressInput = document.getElementById("address-input");
const permissionSend = false;

function sendEmail(event) {
  event.preventDefault();
  let params = {
    nameValue: nameInput.value,
    lastNameValue: lastNameInput.value,
    emailValue: emailInput.value,
    phoneValue: phoneInput.value,
    addressValue: addressInput.value,
  };

  if (permissionSend) {
    emailjs
      .send("service_g60qzha", "template_y0rvdn7", params)
      .then(function () {
        alert("Успішно відправлено! ");
      });
  } else {
    alert(
      "Шановний " +
        nameInput.value +
        " " +
        lastNameInput.value +
        " \nдякую вам за інтерес до даного сайту \n" +
        "цей сайт розроблено як демо версію сайту, \n" +
        "тому ваші дані не будуть ніяким способом \n" +
        "оброблені або куди - небудь надіслані!"
    );
  }
}
