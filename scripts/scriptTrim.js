document.addEventListener("DOMContentLoaded", function () {
  const pServices = document.querySelectorAll(".p-service");
  trimListText(pServices, 210);
});

function trimListText(elements, limit) {
  elements.forEach((element) => {
    element.setAttribute("data-short-text", element.innerHTML);
    element.innerHTML = element.innerHTML.substring(0, limit) + "...";
  });
}

function expandText(element) {
  const imgSrc = element.querySelector(".service-img").getAttribute("src");
  const title = element.querySelector(".service-inscription").textContent;
  const shortText = element
    .querySelector(".p-service")
    .getAttribute("data-short-text");
  openModal(imgSrc, title, shortText);
}

function openModal(imgSrc, title, content) {
  const modal = document.getElementById("myModal");
  const modalContent = document.getElementById("modalContent");
  modalContent.querySelector(".service-img").setAttribute("src", imgSrc);
  modalContent.querySelector(".modal-inscription").textContent = title;
  modalContent.querySelector(".p-modal").innerHTML = content;
  modal.style.display = "flex";
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    modal.style.opacity = 1;
    modal.style.visibility = "visible";
  }, 50);
  modal.addEventListener("click", function (event) {
    if (!event.target.closest(".modal-box")) {
      closeModal(modal);
      event.preventDefault();
    }
  });
}

function closeModal(modal) {
  modal.style.opacity = 0;

  setTimeout(() => {
    modal.style.visibility = "hidden";
  }, 300);
  document.body.style.overflow = "auto";
}

// Closes the popup when pressing "Esc" on the keyboard.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeModal(document.querySelector("#myModal"));
    event.preventDefault();
  }
});
