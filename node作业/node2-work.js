// 定义我们的 log 函数
const log = (...args) => {
    console.log.apply(console, args)
}

// 定义我测试函数
const ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        log('*** 测试失败:', message)
    }
}

// 2.1
const pathWithQuery = (path, query) => {
    /*
    path 是一个字符串
    query 是一个字典

    返回一个拼接后的 url
    详情请看下方测试函数
    */
    var final = `${path}?`
    for (let q in query) {
        var [k, v] = [q, query[q]]
        final += `${k}=${v}&`
    }
    final = final.slice(0, -1)
    return final
}

const testPathWithQuery = () => {
    // 注意 height 是一个数字
    const path = '/'
    const query = {
        name: 'gua',
        height: 169,
    }
    const expected = [
        '/?name=gua&height=169',
        '/?height=169&name=gua',
    ]
    // NOTE, 字典是无序的, 不知道哪个参数在前面, 所以这样测试
    const result = pathWithQuery(path, query)
    ensure(expected.includes(result), '')
}
testPathWithQuery()
