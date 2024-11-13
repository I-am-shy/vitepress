# 流（Stream）

## 可读流
- ReadableStream
表示数据的可读流。用于处理 Fetch API 返回的响应，或者开发者自定义的流（例如通过 ReadableStream() 构造的流）。

- ReadableStreamDefaultReader
表示默认 reader，用于读取来自网络的数据流（例如 fetch 请求）。

- ReadableStreamDefaultController
表示一个 controller，用于控制 ReadableStream 的状态及内部队列。默认的 controller 用于处理非字节流。

## 可写流

- WritableStream
为将流写入目的地（称为接收器）的过程，提供了一个标准抽象。内置了背压和队列机制。

- WritableStreamDefaultWriter
表示默认 writer，用于将分块的数据写入可写流中。

- WritableStreamDefaultController
表示一个 controller，用于控制 WritableStream 的状态。当创建一个 WritableStream 时，对应的 WritableStreamDefaultController 实例会被提供给底层的接收器供其操作。

## 转换流
- TransformStream
表示一组可转化的数据。

- TransformStreamDefaultController
提供操作和转换流关联的 ReadableStream 和 WritableStream 的方法。

# 媒体流 (MediaStream)
MediaStream 接口是一个媒体内容的流.。一个流包含几个轨道，比如视频和音频轨道。   

属性
- MediaStream.active 只读
布尔型。如果这个流处于活动状态值为 true，反之为 false

- MediaStream.id 只读
这是一个包含 36 个字符的 DOMString ，用来作为这个对象的唯一标识符 (GUID) 。

## 事件处理

- MediaStream.onaddtrack
这是 addtrack 事件在这个对象上触发时调用的事件处理器，这时一个MediaStreamTrack对象被添加到这个流。

- MediaStream.onended
这是当流终止 ended 时触发的事件。

- MediaStream.onremovetrack
这是 removetrack 事件在这个对象上触发事调用的事件处理器，这时一个对象从流上移除。

## 方法
- MediaStream.addTrack()
: 存储传入参数 MediaStreamTrack 的一个副本。如果这个轨道已经被添加到了这个媒体流，什么也不会发生; 如果目标轨道为“完成”状态（也就是已经到尾部了），一个 INVALID_STATE_RAISE 异常会产生。

- MediaStream.clone()
返回这个 MediaStream 对象的克隆版本。返回的版本会有一个新的 ID。
返回给定 ID 的轨道。如果没有参数或者没有指定 ID 的轨道，将返回 null。如果有几个轨道有同一个 ID，将返回第一个。

- MediaStream.getTracks()
: 返回流中所有的MediaStreamTrack列表。

- MediaStream.getAudioTracks()
: 返回流中 kind 属性为"audio"的MediaStreamTrack列表。顺序是不确定的，不同浏览器间会有不同，每次调用也有可能不同。

- MediaStream.getTrackById()
: 返回给定 ID 的轨道。如果没有参数或者没有指定 ID 的轨道，将返回 null。如果有几个轨道有同一个 ID，将返回第一个。

- MediaStream.getVideoTracks()
: 返回流中 kind 属性为"video"的MediaStreamTrack列表。顺序是不确定的，不同浏览器间会有不同，每次调用也有可能不同。

- MediaStream.removeTrack()
: 移除作为参数传入的 MediaStreamTrack。如果这个轨道不在 MediaStream 对象中什么也不会发生； 如果目标轨道为“完成”状态，一个 INVALID_STATE_RAISE 异常会产生。

# 结束流数据的示例

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>简单的随机字符流</title>
    <style>
      .input {
        float: left;
        width: 50%;
      }

      .output {
        float: right;
        width: 50%;
      }

      hr {
        clear: both;
      }

      button {
        display: block;
      }
    </style>
</head>
<body>
<h1>简单的随机字符流</h1>

<button>停止生成字符串</button>

<div class="input">
  <h2>自定义字符流输入</h2>
  <ul>

  </ul>
</div>

<div class="output">
  <h2>读取自定义字符流</h2>
  <ul>

  </ul>
</div>

<hr>

<h2>最终结果</h2>

<p></p>

<script>
  // 存储对列表、段落和按钮的引用
  const list1 = document.querySelector('.input ul');
  const list2 = document.querySelector('.output ul');
  const para = document.querySelector('p');
  const button = document.querySelector('button');

  // 创建一个空字符串来存储结果
  let result = "";

  // 生成随机字符字符串的函数
  function randomChars() {
    let string = "";
    let choices = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

    for (let i = 0; i < 8; i++) {
      string += choices.charAt(Math.floor(Math.random() * choices.length));
    }
    return string;
  }

  const stream = new ReadableStream({
    start(controller) {
      interval = setInterval(() => {
        let string = randomChars();

        // 将字符串添加到流中
        controller.enqueue(string);

        // 在屏幕上显示
        let listItem = document.createElement('li');
        listItem.textContent = string;
        list1.appendChild(listItem);
      }, 1000);

      button.addEventListener('click', function() {
        clearInterval(interval);
        readStream();
        controller.close();
      })
    },
    pull(controller) {
      // 在这个例子中我们不需要pull
    },
    cancel() {
      // 如果读取器取消，将停止生成字符串
      clearInterval(interval);
    }
  });

  function readStream() {
    const reader = stream.getReader();
    let charsReceived = 0;

    // read() 返回一个解析值已接收的 promise
    reader.read().then(function processText({ done, value }) {
      // 结果对象包含两个属性：
      // done - 如果流已经给出了所有数据，则为true。
      // value - 一些数据。当done为true时，始终为undefined。
      if (done) {
        console.log("流已完成");
        para.textContent = result;
        return;
      }

      charsReceived += value.length;
      const chunk = value;
      let listItem = document.createElement('li');
      listItem.textContent = '已读取 ' + charsReceived + ' 个字符。当前块 = ' + chunk;
      list2.appendChild(listItem);

      result += chunk;

      // 继续读取，并再次调用此函数
      return reader.read().then(processText);
    });
  }
</script>
</body>
</html>
```


