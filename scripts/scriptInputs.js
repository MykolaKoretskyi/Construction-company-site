const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const addressInput = document.getElementById("address-input");

function sendEmail() {
  let params = {
    nameValue: nameInput.value,
    lastNameValue: lastNameInput.value,
    emailValue: emailInput.value,
    phoneValue: phoneInput.value,
    addressValue: addressInput.value,
  };

  emailjs.send("service_g60qzha", "template_y0rvdn7", params).then(function () {
    alert("Успішно відправлено! \n" + message);
  });
}
