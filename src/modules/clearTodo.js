/* eslint-disable no-plusplus */
import data from './data.js';
import display from './display.js';

const clearTodo = (array) => {
  let count = 1;
  data.todos = array.filter((todo) => todo.completed !== true);

  data.todos = data.todos.map((todo) => ({
    description: todo.description,
    completed: todo.completed,
    index: count++,
  }));
  localStorage.setItem('todos', JSON.stringify(data.todos));
  let tasks = document.querySelectorAll('.list-container li')
  tasks.forEach(task => {
    if(task.checked === true) {
      task.remove()
    }
  })
  let list = document.querySelector('.list-container')
  display(list);
};

export default clearTodo;