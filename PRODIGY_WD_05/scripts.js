const API_KEY = `dfe1616fceaf213bbbb362df34f094f5`;
const form = document.querySelector('form');
const weather = document.querySelector('#weather');
const search = document.querySelector('#search');
const heading = document.querySelector('.heading');
let position = document.querySelector('#current-loc')

const showWeather = (data) => {
    weather.innerHTML = `
    <div>
		<img class='weather-icon' src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
	</div>
    <div>
        <h2>${data.main.temp} &deg;C</h2>
        <h4>${data.weather[0].main}</h4>
        <p class='below'>Humidity: ${data.main.humidity}%</p>
        <p class='below'>Pressure: ${data.main.pressure}mBar</p>
    </div>
    `
}

const getWeather = async (city) => {
    weather.innerHTML = `<p> Loading... </p>`
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const resp = await fetch(apiURL);
    const data = await resp.json();
    console.log(resp);
    console.log(data);
    if(data.cod=='404'){
        heading.innerHTML = `Weather`;
        weather.innerText = `${data.message.charAt(0).toUpperCase() + data.message.substring(1)}`
        return;
    } else{
        heading.innerHTML = city.charAt(0).toUpperCase() + city.substring(1);
        return showWeather(data);
    }
}

form.addEventListener('submit', (e) => {
    console.log(search.value);
    let city = search.value;
    getWeather(city);
    e.preventDefault();
})


// FOR USER LOCATION
const geoLocation = () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(showPosition)
    }
    else{
        position.innerHTML = `Geolocation not supported by browser.`
    }
}

const showPosition = async (posdata) => {
    console.log(posdata)
    let lat = posdata.coords.latitude;
    let lon = posdata.coords.longitude;

    const posurl = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    const posresp = await fetch(posurl);
    const poscity = await posresp.json();
    console.log(poscity.city);
    city = poscity.city;
    getWeather(city);
}

position.addEventListener('click', geoLocation);