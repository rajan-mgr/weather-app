// main.js
import { checkWeather } from './module/checkweather.js';

const input = document.getElementById("city");
const button = document.getElementById("btn");
const locationTitle = document.getElementById("location-title");
const resultDiv = document.getElementById("weather-result");
const forecastDiv = document.getElementById("forecast");
const container =document.getElementById("container")

const apikey = "eb8496641bf40f8933ad6c4c8dd66b0c";

// Event listeners
input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        container.classList.add("expanded");
        checkWeather(input, locationTitle, resultDiv, forecastDiv, apikey);
    }
});

button.addEventListener("click", () => {
    container.classList.add("expanded");
    checkWeather(input, locationTitle, resultDiv, forecastDiv, apikey);
});
