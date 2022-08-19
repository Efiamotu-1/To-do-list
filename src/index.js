import './styles.css';
import addTodo from './modules/addTodo.js';
import { add, clear, input } from './modules/domElements.js';
import getTodos from './modules/getTodos.js';
import clearTodo from './modules/clearTodo.js';

getTodos();

// on click of the add icon it adds the todo and calls the display function
// which displays it on the dom
add.addEventListener('click', () => {
  addTodo(input.value);
});

clear.addEventListener('click', clearTodo);
