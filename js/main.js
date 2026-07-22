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

const sliderContainer = document.getElementById("slider");

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
