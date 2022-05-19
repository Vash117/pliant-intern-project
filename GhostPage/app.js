const navLinks = Array.from(document.querySelectorAll("nav a"));
const nav = document.querySelector("nav");
const navList = document.querySelector(".nav-list");
const names = ["Jonny Doe", "John Doe", "Johnathan Doe"];
const underscore = document.getElementById("underscore");
const slidesArr = Array.from(document.querySelectorAll(".carosel"));
const dots = document.querySelector(".dots");
const dotsArr = Array.from(document.querySelectorAll(".dot"));
const stepsToMove = slidesArr[0].getBoundingClientRect().width;
const nameElement = document.getElementById("testimonials-name");
const burgerMenu = document.querySelector(".burger");
const burgerLines = Array.from(document.querySelectorAll(".line"));
burgerMenu.addEventListener("click", showNav);
let isClicked = false;
let isInProgress = false;
dots.addEventListener("click", changeTestimonials);
navLinks.forEach((navLink) =>
  navLink.addEventListener("mouseenter", setUnderscore)
);
nav.addEventListener("mouseleave", () => {
  underscore.style.width = "0px";
});
function setUnderscore() {
  let cords = this.getBoundingClientRect();
  let NavCords = nav.getBoundingClientRect();
  underscore.style.width = cords.width + "px";
  underscore.style.transform = `translateX(${cords.x - NavCords.left}px)`;
}

function changeTestimonials(e = undefined) {
  isInProgress = true;
  if (e) {
    isClicked = true;
  } else {
    isClicked = false;
  }
  const curentSlide = document.querySelector(".curent-slide");
  let index;
  if (e) {
    if (e.target.classList.contains("dot")) {
      index = e.target.dataset.id;
    } else return;
  } else {
    index = slidesArr.indexOf(curentSlide);
  }

  let name;
  let nextSlide = e
    ? slidesArr[index]
    : slidesArr[index + 1 > 2 ? 0 : index + 1];
  if (curentSlide === nextSlide) return;
  dotsArr.forEach((dot) => dot.classList.remove("active"));
  if (e) {
    e.target.classList.add("active");
    name = names[index];
  } else {
    dotsArr[index + 1 > 2 ? 0 : index + 1].classList.add("active");
    name = names[index + 1 > 2 ? 0 : index + 1];
  }
  nameElement.innerText = name;
  nextSlide.style.transform = `translateX(0)`;
  curentSlide.style.transform = `translateX(100%)`;
  nextSlide.classList.add("curent-slide");
  curentSlide.classList.remove("curent-slide");
  isInProgress = false;
}

let timer = setInterval(autoChange, 5000);
function autoChange() {
  if (!isClicked) {
    if (!isInProgress) changeTestimonials();
  } else {
    isClicked = false;
  }
}

function showNav(e) {
  if (!navList.classList.contains("nav-shown")) {
    navList.classList.add("nav-shown");
    burgerMenu.classList.add("rotate");
    nav.classList.toggle("active-nav");
    burgerLines.forEach((line) => {
      if (line.classList.contains("top") || line.classList.contains("bottom")) {
        line.classList.add("hide");
      } else {
        if (
          burgerLines.some((line) => line.classList.contains("rotate-left"))
        ) {
          line.classList.add("rotate-right");
        } else {
          line.classList.add("rotate-left");
        }
      }
    });
  } else {
    navList.classList.remove("nav-shown");
    burgerMenu.classList.remove("rotate");
    nav.classList.toggle("active-nav");
    burgerLines.forEach((line) => {
      line.classList.remove("hide", "rotate-left", "rotate-right");
    });
  }
}
