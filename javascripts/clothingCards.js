

let randomClassName="random-card-container"
let closetClassName = "card-container"

function randomClosetActions(displayRandom, randomClassName)

function createClothingCard(clothingItem, className){
  let cardDiv = document.getElementsByClassName(`${className}`)

  let cardImageDiv = document.createElement("div")
  cardImageDiv.className = "card-image"
  cardDiv[0].appendChild(cardImageDiv)

  let itemImage = document.createElement("img")
  itemImage.src = clothingItem.imageURL
  itemImage.className = "clothingImage"
  cardImageDiv.appendChild(itemImage)

  let cardContentDiv = document.createElement("div")
  cardContentDiv.className = "card-content"
  cardImageDiv.append(cardContentDiv)

  let itemTitle = document.createElement("h5")
  itemTitle.className = "item_title"
  itemTitle.textContent = clothingItem.Type
  cardImageDiv.appendChild(itemTitle)

  for (let key in clothingItem.details) {
    let ul = document.createElement("ul")
    ul.textContent = `${key}: ${clothingItem.details[key]}`
    cardImageDiv.appendChild(ul)
  }
}

  // function makeClothingCard(item){
  //   let cardDiv = document.getElementsByClassName("card-container")
  
  //   let cardImageDiv = document.createElement("div")
  //   cardImageDiv.className = "card-image"
  //   cardDiv[0].appendChild(cardImageDiv)
  
  //   let itemImage = document.createElement("img")
  //   itemImage.src = item.imageURL
  //   itemImage.className = "clothingImage"
  //   cardImageDiv.appendChild(itemImage)
  
  //   let cardContentDiv = document.createElement("div")
  //   cardContentDiv.className = "card-content"
  //   cardImageDiv.append(cardContentDiv)
  
  //   let itemTitle = document.createElement("h5")
  //   itemTitle.className = "item_title"
  //   itemTitle.textContent = item.Type
  //   cardImageDiv.appendChild(itemTitle)
  
  //   for (let key in item.details) {
  //     let ul = document.createElement("ul")
  //     ul.textContent = `${key}: ${item.details[key]}`
  //     cardImageDiv.appendChild(ul)
  //   }
  //   }