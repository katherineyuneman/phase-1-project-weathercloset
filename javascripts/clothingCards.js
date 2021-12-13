/* createClothingCard used in 3 modules: 
1) adding new item to closet (displays on DOM)
2) displaying entire static closet
3) displaying random clothing item suggestions based on temperature/weather
*/

function createClothingCard(clothingItem, className){
  let cardDiv = document.getElementsByClassName(`${className}`)

  let cardImageDiv = document.createElement("div")
  cardImageDiv.className = "card-image"
  cardImageDiv.id="card"
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

