const weather = (() => {
    let location = {
        place: '',
        country: '',
    } //Stores the location

    const get = async (input) => { //Fetches weather data from weather API
        const string = input;

        const validate = async (input) => {
            const formattedInput = input.trim().replace((/ /g, '+'))
            const osmAPICall = `https://nominatim.openstreetmap.org/search?q=${formattedInput}&format=json`;
            const response = await fetch(osmAPICall,  {
                mode: 'cors'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('weather.locate - got validation data');

                if (data.length <= 0) {
                    return 'location_error';
                } else if (data.length > 1) {
                    for (const place of data) {
                        if (place.class === 'place') {
                            const index = data.indexOf(place);
                            console.log(`weather.locate - validated location name is (from pack) ${data[index].name}`);
                            console.log(data);
                            return data[index].name;
                        }
                    }
                } else {
                    console.log(data);
                    console.log(`weather.locate - validated location name is ${data[0].name}`);
                    return data[0].name;
                }
            } else {
                console.error(`OSM response is not OK! Status: ${response.status}`);
            }
        }

        await validate(string).then((result) => {
            if (result === 'Dnipro') {
                result = 'Dnipropetrovsk';
            }

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