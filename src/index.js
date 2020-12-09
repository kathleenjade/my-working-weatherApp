function formatDate(timestamp){
    let currentDate = new Date(timestamp);

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
      let date = currentDate.getDate();
      return `${day} ${month} ${date}, ${formatHours(timestamp)}`
}

function formatHours(timestamp) {
    let currentDate = new Date(timestamp);
    let hour = currentDate.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
      }
    let minute = currentDate.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
      }
    return `${hour}:${minute}`;
}


function updateResults (response){
let temperatureElement = document.querySelector(".temperatureToday");
let cityElement = document.querySelector("h1 .cityName");
let descriptionElement = document.querySelector ("h1 .description");
let feelsLikeElement = document.querySelector("h1 #feelsLike")
let humidity = document.querySelector("h1 #humidity");
let pressure = document.querySelector("h1 #pressure");
let wind = document.querySelector("h1 #wind");
let dateElement = document.querySelector("h1 .day");
let iconElement = document.querySelector("h1 #icon")

celsiusTemperature = response.data.main.temp;

temperatureElement.innerHTML = Math.round(celsiusTemperature);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
humidity.innerHTML = response.data.main.humidity;
pressure.innerHTML = response.data.main.pressure;
wind.innerHTML = response.data.wind.speed;
dateElement.innerHTML = formatDate (response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 

}

function displayForecast(response) {
    let forecastElement = document.querySelector(".weather-forecast");
    forecastElement.innerHTML = null;
    let forecast = null;
    
    for (let index = 0; index < 6; index++) {
        forecast = response.data.list[index];
        forecastElement.innerHTML += `
    <div class="col-sm-2">
         <h2> 
         <div class="forecastHours">
               ${formatHours(forecast.dt * 1000)}
         </div>
         </h2>
         <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png" 
         id="forecastIcon">
         <span class="forecast-temperature-max">
               ${Math.round(forecast.main.temp_max)}° </span> |  <span class="forecast-temperature-min"> ${Math.round(forecast.main.temp_min)}° </span> 
         </div>
        </div>`
        ;
    }  
}

function search(city) {
    let units = "metric";
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?q";
    let apiKey = "01ccbdb64fbdc91284e6a914f1479c4a";
    let apiUrl = `${apiEndpoint}=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(updateResults);

    apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayForecast);
}

function enterCity(event) {
    event.preventDefault();
    let searchInputElement = document.querySelector("#search-input");
    search(searchInputElement.value);
}

function showCurrentLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather?";
    let units = "metric";
    let apiKey = "01ccbdb64fbdc91284e6a914f1479c4a";
    let apiUrl = `${apiEndpoint}lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    
    axios.get(apiUrl).then(updateResults);
}

function getCurrentPosition(event) {
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(showCurrentLocation);
}

function displayFahrenheitTemp(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector(".temperatureToday");
    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");
    let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}
 
function displayCelsiusTemp(event) {
    event.preventDefault;
    celsiusLink.classList.add("active");
    fahrenheitLink.classList.remove("active");
    let temperatureElement = document.querySelector(".temperatureToday");
    temperatureElement.innerHTML = Math.round(celsiusTemperature);

}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

let currentTempButton = document.querySelector("#submit-current");
currentTempButton.addEventListener("click", getCurrentPosition)
 
let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemp);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemp);


search("Barcelona");