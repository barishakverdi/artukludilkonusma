// import Lenis from 'lenis'
import { gsap } from "gsap";
// import { CustomEase } from "gsap/CustomEase";
// import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);
window.gsap = gsap;

// Initialize Lenis
/* const lenis = new Lenis({
    duration: 1.2,
    syncTouch: true,
    // easing: function(x) {
    //     return 1 - Math.cos((x * Math.PI) / 2);
    // }
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0); */

/* --- Preloader --- */
const preloader = document.getElementById("preloader");
if (preloader) {
  const progressBar = preloader.querySelector("#preloader-progress"),
    logo = preloader.querySelector(".logo-svg");

  logo.classList.add("active");

  let progress = 0;
  let loadComplete = false;
  let animationStartTime = null;
  const totalDuration = 1500; // 1.5 seconds after page load

  // Mark page as loaded
  window.addEventListener('load', () => {
    loadComplete = true;
    animationStartTime = performance.now();
  });

  // Animate counter and progress bar
  const animatePreloader = (currentTime) => {
    if (!animationStartTime) {
      requestAnimationFrame(animatePreloader);
      return;
    }

    const elapsed = currentTime - animationStartTime;
    progress = Math.min((elapsed / totalDuration) * 100, 100);

    // Update progress bar width
    progressBar.style.width = progress + '%';

    if (progress < 100) {
      requestAnimationFrame(animatePreloader);
    } else {
      // Preloader complete - fade out
      setTimeout(() => {
        preloader.classList.add("fade-out");

        setTimeout(() => {
          /* Scroll Toggle */
          const scrollToggle = document.querySelectorAll("[data-animation]");
          if (scrollToggle && scrollToggle.length > 0) {
            scrollToggle.forEach((el) => {
              const anim = ScrollTrigger.create({
                trigger: el,
                start: "top bottom",
                end: "top bottom-=10%",
                toggleClass: "animate",
                markers: false,
                once: true,
              });
            });
          }
        }, 300);
      }, 100);
    }
  };

  // Start animation immediately (will wait for load event internally)
  requestAnimationFrame(animatePreloader);
}
/* --- Preloader --- */
