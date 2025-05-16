document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("menu-toggle");
  const links = document.getElementById("nav-links");
  btn.addEventListener("click", () => links.classList.toggle("active"));
});
