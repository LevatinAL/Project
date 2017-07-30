// express_demo.js 文件

// 引入 express 并且创建一个 express 实例赋值给 app
var express = require('express')
var app = express()
var bodyParser = require('body-parser')
// var jsonParser = bodyParser.urlencoded({ extended: false })
app.use(bodyParser.json())

// var todoList = []

// 配置静态文件目录
app.use(express.static('public'))
const log = console.log.bind(console, '---debug---')
var sendHtml = function(path, response) {
    var fs = require('fs')
    var options = {
        encoding: 'utf-8'
    }
    fs.readFile(path, options, function(err, data){
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}
var sendJSON = function(response, data) {
    var r = JSON.stringify(data, null, 2)
    response.send(r)
}
// 用 get 定义一个给用户访问的网址
// request 是浏览器发送的请求
// response 是我们要发给浏览器的响应
app.get('/', function(request, response) {
    var path = './public/fullpage.html'
    sendHtml(path, response)
})

var todos = []

var dataFile = 'todo.json'
var fs = require('fs')

var loadTodosFromFile = function(callback) {
    fs.readFile(dataFile, 'utf8', function(err, data){
        if (err != null) {
            // 出错了
            console.log('出错了')
            todos = []
            callback()
        } else {
            todos = JSON.parse(data)
            callback()
        }
    })
}
/*
ajax('GET', '/todo/all', '', function(r){
    console.log(r.response)
})
*/
app.get('/todo/all', function(request, response) {
    // var r = JSON.stringify(todos)
    // response.send(r)
    // 从文件中 读取所有的 todos 再返回给浏览器
    loadTodosFromFile(function(){
        var r = JSON.stringify(todos)
        console.log('服务器返回给浏览器的数据', r)
        response.send(r)
    })
})

var writeTodosToFile = function() {
    log('write todos', JSON.stringify(todos))
    var s = JSON.stringify(todos, null, 2)
    log('s', s)
    fs.writeFile(dataFile, s, (err) => {
      if (err) {
          console.log(err)
      } else {
          console.log('保存成功')
          var todoss = fs.readFileSync('todo.json')
          console.log('debug todolist',JSON.parse(todoss) )
      }
    })
}

var todoAdd = function(todo) {
    // {"task":"ii "}
    // 给 todo 加上 id 信息
    var t = todos[todos.length-1]
    if (t == undefined) {
        todo.id = 1
    } else {
        todo.id = t.id + 1
    }
    // 把 todo 加入 todos 数组
    todos.push(todo)
    // 把 todos 保存到文件中
    writeTodosToFile()
    return todo
}

/*
ajax('POST', '/todo/add', '{"task":"ii fj"}', function(r){
    console.log(r.response)
})
*/
app.post('/todo/add', function(request, response) {
    // request.body
    var todo = request.body
    // console.log('post todo add', request.body, typeof request.body)
    // console.log(todo.task)
    var t = todoAdd(todo)
    var r = JSON.stringify(t)
    response.send(r)
})

// 删除
var todoDelete = function(id) {
    id = Number(id)
    todoList = JSON.parse(fs.readFileSync('todo.json'))
    // log('todolist',todoList, JSON.parse(todoList))
    // 在 todoList 中找到 id 对应的数据, 删除掉
    var index = -1
    for (var i = 0; i < todoList.length; i++) {
        var t = todoList[i]
        if (t.id == id) {
            // 找到了
            index = i
            break
        }
    }

    // 判断 index 来查看是否找到了相应的数据
    if (index > -1) {
        // 找到了, 用 splice 函数删除
        // splice 函数返回的是包含被删除元素的数组
        // 所以要用 [0] 取出数据
        var t = todoList.splice(index, 1)[0]
        todos = todoList
        log('todos', todos)
        writeTodosToFile()
        // log('已经删除', t, todoList)
        return t
    } else {
        // 没找到
        log('没找到')
        return {}
    }
}
app.get('/todo/delete/:id', function(request, response) {
        // 动态路由的变量通过 request.params.名字 的方式拿到
        // 变量类型永远是 string
        var id = request.params.id
        console.log('delete 路由', id, typeof id)
        var todo = todoDelete(id)
        sendJSON(response, todo)
    })
// listen 函数的第一个参数是我们要监听的端口
// 这个端口是要浏览器输入的
// 默认的端口是 80
// 所以如果监听 80 端口的话，浏览器就不需要输入端口了
// 1024 以下的端口是系统保留端口，需要管理员权限才能使用
var server = app.listen(80, function () {
  var host = server.address().address
  var port = server.address().port

  console.log("应用实例，访问地址为 http://localhost",
    host, port)
})
