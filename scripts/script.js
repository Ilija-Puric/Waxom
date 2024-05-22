import "../styles/styles.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import gsap from "gsap";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import { projects } from "./data";

const hamburger = document.querySelector(".js-hamburger");
const drawer = document.querySelector(".js-drawer");

const tl = gsap.timeline({});
gsap.set(".navigation__drawer .navigation__item", {
  opacity: 0,
  y: 15,
});
tl.to(drawer, {
  x: 0,
}).to(".navigation__drawer .navigation__item", {
  stagger: 0.03,
  opacity: 1,
  y: 0,
});
tl.pause();

const menuToggle = () => {
  hamburger.classList.toggle("open");
  drawer.classList.toggle("open");
  if (drawer.classList.contains("open")) {
    tl.play();
  } else {
    tl.reverse();
  }
};
hamburger.addEventListener("click", menuToggle);

// Swipper
const swiper = new Swiper(".swiper", {
  modules: [Navigation, Pagination],
  direction: "horizontal",
  loop: true,
  pagination: {
    el: ".swiper-pagination",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const swiperPosts = new Swiper(".postsSwiper", {
  modules: [Navigation],
  direction: "horizontal",
  loop: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  allowTouchMove: false,
  slidesPerView: 3,
  spaceBetween: 30,
});

// Video playing

const videoElement = document.querySelector("video");
const playPauseButton = document.querySelector(".video-control");
const videoTimeElement = document.querySelector(".video__time");

playPauseButton.addEventListener("click", () => {
  playPauseButton.classList.toggle("playing");
  if (playPauseButton.classList.contains("playing")) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
});

videoElement.addEventListener("ended", () => {
  playPauseButton.classList.remove("playing");
});

videoElement.addEventListener("timeupdate", () => {
  const currentTime = videoElement.currentTime;
  const minutes = Math.floor(currentTime / 60);
  const seconds = Math.floor(currentTime % 60);
  const formattedTime = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  videoTimeElement.textContent = formattedTime;
});

// Mock requests
const projectsList = document.querySelector(".projects__items");
const loadMoreBtn = document.querySelector("#load-btn");
let projectsHTML = ``;

const loadedProjects = projects.slice(0, 6);
loadedProjects.forEach((project) => {
  const camelCaseCategory = camelCase(project.category);
  project.category = camelCaseCategory;
});

const getProjectHTML = (project) => {
  return `
  <div class="projects__item grid__item" data-category="${project.category}">
  <img class="item__image" src="${project.image}" alt="${project.name}">
  <div class="item__controls">
    <div class="item__link"><i class="fa fa-link"></i></div>
    <div class="item__view"><i class="fa fa-eye"></i></div>
  </div>
  <div class="item__wrapper">
    <div class="item__triangle" style="clip-path: polygon(50% 70%, 0% 100%, 100% 100%);"></div>
    <p class="item__title">${project.name}</p>
    <p class="item__category">${project.category}</p>
  </div>
  </div>
  `;
};
loadedProjects.forEach((project) => (projectsHTML += getProjectHTML(project)));
projectsList.innerHTML = projectsHTML;

const handleLoadItems = () => {
  projectsHTML = ``;
  let projectsLoding = projects.slice(6, projects.length);
  projectsLoding.forEach((project) => {
    const camelCaseCategory = camelCase(project.category);
    project.category = camelCaseCategory;
  });

  loadedProjects.push(...projectsLoding);
  projectsLoding.forEach((project) => (projectsHTML += getProjectHTML(project)));
  projectsList.insertAdjacentHTML("beforeend", projectsHTML);
  loadMoreBtn.removeEventListener("click", handleLoadItems);
  loadMoreBtn.remove();
};
loadMoreBtn.addEventListener("click", handleLoadItems);

//Handle Search
const radioBtns = document.querySelectorAll("input[type='radio'");
console.log(radioBtns);

function camelCase(str) {
  return str
    .split(" ")
    .map((word, index) =>
      index === 0 ? word.toLowerCase() : word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join("");
}

radioBtns.forEach((radioBtn) => {
  radioBtn.addEventListener("click", (e) => {
    const { id } = e.target;
    let matchedProjects = loadedProjects.filter((project) => project.category === id);
    console.log(id);
    console.log(matchedProjects);
    if (id === "all") {
      matchedProjects = loadedProjects;
    }
    let projectsHTML = ``;
    matchedProjects.forEach((project) => (projectsHTML += getProjectHTML(project)));
    projectsList.innerHTML = projectsHTML;
  });
});
