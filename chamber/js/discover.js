// Fetch JSON data and build cards
async function loadDiscoverData() {
  try {
    const response = await fetch("data/discover.json");
    const data = await response.json();

    const container = document.querySelector(".discover-grid");

    data.places.forEach((item, index) => {
      const card = document.createElement("div");
      card.classList.add("card", `card${index + 1}`);

      card.innerHTML = `
        <h2>${item.name}</h2>
        <figure>
          <img src="${item.image}" alt="${item.name}" width="300" height="200" loading="lazy">
        </figure>
        <address>${item.address}</address>
        <p>${item.description}</p>
        <button>Learn More</button>
      `;

      container.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading discover data:", error);
  }
}

// LocalStorage Visit Message
function displayVisitMessage() {
  const visitMessage = document.querySelector(".visit-message");
  const lastVisit = Number(localStorage.getItem("lastVisit"));
  const now = Date.now();

  if (!lastVisit) {
    visitMessage.textContent = "Welcome! Let us know if you have any questions.";
  } else {
    const daysBetween = Math.floor((now - lastVisit) / (1000 * 60 * 60 * 24));
    if (daysBetween < 1) {
      visitMessage.textContent = "Back so soon! Awesome!";
    } else if (daysBetween === 1) {
      visitMessage.textContent = "You last visited 1 day ago.";
    } else {
      visitMessage.textContent = `You last visited ${daysBetween} days ago.`;
    }
  }

  localStorage.setItem("lastVisit", now);
}

loadDiscoverData();
displayVisitMessage();
