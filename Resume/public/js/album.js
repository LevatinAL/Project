var showImageAtIndex = (slide, index) => {
    slide.dataset.active = index
    log('找到当前显示下标', index)
    var className = 'active'
    removeClassAll(className)
    var nextSelector = '#small-img-' + String(index)
    var img = e(nextSelector)
    img.classList.add(className)
}
var nextIndex = (slide, offset) => {
    var numberOfImgs = parseInt(slide.dataset.imgs)
    var activeIndex = parseInt(slide.dataset.active)
    var i = (numberOfImgs + activeIndex + offset) % numberOfImgs
    return  i
    log('下一个', i)
}
var playNextImage = () => {
    var slide = e('.small-list-photo')
    var index = nextIndex(slide, 1)
    log('qw', index)
    showImageAtIndex(slide, index)
}
var autoPlay = () => {
     setInterval(function () {
      playNextImage()
    }, 2000 );
}
autoPlay()
