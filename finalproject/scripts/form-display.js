// ============================
// form-display.js - Show Submitted Data
// ============================

// Extract query params
const params = new URLSearchParams(window.location.search);
const output = document.querySelector("#form-output");

if (output && params.size > 0) {
  output.innerHTML = "<h2>Form Submission Data</h2>";
  const list = document.createElement("ul");

  params.forEach((value, key) => {
    const li = document.createElement("li");
    li.textContent = `${key}: ${value}`;
    list.appendChild(li);
  });

  output.appendChild(list);
} else if (output) {
  output.innerHTML = "<p>No form data found.</p>";
}
