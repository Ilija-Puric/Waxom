import "../styles/styles.scss";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import gsap from "gsap";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

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
