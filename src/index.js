import './style.css';
import Popover from './Popover';

const trigger = document.getElementById('popover-trigger');

const title = trigger.dataset.title;
const content = trigger.dataset.content;

new Popover(trigger, title, content);