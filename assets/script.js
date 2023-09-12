// My API key for openweathermap.org
var apiKey = '496d9caed19b5898e62a2e3928f9c3d3';

// DOM elements
var searchCityInput = document.getElementById('search-city');
var searchButton = document.getElementById('search-button');
var weatherIcon = document.getElementById('weather-icon');
var locationElement = document.getElementById('location');
var weatherDescriptionElement = document.querySelector('.desc');
var futureWeatherElement = document.getElementById('future-weather');

// Variables for 5-day forecast elements
var fDate0 = document.getElementById('fDate0');
var fTemp0 = document.getElementById('fTemp0');
var fHumidity0 = document.getElementById('fHumidity0');
var fWind0 = document.getElementById('fWind0');
var fIcon0 = document.getElementById('fIcon0');

// Weather icons mapping
const weatherIcons = {
    '01d': 'fa-sun',      // Clear sky day
    '01n': 'fa-moon',    // Clear sky night
    '02d': 'fa-cloud-sun', // Few clouds day
    '02n': 'fa-cloud-moon', // Few clouds night
    '03d': 'fa-cloud',     // Scattered clouds day
    '03n': 'fa-cloud',     // Scattered clouds night
    '04d': 'fa-cloud',     // Broken clouds day
    '04n': 'fa-cloud',     // Broken clouds night
    '09d': 'fa-cloud-showers-heavy', // Rain day
    '09n': 'fa-cloud-showers-heavy', // Rain night
    '10d': 'fa-cloud-sun-rain', // Rain showers day
    '10n': 'fa-cloud-moon-rain', // Rain showers night
    '11d': 'fa-bolt',     // Thunderstorm day
    '11n': 'fa-bolt',     // Thunderstorm night
    '13d': 'fa-snowflake', // Snow day
    '13n': 'fa-snowflake', // Snow night
    '50d': 'fa-smog',      // Mist day
    '50n': 'fa-smog'      // Mist night
};

// Event listener for the search button
searchButton.addEventListener('click', function (event) {
    event.preventDefault();

    var city = searchCityInput.value;

    // Call function to fetch weather data and display it
    fetchWeatherData(city);
});

// Function to convert Kelvin to Fahrenheit
function k2f(K) {
    return ((K - 273.15) * 9) / 5 + 32;
}

// Function to fetch weather data from the API
function fetchWeatherData(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('City not found');
            }
        })
        .then(function (data) {
            displayWeather(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert(error.message);
        });
}

// Function to display weather data
function displayWeather(data) {
    var cityName = data.name;
    var temperature = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var weatherConditionCode = data.weather[0].icon; // Weather condition code

    locationElement.textContent = cityName;
    weatherDescriptionElement.textContent = 'Weather Description: ' + data.weather[0].description;
    fTemp0.textContent = 'Temperature: ' + Math.round(k2f(temperature)) + ' °F'; // Round temperature to a whole number
    fHumidity0.textContent = 'Humidity: ' + humidity + '%';
    fWind0.textContent = 'Wind Speed: ' + windSpeed + ' MPH';

    // Set the weather icon based on the condition code
    const iconClass = weatherIcons[weatherConditionCode];
    weatherIcon.innerHTML = `<i class="fa ${iconClass}"></i>`;

    // Call a function to fetch and display the 5-day forecast
    fetchFiveDayForecast(cityName);
}

// Function to display the 5-day forecast
function fetchFiveDayForecast(cityName) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('City not found');
            }
        })
        .then(function (data) {
            displayFiveDayForecast(data);
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert(error.message);
        });
}

// Function to display the 5-day forecast
function displayFiveDayForecast(data) {
    const currentDate = new Date(); // Get the current date
    currentDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison

    for (let i = 0; i < 5; i++) {
        var forecastData = data.list[i * 8]; // Get the forecast data for each day
        const forecastDate = new Date(forecastData.dt * 1000);
        forecastDate.setHours(0, 0, 0, 0); // Set the time to midnight for accurate comparison
        const dateElement = document.getElementById(`fDate${i}`);
        const tempElement = document.getElementById(`fTemp${i}`);
        const humidityElement = document.getElementById(`fHumidity${i}`);
        const windElement = document.getElementById(`fWind${i}`);
        const iconElement = document.getElementById(`fIcon${i}`);

        // Set the innerHTML of each card with forecast data
        dateElement.innerHTML = formatDate(forecastDate);
        tempElement.innerHTML = Math.round(k2f(forecastData.main.temp)) + ' &#176F'; // Round temperature to a whole number
        humidityElement.innerHTML = forecastData.main.humidity + '%';
        windElement.innerHTML = forecastData.wind.speed + ' MPH';

        // Set the weather icon based on the condition code for each day
        const conditionCode = forecastData.weather[0].icon;
        const iconClass = weatherIcons[conditionCode];
        iconElement.innerHTML = `<img src="http://openweathermap.org/img/w/${conditionCode}.png" alt="Weather icon">`;
    }
}

// Helper function to format date
function formatDate(date) {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
