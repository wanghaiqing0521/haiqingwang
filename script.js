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
  const images = document.querySelectorAll(".project-image");

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  const enlargedImage = document.createElement("img");
  lightbox.appendChild(enlargedImage);

  document.body.appendChild(lightbox);

  images.forEach((image) => {
    image.addEventListener("click", () => {
      enlargedImage.src = image.src;
      enlargedImage.alt = image.alt || "";
      lightbox.classList.add("active");
    });
  });

  lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      lightbox.classList.remove("active");
    }
  });
});
