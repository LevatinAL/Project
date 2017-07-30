const addNavigation = function() {
	var nav = document.querySelector('.navigation')
	var t = `
	<a href="./resume.html"><img src="./image/resume.png" alt=""></a>
	<a href="./music.html"><img src="./image/MUSIC.png" alt=""></a>
	<a href="./album.html"><img src="./image/PHOTO.png" alt=""></a>
	<a href="./todoList.html"><img src="./image/TODOLIST.png" alt=""></a>
	<a href="./game.html"><img src="./image/GAME.png" alt=""></a>
	`
	nav.insertAdjacentHTML('beforeend', t)
}
addNavigation()
