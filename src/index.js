import 'normalize.css';
import './styles.css';
import weather from './weather.js';
import display from './UI.js';

let buffer = {
    processsedForecast: {},
    location: '',
}

// Gets forecast object from the weather module and processes it for UI module
const processForecast = async (location) => {
    const getDate = () => {
        const months = [
          'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
          'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
        ];
      
        const currentDate = new Date();
        const day = currentDate.getDate();
        const month = months[currentDate.getMonth()];
        const year = currentDate.getFullYear();
      
        return `${day} ${month} ${year}`;
    }
    
    const getUnits = () => {
        const input = document.querySelector('input[name="units"]:checked');
        console.log(`Units are ${input.value}`);
        return input.value;
    }
    
    const processHourlyforecast = (inputHourly, outputHourly) => {
        inputHourly.forEach((hour) => {
            const index = inputHourly.indexOf(hour);
            outputHourly[index].iconSRC = hour.condition.icon;
            outputHourly[index].condition = hour.condition.text;
            outputHourly[index].temperature.c = hour.temp_c;
            outputHourly[index].temperature.f = hour.temp_f;
        })
    };

    let input = {};
    let output = {
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
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            1: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            2: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            3: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            4: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            5: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            6: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            7: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            8: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            9: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            10: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            11: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            12: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            13: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            14: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            15: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            16: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            17: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            18: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            19: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            20: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            21: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            22: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
            23: {
                iconSRC: '',
                condition: '',
                temperature: {
                    c: 0,
                    f: 0,
                }, 
            },
        },
    }

    await weather.get(location).then((result) => {
        input = {...result};
        if (!input.location) {
            alert('Cannot find the location');
            setLocation();
            return
        }

        if(input.location.name === 'Dnipropetrovsk') { //Weather API uses russian language based name for this city, fuck russians!
            output.place = 'Dnipro';
        } else {
            output.place = input.location.name;
        }

        output.country = input.location.country;
        output.date = getDate();
        output.condition.text = input.current.condition.text;
        output.condition.iconSRC = input.current.condition.icon;
        output.temperature.c = input.current.temp_c;
        output.temperature.f = input.current.temp_f;
        output.temperature.maxTemp.c = input.forecast.forecastday[0].day.maxtemp_c;
        output.temperature.maxTemp.f = input.forecast.forecastday[0].day.maxtemp_f;
        output.temperature.minTemp.c = input.forecast.forecastday[0].day.mintemp_c;
        output.temperature.minTemp.f = input.forecast.forecastday[0].day.mintemp_f;
        output.temperature.feelsLike.c = input.current.feelslike_c;
        output.temperature.feelsLike.f = input.current.feelslike_f;
        output.humidity = input.current.humidity;
        output.windSpeed.km = input.current.wind_kph;
        output.windSpeed.mph = input.current.wind_mph;
        output.chanceOf.snow = input.forecast.forecastday[0].day.daily_chance_of_snow;
        output.chanceOf.rain = input.forecast.forecastday[0].day.daily_chance_of_rain;

        switch (getUnits()) {
            case 'metric':
                output.units.metric = true;
                output.units.imperial = false;
                break;
            case 'imperial':
                output.units.metric = false;
                output.units.imperial = true;
                break;
        }

        const inputHourly = input.forecast.forecastday[0].hour;
        const outputHourly = output.hourly;
        processHourlyforecast(inputHourly, outputHourly);

        buffer.processsedForecast = {};
        buffer.processsedForecast = {...output};
        buffer.location = '';
        buffer.location = output.place;
        display.getData(buffer.processsedForecast);
        display.refresh();
        listenButton();
    }).catch((error) => {
        alert('Cannot find the location');
        setLocation();
    });
}

const listenButton = () => {
    const button = document.querySelector('button[title="Choose your location"]');
    button.addEventListener('click', setLocation);
}

const unlistenButton = () => {
    const button = document.querySelector('button[title="Choose your location"]');
    button.removeEventListener('click', setLocation);
}

const setLocation = async (e) => {
    const handleKeyboard = (event) => {
        if (event.key === 'Escape') {
            cancelInput();
            return
        }
        if (event.key === 'Enter') {
            submitInput();
            return;
        }
        return;
    }

    const listenKeyboard = () => {
        document.addEventListener('keydown', handleKeyboard);
    }
    
    const unListenKeyboard = () => {
        document.removeEventListener('keydown', handleKeyboard);
    }

    const cancelInput = () => {
        removeEventListener('click', cancelInput);
        unListenKeyboard();
        display.toggleInput();
        listenButton();
    }

    const submitInput = async () => {
        submitButton.removeEventListener('click', submitInput);
        unListenKeyboard();
        const input = document.querySelector('input[type="text"]');
        const location = input.value;
        display.toggleInput();
        processForecast(location);
    }

    unlistenButton();
    listenKeyboard();
    display.toggleInput();

    const cancelButton = document.querySelector('button.cancel');
    cancelButton.addEventListener('click', cancelInput);
    const submitButton = document.querySelector('button.submit');
    submitButton.addEventListener('click', submitInput);
}

const unitSwitch = document.querySelector('div.unit');

const handleUnits = () => {
    processForecast(buffer.location);
}

const onload = () => {
    removeEventListener('DOMContentLoaded', onload);
    processForecast('kushugum')
    unitSwitch.addEventListener('click', handleUnits);
    console.log("Page loaded");
}

document.addEventListener('DOMContentLoaded', onload)