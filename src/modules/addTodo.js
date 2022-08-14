import data from './data.js';
import display from './display.js';
import { form } from './domElements.js';

const addTodo = (e) => {
  e.preventDefault();
  const task = form.tasks.value;
  if (task === '') return;

  const newTodo = {
    description: task,
    completed: false,
    index: data.todos.length + 1,
  };
  form.tasks.value = '';
  data.todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(data.todos));
  display();
};

export default addTodo;