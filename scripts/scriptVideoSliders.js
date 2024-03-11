// This script creates a slider for storing and scrolling videos on a web page.
// It is designed in such a way that it is possible to add several such sliders to one page.

// Constanta stores an array of identifiers of videos posted on the Vimeo website.
const firstIdArray = [
  "139298823",
  "180408116",
  "447057126",
  "138649316",
  "64863881",
  "14479112",
  "13502151",
  "792484290",
  "61684753",
];

// Gets the slider element by its id.
const firstSlider = document.getElementById("firstSlider");

const secondIdArray = [
  "763500637",
  "568961954",
  "184884029",
  "159270931",
  "447462603",
  "139495135",
  "285380948",
  "426368935",
];

// Gets the slider element by its id.
const secondSlider = document.getElementById("secondSlider");
const widthScreen = window.innerWidth;
let numbLinkVideoInRow = 4;

const cachedThumbnails =
  JSON.parse(localStorage.getItem("vimeoThumbnails")) || {};

document.addEventListener("DOMContentLoaded", function () {
  numbLinkVideoInRow = getNumberLinkVideoInRow();
  createSliderLinks(firstIdArray, firstSlider);
  createSliderLinks(secondIdArray, secondSlider);
});

function getNumberLinkVideoInRow() {
  if (widthScreen <= 480) {
    return 1;
  } else if (widthScreen <= 914) {
    return 2;
  } else if (widthScreen < 1280) {
    return 3;
  }
  return 4;
}

window.addEventListener("resize", function () {
  const newScreenWidth = window.innerWidth;

  if (newScreenWidth <= 480) {
    numbLinkVideoInRow = 1;
  } else if (newScreenWidth <= 914) {
    numbLinkVideoInRow = 2;
  } else if (newScreenWidth < 1280) {
    numbLinkVideoInRow = 3;
  } else {
    numbLinkVideoInRow = 4;
  }
  clearSlider(firstSlider);
  clearSlider(secondSlider);

  createSliderLinks(firstIdArray, firstSlider);
  createSliderLinks(secondIdArray, secondSlider);
});

function clearSlider(sliderContainer) {
  while (sliderContainer.firstChild) {
    sliderContainer.removeChild(sliderContainer.firstChild);
  }
}

async function createSliderLinks(idArray, sliderLine) {
  const scrollWidth = document.documentElement.scrollWidth;
  for (let index = 0; index < idArray.length; index++) {
    const videoId = idArray[index];
    const thumbnailUrl = await getVimeoThumbnailAsync(videoId);
    createLink(thumbnailUrl, index);
  }

  async function getVimeoThumbnailAsync(videoId) {
    const cachedThumbnail = cachedThumbnails[videoId];
    if (cachedThumbnail) {
      return cachedThumbnail;
    } else {
      const thumbnailUrl = await new Promise((resolve) => {
        getVimeoThumbnail(videoId, function (thumbnailUrl) {
          resolve(thumbnailUrl);
        });
      });

      cachedThumbnails[videoId] = thumbnailUrl;
      localStorage.setItem("vimeoThumbnails", JSON.stringify(cachedThumbnails));

      return thumbnailUrl;
    }
  }

  function createLink(thumbnailUrl, index) {
    let newLink = document.createElement("a");
    newLink.classList.add("slide", "popup-link");
    newLink.style.display = "flex";
    newLink.style.justifyContent = "center";
    newLink.style.alignItems = "center";
    newLink.href = "#popup";

    let newImage = document.createElement("img");
    newImage.classList.add("slide-img");
    newImage.src = thumbnailUrl;
    newImage.alt = "image";

    newImage.style.margin = "1vw";
    if (numbLinkVideoInRow <= 2) {
      newImage.style.margin = "1.5vw";
    }
    newImage.style.width =
      scrollWidth * 0.98 * (1 / numbLinkVideoInRow - 0.02) + "px";
    newImage.style.maxHeight =
      scrollWidth * 0.98 * (1 / numbLinkVideoInRow - 0.02) + "px";
    newImage.setAttribute("dataVideoId", idArray[index]);
    newImage.setAttribute("dataIndex", index);

    newLink.appendChild(newImage);
    sliderLine.appendChild(newLink);

    setListenerPopup(newLink);
  }
}

// Gets a video clip thumbnail by ID.
function getVimeoThumbnail(videoId, callback) {
  let apiUrl = "https://vimeo.com/api/v2/video/" + videoId + ".json";
  let xhr = new XMLHttpRequest();

  xhr.open("GET", apiUrl, true);
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        let response = JSON.parse(xhr.responseText);
        let thumbnailUrl = response[0].thumbnail_large;
        callback(thumbnailUrl);
      } else {
        callback("./assets/default.jpg");
        console.error("Vimeo API request error:", xhr.status, xhr.statusText);
      }
    }
  };
  xhr.send();
}

// Sets a link click listener and opens a popup.
function setListenerPopup(popupLink) {
  popupLink.addEventListener("click", function (event) {
    let popupName = popupLink.getAttribute("href").replace("#", "");
    let currentPopup = document.getElementById(popupName);
    let clickedElement = event.target;

    createPaginationInPoup(clickedElement.closest(".slider"));

    let videoUrl =
      "https://player.vimeo.com/video/" +
      clickedElement.getAttribute("dataVideoId") +
      "?autoplay=1&loop=1&autopause=0";

    let dots = document.querySelectorAll(".dot");
    dots[clickedElement.getAttribute("dataIndex")].classList.add("active");

    document.querySelector(".iframe").src = videoUrl;

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
      removePagination(closeElement.closest(".pop-up"));
      event.preventDefault();
    });
  });
}

function closePopup(closeElement) {
  let iframeElements = document.querySelectorAll(".iframe");
  iframeElements.forEach(function (iframeElement) {
    iframeElement.src = "";
  });
  document.body.style.overflow = "auto";
  closeElement.closest(".pop-up").classList.remove("open");
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
        removePagination(curentPopup);
        event.preventDefault();
      }
    });
  }
}

function createPaginationInPoup(thisSlider) {
  let slideElements = thisSlider.querySelectorAll(".slide");
  let idVideoArray = [];

  const paginationContainer = document.querySelector(".pagination");

  slideElements.forEach(function (slideElement, index) {
    let imgElement = slideElement.querySelector("img");
    let dataVideoId = imgElement.getAttribute("dataVideoId");
    idVideoArray.push(dataVideoId);

    const dot = document.createElement("div");
    dot.classList.add("dot");
    paginationContainer.appendChild(dot);

    dot.addEventListener("click", function () {
      openThisVideo(idVideoArray, index);
    });
  });
}

// Opens the video pointed to by the user on
// the pagination ribbon without closing the popup.
function openThisVideo(idVideoArray, index) {
  let videoId = idVideoArray[index];

  let videoUrl =
    "https://player.vimeo.com/video/" +
    videoId +
    "?autoplay=1&loop=1&autopause=0";

  document.querySelector(".iframe").src = videoUrl;
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
  let thisSlider = clickedElement.parentNode.querySelector(".slider");
  let element = thisSlider.querySelector(".slide");
  let scrollAmount = element.getBoundingClientRect().width * direction;

  thisSlider.scrollTo({
    left: thisSlider.scrollLeft + scrollAmount,
    behavior: "smooth",
  });
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
