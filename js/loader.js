window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  loader.classList.add("hide");

  setTimeout(() => {
    loader.remove();
  }, 700);
});
