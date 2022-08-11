import data from './data.js';
import { list } from './domElements.js';

const display = () => {
  list.innerHTML = '';
  data.todos.forEach((todo) => {
    const li = document.createElement('li');
    const checked = document.createElement('input');
    const text = document.createElement('input');
    const menuIcon = document.createElement('span');
    const deleteIcon = document.createElement('span');
    li.setAttribute('class', 'li-wrapper');
    checked.type = 'checkbox';
    checked.name = 'task-done';
    checked.checked = false;
    checked.id = todo.index;
    text.type = 'text';
    text.name = 'task';
    text.value = todo.description;
    text.id = todo.index;
    text.disabled = true;
    text.style.cursor = 'pointer';
    text.style.background = 'none';
    text.style.color = 'black';
    menuIcon.innerHTML = '<i class="fa-solid fa-ellipsis-vertical" for="select"></i>';
    deleteIcon.innerHTML = `<i class="fa-solid fa fa-trash" id="${todo.index}"></i>`;
    deleteIcon.style.display = 'none';
    li.appendChild(checked);
    li.appendChild(text);
    li.appendChild(menuIcon);
    li.appendChild(deleteIcon);
    list.appendChild(li);
    if (todo.completed === true) {
      checked.checked = true;
      text.style.textDecoration = 'line-through';
    }

    const deleteTodo = (e) => {
      const taskId = e.target.id;
      data.todos = data.todos.filter((todo) => todo.index !== Number(taskId));
      data.todos = data.todos.map((todo) => {
        if (todo.index > taskId) {
          deleteIcon.id = todo.index - 1;
          return ({
            description: todo.description,
            completed: todo.completed,
            index: todo.index - 1,
          }
          );
        }

        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(data.todos));
      e.target.parentElement.parentElement.remove();
    };

    const changeTodoValue = (e, text) => {
      const textId = e.target.id;
      if (e.key === 'Enter') {
        data.todos = data.todos.map((todo) => {
          if (Number(textId) === todo.index) {
            return {
              description: text.value,
              completed: false,
              index: todo.index,
            };
          }

          return todo;
        });
        localStorage.setItem('todos', JSON.stringify(data.todos));
        display();
      }
    };

    menuIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'block';
      menuIcon.style.display = 'none';
      text.disabled = false;
      text.style.background = '#f1f5f9';

      text.addEventListener('keydown', (e) => changeTodoValue(e, text));
    });

    deleteIcon.addEventListener('click', (e) => deleteTodo(e));

    checked.addEventListener('change', (e) => {
      const taskId = e.target.id;
      if (text.style.textDecoration === 'line-through') {
        text.style.textDecoration = '';
      } else {
        text.style.textDecoration = 'line-through';
      }

      data.todos = data.todos.map((todo) => {
        if (Number(taskId) === todo.index) {
          return {
            description: todo.description,
            completed: !todo.completed,
            index: todo.index,
          };
        }

        return todo;
      });
      localStorage.setItem('todos', JSON.stringify(data.todos));
    });
  });
// }
};

export default display;