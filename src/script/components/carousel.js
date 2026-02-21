import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const slider = new Swiper('.main-slider', {
    modules: [Navigation, Pagination, Autoplay],
    slidesPerView: 3,
    speed: 1000,
    resistance: false,
    resistanceRatio: 0,
    autoplay: {
        delay: 5000,
        pauseOnMouseEnter: true,
        disableOnInteraction: true
    },
    navigation: {
        prevEl: ".main-prev",
        nextEl: ".main-next",
        disabledClass: "disabled"
    },
    pagination: {
        el: ".main-pagination",
        clickable: true,
        bulletActiveClass: "active"
    }
})

const commentsSlider = new Swiper(".comments-slider", {
  modules: [Autoplay],
  slidesPerView: 1.2,
  spaceBetween: 16,
  speed: 3500,
  resistance: true,
  resistanceRatio: false,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  },
  breakpoints: {
    577: {
      slidesPerView: 2,
      spaceBetween: 20,
      speed: 5000,
    },
    1025: {
      slidesPerView: 2.6,
      spaceBetween: 20,
      speed: 5000,
    },
    1281: {
      slidesPerView: 3.4,
      spaceBetween: 24,
      speed: 5000,
    },
  },
});

const blogSlider = new Swiper(".blog-slider", {
  modules: [Navigation],
  slidesPerView: 1.2,
  spaceBetween: 16,
  speed: 700,
  resistance: true,
  resistanceRatio: false,
  navigation: {
    prevEl: ".blog-prev",
    nextEl: ".blog-next",
    disabledClass: "disabled"
  },
  breakpoints: {
    577: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1025: {
      slidesPerView: 3,
      spaceBetween: 24,
    }
  },
});