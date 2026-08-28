# 指针

---

指针是存放地址的数据结构。一个地址指向一个数据，二者是 1 对 1 的关系。


## 值传递和引用传递

> [!WARNING] 注意
> 传递指针不一定是引用传递，在 GO 语言中传递的指针参数是指针的副本数据（复制了地址的值）。虽然是同一个地址，但是传递的是副本数据。

### 值传递

以原数据创建数据副本传递给函数（不同的作用域），函数内操作的是数据副本**不影响原数据**（安全操作）。


值传递示例（go）：

operation 中接受的参数是数据副本，不影响原数据。

```go

var name string = "shy"

func operation(name string) {
  name = "SHY"
}

operation(name)

fmt.Println(name) // shy

```

### 引用传递

将原数据的地址传递给函数（不同的作用域），函数内通过地址可以找到并操作**影响原数据**（不安全操作）。

引用传递示例（C++）：

operation 中接受的是数据地址，影响原数据。

```c++

int age = 18;

void operation(int &age) {
  age = 20;
}

operation(age);

cout << age << endl; // 20

```


## 共享数据

指针最大的用处就是在不同的作用域里共享数据。同一块地址不管在哪个作用域，都指向同一个数据，通过指针传递地址即可实现共享数据。

共享数据不一定只能通过引用传递，也可以是值传递，传递地址的副本。

值传递共享数据示例（JS）：

当把 obj 传进 fun 时，params 里存的不是 obj 本身，而是 obj 在堆内存中的 “地址”。JS 复制了这个地址的值发给 fun。

```js
const obj = {
  key: 'value'
}

function fun(params) { // 此处传递的是 obj 地址的值，params 不等于 obj
  params.key = 'val' // 通过地址副本修改原数据
  params = { key : 'VALUE' } // 修改地址副本
}

console.log(obj) // { key : 'val'}

```