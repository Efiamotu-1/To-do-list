import './styles.css';

const list = document.querySelector('ul');
const todos = [
  {
    description: 'complete first phase of the project',
    completed: false,
    index: 1,
  },
  {
    description: 'complete second phase of the project',
    completed: false,
    index: 2,
  },
];

for (let i = 0; i < todos.length; i + 1) {
  const li = document.createElement('li');
  const checked = document.createElement('input');
  const text = document.createElement('p');
  const menuIcon = document.createElement('span');
  li.setAttribute('class', 'li-wrapper');
  checked.setAttribute('type', 'checkbox');
  text.textContent = todos[i].description;
  menuIcon.innerHTML = '<i class="fa-solid fa-ellipsis-vertical"></i>';
  li.appendChild(checked);
  li.appendChild(text);
  li.appendChild(menuIcon);
  list.appendChild(li);
}
