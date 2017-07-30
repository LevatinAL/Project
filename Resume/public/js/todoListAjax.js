var log = console.log.bind(console, '*** ')
var appendHtml = (element, html) => {
    element.insertAdjacentHTML('beforeend', html)
}
var e = sel => document.querySelector(sel)
var ajax = function(method, path, data, reseponseCallback) {
    var r = new XMLHttpRequest()
    // 设置请求方法和请求地址
    r.open(method, path, true)
    // 设置发送的数据的格式
    r.setRequestHeader('Content-Type', 'application/json')
    // 注册响应函数
    r.onreadystatechange = function() {
        if(r.readyState === 4) {
            // reseponseCallback 服务器返回的信息
            reseponseCallback(r.response)
        }
    }
    // 处理 data
    data = JSON.stringify(data, null, 2)
    // 发送请求
    r.send(data)
}

var apiTodoAll = callback => {
    var method = 'GET'
    var path = '/todo/all'
    var data = {}
    ajax(method, path, data, callback)
}

var apiTodoAdd = (task, callback) => {
    var method = 'POST'
    var path = 'todo/add'
    var data = {
        task: task
    }
    ajax(method, path, data, callback)
}

var apiTodoDelete = (todoId, callback) => {
    var method = 'GET'
    var path = '/todo/delete/' + todoId
    var data = {}
    ajax(method, path, data, callback)
}

var templateTodo = todo => {
    log('todo', todo)
    var task = todo.task.task
    var id = todo.id
    var t = `
        <div class='todo-cell' data-id='${id}'>
            <button class='todo-complete'>完成</button>
            <span class='todo-task'>${task}</span>
			<button class='todo-delete'>删除</button>
        </div>
    `
//     todo = JSON.parse(todo)

    return t
}
var insertCss = () => {
    var t = `
    <style>
        .done {
            color: red;
            text-decoration: line-through;
        }
    </style>
    `
    appendHtml(document.head, t)
}
var bindEventDelete = () => {
    var container = e('.Text')
    container.addEventListener('click', function(event){
        var self = event.target
        if (self.classList.contains('todo-delete')) {
            log('button click, delete')
            var self = event.target
            log('debug self', self)
            var todoCell = self.closest('.todo-cell')
            // 拿到 todo_id
            // 在事件中调用删除函数, 获取 todo_id 并且传给删除函数
            // 用 ajax 发送给服务器
            var todoId = todoCell.dataset.id
            console.log('debug id', todoId, 'todo')
            apiTodoDelete(todoId, function(todo){
                console.log('删除成功')
                // 删除后, 删除页面元素
                todoCell.remove()
            })
        }
    })
}
var bindEventComplete = () => {
    var container = e('.todo-complete')
    container.addEventListener('click', function(event){
        var self = event.target
        if (self.classList.contains('')) {
            log('button click, complete')
            var self = event.target
            var todoCell = self.closest('.todo-cell')
            var todoId = todoCell.dataset.id
            apiTodoDelete(todoId, function(todo){
                log('删除成功', todo)
        if(self.classList.contains('todo-complete')) {
                    log('done')
            var todoDiv = self.parentElement
            todoDiv.classList.toggle('done')
        }
            })
        }
    })
}
var insertTodo = todo => {
    var html = templateTodo(todo)
    console.log('insertTodo', todo)
    appendHtml(e('.Text'), html)
}
var insertTodos = todos => {
    for (var i = 0; i < todos.length; i++) {
        var todo = todos[i]
        console.log('debug insertTodos', todo)
        insertTodo(todo)
    }
}
var loadTodos = () => {
    apiTodoAll(function (data) {
        var r = JSON.parse(data)
        insertTodos(r)
    })
}
var insertInput = function() {
    var t = `
        <div>
            <input id="id-input-task">
            <button id="id-button-add" class='todo-add'>添加</button>
        </div>
    `
    appendHtml(e('.Text'), t)
}
var bindEventAdd = () => {
    // 绑定 add 按钮的事件委托
    var container = e('.Text')
    container.addEventListener('click', function(event){
        var self = event.target
        if (self.classList.contains('todo-add')) {
            log('button click, add')
            // 获取 input 的输入
            var input = e('#id-input-task')
            var value = input.value
            // 组装成对象
            var data = {
                'task': value,
            }
            apiTodoAdd(data, function(todo){
                log('创建成功', todo, typeof(todo))
                // 往页面中插入被创建的 todo
                var todo = JSON.parse(todo)
                insertTodo(todo)
            })
        }
    })
}
var bindEvents = () => {
    bindEventAdd()
    bindEventDelete()
    bindEventComplete()
}
var __AjaxMain = function() {
    loadTodos()
    // insertInput()
    bindEvents()
    insertCss()
}
__AjaxMain()
