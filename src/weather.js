const weather = (() => {
    let location = '' //Stores the location
    const get = async (input) => { //Fetches weather data from weather API
        const string = input;

        const validate = async (input) => {
            const geoAPICall = `https://api.geonames.org/searchJSON?q=${encodeURIComponent(input)}&maxRows=10&username=novikadze`;
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

        await validate(string).then((result) => {
            location = result.toLowerCase()
                .trim()
                .replace(/\s+/g,'_');
        });

        if (location === 'location_error' //Breaks function if location is not valid
            || location === '') {
                throw new Error(`weather.get - location is not valid, ${location}`);
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

    const shareLocation = () => {
        return location;
    }

    return {
        get,
        shareLocation,
    }
})();

export default weather;