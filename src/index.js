import 'normalize.css';
import './styles.css';
import weather from './weather.js';
import display from './UI.js';

weather.get().then((result) => {
    console.log(result);
});

const onload = () => {
    removeEventListener('DOMContentLoaded', onload);
    console.log("Page loaded");
}

document.addEventListener('DOMContentLoaded', onload);