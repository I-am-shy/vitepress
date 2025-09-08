# nodejs 执行终端命令

---

通过 `child_process` 模块可以执行终端命令。

## exec 

`exec('command',callback)` : 异步执行终端命令。
  - command: 要执行的终端命令。
  - callback: 回调函数，参数为 error, stdout,stderr。
    - error: exec的错误信息。
    - stdout: command 命令的打印结果。
    - stderr: command 命令的错误（日志）信息。


```js
const { exec } = require('child_process');

// 异步执行
exec('ls', (error, stdout,stderr) => {
  // error : exec的错误信息, stdout: 命令的打印结果,stderr: 命令的错误（日志）信息
  if (error) {
    console.error(`执行错误: ${error}`);
    return;
  }
  console.log(`stdout: ${stdout}`);
  console.error(`stderr: ${stderr}`);
});
```

## execSync

`execSync('command')` : 同步执行终端命令。
  - command: 要执行的终端命令。
  - 返回值: 命令执行的打印结果。

```js

const { execSync } = require('child_process');

// 同步执行
const result = execSync('ls -l'); // 返回命令执行的打印结果
console.log(`result: ${result}`);

```

## spawn

`spawn('command',args,options)` : 实时更新的命令的打印输出。
  - command: 要执行的终端命令。
  - args: 要执行的终端命令的参数。
  - options: 可选，要执行的终端命令的选项。
  - 返回值: 本次命令的子进程对象。

```js
const { spawn } = require('child_process');

// 实时更新的命令的打印输出
const child = spawn('time', ['ls','-l']); 
child.stdout.on('data', (data) => { // 监听命令的打印结果,实时更新
  console.log(`spawn stdout: ${data}`);
});
child.stderr.on('data', (data) => { // 监听命令的错误(日志)信息,实时更新
  console.error(`spawn stderr: ${data}`);
});
child.on('close', (code) => { // 监听命令的退出码,0表示正常退出,1表示异常退出
  console.log(`子进程退出，退出码 ${code}`);
});
```