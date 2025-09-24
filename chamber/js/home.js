// =============================
// Common Footer Updates
// =============================
document.getElementById("year").textContent = new Date().getFullYear();
document.getElementById("last-modified").textContent = document.lastModified;

// =============================
// Weather Section - Lagos
// =============================
const lat = 6.5244;   // Lagos latitude
const lon = 3.3792;   // Lagos longitude
const apiKey = "YOUR_API_KEY_HERE"; // <-- replace with your real OpenWeather key
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

async function getWeather() {
  try {
    const response = await fetch(weatherUrl);
    if (!response.ok) throw new Error("Weather data unavailable");

    const data = await response.json();

    const icon = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

    const weatherCard = document.getElementById("weather-card");
    weatherCard.innerHTML = `
      <h3>${data.name} Weather</h3>
      <img src="${icon}" alt="${data.weather[0].description}">
      <p>🌡️ ${data.main.temp.toFixed(1)} °C</p>
      <p>${data.weather[0].description}</p>
      <p>💨 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    console.error(error);
    document.getElementById("weather-card").innerHTML = `<p>Weather data unavailable</p>`;
  }
}
getWeather();

// =============================
// Member Spotlights
// =============================
async function getSpotlights() {
  try {
    const response = await fetch("data/members.json");
    if (!response.ok) throw new Error("Members data unavailable");

    const members = await response.json();

    // Filter GOLD and SILVER members
    const filtered = members.filter(m => m.membership === "Gold" || m.membership === "Silver");

    // Randomly pick up to 3 members
    const shuffled = filtered.sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 3);

    const spotlightContainer = document.getElementById("spotlight-cards");
    spotlightContainer.innerHTML = "";

    selected.forEach(member => {
      const card = document.createElement("div");
      card.classList.add("spotlight-card");
      card.innerHTML = `
        <img src="${member.image}" alt="${member.name}" loading="lazy">
        <h3>${member.name}</h3>
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <a href="${member.website}" target="_blank">Visit Website</a>
      `;
      spotlightContainer.appendChild(card);
    });
  } catch (error) {
    console.error(error);
    document.getElementById("spotlight-cards").innerHTML = `<p>Spotlights unavailable</p>`;
  }
}
getSpotlights();
