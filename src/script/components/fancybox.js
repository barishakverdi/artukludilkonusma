import { Fancybox } from "@fancyapps/ui";

const commonFancyboxOptions = {
    theme: "dark",
    on: {
        init: () => {
            if (window.lenis) window.lenis.stop();
        },
        destroy: () => {
            if (window.lenis) window.lenis.start();
        },
    },
    dragToClose: window.innerWidth > 1024,
    placeFocusBack: false,
};

Fancybox.bind("[data-fancybox]", {
    ...commonFancyboxOptions,
  closeButton: false,
});
Fancybox.bind("[data-video-fancybox]", {
  ...commonFancyboxOptions,
  groupAttr: "data-video-fancybox",
});