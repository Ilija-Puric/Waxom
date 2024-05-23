import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";

export const initilizeSwiper = () => {
  const swiperHero = new Swiper(".swiper", {
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
};
