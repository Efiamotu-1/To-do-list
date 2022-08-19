import './styles.css';
import addTodo from './modules/addTodo.js';
import { add, clear } from './modules/domElements.js';
import getTodos from './modules/getTodos.js';
import clearTodo from './modules/clearTodo.js';

getTodos();

add.addEventListener('click', addTodo);

clear.addEventListener('click', clearTodo);
