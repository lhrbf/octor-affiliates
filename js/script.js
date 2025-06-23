document.addEventListener("DOMContentLoaded", function () {
  const heroImg = document.querySelector(".hero-image img");
  const images = [
    "/assets/images/LEO-SANTANA.webp",
    "/assets/images/carlinhos-maia.webp",
  ];
  let current = 0;

  setInterval(() => {
    heroImg.classList.add("fade-out");
    setTimeout(() => {
      current = (current + 1) % images.length;
      heroImg.src = images[current];
      heroImg.classList.remove("fade-out");
    }, 300); 
  }, 3000);
});
