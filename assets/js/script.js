document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slide-wrapper .w-slider-mask");
    const slides = document.querySelectorAll(".slide-item");
    const prevBtn = document.querySelector(".w-slider-arrow-left");
    const nextBtn = document.querySelector(".w-slider-arrow-right");

    let currentIndex = 0;
    let interval;
    const slideCount = slides.length;

    // Clone first and last slides for infinite effect
    const firstClone = slides[0].cloneNode(true);
    const lastClone = slides[slideCount - 1].cloneNode(true);

    slider.appendChild(firstClone);
    slider.insertBefore(lastClone, slides[0]);

    let allSlides = document.querySelectorAll(".slide-item");
    let slideWidth = slides[0].offsetWidth;

    // Initial position
    slider.style.transform = `translateX(${-slideWidth * (currentIndex + 1)}px)`;

    function moveToSlide(index) {
        slider.style.transition = "transform 0.5s ease";
        slider.style.transform = `translateX(${-slideWidth * (index + 1)}px)`;
        currentIndex = index;
    }

    function nextSlide() {
        if (currentIndex >= slideCount - 1) {
            currentIndex++;
            moveToSlide(currentIndex);
            slider.addEventListener("transitionend", resetToStart, { once: true });
        } else {
            moveToSlide(currentIndex + 1);
        }
    }

    function prevSlide() {
        if (currentIndex <= 0) {
            currentIndex--;
            moveToSlide(currentIndex);
            slider.addEventListener("transitionend", resetToEnd, { once: true });
        } else {
            moveToSlide(currentIndex - 1);
        }
    }

    function resetToStart() {
        slider.style.transition = "none";
        currentIndex = 0;
        slider.style.transform = `translateX(${-slideWidth * (currentIndex + 1)}px)`;
    }

    function resetToEnd() {
        slider.style.transition = "none";
        currentIndex = slideCount - 1;
        slider.style.transform = `translateX(${-slideWidth * (currentIndex + 1)}px)`;
    }

    function startAutoPlay() {
        interval = setInterval(nextSlide, 4000);
    }

    function stopAutoPlay() {
        clearInterval(interval);
    }

    // Event listeners
    nextBtn.addEventListener("click", () => {
        stopAutoPlay();
        nextSlide();
        startAutoPlay();
    });

    prevBtn.addEventListener("click", () => {
        stopAutoPlay();
        prevSlide();
        startAutoPlay();
    });

    // Resize handler
    window.addEventListener("resize", () => {
        slideWidth = slides[0].offsetWidth;
        moveToSlide(currentIndex);
    });

    // Start autoplay
    startAutoPlay();
});

function equalizePricingHeights() {
  const items = document.querySelectorAll('.collection-list.w-dyn-items .pricing-plan-justify');
  if (!items.length) return;

  // Reset heights first (important for responsiveness)
  items.forEach(el => el.style.height = 'auto');

  // Find the tallest height
  const maxHeight = Math.max(...Array.from(items).map(el => el.offsetHeight));

  // Apply equal height to all
  items.forEach(el => el.style.height = `${maxHeight}px`);
}

// Run after full load and CMS render
window.addEventListener('load', () => setTimeout(equalizePricingHeights, 300));

// Recalculate on window resize
window.addEventListener('resize', equalizePricingHeights);