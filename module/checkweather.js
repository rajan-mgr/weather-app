// module/checkWeather.js
import { fetchForecast } from './fetchForecast.js';

export async function checkWeather(input, locationTitle, resultDiv, forecastDiv, apikey) {
    const city = input.value.trim();
    if (!city) return alert("Enter the city name.");

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error("City not found");
        const data = await response.json();

        const conditiontext = data.weather[0].description
            .charAt(0).toUpperCase() + data.weather[0].description.slice(1);

        locationTitle.textContent = `${data.name}, ${data.sys.country}`;

        resultDiv.innerHTML = `
            <div id="temp-section">
                <div id="temp-value">${data.main.temp}°C</div>
                <div id="condition">${conditiontext}</div>
            </div>
            <div id="info-section">
                <img id="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather Icon">
                <div id="humidity">Humidity: ${data.main.humidity}%</div>
                <div id="wind">Wind: ${data.wind.speed} m/s</div>
            </div>
        `;

        // Fetch forecast
        fetchForecast(city, forecastDiv, apikey);

    } catch (error) {
        alert(error.message);
    }
}
