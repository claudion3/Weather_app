console.log("check connection");
const subButton = document.querySelector("button");
let inputCity = document.querySelector("input");
let getInputCity;
inputCity.oninput = getCity;

function getCity(city) {
	getInputCity = city.target.value;
}

subButton.addEventListener("click", checkWeather);

function checkWeather() {
	const api = {
		key: "9e28307f58488736caaa078f75a5553a",
		url: "https://api.openweathermap.org/data/2.5/",
	};
	fetch(`${api.url}weather?q=${getInputCity}&units=metric&APPID=${api.key}`)
		.then((weather) => {
			return weather.json();
		})
		.then(displayResults);
}
function displayResults(weather) {
	let city = document.querySelector("section .city");
	city.innerText = `${weather.name}, ${weather.sys.country}`;

	let now = new Date();
	let date = document.querySelector("section .date");
	date.innerText = dateBuilder(now);

	let temp = document.querySelector(".present .temp");
	temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

	let weather_el = document.querySelector(".present .weather");
	weather_el.innerText = weather.weather[0].main;

	let locationIcon = document.querySelector(".weather-icon");
	const icon = weather.weather[0].icon;
	locationIcon.innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png">`;

	let weatherDescription = document.querySelector(".description");
	weatherDescription.innerText = weather.weather[0].description;

	let windSpeed = document.querySelector(".present .wind");
	windSpeed.innerText = "Speed " + weather.wind.speed.toFixed(0) + " m/s";

	let sunRise = document.querySelector(".present .sun-rise ");
	sunRise.innerText = ` Sun rise: ${new Date(
		weather.sys.sunrise * 1000
	).toLocaleTimeString()} `;

	let sunSet = document.querySelector(".present .sun-set ");
	sunSet.innerText = ` Sun set: ${new Date(
		weather.sys.sunset * 1000
	).toLocaleTimeString()}`;

	const a = document.querySelector(".present a");

	a.innerHTML = `<a href="https://www.openstreetmap.org/search?query=${getInputCity}#map=${weather.coord.lon}/${weather.coord.lat}"</a> `;
	a.textContent = "Location";
}

function dateBuilder(d) {
	let months = [
		"January",
		"February",
		"March",
		"April",
		"May",
		"June",
		"July",
		"August",
		"September",
		"October",
		"November",
		"December",
	];
	let days = [
		"Sunday",
		"Monday",
		"Tuesday",
		"Wednesday",
		"Thursday",
		"Friday",
		"Saturday",
	];

	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	return `${day} ${date} ${month} ${year}`;
}
