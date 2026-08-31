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


  /* ---------- CREATE LIGHTBOX ---------- */

  const lightbox = document.createElement("div");
  lightbox.className = "lightbox";

  const gallery = document.createElement("div");
  gallery.className = "lightbox-gallery";

  lightbox.appendChild(gallery);
  document.body.appendChild(lightbox);


  /* ---------- ADD ALL IMAGES ---------- */

  images.forEach((image, index) => {

    const enlargedImage = document.createElement("img");

    enlargedImage.src = image.src;
    enlargedImage.alt = image.alt || "";
    enlargedImage.dataset.index = index;

    gallery.appendChild(enlargedImage);

  });


  const galleryImages = Array.from(
    gallery.querySelectorAll("img")
  );


  /* ---------- OPEN ---------- */

  images.forEach((image, index) => {

    image.addEventListener("click", () => {

      lightbox.classList.add("active");

      document.body.classList.add("lightbox-open");

      requestAnimationFrame(() => {

        galleryImages[index].scrollIntoView({
          block: "center"
        });

      });

    });

  });


  /* ---------- CLOSE ---------- */

  function closeLightbox() {

    lightbox.classList.remove("active");

    document.body.classList.remove("lightbox-open");

  }


  /* Click empty background to close */

  lightbox.addEventListener("click", (event) => {

    if (
      event.target === lightbox ||
      event.target === gallery
    ) {
      closeLightbox();
    }

  });


  /* Escape to close */

  document.addEventListener("keydown", (event) => {

    if (
      event.key === "Escape" &&
      lightbox.classList.contains("active")
    ) {
      closeLightbox();
    }

  });

});
