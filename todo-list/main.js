const inputTask = document.querySelector("form input");
const btnAdd = document.getElementsByClassName("btn-add")[0];
const taskCounter = document.querySelectorAll("span")[1];
const pendingTasks = document.querySelector(".empty");
let taskList = document.querySelector("ul");
let newTaskText = '';
let tasks = [];

btnAdd.addEventListener("click", (event) => {
  event.preventDefault();

  newTaskText = inputTask.value.trim();
  addTasks(newTaskText);
  localStorage.setItem("tasks", JSON.stringify(tasks));  
});

function addTasks(newTaskText){
  let newTask = document.createElement("li");
  newTask.innerHTML = `<p>${newTaskText}</p><button class="btn-delete">X</button>`;

  taskList.appendChild(newTask);

  tasks.push(newTaskText);
  updateTaskCounter();

  inputTask.value = '';
  pendingTasks.textContent = '';

  const btnDelete = newTask.getElementsByClassName("btn-delete")[0];
  btnDelete.addEventListener("click", () => {
    newTask.remove();
    tasks.pop(newTaskText);
    updateTaskCounter();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    if(taskCounter.textContent == 0){
      pendingTasks.textContent = 'You have no pending tasks.';
    }
  })
}

function updateTaskCounter(){
  let totalTasks = taskList.children.length;
  taskCounter.textContent = totalTasks;
}

function loadTasks(){
  const storedTasks = localStorage.getItem("tasks");
  if (storedTasks) {
    JSON.parse(storedTasks).forEach(addTasks);
  }
}

loadTasks();