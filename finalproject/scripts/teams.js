// ============================
// teams.js - Fetch & Display Football Teams
// ============================

import { openModal } from "./modal.js";

const teamContainer = document.querySelector(".team-grid");

async function loadTeams() {
  try {
    const response = await fetch("data/teams.json");
    if (!response.ok) throw new Error("Failed to load team data");
    const teams = await response.json();

    // Display the first 15 teams
    teams.slice(0, 15).forEach(team => {
      const card = document.createElement("div");
      card.classList.add("team-card");
      card.innerHTML = `
        <img src="${team.logo}" alt="${team.name} logo" loading="lazy">
        <h3>${team.name}</h3>
        <p><strong>League:</strong> ${team.league}</p>
        <p><strong>Country:</strong> ${team.country}</p>
        <p><strong>Founded:</strong> ${team.founded}</p>
        <button class="btn" data-id="${team.id}">View More</button>
      `;
      teamContainer.appendChild(card);
    });

    // Event listener for modal opening
    teamContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        const id = e.target.dataset.id;
        const team = teams.find(t => t.id == id);
        openModal(team);
      }
    });

  } catch (error) {
    console.error("Error loading teams:", error);
    teamContainer.innerHTML = `<p>⚠️ Unable to load team data. Please try again later.</p>`;
  }
}

loadTeams();
