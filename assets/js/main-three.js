// (function ($) {
//   "use strict";

//   jQuery(function () {
//     gsap.registerPlugin(
//       ScrollTrigger,
//       ScrollToPlugin,
//       SplitText,
//       Observer
//     );

//     const panels = $(".panel");
//     let currentIndex = 0;
//     let animating = false;
//     let scrollDelta = 0; // accumulate small scrolls

//     function scrollToPanel(index) {
//       if (index < 0 || index >= panels.length) return;
//       animating = true;

//       const scrollPos = index * window.innerHeight;

//       gsap.to(window, {
//         scrollTo: { y: scrollPos },
//         duration: 1,
//         ease: "power1.inOut",
//         onComplete: () => (animating = false),
//       });

//       currentIndex = index;
//       scrollDelta = 0; // reset delta on new panel
//     }

//     // Observer handles wheel, touch, pointer
//     Observer.create({
//       type: "wheel,touch,pointer",
//       wheelSpeed: 0.5, // smaller = slower reaction to tiny wheel
//       onChangeY: (self) => {
//         if (animating) return;

//         scrollDelta += self.deltaY; // accumulate delta
//         const threshold = window.innerHeight * 0.25; // scroll threshold: 25% of viewport

//         if (scrollDelta >= threshold && currentIndex < panels.length - 1) {
//           scrollToPanel(currentIndex + 1);
//         } else if (scrollDelta <= -threshold && currentIndex > 0) {
//           scrollToPanel(currentIndex - 1);
//         }
//       },
//       tolerance: 5,
//       preventDefault: true,
//       dragMinimum: 10, // minimum swipe distance on touch
//       maxTouches: 1, // only 1 finger scroll
//     });

//     // Initialize first panel
//     gsap.set(window, { scrollTo: 0 });

//     // ===== Hero panel animation =====
//     if ($(".panel-hero").length > 0) {
//       const firstTitle = document.querySelector(".first-title");
//       const secondTitle = document.querySelector(".second-title");
//       let offset = window.innerHeight * 0.25;
//       let targetScale = window.innerWidth < 992 ? 0.5 : 0.2;

//       ScrollTrigger.create({
//         trigger: ".panel-hero",
//         start: `top -${offset}px`,
//         endTrigger: ".df",
//         end: "top top",
//         pin: firstTitle,
//         pinSpacing: false,
//         scrub: 1.5,
//         onEnter: () => {
//           gsap.to(firstTitle, {
//             scale: targetScale,
//             transformOrigin: "top center",
//             duration: 1.5,
//             ease: "expo.out",
//           });
//           gsap.to(secondTitle, {
//             scale: 0,
//             opacity: 0,
//             transformOrigin: "top center",
//             duration: 1.5,
//             ease: "expo.out",
//           });
//         },
//         onLeaveBack: () => {
//           gsap.to(firstTitle, {
//             scale: 1,
//             transformOrigin: "top center",
//             duration: 1.5,
//             ease: "expo.out",
//           });
//           gsap.to(secondTitle, {
//             scale: 1,
//             opacity: 1,
//             transformOrigin: "top center",
//             duration: 1.5,
//             ease: "expo.out",
//           });
//         },
//         markers: false,
//       });

//       document.fonts.ready.then(() => {
//         let firstSplit = new SplitText(firstTitle, { type: "words" });
//         let secondSplit = new SplitText(secondTitle, { type: "words" });

//         gsap.set([firstTitle, secondTitle], {
//           opacity: 1,
//           visibility: "visible",
//         });
//         gsap.set([firstSplit.words, secondSplit.words], {
//           opacity: 0,
//           scale: 1,
//         });

