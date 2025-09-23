// Get elements
const membersContainer = document.getElementById("members");
const gridBtn = document.getElementById("grid-btn");
const listBtn = document.getElementById("list-btn");
const searchInput = document.getElementById("search");
const navToggle = document.getElementById("nav-toggle");
const mainNav = document.getElementById("main-nav");

// Nav toggle for mobile
navToggle.addEventListener("click", () => {
  const expanded = navToggle.getAttribute("aria-expanded") === "true";
  navToggle.setAttribute("aria-expanded", String(!expanded));
  mainNav.classList.toggle("show");
});

// Footer info
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// View toggle
function setView(view) {
  if (view === "grid") {
    membersContainer.classList.remove("list");
    membersContainer.classList.add("grid");
    gridBtn.setAttribute("aria-pressed", "true");
    listBtn.setAttribute("aria-pressed", "false");
  } else {
    membersContainer.classList.remove("grid");
    membersContainer.classList.add("list");
    gridBtn.setAttribute("aria-pressed", "false");
    listBtn.setAttribute("aria-pressed", "true");
  }
  localStorage.setItem("membersView", view);
}

gridBtn.addEventListener("click", () => setView("grid"));
listBtn.addEventListener("click", () => setView("list"));

// Fetch and render members
async function fetchMembers() {
  try {
    const res = await fetch("data/members.json");
    if (!res.ok) throw new Error("Failed to fetch members.json");
    const data = await res.json();
    renderMembers(data);
    // Restore view
    const saved = localStorage.getItem("membersView") || "grid";
    setView(saved);

    // Search
    searchInput.addEventListener("input", () => renderMembers(data));
  } catch (err) {
    membersContainer.innerHTML = "<p>Error loading members.</p>";
    console.error(err);
  }
}

function renderMembers(list) {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = list.filter(
    (m) =>
      m.name.toLowerCase().includes(query) ||
      (m.category && m.category.toLowerCase().includes(query))
  );

  if (filtered.length === 0) {
    membersContainer.innerHTML = "<p>No members found.</p>";
    return;
  }

  membersContainer.innerHTML = filtered
    .map(
      (m) => `
    <div class="member-card">
      <img src="${m.image}" alt="${m.name} logo">
      <h2>${m.name}</h2>
      <p>${m.address}</p>
      <p><a href="tel:${m.phone}">${m.phone}</a></p>
      <p><a href="${m.website}" target="_blank">Visit Website</a></p>
      <p>Membership: ${m.membership}</p>
      <p>Category: ${m.category}</p>
    </div>
  `
    )
    .join("");
}

// Run
fetchMembers();
