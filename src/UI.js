const display = (() => {
    //Tempalte object that must be passed to module
    let source = {}

    // stores strings and input state
    let buffer = {
        location: '',
        country: '',
        isShown: false,
    }

    // Sets passed object as source object
    const getData = (object) => {
        source = {...object};
        console.log('display.getData - Read object');
        console.log(source);
    }

    // Refreshes UI according to 'source' object
    const refresh = () => {
        console.log('display.refresh - start')
        // Looks for element and sets its text content
        const set = (target, content) => {
            const input = document.querySelector(target);
            input.textContent = content;

            const icon = document.createElement('span');
            icon.classList.add("icon");
            input.appendChild(icon);
        };

        const setNoIcon = (target, content) => {
            const input = document.querySelector(target);
            input.textContent = content;
        };

        const setPlace = (target, content) => {
            const input = document.querySelector(target);
            input.textContent = content;

            const button = document.createElement('button');
            button.classList.add("icon");
            button.title = 'Choose your location'
            input.appendChild(button);
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
            if (source.chanceOf.rain > 0) {
                if (target.classList.contains('snow')) {
                    target.classList.remove('snow');
                }
                if (target.classList.contains('no-fallout')) {
                    target.classList.remove('no-fallout');
                }
                target.classList.add('rain');
                return source.chanceOf.rain;
            }

            if (source.chanceOf.snow > 0) {
                if (target.classList.contains('rain')) {
                    target.classList.remove('rain');
                }
                if (target.classList.contains('no-fallout')) {
                    target.classList.remove('no-fallout');
                }
                target.classList.add('snow');
                return source.chanceOf.snow;
            }

            if (target.classList.contains('snow')) {
                target.classList.remove('snow');
            }
            if (target.classList.contains('rain')) {
                target.classList.remove('rain');
            }
            target.classList.add('no-fallout');
        }

        // Toggle wind speed units according to source.units value
        const toggleWindSpeedUnits = (target) => {
            const element = document.querySelector(target);
            if (source.units.metric) {
                if (element.classList.contains('miles')) {
                    element.classList.remove('miles');
                }
                element.classList.add('kilometers');
                return source.windSpeed.km;
            }

            if (source.units.imperial) {
                if (element.classList.contains('kilometers')) {
                    element.classList.remove('kilometers');
                }
                element.classList.add('miles');
                return source.windSpeed.mph;
            }
        }
        
        // Updates place info
        const place = () => {
          const target = 'div.place';
          const text = source.place;
          setPlace(target, text);
          console.log('location display updated');
        };
        
        // Updates country info
        const country = () => {
          const target = 'div.country';
          const text = source.country;
          setNoIcon(target, text);
          console.log('country display updated');
        };
        
        // Updates temperature info
        const temperature = () => {
          const target = '.card .temperature';
          const element = document.querySelector(target);
          toggleTemperatureUnits(element);
          const sourceTemp = source.temperature;
          const text = toggleTemperatureValues(sourceTemp);
          setNoIcon(target, text);console.log('temperature display updated');
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
            const element = document.querySelector(target);
            toggleTemperatureUnits(element);
            const sourceTemp = source.temperature.feelsLike;
            const text = toggleTemperatureValues(sourceTemp);
            set(target, text);
            console.log('feels like display updated');
        };
  
        // Updates max temperature info
        const tempMax = () => {
            const target = 'div.temp-max';
            const element = document.querySelector(target);
            toggleTemperatureUnits(element);
            const sourceTemp = source.temperature.maxTemp;
            const text = toggleTemperatureValues(sourceTemp);
            set(target, text);
            console.log('max temp display updated');
        };
        
        // Updates min tempreture info
        const tempMin = () => {
            const target = 'div.temp-min';
            const element = document.querySelector(target);
            toggleTemperatureUnits(element);
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
            const element = document.querySelector(target);
            const text = toggleTypeOfFallout(element);
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
                    <img class="icon"
                        src="${source.hourly[key].iconSRC}"
                        alt="${source.hourly[key].condition}"
                        title="${source.hourly[key].condition}"/>
                `;
                body.innerHTML = bodyContent;
                body.id = `Card #${key}`;

                const temperature = document.createElement('div');
                temperature.classList.add('temperature');
                toggleTemperatureUnits(temperature);

                const sourceTemp = source.hourly[key].temperature;
                const text = toggleTemperatureValues(sourceTemp);
                temperature.textContent = text;

                body.appendChild(temperature);
                container.appendChild(body);
            }
            console.log('hourly forecast updated');
        }

        const scrollCard = () => {
            const currentHour = new Date().getHours();
            const focus = document.getElementById(`Card #${currentHour}`);
            focus.scrollIntoView({ behavior: 'smooth' });
        }

        // Call the functions to update the content
        hourly();
        scrollCard();
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

        const locationInput = document.createElement('input');
        locationInput.type = 'text';
        const submitButton = document.createElement('button');
        const cancelButton = document.createElement('button');
        submitButton.classList.add('icon');
        submitButton.classList.add('submit');
        submitButton.title = 'Submit your location'
        cancelButton.classList.add('icon');
        cancelButton.classList.add('cancel');
        cancelButton.title = 'Cancel';


        const locationDiv = document.querySelector('div.place');
        const countryDiv = document.querySelector('div.country');

        if (buffer.isShown === false) {
            buffer.location = '';
            const locationString = locationDiv.textContent;
            buffer.location = locationString;
            locationDiv.textContent = '';
            locationDiv.appendChild(locationInput);
            locationInput.focus();
            locationDiv.appendChild(cancelButton);
            locationDiv.appendChild(submitButton);

            buffer.country = ''
            const countryString = countryDiv.textContent;
            buffer.country = countryString;
            countryDiv.textContent = 'Enter your location.'

            buffer.isShown = true;
            console.log('Input is shown');
            return;
        }

        if (buffer.isShown === true) {
            const locationString = buffer.location;
            buffer.location = '';
            locationDiv.innerHTML = '';
            locationDiv.textContent = locationString;
            const button = document.createElement('button');
            button.classList.add('icon');
            button.title = "Choose your location"
            locationDiv.appendChild(button);

            const countryString = buffer.country;
            buffer.country = '';
            countryDiv.textContent = countryString;

            buffer.isShown = false;
            console.log('Input is hidden');
            return;
        }
    }

    return {
        getData,
        refresh,
        toggleInput,
    }
})();

export default display;