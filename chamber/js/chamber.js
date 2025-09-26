// =============================
// Common Footer Updates
// =============================
document.getElementById("year").textContent = new Date().getFullYear();

// =============================
// Timestamp for Join Form
// =============================
const timestampField = document.getElementById("timestamp");
if (timestampField) {
  timestampField.value = new Date().toISOString();
}

// =============================
// Modal Functionality
// =============================
const modalLinks = document.querySelectorAll("[data-modal]");
const modals = document.querySelectorAll(".modal");
const closeButtons = document.querySelectorAll(".modal .close");

// Open modal
modalLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const modalId = link.getAttribute("data-modal");
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = "block";
    }
  });
});

// Close modal when clicking ×
closeButtons.forEach(button => {
  button.addEventListener("click", () => {
    button.closest(".modal").style.display = "none";
  });
});

// Close modal when clicking outside modal content
window.addEventListener("click", e => {
  modals.forEach(modal => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});
