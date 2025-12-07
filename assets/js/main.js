/* ==============
 ========= js documentation ==========================

 * template name: LuckyGenerals
 * version: 1.0
 * description: A Creative Company for People on a Mission.
 * author: LuckyGenerals
 * author-url: https://luckygenerals.com/

    ==================================================

     01. 
     -------------------------------------------------

    ==================================================
============== */

// (function ($) {
//   "use strict";

//   jQuery(function () {
//     gsap.registerPlugin(
//       ScrollTrigger,
//       ScrollSmoother,
//       ScrollToPlugin,
//       SplitText
//     );

//     gsap.config({ nullTargetWarn: false });

//     // smooth scroll to full section
//     const panels = gsap.utils.toArray(".panel");
//     let currentIndex = 0;
//     let isScrolling = false;
//     let scrollEnabled = true;

//     function setPanelHeights() {
//       const viewportHeight = window.innerHeight;
//       panels.forEach((panel) => {
//         const contentHeight = panel.scrollHeight;
//         panel.style.minHeight = Math.max(viewportHeight, contentHeight) + "px";
//       });
//     }

//     setPanelHeights();
//     window.addEventListener("resize", setPanelHeights);
//     window.addEventListener("orientationchange", setPanelHeights);

//     const smoother = ScrollSmoother.create({
//       wrapper: ".page-wrapper",
//       content: ".panel-wrapper",
//       smooth: 1.5,
//       effects: false,
//     });

//     function scrollToPanel(index) {
//       index = Math.max(0, Math.min(index, panels.length - 1));
//       if (currentIndex === index) return;

//       isScrolling = true;

//       gsap.to(window, {
//         scrollTo: { y: panels[index], autoKill: false },
//         duration: 1.2,
//         ease: "power2.out",
//         onComplete: () => {
//           isScrolling = false;
//           currentIndex = index;
//         },
//       });
//     }

//     let accumulatedDelta = 0;

//     window.addEventListener(
//       "wheel",
//       function (e) {
//         if (!scrollEnabled) return;

//         e.preventDefault();
//         if (isScrolling) return;

//         accumulatedDelta += e.deltaY;

//         if (accumulatedDelta >= 50) {
//           scrollToPanel(currentIndex + 1);
//           accumulatedDelta = 0;
//         } else if (accumulatedDelta <= -50) {
//           scrollToPanel(currentIndex - 1);
//           accumulatedDelta = 0;
//         }
//       },
//       { passive: false }
//     );

//     window.addEventListener("keydown", function (e) {
//       if (!scrollEnabled || isScrolling) return;

//       if (e.key === "ArrowDown") scrollToPanel(currentIndex + 1);
//       if (e.key === "ArrowUp") scrollToPanel(currentIndex - 1);
//     });

//     // pannel hero
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

//     // panel two
//     if ($(".panel-two").length > 0) {
//       document.fonts.ready.then(() => {
//         const lines = gsap.utils.toArray(".line-animation");
//         if (lines.length) {
//           gsap.set(lines, { opacity: 0, y: 0, visibility: "visible" });
//           let tl = gsap.timeline({
//             scrollTrigger: {
//               trigger: ".sticky-line-wrapper",
//               start: "top 80%",
//               end: "bottom top",
//               toggleActions: "play none none none",
//               markers: false,
//             },
//             delay: 0.37,
//           });
//           lines.forEach((line, index) => {
//             tl.to(
//               line,
//               { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
//               index * 0.3
//             );
//           });
//         }
//       });
//     }

//     // panel three
//     if ($(".panel-three").length > 0) {
//       const refirstTitle = document.querySelector(".stick-top");
//       let reoffset = window.innerHeight * 0.3;
//       let retargetScale = window.innerWidth < 992 ? 0.7 : 0.2;

//       ScrollTrigger.create({
//         trigger: ".panel-three",
//         start: `top -${reoffset}px`,
//         endTrigger: ".rcd",
//         end: "top top",
//         pin: refirstTitle,
//         pinSpacing: false,
//         scrub: 1.5,
//         onEnter: () => {
//           gsap.to(refirstTitle, {
//             scale: retargetScale,
//             transformOrigin: "top center",
//             duration: 1.5,
//             ease: "expo.out",
//           });
//         },
//         onLeaveBack: () => {
//           gsap.to(refirstTitle, {
//             scale: 1,
//             transformOrigin: "top center",
//             duration: 1.5,
//             ease: "expo.out",
//           });
//         },
//         markers: false,
//       });
//     }

