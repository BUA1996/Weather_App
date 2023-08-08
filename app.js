
const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = "7feba35048e1480d9bf134849230208";


const city = document.querySelector('.location');
const cond = document.querySelector('.condition');
const temp = document.querySelector('.temperature');
const icon = document.querySelector('.condIcon');

const endPoints = async (url,city,date)=>{
    try{
    const res = await fetch(`${BASE_URL}${url}?key=${API_KEY}&q=${city}${date ? `&days=${date}`:""}`, {mode:"cors"})
    data = await res.json();
    return data

    }catch(error){
        return {error}
    }
}

const current = async (cityName, days) => {
    const getCurrent = await endPoints("/forecast.json",cityName,days);
    const {current,location}=getCurrent;
    city.textContent = location.name;
    icon.src = current.condition.icon;
    cond.textContent = current.condition?.text;
    temp.textContent = current.temp_c + " °C";
    console.log('baron', getCurrent);
}
let citySearch = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');

searchButton.addEventListener('click', () => {
    current(citySearch.value.trim(), 3);
})

citySearch.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && citySearch !== ' ') {
        current(citySearch.value.trim(), 3);
    }
})
current("kampala", 3);
