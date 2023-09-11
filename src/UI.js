const display = (() => {
    let forecast = { //Tempalte object that must be passed to module
        place: '',
        country: '',
        condition: {
            text: '',
            icon: ''
        },
        temperature: {
            c: 0,
            f: 0
        },
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
        gust: {
            kph: 0,
            mph: 0
        },
        humidity: 0,

    }
})();

export default display;