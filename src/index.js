import 'normalize.css';
import './styles.css';
import weather from './weather.js';

const result = weather.get()
console.log(result);