//     // panel six
//     if ($(".panel-six").length > 0) {
//       ScrollTrigger.create({
//         trigger: ".panel-six",
//         start: "top center",
//         onEnter: () => gsap.to(".drf", { autoAlpha: 0, duration: 0.4 }),
//         onLeaveBack: () => gsap.to(".drf", { autoAlpha: 1, duration: 0.4 }),
//       });

//       const drf = document.querySelector(".drf");
//       const lastPanel = document.querySelector("#lastPanel");

//       drf.addEventListener("click", (e) => {
//         e.preventDefault();

//         const lastIndex = panels.length - 1;
//         currentIndex = lastIndex;
//         gsap.to(window, {
//           scrollTo: { y: lastPanel, autoKill: false },
//           duration: 1.2,
//           ease: "power3.out",
//           onComplete() {
//             isScrolling = false;
//             scrollEnabled = true;
//             sliderActive = false;
//           },
//         });
//       });
//     }

//     // Reset scroll on reload
//     $(window).on("beforeunload", function () {
//       $(window).scrollTop(0);
//     });
//   });
// })(jQuery);

// // shimmer animations
// if ($(".shimmer-chars").length > 0) {
//   document.addEventListener("DOMContentLoaded", function () {
//     const el = document.querySelector(".shimmer-chars");
//     const text = el.innerText;

//     el.innerHTML = text
//       .split("")
//       .map((char) =>
//         char === " "
//           ? `<span class="char space">&nbsp;</span>`
//           : `<span class="char">${char}</span>`
//       )
//       .join("");

//     const chars = el.querySelectorAll(".char");

//     let index = 0;
//     let isPaused = false;

//     function shimmerStep() {
//       if (isPaused) return;

//       chars.forEach((c) => c.classList.remove("active"));

//       for (let i = 0; i < 3; i++) {
//         chars[(index + i) % chars.length].classList.add("active");
//       }

//       index++;

//       if (index >= chars.length) {
//         isPaused = true;
//         setTimeout(() => {
//           index = 0;
//           isPaused = false;
//         }, 200);
//       }
//     }

//     setInterval(shimmerStep, 80);
//   });
// }

