/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if(e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing')

    window.removeEventListener('keydown', handleFirstTab)
    window.addEventListener('mousedown', handleMouseDownOnce)
  }

}

const handleMouseDownOnce = () => {
  document.body.classList.remove('user-is-tabbing')

  window.removeEventListener('mousedown', handleMouseDownOnce)
  window.addEventListener('keydown', handleFirstTab)
}

window.addEventListener('keydown', handleFirstTab)

/* -----------------------------------------
  Image cycling on scroll into view
 ---------------------------------------- */

const imageBoxes = document.querySelectorAll('.work__image-box');
const cycleIntervals = new Map();
const CYCLE_INTERVAL_MS = 2500;

imageBoxes.forEach((box) => {
  const images = box.querySelectorAll('.work__image');
  if (images.length <= 1) return;

  // Set first image as active
  images[0].classList.add('active');

  const startCycling = () => {
    if (cycleIntervals.has(box)) return;
    let current = 0;
    const interval = setInterval(() => {
      images[current].classList.remove('active');
      current = (current + 1) % images.length;
      images[current].classList.add('active');
    }, CYCLE_INTERVAL_MS);
    cycleIntervals.set(box, interval);
  };

  const stopCycling = () => {
    clearInterval(cycleIntervals.get(box));
    cycleIntervals.delete(box);
    // Reset to first image
    images.forEach((img) => img.classList.remove('active'));
    images[0].classList.add('active');
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCycling();
        } else {
          stopCycling();
        }
      });
    },
    { threshold: 0.4 }
  );

  observer.observe(box);
});

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});