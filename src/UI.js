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
        hourly: {
            0: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            1: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            2: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            3: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            4: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            5: {
                type: sunrise,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            6: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            7: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            8: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            9: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            10: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            11: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            12: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            13: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            14: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            15: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            16: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            17: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            18: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            19: {
                type: day,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            20: {
                type: sunset,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            21: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            22: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            23: {
                type: night,
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
        },
    }

    // Sets passed object as source object
    const getData = (object) => {
        source = {...object};
    }

    // Refreshes UI according to 'source' object
    const refresh = () => {
        console.log('display.refresh - start')
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

        // Toggle fallout type according to source object and return its value
        const toggleTypeOfFallout = (target) => {
            if (source.chanceOf.rain != 0) {
                if (target.classList.contains('snow')) {
                    target.classList.remove('snow');
                }
                target.classList.add('rain');
                return source.chanceOf.rain;
            }

            if (source.chanceOf.snow != 0) {
                if (target.classList.contains('rain')) {
                    target.classList.remove('rain');
                }
                target.classList.add('snow');
                return source.chanceOf.snow;
            }
        }

        // Toggle wind speed units according to source.units value
        const toggleWindSpeedUnits = (target) => {
            if (source.units.metric) {
                if (target.classList.contains('miles')) {
                    target.classList.remove('miles');
                }
                target.classList.add('kilometers');
                return source.windSpeed.km;
            }

            if (source.units.imperial) {
                if (target.classList.contains('kilometers')) {
                    target.classList.remove('kilometers');
                }
                target.classList.add('miles');
                return source.windSpeed.mph;
            }
        }
        
        // Updates place info
        const place = () => {
          const target = 'div.place';
          const text = source.place;
          set(target, text);
          console.log('location display updated');
        };
        
        // Updates country info
        const country = () => {
          const target = 'div.country';
          const text = source.country;
          set(target, text);
          console.log('country display updated');
        };
        
        // Updates temperature info
        const temperature = () => {
          const target = '.card .temperature';
          toggleTemperatureUnits(target);
          const sourceTemp = source.temperature;
          const text = toggleTemperatureValues(sourceTemp);
          set(target, text);console.log('temperature display updated');
        };

        // Updates date info
        const date = () => {
            const target = 'div.date'
            const text = source.date;
            set(target, text);
            console.log('date display updated');
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
            console.log('condition display updated');
        }

        // Updates feels like info
        const feelsLike = () => {
            const target = 'div.feelslike';
            toggleTemperatureUnits(target);
            const sourceTemp = source.temperature.feelsLike;
            const text = toggleTemperatureValues(sourceTemp);
            set(target, text);
            console.log('feels like display updated');
        };
  
        // Updates max temperature info
        const tempMax = () => {
            const target = 'div.temp-max';
            toggleTemperatureUnits(target);
            const sourceTemp = source.temperature.maxTemp;
            const text = toggleTemperatureValues(sourceTemp);
            set(target, text);
            console.log('max temp display updated');
        };
        
        // Updates min tempreture info
        const tempMin = () => {
            const target = 'div.temp-min';
            toggleTemperatureUnits(target);
            const sourceTemp = source.temperature.minTemp;
            const text = toggleTemperatureValues(sourceTemp);
            set(target, text);
            console.log('min temp display updated');
        };

        // Update humidity info
        const humidity = () => {
            const target = 'div.humidity'
            const text = source.humidity;
            set(target, text);
            console.log('humidity display updated');
        }

        // Update chance of fallout and its type
        const chanceOf = () => {
            const target = 'div.chance-of';
            const text = toggleTypeOfFallout(target);
            set(target, text);
            console.log('chance of fallout display updated');
        }

        // Update wind speed and its units
        const windSpeed = () => {
            const target = 'div.wind-speed';
            const text = toggleWindSpeedUnits(target);
            set(target, text);
            console.log('wind speed display updated');
        }

        // Update hourly forecast cards
        const hourly = () => {
            const object = source.hourly;
            const keys = Object.keys(object);
            const container = document.querySelector('div.scroll');

            container.innerHTML = ''; //Clears container
            
            // Creates and appends cards according to source
            for (const key of keys) {
                const body = document.createElement('div');
                body.classList.add('card');

                const bodyContent = `
                    <div class="time">${key}:00</div>
                    <div class="icon ${key.type}"></div>
                `;
                body.innerHTML = bodyContent;

                const temperature = document.createElement('div');
                temperature.classList.add('temperature');
                toggleTemperatureUnits(temperature);

                const sourceTemp = key.temperature;
                const text = toggleTemperatureValues(sourceTemp);
                temperature.textContent = text;

                body.appendChild(temperature);
                container.appendChild(body);
            }
            console.log('hourly forecast updated');
        }

        // Call the functions to update the content
        hourly();
        windSpeed();
        chanceOf();
        humidity();
        tempMin();
        tempMax();
        feelsLike();
        condition();
        date();
        place();
        country();
        temperature();
        console.log('display.refresh - stop');
    };

    // Handles location input display
    const toggleInput = () => {
        // stores strings and input state
        let buffer = {
            location: '',
            country: '',
            isShown: false,
        }

        const locationInput = document.createElement('input');
        locationInput.type = 'text';

        const locationDiv = document.querySelector('div.place');
        const countryDiv = document.querySelector('div.country');

        if (!buffer.isShown) {
            buffer.location = '';
            const locationString = locationDiv.textContent;
            buffer.location = locationString;
            locationDiv.textContent = '';
            locationDiv.appendChild(locationInput);

            buffer.country = ''
            const countryString = countryDiv.textContent;
            buffer.country = countryString;
            countryDiv.textContent = 'Enter your location.'

            buffer.isShown = true;
            console.log('Input is shown');
        }

        if (buffer.isShown) {
            const locationString = buffer.location;
            buffer.location = '';
            locationDiv.removeChild(locationInput);
            locationDiv.textContent = locationString;

            const countryString = buffer.country;
            buffer.country = '';
            countryDiv.textContent = countryString;

            buffer.isShown = false;
            console.log('Input is hidden');
        }
    }

    return {
        getData,
        refresh,
        toggleInput,
    }
})();

export default display;