Copy code

# Petrel Weather

Petrel Weather is a web application that allows users to check the current weather and hourly forecast for a specific location. It supports both metric and imperial units for temperature, and it uses data from an external [weather API](weather_api_link) and [OpenStreetMap (OSM)](osm_api_link) for location validation.

## Usage

1. Open the [Petrel Weather website](https://hrv3str.github.io/odin-weather/).

2. Click on the location icon to input the place you want to check the weather for.

3. Type the place and hit Enter or click the subscribe icon.

4. The UI is updated, and you can see the weather information, including:

   - Current temperature
   - Feels like temperature
   - Max and min temperatures for the day
   - Current condition
   - Humidity
   - Wind speed
   - Chance of fallout
   - Hourly forecast displaying temperature and condition for each hour

5. You can also switch between metric and imperial units using the unit switch.

6. If the location input is faulty, you will see a message and be asked to repeat the input.

## Tech Stack

- HTML
- CSS
- Webpack
- JavaScript
- [OpenStreetMap API](osm_api_link)
- [Weather API](weather_api_link)

[osm_api_link]: https://wiki.openstreetmap.org/wiki/API_v0.6
[weather_api_link]: https://www.weatherapi.com/

## Photo Credits

- Background photo by [Adam Jang](https://unsplash.com/@adamjang?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/MLKrf51NV8w?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).

- Unit switch photo by [Tamas Kolossa](https://unsplash.com/@kolossaphoto?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/_D3m-lKDOSw?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText).
