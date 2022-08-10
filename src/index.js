import './styles.css';

const list = document.querySelector('ul');
const form = document.querySelector('form');
let todos = [];

const display = () => {
  list.innerHTML = '';
  todos.forEach((todo) => {
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
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash" id="${todo.index}"></i>`;
    deleteIcon.style.display = 'none';
    li.appendChild(checked);
    li.appendChild(text);
    li.appendChild(menuIcon);
    li.appendChild(deleteIcon);
    list.appendChild(li);

    menuIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'block';
      menuIcon.style.display = 'none';
      text.disabled = false;
      text.style.background = '';
      text.addEventListener('keydown', (e) => {
        const textId = e.target.id;
        if (e.key === 'Enter') {
          todos = todos.map((todo) => {
            if (Number(textId) === todo.index) {
              return {
                description: text.value,
                completed: false,
                index: todo.index,
              };
            }

            return {
              description: todo.description,
              completed: false,
              index: todo.index,
            };
          });
          localStorage.setItem('todos', JSON.stringify(todos));
          display();
        }
      });
    });

    deleteIcon.addEventListener('click', (e) => {
      const taskId = e.target.id;

      todos = todos.filter((todo) => todo.index !== Number(taskId));
      todos = todos.map((todo) => {
        if (todo.index > taskId) {
          return {
            description: todo.description,
            completed: todo.completed,
            index: todo.index - 1,
          };
        }

        return {
          description: todo.description,
          completed: todo.completed,
          index: todo.index,
        };
      });
      localStorage.setItem('todos', JSON.stringify(todos));
      e.target.parentElement.parentElement.remove();
    });

  });
// }
};

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTodo = {
    description: form.tasks.value,
    completed: false,
    index: todos.length + 1,
  };
  form.tasks.value = '';
  todos.push(newTodo);
  localStorage.setItem('todos', JSON.stringify(todos));
  display();
});

if (localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'));
  display();
}