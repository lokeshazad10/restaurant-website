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

  initGsap();
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

//short menu scroll based animation using GSAP
function initGsap() {
  gsap.registerPlugin(ScrollTrigger);

  const menuCards = document.querySelectorAll("#menu-item .menu-card");

  if (!menuCards.length) return;

  gsap.set(menuCards, {
    opacity: 0,
    y: 24,
    scale: 0.98,
  });

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".menu-section",
      start: "top 78%",
      // toggleActions: "play none none reverse",
    },
  });

  tl.to(menuCards, {
    opacity: 1,
    y: 0,
    scale: 1,
    duration: 0.7,
    stagger: 0.08,
    ease: "power2.out",
  }).to(
    fMenuBtn,
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: "power2.out",
    },
    "-=0.25",
  );

  menuCards.forEach((card) => {
    gsap.to(card, {
      y: "-=4",
      duration: 1.6,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      overwrite: "auto",
    });
  });
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
  x: -100,
  y: -100,
  rotate: 360,
  duration: 0.8,
  stagger: 0.2,
});

//pendulum animation
// let angle = 0;
// let time = 0;

// gsap.ticker.add(() => {
//   time += 0.05;
//   const rotation = angle + Math.sin(time);
//   gsap.set(".pendulum", {
//     rotation,
//     transformOrigin: "50% 0%",
//   });
// });
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
// document.addEventListener("DOMContentLoaded", animateNav());
