const weather = (() => {
    let location = 'new_york' //Stores the loacation

    const get = async () => { //Fetches weather data from weather API
        if (location === 'location_error' //Breaks function if location is not valid
            || location === '') {
                console.error(`weather.get - location is not valid, ${location}`)
            return;
        }

        const weatherAPICall = `https://api.weatherapi.com/v1/forecast.json?key=ed8fce714bb34831a25112542230709&q=${location}&days=1&aqi=no&alerts=no`;
        const response = await fetch(weatherAPICall, {
            mode: 'cors'
        });

        if (response.ok) {
            const data = await response.json();
            console.log(`weather.get - got weather data on ${location}`);
            return data;
        } else {
            console.error('WeatherAPI response is not OK!')
        }
    }

    const locate = async (input) => { //Takes user input, validates it and returns the location
        const validate = async (input) => {
            const geoAPICall = `http://api.geonames.org/searchJSON?q=${encodeURIComponent(input)}&maxRows=10&username=novikadze`;
            const response = await fetch(geoAPICall,  {
                mode: 'cors'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('weather.locate - got validation data');
                if (data.geonames.length <= 0) { // Returns 'location_error' if cannot find the location
                    return 'location_error';
                } else {
                    console.log(`weather.locate - validated location name is ${data.geonames[0].name}`);
                    return data.geonames[0].name;
                };
            } else {
                console.error('GeoNames response is not OK!')
            }
        }
        
        location =  validate(input)
            .toLowerCase()
            .trim()
            .replace(/\s+/g,'_');
    }

    return {
        get,
        locate,
    }
})();

export default weather;