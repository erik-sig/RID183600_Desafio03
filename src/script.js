const todoSection = document.querySelector("#todo-section");
const todoTemplate = document.querySelector("#template");
const inputBtn = document.querySelector("#input-btn");
const inputTag = document.querySelector("#input-tag");
const inputText = document.querySelector("#input-text");
const taskTime = document.querySelector("#task-time");
const checkBtn = document.querySelector("#check-btn");
const totalTasksDone = document.querySelector("#total-tasks-done");

function calculateDoneTasks() {
  const todos = getTodosLocalStorage();
  const total = todos.reduce((acc, todo) => {
    return todo.done ? acc + 1 : acc;
  }, 0);

  totalTasksDone.innerText = total;
}

function getTodosLocalStorage() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [
    {
      text: "Implementar tela de listagem de tarefas",
      tag: "frontend",
      date: "21/08/2024",
      done: false,
    },
    {
      text: "Criar endpoint para cadastro de tarefas",
      tag: "backend",
      date: "21/08/2024",
      done: false,
    },
  ];
  return todos;
}

function loadTodos() {
  calculateDoneTasks();
  const todos = getTodosLocalStorage();

  todos.forEach((todo) => {
    saveTodo(todo.text, todo.tag, todo.date, todo.done, 0);
  });
}

function saveTodoLocalStorage(todo) {
  const todos = getTodosLocalStorage();
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function saveTodo(text, tag, date, done = false, save = 1) {
  const newTodo = todoTemplate.cloneNode(true);
  const time = new Date(Date.now());
  const today = time.toLocaleDateString();
  console.log(today);
  newTodo.querySelector("h2").innerText = text;
  newTodo.querySelector("span").innerText = tag;
  newTodo.querySelector("time").innerText = today;
  newTodo.classList.remove("hidden");
  newTodo.classList.add("flex");
  todoSection.appendChild(newTodo);
  if (done) {
    newTodo.classList.add("done");
  }
  if (save) {
    saveTodoLocalStorage({ text, tag, date, done });
  }
}

function updateTodoStatus(text) {
  const todos = getTodosLocalStorage();

  todos.map((todo) => (todo.text === text ? (todo.done = !todo.done) : null));

  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleCheckTodo(e) {
  const targetBtn = e.target;
  const parentElement = targetBtn.closest("article");
  const todoTitle = parentElement.querySelector("h2");

  parentElement.classList.toggle("done");
  updateTodoStatus(todoTitle.innerText);
  calculateDoneTasks();
}

//EVENTOS
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputText.value && inputTag.value) {
    saveTodo(inputText.value, inputTag.value);
  }
  inputText.value = "";
  inputTag.value = "";
});

loadTodos();
