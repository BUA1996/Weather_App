//Api calls
const BASE_URL = "https://api.weatherapi.com/v1";
const API_KEY = "7feba35048e1480d9bf134849230208";

//getting elements
const city = document.querySelector('.location');
const cond = document.querySelector('.condition');
const temp = document.querySelector('.temperature');
const icon = document.querySelector('.condIcon');
const dateTime = document.querySelector('.date-time')

//api call
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
    const {current,location, forecast}=getCurrent;
    city.textContent = location.name;

    //date-time
    const dateString = current.last_updated;
    const date = new Date(dateString);
    const options = { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit'};
    const dayOfWeek = date.toLocaleDateString('en-US', options);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const amOrPm = hours >= 12 ? 'pm' : 'am';
    const formatedTime = `${hours % 12}:${minutes < 10 ? '0' : ''}${minutes} ${amOrPm}`;
    const finalDateTime = `${dayOfWeek}, ${formatedTime}`;
    dateTime.textContent = finalDateTime;
    icon.src = current.condition.icon;
    cond.textContent = current.condition?.text;
    temp.textContent = current.temp_c + " °C";
    console.log('baron', getCurrent);

    //forcast- day -1
    const day = document.querySelector('.day');
    const conditionOne = document.querySelector('.conditionOne');
    const iconOne = document.querySelector('.iconOne');
    const tempOne = document.querySelector('.tempOne');
    const datString = forecast.forecastday[1].date;
    function dateConvert(fetchdate) {
        const dat = new Date(fetchdate);
        const option = { weekday: 'long'/*, day: 'numeric', month: 'short', year: '2-digit'*/};
        const dayOfW = dat.toLocaleDateString('en-US', option);
        return dayOfW;
    }
    day.textContent = dateConvert(datString);
    conditionOne.textContent = forecast.forecastday[1].day.condition.text;
    iconOne.src = forecast.forecastday[1].day.condition.icon;
    tempOne.textContent = forecast.forecastday[1].day.avgtemp_c + " °C";

    //day- 2
    const dayTwo = document.querySelector('.dayTwo');
    const conditionTwo = document.querySelector('.conditionTwo');
    const iconTwo = document.querySelector('.iconTwo');
    const tempTwo = document.querySelector('.tempTwo');
    const dayTwoDate = forecast.forecastday[2].date;
    dayTwo.textContent = dateConvert(dayTwoDate);
    conditionTwo.textContent = forecast.forecastday[2].day.condition.text;
    iconTwo.src = forecast.forecastday[2].day.condition.icon;
    tempTwo.textContent = forecast.forecastday[2].day.avgtemp_c + " °C";

    //day - 3
    const dayThree = document.querySelector('.dayThree');
    const conditionThree = document.querySelector('.conditionThree');
    const iconThree = document.querySelector('.iconThree');
    const tempThree = document.querySelector('.tempThree')
    const dayThreeDate = forecast.forecastday[3].date;
    dayThree.textContent = dateConvert(dayThreeDate);
    conditionThree.textContent = forecast.forecastday[3].day.condition.text;
    iconThree.src = forecast.forecastday[3].day.condition.icon;
    tempThree.textContent = forecast.forecastday[3].day.avgtemp_c + " °C";




}

//search button 
let citySearch = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');
//onclick
searchButton.addEventListener('click', () => {
    current(citySearch.value.trim(), 5);
})
//using enter on keyboard
citySearch.addEventListener('keypress', function (event) {
    if (event.key === 'Enter' && citySearch !== ' ') {
        current(citySearch.value.trim(), 5);
    }
})
current("kampala", 5);
//console.log('isaac', current());
