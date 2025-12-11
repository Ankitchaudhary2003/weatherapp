



// =====================
// ELEMENTS
// =====================
const searchBox = document.querySelector(".search");
const loader = document.getElementById("loader");

const locationEl = document.getElementById("location");
const timeEl = document.getElementById("local-time");
const tempEl = document.getElementById("temperature");
const descEl = document.getElementById("description");
const feelsEl = document.getElementById("feels-like");
const iconEl = document.getElementById("weather-icon");

const humidityEl = document.getElementById("humidity");
const windEl = document.getElementById("wind");
const pressureEl = document.getElementById("pressure");
const visibilityEl = document.getElementById("visibility");

const errorEl = document.getElementById("error");

// =====================
// WEATHER API DETAILS
// =====================
const API_KEY="d13ce74e83e3449ab3e144027250906"
const BASE_URL="https://api.weatherapi.com/v1/current.json"
// =====================
// EVENT BUBBLING
// =====================
searchBox.addEventListener("click", function (e) {
  if (e.target.id === "search-btn") {
    const city = document.getElementById("search-input").value.trim();

    if (!city) {
      showError("Please enter a city name.");
      return;
    }

    getWeather(city);
  }
});

// =====================
// WEATHER FETCH FUNCTION
// =====================
async function getWeather(city) {
  showLoader(true);
  showError(""); // remove old error

  try {
    const response = await fetch(
      `${BASE_URL}?key=${API_KEY}&q=${city}&aqi=yes`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    updateUI(data);

  } catch (error) {
    showError(error.message);
  }

  showLoader(false);
}

// =====================
// UPDATE UI FUNCTION
// =====================
function updateUI(data) {
  const current = data.current;
  const location = data.location;

  // MAIN DATA
  locationEl.textContent = `${location.name}, ${location.country}`;
  timeEl.textContent = location.localtime.split(" ")[1];
  tempEl.textContent = `${current.temp_c}°`;
  descEl.textContent = current.condition.text;
  feelsEl.textContent = `Feels like ${current.feelslike_c}°`;

  // ICON
  iconEl.src = "https:" + current.condition.icon;

  // DETAILS
  humidityEl.textContent = current.humidity + "%";
  windEl.textContent = current.wind_kph + " km/h";
  pressureEl.textContent = current.pressure_mb + " hPa";
  visibilityEl.textContent = current.vis_km + " km";
}

// =====================
// SHOW / HIDE LOADER
// =====================
function showLoader(show) {
  loader.style.display = show ? "flex" : "none";
}

// =====================
// ERROR FUNCTION
// =====================
function showError(msg) {
  errorEl.textContent = msg;
}
