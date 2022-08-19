import addTodo from './modules/addTodo.js';
import display, { deleteTodo } from './modules/display.js';

document.body.innerHTML = `

<main>
    <section class="list-div">
      <div class="title">
          <h1>Today's To Do</h1>
          <span><i class="fa-solid fa-arrows-rotate"></i></span>
      </div>
      <div class="input-text">
          <form id="form">
          <input type="text" name="tasks" placeholder="Add to your list" class="insert-text">
          <span><i class="fa-solid fa-plus add"></i></span>
          </form>
      </div>
       <ul class="list-container">

       </ul>
      <div class="clear-elements">
          <button class="clear-btn" type="submit">Clear all completed</button>
      </div>
    </section>
  </main>

`;

describe('Updating the todo list', () => {
  test('Add a new todo', () => {
    addTodo('add a todo');
    addTodo('add a todo');

    const list = document.querySelector('.list-container');
    expect(list.childElementCount).toBe(2);
  });

  test('remove a todo', () => {
    deleteTodo(1);
    const list = document.querySelector('.list-container');
    display(list);
    expect(list.childElementCount).toBe(1);
  });
});