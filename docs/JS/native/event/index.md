# 自定义事件

## 浏览器自定义事件

浏览器的事件可以根据是否由 dom 元素触发，分为 ui 事件和非 ui 事件。自定义事件也包含这两种触发方式。

```js
// 浏览器事件，2种方式触发：1. ui 事件；2. 非 ui 事件；

// 注册事件
const event = new window.Event("myEvent");
// 监听事件
document.addEventListener("myEvent",(e)=>{
  alert("myEvent 事件触发",e);
});
// 通过 dom 元素触发事件
document.dispatchEvent(event);
// 非 ui 触发事件
const eventTarget = new EventTarget();
eventTarget.addEventListener("myEvent",(e)=>{
  alert("myEvent 事件触发",e);
});
eventTarget.dispatchEvent(event);
```

:::tip 提示
可以将上面的代码复制到浏览器控制台查看效果。
:::

## node 自定义事件

node 的自定义事件和浏览器自定义事件类似，但是 node 的自定义事件是事件派发和事件监听。

```js
const Event = require('events');

// on: 监听指定事件；emit: 触发指定事件；once: 创建一个只触发一次的事件；off/removeListener: 移除指定事件；removeAllListeners: 移除所有事件；

// 创建事件实例
const event = new Event();
// 监听 add 事件
event.on("add",(e)=>{
  console.log("add 事件触发",e.result);
})

function add(a,b){
  const result = a + b;
  // 触发 add 事件
  event.emit("add",{result});
  return result;
}

add(1,2);
add(3,4);
```

结果如下：
```bash
add 事件触发 3
add 事件触发 7
```