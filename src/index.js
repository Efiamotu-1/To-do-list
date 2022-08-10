import './styles.css';

const list = document.querySelector('ul');
const form = document.querySelector('form')

let todos = [];

form.addEventListener('submit', (e) => {
  e.preventDefault()
  let newTodo = {
    description : form.tasks.value,
    completed : false,
    index : todos.length + 1
  }
  form.tasks.value = ''
  todos.push(newTodo)
  localStorage.setItem('todos', JSON.stringify(todos))
  display()
})

let display = () => {
  list.innerHTML = ''
  todos.map((todo, i) => {
  console.log(todos)
    const li = document.createElement('li');
    const checked = document.createElement('input');
    const text = document.createElement('input');
    const menuIcon = document.createElement('span');
    const deleteIcon = document.createElement('span');
    li.setAttribute('class', 'li-wrapper');
    checked.type = 'checkbox'
    checked.name = 'task-done'
    checked.checked = false
    checked.id = todo.index
    text.type = 'text'
    text.name = 'task'
    text.value = todo.description;
    text.id = todo.index
    text.disabled= true
    text.style.cursor = 'pointer'
    text.style.background = 'none'
    text.style.color= 'black'
    menuIcon.innerHTML = '<i class="fa-solid fa-ellipsis-vertical" for="select"></i>';
    deleteIcon.innerHTML = `<i class="fa-solid fa-trash" id="${todo.index}"></i>`;
    deleteIcon.style.display = 'none'
    li.appendChild(checked);
    li.appendChild(text);
    li.appendChild(menuIcon);
    li.appendChild(deleteIcon);
    list.appendChild(li);

    menuIcon.addEventListener('click', () => {
      deleteIcon.style.display = 'block'
      menuIcon.style.display = 'none'
      text.disabled = false
      text.style.background = ''
      text.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
        console.log(e.target.id)
        }
      })

    })

    deleteIcon.addEventListener('click', (e) => {
      let taskId = e.target.id
      console.log(Number(taskId))
      console.log(todo.index)
      todos = todos.filter(todo => todo.index !== Number(taskId))
      todos = todos.map((todo) => {
        if(todo.index > taskId) {
          return {
            description : todo.description,
            completed : todo.completed,
            index: todo.index - 1
          }
        }
        else {
          return {
            description : todo.description,
            completed : todo.completed,
            index: todo.index
          }
        }
       })
      localStorage.setItem('todos', JSON.stringify(todos))
      e.target.parentElement.parentElement.remove()
      console.log(todos)
    })

    text.addEventListener('keyup', (e) => {
      if (e.key === 'Enter') {
        console.log(e.target.value)

      }
    })
  });
// }
}

if(localStorage.getItem('todos')) {
  todos = JSON.parse(localStorage.getItem('todos'))
  display()
  }