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

let now = new Date();
let day = days[now.getDay()];
let month = months[now.getMonth()];
let hour = now.getHours();
let minute = now.getMinutes();
let date = now.getDate();

if (hour < 10) {
  hour = `0${hour}`;
}
if (minute < 10) {
  minute = `0${minute}`;
}

let currentDate = document.querySelector("#today");
currentDate.innerHTML = `${day}, ${date} ${month} ${hour}:${minute}`;

function showWeather(response) {
  console.log(response.data);
  let city = response.data.name;
  let country = response.data.sys.country;
  let tempC = Math.round(response.data.main.temp);
  let humidity = response.data.main.humidity;
  let windSpeed = response.data.wind.speed;
  let description = response.data.weather[0].description;

  let cityElement = document.querySelector("#citySearch");
  let temperatureElement = document.querySelector("#currentTemperature");
  let windElement = document.querySelector("#windSpeed");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#weatherDescription");

  cityElement.innerHTML = `${city}, ${country}`;
  temperatureElement.innerHTML = `${tempC}`;
  windElement.innerHTML = `${windSpeed} mps`;
  humidityElement.innerHTML = `${humidity}%`;
  descriptionElement.innerHTML = `${description}`;
}

function showNewCityWeather(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let searchFromInput = searchInput.value;
  let apiKey = "3bf3d898af236340eac60ab5658c130c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchFromInput}&units=metric`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", showNewCityWeather);

//Challenge 2
function showLocationTemperature(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentPosition);
  function showCurrentPosition(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiKey = "3bf3d898af236340eac60ab5658c130c";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric`;
    axios.get(`${apiUrl}&appid=${apiKey}`).then(showWeather);
  }
}
let currentLocationButton = document.querySelector(".locationButton");
currentLocationButton.addEventListener("click", showLocationTemperature);
