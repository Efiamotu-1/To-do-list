import data from './data.js';
import { list } from './domElements.js';

let dragStartId = 0;

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
    li.draggable = 'true'
    li.appendChild(checked);
    li.appendChild(text);
    li.appendChild(menuIcon);
    li.appendChild(deleteIcon);
    list.appendChild(li);
    if (todo.completed === true) {
      checked.checked = true;
      text.style.textDecoration = 'line-through';
    }

       // Drag event
   li.addEventListener('dragstart', dragStart)

   li.addEventListener('dragend', dragEnd)
   li.addEventListener('dragover', dragOver)
   li.addEventListener('dragenter', dragEnter)
   li.addEventListener('dragleave', dragLeave)
   li.addEventListener('drop', dragDrop)
 
 
   // Drag Functions
   function dragStart(e) {
     dragStartId = e.target.id
     console.log(data.todos)
     this.classList.add('selected')     
     setTimeout(() => this.classList.add('invisible'), 0) 
   }
 
   function dragEnd() {
     this.classList.remove('invisible')
     this.classList.remove('selected')     
   }
 
   function dragOver(e) {
     e.preventDefault()
 
   }
 
   function dragEnter(e) {
     e.preventDefault()
     this.classList.add('hovered')    
   }
 
   function dragLeave() {
     this.classList.remove('hovered')     
   }
 
   function dragDrop(e) {    
     let count = 1
     let replaceIndex = e.target.id - 1
    //  console.log(dragStartId)
    //  console.log(replaceIndex)
     let indexNew = dragStartId -1
     let [replaceValue] = data.todos.splice(indexNew, 1)
     data.todos.splice(replaceIndex, 0, replaceValue)
     data.todos = data.todos.map((todo) => {
       return {
         description : todo.description,
         completed : todo.completed,
         index : count++
       }
     })
     this.classList.remove('hovered')     
     console.log(data.todos)
     display()
   }
 

    const deleteTodo = (e) => {
      const taskId = e.target.id;
      let count = 1
      console.log(taskId)

      data.todos = data.todos.filter((todo) => todo.index !== Number(taskId));
      data.todos = data.todos.map((todo) => {
          return ({
            description: todo.description,
            completed: todo.completed,
            index: count++,
          });
      });
      localStorage.setItem('todos', JSON.stringify(data.todos));
      // e.target.parentElement.parentElement.remove();
      display()
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