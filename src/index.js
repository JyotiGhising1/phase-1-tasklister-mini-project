document.addEventListener("DOMContentLoaded", () => {
  let form =document.querySelector('form')
  form.addEventListener('submit', e =>{
    e.preventDefault()
    const todo = e.target.querySelector("#new-task-description").value
    const priority = e.target.querySelector("#priority").value
    buildTodo(todo, priority)
    form.reset()

  })
  document.querySelector('.sort-ascending').addEventListener('click', () =>{
    sortTasks('ascending')
  })
  document.querySelector('.sort-descending').addEventListener('click', () =>{
    sortTasks('descending')
  })
})

let tasks = []

function buildTodo(todo , priority){
let li = document.createElement('li')// creating element
let span = document.createElement('span')
span.textContent = `${todo}  ` 
li.appendChild(span)
//creating a btn to handle delete while we click x
let btnDelete = document.createElement("button") // sending to p 
btnDelete.addEventListener('click', handleDelete)
btnDelete.textContent = 'x'

//creating a edit button 
let btnEdit = document.createElement("button")
btnEdit.addEventListener('click', handleEdit)
btnEdit.textContent = 'Edit'

// append delete and edit button 
li.appendChild(btnDelete)
li.appendChild(btnEdit)

if(priority == "high"){
span.style.color = 'red'
}
else if(priority == "medium"){
span.style.color = 'blue'
}
else if(priority == "low"){
span.style.color = 'green'
}

tasks.push({text: todo , priority})
rebuildTaskList()


}

function handleDelete(e){
const li = e.target.parentNode
const index = Array.from(li.parentNode.children).indexOf(li)
tasks.splice(index, 1)
li.remove()

}

function handleEdit(e){
const li = e.target.parentNode
const span = li.querySelector('span')
if(!list.querySelector('input')){
const currentText = span.textContent;
const input = document.createElement('input')
input.type = 'text'
input.value = currentText
input.addEventListener('keyup', function(event){
  if(event.key === 'Enter'){
    span.textContent = input.value.trim()
    li.removeChild(input)
  }
})
li.insertBefore(input, span)
input.focus()
}
}

function rebuildTaskList(){
const ul = document.querySelector('#tasks')
ul.innerHTML = ''

tasks.sort((a,b)=> {
if(a.priority < b.priority) return -1
if(a.priority > b.priority) return -1
return 0
})

tasks.forEach(task => {
let li = document.createElement('li')
let span = document.createElement('span')
span.textContent = task.text
li.appendChild(span)

let btnDelete = document.createElement("button")
btnDelete.textContent= 'x'
btnDelete.addEventListener('click', handleDelete)

let btnEdit = document.createElement("button")
btnEdit.textContent = 'Edit'
btnEdit.addEventListener('click', handleEdit)

li.appendChild(btnDelete)
li.appendChild(btnEdit)

if(task.priority == 'high'){
  span.style.color = 'red'
}
else if(task.priority == 'medium'){
  span.style.color = 'blue'
}
else if(task.priority == 'low'){
  span.style.color = 'green'
}
ul.append(li)
})
}

function sortTasks(order) {
if (order === 'ascending') {
tasks.sort((a, b) => {
  const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
  return priorityOrder[a.priority] - priorityOrder[b.priority];
});
} else if (order === 'descending') {
tasks.sort((a, b) => {
  const priorityOrder = { 'high': 0, 'medium': 1, 'low': 2 };
  return priorityOrder[b.priority] - priorityOrder[a.priority];
});
}
rebuildTaskList();
}