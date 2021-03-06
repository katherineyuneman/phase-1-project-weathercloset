# Weather Closet

Weather Closet is a web application that tracks your clothing and provides you with a weather update and simple suggestions on what to wear based on your closet.

## How to Use
- Start by adding items to your closet by clicking 'Add to Closet' to add a clothing item using a pre-determined URL for the image.
- Once you have all of your closet set and items added, submit your zip code
- You will get today's weather details for your city
  - Maximum temperature for today
  - Specific details about the weather
- You will also get randomized clothing item suggestions from each category required for that temperature ONLY if that clothing item exists in your closet (ex: if you have no pants, pants will not show up)



## API Details
Both APIs are from Open-Meteo.  The first geocoding API takes a zip code and fetches latitude and longitude. The second weather API takes the latitude and longitude (rounded) from the previous API fetch and gets daily weather details including temperature min and max, and more specific weather codes.

Geocoding API
https://open-meteo.com/en/docs/geocoding-api

Weather API
https://open-meteo.com/en/docs

## JSON Server details
- All clothing items are posted to a db.json server that contains an array of clothing item objects

## Future Enhancements
- Ability to remove items from your closet 
- Upload your own photo to the closet
- Drop down menu items for adding to the closet
- More nuanced weather and temperature logic for randomization of clothing
- Robust weather code table with icons to match
- Ability to filter through closet items

## Resources
Note: MaterialzeCSS was used to create some of the buttons and main CSS and HTML features.

The following articles were used to help assist rounding of the latitude/longitude needed to input into the weather API and how to randomize an array of objects as well as a few other helpful links.

Rounding to a specific number of decimal points
https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8

Randomizing an array
https://stackoverflow.com/questions/2532218/pick-random-property-from-a-javascript-object
https://medium.com/@fyoiza/how-to-randomize-an-array-in-javascript-8505942e452

Creating a dynamically-sized collapsible container
https://www.w3schools.com/howto/howto_js_collapsible.asp

Removing Child Nodes
https://www.javascripttutorial.net/dom/manipulating/remove-all-child-nodes/

All clothing photos are either H&M, Gap, or Banana Republic

