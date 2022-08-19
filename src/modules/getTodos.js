import data from './data.js';
import display from './display.js';

const getTodos = () => {
  document.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('todos')) {
      data.todos = JSON.parse(localStorage.getItem('todos'));
      let list = document.querySelector('.list-container')
      display(list);
    }
  });
};

export default getTodos;