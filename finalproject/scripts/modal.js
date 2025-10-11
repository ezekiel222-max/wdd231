// ============================
// modal.js - Modal Dialog Logic
// ============================

export function openModal(team) {
  const modal = document.createElement("div");
  modal.classList.add("modal");

  modal.innerHTML = `
    <div class="modal-content">
      <button class="close-btn">&times;</button>
      <h2>${team.name}</h2>
      <img src="${team.logo}" alt="${team.name} logo">
      <p><strong>Stadium:</strong> ${team.stadium}</p>
      <p><strong>Manager:</strong> ${team.manager}</p>
      <p><strong>Description:</strong> ${team.description}</p>
    </div>
  `;

  document.body.appendChild(modal);

  // Close logic
  modal.querySelector(".close-btn").addEventListener("click", () => {
    modal.remove();
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) modal.remove();
  });
}
