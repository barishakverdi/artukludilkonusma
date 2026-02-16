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