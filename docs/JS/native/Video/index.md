# js实现拍摄和录屏
---

<style>
  #text {
    text-indent: 2em;
    margin-top: 4em;
  }
</style>

<p id="text">
在浏览器中，通过navigator.mediaDevices对象的`getUserMedia`方法，可以获取到用户的摄像头和麦克风权限，从而实现拍摄功能；`getDisplayMedia`方法可以获取到屏幕的权限，从而实现录屏功能。
</p>

## getUserMedia 方法

`getUserMedia` 

```js
var promise = navigator.mediaDevices.getDisplayMedia(constraints);

```
- 参数 constraints 可选
一个可选的MediaStreamConstraints对象，它指定了返回的MediaStream的要求。因为getDisplayMedia()需要视频轨道，所以即使constraints 对象没有明确请求视频轨道，返回的流也会有一个
  1. video: 提供一个布尔值或者对象
    - 布尔值 : true 表示需要视频轨道 
    - 对象:
      1. width: 1024 表示视频宽度
      2. height: 768 表示视频高度
      3. frameRate: 30 表示视频帧率
      4. facingMode: 'user' 表示前置摄像头(默认)，'environment' 表示后置摄像头
  2. audio: true 表示需要音频轨道

- 返回值 一个被解析为 MediaStream 的 Promise，
其中包含一个待解析的媒体流

:::warning 注意
可以通过修改constrains.video.facingMode来切换前后摄像头,但是切换时需要先停止视屏流，然后重新获取视频流

在PC端，constrains.video.facingMode即时设置为‘environment’，也只能获取前置摄像头
:::

### 停止媒体流

```js
// 停止媒体流，stream为媒体流
stream.getTracks().forEach((track) => {
  track.stop() // 停止媒体流
})
```

**示例：**
```js
const getVideo = () => {
  const chunk = [] // 存放视频数据
  const video = document.getElementById('video')
  // 获取用户媒体设备
  navigator.mediaDevices.getUserMedia({ video: true })
    .then((stream) => {
      video.srcObject = stream
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorder.ondataavailable = (e) => {// 当有数据流可用时触发，将数据流添加到数组中
        chunk.push(e.data)
      }
      mediaRecorder.onstop = () =>{ // 当录制停止时触发，将数据流合并为一个Blob对象，并创建一个下载链接
        const blob = new Blob(chunk, { type: 'video/mp4' })
        const url = URL.createObjectURL(blob)
        const a = document.createElement('a')
        a.href = url
        a.download = 'video.mp4'
        a.click()
      }
      mediaRecorder.start() // 开始读取视频流
      setTimeout(() => {
        stream.getTracks().forEach((track) => {
          track.stop() // 停止视频流
        })
      },5000)
      
      video.play()
    })
    .catch((err) => {
      console.error('访问媒体设备时出错.', err)
    })

}

// 以下可以获取当前视频帧，并生成图片
const takePhoto = () => {

  const video = document.getElementById('video')
  const canvas = document.createElement('canvas')
  if(video.videoWidth && video.videoHeight){// 视频有宽高时

    canvas.width = video.videoWidth
    canvas.height = video.videoHeight
    canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height)
    const dataURL = canvas.toDataURL('image/png') // 将图片数据转换为Base64编码的字符串
    const img = new Image()
    img.style.width = canvas.width/2 + 'px'
    img.style.height = canvas.height/2 +'px'
    img.src = dataURL
    document.querySelector('.imgList').appendChild(img)
  }else{
    console.log('视频未加载完成')
  }
}


```

## getDisplayMedia 方法

`getDisplayMedia`

```js
var promise = navigator.mediaDevices.getDisplayMedia(constraints);
```

- 参数 constraints 可选
一个可选的MediaStreamConstraints对象，它指定了返回的MediaStream的要求。因为getDisplayMedia()需要视频轨道，所以即使constraints 对象没有明确请求视频轨道，返回的流也会有一个
  1. video: 提供一个布尔值或者对象
    - 布尔值 : true 表示需要视频轨道 
    - 对象:
      1. width: 1024 表示视频宽度
      2. height: 768 表示视频高度
      3. frameRate: 30 表示视频帧率
  2. audio: true 表示需要音频轨道

- 返回值 一个被解析为 MediaStream 的 Promise，
其中包含一个待解析的媒体流

:::warning 注意
video.width 和 video.height 是视频的原始宽高，而不是裁剪后的宽高；这可能会影响视频的清晰度，默认使用true即可
:::

**示例：**
```js

import { ref } from 'vue'

const container = ref(null)


async function cut (){
  const video = document.createElement('video')
  const videoStream = await navigator.mediaDevices.getDisplayMedia()
  
  video.srcObject = videoStream
  video.play()
  container.value.appendChild(video)
  
}
```

:::warning
以上是vue组件内的写法，如果是在html中，需要使用`document.createElement`来创建元素
:::

## 常见的错误

```md
Permission denied (by system)

没有（系统）权限，通常是没有允许浏览器访问摄像头权限，需要用户手动授权
```


