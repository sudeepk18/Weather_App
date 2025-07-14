document.addEventListener('DOMContentLoaded',()=>{
    const cityInput = document.getElementById('city-input');
    const getWeather = document.getElementById('get-weather-btn');
    const WeatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temprature = document.getElementById('temprature');
    const description = document.getElementById('description');
    const errorMessage = document.getElementById('error message');

    const API_KEY="2c2975744e5038967437718b955188a1";

    getWeather.addEventListener('click',async ()=>{
    const city = cityInput.value.trim();
    if(!city)return;

    try {
        const weatherData = await fetchWeatherData(city)
        DisplayWeatherData(weatherData)
    } catch (error) {
        showError()
    }

    })

    async function fetchWeatherData(city){
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}
`;
        const  response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE",response);
        if(!response.ok){
            throw new Error("City not found");
        }
        const data = await response.json()
        return data;
    }   

    function DisplayWeatherData(data){
        console.log(data);
        const {name,main,weather} = data;
        cityName.textContent = name;

        temprature.textContent = `Temprature:${main.temp}`;
        description.textContent = `Weather:${weather[0].description}`;

        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }
    function showError(){
        WeatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
    }

})