const ensure = function(condition, message) {
    // 在条件不成立的时候, 输出 message
    if(!condition) {
        console.log('*** 测试失败:', message)
    }
}
// 1
const protocolOfUrl = (url) => {
    if (url.startsWith('https')) {
        return 'https'
    } else {
        return 'http'
    }
}
// 1 测试
const testProtocolOfUrl = () => {
    const testItems = [
        ['g.cn', 'http'],
        ['g.cn/', 'http'],
        ['g.cn:3000', 'http'],
        ['g.cn:3000/search', 'http'],
        ['http://g.cn', 'http'],
        ['https://g.cn', 'https'],
        ['http://g.cn/', 'http'],
    ]
    for (let i = 0; i < testItems.length; i++) {
        const t = testItems[i]
        const [url, protocol] = t
        const result = protocolOfUrl(url)
        ensure(result === protocol, '')
    }
}
testProtocolOfUrl()

// 2
const hostOfUrl = (url) => {
    var logic = {
        "yes": {
            func(url) {
                var temp =  url.split('://')[1].split('/')[0].split(':')[0]
                return temp
            }
        },
        "no": {
            func(url) {
                var temp =  url.split('/')[0].split(':')[0]
                var result = url.includes(':')?temp : url.split('/')[0]
                return result
            }
        },
    }
    var index = url.includes('://') ? 'yes' : 'no'
    var host = logic[index].func(url)
    return host
}
// 2 测试
const testHostOfUrl = () => {
    const testItems = [
        ['g.cn', 'g.cn'],
        ['g.cn/', 'g.cn'],
        ['g.cn:3000', 'g.cn'],
        ['g.cn:3000/search', 'g.cn'],
        ['http://g.cn', 'g.cn'],
        ['https://g.cn', 'g.cn'],
        ['http://g.cn/', 'g.cn'],
    ]
    for (let i = 0; i < testItems.length; i++) {
        const t = testItems[i]
        const [url, host] = t
        const result = hostOfUrl(url)
        ensure(result === host, '')
    }
}
testHostOfUrl()

// 3
const portOfUrl = function (url) {
    // 判断 https
    // 判断 :
    var logic = {
        "https": {
            func: function (url) {
                var temp = 443
                return 443
            }
        },
        "else": {
            func: function (url) {
                var colon = url.includes(':')? url.split('/')[0].split(':')[1] : 80
                var result = url.includes('http')? 80 : colon
                return  Number(result)
            }
        },
    }
    var bool = url.includes('https')? 'https' : 'else'
    var result = logic[bool].func(url)
    return result
}
// 3 测试
const testPortOfUrl = () => {
    const testItems = [
        ['g.cn', 80],
        ['g.cn/', 80],
        ['g.cn:3000', 3000],
        ['g.cn:3000/search', 3000],
        ['http://g.cn', 80],
        ['https://g.cn', 443],
        ['http://g.cn/', 80],
    ]
    for (let i = 0; i < testItems.length; i++) {
        const t = testItems[i]
        const [url, port] = t
        const result = portOfUrl(url)
        ensure(result === port, 'port of url')
    }
}
testPortOfUrl()

// 4
const pathOfUrl = (url) => {
    // 判断 http && https
    var logic = {
        'yes': {
            func(url) {
                var temp = url.split('://')[1]
                var colon = temp.includes(':')? temp.split(':')[1] : temp
                var shash = colon.includes('/') ? '/' + colon.split('/')[1] : '/'
                return shash
            }
        },
        'no': {
            func(url) {
                var colon = url.includes(':')? url.split(':')[1] : url
                var shash = colon.includes('/') ? '/' + colon.split('/')[1] : '/'
                return shash
            }
        }
    }
    var bool = url.includes("://") ? 'yes' : 'no'
    var result = logic[bool].func(url)
    return result
}
// 4 测试
const testPathOfUrl = () => {
    const testItems = [
        ['g.cn', '/'],
        ['g.cn/', '/'],
        ['g.cn:3000/abc', '/abc'],
        ['g.cn:3000/search', '/search'],
        ['http://g.cn', '/'],
        ['https://g.cn', '/'],
        ['http://g.cn/', '/'],
    ]
    for (let i = 0; i < testItems.length; i++) {
        const t = testItems[i]
        const [url, path] = t
        const result = pathOfUrl(url)
        ensure(result === path, 'path of url')
    }
}
testPathOfUrl()

// 5
const parsedUrl = (url) => {
    /*
    url 是字符串, 可能的值如下
    'g.cn'
    'g.cn/'
    'g.cn:3000'
    'g.cn:3000/search'
    'http://g.cn'
    'https://g.cn'
    'http://g.cn/'

    返回一个 object, 内容如下
    {
        protocol: protocol,
        host: host,
        port: port,
        path: path,
    }
    */

    var obj = {
        protocol: protocolOfUrl(url),
        host: hostOfUrl(url),
        port: portOfUrl(url),
        path: pathOfUrl(url),
    }
    // console.log(obj)
    return obj

}
// 5 测试
const testParsedUrl = () => {
    const testItems = [
        ['g.cn', '/'],
        ['g.cn/', '/'],
        ['g.cn:3000/abc', '/abc'],
        ['g.cn:3000/search', '/search'],
        ['http://g.cn', '/'],
        ['https://g.cn', '/'],
        ['http://g.cn/', '/'],
    ]
    for (let i = 0; i < testItems.length; i++) {
        const t = testItems[i]
        const [url, path] = t
        const result = parsedUrl(url)
        // ensure(result === path, 'path of url')
    }
}
testParsedUrl()

// 6
// 把向服务器发送 HTTP 请求并且获得数据这个过程封装成函数
// 这里为了方便处理, 我们把 url 统一固定成 http://movie.douban.com/top250
// 所以只需要 ping host 的信息得到 ip 就可以
// 定义如下
const get = (callback) => {
    /*
    本函数使用上课代码 client.js 中的方式使用 socket 连接服务器
    获取服务器返回的数据
    注意, 返回的数据类型为 buffer
    */

    // ...
    // 板书其他部分代码
    // 设置连接服务器的信息

    // 这一步需要先 ping host, 得到 ip 信息
    // 比如我 ping movie.douban.com, 得到的 ip 是 115.182.201.8
    // 那么我设置的 host 就是 115.182.201.8
    const tls = require('tls')
    const host = 'movie.douban.com'
    // ... 板书其他部分代码
    const port = 443

    // 创建一个客户端, 可以连接到服务器
        const client = new tls.TLSSocket()

    // 客户端根据给出的配置参数打开一个连接, 这样可以连接到服务器
        client.connect(port, host, () => {
            console.log('connect to: ', host, port)

            // 向服务器发送一个消息
            const request = 'GET / HTTP/1.1\r\nHost: movie.douban.com\r\n\r\n'
            client.write(request)

            // 如果 server destroy 之后, 再调用下面的代码会报错
            // setInterval(() => {
            //     client.write('hello in interval')
            // }, 100)
        })

    // 当接收服务器的响应数据时触发 data 事件
    // 其实这里就是接收服务器的数据
        client.on('data', (d) => {
            // 参数是 d, 默认情况下是 buffer 类型
            // 可以用 d.toString() 将 buffer 转成字符串
            console.log('data:', d.toString())

            // 完全关闭 client 的连接, 套路写法
            client.destroy()
        })

    // client 关闭的时候触发这个事件
        client.on('close', function() {
            console.log('connection closed')
        })

}
get()