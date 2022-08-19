import addTodo from './modules/addTodo.js';
import display, { deleteTodo } from './modules/display.js';
import clearTodo from './modules/clearTodo.js';
import data from './modules/data.js';

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

describe('Edit an existing task should update its value', () => {
  test('edit an existing', () => {
    const list = document.querySelector('.list-container');
    list.innerHTML = '';
    data.todos = [];
    addTodo('Test Task 1');
    display(list);
    // Target the first task input and assings it to a variable
    const firstTaskInput = document.querySelector('.list-container li:nth-child(1) input:nth-child(2)');
    // Expect the value to be 'Test Task 1'
    expect(firstTaskInput.value).toBe('Test Task 1');
    firstTaskInput.value = 'Edit a todo';
    // Expect the value to be 'edit a todo'
    expect(firstTaskInput.value).toBe('Edit a todo');
    expect(list.childElementCount).toBe(1);
  });
});

describe('Clear all completed test suite', () => {
  test('set completed to true', () => {
    const list = document.querySelector('.list-container');
    list.innerHTML = '';
    data.todos = [];
    addTodo('Add a todo');
    display(list);
    const firstTaskCheckbox = document.querySelector('.list-container li:nth-child(1) input:nth-child(1)');
    expect(firstTaskCheckbox.checked).toBe(false);
    firstTaskCheckbox.checked = true;
    expect(firstTaskCheckbox.checked).toBe(true);
  });

  // Test that the completed tasks are removed from the list
  test('Clear all completed should clear all completed tasks', () => {
    const list = document.querySelector('.list-container');
    list.innerHTML = '';
    data.todos = [];
    addTodo('Add test task 1');
    addTodo('Add test task 2');
    addTodo('Add test task 3');
    addTodo('Add test task 4');
    display(list);
    expect(list.childElementCount).toBe(4);
    const firstTaskCheckbox = document.querySelector('.list-container li:nth-child(1) input:nth-child(1)');
    const thirdTaskCheckbox = document.querySelector('.list-container li:nth-child(3) input:nth-child(1)');
    firstTaskCheckbox.checked = true;
    thirdTaskCheckbox.checked = true;
    data.todos[0].completed = true;
    data.todos[2].completed = true;
    clearTodo(data.todos);
    expect(firstTaskCheckbox.checked).toBe(true);
    expect(thirdTaskCheckbox.checked).toBe(true);
    expect(list.childElementCount).toBe(2);
  });
});
