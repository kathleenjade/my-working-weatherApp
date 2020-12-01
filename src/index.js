function formatDate(timestamp){
    let currentDate = new Date(timestamp);
    let hour = currentDate.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
      }
    let minute = currentDate.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
      }
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
      return `${day} ${month}${date}, ${hour}: ${minute}`
}

function updateResults (response){
    console.log(response.data)
let temperatureElement = document.querySelector(".temperatureToday");
let cityElement = document.querySelector("h1 .cityName");
let descriptionElement = document.querySelector ("h1 .description");
let feelsLikeElement = document.querySelector("h2 #feelsLike")
let humidity = document.querySelector("h2 #humidity");
let pressure = document.querySelector("h2 #pressure");
let wind = document.querySelector("h2 #wind");
let dateElement = document.querySelector("h1 .day");
let iconElement = document.querySelector("h1 #icon")


temperatureElement.innerHTML = Math.round(response.data.main.temp);
cityElement.innerHTML = response.data.name;
descriptionElement.innerHTML = response.data.weather[0].description;
feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
humidity.innerHTML = response.data.main.humidity;
pressure.innerHTML = response.data.main.pressure;
wind.innerHTML = response.data.wind.speed;
dateElement.innerHTML = formatDate (response.data.dt * 1000);
iconElement.setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 

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
    let searchInputElement = document.querySelector("#search-input");
    search(searchInputElement.value);
}

search("Barcelona");

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", enterCity);

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

let currentTempButton = document.querySelector("#submit-current");
currentTempButton.addEventListener("click", getCurrentPosition)