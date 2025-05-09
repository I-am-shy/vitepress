# 记录一些 js 脚本

## 命令行 loading 效果

```js
/**
 * 命令行加载动画工具
 * @returns {Object} 包含 start 和 stop 方法的对象
 */
function createLoadingAnimation(options = {}) {
  // 默认配置
  const config = {
    text: "Loading", // 加载时显示的文本
    states: ["|", "/", "-", "\\"], // 动画状态
    interval: 200, // 动画更新间隔（毫秒）
    stream: process.stdout, // 输出流
  };

  // 合并用户配置
  Object.assign(config, options);

  let intervalId = null;
  let index = 0;

  /**
   * 启动加载动画
   */
  function start() {
    // 清除之前的动画（如果有）
    if (intervalId) {
      clearInterval(intervalId);
    }

    // 重置索引
    index = 0;

    // 启动新的动画
    intervalId = setInterval(() => {
      const state = config.states[index];
      config.stream.write(`${config.text} ${state} \r`);
      index = (index + 1) % config.states.length;
    }, config.interval);
  }

  /**
   * 停止加载动画并清除输出
   * @param {string} [finalText] 停止时显示的最终文本
   */
  function stop(finalText) {
    clearInterval(intervalId);
    config.stream.clearLine();
    config.stream.cursorTo(0);

    if (finalText) {
      config.stream.write(`${finalText}\n`);
    }
  }

  return { start, stop };
}

// // 示例用法
// if (require.main === module) {
//   // 创建一个加载动画实例
//   const loading = createLoadingAnimation({
//       text: ' '
//   });

//   // 启动加载动画
//   loading.start();

//   // 模拟 3 秒后停止加载
//   setTimeout(() => {
//       loading.stop('Processing complete!');
//   }, 3000);
// }
```

---