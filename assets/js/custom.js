(function ($) {
	"use strict";

	jQuery(function () {

	});
})(jQuery);
gsap.registerPlugin(ScrollTrigger);

// Animate each panel
document.querySelectorAll('.panel').forEach((panel, i) => {

  // Pin the section while scrolling
  ScrollTrigger.create({
    trigger: panel,
    start: "top top",
    end: "+=100%", // each panel takes full viewport scroll
    pin: true,
    pinSpacing: false
  });

  // Optional: animate content inside the panel
  const content = panel.querySelector('.title-animation');
  if(content) {
    gsap.from(content, {
      opacity: 0,
      y: 100,
      duration: 1,
      scrollTrigger: {
        trigger: panel,
        start: "top center",
        end: "bottom center",
        scrub: true,
      }
    });
  }
});

// Optional: smooth snapping effect
ScrollTrigger.defaults({ 
  toggleActions: "play none none reverse"
});



gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

// Initialize vertical smoother
const smoother = ScrollSmoother.create({
  wrapper: ".page-wrapper",
  content: ".panel-wrapper",
  smooth: 0.5,
  effects: true,
});

// --- Horizontal scroll setup ---
const horizontalWrapper = document.querySelector(".horizontal-wrapper");
const horizontalSections = gsap.utils.toArray(".horizontal-wrapper .horizontal-section");

if (horizontalSections.length) {
  gsap.to(horizontalSections, {
    xPercent: -100 * (horizontalSections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: horizontalWrapper,
      pin: true,
      scrub: true,
      start: "top top",
      end: () => "+=" + horizontalWrapper.scrollWidth,
      invalidateOnRefresh: true,
      markers: true
    }
  });
}

// Optional: vertical snapping for normal panels
const panels = gsap.utils.toArray(".panel-wrapper > .panel");
let currentIndex = 0;
let isScrolling = false;

function scrollToPanel(index) {
  index = Math.max(0, Math.min(index, panels.length - 1));
  if (currentIndex === index) return;

  isScrolling = true;
  gsap.to(window, {
    scrollTo: { y: panels[index], autoKill: false },
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      currentIndex = index;
      isScrolling = false;
    },
  });
}

// Wheel and arrow keys
let accumulatedDelta = 0;
window.addEventListener("wheel", (e) => {
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
}, { passive: false });

window.addEventListener("keydown", (e) => {
  if (isScrolling) return;
  if (e.key === "ArrowDown") scrollToPanel(currentIndex + 1);
  if (e.key === "ArrowUp") scrollToPanel(currentIndex - 1);
});




gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
gsap.config({ nullTargetWarn: false });

// Horizontal scroll setup
const horizontalWrapper = document.querySelector(".horizontal-wrapper");
const horizontalSections = gsap.utils.toArray(".horizontal-wrapper .horizontal-section");

if (horizontalSections.length) {
  gsap.to(horizontalSections, {
    xPercent: -100 * (horizontalSections.length - 1),
    ease: "none",
    scrollTrigger: {
      trigger: horizontalWrapper,
      pin: true,
      scrub: true,
      start: "top top",
      end: () => "+=" + horizontalWrapper.scrollWidth,
      invalidateOnRefresh: true,
      markers: true,
    },
  });
}

// Vertical panel snapping
const panels = gsap.utils.toArray(".panel-wrapper > .panel");
let currentIndex = 0;
let isScrolling = false;

function setPanelHeights() {
  const viewportHeight = window.innerHeight;
  panels.forEach((panel) => {
    const contentHeight = panel.scrollHeight;
    panel.style.minHeight = Math.max(viewportHeight, contentHeight) + "px";
  });
}

// Initial setup
setPanelHeights();
window.addEventListener("resize", setPanelHeights);
window.addEventListener("orientationchange", setPanelHeights);

// ScrollSmoother for smooth scrolling
const smoother = ScrollSmoother.create({
  wrapper: ".page-wrapper",
  content: ".panel-wrapper",
  smooth: 0.5,
  effects: true,
});

// Function to scroll to panel
function scrollToPanel(index) {
  index = Math.max(0, Math.min(index, panels.length - 1));
  if (currentIndex === index) return;

  // Check if target panel is inside horizontal wrapper
  const targetPanel = panels[index];
  if (horizontalWrapper.contains(targetPanel)) return; // skip vertical snapping inside horizontal

  isScrolling = true;
  gsap.to(window, {
    scrollTo: { y: panels[index], autoKill: false },
    duration: 0.6,
    ease: "power2.inOut",
    onComplete: () => {
      currentIndex = index;
      isScrolling = false;
    },
  });
}

// Wheel & arrow key support
let accumulatedDelta = 0;
window.addEventListener(
  "wheel",
  function (e) {
    e.preventDefault();
    if (isScrolling) return;

    accumulatedDelta += e.deltaY;

    const currentPanel = panels[currentIndex];
    if (horizontalWrapper.contains(currentPanel)) return; // skip snapping inside horizontal

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
  if (isScrolling) return;
  const currentPanel = panels[currentIndex];
  if (horizontalWrapper.contains(currentPanel)) return;

  if (e.key === "ArrowDown") scrollToPanel(currentIndex + 1);
  if (e.key === "ArrowUp") scrollToPanel(currentIndex - 1);
});
