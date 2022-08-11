import data from './data.js';
import display from './display.js';

const getTodos = () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todos')) {
      data.todos = JSON.parse(localStorage.getItem('todos'));
      display();
    }
  });
};

export default getTodos;