// script.js
document.addEventListener("DOMContentLoaded", function () {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const bootLines = document.querySelectorAll(".boot-line");

  // Mostra le righe di boot con il delay
  bootLines.forEach((el) => {
    if (reducedMotion) {
      el.classList.add("show");
    } else {
      const delay = Number(el.getAttribute("data-delay") || 0);
      setTimeout(() => el.classList.add("show"), delay);
    }
  });

  // Imposta il link attivo nella navbar
  const path = window.location.pathname;
  const file = path.split("/").pop().toLowerCase();

  let route;
  if (file === "" || file === "index.html") {
    route = "/";
  } else if (file.endsWith(".html")) {
    route = "/" + file.replace(".html", "");
  } else {
    route = path;
  }

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((a) => a.classList.remove("active"));

  const active = document.querySelector(`.nav-link[data-route="${route}"]`) || [...navLinks].find((a) => (a.getAttribute("href") || "").toLowerCase().endsWith(file)) || document.querySelector('.nav-link[data-route="/"]');

  if (active) active.classList.add("active");
});
