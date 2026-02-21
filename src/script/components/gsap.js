import Lenis from 'lenis'
import { gsap } from "gsap";
// import { CustomEase } from "gsap/CustomEase";
// import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
// import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
// import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger,ScrollToPlugin);

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
