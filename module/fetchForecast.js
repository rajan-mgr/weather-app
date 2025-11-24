// module/fetchForecast.js
export async function fetchForecast(city, forecastDiv, apikey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apikey}`;
    forecastDiv.style.display = 'flex';

    try {
        const response = await fetch(forecastUrl);
        if (!response.ok) throw new Error("Forecast not found");
        const data = await response.json();

        forecastDiv.innerHTML = "";

        const dailyForecasts = data.list
            .filter(item => item.dt_txt.includes("12:00:00"))
            .slice(0, 5);

        dailyForecasts.forEach((day, index) => {
            const dayDiv = document.createElement('div');
            dayDiv.classList.add("forecast-day");

            let weekday;
            if (index === 0) weekday = "Today";
            else if (index === 1) weekday = "Tomorrow";
            else weekday = new Date(day.dt_txt).toLocaleDateString("en-US", { weekday: "long" });

            dayDiv.innerHTML = `
                <div class="weekday">${weekday}</div>
                <img class="forecast-icon" src="https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png" alt="Icon">
                <div class="forecast-temp">${day.main.temp}°C</div>
            `;

            forecastDiv.appendChild(dayDiv);
        });

    } catch (error) {
        console.log(error.message);
    }
}
