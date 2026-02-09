# chalk 命令行文本样式

## 简介

[chalk](https://github.com/chalk/chalk) 是一个用于命令行文本样式的库，它提供了简洁生动的文本样式。chalk 常用于命令行的样式美化优化交互体验。 


![chalk](https://raw.githubusercontent.com/chalk/chalk/main/media/logo.svg)

## 安装

::: code-group
```bash [npm]
npm install chalk
```
```bash [pnpm]
pnpm add chalk
```
```bash [bun]
bun add chalk
```
:::

## 使用

chalk 的使用非常简单，大致规则为 `chalk.<style>("...")` 。其中 `<style>` 为文本样式（颜色，背景颜色，字体样式），如 `bold`、`underline`、`red`、`bgRed` 等。

chalk 没有污染 String 对象，chalk 的方法最终返回的是一个普通的字符串。

```ts [chalk 使用示例]
import chalk from 'chalk';

const strs = [
  chalk.red('Red'),
  chalk.bgGray('BgGray'),
  chalk.bold('Bold'),
  chalk.underline('Underline'),
  chalk.italic('Italic'),
  chalk.strikethrough('Strikethrough'),
  chalk.inverse('Inverse'),
  chalk.hidden('Hidden'),
  chalk.visible('Visible'),
  chalk.dim('Dim'),
  chalk.bold('Bold'),
]

console.log(strs.join('\n'));

```

:::details 支持的 style 类型

chalk 可以配置文本修饰样式和字体颜色、背景颜色的 style。

**文本修饰样式** 

| style | 说明 |
|------- | ------------- |
| reset | 重置当前样式。 |
| bold | 加粗文本。 |
| dim | 降低文本的亮度。 |
| italic | 斜体文本。 (不广泛支持) |
| underline | 下划线文本。 (不广泛支持) |
| overline | 上划线文本。 (不广泛支持) |
| inverse | 反色文本。 | 
| hidden | 隐藏文本。 |
| strikethrough | 删除线文本。 (不广泛支持) |
| visible | 仅当 Chalk 有颜色级别时打印文本。 可用于纯粹的美观效果。 |

**字体颜色和背景颜色**

|color | background color | 说明 |
| ------- | ------------- |---|
| black | bgBlack | 黑色 |
| red | bgRed | 红色 |
| green | bgGreen | 绿色 |
| yellow | bgYellow | 黄色 |
| blue | bgBlue | 蓝色 |
| magenta | bgMagenta | 紫色 |
| cyan | bgCyan | 青色 |
| white | bgWhite | 白色 |
| blackBright <br /> (别名: gray, grey) | bgBlackBright | 灰色 |
| redBright | bgRedBright | 亮红色 |
| greenBright | bgGreenBright | 亮绿色 |
| yellowBright | bgYellowBright | 亮黄色 |
| blueBright | bgBlueBright | 亮蓝色 |
| magentaBright | bgMagentaBright | 亮紫色 |
| cyanBright | bgCyanBright | 亮青色 |
| whiteBright | bgWhiteBright | 亮白色 |


:::

## 链式调用

chalk 支持链式调用，chalk 每个 style 都是可调用执行的对象。style 在没有执行调用之前都是 ChalkInstance ，执行调用之后返回的是一个字符串。

```ts [链式调用示例]
const str = chalk.gray.bgWhite.bold.strikethrough('Gray + White + Bold + Strikethrough');
console.log(str);
```

:::details ChalkInstance
```ts [ChalkInstance]
export interface ChalkInstance {
	(...text: unknown[]): string;

	/**
	Chalk 的颜色支持级别。

	默认会根据环境自动检测颜色支持级别。

	级别说明:
	- `0` - 关闭所有颜色。
	- `1` - 支持基本的 16 色。
	- `2` - 支持 ANSI 256 色。
	- `3` - 支持 Truecolor（真彩色，约 1600 万色）。
	*/
	level: ColorSupportLevel;

	/**
	使用 RGB 值设置文本颜色。

	@example
	```
	import chalk from 'chalk';

	chalk.rgb(222, 173, 237);
	```
	*/
	rgb: (red: number, green: number, blue: number) => this;

	/**
	使用十六进制值设置文本颜色。

	@param color - 表示目标颜色的十六进制值

	@example
	```
	import chalk from 'chalk';

	chalk.hex('#DEADED');
	```
	*/
	hex: (color: string) => this;

	/**
	使用 [8 位无符号整数](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) 设置文本颜色。

	@example
	```
	import chalk from 'chalk';

	chalk.ansi256(201);
	```
	*/
	ansi256: (index: number) => this;

	/**
	使用 RGB 值设置背景色。

	@example
	```
	import chalk from 'chalk';

	chalk.bgRgb(222, 173, 237);
	```
	*/
	bgRgb: (red: number, green: number, blue: number) => this;

	/**
	使用十六进制值设置背景色。

	@param color - 表示目标颜色的十六进制值

	@example
	```
	import chalk from 'chalk';

	chalk.bgHex('#DEADED');
	```
	*/
	bgHex: (color: string) => this;

	/**
	使用 [8 位无符号整数](https://en.wikipedia.org/wiki/ANSI_escape_code#8-bit) 设置背景色。

	@example
	```
	import chalk from 'chalk';

	chalk.bgAnsi256(201);
	```
	*/
	bgAnsi256: (index: number) => this;

	/**
	修饰符：重置当前样式。
	*/
	readonly reset: this;

	/**
	修饰符：加粗文本。
	*/
	readonly bold: this;

	/**
	修饰符：淡化文本（文字变暗）。
	*/
	readonly dim: this;

	/**
	修饰符：斜体文本。*（不是所有终端都支持）*
	*/
	readonly italic: this;

	/**
	修饰符：下划线。*（不是所有终端都支持）*
	*/
	readonly underline: this;

	/**
	修饰符：上划线。*（不是所有终端都支持）*
	*/
	readonly overline: this;

	/**
	修饰符：前景色与背景色反转。
	*/
	readonly inverse: this;

	/**
	修饰符：隐藏文本（内容不可见）。
	*/
	readonly hidden: this;

	/**
	修饰符：中划线（删除线）。*（不是所有终端都支持）*
	*/
	readonly strikethrough: this;

	/**
	修饰符：仅当 Chalk 支持颜色时才显示文本。

	适用于纯美化用途。
	*/
	readonly visible: this;

	readonly black: this;
	readonly red: this;
	readonly green: this;
	readonly yellow: this;
	readonly blue: this;
	readonly magenta: this;
	readonly cyan: this;
	readonly white: this;

	/*
	`blackBright` 的别名。
	*/
	readonly gray: this;

	/*
	`blackBright` 的别名。
	*/
	readonly grey: this;

	readonly blackBright: this;
	readonly redBright: this;
	readonly greenBright: this;
	readonly yellowBright: this;
	readonly blueBright: this;
	readonly magentaBright: this;
	readonly cyanBright: this;
	readonly whiteBright: this;

	readonly bgBlack: this;
	readonly bgRed: this;
	readonly bgGreen: this;
	readonly bgYellow: this;
	readonly bgBlue: this;
	readonly bgMagenta: this;
	readonly bgCyan: this;
	readonly bgWhite: this;

	/*
	`bgBlackBright` 的别名。
	*/
	readonly bgGray: this;

	/*
	`bgBlackBright` 的别名。
	*/
	readonly bgGrey: this;

	readonly bgBlackBright: this;
	readonly bgRedBright: this;
	readonly bgGreenBright: this;
	readonly bgYellowBright: this;
	readonly bgBlueBright: this;
	readonly bgMagentaBright: this;
	readonly bgCyanBright: this;
	readonly bgWhiteBright: this;
}
```
::: 


## 自定义文本样式

chalk 提供了自定义文本样式的方法，可以自定义颜色、背景颜色等。

```ts [自定义文本样式示例]
const customRgb = chalk.rgb(145, 255, 207); // 使用 RGB 颜色
const customHex = chalk.hex("#dd8dff"); // 使用十六进制颜色
const customBgRgb = chalk.bgRgb(145, 255, 207); // 使用 RGB 背景颜色
const customBgHex = chalk.bgHex("#dd8dff"); // 使用十六进制背景颜色

console.log(customRgb('RGB: Custom Color'));
console.log(customHex('Hex: Custom Color'));
console.log(customBgRgb('RGB: Custom Background Color'));
console.log(customBgHex('Hex: Custom Background Color'));
```

## 
