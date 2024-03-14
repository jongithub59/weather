const search = document.querySelector('input')
const weather = document.querySelector('.forecast-results')
const errorMessage = document.querySelector('.error');
const icon = document.querySelector('.weather-icon')

search.addEventListener("keypress", (e) => {
  if (e.key === "Enter") getWeather(search, displayWeather);
});

 async function getWeather(search, displayWeather) {
   let data = ""
   try {
     data = await fetch(
       "http://api.weatherapi.com/v1/current.json?key=266ffb2a72a14ebc8d9161324240603&q=" + search.value + "&aqi=no",
       { mode: "cors" }
     )
     const forecast = await data.json()
     console.log(forecast)
     displayWeather(forecast)
   } catch (error) {
     console.log(error)
     if (search.value === '') return
     errorMessage.textContent = "Could not get weather data";
     weather.textContent = ''
     icon.style.display = 'none'
   }
 }

function displayWeather(forecast) {
     errorMessage.textContent = "";
     weather.textContent = `Forecast for ${forecast.location.name}, ${forecast.location.country}: \n Temperature: ${forecast.current.temp_f}°F/${forecast.current.temp_c}°C, ${forecast.current.condition.text}`;
     icon.src = forecast.current.condition.icon
     icon.style.display = 'initial'
    }