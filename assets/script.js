//5 day forecast with my API key
var myAPI= "496d9caed19b5898e62a2e3928f9c3d3";

//GIVEN a weather dashboard with form inputs
//WHEN I search for a city

//variables for search: 
var searchLocation = $("#search-location");
var currentLocation = $("#current-location");

//variables for button clicks to add/clear search results:
var searchButton = $("#search-button");
var clearHistory = $("#clear-history");

//variable to commit search results to local storage
var city="";

//variables for current weather conditions
var condNow = $("cond-now");
var tempNow = $("temp-now");
var humidityNow = $("humidity-now");
var windNow = $("wind=now");
