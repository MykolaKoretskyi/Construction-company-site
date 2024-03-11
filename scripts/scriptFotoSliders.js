const designingSrcArray = [
  "./assets/services/min-designing-1.jpg",
  "./assets/services/min-designing-2.jpg",
  "./assets/services/min-designing-3.jpg",
  "./assets/services/min-designing-4.jpg",
  "./assets/services/min-designing-5.jpg",
  "./assets/services/min-designing-6.jpg",
  "./assets/services/min-designing-7.jpg",
  "./assets/services/min-designing-8.jpg",
];

const constructionSrcArray = [
  "./assets/services/min-construction-1.jpg",
  "./assets/services/min-construction-2.jpg",
  "./assets/services/min-construction-3.jpg",
  "./assets/services/min-construction-4.jpg",
  "./assets/services/min-construction-5.jpg",
  "./assets/services/min-construction-6.jpg",
  "./assets/services/min-construction-7.jpg",
  "./assets/services/min-construction-8.jpg",
  "./assets/services/min-construction-9.jpg",
  "./assets/services/min-construction-10.jpg",
];

const interiorSrcArray = [
  "./assets/services/min-interior-1.jpg",
  "./assets/services/min-interior-2.jpg",
  "./assets/services/min-interior-3.jpg",
  "./assets/services/min-interior-4.jpg",
  "./assets/services/min-interior-5.jpg",
  "./assets/services/min-interior-6.jpg",
  "./assets/services/min-interior-7.jpg",
  "./assets/services/min-interior-8.jpg",
  "./assets/services/min-interior-9.jpg",
];

const networksSrcArray = [
  "./assets/services/min-networks-1.jpg",
  "./assets/services/min-networks-2.jpg",
  "./assets/services/min-networks-3.jpg",
  "./assets/services/min-networks-4.jpg",
  "./assets/services/min-networks-5.jpg",
  "./assets/services/min-networks-6.jpg",
  "./assets/services/min-networks-7.jpg",
  "./assets/services/min-networks-8.jpg",
];

const landscapeSrcArray = [
  "./assets/services/min-landscape-1.jpg",
  "./assets/services/min-landscape-2.jpg",
  "./assets/services/min-landscape-3.jpg",
  "./assets/services/min-landscape-4.jpg",
  "./assets/services/min-landscape-5.jpg",
  "./assets/services/min-landscape-6.jpg",
  "./assets/services/min-landscape-7.jpg",
  "./assets/services/min-landscape-8.jpg",
  "./assets/services/min-landscape-9.jpg",
];
// Gets the slider element by its id.
const designingSlider = document.getElementById("designingSlider");
const constructionSlider = document.getElementById("constructionSlider");
const interiorSlider = document.getElementById("interiorSlider");
const networksSlider = document.getElementById("networksSlider");
const landscapeSlider = document.getElementById("landscapeSlider");

const widthScreen = window.innerWidth;
let numbLinkFotoInRow;

document.addEventListener("DOMContentLoaded", function () {
  numbLinkFotoInRow = getNumberLinkFotoInRow();
  createSliderLinks(designingSrcArray, designingSlider);
  createSliderLinks(constructionSrcArray, constructionSlider);
  createSliderLinks(interiorSrcArray, interiorSlider);
  createSliderLinks(networksSrcArray, networksSlider);
  createSliderLinks(landscapeSrcArray, landscapeSlider);
});

function getNumberLinkFotoInRow() {
  if (widthScreen <= 480) {
    return 1;
  } else if (widthScreen <= 914) {
    return 2;
  } else if (widthScreen <= 1024) {
    return 3;
  } else if (widthScreen <= 1400) {
    return 4;
  }
  return 5;
}

window.addEventListener("resize", function () {
  const newScreenWidth = window.innerWidth;

  if (newScreenWidth <= 480) {
    numbLinkFotoInRow = 1;
  } else if (newScreenWidth <= 914) {
    numbLinkFotoInRow = 2;
  } else if (newScreenWidth <= 1024) {
    numbLinkFotoInRow = 3;
  } else if (newScreenWidth <= 1400) {
    numbLinkFotoInRow = 4;
  } else {
    numbLinkFotoInRow = 5;
  }
  clearSlider(designingSlider);
  clearSlider(constructionSlider);
  clearSlider(interiorSlider);
  clearSlider(networksSlider);
  clearSlider(landscapeSlider);

  createSliderLinks(designingSrcArray, designingSlider);
  createSliderLinks(constructionSrcArray, constructionSlider);
  createSliderLinks(interiorSrcArray, interiorSlider);
  createSliderLinks(networksSrcArray, networksSlider);
  createSliderLinks(landscapeSrcArray, landscapeSlider);
});

function clearSlider(sliderContainer) {
  while (sliderContainer.firstChild) {
    sliderContainer.removeChild(sliderContainer.firstChild);
  }
}