//         let tl = gsap.timeline({});
//         tl.to(firstSplit.words, {
//           opacity: 1,
//           scale: 1,
//           duration: 0.8,
//           ease: "power3.out",
//           stagger: 0.2,
//         }).to(
//           secondSplit.words,
//           {
//             opacity: 1,
//             scale: 1,
//             duration: 0.8,
//             ease: "power3.out",
//             stagger: 0.2,
//           },
//           "-=0.2"
//         );
//       });
//     }
//   });
// })(jQuery);

// (function ($) {
//   "use strict";
//   jQuery(function () {
//     gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, Observer);
//     const panels = gsap.utils.toArray(".panel");
//     let currentIndex = 0;
//     let animating = false;
//     function fixMobileVH() {
//       document.documentElement.style.setProperty(
//         "--vh",
//         window.innerHeight * 0.01 + "px"
//       );
//     }
//     fixMobileVH();
//     window.addEventListener("resize", fixMobileVH);
//     function scrollToPanel(index) {
//       if (index < 0 || index >= panels.length) return;
//       animating = true;
//       const viewportHeight = document.documentElement.clientHeight;
//       const scrollPos = index * viewportHeight;
//       gsap.to(window, {
//         scrollTo: { y: scrollPos },
//         duration: 1,
//         ease: "power2.out",
//         onComplete: () => (animating = false),
//       });
//       currentIndex = index;
//     }
//     Observer.create({
//       target: window,
//       type: "touch,wheel,pointer",
//       wheelSpeed: -1,
//       tolerance: 10,
//       preventDefault: true,
//       onDown: () => {
//         if (!animating) scrollToPanel(currentIndex - 1);
//       },
//       onUp: () => {
//         if (!animating) scrollToPanel(currentIndex + 1);
//       },
//       onWheel: (self) => {
//         if (animating) return;
//         if (self.deltaY > 0) {
//           scrollToPanel(currentIndex - 1);
//         } else {
//           scrollToPanel(currentIndex + 1);
//         }
//       },
//     });
//     gsap.set(window, { scrollTo: 0 });
//   });
// })(jQuery);



(function ($) {
  "use strict";

  jQuery(function () {
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText, Observer);

    const panels = gsap.utils.toArray(".panel");
    let currentIndex = 0;
    let animating = false;

    /* ---- FIX MOBILE TRUE VIEWPORT HEIGHT ---- */
    // function fixMobileVH() {
    //   // IMPORTANT: clientHeight is stable and doesn’t change on scroll
    //   const vh = document.documentElement.clientHeight * 0.01;
    //   document.documentElement.style.setProperty("--vh", `${vh}px`);
    // }
    // fixMobileVH();
    // window.addEventListener("resize", fixMobileVH);

    /* ---- Scroll To Panel (MATCHES CSS HEIGHT EXACTLY) ---- */
    function scrollToPanel(index) {
      if (index < 0 || index >= panels.length) return;
      animating = true;

      const viewportHeight = document.documentElement.clientHeight; // SAME as CSS
      const scrollPos = index * viewportHeight;

      gsap.to(window, {
        scrollTo: { y: scrollPos },
        duration: 1,
        ease: "power2.out",
        onComplete: () => (animating = false),
      });

      currentIndex = index;
    }

    /* ---- OBSERVER FOR MOBILE + DESKTOP ---- */
    Observer.create({
      target: window,
      type: "touch,wheel,pointer",
      wheelSpeed: -1,
      tolerance: 10,
      preventDefault: true,

      // Swipe DOWN → next
      onDown: () => {
        if (!animating) scrollToPanel(currentIndex - 1);
      },

      // Swipe UP → previous
      onUp: () => {
        if (!animating) scrollToPanel(currentIndex + 1);
      },

      // Mouse wheel
      onWheel: (self) => {
        if (animating) return;

        if (self.deltaY > 0) {
          scrollToPanel(currentIndex - 1);
        } else {
          scrollToPanel(currentIndex + 1);
        }
      },
    });

    /* ---- INIT ---- */
    gsap.set(window, { scrollTo: 0 });
  });
})(jQuery);
