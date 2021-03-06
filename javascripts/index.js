// get today's date to match date in weatherAPI //

let today = new Date();
let dd = today.getDate();
let mm = today.getMonth()+1; 
let yyyy = today.getFullYear();
  if(dd<10) {
      dd='0'+dd;
  } 
  if(mm<10) {
      mm='0'+mm;
  } 
today = yyyy+'-'+mm+'-'+dd


// zipcode search and weather details //

document.getElementById("submit-btn").addEventListener("click", function(event){
  event.preventDefault()

  // clears out form when entering new zip code //
  let weatherSpan = document.getElementById("weatherspan")
  let randomCardDiv = document.getElementsByClassName("random-card-container")
  removeAllChildNodes(weatherSpan);
  removeAllChildNodes(randomCardDiv[0]);

  let inputZipCode = document.getElementById("input_text").value
  return fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${inputZipCode}&count=1`)
  .then(resp => resp.json())
  .then(function (results){

    let zipCityName = results.results[0].name
    let zipLat = parseFloat(results.results[0].latitude)
    let zipLong = parseFloat(results.results[0].longitude)
    let zipLatRounded = roundAccurately(zipLat, 2)
    let zipLongRounded = roundAccurately(zipLong, 2)
    let zipState = results.results[0].admin1;

    displayCityName(zipCityName, zipState)

    // takes latitude and longitude rounded and inserts into API URL
    
    return fetch (`https://api.open-meteo.com/v1/forecast?latitude=${zipLatRounded}&longitude=${zipLongRounded}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
      .then(resp => resp.json())
      .then(function (weather){
        let weatherDate = weather.daily.time[0];
        let weatherCode = weather.daily.weathercode[0];
        let tempMin = Math.round(weather.daily.temperature_2m_min[0]);
        let tempMax = Math.round(weather.daily.temperature_2m_max[0]);
        
        dateMap(weatherDate, weatherCode, tempMin, tempMax);
        clothingTempLogic(tempMax)
        return weather, weatherDate, weatherCode
    })
  })
});


    // weather callback functions

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

function roundAccurately (number, decimalPlaces){
  return (parseFloat(Math.round(number + "e" + decimalPlaces)+ "e-" + decimalPlaces))
}

function displayCityName(zipCityName, zipState){
  let weatherSpan = document.getElementById("weatherspan")
  let p1 = document.createElement("p");
  p1.textContent = `${zipCityName}, ${zipState}`
  weatherSpan.appendChild(p1)
}

function dateMap(weatherDate, weatherCode, tempMin, tempMax){
  // selecting today in 5 day forecast from API & code object found at the bottom of index.js
  if (today === weatherDate && `${weatherCode}` in code){
    let weatherCodeDescription = code[`${weatherCode}`]
    console.log("weatherCode description:", weatherCodeDescription);
  
    let weatherSpan = document.getElementById("weatherspan")

    let temperatureDiv = document.createElement("div")
    temperatureDiv.className = "temperatures"
    weatherSpan.appendChild(temperatureDiv)

    let col1 = document.createElement("div")
    col1.className = "column"
    let col2 = document.createElement("div")
    col2.className = "column"
    temperatureDiv.append(col1, col2);

    let tempIcons = document.createElement("p");
    tempIcons.className = "circle";
    tempIcons.id="circle"
    tempIcons.textContent = `${tempMax}??F`;
    col2.appendChild(tempIcons);

    let h3 = document.createElement("h3")
    h3.textContent = "What should I wear today?"
    col1.appendChild(h3)
    let p2 = document.createElement("p");
    p2.textContent =  `Weather forecast: ${weatherCodeDescription}. Today's temperature will be a low of ${tempMin} and a high of ${tempMax}.`;;
    col1.appendChild(p2)

    document.getElementById("circle").addEventListener("mouseover", function(event){
      event.target.style.background= "black"
      tempIcons.textContent = `${tempMin}??F`;
    })
    document.getElementById("circle").addEventListener("mouseout", function(event){
      event.target.style.background= "#ad1457"
      tempIcons.textContent = `${tempMax}??F`;
    })
  }
  
}


function clothingTempLogic(tempMax){
  let weatherClothingType = []
    if (tempMax <=50){
      weatherClothingType.push("sweater", "pants","jacket")
    }
    else if (tempMax <= 70){
      weatherClothingType.push("pants", "shirt")
    }
    else {
      weatherClothingType.push("shorts", "t-shirt")
    }
  whatToWearToday(weatherClothingType);
  return weatherClothingType, tempMax
}

// fetches from db.json file

function whatToWearToday(weatherClothingType){
  fetch (`http://localhost:3000/itemInfo`)
  .then(resp => resp.json())
  .then(items => displayClothingCard(items, weatherClothingType))
}

function displayClothingCard(items, weatherClothingType){
  weatherClothingType.forEach(item => findType(item))

  function findType (item){
    console.log("item name!!:",item)
    
    let random = items.filter(findItem => findItem.Type === `${item}`)
    console.log("random items:", random.length)
    if (random.length != 0){
      let randomProperty = function (random){
      let keys = Object.keys(random);
      let displayRandom = random[keys[ keys.length * Math.random() << 0]];
      let randomClassName="random-card-container"
      return createClothingCard(displayRandom, randomClassName);
      } 
    return randomProperty(random)
    }
  }  
}

// code added during review:

const colorizeBtn = document.getElementById("colorize")
colorizeBtn.addEventListener("click", randomizeColor)

function randomizeColor(){
  const names = document.querySelectorAll(".item_title")
  names.forEach(name => {
    let randomColor = '#'+Math.floor(Math.random()*16777215).toString(16);
    name.style.color = randomColor
  })
}







//code for weather object
let code = 
{
0 : "Clear sky",
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




