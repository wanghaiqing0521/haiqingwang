const cursor = document.createElement("div");
cursor.className = "comet-cursor";
document.body.appendChild(cursor);

let lastTime = 0;

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;

  const now = Date.now();

  if (now - lastTime < 10) return;
  lastTime = now;

  const trail = document.createElement("span");
  trail.className = "comet-trail";
  trail.style.left = `${e.clientX}px`;
  trail.style.top = `${e.clientY}px`;

  document.body.appendChild(trail);

  setTimeout(() => {
    trail.remove();
  }, 1800);
});


document.addEventListener("DOMContentLoaded", () => {

  const images = Array.from(document.querySelectorAll(".project-image"));

  if (!images.length) return;

  let currentIndex = 0;


  /* ---------- CREATE LIGHTBOX ---------- */

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  const enlargedImage = document.createElement("img");
  enlargedImage.className = "lightbox-image";

  const controls = document.createElement("div");
  controls.className = "lightbox-controls";

  const previousButton = document.createElement("button");
  previousButton.className = "lightbox-button";
  previousButton.innerHTML = "↑";
  previousButton.setAttribute("aria-label", "Previous image");

  const nextButton = document.createElement("button");
  nextButton.className = "lightbox-button";
  nextButton.innerHTML = "↓";
  nextButton.setAttribute("aria-label", "Next image");

  const closeButton = document.createElement("button");
  closeButton.className = "lightbox-close";
  closeButton.innerHTML = "×";
  closeButton.setAttribute("aria-label", "Close");

  controls.appendChild(previousButton);
  controls.appendChild(nextButton);

  lightbox.appendChild(enlargedImage);
  lightbox.appendChild(controls);
  lightbox.appendChild(closeButton);

  document.body.appendChild(lightbox);


  /* ---------- SHOW IMAGE ---------- */

  function showImage(index) {

    currentIndex = index;

    enlargedImage.src = images[currentIndex].src;
    enlargedImage.alt = images[currentIndex].alt || "";

    previousButton.style.visibility =
      currentIndex === 0 ? "hidden" : "visible";

    nextButton.style.visibility =
      currentIndex === images.length - 1 ? "hidden" : "visible";
  }


  /* ---------- OPEN ---------- */

  images.forEach((image, index) => {

    image.addEventListener("click", () => {

      showImage(index);

      lightbox.classList.add("active");

    });

  });


  /* ---------- PREVIOUS ---------- */

  previousButton.addEventListener("click", (event) => {

    event.stopPropagation();

    if (currentIndex > 0) {
      showImage(currentIndex - 1);
    }

  });


  /* ---------- NEXT ---------- */

  nextButton.addEventListener("click", (event) => {

    event.stopPropagation();

    if (currentIndex < images.length - 1) {
      showImage(currentIndex + 1);
    }

  });


  /* ---------- CLOSE ---------- */

  function closeLightbox() {
    lightbox.classList.remove("active");
  }

  closeButton.addEventListener("click", (event) => {

    event.stopPropagation();

    closeLightbox();

  });


  /* Click background to close */

  lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
      closeLightbox();
    }

  });


  /* ---------- KEYBOARD ---------- */

  document.addEventListener("keydown", (event) => {

    if (!lightbox.classList.contains("active")) return;

    if (event.key === "Escape") {
      closeLightbox();
    }

    if (event.key === "ArrowUp" && currentIndex > 0) {
      showImage(currentIndex - 1);
    }

    if (
      event.key === "ArrowDown" &&
      currentIndex < images.length - 1
    ) {
      showImage(currentIndex + 1);
    }

  });

});
