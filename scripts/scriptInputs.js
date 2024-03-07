// Отримати посилання на інпути за їхніми ідентифікаторами
const nameInput = document.getElementById("name-input");
const lastNameInput = document.getElementById("last-name-input");
const emailInput = document.getElementById("email-input");
const phoneInput = document.getElementById("phone-input");
const addressInput = document.getElementById("address-input");

// Отримати посилання на кнопку
const submitButton = document.querySelector(".client-button");

// Додати обробник події для кнопки
submitButton.addEventListener("click", function () {
  // Отримати значення інпутів
  const nameValue = nameInput.value;
  const lastNameValue = lastNameInput.value;
  const emailValue = emailInput.value;
  const phoneValue = phoneInput.value;
  const addressValue = addressInput.value;

  // Створити повідомлення і вивести його
  const message = `Ім’я: ${nameValue}\nПрізвище: ${lastNameValue}\nEmail: ${emailValue}\nТелефон: ${phoneValue}\nАдреса: ${addressValue}`;
  alert(message);
});
