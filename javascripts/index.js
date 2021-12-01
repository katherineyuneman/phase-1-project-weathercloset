
/// get today's date

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
let yyyy = today.getFullYear();
  if(dd<10) 
    {
      dd='0'+dd;
    } 
  if(mm<10) 
    {
      mm='0'+mm;
    } 
today = yyyy+'-'+mm+'-'+dd


const d = new Date();

const weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

let day = weekday[d.getDay()];
console.log(day)


// const d = new Date();
// let day = d.getDay();
// console.log("today's date:", today)

//code for weather object
let code = 
  {0: "Clear sky",
  1: "Mainly clear, partly cloudy, and overcast",
  2: "Mainly clear, partly cloudy, and overcast",
  3: "Mainly clear, partly cloudy, and overcast",
  45: "Fog and depositing rime fog",
  48: "Fog and depositing rime fog",
  51: "Drizzle: Light, moderate, and dense intensity",
  53: "Drizzle: Light, moderate, and dense intensity",
  55: "Drizzle: Light, moderate, and dense intensity",
  56:	"Freezing Drizzle: Light and dense intensity",
  57:	"Freezing Drizzle: Light and dense intensity",
  61:	"Rain: Slight, moderate and heavy intensity",
  63:	"Rain: Slight, moderate and heavy intensity",
  65:	"Rain: Slight, moderate and heavy intensity",
  66:	"Freezing Rain: Light and heavy intensity",
  67:	"Freezing Rain: Light and heavy intensity",
  71: "Snow fall: Slight, moderate, and heavy intensity",
  73: "Snow fall: Slight, moderate, and heavy intensity",
  75:	"Snow fall: Slight, moderate, and heavy intensity",
  77:	"Snow grains",
  80: "Rain showers: Slight, moderate, and violent",
  81: "Rain showers: Slight, moderate, and violent",
  82: "Rain showers: Slight, moderate, and violent",
  85: "Snow showers slight and heavy",
  86: "Snow showers slight and heavy",
  95: "Thunderstorm: Slight or moderate",
  96: "Thunderstorm with slight and heavy hail",
  99: "Thunderstorm with slight and heavy hail"
  }

///

fetch ("https://api.open-meteo.com/v1/forecast?latitude=40.71&longitude=-74.01&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York")
.then(resp => resp.json())
.then(function (weather){
 let weatherDate = weather.daily.time[0];
 let weatherCode = weather.daily.weathercode[0];
 let tempMin = Math.round(weather.daily.temperature_2m_min[0]);
 let tempMax = Math.round(weather.daily.temperature_2m_max[0]);
dateMap(weatherDate, weatherCode, tempMin, tempMax);
console.log(weather, weatherDate, weatherCode,tempMin, tempMax)
 return weather, weatherDate, weatherCode
})

function dateMap(weatherDate, weatherCode, tempMin, tempMax){
  console.log("weatherApp Date:", weatherDate, "weatherCode:", weatherCode)
  if (today === weatherDate && `${weatherCode}` in code){
    let weatherCodeDescription = code[`${weatherCode}`]
    console.log("weatherCode description:", weatherCodeDescription);
  
  let weatherDiv = document.getElementById("weather")
  let weatherSpan = document.getElementById("weatherspan")
  let p1 = document.createElement("p");
  p1.textContent = `Today is ${day}`,
  weatherSpan.appendChild(p1)

  let tempIcons = document.createElement("p");
  tempIcons.className = "circle";
  tempIcons.textContent = `${tempMax}°F`;
  weatherSpan.appendChild(tempIcons);

  let weatherIconCircle = document.createElement("p");
  weatherIconCircle.className = "circle";
  // weatherIcon.textContent = `${tempMin}°F`;
  // weatherIconCircle.textContent = "."
  weatherSpan.appendChild(weatherIconCircle);

  let weatherIconImage = document.createElement("img")
  weatherIconImage.src = "https://cdn1.iconfinder.com/data/icons/weather-281/64/cloudy-512.png";
  weatherIconImage.className = "image"
  // weatherIconImage.style.width = '65px';
  // weatherIconImage.style.height = '65px';
  // weatherIconImage.style.verticalAlign= 'center'
  weatherIconCircle.appendChild(weatherIconImage);


  let p2 = document.createElement("p");
  p2.textContent =  `Weather forecast: ${weatherCodeDescription}. Today's temperature will be a low of ${tempMin} and a high of ${tempMax}.`;;
  weatherDiv.appendChild(p2)
  }
}