// fetching full static closet from db.json & displaying full closet upon cllick //

console.log("a")
fetch (`http://localhost:3000/itemInfo`)
  .then(resp => resp.json())
  .then(items => {
  console.log("b")
    items
    .forEach(item => {
      let closetClassName = "card-container"
      createClothingCard(item, closetClassName)
    })
  })
  console.log("d");

let collapsible = document.getElementsByClassName("collapsible");
let i;
  for (i = 0; i < collapsible.length; i++) {
    collapsible[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let content = this.nextElementSibling;
      if (content.style.display === "block") {
        content.style.display = "none";
      }  
      else {
      content.style.display = "block";
      }
    });
  };