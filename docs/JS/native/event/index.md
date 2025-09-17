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

## 观察者模式

观察者模式是一种行为设计模式，它定义了一种一对多的依赖关系。观察者模式的核心是一个被观察者，多个观察者。被观察者状态发生变化时，会通知所有观察者。例如事件监听就是观察者模式的一种。定义好一个事件后，当事件触发时会通知所有监听器。增减监听器不会影响原本定义好的事件。

:::details 观察者模式示例代码
```js
// 被观察者（主题）类
class Subject {
  constructor() {
    this.observers = []; // 存储所有观察者
  }

  // 添加观察者
  addObserver(observer) {
    this.observers.push(observer);
  }

  // 移除观察者
  removeObserver(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }

  // 通知所有观察者
  notify(data) {
    this.observers.forEach(observer => {
      observer.update(data); // 调用观察者的更新方法
    });
  }
}

// 观察者1：邮件通知
class EmailObserver {
  update(data) {
    console.log(`邮件通知：收到新消息 - ${data}`);
  }
}

// 观察者2：短信通知
class SmsObserver {
  update(data) {
    console.log(`短信通知：收到新消息 - ${data}`);
  }
}

// 观察者3：APP通知
class AppObserver {
  update(data) {
    console.log(`APP通知：收到新消息 - ${data}`);
  }
}

// 使用示例
function run() {
  // 创建被观察者
  const newsSubject = new Subject();

  // 创建观察者
  const emailObs = new EmailObserver();
  const smsObs = new SmsObserver();
  const appObs = new AppObserver();

  // 注册观察者
  newsSubject.addObserver(emailObs);
  newsSubject.addObserver(smsObs);
  newsSubject.addObserver(appObs);

  // 发布消息（触发通知）
  console.log('发布第一条消息：');
  newsSubject.notify('今天有暴雨，请带伞出门');

  // 移除一个观察者
  newsSubject.removeObserver(smsObs);
  console.log('\n发布第二条消息（已移除短信通知）：');
  newsSubject.notify('明天气温将下降5度');
}

run();

```
:::