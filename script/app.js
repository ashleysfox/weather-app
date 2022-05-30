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
todaysDate.innerHTML = `${days[newDate.getDay()]}, ${
  months[newDate.getMonth()]
} ${newDate.getDate()} at ${newDate.getHours()}:${newDate.getMinutes()}`;

console.log(newDate);

//User Search Input Actions
let searchField = document.querySelector("#search-form");
function replaceWeatherData(event) {
  event.preventDefault();
  let newCityHeading = document.querySelector("#city-heading");
  let newSearchedCity = document.querySelector("#search-field").value;
  let searchedUnit = "imperial";
  let apiKey = "d99d532213301980bc66856f61cac4e9";
  let searchApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${newSearchedCity}&appid=${apiKey}&units=${searchedUnit}`;
  axios.get(searchApiUrl).then(showNewWeather);

  function showNewWeather(response) {
    console.log(response);
    //Update Degrees, City, Country
    let currentTemp = Math.round(response.data.main.temp);
    let tempH1 = document.querySelector("h1");
    tempH1.innerHTML = `${currentTemp}°`;
    newCityHeading.innerHTML = `${response.data.name}, ${response.data.sys.country}`;
  
  //Update Wind
  let windData = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windData}`;

  //Update Humidity
  let humidityData = Math.round(response.data.main.humidity);
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humidityData}%`;
  
//Update Description
let descriptionData = (response.data.weather[0].description).toUpperCase();
let description = document.querySelector("#weather-description");
description.innerHTML = `${descriptionData}`;

 //Update Icon
 let weatherIcon = document.querySelector("#weather-icon");
 weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

}}


searchField.addEventListener("submit", replaceWeatherData);


//Show current location weather on click
function showWeather(response) {
  console.log(response.data.name);
  currentTemp = Math.round(response.data.main.temp);
  let tempH1 = document.querySelector("h1");
  tempH1.innerHTML = `${currentTemp}°`;
  let cityHeading = document.querySelector("#city-heading");
  let searchedhCity = `${response.data.name}`;
  cityHeading.innerHTML = `${searchedhCity}, ${response.data.sys.country}`;
}

function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
  alert("Fetching location...");
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let unit = "imperial"
    let apiKey = "d99d532213301980bc66856f61cac4e9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showWeather);
  }
}

let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

//Show Current Location on Load
function showCurrentWeather(response) {
  console.log(response.data.name);
  let currentTemp = Math.round(response.data.main.temp);
  let tempH1 = document.querySelector("h1");
  tempH1.innerHTML = `${currentTemp}°`;
  let cityHeading = document.querySelector("#city-heading");
  let searchedhCity = `${response.data.name}`;
  cityHeading.innerHTML = `${searchedhCity}, ${response.data.sys.country}`;
    //Update Wind
    let windData = Math.round(response.data.wind.speed);
    let wind = document.querySelector("#wind");
    wind.innerHTML = `${windData}`;
  
    //Update Humidity
    let humidityData = Math.round(response.data.main.humidity);
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = `${humidityData}%`;
    
  //Update Description
  let descriptionData = (response.data.weather[0].description).toUpperCase();
  let description = document.querySelector("#weather-description");
  description.innerHTML = `${descriptionData}`;
  
  //Update Icon
  let weatherIcon = document.querySelector("#weather-icon");
  weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
  //Gathering location info
  navigator.geolocation.getCurrentPosition(showPosition);
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    let unit = "imperial";
    let apiKey = "d99d532213301980bc66856f61cac4e9";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;
    axios.get(apiUrl).then(showCurrentWeather);
  }
 

//Update BKG Gradient based on time

let bkgGradient = document.querySelector('#today-section');
let hour = newDate.getHours();
if (hour > 17) {
bkgGradient.classList.remove("today-section-day");
bkgGradient.classList.add("today-section-night");
} 



