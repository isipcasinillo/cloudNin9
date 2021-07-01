var submitEl = document.getElementById('submit-btn')


// SELECTOR FOR MAIN//
var currentTempEl = document.getElementById('current-temp')
var currentUviEl = document.getElementById('current-uvi')
var currentHumiEl = document.getElementById('current-humi')
var currentNameEl = document.getElementById('current-name')

// WEEKLY FORECAST //


function getWeather(city){
    fetch(
        'https://api.openweathermap.org/data/2.5/weather?q='+ 'manila' +'&appid=4b32bc002f15ef905283bad751a35660'
    ).then((response) => {
        if (response.ok){
            console.log('connected')
        } else {
            console.log('error')
        }   
        return response.json();
    }).then((data) => {
        var lon = data.coord.lon
        var lat = data.coord.lat
        console.log(data)

        fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&units=imperial&exclude=minutely&appid=4b32bc002f15ef905283bad751a35660')
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            currentTempEl.textContent = data.daily[0].temp.max
            currentUviEl.textContent = data.daily[0].uvi
            currentHumiEl.textContent = data.daily[0].humidity
            currentNameEl.textContent = data.timezone
        })
    }) 
    
}

submitEl.addEventListener('click', () => {
    var city = document.getElementById('input-key').value
    getWeather(city)
})




