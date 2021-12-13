# Weather Closet

Weather Closet is a web application that tracks your clothing and provides you with a weather update and simple suggestions on what to wear based on your closet.

## How to Use
- Start by adding items to your closet by clicking 'Add to Closet' to add a clothing item using a pre-determined URL for the image.
- Once you have all of your closet set and items added, submit your zip code
- You will get today's weather details for your city
  - Maximum temperature for today
  - Specific details about the weather
- You will also get randomized clothing item suggestions from each category required for that temperature



## API Details
Both APIs are from Open-Meteo.  The first geocoding API takes a zip code and fetches latitude and longitude. The second weather API takes the latitude and longitude (rounded) from the previous API fetch and gets daily weather details including temperature min and max, and more specific weather codes.

Geocoding API
https://open-meteo.com/en/docs/geocoding-api

Weather API
https://open-meteo.com/en/docs

## Resources
The following articles were used to help assist rounding of the latitude/longitude needed to input into the weather API and how to randomize an array of objects.

Rounding to a specific number of decimal points
https://medium.com/swlh/how-to-round-to-a-certain-number-of-decimal-places-in-javascript-ed74c471c1b8

Randomizing an array
https://medium.com/@fyoiza/how-to-randomize-an-array-in-javascript-8505942e452


## Future Enhancements
- Upload your own photo to the closet
- Drop down menu items for adding to the closet
- More nuanced weather and temperature logic for randomization of clothing

