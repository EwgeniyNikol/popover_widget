import './style.css';
import Popover from './Popover';

const trigger = document.getElementById('popover-trigger');

new Popover(
  trigger,
  'Popover title',
  'А здесь потрясающий контент. Он очень увлекает. Правда?'
);