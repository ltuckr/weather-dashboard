//My API key
var myAPI= "496d9caed19b5898e62a2e3928f9c3d3";

//GIVEN a weather dashboard with form inputs
//WHEN I search for a city

//variables for search action: 
var searchLocation = $("#search-location");
var currentLocation = $("#current-location");

//variables for button clicks to add/clear search results:
var searchButton = $("#search-button");
var clearHistory = $("#clear-history");

//variable to commit search results to local storage
var city="";

//WHEN I view current weather conditions for that city
//THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the the wind speed

//variables for current weather conditions
var condNow = $("cond-now");
var tempNow = $("temp-now");
var humidityNow = $("humidity-now");
var windNow = $("wind=now");

// call current weather - code from https://nordicapis.com/how-to-build-an-api-driven-weather-app/
window.addEventListener('load', () => {});
var long;
var lat;
// Accessing Geolocation of User
  if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
        // Storing Longitude and Latitude in variables
        long = position.coords.longitude;
        lat = position.coords.latitude;
      });
    }
 // parse the response to display the current weather including the city name, date and current weather icon.
    console.log(response);

var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;



