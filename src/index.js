let currentDate = new Date();
let updatedDate = document.querySelector("h1 .day");
let days = [
  "SUNDAY",
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY"
];
let day = days[currentDate.getDay()];
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec"
];
let month = months[currentDate.getMonth()];
let year = currentDate.getFullYear();
let date = currentDate.getDate();
let hour = currentDate.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = currentDate.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}
updatedDate.innerHTML = `${day}  ${month} ${date} , ${hour}: ${minute}`;

function updateResults(response) {
  document.querySelector("h1 .cityName").innerHTML = response.data.name;
  document.querySelector(".temperatureToday").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "h2 .pressure"
  ).innerHTML = `Pressure: ${response.data.main.pressure}hPa`;
  document.querySelector(
    "h2 .humidity"
  ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
  document.querySelector(
    "h2 .wind"
  ).innerHTML = `Wind:${response.data.wind.speed}m/s`;
  document.querySelector(
    "h1 .description"
  ).innerHTML = `(${response.data.weather[0].description})`;
  document.querySelector("h2 .emoji").innerHTML = response.data.weather[0].icon;
}

function search(city) {
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q";
  let apiKey = "01ccbdb64fbdc91284e6a914f1479c4a";
  let apiUrl = `${apiEndpoint}=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(updateResults);
}

function enterCity(event) {
  event.preventDefault();
  let city = document.querySelector("#search-input").value;

  search(city);
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);
search("Barcelona");

function showCurrentLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  console.log(position);
  console.log(latitude);
  console.log(longitude);
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
  let units = "metric";
  let apiKey = "01ccbdb64fbdc91284e6a914f1479c4a";
  let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
  console.log(apiUrl);

  axios.get(apiUrl).then(updateResults);
}

function getCurrentPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

let currentTempButton = document.querySelector("#submit-current");
currentTempButton.addEventListener("click", getCurrentPosition);

//function updateCelsius(event) {
//event.preventDefault();
//let tempInCel = document.querySelector("h3 .temperatureToday");
//tempInCel.innerHTML = `18`;
//}
//let celsiusToday = document.querySelector("#celsius");
//celsiusToday.addEventListener("click", updateCelsius);

//function updateFahrenheit(event) {
//event.preventDefault();
//let tempInFahr = document.querySelector(".temperatureToday");
//tempInFahr.innerHTML = `64`;
//}

//let fahrenheitToday = document.querySelector("#fahrenheit");
//fahrenheitToday.addEventListener("click", updateFahrenheit);
