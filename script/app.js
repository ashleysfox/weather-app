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
function displayDate() {
todaysDate.innerHTML = `${days[newDate.getDay()]}, ${
  months[newDate.getMonth()]
} ${newDate.getDate()} at ${newDate.getHours()}:${newDate.getMinutes()}`;
}
console.log(newDate);

//User Search Input Actions
let searchField = document.querySelector("#search-form");
function replaceWeatherData(event) {
  event.preventDefault();
  let newCityHeading = document.querySelector("#city-heading");
  let newSearchedCity = document.querySelector("#search-field").value;
  searchApiUrl = apiUrl + `&q=${newSearchedCity}&units=${unit[0]}`;
  axios.get(searchApiUrl).then(showNewWeather);

  function showNewWeather(response) {
    console.log(response);
    //Update Degrees, City, Country
    currentTemp = Math.round(response.data.main.temp);
    tempHeading.innerHTML = `${currentTemp}`;
    newCityHeading.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  
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


}}


searchField.addEventListener("submit", replaceWeatherData);


//Show current location weather on click
function showWeather(response) {
  console.log(response.data.name);
  currentTemp = Math.round(response.data.main.temp);
  tempHeading.innerHTML = `${currentTemp}`;
  let searchedhCity = `${response.data.name}`;
  cityHeading.innerHTML = `${searchedhCity}, ${response.data.sys.country}`;

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
function showCurrentWeather(response) {
  console.log(response.data.name);
  currentTemp = Math.round(response.data.main.temp);
  tempHeading.innerHTML = `${currentTemp}`;
  let searchedhCity = `${response.data.name}`;
  cityHeading.innerHTML = `${searchedhCity}, ${response.data.sys.country}`;

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
}
  //Gathering location info
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit[0]}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
 

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
let currentTemp = null;
let tempHeading = document.querySelector("#current-temperature");
let wind = document.querySelector("#wind");
let windData = null;
let humidity = document.querySelector("#humidity");
let description = document.querySelector("#weather-description");
let weatherIcon = document.querySelector("#weather-icon");
let cityHeading = document.querySelector("#city-heading");