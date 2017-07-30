var currentIndex = $('.slider').attr('data-init')
var numberOfImages = $('.slider').attr('data-total')
const turn = function(page) {
	currentIndex = (parseInt(numberOfImages) + parseInt(currentIndex) + parseInt(page)) % parseInt(numberOfImages)
	// 移除 active
	$('.slider-img').removeClass('slider-active')
	var img = $('.slider-img')[currentIndex]
	$(img).addClass('slider-active')
}
const nextButton = function() {
	$('#id-button-next1').on('click', function(){
		turn(1)
	})
}
const prevButton = function () {
	$('#id-button-prev1').on('click', function(event){
		turn(-1)
	})
}
const autoPlay = function () {
    setInterval(function(){
        turn(1)
    },4000)
}
const __albumMain = function() {
    autoPlay()
	prevButton()
	nextButton()
}
__albumMain()
