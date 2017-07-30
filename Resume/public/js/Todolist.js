var templateTodo = (todo) => {
    var t = `
        <div class='todo-cell'>
          <button class='todo-done'>Done</button>
          <span contenteditable='true'>${todo}</span>
          <button class='todo-delete'>Delete</button>
        </div>
    `
    return t
}
var loadTodos = function() {
    var s = localStorage.savedTodos
    if (s == undefined) {
        return []
    } else {
        var ts = JSON.parse(s)
        return ts
    }
}

var insertTodos = function(todos) {
    var todoContainer = e('.bord')
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        var html = templateTodo(todo)
        appendHtml(todoContainer, html)
    }
}

var saveTodo = function(todo) {
    var todos = loadTodos()
    todos.push(todo)
    var s = JSON.stringify(todos)
    localStorage.savedTodos = s
}

var deleteTodo = function(container, todoCell) {
    for (var i = 0; i < container.children.length; i++) {
        var cell = container.children[i]
        if (todoCell == cell) {
            log('删除 cell, 找到下标', i)
            todoCell.remove()
            var todos = loadTodos()

            todos.splice(i, 1)
            var s = JSON.stringify(todos)
            localStorage.savedTodos = s
        }
    }
}

var todos = loadTodos()
insertTodos(todos)

var addButton = e('#put')
bindEvent(addButton, 'click', function(){
    var todoInput = e('#Int')
    var todo = todoInput.value
    saveTodo(todo)
    var todoContainer = e('.bord')
    var html = templateTodo(todo)
    appendHtml(todoContainer, html)
    todoInput.value = ''
    
})
window.addEventListener('keydown', function(event) {
    if (event.key == 'Enter') {
        var todoInput = e('#Int')
        var todo = todoInput.value
        saveTodo(todo)
        var todoContainer = e('.bord')
        var html = templateTodo(todo)
        appendHtml(todoContainer, html)
        todoInput.value = ''
    }
})



var todoContainer = e('.bord')
todoContainer.addEventListener('click', function(event){
    log('container click', event, event.target)
    var target = event.target
    if(target.classList.contains('todo-done')) {
        log('done')
        var todoDiv = target.parentElement
        todoDiv.classList.toggle('done')
    } else if (target.classList.contains('todo-delete')) {
        log('delete')
        var todoDiv = target.parentElement
        var container = todoDiv.parentElement
        deleteTodo(container, todoDiv)
    }
})
