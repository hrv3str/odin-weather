import 'normalize.css';
import './styles.css';
import weather from './weather.js';
import display from './UI.js';

const result = weather.get()
console.log(result);