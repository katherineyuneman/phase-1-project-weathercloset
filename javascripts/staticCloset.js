// 

// // my closet detail cards //


fetch (`http://localhost:3000/itemInfo`)
  .then(resp => resp.json())
  .then(items => items
    .forEach(item => {
      let closetClassName = "card-container"
      createClothingCard(item, closetClassName)
    })
  )


// display my FULL closet //

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