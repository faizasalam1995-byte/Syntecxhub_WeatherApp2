const apiKey = 

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const weatherBox = document.getElementById("weatherBox");

  if (!city) {
    weatherBox.innerHTML = "⚠️ Please enter a city name";
    return;
  }

  try {
    weatherBox.innerHTML = "⏳ Loading...";

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    if (!response.ok) {
      throw new Error("City not found or API issue");
    }

    const data = await response.json();
    const icon = data.weather[0].icon;
    const condition = data.weather[0].main.toLowerCase();

    // 🌦 Background Change
    changeBackground(condition);

    weatherBox.innerHTML = `
      <h2>${data.name}</h2>
      <img src="https://openweathermap.org/img/wn/${icon}@2x.png"/>
      <p>🌡 Temp: ${data.main.temp}°C</p>
      <p>☁ Condition: ${data.weather[0].main}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    weatherBox.innerHTML = `❌ ${error.message}`;
  }
}

// 🌈 Background function
function changeBackground(condition) {
  const body = document.body;

  if (condition.includes("cloud")) {
    body.style.background = "linear-gradient(135deg, #bdc3c7, #2c3e50)";
  } 
  else if (condition.includes("rain")) {
    body.style.background = "linear-gradient(135deg, #4b79a1, #283e51)";
  } 
  else if (condition.includes("clear")) {
    body.style.background = "linear-gradient(135deg, #fceabb, #f8b500)";
  } 
  else if (condition.includes("snow")) {
    body.style.background = "linear-gradient(135deg, #e6dada, #274046)";
  } 
  else {
    body.style.background = "linear-gradient(135deg, #667eea, #764ba2)";
  }
}

// Enter key support
document.getElementById("cityInput").addEventListener("keypress", function(e) {
  if (e.key === "Enter") {
    getWeather();
  }
});