function createSliderLinks(idArray, sliderLine) {
  const scrollWidth = document.documentElement.scrollWidth;
  for (let index = 0; index < idArray.length; index++) {
    let newLink = document.createElement("a");
    newLink.classList.add("slide", "popup-link");
    newLink.style.display = "flex";
    newLink.style.justifyContent = "center";
    newLink.style.alignItems = "center";
    newLink.href = "#popup";

    if (index == 1) {
      newLink.id = "imageLink";
    }
    let newImage = document.createElement("img");

    newImage.src = idArray[index];
    newImage.alt = "image";
    newImage.style.margin = "1vw";

    if (numbLinkFotoInRow <= 2) {
      newImage.style.margin = "1.5vw";
    }
    newImage.style.width =
      scrollWidth * 0.98 * (1 / numbLinkFotoInRow - 0.02) + "px";
    newImage.style.maxHeight =
      scrollWidth * 0.98 * (1 / numbLinkFotoInRow - 0.02) + "px";

    newImage.setAttribute("dataIndex", index);

    newImage.style.transition = "transform 0.2s ease-in-out";

    newImage.addEventListener("mouseenter", function () {
      newImage.style.transform = "scale(1.1)";
    });

    newImage.addEventListener("mouseleave", function () {
      newImage.style.transform = "scale(1)";
    });

    newLink.appendChild(newImage);
    sliderLine.appendChild(newLink);

    setListenerPopup(newLink);
  }
}

// Sets a link click listener and opens a popup.
function setListenerPopup(popupLink) {
  popupLink.addEventListener("click", function (event) {
    let popupName = popupLink.getAttribute("href").replace("#", "");
    let currentPopup = document.getElementById(popupName);
    let clickedElement = event.target;

    createPaginationInPoup(clickedElement.closest(".slider"));

    let dots = document.querySelectorAll(".dot");
    dots[clickedElement.getAttribute("dataIndex")].classList.add("active");
    document.querySelector(".imgPopup").src = clickedElement
      .getAttribute("src")
      .replace("min-", "");

    popupOpen(currentPopup);
    event.preventDefault();
  });
}

// Sets a click listener on an element
// with the "close-popup" class and closes the popup when clicked.
const closeElements = document.querySelectorAll(".close-popup");

if (closeElements.length > 0) {
  closeElements.forEach(function (closeElement) {
    closeElement.addEventListener("click", function (event) {
      closePopup(closeElement);
      event.preventDefault();
    });
  });
}

function closePopup(closeElement) {
  document.body.style.overflow = "auto";
  closeElement.closest(".pop-up").classList.remove("open");
  removePagination(closeElement.closest(".pop-up"));
  closeElement.parentNode.querySelector(".imgPopup").src = "";
}

// Opens a popup and sets a click listener,
// if clicked outside the popup then closes the popup.
function popupOpen(curentPopup) {
  if (curentPopup) {
    document.body.style.overflow = "hidden";
    curentPopup.classList.add("open");
    curentPopup.addEventListener("click", function (event) {
      if (!event.target.closest(".popup-content")) {
        closePopup(curentPopup);
        event.preventDefault();
      }
    });
  }
}

function createPaginationInPoup(thisSlider) {
  let slideElements = thisSlider.querySelectorAll(".slide");
  let srcFotoArray = [];

  const paginationContainer = document.querySelector(".pagination-foto");

  slideElements.forEach(function (slideElement, index) {
    let imgElement = slideElement.querySelector("img");
    let dataFotoSrc = imgElement.getAttribute("src");
    srcFotoArray.push(dataFotoSrc.replace("min-", ""));
    const dot = document.createElement("div");
    dot.classList.add("dot");
    paginationContainer.appendChild(dot);
    dot.addEventListener("click", function () {
      openThisFoto(srcFotoArray, index);
    });
  });
}

// Opens the video pointed to by the user on
// the pagination ribbon without closing the popup
function openThisFoto(srcFotoArray, index) {
  document.querySelector(".imgPopup").src = srcFotoArray[index];
  let dots = document.querySelectorAll(".dot");

  dots.forEach(function (dot, i) {
    dot.classList.remove("active");
    dot.classList.toggle("active", i === index);
  });
}

// Removes pagination elements when closing the popup.
function removePagination(curentPopup) {
  let dots = curentPopup.querySelectorAll(".dot");
  dots.forEach(function (dot) {
    dot.remove();
  });
}

// Scrolls the slides back one.
document.querySelectorAll(".prev").forEach(function (prevButton) {
  prevButton.addEventListener("click", function (event) {
    scrollSlider(-1, event.target);
  });
});

// Scrolls the slides forward one.
document.querySelectorAll(".next").forEach(function (nextButton) {
  nextButton.addEventListener("click", function (event) {
    scrollSlider(1, event.target);
  });
});

// Scrolls through the slides.
function scrollSlider(direction, clickedElement) {
  let element = document.getElementById("imageLink");
  let scrollAmount = element.getBoundingClientRect().width;
  let thisSlider = clickedElement.parentNode.querySelector(".slider");
  let currentScrollLeft = thisSlider.scrollLeft;
  let newScrollLeft = currentScrollLeft + direction * scrollAmount;
  thisSlider.style.scrollBehavior = "smooth";
  thisSlider.scrollLeft = newScrollLeft;

  setTimeout(function () {
    thisSlider.style.scrollBehavior = "auto";
  }, 500);
}

// Closes the popup when pressing "Esc" on the keyboard.
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    let popupActive = document.querySelector(".pop-up.open");
    closePopup(popupActive);
    removePagination(popupActive);
    event.preventDefault();
  }
});
