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
