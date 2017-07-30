var ckXian = function() {
var body  = document.querySelector('body')
var style ='<style id="xm" media="screen"> * {outline: 1px red dashed!important} </style>'
var i = false
body.addEventListener('keydown', function(event) {
	if (event.keyCode === 77 && event.ctrlKey) {
		if (i) {
			var styletog = document.querySelector('#xm')
			styletog.remove()
			i = false
		} else {
			body.insertAdjacentHTML('afterbegin', style)
			i = true
		}
	}
})
}() // 加载代码 使用 Ctrl + M 显示参考线
