var  e = (selector) => document.querySelector(selector)
var es = (selector) => document.querySelectorAll(selector)
var log = function () {
    console.log.bind(console)
}

//改变selector元素的css
var changeCss = (selector, key, value) => {
      e(selector).style[key] = value
}

//传入一个为selector 的数组， 根据condition 改变他们的active属性
  var changeActive = (args, condition) => {
      if (condition === 'remove') {
          args.forEach((s) => {
              //遍历获取每一个元素， 去除active属性
              e(s).classList.remove('active')
          })
      }else {
        if (condition === 'add') {
          args.forEach((s) => {
            e(s).classList.add('active')
          })
        }
      }
  }

  //传入一个selector, 删除class
  var removeClass = (selector, className) => {
    //考虑单个元素和多个元素
      if (typeof(selector) === 'string') {
          e(selector). classList.remove(className)
      } else {
        if (typeof(selector) === 'array') {
            let elements = es(selector)
            //遍历删除
            elements.forEach((e) => {
                e.classList.remove(className)
            })
        }
      }
  }

  //初始化常量
  var audio = e('audio')
  var _dirname_style = './image/'

  //音乐数据 TODO
  const musicList = [
    {
        music_title: '南山南',
        music_single: '马頔',
        music_src: './music/1.mp3',
        music_id: 0,
        cover_src: _dirname_style + 'cover_1.png',
        background_src: _dirname_style + 'bg4.jpg',

    },
    {
        music_title: '岁月神偷',
        music_single: '金玟岐',
        music_src: './music/2.mp3',
        music_id: 1,
        cover_src: _dirname_style + 'cover_2.png',
        background_src: _dirname_style + 'bg2.jpg',

    },
    {
        music_title: '因为爱情',
        music_single: '王菲&陈奕迅',
        music_src: './music/3.mp3',
        music_id: 2,
        cover_src: _dirname_style + 'cover_3.png',
        background_src: _dirname_style + 'bg3.jpg',

    },
 ]

 //初始化页面

 //获取所有的歌曲的 title
 var getMusicTitle = () => {
   //遍历每首歌
   var result = []
   musicList.forEach((e) => {
        result.push(e.music_title)
   })
      //log(result)
      return result
 }

 // 初始化音乐列表的文本
 var initMusicList = () => {
      var li = es('.music_1')
      //获取所有歌曲的 title
      var title = getMusicTitle()
      for (var i = 0; i < li.length; i++) {
        li[i].innerHTML = title[i]
      }
 }

 //设置播放器中间的H1和P标签文本
 const initMusicPlayerTitle = (index) => {
      const titleH4 = e('h4')
      const singleP = e('p')
      titleH4.innerHTML = musicList[index].music_title
      singleP.innerHTML = musicList[index].music_single
      //设置audio 标签的自定义 id 属性为当前播放的歌曲
      audio.dataset.id = index
 }

 //初始化
 const ___init = () => {
   initMusicList()
   initMusicPlayerTitle(0)
   audio.volume = 0.7
 }

 //传入一个id 返回一个music Object
 const getMusicForId = (id) => {
      let music = null
      musicList.forEach((e) => {
        //遍历
        if (e.music_id == id) {
            music = e
        }
      })
      //log('debugMusicForId return', music)
        return music
 }

 const coverAndBackgroundSrc = (index) => {
      //  log('back')
      const img = e('#id-img-cover')
      musicList.forEach((e) => {
        //log(e.music_id, index)
        if (e.music_id === index) {
            img.src = e.cover_src
            changeCss('.music-background', 'background', `url(${e.background_src})`)

        }
      })
 }

 //播放状态的style
 const playedStyle = (index) => {
      //title 部分
      const titleH4 = e('h4')
      const singleP = e('p')
      const music = musicList[index]
      titleH4.innerHTML = music.music_title
      singleP.innerHTML = music.music_single
      changeActive(['h4', 'p'], 'add')
      //main 部分
      //唱片旋转效果
      changeCss('#id-img-cover', 'animation','cover_rotation 30s linear infinite')
      //歌曲列表部分
      var allLi = es('li')
      //去除所有拥有active 属性的 li 标签的active 属性
      allLi.forEach((e) => {
            e.classList.remove('active')
      })
      allLi.forEach((e) => {
        //删除所有li标签的active 属性
        //给符合条件的歌曲添加active属性
        //console.log(e.innerHTML === music.music_title)
        if (e.innerHTML === music.music_title) {
            e.classList.add('active')
            //log(e)
        }
      })
      //左下按钮
    //   var bth = e('#id-i-play')
    //   log('www', bth)
    //   bth.classList.remove('fa-play')
    //   bth.classList.add('fa-pause')
 }

 //暂停状态的style
 const pausedStyle = () => {
    // 去除掉 title 和single 的active 属性
    changeActive(['h4', 'p'], 'remove')
    es('.active').forEach((e) => {
      e.classList.remove('active')
    })
    changeCss('#id-img-cover', 'animation', 'cover_rotation 30s linear infinite paused')
    //左下角按钮
    // const bth = e('#id-i-play')
    // bth.classList.remove('fa-pause')
    // bth.classList.add('fa-play')
 }

 //根据condetion 来进行播放或者暂停
 const playOrPause = (condetion) => {
        log('qeqwe', condetion)
      if (condetion === true) {
        //暂停状态点击
        let id = Number(audio.dataset.id)
        //获取 audio 标签的id
        log('@#@!#', id)
        const musicSrc = getMusicForId(id).music_src
        audio.src = musicSrc
        let music = null
        //music 是null 或者一个musicObject
        music = getMusicForId(id)
        //根据music id 改变当前歌曲状态， 开始播放
        playedStyle(id)
        coverAndBackgroundSrc(id)
        audio.play()
      }else {
        if (condetion === false) {
          //播放状态点击
          pausedStyle()
          audio.pause()
        }
      }
 }
 //播放或者暂停时间
 const playOrPauseEvent = () => {
     const play = document.querySelector('audio')
     console.log('debug audio', audio)
      const bth = e('#id-button-controller')
      bth.addEventListener('click', (e) => {
          var target = e.target
        if (target.src.includes('play.png')) {
            target.src = './image/pause.png'
            play.play()
        }else if(target.src.includes('pause.png')){
              target.src = './image/play.png'
              play.pause()

        }
      })
 }

 // 进度条和歌曲时间事件
  const progressStyle = () => {
    //获取缓存时间 / 总时间 的变量
    //const loadTime = audio.buffered.end(0) / audio.duration * 100
     const playTime = audio.currentTime / audio. duration * 100
     //changeCss('.progress-load', 'width', `${loadTime}%`/)
     changeCss('.progress-play', 'width', `${playTime}%`)
     const input = e('#id-input-play')
     input.value = playTime
  }

  // 进度条控制歌曲时间事件
  const inputValueOnChangeEvent = () => {
      const input = e('#id-input-play')
      input.addEventListener('change', () => {
          const value = input.value
          const time = Number(value) / 100 * audio.duration
          audio.currentTime = time
      })
  }

  // 时间格式化
  const timeInit = (time) => {
      let min = '' + Math.floor(time / 60) % 60
      let sec = Math.floor((time % 60).toFixed(2))
      // console.log(sec)
      let result = ''
      if (min < 10) {
          min = '0' + min
      }
      if (sec < 10) {
          sec = '0' + sec
      }
      result =  `${min}:${sec}`
      return result
  }

  // 歌曲时间
  const musicTimeEvent = () => {
      // 获取到显示歌曲时间的 span 标签
      const TimeSpan = e('#id-span-time')
      audio.addEventListener('timeupdate', () => {
          // 获取到 audio 的现在时间和总时间， 只保留到小数点后两位
          let totalTime = timeInit(audio.duration) || 0
          let nowTime = timeInit(audio.currentTime)
          const time = `${nowTime} / ${totalTime}`
          TimeSpan.innerHTML = time
          progressStyle()
      })
  }

  // 歌曲列表点击事件
  var  musicListPlayEvent = () => {
      const ul = e('.music_list')
      ul.addEventListener('click', (event) => {
          // 获取到点击到的 li 标签
          console.log('点击到了')
          const target = event.target
          const index = target.dataset.path
          // log(index)
          // 设置 audio 标签中的 data-id 为 点击到的 li 标签的 data-musicId
              log('qw', index)
          audio.dataset.id = index

          log('qwqw', index)
          playOrPause(true)
      })
  }

  // 下一首
  const nextMusic = () => {
      // 获取到 audio 标签的 data-id
      let id = Number(audio.dataset.id)
      // 歌曲 id + 1 后取余， 成为一个 0 -- 3 -- 0 的循环
      let nextMusicId = (id + 1) % musicList.length
      // log('debug nextMusic, id, nextMusicId', id, nextMusicId)
      // 设置 audio 的 data-id 为下一首歌曲的 id
      audio.dataset.id = nextMusicId
      // 调用播放函数
      playOrPause(true)
  }

  // 下一首事件
  const nextMusicEvent = () => {
      // 获取到下一首按钮
      const btn = e('#id-button-next')
      btn.addEventListener('click', () => {
          nextMusic()
      })
      // 歌曲播放结束触发 ended 事件
      audio.addEventListener('ended', () => {
          nextMusic()
      })
  }

  // 上一首
  const backward = () => {
      // 获取到 audio 标签的 data-id
      let id = Number(audio.dataset.id)
      // 歌曲 id + 2 后取余， 成为一个 3 -- 0 -- 3 的循环
      let preMusicId = (id + 2) % musicList.length
      // log('debug nextMusic, id, nextMusicId', id, nextMusicId)
      // 设置 audio 的 data-id 为下一首歌曲的 id
      audio.dataset.id = preMusicId
      // 调用播放函数
      playOrPause(true)
  }

  const backwardMusicEvent = () => {
      // 获取到下一首按钮
      const btn = e('#id-button-prev')
      btn.addEventListener('click', () => {
          backward()
      })
      // 歌曲播放结束触发 ended 事件
      audio.addEventListener('ended', () => {
          nextMusic()
      })
  }

  // 音量按钮移除某个 class
  // const volumeChangeClass = (element, removeClassName, addClassName) => {
  //     removeClassName.forEach((e) => {
  //         element.classList.remove(e)
  //     })
  //     element.classList.add(addClassName)
  // }

  // 音量按钮样式
  // const volumeStyle = (value) => {
  //     // 音量大于 0.5的样式, 小于 0.5 但是不为 0 的样式， 静音的样式
  //     const btn = e('#id-i-volume')
  //     if (value > 0.5) {
  //         volumeChangeClass(btn, ['fa-volume-off', 'fa-volume-down'], 'fa-volume-up')
  //     } else if (value < 0.5 && value > 0) {
  //         volumeChangeClass(btn, ['fa-volume-up', 'fa-volume-off'], 'fa-volume-down')
  //     } else if (value === 0) {
  //         volumeChangeClass(btn, ['fa-volume-up', 'fa-volume-down'], 'fa-volume-off')
  //     }
  // }

  // 音量控制
  // const volumeValueOnChangeEvent = () => {
  //     const input = e('.volume-progress')
  //     input.addEventListener('change', () => {
  //         // 当 input 的 value 发生改变时
  //         const value = input.value
  //         log(value, typeof(value))
  //         volumeStyle(Number(value))
  //         audio.volume = value
  //     })
  // }

  const ___MusicMain = () => {
      ___init()
      playOrPause()
      playOrPauseEvent()
      musicTimeEvent()
      inputValueOnChangeEvent()
      musicListPlayEvent()
      nextMusicEvent()
      backwardMusicEvent()
    //   volumeValueOnChangeEvent()
  }

  ___MusicMain()
