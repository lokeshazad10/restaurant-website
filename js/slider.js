const slider = document.getElementById("slider");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");

function initSlider() {
  if (!slider || !nextBtn || !prevBtn) {
    console.warn("Best-sellers slider elements are missing.");
    return;
  }

  const cards = Array.from(slider.querySelectorAll(".slide"));
  if (cards.length === 0) {
    console.warn("Best-sellers slider has no cards.");
    return;
  }

  let index = 0;
  let autoPlayId;
  let isDragging = false;
  let startX = 0;
  let dragDistance = 0;
  let dragThreshold = 45;

  function getGap() {
    return parseFloat(window.getComputedStyle(slider).gap) || 0;
  }

  function getVisibleCards() {
    if (window.innerWidth <= 600) {
      return 1;
    }

    if (window.innerWidth <= 900) {
      return 2;
    }

    return 4;
  }

  function getCardWidth() {
    const firstCard = cards[0];
    const cardWidth = firstCard.getBoundingClientRect().width;
    return cardWidth + getGap();
  }

  function updateSlider(withTransition = true) {
    const visibleCards = getVisibleCards();
    const maxIndex = Math.max(0, cards.length - visibleCards);

    if (index < 0) {
      index = 0;
    } else if (index > maxIndex) {
      index = maxIndex;
    }

    if (!withTransition) {
      slider.style.transition = "none";
    } else {
      slider.style.transition =
        "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";
    }

    const moveX = index * getCardWidth();
    slider.style.transform = `translateX(-${moveX}px)`;

    prevBtn.disabled = index <= 0;
    nextBtn.disabled = index >= maxIndex;
  }

  function goToNext() {
    index += 1;
    updateSlider();
  }

  function goToPrev() {
    index -= 1;
    updateSlider();
  }

  function startAutoPlay() {
    clearInterval(autoPlayId);
    autoPlayId = setInterval(goToNext, 3000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayId);
  }

  function handlePointerDown(event) {
    isDragging = true;
    startX = event.clientX;
    dragDistance = 0;
    stopAutoPlay();
    slider.style.transition = "none";
  }

  function handlePointerMove(event) {
    if (!isDragging) {
      return;
    }

    dragDistance = event.clientX - startX;
    const currentMove = index * getCardWidth();
    const dragOffset = -currentMove + dragDistance;
    slider.style.transform = `translateX(${dragOffset}px)`;
  }

  function handlePointerUp() {
    if (!isDragging) {
      return;
    }

    isDragging = false;
    slider.style.transition = "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)";

    if (dragDistance < -dragThreshold) {
      goToNext();
    } else if (dragDistance > dragThreshold) {
      goToPrev();
    } else {
      updateSlider();
    }

    startAutoPlay();
  }

  nextBtn.addEventListener("click", goToNext);
  prevBtn.addEventListener("click", goToPrev);
  window.addEventListener("resize", () => {
    updateSlider(false);
  });
  slider.addEventListener("mouseenter", stopAutoPlay);
  slider.addEventListener("mouseleave", startAutoPlay);
  nextBtn.addEventListener("mouseenter", stopAutoPlay);
  nextBtn.addEventListener("mouseleave", startAutoPlay);
  prevBtn.addEventListener("mouseenter", stopAutoPlay);
  prevBtn.addEventListener("mouseleave", startAutoPlay);
  slider.addEventListener("pointerdown", handlePointerDown);
  slider.addEventListener("pointermove", handlePointerMove);
  slider.addEventListener("pointerup", handlePointerUp);
  slider.addEventListener("pointerleave", handlePointerUp);
  slider.addEventListener("pointercancel", handlePointerUp);

  updateSlider(false);
  startAutoPlay();
}

window.addEventListener("load", initSlider);
