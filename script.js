const classNames = {
  TODO_ITEM: 'todo-container',
  TODO_CHECKBOX: 'todo-checkbox',
  TODO_TEXT: 'todo-text',
  TODO_DELETE: 'todo-delete',
}

const list = document.getElementById('todo-list')
const itemCountSpan = document.getElementById('item-count')
const uncheckedCountSpan = document.getElementById('unchecked-count')

let id = 0;

//<li>
//  <input type="checkbox">
//  <button>delete</button>
//  <span>text</span>
//</li>



class Todo {
  constructor() {
    this.id = ++id;
    this.check = false;
    this.text = this.getText();
  }
  getText() {
    return prompt('Enter a todo task:')
  }
}



getTodos = function() {
  let todos;

  try {
    todos = localStorage.getItem('todos');
    todos = JSON.parse(todos);
    
    if (todos.length > 0) {
      id = todos[todos.length - 1].id;
    }
  } catch (error) {
    todos = new Array();
  }

  if (todos === null || Array.isArray(todos) == false) {
    todos = new Array();
  }

  return todos;
}

setTodos = function(todos) {
  localStorage.setItem('todos', JSON.stringify(todos));
}

pushTodos = function(todo) {
  let todos = getTodos();
  todos.push(todo);
  setTodos(todos);
}



if (getTodos().length != 0) {
  render();
}



function newTodo() {
  // get text
  const todo = new Todo();
  pushTodos(todo);
  render();
}

function render() {
  list.innerHTML = '';
  getTodos().map(createTodo).forEach(todo => list.appendChild(todo));
  // update counts
  itemCountSpan.textContent = getTodos().length;
  uncheckedCountSpan.textContent = getTodos().filter(todo => !todo.check).length;
}

function createTodo(todo) {
  console.log('todo', todo);
  // create li
  const li = document.createElement('li');
  // create input checkbox
  // create button
  // create span
  li.innerHTML = `
  <input type="checkbox" onchange="changeTodo(${todo.id})" ${todo.check ? "checked" : ""}>
  <button onclick="deleteTodo(${todo.id})">delete</button>
  <span>${todo.text}</span>
  `
  return li;
}

function deleteTodo(id) {
  let todos = getTodos();
  setTodos(todos.filter(todo => todo.id !== id));
  render();
}

function changeTodo(id) {
  //  for (let i = 0; i < todos.length; i++) {
  //    if (todos[i].id === id) {
  //      todos[i].check = !todos[i].check;
  //      break;
  //    }
  //  }

 // todos = todos.map(todo => todo.id == id ? {
 //   id: todo.id, 
 //   text: todo.text, 
 //   check: !todo.check
 // } : todo);
  let todos = getTodos();
  todos = todos.map(todo => todo.id == id ?
    {
    ... todo,
    check: !todo.check
  } : todo);

  setTodos(todos);
  
  uncheckedCountSpan.textContent = todos.filter(todo => !todo.check).length;
}