(function ($) {
  "use strict";

  jQuery(function () {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollSmoother,
      ScrollToPlugin,
      SplitText
    );

    gsap.config({ nullTargetWarn: false });

    const panels = gsap.utils.toArray(".panel");
    let currentIndex = 0;
    let isScrolling = false;
    let scrollEnabled = true;

    function setPanelHeights() {
      const viewportHeight = window.innerHeight;
      panels.forEach((panel) => {
        const contentHeight = panel.scrollHeight;
        panel.style.minHeight = Math.max(viewportHeight, contentHeight) + "px";
      });
    }

    setPanelHeights();
    window.addEventListener("resize", setPanelHeights);
    window.addEventListener("orientationchange", setPanelHeights);

    const smoother = ScrollSmoother.create({
      wrapper: ".page-wrapper",
      content: ".panel-wrapper",
      smooth: 1.5,
      effects: false,
    });

    // Smooth scroll to a panel
    function scrollToPanel(index) {
      index = Math.max(0, Math.min(index, panels.length - 1));
      if (currentIndex === index) return;

      isScrolling = true;

      gsap.to(window, {
        scrollTo: { y: panels[index], autoKill: false },
        duration: 1.2,
        ease: "power2.out",
        onComplete: () => {
          isScrolling = false;
          currentIndex = index;
        },
      });
    }

    let accumulatedDelta = 0;

    window.addEventListener(
      "wheel",
      function (e) {
        if (!scrollEnabled) return;

        e.preventDefault();
        if (isScrolling) return;

        accumulatedDelta += e.deltaY;

        if (accumulatedDelta >= 50) {
          scrollToPanel(currentIndex + 1);
          accumulatedDelta = 0;
        } else if (accumulatedDelta <= -50) {
          scrollToPanel(currentIndex - 1);
          accumulatedDelta = 0;
        }
      },
      { passive: false }
    );

    window.addEventListener("keydown", function (e) {
      if (!scrollEnabled || isScrolling) return;

      if (e.key === "ArrowDown") scrollToPanel(currentIndex + 1);
      if (e.key === "ArrowUp") scrollToPanel(currentIndex - 1);
    });

    // pannel hero
    if ($(".panel-hero").length > 0) {
      const firstTitle = document.querySelector(".first-title");
      const secondTitle = document.querySelector(".second-title");
      let offset = window.innerHeight * 0.25;
      let targetScale = window.innerWidth < 992 ? 0.5 : 0.2;

      ScrollTrigger.create({
        trigger: ".panel-hero",
        start: `top -${offset}px`,
        endTrigger: ".df",
        end: "top top",
        pin: firstTitle,
        pinSpacing: false,
        scrub: 1.5,
        onEnter: () => {
          gsap.to(firstTitle, {
            scale: targetScale,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "expo.out",
          });
          gsap.to(secondTitle, {
            scale: 0,
            opacity: 0,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(firstTitle, {
            scale: 1,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "expo.out",
          });
          gsap.to(secondTitle, {
            scale: 1,
            opacity: 1,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "expo.out",
          });
        },
        markers: false,
      });

      document.fonts.ready.then(() => {
        let firstSplit = new SplitText(firstTitle, { type: "words" });
        let secondSplit = new SplitText(secondTitle, { type: "words" });

        gsap.set([firstTitle, secondTitle], {
          opacity: 1,
          visibility: "visible",
        });
        gsap.set([firstSplit.words, secondSplit.words], {
          opacity: 0,
          scale: 1,
        });

        let tl = gsap.timeline({});

        tl.to(firstSplit.words, {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.2,
        }).to(
          secondSplit.words,
          {
            opacity: 1,
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.2,
          },
          "-=0.2"
        );
      });
    }

    // panel two
    if ($(".panel-two").length > 0) {
      document.fonts.ready.then(() => {
        const lines = gsap.utils.toArray(".line-animation");
        if (lines.length) {
          gsap.set(lines, { opacity: 0, y: 0, visibility: "visible" });
          let tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".sticky-line-wrapper",
              start: "top 80%",
              end: "bottom top",
              toggleActions: "play none none none",
              markers: false,
            },
            delay: 0.37,
          });
          lines.forEach((line, index) => {
            tl.to(
              line,
              { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
              index * 0.3
            );
          });
        }
      });
    }

    // panel three
    if ($(".panel-three").length > 0) {
      const refirstTitle = document.querySelector(".stick-top");
      let reoffset = window.innerHeight * 0.3;
      let retargetScale = window.innerWidth < 992 ? 0.7 : 0.2;

      ScrollTrigger.create({
        trigger: ".panel-three",
        start: `top -${reoffset}px`,
        endTrigger: ".rcd",
        end: "top top",
        pin: refirstTitle,
        pinSpacing: false,
        scrub: 1.5,
        onEnter: () => {
          gsap.to(refirstTitle, {
            scale: retargetScale,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "expo.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(refirstTitle, {
            scale: 1,
            transformOrigin: "top center",
            duration: 1.5,
            ease: "expo.out",
          });
        },
        markers: false,
      });
    }

    // panel six
    if ($(".panel-six").length > 0) {
      ScrollTrigger.create({
        trigger: ".panel-six",
        start: "top center",
        onEnter: () => gsap.to(".drf", { autoAlpha: 0, duration: 0.4 }),
        onLeaveBack: () => gsap.to(".drf", { autoAlpha: 1, duration: 0.4 }),
      });

      const drf = document.querySelector(".drf");
      const lastPanel = document.querySelector("#lastPanel");

      drf.addEventListener("click", (e) => {
        e.preventDefault();

        const lastIndex = panels.length - 1;
        currentIndex = lastIndex;
        gsap.to(window, {
          scrollTo: { y: lastPanel, autoKill: false },
          duration: 1.2,
          ease: "power3.out",
          onComplete() {
            isScrolling = false;
            scrollEnabled = true;
            sliderActive = false;
          },
        });
      });
    }

    // Reset scroll on reload
    $(window).on("beforeunload", function () {
      $(window).scrollTop(0);
    });
  });
})(jQuery);

// shimmer animations
if ($(".shimmer-chars").length > 0) {
  document.addEventListener("DOMContentLoaded", function () {
    const el = document.querySelector(".shimmer-chars");
    const text = el.innerText;

    el.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? `<span class="char space">&nbsp;</span>`
          : `<span class="char">${char}</span>`
      )
      .join("");

    const chars = el.querySelectorAll(".char");

    let index = 0;
    let isPaused = false;

    function shimmerStep() {
      if (isPaused) return;

      chars.forEach((c) => c.classList.remove("active"));

      for (let i = 0; i < 3; i++) {
        chars[(index + i) % chars.length].classList.add("active");
      }

      index++;

      if (index >= chars.length) {
        isPaused = true;
        setTimeout(() => {
          index = 0;
          isPaused = false;
        }, 200);
      }
    }

    setInterval(shimmerStep, 80);
  });
}
