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

// Use AJAX to call current weather
function currentWeather(city){
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
    }).then(function(response){
