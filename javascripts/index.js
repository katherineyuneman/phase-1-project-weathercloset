
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


document.getElementById("submit-btn").addEventListener("click", function(event){
  event.preventDefault()
  let inputZipCode = document.getElementById("input_text").value
  return fetch (`https://geocoding-api.open-meteo.com/v1/search?name=${inputZipCode}&count=1`)
  .then(resp => resp.json())
  .then(function (results){
    let zipCityName = results.results[0].name
    let zipLat = parseFloat(results.results[0].latitude)
    let zipLong = parseFloat(results.results[0].longitude)
    let zipLatRounded = roundAccurately(zipLat, 2)
    let zipLongRounded = roundAccurately(zipLong, 2)
    let zipState = results.results[0].admin1

    displayCityName(zipCityName, zipState)
    console.log(`latitude=${zipLat}`)
    return fetch (`https://api.open-meteo.com/v1/forecast?latitude=${zipLatRounded}&longitude=${zipLongRounded}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
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
  })
});


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
  console.log("weatherApp Date:", weatherDate, "weatherCode:", weatherCode)
  if (today === weatherDate && `${weatherCode}` in code){
    let weatherCodeDescription = code[`${weatherCode}`]
    console.log("weatherCode description:", weatherCodeDescription);
  
  let weatherDiv = document.getElementById("weather")
  let weatherSpan = document.getElementById("weatherspan")


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

fetch (`http://localhost:3000/itemInfo`)
  .then(resp => resp.json())
  .then(items => items.forEach(item => {makeClothingCard(item)}))



function makeClothingCard(item){
  let cardDiv = document.getElementsByClassName("card")

  let cardImageDiv = document.createElement("div")
  cardImageDiv.className = "card-image"
  cardDiv[0].appendChild(cardImageDiv)

  let itemImage = document.createElement("img")
  itemImage.src = item.imageURL
  itemImage.className = "clothingImage"
  cardImageDiv.appendChild(itemImage)

  let cardContentDiv = document.createElement("div")
  cardContentDiv.className = "card-content"
  cardImageDiv.append(cardContentDiv)

  let itemTitle = document.createElement("h5")
  itemTitle.className = "item_title"
  itemTitle.textContent = item.Type
  cardImageDiv.appendChild(itemTitle)


  for (let key in item.details) {
    let ul = document.createElement("ul")
    ul.textContent = `${key}: ${item.details[key]}`
    cardImageDiv.appendChild(ul)
  }
  }


  

 

// attempt at starting to think through randomization of cards and only displayin 1 from each Type

  // let pants = itemInfo.filter(function (findPants){
  //   return findPants.Type === "Pants"
  // })
  // console.log(pants)

  // console.log(itemInfo.length)


////




/// clicking on add to my closet button

document.getElementById("closet").addEventListener("click", openForm)

function openForm(){
let modal = document.getElementById("myModal");
  modal.style.display = "block";
let close = document.getElementById("close")
close.addEventListener("click", f => modal.style.display = "none")
}

function closeForm(){
  let modal = document.getElementById("myModal");
modal.style.display = "none"
}


//


const addToCloset = document.querySelector('form')
addToCloset.addEventListener('submit', event => {
  // submit event detected
  event.preventDefault();
  console.log(event.target.type.value)
  let newClothingitem = 
  {     
        Type: event.target.type.value,
        imageURL: event.target.image.value,
        details: {
            Brand: event.target.brand.value,
            Size: event.target.size.value,
            Color: event.target.color.value,
            Season: event.target.brand.value
        }
      }
      addNewItem(newClothingitem)

      function addNewItem(newClothingitem){
        console.log(JSON.stringify(newClothingitem))
        fetch ('http://localhost:3000/itemInfo', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body:JSON.stringify(newClothingitem)
            })
            .then(resp =>  resp.json())
            .then(item => console.log(item))
          }
      }

  )







// function addNewToy(newToyObject){
//   fetch('http://localhost:3000/toys', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body:JSON.stringify(newToyObject)
//   })
//   .then(resp =>  resp.json())
//   // .then(toy => console.log(toy))
// }