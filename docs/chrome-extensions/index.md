# chrome 浏览器扩展

chrome 扩展是 chromium 内核浏览器可使用的扩展，可以用来增强浏览器的功能。chrome 扩展通过web 技术开发，配合 chrome 提供的 api 实现扩展功能。

::: tip 浏览器扩展
目前主流的浏览器 为 chrome，edge，firefox，safari 等。其中 chrome 和 edge 使用的都是 chromium 内核，都可以使用 chrome 扩展（firefox 也兼容 chrome 扩展）。所以通常提到 chrome 扩展一般都指浏览器扩展。

:::

## 清单文件

manifest.json 清单文件是 chrome 扩展的入口文件，目前最新的版本为 [manifest v3](https://developer.chrome.com/docs/extensions/mv3/manifest/)。清单文件用于配置扩展的名称、版本、权限、内容脚本、背景脚本、选项页面、弹窗页面等。

::: warning 注意
权限配置对于需要上架商店的扩展需要严格遵守扩展安全策略。
:::

以下是一个清单文件的最简示例：
```json
{
  "manifest_version": 3,
  "name": "最小清单",
  "version": "1.0.0",
  "description": "仅包含必需键的基本示例扩展",
  "icons": {
    "48": "images/icon-48.png",
    "128": "images/icon-128.png"
  }
}
```
::: details 详细示例
```json
{ 
	"name": "浏览器扩展",// 插件的名称
	"version": "1.0.0",// 插件的版本
	"description": "简单的Chrome扩展demo",// 插件描述
	"manifest_version": 3,// 清单文件的版本，2 或 3
	"icons":{ // 扩展图标，可以准备多个尺寸的图标
		"16": "img/icon.png",
		"48": "img/icon.png",
		"128": "img/icon.png"
	},
	"background":{
		"service_worker": "background.js" // 无界面的后台脚本，非持久化
	},
	"action":{   // 浏览器扩展的图标和弹窗
		"default_icon": "img/icon.png",
		"default_title": "这是一个示例Chrome插件",// 图标悬停时的标题，可选
		"default_popup": "popup.html"
	},
	"content_scripts":[// 直接注入页面的脚本
		{
			//"matches": ["http://*/*", "https://*/*"],
			"matches": ["<all_urls>"],// "<all_urls>" 表示匹配所有地址
			"js": ["js/jquery-1.8.3.js", "js/content-script.js"],// 多个JS按顺序注入
			"css": ["css/custom.css"], // 不推荐注入css 
			"run_at": "document_start"  // 代码注入的时间，可选值： "document_start", "document_end", or "document_idle"，最后一个表示页面空闲时，默认document_idle
		},
		// 这里演示content-script可以配置多个规则
		{
			"matches": ["http://*/*", "https://*/*"],
			"js": ["js/show-image-content-size.js"]
		}
	],
	"permissions":[// 权限申请
		"contextMenus", // 右键菜单
		"tabs", // 标签
		"notifications", // 通知
		"webRequest", // web请求
		"webRequestBlocking", // 阻止web请求
		"storage", // 插件本地存储
		"activeTab", // 临时获取用户当前激活标签页
	],
	"host_permissions": ["http://*/*", "https://*/*"],// 可以通过executeScript或者insertCSS访问的网站
	"web_accessible_resources": ["js/inject.js"],// 普通页面能够直接访问的插件资源列表，如果不设置是无法直接访问的
	"homepage_url": "https://www.example.com", // 插件主页，
	"chrome_url_overrides":{// 覆盖浏览器默认页面
		"newtab": "newtab.html"// 覆盖浏览器默认的新标签页
	},
	"options_page": "options.html",// 浏览器扩展设置页面，作为独立的 html 存在。
	"options_ui":{// 浏览器扩展设置页面。如果同时存在options_page和options_ui，优先使用options_ui
		"page": "options.html", // 选项页面路径（必填）
    "open_in_tab": false,   // 是否在新标签页展示（默认 false），如果为 true，则会在新标签页展示（相当于 options_page）；如果为 false，则会在页面上的 dialog 存在。
	},
	"devtools_page": "devtools.html",// 自定义的开发者工具 tab 页，例如 vue 和 react 的 devtools 面板
	"omnibox": { "keyword" : "go" },// 向地址栏注册一个关键字以提供搜索建议，只能设置一个关键字
	"default_locale": "zh_CN"// 默认语言
}
```
:::

## 扩展环境

chrome 扩展的脚本运行环境与普通的 web 页面有所不同。

扩展环境包含以下部分
  - 扩展弹出层 popup ： 点击扩展图标弹出的子页面。用于展示扩展的界面和功能交互。
  - 扩展选项页 options ： 扩展的独立页面，协议格式为 `chrome-extension://<哈希值>`，扩展的所有页面（例如，弹出层）本质也是选项页的一种，可以通过扩展协议拼接项目文件路径打开。通常用于扩展的设置和配置，比如一些 AI 扩展的设置页面。
  - 扩展后台页 background ： 扩展的后台程序，用于执行扩展的持久化任务。（无界面）通常用来管理扩展的持久化数据和执行扩展的持久化任务（例如，定时任务、通信）。
  - 扩展调试页 devtools ： 扩展的调试页面。参考 vue 和 react 扩展的 devtools 面板。

::: warning 注意
扩展还包含了注入脚本 content_scripts，但是注入脚本是运行在页面上而非扩展环境（注入脚本相当于在页面中执行了一段 js 代码），扩展脚本直接影响页面内容并和扩展进行通信。
:::


扩展环境和 web 环境最大的区别是有独立的控制台和 API。

## 通信机制

web 环境与扩展环境之间通过消息机制进行通信，通信发生在注入脚本和扩展脚本之间。

- 扩展向 web 环境发送消息：扩展通过 `chrome.runtime.sendMessage` 或 `chrome.tabs.sendMessage` 发送消息。
- web 环境向扩展发送消息：web 环境通过 `chrome.runtime.onMessage` 或 `chrome.tabs.onMessage` 监听消息。

```js
chrome.runtime.sendMessage({data: "hello"}, function(response) {
  console.log(response,"扩展向 web 环境发送消息");
});
```
```js
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.data === "hello") {
    sendResponse({data: "收到消息，消息内容为：" + request.data});
  }
});
```