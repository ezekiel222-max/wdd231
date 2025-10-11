// form.js — handles contact form for Football World Hub

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".contact-form");
  const teamSelect = document.querySelector("#team");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault(); // stop default GET request

      const name = document.querySelector("#name").value.trim();
      const email = document.querySelector("#email").value.trim();
      const team = teamSelect.value;
      const message = document.querySelector("#message").value.trim();
      const subscribe = form.querySelector('input[name="subscribe"]').checked ? "Yes" : "No";

      if (!name || !email || !team || !message) {
        alert("⚠️ Please fill out all required fields before submitting.");
        return;
      }

      // store form data in localStorage for display-form.js
      const formData = { name, email, team, message, subscribe };
      localStorage.setItem("footballFormData", JSON.stringify(formData));

      // redirect to confirmation page
      window.location.href = "form-submission.html";
    });
  }
});
