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

//Show Weather
function showWeather(response) {
    console.log(response);
    let currentTemp = Math.round(response.data.main.temp);
    tempHeading.innerHTML = `${currentTemp}°`;
    let cityHeading = document.querySelector("#city-heading");
    let searchedhCity = `${response.data.name}`;
    cityHeading.innerHTML = `${searchedhCity}, ${response.data.sys.country}`;
      //Update Wind
      let windData = Math.round(response.data.wind.speed);
      let wind = document.querySelector("#wind");

      if (apiUrl.includes("imperial")) {
        wind.innerHTML = `${windData}` + `${windUnit[0]}`;
      } else {
        wind.innerHTML = `${windData}` + `${windUnit[1]}`;
      }

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

//Show location weather by form search field
let searchField = document.querySelector("#search-form");
function weatherDataSearch(event) {
  event.preventDefault();
  let newSearchedCity = document.querySelector("#search-field").value;
  apiUrl = apiUrl + `&q=${newSearchedCity}&units=${unit[0]}`;
  axios.get(apiUrl).then(showWeather);
}
searchField.addEventListener("submit", weatherDataSearch);

//Show current location weather on button click + load
function getLocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
  alert("Fetching location...");
  function showPosition(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    apiUrl = apiUrl + `&lat=${lat}&lon=${lon}&units=${unit[0]}`;
    axios.get(apiUrl).then(showWeather);
}
}

//Show current location weather on button click 
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

//Show current location weather on load
getLocation();

//Update BKG Gradient based on time of day
let bkgGradient = document.querySelector('#today-section');
let hour = newDate.getHours();
if (hour > 17) {
bkgGradient.classList.remove("today-section-day");
bkgGradient.classList.add("today-section-night");
} 

//Celsius to Fahrenheit Toggle 
function showCelsiusTemp(event){
  event.preventDefault();
  apiUrl = apiUrl.replace(`${unit[0]}`, `${unit[1]}`);
  axios.get(apiUrl).then(showWeather);
}

function showFahrenheitTemp(event){
  event.preventDefault();
  apiUrl = apiUrl.replace(`${unit[1]}`, `${unit[0]}`);
  axios.get(apiUrl).then(showWeather);
}

let fahrenheitLink = document.querySelector("#fahrenheit");
let celsiusLink = document.querySelector("#celsius");
fahrenheitLink.addEventListener("click", showFahrenheitTemp);
celsiusLink.addEventListener("click", showCelsiusTemp);

//Global Items
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
let tempHeading = document.querySelector("#current-temperature");