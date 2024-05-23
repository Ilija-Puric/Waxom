import gsap from "gsap";
import Lenis from "lenis";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);
const hamburger = document.querySelector(".js-hamburger");
const drawer = document.querySelector(".js-drawer");

const handleDrawer = () => {
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
};
const handleServices = () => {
  gsap.from(".services__card", {
    opacity: 0,
    autoAlpha: 0,
    y: 20,
    duration: 0.4,
    stagger: 0.2,
    scrollTrigger: {
      trigger: ".services",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
  });
};
const handleAbout = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".about",
      start: "top 50%",
      end: "bottom 350px",
      scrub: 1,
    },
    defaults: {
      duration: 0.25,
    },
  });

  tl.from(".about", {
    opacity: 0,
    autoAlpha: 0,
    duration: 0.4,
  })
    .from(
      ".section-title,.section-subtitle",
      {
        autoAlpha: 0,
        duration: 0.4,
        stagger: 0.25,
      },
      "<"
    )
    .from(
      ".about__image",
      {
        y: 100,
        autoAlpha: 0,
        duration: 0.3,
      },
      "<"
    )
    .from(".banner__title,.banner__text", {
      x: -50,
      opacity: 0,
      autoAlpha: 0,
      stagger: 0.2,
    })
    .from(".banner--sm .button--main", {
      x: -50,
      opacity: 0,
      autoAlpha: 0,
    });
};
const handleProjects = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".projects",
      start: "top 75%",
      end: "center center",
      scrub: 1,
    },
    defaults: {
      duration: 0.15,
    },
  });
  tl.from(".projects .section-title,.projects .section-subtitle", {
    y: 50,
  }).from(".projects__chip", {
    opacity: 0,
    autoAlpha: 0,
    stagger: 0.05,
  });
};
const handleVideo = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".video",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
    defaults: {
      duration: 0.25,
    },
  });
  tl.from(".video__content", {
    opacity: 0,
    autoAlpha: 0,
  }).from(".video-control,.video__title,.video__subtitle,.video__time", {
    y: 25,
    opacity: 0,
    stagger: 0.1,
  });
};
const handleMobile = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".mobile",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
    defaults: {
      duration: 0.15,
    },
  });
  tl.from(".mobile__image", {
    y: 100,
    duration: 0.25,
  })
    .from(".mobile__title,.mobile__text", {
      opacity: 0,
      x: -20,
      stagger: 0.1,
    })
    .from(".mobile__list li", {
      opacity: 0,
      x: -20,
      stagger: 0.05,
    });
};
const handleData = () => {
  gsap.from(".banner__item", {
    opacity: 0,
    autoAlpha: 0,
    x: -20,
    duration: 0.25,
    stagger: 0.1,
    scrollTrigger: {
      trigger: ".data",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
  });
};
const handlePosts = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".posts",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
  });
  tl.from(".posts .section-title,.posts .section-subtitle", {
    y: -20,
    duration: 0.25,
    stagger: 0.1,
  }).from(".posts .swiper-wrapper", {
    yPercent: 100,
  });
};
const handleSponsors = () => {
  gsap.from(".slider", {
    opacity: 0,
    scrollTrigger: {
      trigger: ".partners",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
  });
};

const handleFooter = () => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".read-more",
      start: "top 50%",
      end: "center center",
      scrub: 1,
    },
  });
  tl.from(".read-more__content", {
    opacity: 0,
    autoAlpha: 0,
    y: 20,
    stagger: 0.3,
  }).from(".footer__text", { opacity: 0, autoAlpha: 0, y: 20 });
};

const handleSmoothScroll = () => {
  const lenis = new Lenis();
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
};

const handlePageLoad = () => {
  document.body.classList.add("disable-scroll");
  document.addEventListener(
    "DOMContentLoaded",
    () => {
      const tl = gsap.timeline({
        onComplete: () => {
          document.body.classList.remove("disable-scroll");
        },
      });
      tl.to(".progress", {
        duration: 1,
        width: "100%",
        ease: "power1.inOut",
      });
      tl.to(".progress", {
        duration: 1,
        height: "100%",
        width: "100%",
        ease: "power1.inOut",
      });
      tl.to(".page__loader", {
        yPercent: -100,
        backgroundColor: "transparent",
      });
    },
    false
  );
};

export const setAnimations = () => {
  handleDrawer();
  handleServices();
  handleAbout();
  handleProjects();
  handleVideo();
  handleMobile();
  handleData();
  handlePosts();
  handleSponsors();
  handleFooter();
  handleSmoothScroll();
  handlePageLoad();
};
