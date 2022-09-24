import data from './data.js';
import display from './display.js';

const addTodo = (value) => {
  if (value === '') return;
  const newTodo = {
    description: value,
    completed: false,
    index: data.todos.length + 1,
  };
  data.todos.push(newTodo);
  const input = document.querySelector('.insert-text');
  input.value = '';
  localStorage.setItem('todos', JSON.stringify(data.todos));
  const list = document.querySelector('.list-container');
  display(list);
};

export default addTodo;