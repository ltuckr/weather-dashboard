//my API key for openweathermap.org
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
var fUV0 = document.getElementById('fUV0');

// Event listener for the search button
searchButton.addEventListener('click', function () {
    var city = searchCityInput.value;
    
    // Call function to fetch weather data and display it
    fetchWeatherData(city);
});

// Function to fetch weather data from the API
// Inside the fetchWeatherData function
function fetchWeatherData(city) {
    var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;
    
    fetch(apiUrl)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error('City not found');
            }
        })
        .then(function (data) {
            // Assuming data.list is an array containing 5-day forecast data
            for (let i = 0; i < 5; i++) {
                const forecastDate = new Date(data.list[i * 8].dt * 1000);
                const dateElement = document.getElementById(`fDate${i}`);
                const tempElement = document.getElementById(`fTemp${i}`);
                const humidityElement = document.getElementById(`fHumidity${i}`);
                const windElement = document.getElementById(`fWind${i}`);
                const uvElement = document.getElementById(`fUV${i}`);
                
                // Set the innerHTML of each card with forecast data
                dateElement.textContent = formatDate(forecastDate);
                tempElement.textContent = `Temp: ${k2f(data.list[i * 8].main.temp)} °F`;
                humidityElement.textContent = `Humidity: ${data.list[i * 8].main.humidity}%`;
                windElement.textContent = `Wind: ${data.list[i * 8].wind.speed} MPH`;
                uvElement.textContent = `UV Index: ${getUVIndex(data.list[i * 8].coord.lat, data.list[i * 8].coord.lon)}`;
            }
        })
        .catch(function (error) {
            console.error('Error:', error);
            alert(error.message);
        });
}

// Helper function to format date
function formatDate(date) {
    const options = { month: 'numeric', day: 'numeric', year: 'numeric' };
    return date.toLocaleDateString(undefined, options);
}

// Helper function to get UV index based on lat and lon
function getUVIndex(lat, lon) {
    
    return 'UV Index Value';
}


// Function to display current weather
function displayCurrentWeather(data) {
    // Extract data from the response and update the DOM
    var cityName = data.city.name;
    var temperature = data.list[0].main.temp;
    var humidity = data.list[0].main.humidity;
    var windSpeed = data.list[0].wind.speed;
    var uvIndex = data.list[0].uvIndex; 
    
    locationElement.textContent = cityName;
    weatherDescriptionElement.textContent = 'Weather Description: ' + data.list[0].weather[0].description;
    // Update other weather details in a similar way
    fDate0.textContent = 'Date: ' + data.list[0].dt_txt;
    fTemp0.textContent = 'Temperature: ' + temperature;
    fHumidity0.textContent = 'Humidity: ' + humidity;
    fWind0.textContent = 'Wind Speed: ' + windSpeed;
    fUV0.textContent = 'UV Index: ' + uvIndex;
    
  
}

// Function to display 5-day forecast
function displayFutureWeather(data) {
 
}


function addToSearchHistory(city) {
   
}

function renderSearchHistory() {
   
}
