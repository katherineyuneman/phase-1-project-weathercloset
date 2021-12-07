### Weather Closet

Weather Closet

 Completed user stories

 ## As a user, I should be able to add new clothing items to a virtual closet with a photo
 ## As a user, I should be able to view all of my closet items.
 ## As a user, I should be able to enter my zip code and get the maximum weather temperature for today in my city as well as more specific details about the weather.
 ## As a user, I should be able to enter my zip code and get randomized clothing items displayed based on location.
 ## As a user, I should be able to enter a new zip code and receive new/refreshed weather and clothing item information.

Javascript Features

## CLICK event - pulls up a mini form
## SUBMIT event  - after entering form data inputs, submit event
## POSTS data to db.json
## CLICK event - click on the 'X' in the form to hide it
## CLICK event - type in zip code and submit to produce a container of weather data and clothing suggestionsCLICK event - click on 'Open my closet' to display a container with all closet items (unfiltered)

API Details

## API part 1: https://open-meteo.com/en/docs/geocoding-apitakes an input of zip code, fetch GET from the geocoding API and returns latitude / longitude
## API part 2: https://open-meteo.com/en/docsuses the latitude / longitude from the prior API fetch and fetches weekly weather data to match

Issues

## Code is not fully DRY (repeated over - need to clean this up)
## Not sure where to put the codes for weather details - right now it's an object in the index.js file
## the spacing of the cards is off - having trouble getting everything to be in a row instead of on top of each other (used materilizeCSS and that's an issue)

Known bugs

## if a clothing item doesn't exist in the db.json and it requires it for that temperature logic, it breaks the whole thing
## can't create drop downs in the form - this seems to be an issue with just materializecss and I think I'll have to redesign if I want to use drop down instead of text boxes.

Potential Enhancement user stories

## As a user, I should be able to view an icon that's comparable to the weather for my zip code.
## As a user, I should be able to get randomized clothing suggestions specific for snow and rain.
## As a user, I should be able to get randomized clothing suggestions for
## As a user, I should see my closet and random clothing suggestion cards in a row (not in a column).
## As a user, I should be able to upload my own photos to the closet instead of using a pre-determined URL
