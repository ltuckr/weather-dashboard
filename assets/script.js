var key = config.API_KEY;
var weatherIcon = document.querySelector('.weather-icon');
var temp = document.querySelector('.temp');
var windSpeed = document.querySelector('.wind-speed');
var humidity = document.querySelector('.humidity');
var uvIndex = document.querySelector('.uv-index');
var searchForm = document.querySelector('.search-form');
var searchInput = document.querySelector('.search-input');
var searchContainer = document.querySelector('.search-container');
var errorMessage = document.querySelector('.error-message');
var resetButton = document.querySelector('.reset-button');
var header = document.querySelector('.header');
var forecastData = document.querySelector('.current-data');
var forecastIcon = document.querySelector('.forecast-icon');

let search + JSON.parse(localStorage.getItem('search')) || [];

