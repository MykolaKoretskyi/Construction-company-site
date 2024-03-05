const servicesSection = document.getElementById("services");
const screenWidth = window.innerWidth;

document.addEventListener("DOMContentLoaded", function () {
  createRowsCards(servicesSection, getNumberCardInRow());
});

function getNumberCardInRow() {
  if (screenWidth <= 480) {
    return 1;
  } else if (screenWidth <= 768) {
    return 2;
  } else if (screenWidth <= 914) {
    return 3;
  } else if (screenWidth <= 1280) {
    return 4;
  }
  return 5;
}

function createRowsCards(servicesSection, numb) {
  const serviceslist = servicesSection.querySelectorAll(".service-article");

  let rowHtml = document.createElement("div");
  rowHtml.classList.add("row-services");

  for (let i = 1; i < serviceslist.length + 1; i++) {
    rowHtml.appendChild(serviceslist[i - 1]);
    if (i % numb == 0) {
      servicesSection.appendChild(rowHtml);
      rowHtml = document.createElement("div");
      rowHtml.classList.add("row-services");
    }
  }
  servicesSection.appendChild(rowHtml);
}

window.addEventListener("resize", function () {
  const newScreenWidth = window.innerWidth;

  if (newScreenWidth <= 480) {
    createRowsCards(servicesSection, 1);
  } else if (newScreenWidth <= 768) {
    createRowsCards(servicesSection, 2);
  } else if (newScreenWidth <= 914) {
    createRowsCards(servicesSection, 3);
  } else if (newScreenWidth <= 1280) {
    createRowsCards(servicesSection, 4);
  } else {
    createRowsCards(servicesSection, 5);
  }
});
