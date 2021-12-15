// add to my closet button + form //

document.getElementById("closet").addEventListener("click", openForm("hello"))

function openForm(string){
  let closetForm = document.getElementById("addToClosetForm");
  closetForm.style.display = "block";
  let close = document.getElementById("close")
  close.addEventListener("click", f => closetForm.style.display = "none")
}

function closeForm(){
  let closetForm = document.getElementById("addToClosetForm");
  closetForm.style.display = "none"
}

let addToCloset = document.querySelector('form')
addToCloset.addEventListener('submit', event => {
  event.preventDefault();
  // console.log(event.target)
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
            Season: (event.target.season.value).toLowerCase()
                }
        }
      let closetClassName = "card-container"
      createClothingCard(newClothingitem, closetClassName)
      addNewItemDB(newClothingitem)
      alert(`Thank you for adding ${event.target.type.value.toLowerCase()} to your closet`)
})

function addNewItemDB(newClothingitem){
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