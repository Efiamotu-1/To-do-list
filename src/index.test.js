import addTodo from "./modules/addTodo";
import { input, list } from "./modules/domElements";
import display from "../src/modules/display"
import data from '../src/modules/data.js';

describe('Add new todo', () => {
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
    `
    const addTodo = () => {
        const newTodo = {
          description: 'play ball tomorrow',
          completed: false,
          index: data.todos.length + 1,
        };
        data.todos.push(newTodo);
        localStorage.setItem('todos', JSON.stringify(data.todos));
        display(); 
      };
    addTodo()

    test('todo add', () => {    
   expect(data.todos.length).toBe(1)}) 
})