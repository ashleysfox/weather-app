//Add Current Date/Time
let newDate = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

let todaysDate = document.querySelector("#date-today");
let minutes = newDate.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

todaysDate.innerHTML = `${days[newDate.getDay()]}, ${
  months[newDate.getMonth()]
} ${newDate.getDate()} at ${newDate.getHours()}:${minutes}`;

console.log(newDate);

//Show current location weather on click
function showWeather(response) {
  console.log(response);
  currentTemp = Math.round(response.data.main.temp);
  tempHeading.innerHTML = `${currentTemp}`;
  cityHeading.innerHTML = `${response.data.name}, ${response.data.sys.country}`;

  //Update Wind
  windData = Math.round(response.data.wind.speed);
  wind.innerHTML = `${windData}` + `${windUnit[0]}`;
  
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  
  //Update Humidity
  let humidityData = Math.round(response.data.main.humidity);
  humidity.innerHTML = `${humidityData}%`;
    
  //Update Description
  let descriptionData = (response.data.weather[0].description).toUpperCase();
  description.innerHTML = `${descriptionData}`;
  
  //Update Icon
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  getForecast(response.data.coord);

}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    apiUrl = apiUrl + `&lat=${lat}&lon=${lon}&units=${unit[0]}`;
    axios.get(apiUrl).then(showWeather);
  }
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

//Show Current Location on Load
getLocation();

//Display weather based on search field
let searchField = document.querySelector("#search-form");
function replaceWeatherData(event) {
  event.preventDefault();
  let newSearchedCity = document.querySelector("#search-field").value;
  searchApiUrl = apiUrl + `&q=${newSearchedCity}&units=${unit[0]}`;
  axios.get(searchApiUrl).then(showWeather);
}

searchField.addEventListener("submit", replaceWeatherData);

//Update BKG Gradient based on time
let bkgGradient = document.querySelector('#today-section');
let hour = newDate.getHours();
if (hour > 17) {
bkgGradient.classList.remove("today-section-day");
bkgGradient.classList.add("today-section-night");
} 

//Celsius to Fahrenheit Toggle 
function showCelsiusTemp(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let celsiusTemp = (currentTemp - 32) * .5556;
  tempHeading.innerHTML = Math.round(celsiusTemp);
  let metricWindSpeed = Math.round(windData * 1.609);
  wind.innerHTML = `${metricWindSpeed}` + `${windUnit[1]}`;
}

function showFahrenheitTemp(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  tempHeading.innerHTML = currentTemp;
  wind.innerHTML = `${windData}` + `${windUnit[0]}`;
}

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
celsiusLink.addEventListener("click", showCelsiusTemp);

// Display Forecast
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sunday", "Monday", "Tueday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return days[day + 1];
}


let forecastHTML = "";

function displayForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  forecast.forEach(function (forecastDay, index) {
      if (index < 5) {  
    forecastHTML = forecastHTML +
    `<div class="col-8 next-day-row">
     <span>
     <img src="http://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png"
     alt=""
     width="30"/>
     ${formatDay(forecastDay.dt)}</span>
     </div>
     <div class="col-4 next-weather">
     <strong>${Math.round(forecastDay.temp.max)}°</strong>/
    ${Math.round(forecastDay.temp.min)}°</div>`;
    let forecastElement = document.querySelector("#forecast");
    forecastElement.innerHTML = forecastHTML;
  }});}

function getForecast(coordinates) {
  let forecastApiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&units=${unit[0]}&appid=${apiKey}`;
  axios.get(forecastApiUrl).then(displayForecast);
}

//Msc Global Items
let unit = [
  "imperial",
  "metric",
];
let windUnit = [
  "mph",
  "km/h",
] ;
let apiKey = "d99d532213301980bc66856f61cac4e9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}`;
let cityHeading = document.querySelector("#city-heading");
let currentTemp = null;
let description = document.querySelector("#weather-description");
let humidity = document.querySelector("#humidity");
let tempHeading = document.querySelector("#current-temperature");
let weatherIcon = document.querySelector("#weather-icon");
let wind = document.querySelector("#wind");
let windData = null;