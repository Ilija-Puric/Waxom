import "../styles/styles.scss";
import gsap from "gsap";

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
