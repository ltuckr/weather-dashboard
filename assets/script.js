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

// 5 day forecast function
function forecast(cityid){
  var dayover= false;
  var queryforcastURL="https://api.openweathermap.org/data/2.5/forecast?id="+cityid+"&appid="+APIKey;
  $.ajax({
      url:queryforcastURL,
      method:"GET"
  }).then(function(response){
      
      for (i=0;i<5;i++){
          var date= new Date((response.list[((i+1)*8)-1].dt)*1000).toLocaleDateString();
          var iconcode= response.list[((i+1)*8)-1].weather[0].icon;
          var iconurl="https://openweathermap.org/img/wn/"+iconcode+".png";
          var tempK= response.list[((i+1)*8)-1].main.temp;
          var tempF=(((tempK-273.5)*1.80)+32).toFixed(2);
          var humidity= response.list[((i+1)*8)-1].main.humidity;
      
          $("#fDate"+i).html(date);
          $("#fImg"+i).html("<img src="+iconurl+">");
          $("#fTemp"+i).html(tempF+"&#8457");
          $("#fHumidity"+i).html(humidity+"%");
      }
      
  });
}

// call current weather - code via geolocation from https://nordicapis.com/how-to-build-an-api-driven-weather-app/
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
 // display current city and conditions to console
    console.log(response);

var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;

 //retrieve weather icons from OWM
var weathericon= response.weather[0].icon;
var iconurl="https://openweathermap.org/img/wn/"+weathericon +"@2x.png";
var date=new Date(response.dt*1000).toLocaleDateString();

  //parse the response for name of city and concat with date and weather icon.
  $(currentLocation).html(response.name +"("+date+")" + "<img src="+iconurl+">");
  
// C to F conversion.
var tempFarenheit = (response.main.temp - 273.15) * 1.80 + 32;
  $(currentTemperature).html((tempF).toFixed(2)+"&#8457");

// Humidity
  $(humidityNow).html(response.main.humidity+"%");

//Wind with mph conversion
var ws=response.wind.speed;
var windsmph=(ws*2.237).toFixed(1);
  $(windNow).html(windsmph+"MPH");

// variable for rendering from local storage
var storedCity=[];
//render list
function loadStoredCity(){
  $("ul").empty();
  var storedCity = JSON.parse(localStorage.getItem("cityname"));
  if(storedCity!==null){
      sCity=JSON.parse(localStorage.getItem("cityname"));
      for(i=0; i<storedCity.length;i++){
          addToList(storedCity[i]);
      }
      city=storedCity[i-1];
      currentWeather(city);
  }

}
//Clear search history
function clearHistory(event){
  event.preventDefault();
  storedCity=[];
  localStorage.removeItem("cityname");
  document.location.reload();

}
//Click Handlers
$("#search-button").on("click",displayWeather);
$(document).on("click",invokePastSearch);
$(window).on("load",loadStoredCity);
$("#clear-history").on("click",clearHistory);
        


