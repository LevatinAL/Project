// 载入 cheerio sync-request fs

// 得到网页
var request = require('sync-request')
// 分析网页
var cheerio = require('cheerio')
var fs = require('fs')
var log = log.bind(console, '---debug---')
// 定义一个类
class Movie {
    constructor() {
        // 电影名、评分、引言、排名、封面图片、图片链接
        this.name = ''
        this.score = 0
        this.quote = ''
        this.ranking = 0
        this.coverUrl = ''
    }
}

var saveJSON = function (path, json) {
    var s = JSON.stringify(json, null, 2)
    fs.writeFile(path, s, function(error){
        if (null !== null) {
            log('写入错误', error);
        } else {
            log('写入成功');
        }
    })
}

// 检查缓存,获取整个页面
var cached_url = function(url) {
    var path = './url/' + url.split('?')[1] + '.html'
    var exists = fs.existsSync(path)
    if (exists) {
        var data = fs.readFileSync(path)
        return data
    } else {
        var r = request('GET', url)
        var body = r.getBody('utf-8')
        fs.writeFileSync(path, body)
        return body
    }
}

// 分析页面
var movieFromDiv = function(div) {
    var a = cheerio.load(div)
    // 新建一个 moive 对象
    var movie = new Movie()
    movie.name = a('.title').text()
    movie.score = a('.rating_num').text()
    movie.quote = a('.inq').text()
    var pic = a('.pic')
    movie.ranking = pic.find('em').text()
    movie.coverUrl = pic.find('img').attr('src')
    return movie
}

var moviesFromUrl = function(url) {
    // 通过 cached 得到页面
    var body = cached_url(url)
    // 将页面转化为 DOM
    var e = cheerio.load(body)
    var movieDivs = e('.item')
    var movies = []
    for (var i = 0; i < movieDivs.length; i++) {
        var div = movieDivs[i]
        var m = movieFromDiv(div)
        movies.push(m)
    }
    return movies
}

// 下载图片
var downloadCovers = function(movies) {
    var download = require('request')
    log('运行到这里了');
    var fs = require('fs')
    for (var i = 0; i < movies.length; i++) {
        log('i', i);
        var m = movies[i]
        log(' m', m);
        var url = m.coverUrl
        log(' url', typeof url, url);
        var path =  './images/' + m.name.split('/')[0] + '.jpg'
        log(' path', path);
        download(url).pipe(fs.createWriteStream(path))
        log('下载完成');
    }
}

var __main = function() {
    var movies = []
    for (var i = 0; i < 10; i++) {
        var start = i * 25
        var url = 'https://movie.douban.com/top250?start=' + start
        var ms = moviesFromUrl(url)
        // 把 ms 数组里面的元素都添加到 movies 数组中
        movies = movies.concat(ms)
    }
    saveJSON('top250.json', movies)
    downloadCovers(movies)
}
__main()
