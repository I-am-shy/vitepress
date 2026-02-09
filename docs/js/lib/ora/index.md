# ora 命令行加载动画

## 简介

[ora](https://github.com/sindresorhus/ora) 是一个用于命令行加载动画的库，它提供了简洁生动的动画效果，且支持自定义颜色、图标、文字等。

![ora](https://raw.githubusercontent.com/sindresorhus/ora/4496362714e1edd414e5347e8d4b337f103f0e15/screenshot.svg)

## 安装

::: code-group
```bash [npm]
npm install ora
```
```bash [pnpm]
pnpm add ora
```
```bash [bun]
bun add ora
```
:::

## 使用

ora 的使用非常简单，只需要创建一个 Ora 实例，然后调用 start 和 stop（succeed, fail） 方法开启和停止动画即可。

以下是一个最简单的示例，展示了如何使用 ora 创建一个加载动画。

```js
import ora from 'ora';

const spinner = ora('Loading').start();

setTimeout(() => {
  spinner.succeed('Done');
}, 3000);
```



## 配置选项

ora 提供了配置选项，可以自定义加载动画的颜色、图标、文字等。

```ts 
const spinner = ora({
  text: 'Loading', // 显示的文字
  color: 'red', // 颜色
  spinner: 'dots', // 动画类型，默认值为 'dots'。支持自定义动画帧
});

```

以下是 spinner 动画类型的配置项类型定义。

::: code-group
```ts [Spinner]
export type Spinner = {
	readonly frames: string[]; // 动画帧
	readonly interval?: number; // 动画间隔
};
```

```ts [SpinnerName]
export type SpinnerName =
	| 'dots'
	| 'dots2'
	| 'dots3'
	| 'dots4'
	| 'dots5'
	| 'dots6'
	| 'dots7'
	| 'dots8'
	| 'dots9'
	| 'dots10'
	| 'dots11'
	| 'dots12'
	| 'dots13'
	| 'dots14'
	| 'dots8Bit'
	| 'dotsCircle'
	| 'sand'
	| 'line'
	| 'line2'
	| 'rollingLine'
	| 'pipe'
	| 'simpleDots'
	| 'simpleDotsScrolling'
	| 'star'
	| 'star2'
	| 'flip'
	| 'hamburger'
	| 'growVertical'
	| 'growHorizontal'
	| 'balloon'
	| 'balloon2'
	| 'noise'
	| 'bounce'
	| 'boxBounce'
	| 'boxBounce2'
	| 'binary'
	| 'triangle'
	| 'arc'
	| 'circle'
	| 'squareCorners'
	| 'circleQuarters'
	| 'circleHalves'
	| 'squish'
	| 'toggle'
	| 'toggle2'
	| 'toggle3'
	| 'toggle4'
	| 'toggle5'
	| 'toggle6'
	| 'toggle7'
	| 'toggle8'
	| 'toggle9'
	| 'toggle10'
	| 'toggle11'
	| 'toggle12'
	| 'toggle13'
	| 'arrow'
	| 'arrow2'
	| 'arrow3'
	| 'bouncingBar'
	| 'bouncingBall'
	| 'smiley'
	| 'monkey'
	| 'hearts'
	| 'clock'
	| 'earth'
	| 'material'
	| 'moon'
	| 'runner'
	| 'pong'
	| 'shark'
	| 'dqpb'
	| 'weather'
	| 'christmas'
	| 'grenade'
	| 'point'
	| 'layer'
	| 'betaWave'
	| 'fingerDance'
	| 'fistBump'
	| 'soccerHeader'
	| 'mindblown'
	| 'speaker'
	| 'orangePulse'
	| 'bluePulse'
	| 'orangeBluePulse'
	| 'timeTravel'
	| 'aesthetic'
	| 'dwarfFortress';
```
:::

除了在创建 Ora 实例时配置选项，还可以直接修改 Ora 实例的属性。

```ts
const spinner = ora()
spinner.text = 'Loading...';
spinner.color = 'green';
spinner.spinner ={
  frames: [ "•", "-", "+", "*","*","*", "+", "-", "•"],
  interval: 150
};
```

## 链式调用

ora 支持链式调用，每个方法都会返回 Ora 实例。

```ts
const spinner = ora('Loading');
spinner.stop("stop");
spinner.start("start");
spinner.indent(2); // 缩进2个空格
spinner.succeed("succeed");
spinner.fail("fail");
// 等价于
ora('Loading').stop("stop").start("start").indent(2).succeed("succeed").fail("fail");
```

## 更多

更多用法请参考 [ora](https://github.com/sindresorhus/ora?tab=readme-ov-file#ora) 的官方文档。
