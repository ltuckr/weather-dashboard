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
    
    locationElement.textContent = cityName;
    weatherDescriptionElement.textContent = 'Weather Description: ' + data.weather[0].description;
    fTemp0.textContent = 'Temperature: ' + k2f(temperature) + ' °F';
    fHumidity0.textContent = 'Humidity: ' + humidity + '%';
    fWind0.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
    
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
// Function to display the 5-day forecast
function displayFiveDayForecast(data) {
    for (let i = 0; i < 5; i++) {
        const forecastData = data.list[i]; // Get the forecast data for each day
        const forecastDate = new Date(forecastData.dt * 1000);
        const dateElement = document.getElementById(`fDate${i}`);
        const tempElement = document.getElementById(`fTemp${i}`);
        const humidityElement = document.getElementById(`fHumidity${i}`);
        const windElement = document.getElementById(`fWind${i}`);
        const uvElement = document.getElementById(`fUV${i}`);

        // Set the innerHTML of each card with forecast data
        dateElement.innerHTML = formatDate(forecastDate);
        tempElement.innerHTML = Math.round(k2f(forecastData.main.temp)) + ' &#176F'; // Round temperature to whole number
        humidityElement.innerHTML = forecastData.main.humidity + '%';
        windElement.innerHTML = forecastData.wind.speed + ' MPH';
        
    }
}

// Helper function to format date
function formatDate(date) {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}
