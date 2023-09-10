// Global variables
var myApiKey = config.API_KEY; // Your OpenWeatherMap API key
var myWeatherIconEl = document.querySelector('.weather-icon');
var myTemp = document.querySelector('.temp');
var myWindSpeed = document.querySelector('.wind-speed');
var myHumidity = document.querySelector('.humidity');
var myUVIndex = document.querySelector('.uv-index');
var mySearchFormEl = document.querySelector('.search-form');
var mySearchInputEl = document.querySelector('.search-input');
var mySearchContainerEl = document.querySelector('.search-container');
var myErrorMessageEl = document.querySelector('.error-message');
var myResetButtonEl = document.querySelector('.reset-button');
var myHeaderEl = document.querySelector('.header');
var myForecastDataEl = document.querySelector('.current-data');
var myForecastIconEl = document.querySelector('.forecast-icon');
var mySearchHistory = JSON.parse(localStorage.getItem('search')) || [];

// City search gets coordinates and sends them to OpenWeather
var myFormSubmitHandler = function(event) {
    event.preventDefault();
    var cityName = mySearchInputEl.value.trim();
    mySearchInputEl.value = '';
    // Require valid location
    if (cityName) {
        getCoordinates(cityName);
        myErrorMessageEl.innerHTML = '';
    } else {
        myErrorMessageEl.innerHTML = 'Please enter a city name';
        return;
    }
}

// get coordinates from OpenWeather
var getCoordinates = function(cityName) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + myApiKey;
    fetch(apiUrl)
        .then(function(res) {
            myErrorMessageEl.innerHTML = '';
            return res.json();
        })
        .then(function(data) {
            var lat = data[0].lat;
            var lon = data[0].lon;
            getWeather(lat, lon);
        })
        .catch(function(error) {
            myErrorMessageEl.innerHTML = 'Please enter a valid city name!';
            return;
        });
}

// 
var getWeather = function(lat, lon) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&units=imperial&appid=" + myApiKey;
    fetch(apiUrl)
        .then(function(res) {
            if (res.ok) {
                return res.json();
            } else {
                alert('Please enter valid city coordinates!');
            }
        })
        .then(function(data) {
            displayWeather(data);
            displayForecast(data);
        });
}

// Display the current weather in the top div
var displayWeather = function(data) {
    var apiUrl = "https://api.openweathermap.org/geo/1.0/reverse?lat=" + data.lat + "&lon=" + data.lon + "&limit=1&appid=" + myApiKey;
    var iconLink = "https://openweathermap.org/img/w/" + data.current.weather[0].icon + ".png";
    fetch(apiUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            myHeaderEl.innerHTML = data[0].name + " (" + moment().format("M/D/YYYY") + ") ";
            myForecastIconEl.innerHTML = "<img src=" + iconLink + ">";
            saveSearch(data[0].name);
        });
    // Define weather data variables
    myTemp.textContent = "Temp: " + data.current.temp + " \u00B0F";
    myWindSpeed.textContent = "Wind: " + data.current.wind_speed + " MPH";
    myHumidity.textContent = "Humidity: " + data.current.humidity + " %";

    if (data.current.uvi < 2) {
        myUVIndex.innerHTML = "UV Index: " + "<span class='uvi-low'>" + data.current.uvi + "</span>";
    } else if (data.current.uvi < 5) {
        myUVIndex.innerHTML = "UV Index: " + "<span class='uvi-mid'>" + data.current.uvi + "</span>";
    } else if (data.current.uvi < 7) {
        myUVIndex.innerHTML = "UV Index: " + "<span class='uvi-high'>" + data.current.uvi + "</span>";
    } else {
        myUVIndex.innerHTML = "UV Index: " + "<span class='uvi-vhigh'>" + data.current.uvi + "</span>";
    }
}

// Display 5-day forecast
var displayForecast = function(data) {
    // Add date
    for (var i = 1; i < 6; i++) {
        var current = document.querySelector("#my-card" + i + "-title");
        current.textContent = moment().add(i, 'd').format("M/D/YYYY");
        var forecast = document.querySelector("#my-card" + i);
        forecast.classList.remove("d-none");
    }

    // Add weather data
    for (var j = 0; j < 5; j++) {
        var currentData = data.daily[j];
        var iconLink = "https://openweathermap.org/img/w/" + currentData.weather[0].icon + ".png";
        var icon = document.querySelector("#my-card" + j + "-icon");
        icon.src = iconLink;
        var temp = document.querySelector("#my-card" + j + "-temp");
        temp.innerHTML = "Temp: " + currentData.temp.day + " \u00B0F";
        var wind = document.querySelector("#my-card" + j + "-wind");
        wind.innerHTML = "Wind: " + currentData.wind_speed + " MPH";
        var humid = document.querySelector("#my-card" + j + "-humid");
        humid.innerHTML = "Humidity: " + currentData.humidity + " %";
    }
}

// Save search history
var saveSearch = function(cityName) {
    if (mySearchHistory.includes(cityName)) {
        return;
    } else {
        mySearchHistory.push(cityName);
        localStorage.setItem("search", JSON.stringify(mySearchHistory));
        loadSearch();
    }
}

// Load search history when the page loads
var loadSearch = function() {
    if (mySearchHistory.length > 0) {
        mySearchContainerEl.innerHTML = "";
        for (var i = 0; i < mySearchHistory.length; i++) {
            var searchBtn = document.createElement("button");
            searchBtn.className = "search-btn w-100 m-0 mb-2 pe-auto";
            searchBtn.textContent = mySearchHistory[i];
            mySearchContainerEl.appendChild(searchBtn);
        }
    } else {
        mySearchContainerEl.innerHTML = "";
    }
}

var clearHistory = function() {
    mySearchHistory = [];
    localStorage.clear();
    loadSearch();
}

// Search for location that is clicked on in history
var reSearch = function(event) {
    if (event.target.innerHTML.includes("<")) {
        return;
    } else {
        getCoordinates(event.target.innerHTML);
    }
}

loadSearch();
mySearchFormEl.addEventListener("submit", myFormSubmitHandler);
myClearButtonEl.addEventListener("click", clearHistory);
mySearchContainerEl.addEventListener("click", reSearch);
