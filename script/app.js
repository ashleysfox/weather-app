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

//Show Weather on Search
function showSearchedWeather(response) {
    currentTemp = Math.round(response.data.main.temp);
    tempHeading.innerHTML = `${currentTemp}`;
    let cityName = `${response.data.name}`;
    cityHeading.innerHTML = `${cityName}, ${response.data.sys.country}`;

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

      //Update Wind
      windData = Math.round(response.data.wind.speed);
      wind.innerHTML = `${windData}` + `${windUnit[0]}`;
      //Update Humidity
      let humidityData = Math.round(response.data.main.humidity);
      humidity.innerHTML = `${humidityData}%`;
      
    //Update Description
    let descriptionData = (response.data.weather[0].description).toUpperCase();
    description.innerHTML = `${descriptionData}`;
    
    //Update Icon
    weatherIcon.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  }

let searchField = document.querySelector("#search-form");
function weatherDataSearch(event) {
  event.preventDefault();
  let searchedCity = document.querySelector("#search-field").value;
apiUrl = apiUrl + `&q=${searchedCity}&units=${unit[0]}`;
  axios.get(apiUrl).then(showSearchedWeather);
}
searchField.addEventListener("submit", weatherDataSearch);

//Show current location weather on geo button click + load
function showGeoWeather(response) {
  console.log(response);
  currentTemp = Math.round(response.data.main.temp);
  tempHeading.innerHTML = `${currentTemp}`;
  let geoCityName = `${response.data.name}`;
  cityHeading.innerHTML = `${geoCityName}, ${response.data.sys.country}`;

  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

    //Update Wind
    windData = Math.round(response.data.wind.speed);
    wind.innerHTML = `${windData}` + `${windUnit[0]}`;

    //Update Humidity
    let humidityData = Math.round(response.data.main.humidity);
    humidity.innerHTML = `${humidityData}%`;
    
  //Update Description
  let descriptionData = (response.data.weather[0].description).toUpperCase()
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
    axios.get(apiUrl).then(showGeoWeather);
}
}

//Show current location weather on button click 
let locationButton = document.querySelector("#current-location");
locationButton.addEventListener("click", getLocation);

//Show current location weather on load
//getLocation();

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
let windData = null;
let newUnit = null;
let currentTemp = null;
let apiKey = "d99d532213301980bc66856f61cac4e9";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?&appid=${apiKey}`;
let tempHeading = document.querySelector("#current-temperature");
let wind = document.querySelector("#wind");
let cityHeading = document.querySelector("#city-heading");
let description = document.querySelector("#weather-description");
let weatherIcon = document.querySelector("#weather-icon");
let humidity = document.querySelector("#humidity");