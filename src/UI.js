const display = (() => {
    //Tempalte object that must be passed to module
    let source = {
        place: '',
        country: '',
        date: '',
        condition: {
            text: '',
            iconSRC: ''
        },
        temperature: {
            c: 0,
            f: 0,
            maxTemp: {
                c: 0,
                f: 0,
            },
            minTemp: {
                c: 0,
                f: 0
            },
            feelsLike: {
                c: 0,
                f: 0
            },
        },
        humidity: 0,
        windSpeed: {
            km: 0,
            mph: 0,
        },
        chanceOf: {
            snow: 0,
            rain: 0,
        },
        units: {
            metric: true,
            imperial: false,
        },
        sunset: 0,
        sunrise: 0,
    }

    // Sets passed object as source object
    const getData = (object) => {
        source = {...object};
    }

    // Refreshes UI according to 'source' object
    const refresh = () => {
        // Looks for element and sets its text content
        const set = (target, content) => {
            const input = document.querySelector(target);
            if (input) {
                input.textContent = content;
            }
        };
        
        // Takes HTML elements and modifies its classList according to source.units
        const toggleTemperatureUnits = (inputElement) => {
            if (source.units.metric) {
                if (inputElement.classList.contains('farenheit')) {
                    inputElement.classList.remove('farenheit');
                }

                inputElement.classList.add('celsius');
            }
      
            if (source.units.imperial) {
                if (inputElement.classList.contains('celsius')) {
                    inputElement.classList.remove('celsius');
                }

                inputElement.classList.add('farenheit');
            }
        };
        
        // Takes key in source object and returns its subkey according to source.units
        const toggleTemperatureValues = (value) => {
          if (source.units.metric) {
            return value.c;
          }
      
          if (source.units.imperial) {
            return value.f;
          }
        };
        
        // Updates place info
        const place = () => {
          const target = 'div.place';
          const text = source.place;
          set(target, text);
        };
        
        // Updates country info
        const country = () => {
          const target = 'div.country';
          const text = source.country;
          set(target, text);
        };
        
        // Updates temperature info
        const temperature = () => {
          const target = '.card .temperature';
          toggleTemperatureUnits(target);
          const sourceTemp = source.temperature;
          const text = toggleTemperatureValues(sourceTemp);
          set(target, text);
        };

        // Updates date info
        const date = () => {
            const target = 'div.date'
            const text = source.date;
            set(target, text);
        }

        // Updates condition info and its icon url
        const condition = () => {
            const target = 'div.condition';
            const style = document.getElementById('condition-icon');
            const url = source.condition.iconSRC;
            const rule = `.condition .icon { background: url("${url}"); }`
            const text = source.condition.text;

            style.textContent = rule;
            set(target, text);
        }
      
        // Call the functions to update the content
        condition();
        date();
        place();
        country();
        temperature();
    };

    const locationInput = document.createElement('input');
    locationInput.type = 'text'

    return {
        getData,
        refresh,
    }
})();

export default display;