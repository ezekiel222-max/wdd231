// ============================
// main.js - Handles navigation and theme
// ============================

// Toggle mobile menu
const menuToggle = document.querySelector("#menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("show");
});

// Wayfinding: highlight the current page
const currentPage = window.location.pathname.split("/").pop();
const links = document.querySelectorAll(".nav-links a");
links.forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});

// LocalStorage Example: Save preferred theme (light/dark)
const themeToggleBtn = document.createElement("button");
themeToggleBtn.textContent = "Toggle Theme";
themeToggleBtn.classList.add("btn");
document.querySelector("footer").appendChild(themeToggleBtn);

const currentTheme = localStorage.getItem("theme") || "light";
document.body.dataset.theme = currentTheme;

themeToggleBtn.addEventListener("click", () => {
  const newTheme = document.body.dataset.theme === "light" ? "dark" : "light";
  document.body.dataset.theme = newTheme;
  localStorage.setItem("theme", newTheme);
  document.body.style.backgroundColor = newTheme === "dark" ? "#111" : "#f5f5f5";
  document.body.style.color = newTheme === "dark" ? "#eee" : "#222";
});
