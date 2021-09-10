const key = API_Key();
let searchBtn = document.querySelector(".btn");
let inputBox = document.querySelector(".input-feild");
let body = document.querySelector("body");

searchBtn.addEventListener('click', function(e) {
    let inputVal = inputBox.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${key}&units=metric`)
    .then(response => response.json())
    .then(data => {
        if(data.message == "city not found") {
            alert("Please search for a valid city");
            inputBox.value = "";
            return;
        }
        
        let city = data.name;
        let country = data.sys.country;

        let temp = data.main.temp;
        let temp_feels_like = data.main.feels_like;
        let humidity = data.main.humidity;

        let weather = data.weather[0].main;
        let img_icon = data.weather[0].icon;

        let img_URL = "http://openweathermap.org/img/w/" + img_icon + ".png";

        if(document.querySelector(".weather-display")) {
            document.querySelector(".weather-display").remove();
        }

        let weatherContainer = document.createElement("div");
        weatherContainer.classList.add("weather-display");
        weatherContainer.innerHTML = `<h2 class="cityName">&nbsp ${city}, ${country} &nbsp</h2>
        <div class="inner-div-1">
            <h6 class="weather-stats">CURRENT TEMP : ${temp}<sup>o </sup>C </h6>
            <h6 class="weather-stats">FEELS LIKE : ${temp_feels_like}<sup>o </sup>C </h6>
            <h6 class="weather-stats">HUMIDITY : ${humidity} g.kg<sup>-1</sup> </h6>
        </div>
        <div class="inner-div-2">
            <h6>CURRRENT WEATHER : ${weather}</h6>
            <img class="weather-image" src=${img_URL}>
        </div>`
        body.appendChild(weatherContainer);
        inputBox.value = "";
    })
    .catch(() => {
        alert("Please search for a valid city. If the city name is valid, Please try after some time");
    });
})


