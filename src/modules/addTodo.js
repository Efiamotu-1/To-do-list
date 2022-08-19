import data from './data.js';
import display from './display.js';

const addTodo = (value) => {
  const newTodo = {
    description: value,
    completed: false,
    index: data.todos.length + 1,
  };
  data.todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(data.todos));
  const list = document.querySelector('.list-container');
  display(list);
};

export default addTodo;