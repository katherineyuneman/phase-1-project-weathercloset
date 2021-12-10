// get today's date to match date in weatherAPI //

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

document.addEventListener("DOMContentLoaded", () => {

// zipcode search and weather details //

document.getElementById("submit-btn").addEventListener("click", function(event){
  event.preventDefault()


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
    
    return fetch (`https://api.open-meteo.com/v1/forecast?latitude=${zipLatRounded}&longitude=${zipLongRounded}&daily=weathercode,temperature_2m_max,temperature_2m_min&temperature_unit=fahrenheit&timezone=America%2FNew_York`)
      .then(resp => resp.json())
      .then(function (weather){
        let weatherDate = weather.daily.time[0];
        let weatherCode = weather.daily.weathercode[0];
        let tempMin = Math.round(weather.daily.temperature_2m_min[0]);
        let tempMax = Math.round(weather.daily.temperature_2m_max[0]);
        
        dateMap(weatherDate, weatherCode, tempMin, tempMax);
        clothingTempLogic(tempMax)
        console.log("weather deets:", weather, weatherDate, weatherCode,tempMin, tempMax)
        return weather, weatherDate, weatherCode
    })
  })
});
// console.log(`latitude=${zipLat}`)


        //* weather detail functions

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


function dateMap(weatherDate, weatherCode, tempMin, tempMax, zipCityName, zipState){
  console.log("weatherApp Date:", weatherDate, "weatherCode:", weatherCode)
  if (today === weatherDate && `${weatherCode}` in code){
    let weatherCodeDescription = code[`${weatherCode}`]
    console.log("weatherCode description:", weatherCodeDescription);
  
  // let weatherDiv = document.getElementById("weather")
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
  tempIcons.textContent = `${tempMax}°F`;
  col2.appendChild(tempIcons);

  // let weatherIconCircle = document.createElement("p");
  // weatherIconCircle.className = "circle";
  // col1.appendChild(weatherIconCircle);

  // let weatherIconImage = document.createElement("img")
  // weatherIconImage.src = "https://cdn1.iconfinder.com/data/icons/weather-281/64/cloudy-512.png";
  // weatherIconImage.className = "image"
  // weatherIconCircle.appendChild(weatherIconImage);

  let h3 = document.createElement("h3")
  h3.textContent = "What should I wear today?"
  col1.appendChild(h3)
  let p2 = document.createElement("p");
  p2.textContent =  `Weather forecast: ${weatherCodeDescription}. Today's temperature will be a low of ${tempMin} and a high of ${tempMax}.`;;
  col1.appendChild(p2)
  }
}

function clothingTempLogic(tempMax){
  let weatherClothingType = []
  if (tempMax <=50){
    weatherClothingType.push("sweater", "jacket", "pants")
  }
  else if (tempMax <= 70){
    weatherClothingType.push("pants", "shirt")
  }
  else {
    weatherClothingType.push("shorts", "t-shirt")
  }
  whatToWearToday(weatherClothingType);
  return console.log("type with temp max:",weatherClothingType, tempMax)
}


function whatToWearToday(weatherClothingType){
  fetch (`http://localhost:3000/itemInfo`)
  .then(resp => resp.json())
  .then(items => displayClothingCard(items, weatherClothingType))

    function displayClothingCard(items, weatherClothingType){
      weatherClothingType.forEach(item => findType(item))
      function findType (item){
        let random = items.filter(findItem => findItem.Type === `${item}`)
        console.log("random items:", random)
        let randomProperty = function (random){
          let keys = Object.keys(random);
        let displayRandom = random[keys[ keys.length * Math.random() << 0]];
        return addRandomCard(displayRandom);
      }
      return randomProperty(random)
    } 
  }
}


