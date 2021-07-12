
// SELECTOR FOR MAIN//
var submitEl = document.getElementById('submit-btn')
var currentTempEl = document.getElementById('current-temp')
var currentUviEl = document.getElementById('current-uvi')
var currentHumiEl = document.getElementById('current-humi')

// WEEKLY FORECAST //
var dateEl = document.getElementsByClassName('fdate')
var tempEl = document.getElementsByClassName('ftemp')
var uviEl = document.getElementsByClassName('fuvi')
var humiEl = document.getElementsByClassName('fhumi')
var nameEl = document.getElementById('current-name')

// LOCAL STORAGE //
const cityListHandler = document.getElementById('history')

// MAIN FUNCTION API //
function getWeather(city){
    // pastcall(city);
    
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ city +'&appid=4b32bc002f15ef905283bad751a35660'
    ).then((response) => {

        // checks if the city search input is valid //
        if (response.ok){
            console.log('connected')
        } else {
            console.log('error')
        }   
        return response.json();
    }).then((data) => {

        // Sets the lon & lat for the next fetch api //
        var lon = data.coord.lon
        var lat = data.coord.lat
     
        // adds the city name to a local storage //
        nameEl.textContent = data.name
        addCity(data.name)

        // runs the main API which uses the first API's lat and lon variables //
        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely&appid=4b32bc002f15ef905283bad751a35660')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            // dynamically updates the temp, uvi, humidity on the weekly forecast //
            displayForecast(data)
        })
    }) 
}

function displayForecast (data) {
    for (var i = 0; i < 7; i++) {
        tempEl[i].textContent = Math.trunc(data.daily[i].temp.max) + '°F'
        uviEl[i].textContent = data.daily[i].uvi
        humiEl[i].textContent = data.daily[i].humidity + '%'
    }
    for (var i = 0; i < 6; i++) {
        dateEl[i].textContent = moment().add(i + 1, 'days').format('dddd');
    }
}

function addCity (city) {
    var cityX = city;
    var cities = JSON.parse(localStorage.getItem('city')) || [];
    if (cities.includes(cityX)) {
        return;
    } else {
        cities.push(cityX);
        localStorage.setItem('city', JSON.stringify(cities));
    }
}

// function pastcall (city) {
//     //sets the last search
//     var lastcity = city;
//     localStorage.setItem('lastcity', JSON.stringify(lastcity))
//     getWeather(JSON.parse(localStorage.getItem('lastcity')))

// } 



submitEl.addEventListener('click', () => {
    var city = document.getElementById('input-key').value
    getWeather(city)
    
    
})

cityListHandler.addEventListener('click', function (event) {
   var currentcity = event.target.textContent
    getWeather(currentcity)
})




// getWeather('manila');

function appendCity () {
    var cities = JSON.parse(localStorage.getItem('city')) || [];
    for (var i = 0; i < cities.length; i++) {
        var citylistEl = document.getElementById('history')
        var buttonEl = document.createElement('button')
        buttonEl.textContent = cities[i]
        citylistEl.append(buttonEl);
        
    }
}

function retrieveCity () {
    if (!JSON.parse(localStorage.getItem('city'))) { 
        console.log('its empty')
        initialeCity ();
    } else {
        var cityY = JSON.parse(localStorage.getItem('city'))
    var cityJ = cityY[cityY.length-1]
    getWeather(cityJ)
    }
}

function initialeCity () {
    getWeather('grand prairie')
}


appendCity();
retrieveCity ();
