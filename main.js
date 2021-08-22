
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-btn");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteTodo);
filterOption.addEventListener("click", filterTodo);

function addTodo(e){
    e.preventDefault()

    //tao todo div
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('todo')

    //tao list
    const newTodo = document.createElement('li')
    newTodo.innerText = todoInput.value

    //save local
    saveLocalTodos(todoInput.value)

    newTodo.classList.add('todo-item')
    todoDiv.appendChild(newTodo)
    todoInput.value = ""

    //tao completed button
    const completedBtn = document.createElement('button')
    completedBtn.innerHTML=`<i class=" fas fa-check"></i>`
    completedBtn.classList.add('completed-btn')
    todoDiv.appendChild(completedBtn)

    //tao trash button
    const trashBtn = document.createElement("button");
    trashBtn.innerHTML = `<i class="fas fa-trash"></i>`;
    trashBtn.classList.add("trash-btn");
    todoDiv.appendChild(trashBtn);

    //attach final Todo
    todoList.appendChild(todoDiv);
}


function deleteTodo(e){
    const item = e.target
    if(item.classList[0] === 'trash-btn'){
        const todo = item.parentElement
        todo.classList.add('fall')

        removeLocalTodos(todo)
        todo.addEventListener('transitioned', e=>{
            todo.remove()
        })
    }

    if(item.classList[0] == 'completed-btn'){
        const todo = item.parentElement
        todo.classList.toggle('completed')
    }
}

function saveLocalTodos(todo){
    let todos
    if(localStorage.getItem('todos') ==null){
        todos=[]
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    todos.push(todo)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function removeLocalTodos(todo){
    let todos;
    if(localStorage.getItem('todos') ==null){
        todos=[]
    }
    else {
        todos = JSON.parse(localStorage.getItem('todos'))
    }
    const todoIndex = todo.children[0].innerText
    todos.splice(todos.indexOf(todoIndex), 1)
    localStorage.setItem('todos', JSON.stringify(todos))
}

function filterTodo(e){
    const todos = todoList.childNodes
    todos.forEach(function(todo){
        switch (e.target.value){
            case "all":
                todo.style.display = 'flex'
                break
            case 'completed':
                if(todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }
                else{
                    todo.style.display = 'none'
                }
                break
            case 'uncompleted':
                if(!todo.classList.contains('completed')){
                    todo.style.display = 'flex'
                }
                else{
                    todo.style.display = 'none'
                }
                break
        }
    })
}

function getTodos() {
    let todos;
    if (localStorage.getItem("todos") === null) {
      todos = [];
    } else {
      todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function(todo) {
      //tao div
      const todoDiv = document.createElement("div");
      todoDiv.classList.add("todo");

      //tao list
      const newTodo = document.createElement("li");
      newTodo.innerText = todo;
      newTodo.classList.add("todo-item");
      todoDiv.appendChild(newTodo);
      todoInput.value = "";

      //tao completed btn
      const completedButton = document.createElement("button");
      completedButton.innerHTML = `<i class="fas fa-check"></i>`;
      completedButton.classList.add("completed-btn");
      todoDiv.appendChild(completedButton);

      //tao trash btn
      const trashButton = document.createElement("button");
      trashButton.innerHTML = `<i class="fas fa-trash"></i>`;
      trashButton.classList.add("trash-btn");
      todoDiv.appendChild(trashButton);

      //attach final Todo
      todoList.appendChild(todoDiv);
    });

    
  }