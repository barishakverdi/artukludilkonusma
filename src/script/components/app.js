/* ------- Smart Menu ------- */
const SCROLL_THRESHOLD = 100;
let lastScrollY = 0;
let ticking = false;

function updateScrollDirection() {
    const currentScrollY = window.scrollY;

    if (currentScrollY <= 0) {
        document.body.classList.remove("scrolling-down", "scrolling-up");
        lastScrollY = 0;
    } else if (currentScrollY > SCROLL_THRESHOLD) {
        if (currentScrollY > lastScrollY) {
            document.body.classList.add("scrolling-down");
            document.body.classList.remove("scrolling-up");
        } else if (currentScrollY < lastScrollY) {
            document.body.classList.add("scrolling-up");
        }
    }

    lastScrollY = currentScrollY;
    ticking = false;
}

function handleScroll() {
    if (!ticking) {
        window.requestAnimationFrame(updateScrollDirection);
        ticking = true;
    }
}

window.addEventListener("scroll", handleScroll);
updateScrollDirection();
/* ------- Smart Menu ------- */

/* Scroll To */

const scrollToElements = document.querySelectorAll("[data-scroll-to]");
window.scrollToFunc = (target, duration, offset) => {
    gsap.to(window, {
        scrollTo: {
            y: target,
            offsetY: offset,
        },
        duration: duration,
    });
};

if (scrollToElements.length > 0) {
    scrollToElements.forEach((el, i) => {
        const options = el.getAttribute("data-scroll-to").split("|");
        // data-scroll-to="#section-0|0.5|100"

        const target = options[0],
            duration = parseInt(options[1]) ?? 0.5,
            offset = parseInt(options[2]) ?? 0;

        el.addEventListener("click", (e) => {
            e.preventDefault();
            e.stopPropagation();
            if (document.querySelector(target)) scrollToFunc(target, duration, offset);
        });
    });
}

/* Scroll To */
