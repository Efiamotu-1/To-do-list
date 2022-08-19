import data from './data.js';
import display from './display.js';
import { list } from './domElements.js';


const addTodo = (value) => {
  const newTodo = {
    description: value,
    completed: false,
    index: data.todos.length + 1,
  };
  data.todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(data.todos));
  let list = document.querySelector('.list-container')
  console.log(list)
  display(list)
};

export default addTodo;