function addRandomCard(displayRandom){
  /////if (!displayRandom){}
  let cardDiv = document.getElementsByClassName("random-card-container")

  let cardImageDiv = document.createElement("div")
  cardImageDiv.className = "card-image"
  cardDiv[0].appendChild(cardImageDiv)

  let itemImage = document.createElement("img")
  itemImage.src = displayRandom.imageURL
  itemImage.className = "clothingImage"
  cardImageDiv.appendChild(itemImage)

  let cardContentDiv = document.createElement("div")
  cardContentDiv.className = "card-content"
  cardImageDiv.append(cardContentDiv)

  let itemTitle = document.createElement("h5")
  itemTitle.className = "item_title"
  itemTitle.textContent = displayRandom.Type
  cardImageDiv.appendChild(itemTitle)

  for (let key in displayRandom.details) {
    let ul = document.createElement("ul")
    ul.textContent = `${key}: ${displayRandom.details[key]}`
    cardImageDiv.appendChild(ul)
  }
  }
})

 // my closet detail cards //


document.addEventListener("DOMContentLoaded", () => {

fetch (`http://localhost:3000/itemInfo`)
  .then(resp => resp.json())
  .then(items => items.forEach(item => {makeClothingCard(item)}))




// display my FULL closet //

let collapsible = document.getElementsByClassName("collapsible");
let i;

for (i = 0; i < collapsible.length; i++) {
  collapsible[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

});

// add to my closet button + form //

document.getElementById("closet").addEventListener("click", openForm)

function openForm(){
let closetForm = document.getElementById("addToClosetForm");
  closetForm.style.display = "block";
let close = document.getElementById("close")
close.addEventListener("click", f => closetForm.style.display = "none")
}

function closeForm(){
  let closetForm = document.getElementById("addToClosetForm");
closetForm.style.display = "none"
}



const addToCloset = document.querySelector('form')

addToCloset.addEventListener('submit', event => {

  event.preventDefault();
  debugger;
  console.log(event.target)
  let closetForm = document.getElementById("addToClosetForm");
      closetForm.style.display = "none"
  let newClothingitem = 
  {     
        Type: event.target.type.value.toLowerCase(),
        imageURL: event.target.image.value,
        details: {
            Brand: (event.target.brand.value).toLowerCase(),
            Size: (event.target.size.value).toLowerCase(),
            Color: (event.target.color.value).toLowerCase(),
            Season: (event.target.brand.value).toLowerCase()
        }
      }

      // addNewItemDOM(newClothingitem)
      makeClothingCard(newClothingitem)
      addNewItemDB(newClothingitem)
      
      

      // alert(`Thank you for adding ${event.target.type.value.toLowerCase()} to your closet`)
      }

  )
  function addNewItemDB(newClothingitem){
    console.log("HELLO, I make it to this point")
    console.log("stringified:", JSON.stringify(newClothingitem))
    debugger;
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


// function addNewItemDOM(newClothingitem){
//   let newCardDiv = document.getElementsByClassName("new-item")
//   console.log("newcarddiv:",newCardDiv)

//   let cardImageDiv = document.createElement("div")
//   cardImageDiv.className = "card-image"
//   newCardDiv[0].appendChild(cardImageDiv)

//   let itemImage = document.createElement("img")
//   itemImage.src = newClothingitem.imageURL
//   itemImage.className = "clothingImage"
//   cardImageDiv.appendChild(itemImage)

//   let cardContentDiv = document.createElement("div")
//   cardContentDiv.className = "card-content"
//   cardImageDiv.append(cardContentDiv)

//   let itemTitle = document.createElement("h5")
//   itemTitle.className = "item_title"
//   itemTitle.textContent = newClothingitem.Type
//   cardImageDiv.appendChild(itemTitle)

//   for (let key in newClothingitem.details) {
//     let ul = document.createElement("ul")
//     ul.textContent = `${key}: ${newClothingitem.details[key]}`
//     cardImageDiv.appendChild(ul)
//   }
// }

function makeClothingCard(item){
  let cardDiv = document.getElementsByClassName("card-container")

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





