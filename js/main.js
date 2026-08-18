// best seller menu
const bestSellerMenu = [
  {
    image: "./assets/images/dishes/alfredo.png",
    name: "Alfredo",
    price: 399,
  },
  {
    image: "./assets/images/dishes/arrabiata.png",
    name: "Arrabiata",
    price: 349,
  },
  {
    image: "./assets/images/dishes/pesto-genevese.png",
    name: "Pesto Genevese",
    price: 399,
  },
  {
    image: "./assets/images/dishes/bolognese.png",
    name: "Bolognese",
    price: 399,
  },
];
const shortMenu = [
  {
    image: "./assets/images/dishes/alfredo.png",
    name: "Alfredo",
    price: 399,
  },
  {
    image: "./assets/images/dishes/arrabiata.png",
    name: "Arrabiata",
    price: 349,
  },
  {
    image: "./assets/images/dishes/pesto-genevese.png",
    name: "Pesto Genevese",
    price: 399,
  },
  {
    image: "./assets/images/dishes/bolognese.png",
    name: "Bolognese",
    price: 399,
  },
];

const sliderContainer = document.getElementById("slider");
const menuItemContainer = document.getElementById("menu-item");
const fMenuBtn = document.getElementById("explore-f-menu");

//navbar blurr effect on scroll
const navbar = document.getElementById("navbar");
const navLink = document.getElementById("nav-links");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("blurred");
    navLink.classList.add("nav-link-bg");
    navbar.style.justifyContent = "center";
  } else {
    navbar.classList.remove("blurred");
    navLink.classList.remove("nav-link-bg");
    navbar.style.justifyContent = "space-between";
  }
});

function renderMenuCards() {
  menuItemContainer.innerHTML = shortMenu
    .map(
      ({ image, name, price }, index) => `
    <div class="menu-card card-${index + 1}">
          <img src="${image}" alt="${name}">
          <div class="slide-details">
            <div>
              <h3>${name}</h3>
              <span class="menu-tag">Chef Signature</span>
            </div>
            <p class="price">₹${price}</p>
          </div>
        </div>
    `,
    )
    .join("");
}

if (sliderContainer) {
  sliderContainer.innerHTML = bestSellerMenu
    .map(
      ({ image, name, price }) => `
        <div draggable="false" class="slide">
          <img draggable="false" src="${image}" alt="${name}">
          <div class="slide-details">
            <h3>${name}</h3>
            <p class="price">₹${price}</p>
          </div>
        </div>
      `,
    )
    .join("");
}

function initReviewAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  const reviewCards = document.querySelectorAll(".review-card");
  const reviewHeading = document.querySelector(".review-heading");

  if (!reviewCards.length || !reviewHeading) return;

  gsap.set(reviewCards, { opacity: 0, y: 16, scale: 0.98 });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".review-section",
      start: "top 80%",
      toggleActions: "play none none reverse",
    },
  });

  //tag line text hide animation on scroll
  gsap.to(".tag-line", {
    y: 100,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".text-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false,
    },
  });
  gsap.to(".first-line", {
    y: 100,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".text-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false,
    },
  });
  gsap.to(".hero-description", {
    y: 100,
    opacity: 0,
    ease: "none",
    scrollTrigger: {
      trigger: ".text-section",
      start: "top top",
      end: "bottom top",
      scrub: true,
      markers: false,
    },
  });

  tl.from(reviewHeading, {
    opacity: 0,
    y: 16,
    duration: 0.6,
    ease: "power2.out",
  }).to(reviewCards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    stagger: 0.1,
    ease: "power2.out",
  });

  reviewCards.forEach((card) => {
    gsap.to(card, {
      y: "-=3",
      duration: 1.8,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  });
}

// navbar stagger animation
// function animateNav(){
// }
gsap.from("nav .nav-links li", {
  scale: 0,
  duration: 0.8,
  stagger: 0.1,
});
gsap.fromTo(
  ".pendulum",
  {
    rotation: -20,
  },
  {
    rotation: 20,
    duration: 1.5,
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  },
);
gsap.to(".pendulum", {
  filter: "drop-shadow(0px 35px 40px rgba(202, 236, 7, .1))",
  duration: 1.5,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
});

document.addEventListener("DOMContentLoaded", () => {
  renderMenuCards();
  initReviewAnimations();
});
