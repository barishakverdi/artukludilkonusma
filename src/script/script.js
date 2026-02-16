import Alpine from 'alpinejs';
import collapse from '@alpinejs/collapse';
import component from 'alpinejs-component';

Alpine.plugin(component);
Alpine.plugin(collapse);
window.Alpine = Alpine;
Alpine.start();

import "./components/gsap.js"
import "./components/carousel.js"
import "./components/fancybox.js"
