(function ($) {
  "use strict";

  jQuery(function () {
    gsap.registerPlugin(
      ScrollTrigger,
      ScrollToPlugin,
      SplitText,
      Observer
    );

    const panels = $(".panel");
    let currentIndex = 0;
    let animating = false;

    function scrollToPanel(index) {
      if (index < 0 || index >= panels.length) return;
      animating = true;

      const scrollPos = index * window.innerHeight;

      gsap.to(window, {
        scrollTo: { y: scrollPos },
        duration: 1,
        ease: "power1.inOut",
        onComplete: () => (animating = false),
      });

      currentIndex = index;
    }

    // Use Observer to handle wheel, touch, pointer for desktop + mobile
    Observer.create({
      type: "wheel,touch,pointer",
      wheelSpeed: -1,
      onUp: () => {
        if (!animating && currentIndex > 0) scrollToPanel(currentIndex - 1);
      },
      onDown: () => {
        if (!animating && currentIndex < panels.length - 1) scrollToPanel(currentIndex + 1);
      },
      tolerance: 10,
      preventDefault: true, // prevents default browser scroll
    });

    // Initialize first panel
    gsap.set(window, { scrollTo: 0 });

    // ===== Your hero panel animation =====
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
  });
})(jQuery);
