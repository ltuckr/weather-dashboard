// My API key
var APIKey = "496d9caed19b5898e62a2e3928f9c3d3";

// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

// Variables for search action:
var searchLocation = $("#search-location");
var currentLocation = $("#current-location");

// Variables for button clicks to add/clear search results:
var searchButton = $("#search-button");
var clearHistoryButton = $("#clear-history");

// Variable to store search results
var city = "";

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

// Variables for current weather conditions
var condNow = $("#cond-now");
var tempNow = $("#temp-now");
var humidityNow = $("#humidity-now");
var windNow = $("#wind-now");

//function to display the weather
function displayWeather(event){
  event.preventDefault();
  if(searchLocation.val().trim()!==""){
      city=searchLocation.val().trim();
      currentWeather(city);
  }

// 5-day forecast function
function forecast(cityid) {
  var dayover = false;
  var queryForecastURL =
    "https://api.openweathermap.org/data/2.5/forecast?id=" +
    cityid +
    "&appid=" +
    APIKey;
  $.ajax({
    url: queryForecastURL,
    method: "GET"
  }).then(function (response) {
    for (var i = 0; i < 5; i++) {
      var date = new Date(response.list[((i + 1) * 8) - 1].dt * 1000).toLocaleDateString();
      var iconcode = response.list[((i + 1) * 8) - 1].weather[0].icon;
      var iconurl = "https://openweathermap.org/img/wn/" + iconcode + ".png";
      var tempK = response.list[((i + 1) * 8) - 1].main.temp;
      var tempF = (((tempK - 273.5) * 1.8) + 32).toFixed(2);
      var humidity = response.list[((i + 1) * 8) - 1].main.humidity;

      $("#fDate" + i).html(date);
      $("#fImg" + i).html("<img src=" + iconurl + ">");
      $("#fTemp" + i).html(tempF + "&#8457");
      $("#fHumidity" + i).html(humidity + "%");
    }
  });
}

// Call current weather code via geolocation
window.addEventListener('load', function () {
  var long;
  var lat;
  
  // Accessing Geolocation of User
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      // Storing Longitude and Latitude in variables
      long = position.coords.longitude;
      lat = position.coords.latitude;
      
      // Display current city and conditions to console
      console.log(response);

      var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&appid=" + APIKey;

      // Retrieve weather icons from OpenWeatherMap
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        var weathericon = response.weather[0].icon;
        var iconurl = "https://openweathermap.org/img/wn/" + weathericon + "@2x.png";
        var date = new Date(response.dt * 1000).toLocaleDateString();

        // Parse the response for name of city and concatenate with date and weather icon.
        $(currentLocation).html(response.name + " (" + date + ") " + "<img src=" + iconurl + ">");

        // Convert temperature from Kelvin to Fahrenheit
        var tempFahrenheit = (response.main.temp - 273.15) * 1.8 + 32;
        $(tempNow).html(tempFahrenheit.toFixed(2) + "&#8457");

        // Display humidity
        $(humidityNow).html(response.main.humidity + "%");

        // Convert wind speed to mph
        var windSpeed = response.wind.speed;
        var windSpeedMPH = (windSpeed * 2.237).toFixed(1);
        $(windNow).html(windSpeedMPH + " MPH");
      });
    });
  }
});

// Variable for rendering from local storage
var storedCity = [];

// Render list
function loadStoredCity() {
  $("ul").empty();
  var storedCity = JSON.parse(localStorage.getItem("cityname"));
  if (storedCity !== null) {
    for (var i = 0; i < storedCity.length; i++) {
      addToList(storedCity[i]);
    }
    city = storedCity[i - 1];
    currentWeather(city);
  }
}

// Clear search history
function clearHistory(event) {
  event.preventDefault();
  storedCity = [];
  localStorage.removeItem("cityname");
  document.location.reload();
}

// Click Handlers
$("#search-button").on("click", displayWeather);
$(document).on("click", invokePastSearch);
$(window).on("load", loadStoredCity);
$("#clear-history").on("click", clearHistory);
        


